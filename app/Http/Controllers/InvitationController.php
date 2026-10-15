<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class InvitationController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();
        abort_unless($user->hasAnyRole(['super_admin', 'admin']), 403);
        $superAdmin = $user->hasRole('super_admin');
        if (!$superAdmin) abort_unless($user->company_id, 403);
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'role' => ['required', Rule::in($superAdmin ? ['admin'] : ['admin', 'member'])],
            'company_name' => [$superAdmin ? 'required' : 'nullable', 'string', 'max:255'],
        ]);
        $token = Str::random(64);
        $invitation = DB::table('invitations')->insertGetId([
            'company_id' => $superAdmin ? null : $user->company_id,
            'invited_by' => $user->id,
            'company_name' => $superAdmin ? $data['company_name'] : null,
            'name' => $data['name'], 'email' => $data['email'], 'role' => $data['role'],
            'token_hash' => hash('sha256', $token),
            'expires_at' => now()->addDays(7), 'created_at' => now(), 'updated_at' => now(),
        ]);
        return redirect()->route('dashboard')->with('invitation_url', route('invitations.accept', $token));
    }

    public function accept(string $token)
    {
        $invitation = DB::table('invitations')->where('token_hash', hash('sha256', $token))
            ->whereNull('accepted_at')->where('expires_at', '>', now())->first();
        abort_unless($invitation, 404);
        return view('invitations.accept', compact('invitation', 'token'));
    }

    public function complete(Request $request, string $token)
    {
        $invitation = DB::table('invitations')->where('token_hash', hash('sha256', $token))
            ->whereNull('accepted_at')->where('expires_at', '>', now())->first();
        abort_unless($invitation, 404);
        $data = $request->validate(['password' => ['required', 'confirmed', 'min:8']]);
        abort_if(User::where('email', $invitation->email)->exists(), 409, 'This invitation email already has an account.');

        DB::transaction(function () use ($invitation, $data) {
            $companyId = $invitation->company_id;
            if (!$companyId) $companyId = Company::create(['name' => $invitation->company_name])->id;
            $user = User::create([
                'name' => $invitation->name, 'email' => $invitation->email,
                'password' => Hash::make($data['password']), 'company_id' => $companyId,
            ]);
            $user->assignRole($invitation->role);
            DB::table('invitations')->where('id', $invitation->id)->update(['company_id' => $companyId, 'accepted_at' => now(), 'updated_at' => now()]);
        });
        return redirect()->route('login')->with('status', 'Invitation accepted. You can now log in.');
    }
}

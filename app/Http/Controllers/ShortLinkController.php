<?php

namespace App\Http\Controllers;

use App\Models\ShortLink;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ShortLinkController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        abort_unless($user->hasAnyRole(['super_admin', 'admin', 'member']), 403);
        $links = ShortLink::with(['user', 'company'])->latest()->when(
            !$user->hasRole('super_admin'), fn ($query) => $query->where('company_id', $user->company_id)
        )->when(
            $user->hasRole('member'), fn ($query) => $query->where('user_id', $user->id)
        )->paginate(15);
        return view('dashboard', compact('links'));
    }

    public function store(Request $request)
    {
        $user = $request->user();
        abort_if($user->hasRole('super_admin'), 403, 'Super Admins cannot create short links.');
        abort_unless($user->hasAnyRole(['admin', 'member']) && $user->company_id, 403);
        $data = $request->validate(['destination_url' => ['required', 'url:http,https', 'max:2048']]);
        do { $code = Str::random(7); } while (ShortLink::where('code', $code)->exists());
        $link = $user->shortLinks()->create([
            'company_id' => $user->company_id,
            'destination_url' => $data['destination_url'],
            'code' => $code,
        ]);
        return redirect()->route('dashboard')->with('status', 'Short link created: '.route('short-links.redirect', $link->code));
    }

    public function redirect(string $code)
    {
        $link = ShortLink::where('code', $code)->firstOrFail();
        return redirect()->away($link->destination_url);
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::firstOrCreate(['email' => 'superadmin@crm.com'], [
            'name' => 'Super Admin',
            'email' => 'superadmin@crm.com',
            'phone' => '9999999999',
            'password' => Hash::make('Admin@987'),
            'is_active' => true,
        ]);

        $user->syncRoles(['super_admin']);
    }
}

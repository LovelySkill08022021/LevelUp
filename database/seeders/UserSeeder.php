<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('users')->insert([
            'student_number' => "NI-2621",
            'last_name' => 'Cudapas',
            'first_name' => "Mark Justine",
            'middle_name' => "Sario",
            'user_type' => "faculty",
            'email' => "markjustinecudapas@gmail.com",
            'course' => "cpe",
            'verified' => 1,
            'password' => Hash::make('NI-2621'),
        ]);
    }
}

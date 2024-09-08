<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUser(){
        return [
            "id" => Auth()->user()->id,
            "student_number" => Auth()->user()->student_number,
            "last_name" => Auth()->user()->last_name,
            "first_name" => Auth()->user()->first_name,
            "middle_name" => Auth()->user()->middle_name,
            "user_type" => Auth()->user()->user_type,
            "email" => Auth()->user()->email,
            "email_verified_at" => Auth()->user()->email_verified_at,
        ];
    }
}

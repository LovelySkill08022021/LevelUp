<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'student_number' => 'required|string|regex:/^[a-zA-Z0-9]{2}-\d+$/|max:10',
            'last_name' => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'required|string|max:255',
            'user_type' => 'required',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'course' => 'required',
            'password' => ['required', 'confirmed', 'min:7'],
        ],
        [
            'student_number.regex' => 'The :attribute must be in the format "xx-xxxx" or xx-xxxxxx.',
            'student_number.required' => 'The :attribute field is required.',
        ]);

        $verify = 0;
        if($request->user_type == 'student'){
            $verify = 1;
        }

        $user = User::create([
            'student_number' => $request->student_number,
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'middle_name' => $request->middle_name,
            'user_type' => $request->user_type,
            'email' => $request->email,
            'course' => $request->course,
            'verified' =>  $verify,
            'password' => Hash::make($request->password)
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        
        $is_verified = $this->verifyUser();

        if($is_verified == 0){
            $custom_request = new Request();
            $custom_request = $request;
            $this->destroy($custom_request); 

            return back()->withErrors([
                'message' => "Your account is not yet verified. Please reach out your admin."
            ]);
        }



        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    public function verifyUser(){
        $user = User::where('id', Auth::user()->id)->first();

        return $user->verified;
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}

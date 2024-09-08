<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if(env("APP_ENV") === 'production'){
            $url = \Request::url();
            $check = strstr($url, "http://");
            if($check){
                $newUrl = str_replace("http", "https", $url);
                header("Location:" . $newUrl);
            }
        }
        
    }
}

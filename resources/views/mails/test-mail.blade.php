<style>
    .message {
        font-size: 16px;
        margin-bottom: 10px;
        font-family: sans-serif;
        color: #000 !important;
    }
    
    .message-header {
        text-align: left;
        font-size: 20px;
        margin-bottom: 20px;
        font-weight: bold;
    }

    .message-body {
        margin-bottom: 20px;
    }

    .password-css {
        /* display: inline-block; */
        /* padding: 5px 20px; */
        color: blue;
        font-size: 50px;
        font-family: monospace;
        margin-bottom: 20px;
        /* border: 1px solid #ddd; */
        /* text-align: center; */
    }

    #logo {
        /* height: 16px; */
        width: 20px;
    }
</style>

<div class="message">
    <div class="message-header">
        Request to reset password
    </div>
    <div class="message-body">
        <div>
            This password is requested by {{ $args->user->name }}
        </div>
        
        <div>
            If you did not request for a password reset, do not use the password below.
        </div>
    </div>

    <div class="password-css">
        {{$args->password}}
    </div>
    
    <div>
        From,
    </div>
    <div>
        Level Up Team
    </div>
</div>

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('app_classes', function (Blueprint $table) {
            $table->id();
            $table->string("name")->nullable(false);
            $table->smallInteger("semester")->nullable(false);
            $table->string("school_year")->nullable(false);
            $table->string("course")->nullable(false);
            $table->bigInteger("subject_id")->nullable(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_classes');
    }
};

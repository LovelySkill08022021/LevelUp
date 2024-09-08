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
        Schema::table('app_classes', function (Blueprint $table) {
            $table->bigInteger("faculty_id")->nullable(false)->unsigned()->after('subject_id');
            $table->smallInteger("year_level")->length(1)->nullable(false)->unsigned()->after('course');
            $table->char("section", length: 4)->nullable(false)->after('year_level');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};

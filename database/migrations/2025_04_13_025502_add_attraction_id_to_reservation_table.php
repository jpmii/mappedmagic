<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->foreignId('attraction_id')->constrained()->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn('attraction_id');
        });
    }
};

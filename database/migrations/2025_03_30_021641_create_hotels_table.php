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
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('destination_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('short_name');
            $table->string('api_id')->unique();
            $table->boolean('dvc');
            $table->string('transportation'); //Ferry, Skyliner, Monorail, Bus
            $table->time('pool_open')->default('10:00:00');
            $table->time('pool_close')->default('22:00:00');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};

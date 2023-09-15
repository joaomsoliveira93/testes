<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Locker extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lockers', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('isFree');
            $table->unsignedInteger('position');
            $table->date('releaseDate')->nullable;
            $table->unsignedInteger('cabinet_id');
            $table->foreign('cabinet_id')
            ->references('id')->on('cabinets')
            ->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lockers');
    }
}

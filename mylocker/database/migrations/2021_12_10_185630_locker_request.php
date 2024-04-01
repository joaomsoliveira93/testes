<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class LockerRequest extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('locker_request', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('status');
            $table->integer('locker');
            $table->unsignedInteger('group_id');
            $table->timestamps();
            $table->foreign('group_id')
            ->references('id')->on('groups')
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
        Schema::dropIfExists('locker_request');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class LockerAccess extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('locker_access', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamp('maded_at');
            $table->integer('operation');
            $table->integer('student_id');
            $table->unsignedInteger('locker_id');
            $table->foreign('student_id')
            ->references('id')->on('users')
            ->onDelete('cascade');
            $table->foreign('locker_id')
            ->references('id')->on('lockers')
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
        Schema::dropIfExists('locker_access');
    }
}

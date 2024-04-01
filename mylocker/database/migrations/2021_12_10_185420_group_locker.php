<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class GroupLocker extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_locker', function (Blueprint $table) {
            $table->unsignedInteger('group_id');
            $table->unsignedInteger('locker_id');
            $table->foreign('group_id')
            ->references('id')->on('groups')
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
        Schema::dropIfExists('group_locker');
    }
}

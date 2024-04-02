<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fb_accounts', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->string('email');  
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')
            ->references('id')->on('users');                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fb_accounts');
    }
};

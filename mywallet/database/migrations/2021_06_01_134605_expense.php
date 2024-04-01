<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Expense extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('expense', function (Blueprint $table) {
            $table->id();
            $table->string('Titulo');
            $table->double('Montante', 8, 2);
            $table->date('Data');
            $table->time('Hora');
            $table->foreignId('category_id')->constrained('category');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('expense');
    }
}

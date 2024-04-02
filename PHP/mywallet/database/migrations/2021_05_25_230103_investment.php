<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Investment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('investment', function (Blueprint $table) {
            $table->id();
            $table->string('Nome');
            $table->double('Montante', 8, 2);
            $table->date('DataOrdem');
            $table->time('HoraOrdem');
            $table->date('DataFecho')->nullable();
            $table->time('HoraFecho')->nullable();
            $table->double('MontanteFinal', 8, 2)->nullable();
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
        Schema::dropIfExists('investment');
    }
}

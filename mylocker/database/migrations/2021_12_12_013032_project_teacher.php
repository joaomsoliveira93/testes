<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ProjectTeacher extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_teacher', function (Blueprint $table) {
            $table->unsignedInteger('project_id');
            $table->unsignedInteger('teacher_id');
            $table->foreign('project_id')
            ->references('id')->on('projects')
            ->onDelete('cascade');
            $table->foreign('teacher_id')
            ->references('id')->on('teachers')
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
        Schema::dropIfExists('project_teacher');
    }
}

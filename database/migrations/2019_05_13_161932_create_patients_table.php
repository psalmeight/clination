<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('lastname')->nullable();
            $table->string('firstname')->nullable();
            $table->string('middlename')->nullable();
            $table->string('fullname')->nullable();
            $table->date('dob')->nullable();
            $table->string('address')->nullable();
            $table->string('gender')->nullable();

            $table->string('personal_history')->nullable();
            $table->string('family_history')->nullable();
            $table->string('allergies')->nullable();

            $table->string('father_name')->nullable();
            $table->string('father_occupation')->nullable();
            
            $table->string('mother_name')->nullable();
            $table->string('mother_occupation')->nullable();

            $table->string('gender')->nullable();

            $table->string('contact_no')->nullable();
            $table->integer('owned_by')->nullable();
            $table->integer('clinic_id')->unsigned()->nullable();
            $table->foreign('clinic_id')
                  ->references('id')->on('clinics')
                  ->onDelete('cascade');

            $table->integer('user_id')->unsigned()->nullable();
            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');

            $table->date('first_visit_date')->nullable();
            $table->date('last_visit_date')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patients');
    }
}

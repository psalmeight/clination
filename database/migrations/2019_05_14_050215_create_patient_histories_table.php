<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePatientHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_histories', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->dateTime('visit_datetime')->nullable();
            $table->string('chief_complaint')->nullable();
            $table->string('history_present_illness')->nullable();
            $table->string('physical_exam')->nullable();
            $table->string('diagnosis')->nullable();

            //these data will be on a different table in the future
            $table->string('init_weight')->nullable();
            $table->string('init_height')->nullable();
            $table->string('init_head_circumference')->nullable();
            $table->string('init_blood_pressure')->nullable();
            $table->string('init_pulse_rate')->nullable();
            $table->string('init_resp_rate')->nullable();
            $table->string('init_temp')->nullable();
            $table->string('medications')->nullable();
            $table->string('diagnostics')->nullable();


            $table->integer('patient_id')->unsigned()->nullable();
            $table->foreign('patient_id')
                  ->references('id')->on('patients')
                  ->onDelete('cascade');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patient_histories');
    }
}

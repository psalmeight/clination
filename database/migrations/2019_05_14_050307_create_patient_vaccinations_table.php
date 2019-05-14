<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePatientVaccinationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_vaccinations', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->dateTime('visit_datetime')->nullable();
            $table->date('vaccination_date')->nullable();
            $table->string('vaccination_notes')->nullable();

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
        Schema::dropIfExists('patient_vaccinations');
    }
}

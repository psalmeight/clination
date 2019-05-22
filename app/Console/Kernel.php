<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Storage;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->exec('pg_dump -U postgres apgclination > /var/www/html/clination/storage/app/backup-temp/temp/db-dumps/apgclination.backup')
        ->everyMinute()
        ->after(function () {
            $contents = Storage::disk('local')->get('backup-temp/temp/db-dumps/apgclination.backup');
            Storage::disk('s3')->put('clination_' . date('Y-m-d H:i:s') . '.backup', $contents);
        });;
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}

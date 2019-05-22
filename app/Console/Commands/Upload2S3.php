<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class Upload2S3 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'acejordan:superbackup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Upload backup file to s3';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $contents = Storage::disk('local')->get('backup-temp/temp/db-dumps/postgresql-apgclination.sql');
        Storage::disk('s3')->put('clination ' . date('Y-m-d H:i:s') . '.sql', $contents);
    }
}

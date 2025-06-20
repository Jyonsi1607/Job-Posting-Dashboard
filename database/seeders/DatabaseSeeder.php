<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $jobs = [
            [
                'title' => 'Laravel Web Developer',
                'type' => 'Full Time',
                'status' => 'Active',
                'applications' => 17,
                'duration' => '2mos 1w Remaining',
                'description' => 'We are looking for an experienced Laravel developer...'
            ],
            [
                'title' => 'Jewellery Designer',
                'type' => 'Full Time',
                'status' => 'Expired',
                'applications' => 0,
                'duration' => '1yr 1mo Remaining',
                'description' => 'Creative jewellery designer needed...'
            ],
            [
                'title' => 'Human Resources Intern',
                'type' => 'Full Time',
                'status' => 'Active',
                'applications' => 9,
                'duration' => '1yr 1mo Remaining',
                'description' => 'HR intern position available...'
            ],
            [
                'title' => 'Marketing Intern / Assistant',
                'type' => 'Internship',
                'status' => 'Active',
                'applications' => 2,
                'duration' => '5mos 2w Remaining',
                'description' => 'Marketing internship opportunity...'
            ]
        ];

        foreach ($jobs as $job) {
            Job::create($job);
        }
    }
}

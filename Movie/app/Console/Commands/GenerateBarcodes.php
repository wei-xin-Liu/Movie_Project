<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Picqer\Barcode\BarcodeGeneratorPNG;
use Illuminate\Support\Str;

class GenerateBarcodes extends Command
{
    protected $signature = 'users:generate-barcodes';
    protected $description = 'Generate barcodes for users';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $users = User::all(); // Or any specific criteria

        $generator = new BarcodeGeneratorPNG();

        $barcodeDirectory = storage_path('app/public/barcodes');

        // Create the directory if it doesn't exist
        if (!file_exists($barcodeDirectory)) {
            mkdir($barcodeDirectory, 0755, true);
        }

        $users = User::all();

        foreach ($users as $user) {
            // Generate barcode value based on user details
            // $barcodeValue = json_encode([
            //     'id' => $user->id,
            //     'name' => $user->name,
            //     'email' => $user->email,
            //     'membership_point' => $user->getTotalRewardPoints(),
            //     'membership_level' => $user->getMembershipLevel(),
            // ]);

            $uniqueId = $this->generateUniqueId();

            // Generate the barcode image
            $barcode = $generator->getBarcode(
                $uniqueId,
                $generator::TYPE_CODE_128,
                2,
                50
            );
            $filePath = "{$barcodeDirectory}/{$user->id}.png";

            // Save the barcode image
            file_put_contents($filePath, $barcode);

            $barcodeBase64 = base64_encode($barcode);

            $user->update([
                'barcode_path' => "barcodes/{$user->id}.png",
                'barcode_id' => $uniqueId,
                'barcode_image' => $barcodeBase64,
                'barcode_data' => json_encode([
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'membership_point' => $user->getTotalRewardPoints(),
                    'membership_level' => $user->getMembershipLevel(),
                ]),
            ]);
            // Save the barcode path and value to the database
            // $user->barcode_path = "barcodes/{$user->id}.png";
            // $user->barcode_value = $barcodeValue;
            // $user->save();
        }

        $this->info('Barcodes generated successfully.');
    }

    private function generateUniqueId()
    {
        do {
            $uniqueId = Str::random(10); // Generate a 10-character random string
        } while (User::where('barcode_id', $uniqueId)->exists());

        return $uniqueId;
    }
}

<?php

namespace App\Services;

use App\Models\User;
use Picqer\Barcode\BarcodeGeneratorPNG;
use Illuminate\Support\Str;

class BarcodeService
{
    public function generateForUser(User $user)
    {
        $generator = new BarcodeGeneratorPNG();
        $barcodeDirectory = storage_path('app/public/barcodes');

        if (!file_exists($barcodeDirectory)) {
            mkdir($barcodeDirectory, 0755, true);
        }

        $uniqueId = $this->generateUniqueId();

        $barcode = $generator->getBarcode(
            $uniqueId,
            $generator::TYPE_CODE_128,
            2,
            50
        );
        $filePath = "{$barcodeDirectory}/{$user->id}.png";

        file_put_contents($filePath, $barcode);

        $user->update([
            'barcode_path' => "barcodes/{$user->id}.png",
            'barcode_id' => $uniqueId,
            'barcode_data' => json_encode([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'membership_point' => $user->getTotalRewardPoints(),
                'membership_level' => $user->getMembershipLevel(),
            ]),
        ]);
    }

    private function generateUniqueId()
    {
        do {
            $uniqueId = Str::random(10);
        } while (User::where('barcode_id', $uniqueId)->exists());

        return $uniqueId;
    }
}

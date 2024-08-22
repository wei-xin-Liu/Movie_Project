<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class bluepay extends Controller
{
    // public function showPaymentButton()
    // {
    //     $paymentData = $this->preparePaymentData();
    //     return view('bluepayform', $paymentData);
    // }

    public function bluepaysuccessful(Request $request)
    {
        return $request->Status;
    }

    public function submitPayment(Request $request)
    {
        // var_dump($request->all());
        $ticket = $request->all();
        $paymentData = $this->preparePaymentData($ticket);
        return $paymentData;
    }

    private function preparePaymentData($ticket)
    {
        // var_dump($ticket);
        $key = "5tTi1gm5YFK71ktZoXJzh5Dv7co1enEj";
        $iv = "CNF45L4Ges7muETP";
        $mid = "MS353425245";
        
        $data = http_build_query([
            'MerchantID' => $mid,
            'TimeStamp' => time(),
            'Version' => '2.0',
            'RespondType' => 'JSON',
            'MerchantOrderNo' => time(),
            'Amt' =>  $ticket['totalPricestr'],
            'VACC' => '1',
            'ALIPAY' => '0',
            'WEBATM' => '1',
            'CVS' => '1',
            'CREDIT' => '1',
            'ClientBackURL' => 'https://dc62-118-163-218-100.ngrok-free.app/',
            'InstFlag' => '0',
            'ItemDesc' => $ticket["itemDescArray"],
        ]);

        $edata = bin2hex(openssl_encrypt($data, "AES-256-CBC", $key, OPENSSL_RAW_DATA, $iv));
        $hashs = "HashKey=" . $key . "&" . $edata . "&HashIV=" . $iv;
        $hash = strtoupper(hash("sha256", $hashs));

        return [
            'mid' => $mid,
            'edata' => $edata,
            'hash' => $hash,
        ];
    }
}

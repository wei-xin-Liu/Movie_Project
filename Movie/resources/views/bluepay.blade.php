<!DOCTYPE html>
<html>
<head>
    <title>Submitting Payment...</title>
</head>
<body>
    <form id="payment-form" method="POST" action="https://ccore.newebpay.com/MPG/mpg_gateway">
        <input type="hidden" name="MerchantID" value="{{ $mid }}">
        <input type="hidden" name="Version" value="2.0">
        <input type="hidden" name="TradeInfo" value="{{ $edata }}">
        <input type="hidden" name="TradeSha" value="{{ $hash }}">
    </form>
    <script>
        document.getElementById('payment-form').submit();
    </script>
</body>
</html>


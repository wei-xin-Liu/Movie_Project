import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Bluepay() {
    const { state } = useLocation();
    const {data} = state;
    const {mid, edata, hash} = data;

    useEffect(() => {
        const form = document.getElementById('payment-form');
        form.submit();
    }, [mid, edata, hash]);

    return (
        <div>
            <form id="payment-form" method="POST" action="https://ccore.newebpay.com/MPG/mpg_gateway">
                <input type="hidden" name="MerchantID" value={mid} />
                <input type="hidden" name="Version" value="2.0" />
                <input type="hidden" name="TradeInfo" value={edata} />
                <input type="hidden" name="TradeSha" value={hash} />
            </form>
            <p className='ml-[45%]'>Submitting payment...</p>
        </div>
    );
};
export default Bluepay

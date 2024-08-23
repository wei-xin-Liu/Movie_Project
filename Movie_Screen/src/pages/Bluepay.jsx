import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import {ContextProvider} from '../context/ContextProvider'

function Bluepay() {
    // const {user} = ContextProvider();
    const { state } = useLocation();
    const {data} = state;
    const {mid, edata, hash} = data;

    // console.log(user);
    



    // const mid = "MS353425245";
    // const edata = "7a791df0869c86c07edfb65fb08f1d9bd72fbdab399af11bc097bbebbd5d801c7c696f7ce5ddb21a54f1ed6ac4ca2c0a7160cf6d1b4aa76f885627ce36ad2ebc51a22f9a64be153c99f8ead3f6b75c7cf71e0385d6737498bdfae02d4174996796905844c12465ffb4249c59a3992cee82978692a5eaa9d5b2aa8dfe08cafb0d6cbc8f73cce336966f9d63947962cb42c26883dfe7cf49a70d8e4068c83eb8c78f3176520ead311da9c7f71994c7d97fc1209b2be899a185e6e794b9b7dfdb98bc38a449a1238327034f157c64fb8b94887a8aea2068dc4610b04d64628c5a17d30f6643ef8eb1fd717e0134c3eeac5eb36d08939916837d47ef2a2230f1f73ff53850272d0958c54728970f692ca21323535341a7d4e816fdf52c7e3d1a67cd01c883130dcd81a68da74fa5cc43459c";
    // const hash = "775CA5EA075FC24AFCF178E7BADE24843B64D8DFA1B8E6A3AF2361610A60A2AA";
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
            <p>Submitting payment...</p>
        </div>
    );
};
export default Bluepay

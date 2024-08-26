import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Bluepaysuccess() {

    const navigate = useNavigate();
    
    function handleReturn() {
        navigate('/');
    }
    // const [paymentData, setPaymentData] = useState(null);

    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       // 如果使用令牌方法
    //       const urlParams = new URLSearchParams(window.location.search);
    //       const token = urlParams.get('token');

    //       const response = await axios.get('https://2e72-118-163-218-100.ngrok-free.app/Movie_Project/movie/public/api/getPaymentData', {
    //         params: { token },
    //         withCredentials: true // 如果使用會話，確保包含憑證
    //       });

    //       setPaymentData(response.data);
    //     } catch (error) {
    //       console.error('Error fetching payment data:', error);
    //     }
    //   };

    //   fetchData();
    // }, []);

    // if (!paymentData) return <div>Loading...</div>;


    // useEffect(() => {
    //     const fetchdata = async () => {
    //         try {
    //             const response = await axios.get('https://b83a-118-163-218-100.ngrok-free.app/Movie_Project/movie/public/api/bluepaysuccessful');
    //             console.log(response.data);
    //         } catch (error) {
    //             console.error('Error fetching movies:', error);
    //         }
    //     };

    //     fetchdata();
    // }, []);


    return (
        <>
         {/* <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
             <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                 <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"> */}
                        <div className="text-center">
                            {/* <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" /> */}
                            <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                                付款完成
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                感謝您的購買！您的訂單已經成功處理。
                            </p>
                        </div>

                        {/* <div className="mt-8">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500">訂單資訊</p>
                                <p className="mt-1 text-sm text-gray-900">ORD-12345-ABCDE</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">付款金額</p>
                                <p className="mt-1 text-sm text-gray-900">NT$1,000</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">付款方式</p>
                                <p className="mt-1 text-sm text-gray-900">信用卡</p>
                            </div>
                        </div>
                    </div> */}

                        <div className="mt-8 ml-[47%]">
                            <button
                                type="button"
                                onClick={handleReturn}
                                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                返回首頁
                            </button>
                        </div>
                 {/* </div>
             </div>
         </div> */}
        </>

    );
}

export default Bluepaysuccess
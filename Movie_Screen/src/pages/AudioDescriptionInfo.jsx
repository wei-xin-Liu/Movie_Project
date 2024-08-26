import React from 'react'

function AudioDescriptionInfo() {
    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-flow-row gap-[2%] mt-[2%]">
				<h1 className="bg-slate-50 border-t border-gray-300 py-2">
					<p className="text-xl font-bold ps-5">口述影像介紹</p>
				</h1>
			</div>
            {/* <h2 className="text-2xl font-bold mt-6 mb-4">口述影像介紹</h2> */}
            <p className="mb-4">視障口述影像服務（英文：audio description，或descriptive video service），簡稱口述影像，是一種透過口語或文字敘述，將視障者無法接收的影像訊息轉換成言辭符號，讓視障者也能克服視覺障礙，協助他們克服生活、學習和就業環境中各種影像障礙的服務。簡單地說，口述影像就是把「看見」的「說」出來。</p>
            <p className="mb-4">口述影像電影就是在不干擾節目原有之聲音訊息和對白的情況下，將影片中的視覺成分，如空間佈景、場景、人物表情、動作等用語言加以解釋與描述的技術，讓視障者可以感受到電影饗宴。</p>

            <div className="grid grid-flow-row gap-[2%] mt-[2%]">
				<h1 className="bg-slate-50 border-t border-gray-300 py-2">
					<p className="text-xl font-bold ps-5">電影購票須知</p>
				</h1>
			</div>
            {/* <h2 className="text-2xl font-bold mt-6 mb-4">電影購票須知</h2> */}
            <p className="mb-2">一、視障者憑『身心障礙證明』可購買「愛心票」。</p>
            <p className="mb-2">二、『愛心票』可於線上訂票或至影城臨櫃購票，若於線上訂購愛心票，須於電影開演前30分鐘憑『身心障礙證明』至影城臨櫃出示證件取票，每張票需加收$20線上訂票手續費。</p>
            <p className="mb-2">口述影像影城相關資訊:</p>
            <ul className="list-disc pl-5 mb-4">
                <li className='ml-5'>第一影城:台中市東區南京路76號 電話：(04)-3476-2366</li>
            </ul>
            <p className="mb-4">三、如欲訂票或查詢場次，請參閱電影「口述影像」之場次時間。</p>

            <div className="grid grid-flow-row gap-[2%] mt-[2%]">
				<h1 className="bg-slate-50 border-t border-gray-300 py-2">
					<p className="text-xl font-bold ps-5">相關問題</p>
				</h1>
			</div>
            {/* <h2 className="text-2xl font-bold mt-6 mb-4">相關問題</h2> */}
            <p className="font-bold mb-2">Q1：口述場與一般場有何不同?</p>
            <p className="mb-4">電影內容無差異，口述場有另外提供視障者專用耳機租借服務，讓視障者可以欣賞影片。只有配戴專用耳機的觀眾可聽到口語述敘，因此不會影響同場觀眾，所以非視障者也能一起同享口述場影片。</p>
            <p className="font-bold mb-2">Q2：每部電影皆有口述場次嗎?</p>
            <p className="mb-4">僅有經過口述影像專業製作的影片才有，訂票時請點選標示『口述場』之場次。</p>
            <p className="font-bold mb-2">Q3：如何租借口述影像設備?</p>
            <p className="mb-4">視障者可憑身心障礙證明免費借用。租借期間使用者需質押有效證件，散場時應歸還口述影像設備，經服務人員確認設備完好無缺後退還證件，若口述影像設備返還時有損毀或遺失，使用者須照價賠償。</p>
        </div>
    );
}


export default AudioDescriptionInfo
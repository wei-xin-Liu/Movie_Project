import React from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import { sections } from '../constants/sections';

const FAQSection = ({ title, questions }) => {
	return (
		<div className='py-2 px-5'>
			<div className='w-52 h-12 bg-slate-400 my-2 mx-2'>
				<p className='py-2 px-2 text-center text-xl font-bold tracking-wider'>
					{title}
				</p>
			</div>
			<Accordion>
				{questions.map((q, index) => (
					<AccordionItem
						key={index}
						title={q.question}
						className='border-b p-1 rounded-[0.375rem]'
						// css={{
						// 	padding: '1rem',
						// 	borderRadius: '0.375rem',
						// }}
					>
						<ul className='pl-5'>
							{q.answer.map((item, i) => (
								<li key={i} className='mb-2 list-disc text-left'>
									{item}
								</li>
							))}
						</ul>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

export default function QACollapsible() {
	// const sections = [
	// 	{
	// 		title: '影城相關問題',
	// 		questions: [
	// 			{
	// 				question: '秀泰影城電影格式介紹',
	// 				answer: [
	// 					'2D數位版 (數位)：以數位放映設備播放的高畫質影片，較一般膠卷來得明亮清晰、色彩飽合，不需配戴3D眼鏡。',
	// 					'2D ScreenX：為秀泰影城與韓國CJ4DPLEX合作，領先全台首次引進的「270°沉浸式視野的多投影技術」。過往觀影者觀賞電影僅能聚焦於前方銀幕，然而「ScreenX」在電影的某些劇情時，可讓畫面延伸至影廳兩側銀幕，一口氣將銀幕延伸為270°的全景觀影，讓觀影者可透過眼角餘光觀賞到更多的畫面，並同步升級杜比重低音以及環繞音響，達到包覆感十足的沉浸式觀影體驗，目前於欣欣秀泰影城、台北文心秀泰影城、高雄夢時代影城播放。',
	// 					'2D Dolby Atmos (AT)：以數位Dolby Atmos技術播放的影片，杜比全景聲（Dolby Atmos）是最先進的音場技術，每組喇叭都是獨立輸出音源，高達44組獨立聲道，可讓觀眾上、下、左、右全方位被聲音包圍，新增於影廳頂部的天空聲道和全環繞多聲道，使您觀賞Dolby Atmos版本影片時可有如聲歷其境的感覺，目前僅於板橋秀泰影城Dolby Atmos廳(1廳)內播放。',
	// 				],
	// 			},
	// 			{
	// 				question: 'What is Tailwind CSS?',
	// 				answer: [
	// 					'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.',
	// 				],
	// 			},
	// 			{
	// 				question: 'What is React Aria?',
	// 				answer: [
	// 					'React Aria provides a collection of accessible React hooks and components.',
	// 				],
	// 			},
	// 		],
	// 	},
	// 	{
	// 		title: '購票相關問題',
	// 		questions: [
	// 			{
	// 				question: '秀泰影城電影格式介紹',
	// 				answer: [
	// 					'2D數位版 (數位)：以數位放映設備播放的高畫質影片，較一般膠卷來得明亮清晰、色彩飽合，不需配戴3D眼鏡。',
	// 					'2D ScreenX：為秀泰影城與韓國CJ4DPLEX合作，領先全台首次引進的「270°沉浸式視野的多投影技術」。過往觀影者觀賞電影僅能聚焦於前方銀幕，然而「ScreenX」在電影的某些劇情時，可讓畫面延伸至影廳兩側銀幕，一口氣將銀幕延伸為270°的全景觀影，讓觀影者可透過眼角餘光觀賞到更多的畫面，並同步升級杜比重低音以及環繞音響，達到包覆感十足的沉浸式觀影體驗，目前於欣欣秀泰影城、台北文心秀泰影城、高雄夢時代影城播放。',
	// 					'2D Dolby Atmos (AT)：以數位Dolby Atmos技術播放的影片，杜比全景聲（Dolby Atmos）是最先進的音場技術，每組喇叭都是獨立輸出音源，高達44組獨立聲道，可讓觀眾上、下、左、右全方位被聲音包圍，新增於影廳頂部的天空聲道和全環繞多聲道，使您觀賞Dolby Atmos版本影片時可有如聲歷其境的感覺，目前僅於板橋秀泰影城Dolby Atmos廳(1廳)內播放。',
	// 				],
	// 			},
	// 			{
	// 				question: 'What is Tailwind CSS?',
	// 				answer: [
	// 					'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.',
	// 				],
	// 			},
	// 			{
	// 				question: 'What is React Aria?',
	// 				answer: [
	// 					'React Aria provides a collection of accessible React hooks and components.',
	// 				],
	// 			},
	// 		],
	// 	},
	// 	{
	// 		title: '電影上映相關問題',
	// 		questions: [
	// 			{
	// 				question: '秀泰影城電影格式介紹',
	// 				answer: [
	// 					'2D數位版 (數位)：以數位放映設備播放的高畫質影片，較一般膠卷來得明亮清晰、色彩飽合，不需配戴3D眼鏡。',
	// 					'2D ScreenX：為秀泰影城與韓國CJ4DPLEX合作，領先全台首次引進的「270°沉浸式視野的多投影技術」。過往觀影者觀賞電影僅能聚焦於前方銀幕，然而「ScreenX」在電影的某些劇情時，可讓畫面延伸至影廳兩側銀幕，一口氣將銀幕延伸為270°的全景觀影，讓觀影者可透過眼角餘光觀賞到更多的畫面，並同步升級杜比重低音以及環繞音響，達到包覆感十足的沉浸式觀影體驗，目前於欣欣秀泰影城、台北文心秀泰影城、高雄夢時代影城播放。',
	// 					'2D Dolby Atmos (AT)：以數位Dolby Atmos技術播放的影片，杜比全景聲（Dolby Atmos）是最先進的音場技術，每組喇叭都是獨立輸出音源，高達44組獨立聲道，可讓觀眾上、下、左、右全方位被聲音包圍，新增於影廳頂部的天空聲道和全環繞多聲道，使您觀賞Dolby Atmos版本影片時可有如聲歷其境的感覺，目前僅於板橋秀泰影城Dolby Atmos廳(1廳)內播放。',
	// 				],
	// 			},
	// 			{
	// 				question: 'What is Tailwind CSS?',
	// 				answer: [
	// 					'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.',
	// 				],
	// 			},
	// 			{
	// 				question: 'What is React Aria?',
	// 				answer: [
	// 					'React Aria provides a collection of accessible React hooks and components.',
	// 				],
	// 			},
	// 		],
	// 	},
	// ];

	return (
		<div className='w-[90%] mx-auto mt-10'>
			<div className='ml-0 p-0'>
				<h1 className='text-2xl font-bold mb-6'>Frequently Asked Questions</h1>
			</div>
			{sections.map((section, index) => (
				<FAQSection
					key={index}
					title={section.title}
					questions={section.questions}
				/>
			))}
		</div>
	);
}

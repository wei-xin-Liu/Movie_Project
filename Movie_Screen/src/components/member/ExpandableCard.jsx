import { Card, Button, CardHeader, CardBody } from '@nextui-org/react';
import { useState } from 'react';
import { IconArrowBadgeDown } from '@tabler/icons-react';
import { IconArrowBadgeUp } from '@tabler/icons-react';

export default function ExpandableCard({ width }) {
	const [expanded, setExpanded] = useState(false);

	const toggleExpand = () => {
		setExpanded(!expanded);
	};

	return (
		<Card
			className={`${width} shadow-xl border-2 transition-all duration-700 ease-in-out cursor-pointer hover:scale-105 focus:scale-105`}
		>
			<CardHeader className='justify-between'>
				<div className='flex-col'>
					<p className='text-base tracking-tight text-blue-500'>
						異形：羅穆路斯
					</p>
					<p className='text-sm tracking-tight text-slate-500'>
						ALIEN: ROMULUS
					</p>
				</div>
				{/* Can I take payment status from database? change colour */}
				<div>
					<div className='flex-row'>
						<p>payment success</p>
						{/* <div className='bg-red-500 w-20 h-20 justify-center item-center'></div> */}
					</div>
				</div>
			</CardHeader>
			<CardBody className='space-y-1'>
				<p className='text-sm tracking-tight text-slate-500'>影廳</p>
				<p className='indent-4 text-sm tracking-tight text-zinc-800'>巨幕1廳</p>
				<p className='text-sm tracking-tight text-slate-500'>時間</p>
				<p className='indent-4 text-sm tracking-tight text-zinc-800'>
					2024/08/15 10:30
				</p>
				<p className='text-sm tracking-tight text-slate-500'>座位</p>
				<p className='indent-4 text-sm tracking-tight text-zinc-800'>8排15</p>
				{/* <CardFooter className='flex-col justify-between items-center w-full'> */}
				<div
					className='py-2 flex items-center justify-center cursor-pointer hover:text-gray-500 transition-colors duration-200'
					onClick={toggleExpand}
				>
					{expanded ? (
						<IconArrowBadgeUp stroke={1.25} />
					) : (
						<IconArrowBadgeDown stroke={1.25} />
					)}
				</div>
				{expanded && (
					<div
						className={`
                        overflow-hidden
                        transition-[max-height] duration-[3000ms] ease-in-out
                        transition-[opacity] duration-[2000ms] ease-in-out
                        transition-[margin] duration-[1000ms] ease-in-out
                        ${
													expanded
														? 'max-h-[1000px] opacity-100 mt-4'
														: 'max-h-0 opacity-0 mt-0'
												}
                      `}
					>
						<div className='flex-col py-2 space-y-1 border-t border-gray-200'>
							<p className='text-sm tracking-tight text-slate-500'>票別：</p>
							<p className='indent-4 text-sm tracking-tight text-zinc-800'>
								早優 x 1
							</p>
							<p className='text-sm tracking-tight text-slate-500'>明細：</p>
							<p className='indent-4 text-sm tracking-tight text-zinc-800'>
								電影票 x 1
							</p>
							<p className='text-sm tracking-tight text-slate-500'>
								訂單編號：
							</p>
							<p className='indent-4 text-sm tracking-tight text-zinc-800'>
								4146933
							</p>
							<p className='text-sm tracking-tight text-slate-500'>
								訂單時間：
							</p>
							<p className='indent-4 text-sm tracking-tight text-zinc-800'>
								2024/08/12 09:16:33
							</p>
							<p className='text-sm tracking-tight text-slate-500'>金額：</p>
							<p className='indent-4 text-sm tracking-tight text-zinc-800'>
								$420
							</p>
							<p className='text-sm tracking-tight text-slate-500'>
								付款方式：
							</p>
							<p className='indent-4 text-sm tracking-tight text-zinc-800'>
								線上刷卡
							</p>
						</div>
					</div>
				)}
				{/* </CardFooter> */}
			</CardBody>
		</Card>
	);
}

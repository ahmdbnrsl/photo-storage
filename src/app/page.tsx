import Image from 'next/image';
import BlurText from '@/components/reactbits/BlurText/BlurText';
import { Copy, ImagePlus, Images, Link } from 'lucide-react';

export default function Home() {
	return (
		<div className="flex bg-zinc-900 w-full min-h-screen">
			<nav className="w-full fixed top-0 flex py-3 px-5 bg-zinc-900 shadow-xl shadow-zinc-900">
				<p className="text-xl font-normal text-[#0bcaf9] flex items-center gap-2">
					<Images></Images> Photo{' '}
					<span className="text-white">Storage</span>
				</p>
			</nav>
			<header className="md:px-5 mt-14 md:mt-40 flex flex-col md:flex-row h-fit w-full gap-5">
				<div className="w-full h-50 md:w-1/3 border border-zinc-800 rounded-xl overflow-hidden">
					<Image
						src="/background/header.png"
						alt="hero"
						width={500}
						height={500}
						className="object-cover w-full h-fit object-center"
					/>
				</div>
				<div className="md:flex-grow flex flex-col px-5">
					<BlurText
						text="SI A 2024"
						delay={150}
						animateBy="words"
						direction="top"
						className="text-4xl md:text-6xl mb-8 font-medium"
					/>
					<p className="text-zinc-500 font-normal text-lg -mt-3">
						Created At 02 Mei 2025
					</p>
					<button className="p-2 mt-3 w-fit text-lg text-blue-400 border border-zinc-500 cursor-pointer bg-zinc-900 rounded-full flex items-center justify-center">
						<Link />
					</button>
				</div>
			</header>
			<div className="fixed bottom-0 bg-zinc-900 py-4 px-5 flex justify-center w-full">
				<button className="px-6 py-2 mt-3 w-fit text-zinc-800 bg-zinc-300 cursor-pointer rounded-full flex items-center justify-center gap-2 text-base font-medium">
					<ImagePlus /> Tambahkan Foto
				</button>
			</div>
		</div>
	);
}

import { NextComponentType } from "next";
import clsx from "clsx";
import { useState } from "react";
import { MdClose } from "react-icons/md";

import MenuIcon from "@public/assets/icons/menu-icon.svg";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	bgImage?: string;
};

const Layout: NextComponentType<{}, {}, Props> = ({ bgImage, className, children, ...rest }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="fixed inset-0 bg-gray-900">
			<div className="fixed flex flex-col z-10 items inset-0 text-gray-200 min-h-screen max-h-screen pt-[200px] overflow-auto custom-scroolbar" >
				<header className="fixed z-20 backdrop-blur-md top-0 inset-x-0 bg-gray-900/[80%] flex flex-col items-center py-[48px] px-[80px] md:bg-transparent md:backdrop-blur-none md:pt-[40px] lg:items-start">
					<button
						onClick={() => setOpen(!open)}
						className="absolute top-10 right-10">
						{open ? (
							<MenuIcon />
						) : (
							<MdClose />
						)}
					</button>

					<div className="text-center lg:text-left">
						<h1 className="font-medium text-sm">
							MY.WEATHER
						</h1>

						<h2 className="text-xs opacity-40">
							developed by zanoti.dev
						</h2>
					</div>
				</header>

				<main className={clsx("relative z-10 min-w-full min-h-full", className)} {...rest}>
					{children}
				</main>
			</div>

			{bgImage && (
				<div className="fixed inset-0">
					<img
						src={bgImage}
						className="w-full h-full object-cover opacity-25"
						alt="Imagem de paisagem com montanhas"
						data-testid="background-image" />
				</div>
			)}
		</div >
	);
}

export default Layout;
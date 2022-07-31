import { NextComponentType } from "next";
import { useState } from "react";
import { MdClose } from "react-icons/md";

import MenuIcon from "@public/assets/icons/menu-icon.svg";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
};

const Layout: NextComponentType<{}, {}, Props> = ({ children, ...rest }) => {
	const [open, setOpen] = useState(false);

	return (
		<div className="fixed items inset-0 bg-gray-900 text-gray-200 min-h-screen max-h-screen pt-[200px] overflow-auto custom-scroolbar">
			<header className="fixed z-10 backdrop-blur-lg top-0 inset-x-0 bg-gray-900/[80%] flex flex-col items-center pt-[80px] pb-[64px] px-[80px]">
				<button
					onClick={() => setOpen(!open)}
					className="absolute top-10 right-10">
					{open ? (
						<MenuIcon />
					) : (
						<MdClose />
					)}
				</button>

				<div className="text-center">
					<h1 className="font-medium text-sm">
						MY.WEATHER
					</h1>

					<h2 className="text-xs opacity-40">
						developed by zanoti.dev
					</h2>
				</div>
			</header>

			<main {...rest}>
				{children}
			</main>
		</div>
	);
}

export default Layout;
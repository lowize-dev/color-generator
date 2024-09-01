import { useState, useEffect } from "react";

const Header = ({
	theme, toggleTheme, handleInputSearch, condClear, setCondClear
}) => {
	const [value, setValue] = useState("");
	useEffect(() => {
		if (condClear) {
			setValue("");
			setCondClear(false);
		}
	}, [condClear, setCondClear])
	return (
		<header>
			<nav
				className="
					w-screen tablet:px-10 tablet:pt-4 bg-transparent
					flex justify-between items-center font-inter
				"
			>
				<a href="https://github.com/lowize-dev" target="_blank"><Logo/></a>
				<div className="input-container md:w-1/3 tablet:w-1/2">
				    <input
				    	value={value}
				    	onChange={(e) => {
				    		const val = e.target.value;
				    		setValue(val);
				    		handleInputSearch(val);
				    	}}
				      type="text"
				      name="text"
				      className="
				      	dark:focus:shadow-[-12px_-10px_0_0_#efefef] input
				      	dark:text-white dark:bg-[#303234] dark:border-[#efefef]
				      "
				      placeholder="Search for a color"
				    />
	      		</div>
				<input
					type="checkbox"
					checked={theme === "dark"}
					onChange={toggleTheme}
					className="theme-checkbox dark:border-[#efefef]"
				/>
			</nav>
			<section
				className="
					text-center tablet:text-[2rem] text-[1.6rem] font-bold
					tablet:pb-7 pb-4 text-[#303234] dark:text-[#efefef] px-4
			">
				<h1>Color Generator</h1>
			</section>
		</header>
	);
};

const Logo = () => {
	return (
		<div className="theme-mode tablet:scale-[0.65] scale-[0.5]">
				<div className="theme-loader">
					<div className="dark:border-t-[#efefef]"></div>
					<div className="dark:border-t-[#efefef]"></div>
					<div className="dark:border-t-[#efefef]"></div>
				</div>
		</div>
	);
};

export default Header;
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import Header from "./components/Header.jsx";
import ContentField from "./components/ContentField.jsx";

const App = ({
}) => {
	const [searchInput, setSearchInput] = useState("");
	const [matchingColors, setMatchingColors] = useState([]);
	const [colors, setColors] = useState({});
	const [condClear, setCondClear] = useState(false);

	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem("theme");
		return savedTheme ? JSON.parse(savedTheme) : "light";
	});

	useEffect(() => {
		localStorage.setItem("theme", JSON.stringify(theme));
		theme === "dark" ?
			document.documentElement.classList.add("dark") :
			document.documentElement.classList.remove("dark");
	}, [theme]);

	useEffect(() => {
		axios.get("./colors_data.json")
			.then(res => setColors(res.data))
			.catch(err => {
				alert(`${err}`);
				console.log(err);
			});
	}, [])
	

	const handleSearchColors = (input) => {
		const matchedList = colors[input] || [];
		setSearchInput(input);
		setMatchingColors(matchedList);
	}

	const toggleTheme = () =>
		setTheme((prev) => (prev === "light" ? "dark" : "light"));

	const handleInputSearch = (event) =>
		handleSearchColors(event.trim().toLowerCase());

	const clearInput = () => {
		setCondClear(true);
		setSearchInput("");
		setMatchingColors([]);
	}

	return (
		<section
			className="
				w-full h-screen bg-[#dedede] dark:bg-[#303234]
				duration-100 font-inter flex flex-col relative"
		>
			<Header
				condClear={condClear}
				setCondClear={setCondClear}
				theme={theme}
				toggleTheme={toggleTheme}
				handleInputSearch={handleInputSearch}
			/>
			<div className="w-full flex-1 overflow-y-auto overflow-x-hidden">
				<ContentField matchingColors={matchingColors} clearInput={clearInput}/>
			</div>
		</section>
	)
}

export default App;
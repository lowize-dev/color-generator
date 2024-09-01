import { useState, useEffect } from "react";

const ContentField = ({
	matchingColors, clearInput
}) => {

	const [colorList, setColorList] = useState([]);
	const [copiedColorIndex, setCopiedColorIndex] = useState(null);

	useEffect(() => {
		generateColorPalette();
	}, []);

	useEffect(() => {
		if (copiedColorIndex !== null) {
			const timer = setTimeout(() => {
				setCopiedColorIndex(null);
			}, 1200);
			return () => clearTimeout(timer);
		}
	}, [copiedColorIndex]);

	const copyColorValueToClipboard = (hex, index) => {
		navigator.clipboard
			.writeText(hex.toUpperCase())
			.then(() => setCopiedColorIndex(index))
			.catch(() => alert("An error occured, failed to copy color!"));
	}

	const generateColorPalette = () => {
		const maxColorBoxes = 40;
		const colors = [];

		for (let i=0; i < maxColorBoxes; i++) {
			const randomHexColors = `#${Math.floor(Math.random() * 0xffffff)
				.toString(16)
				.padStart(6, "0")}`;
			colors.push(randomHexColors)
		}
		setColorList(colors);
		setCopiedColorIndex(null);
	}

	const filteredList = matchingColors.length > 0 ? matchingColors : colorList;
	return (
		<main className="flex flex-col items-center">
			<ul className="
				overflow-y-scroll flex flex-wrap tablet:gap-10 gap-5
				justify-center tablet:px-5 px-3 pt-5
			">
				{filteredList.map((hex, index) => (
					<li
						className="
							text-center dark:bg-[#4b4b4b] bg-white p-[10px]
							rounded-xl flex flex-col gap-2 dark:text-white
							hover:shadow-2xl duration-300 tablet:w-[250px] w-[182.5px]
							cursor-pointer hover:scale-[1.05]
						"
						key={index}
						onClick={() => copyColorValueToClipboard(hex, index)}>
						<div
							className={`
								w-full tablet:h-[230px] h-[150px] rounded-md relative overflow-hidden
								${copiedColorIndex === index ? "activeText" : "hoverText"}
							`}
							style={{ background: hex }}></div>
						<span className="font-semibold tablet:text-[1.1rem] text-[15px]">{hex.toUpperCase()}</span>
					</li>
				))
				}
			</ul>
			<button
				className="
					p-3 bg-green-400 px-[40px] tablet:px-[90px] rounded-full bg-[#303234] text-[#efefef]
					dark:bg-[#efefef] dark:text-[#303234] active:scale-[0.93]
					duration-200 ease-linear mt-10 mb-7
				"
				onClick={() => {
					generateColorPalette()
					clearInput()
				}}>Generate Colors</button>
		</main>
	)
};

export default ContentField;
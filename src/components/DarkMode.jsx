import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

const DarkMode = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="flex items-center gap-2 cursor-pointer" onClick={toggleTheme}>
            {theme ? (
                <BsFillMoonStarsFill className="text-orange-200 text-2xl" />
            ) : (
                <BsFillSunFill className="text-yellow-500 text-2xl" />
            )}
        </div>
    );
};

export default DarkMode;

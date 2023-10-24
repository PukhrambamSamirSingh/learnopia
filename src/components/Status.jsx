import { useContext, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { data } from '../data';
import { ThemeContext } from '../context/ThemeContext';

const Status = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { dark } = useContext(ThemeContext)

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    return (
        <div className='w-2/5 lg:w-2/5 mb-10 hidden md:flex flex-col gap-4 sticky top-24' style={{
            height: "calc(100vh - 80px)"
        }}>
            <div className='w-full flex justify-center'>
                {data.map((item, index) => (
                    <div
                        className={`w-full p-4 shadow-lg rounded-md flex flex-col gap-4 ${index !== currentIndex ? 'hidden' : ''} ${dark ? "bg-gray-800" : ""}`}
                        key={item.id}
                    >
                        <div className='flex items-center gap-2'>
                            <img className='w-10 h-10 object-cover rounded-full' src={item.image} alt="" />
                            <div className='flex flex-col'>
                                <h1 className='font-semibold'>{item.name}</h1>
                            </div>
                        </div>
                        <p className='text-gray-500 text-sm font-sans'>
                            {item.desc.length > 200 ? `${item.desc.substring(0, 150)}...` : item.desc}
                        </p>
                        <span className='text-blue-700'>
                            {item.workplace}
                        </span>
                    </div>
                ))}
            </div>
            <div className='flex items-center gap-2'>
                <button
                    className={`p-3 shadow-lg rounded-full ${dark ? "bg-gray-800" : "bg-white"}`}
                    disabled={currentIndex === 0}
                    onClick={handlePrevious}
                >
                    <IoIosArrowBack className='text-gray-600' />
                </button>
                <button
                    className={`p-3 shadow-lg rounded-full ${dark ? "bg-gray-800" : "bg-white"}`}
                    disabled={currentIndex === data.length - 1}
                    onClick={handleNext}
                >
                    <IoIosArrowForward className='text-gray-600' />
                </button>
            </div>
            <div className='flex flex-col gap-4'>
                <form className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="content">Enter your text</label>
                        <textarea name="content" id="content" cols="30" rows="5" className='rounded-md bg-gray-700 p-2 border outline-none' />
                    </div>
                    <div className='flex'>
                        <button className='px-4 py-1 text-sm bg-green-600 rounded-full max-w-max' type='submit'>Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Status;

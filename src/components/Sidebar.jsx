import React, { useState } from "react";
import { FiPieChart, FiSettings } from "react-icons/fi";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdEditCalendar } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
const Sidebar = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isActive, setActive] = useState("Dashboard");
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const navItems = [
        { name: "Dashboard", path: "/dashboard", icon: FiPieChart },
        { name: "Transaction", path: "/dashboard", icon: IoPricetagsOutline },
        { name: "Schedules", path: "/dashboard", icon: MdEditCalendar },
        { name: "Users", path: "/dashboard", icon: BiUserCircle },
        { name: "Settings", path: "/dashboard", icon: FiSettings },
    ];

    const handleSetActive = (name) => {
        setActive((prev) => name);
    };

    useEffect(() => {
        AOS.init({
            duration: 1200,
            mirror: false,
            easing: "ease-out",
        });
    }, []);
    return (
        <div  className='flex h-full relative '>
            <div  className='flex-none sm:hidden max-sm:absolute max-sm:top-[62px] max-sm:left-3'>
                <button
                    className='flex items-center justify-center w-10 text-black p-0'
                    onClick={toggleSidebar}>
                    <svg
                        className='h-6 w-6'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'>
                        {isSidebarOpen ? (
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M6 18L18 6M6 6l12 12'
                            />
                        ) : (
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 6h16M4 12h16M4 18h16'
                            />
                        )}
                    </svg>
                </button>
            </div>
            <div data-aos="fade-right"
                className={`flex-none sm:flex ${isSidebarOpen ? "flex" : "hidden"
                    } bg-black w-64 p-4 transition-all duration-300 ease-in-out
          text-[#fff] my-auto rounded-[1.8rem] mx-20 max-sm:mx-0
           flex-col relative font-[300] pl-10 max-sm:absolute max-sm:top-14 max-sm:left-14 z-10 h-[1100px]
        `}>
                <h1  data-aos="fade-right"
      className='text-3xl font-bold py-10'>Switchy</h1>

                <ul className='flex flex-col gap-10'>
                    {navItems.map((item, index) => (
                        <li data-aos="fade-right"
                            key={index}
                            className='flex items-center gap-4 hover:cursor-pointer'
                            onClick={() => handleSetActive(item.name)}>
                            <item.icon
                                className={`text-xl ${item.name === "Transaction" &&
                                    "transform scale-x-[-1]"
                                    }`}
                            />
                            <a 
                                onClick={() => handleSetActive(item.name)}
                                className={`text-l   font-${isActive === item.name
                                    ? "bold"
                                    : "normal"
                                    }`}>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className='flex flex-col gap-4 absolute bottom-0 mb-10 left-10 font-[300] '>
                    <a href={"/dashboard"}>Help</a>
                    <a href={"/dashboard"}>Contact us</a>
                </div>
            </div>
            <div className='w-[100%] p-10'>{children}</div>
        </div>
    );
};

export default Sidebar;

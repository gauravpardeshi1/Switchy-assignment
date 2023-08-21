import React from "react";
import { IoPricetagsOutline } from "react-icons/io5";
import { AiOutlineLike, AiOutlineMoneyCollect } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
const Testimonials = () => {
	const testimonials = [
		{
			title: "Total Revenue",
			icon: AiOutlineMoneyCollect,
			amount:
				
				"$" + 54000,
			bg: "bg-[#ddefe0]",
		},
		{
			title: "Total Transaction",
			icon: IoPricetagsOutline,
			amount: 10000,
			bg: "bg-[#f4ecdd]",
		},
		{
			title: "Total Likes",
			icon: AiOutlineLike,
			amount: 7000,
			bg: "bg-[#efdada]",
		},
		{
			title: "Total Users",
			icon: FiUsers,
			amount: 4500,
			bg: "bg-[#dee0ef]",
		},
	];

	useEffect(() => {
        AOS.init({
            duration: 1200,
            mirror: false,
            easing: "ease-out",
        });
    }, []);
	return (
		<div data-aos="flip-up"
			className={`mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8`}>
			{testimonials.map((test, index) => (
				<div
					className={`  p-6 text-black ${test.bg} rounded-3xl`}
					key={index}>
					<div className=' flex justify-end'>
						<test.icon
							className={`text-4xl ${
								test.title === "Total Transaction" &&
								"transform scale-x-[-1]"
							}`}
						/>
					</div>
					<p className='py-2'>{test.title}</p>
					<h1 className='text-2xl font-bold'>
						{test.amount || "Loading..."}
					</h1>
				</div>
			))}
		</div>
	);
};

export default Testimonials;

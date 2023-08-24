import React, { useState } from "react";
import { IoPricetagsOutline } from "react-icons/io5";
import { AiOutlineLike, AiOutlineMoneyCollect } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import axios from "axios";
const Testimonials = () => {
	const [data, setdata] = useState({ solarTotal:0,loadTotal:0,gridTotal:0 });
	const [total, settotal] = useState([])
	const getdata = () => {
		axios.get(import.meta.env.VITE_APP_GRAPH_2_API)
			.then(response => {
				settotal(response.data)
				const solarData = response.data.map(item => item.solar);
				const gridData = response.data.map(item => item.grid);
				const loadData = response.data.map(item => item.load);
			
				setdata({ solarTotal:solarData.reduce((a,b)=>a+b,0),loadTotal:loadData.reduce((a,b)=>a+b,0),gridTotal:gridData.reduce((a,b)=>a+b,0) });

			})
	}

	const TotalEnergy=data.solarTotal+data.loadTotal+data.gridTotal
	
	const testimonials = [
		{
			title: "Total Energy",
			icon: AiOutlineMoneyCollect,
			amount:
				
				 TotalEnergy.toFixed(2),
			bg: "bg-[#ddefe0]",
		},
		{
			title: "Solar Energy used",
			icon: IoPricetagsOutline,
			amount: data.solarTotal.toFixed(2),
			bg: "bg-[#f4ecdd]",
		},
		{
			title: "Load Energy used",
			icon: AiOutlineLike,
			amount: data.loadTotal.toFixed(2),
			bg: "bg-[#efdada]",
		},
		{
			title: "Grid Energy used",
			icon: FiUsers,
			amount: data.gridTotal.toFixed(2),
			bg: "bg-[#dee0ef]",
		},
	];

	useEffect(() => {
		getdata()

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

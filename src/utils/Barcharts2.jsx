
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

import axios from "axios";
const LineChart = () => {
	const [data, setdata] = useState({ solar: [], grid: [], load: [] });
	const [select, setselect] = useState('')
	const getdata = (epochTime) => {
		let API;
		if (epochTime) {
			API = `https://7yakqpu4vl.execute-api.ap-south-1.amazonaws.com/alpha/getconsumptiondata?start=${epochTime}&end=${epochTime}`
		} else {
			API = `https://7yakqpu4vl.execute-api.ap-south-1.amazonaws.com/alpha/getconsumptiondata?start=1692316800&end=1692316800`
		}
		// console.log('A', API)
		axios.get(API)
			.then(response => {
				const solarData = response.data.map(item => item.solar);
				const gridData = response.data.map(item => item.grid);
				const loadData = response.data.map(item => item.load);

				setdata({ solar: solarData, grid: gridData, load: loadData });

			})
	}
	//console.log('d',data)

	useEffect(() => {
		if (select) {
			const dateObject = new Date(select);
			const epochTime = Math.floor(dateObject.getTime() / 1000);
			getdata(epochTime)
		} else {
			getdata()
		}

		AOS.init({
			duration: 1200,
			mirror: false,
			easing: "ease-out",
		});
	}, [select]);

	//console.log('s',select.type)

	return (
		<>
		{!data?.solar?.length>0?<h1 className='text-gray-800 font-bold text-lg text-center animate-pulse '>Loading...</h1>:
			<div data-aos="fade-up"
				data-aos-duration="700" id='chart' className='bg-white w-full rounded-3xl p-6 mt-10 text-3xl'>
				<div class=" flex justify-end  w-full  relative ">

					<input value={select} onChange={(e) => setselect(e.target.value)} type="date" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
				</div>
			 <ReactApexChart
					options={{
						chart: {
							type: "line",
							// dropShadow: {
							// 	enabled: true,
							// 	color: "#000",
							// 	top: 18,
							// 	left: 7,
							// 	blur: 10,
							// 	opacity: 0.2,
							// },
							toolbar: {
								show: false,
							},
						},
						colors: ["#E84C87", "#a1df84", "#c83d12"],
						dataLabels: {
							enabled: false,
						},
						stroke: {
							curve: "smooth",
						},
						title: {
							text: "Activities",
							align: "left",
						},
						grid: {
							borderColor: "#e7e7e7",
							row: {
								colors: ["#f3f3f3", "transparent"],
								opacity: 0.5,
							},
						},
						markers: {
							size: 1,
						},
						// xaxis: {
						// 	categories: [1,2,3,4,5],
						// },
						// yaxis: {
						// 	min: 0,
						// 	max: 5,
						// },
						legend: {
							position: "top",
							horizontalAlign: "right",
							floating: true,
							offsetY: -25,
							offsetX: -5,
						},
					}}
					series={[
						{
							name: "Solar",
							data: data.solar,
						},
						{
							name: "Grid",
							data: data.grid,
						},
						{
							name: "Load",
							data: data.load,
						},
					]}
					type='line'
					height={350}
					width={"100%"}
				/>
			</div>}
		</>
	);
};

export default LineChart;

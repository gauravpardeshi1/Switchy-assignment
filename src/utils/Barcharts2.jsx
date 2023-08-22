
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import axios from "axios";
const LineChart = () => {
	const [data, setdata] = useState({ solar: [], grid: [], load: [] });

	const getdata = () => {
		axios.get('https://lumpy-husky-address.glitch.me/graph2')
			.then(response => {
				const solarData = response.data.map(item => item.solar);
				const gridData = response.data.map(item => item.grid);
				const loadData = response.data.map(item => item.load);
				setdata({ solar: solarData.slice(0, 100), grid: gridData.slice(50, 150), load: loadData.slice(0, 100) });

			})
	}
	useEffect(() => {
		getdata()

	}, [])




	useEffect(() => {
		AOS.init({
			duration: 1200,
			mirror: false,
			easing: "ease-out",
		});
	}, []);
	return (
		<div data-aos="fade-up"
			data-aos-duration="3000" id='chart' className='bg-white rounded-3xl p-6 mt-10 text-3xl'>
			<ReactApexChart
				options={{
					chart: {
						type: "line",
						dropShadow: {
							enabled: true,
							color: "#000",
							top: 18,
							left: 7,
							blur: 10,
							opacity: 0.2,
						},
						toolbar: {
							show: false,
						},
					},
					colors: ["#e9a0a0", "#a1df84", "#c83d12"],
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
					xaxis: {
						categories: ['Data'],
					},
					yaxis: {
						min: 0,
						max: 5,
					},
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
		</div>
	);
};

export default LineChart;

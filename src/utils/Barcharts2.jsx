
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
const LineChart = () => {
	const [chartOptions, setChartOptions] = useState({
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
		colors: ["#e9a0a0", "#a1df84"],
		dataLabels: {
			enabled: true,
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
			categories: ["Week1", "Week2", "Week3", "Week4", "Week5"],
		},
		yaxis: {
			min: 100,
			max: 500,
		},
		legend: {
			position: "top",
			horizontalAlign: "right",
			floating: true,
			offsetY: -25,
			offsetX: -5,
		},
	});

	const chartSeries = [
		{
			name: "Guest",
			data: [340, 430, 448, 470, 440, 420, 340],
		},
		{
			name: "User",
			data: [220, 370, 389, 400, 450, 480, 260],
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
		<div data-aos="fade-up"
        data-aos-duration="3000" id='chart' className='bg-white rounded-3xl p-6 mt-10 text-3xl'>
			<ReactApexChart
				options={chartOptions}
				series={chartSeries}
				type='line'
				height={350}
				width={"100%"}
			/>
		</div>
	);
};

export default LineChart;

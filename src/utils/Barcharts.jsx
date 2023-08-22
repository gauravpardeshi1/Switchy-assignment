import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import axios from 'axios';
const Barcharts = () => {
  const [data, setData] = useState([]);
  const [toggle, settoggle] = useState('daily')
  const [Energy, setEnergy] = useState([])



  const handletoggle = (el) => {
    settoggle(el)
  }


  const getdata = () => {
    axios.get('https://lumpy-husky-address.glitch.me/graph1')
      .then(response => {
        const energyData = response.data.map(item => item.energy);
        setData(energyData.slice(0, 100));

      })

  }


  useEffect(() => {
    getdata()
    if (toggle == 'weekly') {

      setData(data.slice(0, 50))
    }
    if (toggle == 'monthly') {

      setData(data.slice(0, 10))
    } else {
      setData(data)
    }

  }, [toggle])
  return (

    <div data-aos-duration="3000" id="chart" className='mt-[100px]'>
      <div class='w-[100%]  flex justify-end '>

        <div class="flex items-center mr-4">
          <input checked={toggle == 'daily'} onChange={() => handletoggle('daily')} id="red-checkbox" type="checkbox" value="" class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 " />
          <label for="red-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">DAYS</label>
        </div>
        <div class="flex items-center mr-4">
          <input checked={toggle == 'weekly'} onChange={() => handletoggle('weekly')} id="green-checkbox" type="checkbox" value="" class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 " />
          <label for="green-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">WEEK</label>
        </div>
        <div class="flex items-center mr-4">
          <input checked={toggle == 'monthly'} onChange={() => handletoggle('monthly')} id="purple-checkbox" type="checkbox" value="" class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 " />
          <label for="purple-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">MONTH</label>
        </div>


      </div>
      {data.length > 0 && <ReactApexChart
        options={{
          plotOptions: {
            bar: {
              dataLabels: {
                position: "top" // top, center, bottom
              }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {

            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"]
            }
          },
          xaxis: {
            categories: [],
            position: "bottom",
            labels: {
              offsetY: 0
            },
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs_: {
              fill: {
                type: "gradient",
                gradient: {
                  colorFrom: "#D8E3F0",
                  colorTo: "#BED1E6",
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5
                }
              }
            },
            tooltip: {
              enabled: false,
              offsetY: -35
            }
          },
          fill: {
            gradient: {
              shade: "light",
              type: "horizontal",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [50, 0, 100, 100]
            }
          },
          yaxis: {
            axisBorder: {
              show: true
            },
            axisTicks: {
              show: true
            },
            labels: {
              show: true,
              formatter: function (val) {
                return Number(val).toLocaleString();
              }
            }
          },
          title: {
            text:'Energy usage',
            floating: true,
            offsetY: 0,
            align: "center",
            style: {
              color: "#444",
              fontSize: "15px",
              fontWeight: '700%'
            }
          },
          chart: {
            animations: {
              enabled: false
            }
          }
        }}
        series={[
          {
            name: "Energy",
            data: [...data]
          }
        ]}
        type="bar"
        height="300"
      />}

    </div>

  )
}

export default Barcharts

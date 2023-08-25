import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner'

const Barcharts = () => {
  const [data, setData] = useState([]);
  const [toggleData, setToggleData] = useState([]);
  const [toggle, settoggle] = useState('daily')
  const [TimeData, setTimeData] = useState([])
  const [loading, setloadaing] = useState(false)
  const [xaxis, setxaxis] = useState([])
  const [converteState, setConverteState] = useState([])





  const getdata = () => {
    setloadaing(true)
    try {
      axios.get(import.meta.env.VITE_APP_GRAPH_1_API)
        .then(response => {
          const energyData = response.data.map(item => item.energy);
          const Tdata = response.data
          setTimeData(Tdata.slice(0, 100))
          setData(energyData.slice(0, 100));
          setToggleData(energyData.slice(0, 100))
          const convertedData = Tdata.map(item => {
            const date = new Date(item.time * 1000);
            const formattedDate = date.toISOString().split('T')[0];
            return formattedDate;
          });
          if (convertedData) {
            setConverteState(convertedData.slice(0, 100))
            //  console.log("converted data is available", convertedData.slice(0, 100))
            handletoggle('daily', convertedData.slice(0, 100), energyData.slice(0, 100))
          }
        })
      setloadaing(false)
    } catch (error) {

    }


  }




  // const convertedData = TimeData.map(item => {
  //   const date = new Date(item.time * 1000);
  //   const formattedDate = date.toISOString().split('T')[0];
  //   return formattedDate;
  // });


  function getWeekAndMonthNames(date) {
    const weekNumber = getWeekNumber(date);
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return { weekName: `Week ${weekNumber}`, monthName: `${monthName} ${year}` };
  }

  function groupByWeekAndMonth(data) {
    const weekGroups = {};
    const monthGroups = {};

    data.forEach(item => {
      const date = new Date(item.time * 1000);
      const weekNumber = getWeekNumber(date);
      const month = date.getMonth() + 1;
      if (!weekGroups[weekNumber]) {
        weekGroups[weekNumber] = [];
      }
      weekGroups[weekNumber].push(item);

      if (!monthGroups[month]) {
        monthGroups[month] = [];
      }
      monthGroups[month].push(item);
    });

    return { weekGroups, monthGroups };
  }

  function getWeekNumber(date) {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + oneJan.getDay() + 1) / 7);
    return weekNumber;
  }

  const { weekGroups, monthGroups } = groupByWeekAndMonth(TimeData);

  const maxEnergyWeekWise = Object.values(weekGroups).map(week => {
    const maxEnergy = week.reduce((max, item) => Math.max(max, item.energy), 0);
    return maxEnergy;
  });

  const maxEnergyMonthWise = Object.values(monthGroups).map(month => {
    const maxEnergy = month.reduce((max, item) => Math.max(max, item.energy), 0);
    return maxEnergy;
  });

  const weekNames = Object.keys(weekGroups).map(week => getWeekAndMonthNames(new Date(weekGroups[week][0].time * 1000)).weekName);
  const monthNames = Object.keys(monthGroups).map(month => getWeekAndMonthNames(new Date(monthGroups[month][0].time * 1000)).monthName);

  // console.log("Week Names:", weekNames);
  // console.log("Month Names:", monthNames);
  // console.log("Maximum energy week-wise:", maxEnergyWeekWise);
  // console.log("Maximum energy month-wise:", maxEnergyMonthWise);

  // console.log('t', TimeData)

  function handletoggle(el, mainData, energyDD) {
    settoggle(el)
    const arr = [...data];
    let newData;
    let newData2;
    //console.log(el, energyDD)

    if (el == 'daily') {
      newData = energyDD ? energyDD : arr.slice(0, 100)
      newData2 = mainData ? mainData : converteState

    }
    else if (el == 'weekly') {
      newData = maxEnergyWeekWise
      newData2 = weekNames

    } else if (el == 'monthly') {
      newData = maxEnergyMonthWise
      newData2 = monthNames

    } else {
      newData = arr;
      newData2 = converteState

    }

    setxaxis(newData2)
    setToggleData(newData);
  }


  useEffect(() => {
    getdata()
    AOS.init({
      duration: 1200,
      mirror: false,
      easing: "ease-out",
    });

  }, [loading])



  return (
    <>
      {!toggleData.length > 0 ? <h1 className=' mt-[200px] text-gray-800 font-bold text-lg text-center animate-pulse '>Loading...</h1> :
        <div data-aos="fade-up"
        data-aos-duration="700" 
           id="chart" className='mt-[100px]'>
          <div class='w-[100%]  flex justify-end mb-10 '>

            <div class="flex items-center mr-4 ">
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

          <ReactApexChart
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
                categories: xaxis,
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
                text: 'Energy usage',
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
                data: [...toggleData]
              }
            ]}
            type="bar"
            height="300"
          />

        </div>
      }
    </>
  )
}

export default Barcharts

import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";
const Barcharts = () => {
    const [state, setstate] = useState({
        options: {
            plotOptions: {
              bar: {
                dataLabels: {
                  position: "top" // top, center, bottom
                }
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function(val) {
                return Number(val).toLocaleString() + "€";
              },
              offsetY: -20,
              style: {
                fontSize: "12px",
                colors: ["#304758"]
              }
            },
            xaxis: {
              categories: [
                "Juin 2018",
                "Juin 2018",
                "Juin 2018",
                "Juin 2018",
                "Juin 2018",
                "Juin 2018"
              ],
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
                show: false
              },
              axisTicks: {
                show: false
              },
              labels: {
                show: false,
                formatter: function(val) {
                  return Number(val).toLocaleString() + "€";
                }
              }
            },
            title: {
              text: "Revenus des 12 derniers mois",
              floating: true,
              offsetY: 0,
              align: "center",
              style: {
                color: "#444",
                fontSize:"15px",
                fontWeight:'700%'
              }
            },
            chart: {
              animations: {
                enabled: false
              }
            }
          },
          series: [
            {
              name: "Chiffre d'affaires",
              data: [8976, 12987, 9853, 10986, 3571, 10066]
            }
          ]
    })

    useEffect(() => {
        AOS.init({
            duration: 1200,
            mirror: false,
            easing: "ease-out",
        });
    }, []);

  return (
    
        <div data-aos="fade-up"  data-aos-duration="3000" id="chart" class='mt-[100px]'>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            height="300"
          />
        </div>
      
  )
}

export default Barcharts

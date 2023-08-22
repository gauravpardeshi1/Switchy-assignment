import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Barcharts from "./utils/Barcharts";
import LineChart from "./utils/Barcharts2";
import { useEffect, useState } from "react";
import { getGraphData1, getGraphData2 } from "./api";

export default function App() {
 

  return (
    <div className='h-full'>
      <Sidebar>
        <Navbar />
        <Testimonials />
        <Barcharts  />
        <LineChart />
      </Sidebar>
      <Footer />
    </div>
  )
}
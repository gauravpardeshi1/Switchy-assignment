import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Testimonials from "./pages/Testimonials";
import Footer from "./components/Footer";
import Barcharts from "./utils/Barcharts";
import LineChart from "./utils/Barcharts2";
import { useEffect, useState } from "react";
import { getGraphData1, getGraphData2 } from "./api";

export default function App() {
  const [state, setState] = useState({ graph1: [], graph2: [] })

  const getGraphDatas = async () => {
    try {
      const [graph1, graph2] = await Promise.all([getGraphData1(), getGraphData2()]);
      setState({ graph1, graph2 })
    } catch (error) {
      console.log(error)
    }
  };


  useEffect(() => {
    getGraphDatas()
  }, [])



 
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
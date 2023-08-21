import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Testimonials from "./pages/Testimonials";
import Footer from "./components/Footer";
import Barcharts from "./utils/Barcharts";
import LineChart from "./utils/Barcharts2";

export default function App() {
  return (
    <div class='h-full'>
      <Sidebar>
        <Navbar />
        <Testimonials/>
       <Barcharts/>
       <LineChart/>
      </Sidebar>
        <Footer/>
    </div>
  )
}
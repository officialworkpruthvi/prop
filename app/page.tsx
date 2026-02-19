import Header from "./components/Header";
import Hero from "./components/Hero";
import Localities from "./components/Localities";
import WhyUs from "./components/Whyus";
import Highlights from "./components/Highlights";
import Blogs from "./components/Blogs";
import CompareCTA from "./components/CompareCTA";
import StatsStrip from "./components/StatsStrip";
import Process from "./components/Process";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Listings from "./components/Listings";
import WhatsAppWidget from "./components/WhatsappWidget";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <StatsStrip />
      <Listings />
      
      <Categories />
      
      <Process />
      <CompareCTA />
      <Localities />
      
      <WhyUs />
      <Blogs />
      <Footer />
      <WhatsAppWidget/>
    </>
    
  );
  
}
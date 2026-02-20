"use client"; // <-- ensures this page is fully client-side

import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import Listings from "./components/Listings";
import WhatsAppWidget from "./components/WhatsappWidget";
import StatsStrip from "./components/StatsStrip";
import Categories from "./components/Categories";
import Process from "./components/Process";
import CompareCTA from "./components/CompareCTA";
import Localities from "./components/Localities";
import WhyUs from "./components/Whyus";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";

// Dynamically import Header to avoid SSR errors with Firebase
const Header = dynamic(() => import("./components/Header"), { ssr: false });

export default function HomePage() {
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
      <WhatsAppWidget />
    </>
  );
}

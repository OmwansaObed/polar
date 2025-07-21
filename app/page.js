import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Events from "@/components/home/Events";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import React from "react";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Events />
      <Pricing />
      <Gallery />
      <Contact />
    </>
  );
};

export default Home;

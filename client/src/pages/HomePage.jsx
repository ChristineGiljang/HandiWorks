import Navbar from "../components/navbar/NavBar";
import HeroSection from "../components/sections/HeroSection";
import CategoriesSection from "../components/sections/CategoriesSection";
import HowItWorks from "../components/sections/HowItWorks";
import ContactUs from "../components/sections/ContactUs";
import Footer from "../components/sections/Footer";
import Layout from "../components/navbar/Layout";
import React, { useRef } from "react";

function HomePage() {
  const contactRef = useRef(null);

  return (
    <>
      <Layout contactRef={contactRef}>
        <HeroSection />
        <HowItWorks />
        <div ref={contactRef}>
          <ContactUs />
        </div>
        <Footer />
      </Layout>
    </>
  );
}

export default HomePage;

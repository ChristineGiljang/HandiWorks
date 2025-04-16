import Navbar from "../components/navbar/NavBar";
import HeroSection from "../components/sections/HeroSection";
import CategoriesSection from "../components/sections/CategoriesSection";
import HowItWorks from "../components/sections/HowItWorks";
import ContactUs from "../components/sections/ContactUs";
import Footer from "../components/sections/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <HowItWorks />
      <ContactUs />
      <Footer />
    </>
  );
}

export default HomePage;

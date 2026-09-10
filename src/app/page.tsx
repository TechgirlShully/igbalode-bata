import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import BrandStory from "./components/BrandStory";
import BestSellers from "./components/BestSellers";
import ConnectSection from "./components/ConnectSection";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <BrandStory />
      <BestSellers />
      <ConnectSection />
      <Footer />
    </main>
  );
}
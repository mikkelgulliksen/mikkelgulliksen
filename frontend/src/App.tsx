import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="grain-overlay">
      <Navbar />
      <main>
        <Hero />
        <ProjectsSection />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

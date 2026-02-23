import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="grain-overlay">
      <Navbar />
      <main>
        <Hero />
        <ProjectsSection />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;

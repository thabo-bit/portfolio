import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Hobbies from './components/Hobbies';
import Services from './components/Services';
import Starfield from './components/Starfield';

export default function App() {
  return (
    <>
      <Starfield />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Hobbies />
        <Services />
      </main>
    </>
  );
}
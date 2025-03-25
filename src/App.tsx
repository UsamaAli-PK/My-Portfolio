import React, { Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Lazy load components
const Hero = lazy(() => import('./components/Hero/Hero').then(module => ({ default: module.Hero })));
const About = lazy(() => import('./components/About/About').then(module => ({ default: module.About })));
const Skills = lazy(() => import('./components/Skills/Skills').then(module => ({ default: module.Skills })));
const Services = lazy(() => import('./components/Services').then(module => ({ default: module.Services })));
const Portfolio = lazy(() => import('./components/Portfolio/Portfolio').then(module => ({ default: module.Portfolio })));
const WhyChooseUs = lazy(() => import('./components/WhyChooseUs/WhyChooseUs').then(module => ({ default: module.WhyChooseUs })));
const Blog = lazy(() => import('./components/Blog/Blog').then(module => ({ default: module.Blog })));
const Contact = lazy(() => import('./components/Contact').then(module => ({ default: module.Contact })));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Portfolio />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <WhyChooseUs />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Blog />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
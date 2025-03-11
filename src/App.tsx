import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChevronDown, Smile } from 'lucide-react';
import AboutMe from './pages/AboutMe';
import Contact from './pages/Contact';
import NavigationMenu from './components/NavigationMenu';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { useScrollStore } from './store/useScrollStore';
import './styles/singleProject.css';
import FollowPage from './pages/FollowPage';

gsap.registerPlugin(Observer);

function AppContent() {
  const { currentView, setCurrentView, isAnimating, setIsAnimating } = useScrollStore();
  const view1Ref = useRef<HTMLDivElement>(null);
  const view2Ref = useRef<HTMLDivElement>(null);
  const view3Ref = useRef<HTMLDivElement>(null);
  const view4Ref = useRef<HTMLDivElement>(null);

  const handleViewTransition = (direction: 'up' | 'down', targetView: number) => {
    if (isAnimating) return;
    
    // Prevent invalid transitions
    if (currentView === 1 && targetView !== 2) return;
    if (currentView === 2 && targetView !== 1 && targetView !== 3) return;
    if (currentView === 3 && targetView !== 2 && targetView !== 4) return;
    if (currentView === 4 && targetView !== 3) return;

    setIsAnimating(true);

    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
      onComplete: () => setIsAnimating(false)
    });

    if (currentView === 1 && targetView === 2) {
      // Home to Projects
      tl.to(view1Ref.current, { yPercent: -100 })
        .fromTo(view2Ref.current, 
          { yPercent: 100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(2));
    } else if (currentView === 2 && targetView === 1) {
      // Projects to Home
      tl.to(view2Ref.current, { yPercent: 100 })
        .fromTo(view1Ref.current,
          { yPercent: -100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(1));
    } else if (currentView === 2 && targetView === 3) {
      // Projects to About
      tl.to(view2Ref.current, { yPercent: -100 })
        .fromTo(view3Ref.current,
          { yPercent: 100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(3));
    } else if (currentView === 3 && targetView === 2) {
      // About to Projects
      tl.to(view3Ref.current, { yPercent: 100 })
        .fromTo(view2Ref.current,
          { yPercent: -100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(2));
    } else if (currentView === 3 && targetView === 4) {
      // About to Contact
      tl.to(view3Ref.current, { yPercent: -100 })
        .fromTo(view4Ref.current,
          { yPercent: 100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(4));
    } else if (currentView === 4 && targetView === 3) {
      // Contact to About
      tl.to(view4Ref.current, { yPercent: 100 })
        .fromTo(view3Ref.current,
          { yPercent: -100, visibility: 'visible' },
          { yPercent: 0 },
          "<"
        )
        .add(() => setCurrentView(3));
    }
  };

  useEffect(() => {
    gsap.set([view1Ref.current, view2Ref.current, view3Ref.current, view4Ref.current], { 
      visibility: 'visible' 
    });
    gsap.set(view1Ref.current, { yPercent: currentView === 1 ? 0 : -100 });
    gsap.set(view2Ref.current, { yPercent: currentView === 2 ? 0 : 100 });
    gsap.set(view3Ref.current, { yPercent: currentView === 3 ? 0 : 100 });
    gsap.set(view4Ref.current, { yPercent: currentView === 4 ? 0 : 100 });

    const observer = Observer.create({
      target: window,
      type: 'wheel',
      onChange: (event) => {
        if (isAnimating) return;

        const scrollingDown = event.deltaY > 0;
        if (currentView === 1 && scrollingDown) {
          handleViewTransition('down', 2);
        } else if (currentView === 2) {
          if (scrollingDown) {
            handleViewTransition('down', 3);
          } else {
            handleViewTransition('up', 1);
          }
        } else if (currentView === 3 && !scrollingDown) {
          handleViewTransition('up', 2);
        } else if (currentView === 4 && !scrollingDown) {
          handleViewTransition('up', 3);
        }
      },
      preventDefault: true
    });

    return () => {
      if (observer) observer.kill();
    };
  }, [currentView, isAnimating]);

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-transparent">
        <div className="flex items-center gap-3">
          <Smile className="w-8 h-8 text-purple-500" />
          <span className="text-xl font-semibold">Digital Portfolio</span>
        </div>
        <div className="flex gap-8">
          <button 
            onClick={() => handleViewTransition('down', 3)} 
            className="text-gray-300 hover:text-white transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => handleViewTransition('down', 2)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Work
          </button>
          <button 
            onClick={() => handleViewTransition('down', 4)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Views Container */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* View 1 - Hero */}
        <div ref={view1Ref} className="view view--1">
          <div className="relative min-h-screen">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(https://threejs-3-d-portfolio.vercel.app/assets/herobg-SogpARU-.png)',
                opacity: 0.4
              }}
            />
            
            {/* Hero Content */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center px-12 md:px-24">
              <div className="flex flex-col gap-6 max-w-4xl">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <h1 className="text-7xl md:text-8xl font-bold">
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
                    John Doe
                  </span>
                </h1>
                <p className="text-3xl md:text-4xl text-gray-300 leading-relaxed max-w-2xl">
                  I develop 3D visuals, user interfaces and web applications
                </p>
                <div className="absolute bottom-24 right-24 text-4xl font-light text-gray-500">
                  91.67
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20">
              <span className="text-sm text-gray-400">Scroll to explore</span>
              <ChevronDown className="animate-bounce text-gray-400" />
            </div>
          </div>
        </div>

        {/* View 2 - Blank black page */}
        <div ref={view2Ref} className="view view--2 w-full h-screen overflow-hidden">
          <FollowPage />
        </div>

        <div ref={view3Ref} className="view view--3">
          <AboutMe 
            onNavigateBack={() => handleViewTransition('up', 2)}
            onNavigateToContact={() => handleViewTransition('down', 4)}
          />
        </div>

        <div ref={view4Ref} className="view view--4">
          <Contact onNavigateBack={() => handleViewTransition('up', 3)} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/follow" element={<FollowPage />} />
      </Routes>
    </Router>
  );
}

export default App;
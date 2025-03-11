import React, { useEffect, useRef } from 'react';
import '../styles/follow.css';
// Import images from assets
import beachImg from '../assets/img/2/beach.jpg';
import savannaImg from '../assets/img/2/savanna.jpg';
import glacierImg from '../assets/img/2/glacier.jpg';
import abyssImg from '../assets/img/2/abyss.png';
import blackImg from '../assets/img/2/black.png';
import whiteImg from '../assets/img/2/white.png';

const FollowPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add data-loading attribute to html element
    document.documentElement.setAttribute('data-loading', '');
    document.documentElement.setAttribute('data-js', '');
    
    // Remove data-loading attribute on load
    const handleLoad = () => document.documentElement.removeAttribute('data-loading');
    window.addEventListener('load', handleLoad);
    
    // Prevent scroll events from bubbling up to the main app
    const handleWheel = (e: Event) => {
      e.stopPropagation();
    };
    
    const element = document.querySelector('.view--2');
    if (element) {
      element.addEventListener('wheel', handleWheel);
    }
    
    // Apply scroll-driven animations
    if (containerRef.current) {
      // Get the scroller element
      const scroller = containerRef.current.querySelector('.scrollbar-hidden');
      
      if (scroller) {
        // Add event listener for horizontal scroll
        scroller.addEventListener('scroll', () => {
          // This will trigger the animations based on scroll position
        });
        
        // Initialize the scroll position
        setTimeout(() => {
          // Force a small scroll to initialize the animations
          scroller.scrollLeft = 1;
          setTimeout(() => {
            scroller.scrollLeft = 0;
          }, 50);
        }, 100);
      }
    }
    
    // Fallback for browsers without scroll-driven animations
    if (!CSS.supports('animation-timeline: scroll()')) {
      const scroller = containerRef.current?.querySelector('.scrollbar-hidden');
      
      if (scroller) {
        const slides = scroller.querySelectorAll('.snap-center');
        const textElements = containerRef.current?.querySelectorAll('.animate-text');
        const bottleElements = containerRef.current?.querySelectorAll('.animate-bottle');
        const bgElements = containerRef.current?.querySelectorAll('.animate-bg');
        
        const handleScroll = () => {
          const scrollLeft = scroller.scrollLeft;
          const width = scroller.clientWidth;
          
          // Determine which slide is visible
          const slideIndex = Math.round(scrollLeft / width);
          
          // Update active classes
          slides.forEach((slide, index) => {
            const isActive = index === slideIndex;
            
            // Find related elements by data-slide attribute
            const relatedTexts = Array.from(textElements || [])
              .filter(el => el.getAttribute('data-slide') === String(index + 1));
            
            const relatedBottles = Array.from(bottleElements || [])
              .filter(el => el.getAttribute('data-slide') === String(index + 1));
            
            const relatedBgs = Array.from(bgElements || [])
              .filter(el => el.getAttribute('data-slide') === String(index + 1));
            
            // Toggle active class
            relatedTexts.forEach(el => {
              el.classList.toggle('js-active', isActive);
            });
            
            relatedBottles.forEach(el => {
              el.classList.toggle('js-active', isActive);
            });
            
            relatedBgs.forEach(el => {
              el.classList.toggle('js-active', isActive);
            });
          });
        };
        
        scroller.addEventListener('scroll', handleScroll);
        
        // Initial call
        handleScroll();
        
        // Cleanup
        return () => {
          scroller.removeEventListener('scroll', handleScroll);
        };
      }
    }
    
    // Cleanup
    return () => {
      document.documentElement.removeAttribute('data-loading');
      document.documentElement.removeAttribute('data-js');
      window.removeEventListener('load', handleLoad);
      
      if (element) {
        element.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="@container min-h-screen relative isolate flex flex-col supports-sda:pointer-events-none overflow-clip bg-[#E9DFCF]" 
      style={{ 
        ['--slides' as string]: '3',
        ['timelineScope' as string]: '--scroller, --slide-1, --slide-2, --slide-3'
      }}
    >
      <div className="absolute bg-[#EDC089] -z-20 inset-0 h-full w-full animate-fade" style={{ ['animationTimeline' as string]: '--slide-2' }}></div>
      <div className="absolute bg-[#B6D6C9] -z-20 inset-0 h-full w-full animate-fade" style={{ ['animationTimeline' as string]: '--slide-3' }}></div>
      
      {/* Top title and indicator */}
      <div className="flex justify-between items-center px-7 pt-7 pb-4 z-10">
        <h2 className="uppercase font-semibold tracking-widest text-lg">Closca Bottle Wave</h2>
        <span className="flex font-semibold">
          <span className="overflow-y-clip mr-[0.5em]">
            <span className="animate-progress overlap justify-items-end" aria-hidden="true" style={{ ['animationTimeline' as string]: '--scroller' }}>
              <span>01</span>
              <span className="translate-y-[100%]">02</span>
              <span className="translate-y-[200%]">03</span>
            </span>
          </span>
          /
          03
        </span>
      </div>
      
      <main className="lg:max-h-[1000px] hidden supports-sda:flex flex-1 relative flex-col">
        <div className="flex flex-row h-full">
          {/* Left side - Text content */}
          <div className="px-7 flex flex-col items-start flex-1 w-1/2 z-10">
            {/* Slides */}
            <div className="overlap flex-1 mt-4">
              <div className="flex flex-col items-start">
                <h3 className="animate-text font-serif text-7xl lg:text-9xl w-fit" style={{ ['animationTimeline' as string]: '--slide-1' }} data-slide="1">Abyss</h3>
                <p className="animate-text font-serif text-4xl lg:text-5xl mt-2 mb-6 w-3/4" style={{ ['animationTimeline' as string]: '--slide-1' }} data-slide="1">$39.90</p>
                <p className="font-serif text-2xl italic animate-text my-4" style={{ ['animationTimeline' as string]: '--slide-1' }} data-slide="1">By 2050, there could be more plastic in our oceans than fish.</p>
                <p className="animate-text text-base max-w-md" style={{ ['animationTimeline' as string]: '--slide-1' }} data-slide="1">Plastic pollution injures more than 100,000 marine animals every year. It takes around 450 years for one plastic bottle to decompose.</p>
                <a href="#" className="animate-text group pointer-events-auto inline-flex gap-4 items-center !text-current mt-6" style={{ ['animationTimeline' as string]: '--slide-1' }} data-slide="1">
                  <span className="font-semibold">Shop Now</span>
                  <svg className="w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.5303 0.469727L23.5607 5.50006L18.5303 10.5304L17.4697 9.46973L20.6893 6.25006H0.5V4.75006H20.6893L17.4697 1.53039L18.5303 0.469727Z" fill="currentColor"/>
                  </svg>                                
                </a>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="animate-text font-serif text-7xl lg:text-9xl w-fit" style={{ ['animationTimeline' as string]: '--slide-2' }} data-slide="2">Black</h3>
                <p className="animate-text font-serif text-4xl lg:text-5xl mt-2 mb-6 w-3/4" style={{ ['animationTimeline' as string]: '--slide-2' }} data-slide="2">$39.90</p>
                <p className="font-serif text-2xl italic animate-text my-4" style={{ ['animationTimeline' as string]: '--slide-2' }} data-slide="2">The area affected by desertification is approx 11x India's size.</p>
                <p className="animate-text text-base max-w-md" style={{ ['animationTimeline' as string]: '--slide-2' }} data-slide="2">Every minute, over a million plastic bottles are manufactured, and only 9% of them will have a second life.</p>
                <a href="#" className="animate-text group pointer-events-auto inline-flex gap-4 items-center !text-current mt-6" style={{ ['animationTimeline' as string]: '--slide-2' }} data-slide="2">
                  <span className="font-semibold">Shop Now</span>
                  <svg className="w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.5303 0.469727L23.5607 5.50006L18.5303 10.5304L17.4697 9.46973L20.6893 6.25006H0.5V4.75006H20.6893L17.4697 1.53039L18.5303 0.469727Z" fill="currentColor"/>
                  </svg>                              
                </a>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="animate-text font-serif text-7xl lg:text-9xl w-fit" style={{ ['animationTimeline' as string]: '--slide-3' }} data-slide="3">White</h3>
                <p className="animate-text font-serif text-4xl lg:text-5xl mt-2 mb-6 w-3/4" style={{ ['animationTimeline' as string]: '--slide-3' }} data-slide="3">$39.90</p>
                <p className="font-serif text-2xl italic animate-text my-4" style={{ ['animationTimeline' as string]: '--slide-3' }} data-slide="3">By 2050, there could be more plastic in our oceans than fish.</p>
                <p className="animate-text text-base max-w-md" style={{ ['animationTimeline' as string]: '--slide-3' }} data-slide="3">Every time you fill your bottle, you save 82.8 grams of CO2 and 12 grams of plastic.</p>
                <a href="#" className="animate-text group pointer-events-auto inline-flex gap-4 items-center !text-current mt-6" style={{ ['animationTimeline' as string]: '--slide-3' }} data-slide="3">
                  <span className="font-semibold">Shop Now</span>
                  <svg className="w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M18.5303 0.469727L23.5607 5.50006L18.5303 10.5304L17.4697 9.46973L20.6893 6.25006H0.5V4.75006H20.6893L17.4697 1.53039L18.5303 0.469727Z" fill="currentColor"/>
                  </svg>                                
                </a>
              </div>
            </div>
          </div>
          
          {/* Right side - Images */}
          <div className="w-1/2 relative">
            {/* Background images */}
            <div className="rounded-full -z-10 absolute top-0 left-1/2 -translate-x-1/2 h-3/4 aspect-[3/4] overflow-clip">
              <img 
                className="object-cover animate-bg -left-[25%] -top-[25%] absolute size-[150%] max-w-none" 
                style={{ ['animationTimeline' as string]: '--slide-1' }} 
                src={beachImg} 
                role="presentation" 
                alt="" 
                data-slide="1"
              />
              <img 
                className="object-cover object-left-top animate-bg -left-[25%] -top-[25%] absolute size-[150%] max-w-none" 
                style={{ ['animationTimeline' as string]: '--slide-2' }} 
                src={savannaImg} 
                role="presentation" 
                alt="" 
                data-slide="2"
              />
              <img 
                className="object-cover animate-bg object-top -left-[25%] -top-[25%] absolute size-[150%] max-w-none" 
                style={{ ['animationTimeline' as string]: '--slide-3' }} 
                src={glacierImg} 
                role="presentation" 
                alt="" 
                data-slide="3"
              />
            </div>
            
            {/* Bottle images and scroller */}
            <div className="absolute inset-0 h-full w-full overflow-x-auto snap-mandatory scroll-smooth snap-x scrollbar-hidden pointer-events-auto" style={{ ['scrollTimeline' as string]: '--scroller x' }}>
              <div className="grid grid-flow-col auto-cols-[100%] h-full w-fit">
                <div className="snap-center overflow-hidden flex items-center justify-center" style={{ ['viewTimeline' as string]: '--slide-1 x', ['viewTimelineInset' as string]: '0%' }}>
                  <img className="animate-bottle h-4/5 object-contain" style={{ ['animationTimeline' as string]: '--slide-1' }} src={abyssImg} alt="Abyss water bottle" data-slide="1" />
                </div>
                <div className="snap-center overflow-hidden flex items-center justify-center" style={{ ['viewTimeline' as string]: '--slide-2 x', ['viewTimelineInset' as string]: '0%' }}>
                  <img className="animate-bottle h-4/5 object-contain" style={{ ['animationTimeline' as string]: '--slide-2' }} src={blackImg} alt="Black water bottle" data-slide="2" />
                </div>
                <div className="snap-center overflow-hidden flex items-center justify-center" style={{ ['viewTimeline' as string]: '--slide-3 x', ['viewTimelineInset' as string]: '0%' }}>
                  <img className="animate-bottle h-4/5 object-contain" style={{ ['animationTimeline' as string]: '--slide-3' }} src={whiteImg} alt="White water bottle" data-slide="3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <div className="supports-sda:hidden p-7">
        Your browser does not support scroll-driven animations. See <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations">MDN</a> for browser compatibility tables.
      </div>
    </div>
  );
};

export default FollowPage; 
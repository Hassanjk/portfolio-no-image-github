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
    document.documentElement.setAttribute('data-js', '');
    
    const handleWheel = (e: Event) => {
      e.stopPropagation();
    };
    
    const element = document.querySelector('.view--2');
    if (element) {
      element.addEventListener('wheel', handleWheel);
    }

    // Set up IntersectionObserver to detect which slide is visible
    const scrollerElement = document.querySelector('.lg\\:absolute.\\-z-10');
    if (scrollerElement) {
      const slideElements = document.querySelectorAll('.snap-center');
      const textElements = document.querySelectorAll('.overlap > div');
      
      // Create an observer for each slide
      const observers = Array.from(slideElements).map((slide, index) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // When a slide is visible, show the corresponding text
                textElements.forEach((textEl, textIndex) => {
                  if (textIndex === index) {
                    textEl.classList.add('active');
                  } else {
                    textEl.classList.remove('active');
                  }
                });
              }
            });
          },
          { 
            root: scrollerElement,
            threshold: 0.7 // Trigger when 70% of the slide is visible
          }
        );
        
        observer.observe(slide);
        return observer;
      });
      
      // Set first slide as active initially
      if (textElements.length > 0) {
        textElements[0].classList.add('active');
      }
      
      return () => {
        // Clean up observers
        observers.forEach((observer, index) => {
          if (slideElements[index]) {
            observer.unobserve(slideElements[index]);
          }
        });
        
        document.documentElement.removeAttribute('data-js');
        
        if (element) {
          element.removeEventListener('wheel', handleWheel);
        }
      };
    }

    return () => {
      document.documentElement.removeAttribute('data-js');
      
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
      
      <main className="lg:max-h-[1000px] hidden supports-sda:flex flex-1 py-14 lg:pb-9 relative flex-col">
        <div className="max-lg:relative lg:contents">
          <div className="rounded-full -z-10 absolute top-0 lg:top-14 left-1/2 -translate-x-1/2 h-3/4 aspect-[3/4] overflow-clip">
            <img className="object-cover animate-bg -left-[25%] -top-[25%] absolute size-[150%] max-w-none" style={{ ['animationTimeline' as string]: '--slide-1' }} src={beachImg} role="presentation" alt="" />
            <img className="object-cover object-left-top animate-bg -left-[25%] -top-[25%] absolute size-[150%] max-w-none" style={{ ['animationTimeline' as string]: '--slide-2' }} src={savannaImg} role="presentation" alt="" />
            <img className="object-cover animate-bg object-top -left-[25%] -top-[25%] absolute size-[150%] max-w-none" style={{ ['animationTimeline' as string]: '--slide-3' }} src={glacierImg} role="presentation" alt="" />
          </div>
          
          <div className="lg:absolute -z-10 inset-0 h-full w-full overflow-x-auto snap-mandatory scroll-smooth snap-x scrollbar-hidden pointer-events-auto" style={{ ['scrollTimeline' as string]: '--scroller x' }}>
            <div className="grid grid-flow-col auto-cols-[50cqw] px-[25cqw] lg:h-full w-fit">
              <div className="snap-center overflow-hidden max-lg:pb-[3rem] flex items-center justify-center" style={{ ['viewTimeline' as string]: '--slide-1 x', ['viewTimelineInset' as string]: '25cqw' }}>
                <img className="animate-bottle lg:h-4/5 object-contain" style={{ ['animationTimeline' as string]: '--slide-1' }} src={abyssImg} alt="White water bottle" />
              </div>
              <div className="snap-center overflow-hidden max-lg:pb-[3rem] flex items-center justify-center" style={{ ['viewTimeline' as string]: '--slide-2 x', ['viewTimelineInset' as string]: '25cqw' }}>
                <img className="animate-bottle lg:h-4/5 object-contain" style={{ ['animationTimeline' as string]: '--slide-2' }} src={blackImg} alt="Black water bottle" />
              </div>
              <div className="snap-center overflow-hidden max-lg:pb-[3rem] flex items-center justify-center" style={{ ['viewTimeline' as string]: '--slide-3 x', ['viewTimelineInset' as string]: '25cqw' }}>
                <img className="animate-bottle lg:h-4/5 object-contain" style={{ ['animationTimeline' as string]: '--slide-3' }} src={whiteImg} alt="White water bottle" />
              </div>
            </div>
          </div>
        </div>

        {/* Indicator */}
        <span className="flex font-semibold absolute top-14 right-7">
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

        {/* Text */}
        <div className="px-7 max-lg:mt-10 flex flex-col items-center lg:items-start flex-1 max-lg:text-center lg:w-[29rem]">
          <h2 className="uppercase font-semibold tracking-widest mb-6 whitespace-nowrap">Closca Bottle Wave</h2>
          <div className="overlap flex-1 max-lg:items-start max-lg:justify-center max-lg:max-w-[36rem] lg:max-xl:max-w-[25cqw]">
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="animate-text font-serif text-7xl lg:text-9xl w-fit" style={{ ['animationTimeline' as string]: '--slide-1' }}>Abyss</h3>
              <p className="animate-text font-serif text-4xl lg:text-5xl mt-2 mb-auto w-3/4" style={{ ['animationTimeline' as string]: '--slide-1' }}>$39.90</p>
              <p className="max-lg:hidden font-serif text-3xl italic animate-text my-4" style={{ ['animationTimeline' as string]: '--slide-1' }}>By 2050, there could be more plastic in our oceans than fish.</p>
              <p className="max-lg:hidden animate-text text-pr" style={{ ['animationTimeline' as string]: '--slide-1' }}>Plastic pollution injures more than 100,000 marine animals every year. It takes around 450 years for one plastic bottle to decompose.</p>
              <a href="https://closca.com" className="animate-text group pointer-events-auto inline-flex gap-4 items-center !text-current mt-6" style={{ ['animationTimeline' as string]: '--slide-1' }}>
                <span className="font-semibold">Shop Now</span>
                <svg className="w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.5303 0.469727L23.5607 5.50006L18.5303 10.5304L17.4697 9.46973L20.6893 6.25006H0.5V4.75006H20.6893L17.4697 1.53039L18.5303 0.469727Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="animate-text font-serif text-7xl lg:text-9xl w-fit" style={{ ['animationTimeline' as string]: '--slide-2' }}>Black</h3>
              <p className="animate-text font-serif text-4xl lg:text-5xl mt-2 mb-auto w-3/4" style={{ ['animationTimeline' as string]: '--slide-2' }}>$39.90</p>
              <p className="max-lg:hidden font-serif text-3xl italic animate-text my-4" style={{ ['animationTimeline' as string]: '--slide-2' }}>The area affected by desertification is approx 11x India's size.</p>
              <p className="max-lg:hidden animate-text text-pretty" style={{ ['animationTimeline' as string]: '--slide-2' }}>Every minute, over a million plastic bottles are manufactured, and only 9% of them will have a second life.</p>
              <a href="https://closca.com" className="animate-text group pointer-events-auto inline-flex gap-4 items-center !text-current mt-6" style={{ ['animationTimeline' as string]: '--slide-2' }}>
                <span className="font-semibold">Shop Now</span>
                <svg className="w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.5303 0.469727L23.5607 5.50006L18.5303 10.5304L17.4697 9.46973L20.6893 6.25006H0.5V4.75006H20.6893L17.4697 1.53039L18.5303 0.469727Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="animate-text font-serif text-7xl lg:text-9xl w-fit" style={{ ['animationTimeline' as string]: '--slide-3' }}>White</h3>
              <p className="animate-text font-serif text-4xl lg:text-5xl mt-2 mb-auto w-3/4" style={{ ['animationTimeline' as string]: '--slide-3' }}>$39.90</p>
              <p className="max-lg:hidden font-serif text-3xl italic animate-text my-4" style={{ ['animationTimeline' as string]: '--slide-3' }}>By 2050, there could be more plastic in our oceans than fish.</p>
              <p className="max-lg:hidden animate-text text-pretty" style={{ ['animationTimeline' as string]: '--slide-3' }}>Every time you fill your bottle, you save 82.8 grams of CO2 and 12 grams of plastic.</p>
              <a href="https://closca.com" className="animate-text group pointer-events-auto inline-flex gap-4 items-center !text-current mt-6" style={{ ['animationTimeline' as string]: '--slide-3' }}>
                <span className="font-semibold">Shop Now</span>
                <svg className="w-6 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.5303 0.469727L23.5607 5.50006L18.5303 10.5304L17.4697 9.46973L20.6893 6.25006H0.5V4.75006H20.6893L17.4697 1.53039L18.5303 0.469727Z" fill="currentColor"/>
                </svg>
              </a>
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
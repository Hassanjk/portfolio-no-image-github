import React, { useEffect } from 'react';
import '../styles/follow.css'; // We'll create this file to import the necessary styles

const FollowPage: React.FC = () => {
  useEffect(() => {
    // Add data-loading attribute to html element
    document.documentElement.setAttribute('data-loading', '');
    document.documentElement.setAttribute('data-js', '');
    
    // Remove data-loading attribute on load
    const handleLoad = () => document.documentElement.removeAttribute('data-loading');
    window.addEventListener('load', handleLoad);
    
    // Prevent scroll events from bubbling up to the main app
    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation();
    };
    
    const element = document.querySelector('.view--2');
    if (element) {
      element.addEventListener('wheel', handleWheel);
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
    <div className="@container min-h-screen relative isolate flex flex-col supports-sda:pointer-events-none overflow-clip" style={{ 
      ['--slides' as string]: '3',
      ['timelineScope' as string]: '--scroller, --slide-1, --slide-2, --slide-3'
    }}>
      <div className="absolute bg-[#EDC089] -z-20 inset-0 h-full w-full animate-fade" style={{ ['animationTimeline' as string]: '--slide-2' }}></div>
      <div className="absolute bg-[#B6D6C9] -z-20 inset-0 h-full w-full animate-fade" style={{ ['animationTimeline' as string]: '--slide-3' }}></div>
      <header className="frame mx-7 relative z-50 flex max-lg:flex-col justify-between py-6 border-b gap-2 border-black/20 pointer-events-auto">
        <div className="whitespace-nowrap">
          <h1 className="font-bold inline align-middle">CSS-Only Carousels</h1>
          <a title="Read the article" href="https://tympanus.net/codrops/?p=75188">
            <svg className="h-3 ml-0.5 inline-block align-middle" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M1.00006 0.25H11.7501V11H10.2501V2.81066L1.53039 11.5303L0.469727 10.4697L9.1894 1.75H1.00006V0.25Z" fill="currentColor"/>
            </svg>						
          </a>
        </div>
        <nav className="flex items-center gap-10">
          <a href="/">Demo 1</a>
          <a href="/follow" aria-current="page">Demo 2</a>
          <a href="/">Demo 3</a>
        </nav>
      </header>
      <main className="lg:max-h-[1000px] hidden supports-sda:flex flex-1 py-14 lg:pb-9 relative flex-col">
        <div className="max-lg:relative lg:contents">
          <div className="rounded-full -z-10 absolute top-0 lg:top-14 left-1/2 -translate-x-1/2 h-3/4 aspect-[3/4] overflow-clip">
            <img className="object-cover animate-bg -left-[25%] -top-[25%] absolute size-[150%] max-w-none" style={{ ['animationTimeline' as string]: '--slide-1' }} src="/img/2/beach.jpg" role="presentation" alt="" />
            <img className="object-cover object-left-top animate-bg -left-[25%] -top-[25%] absolute size-[150%] max-w-none" style={{ ['animationTimeline' as string]: '--slide-2' }} src="/img/2/savanna.jpg" role="presentation" alt="" />
            <img className="object-cover animate-bg object-top -left-[25%] -top-[25%] absolute size-[150%] max-w-none" style={{ ['animationTimeline' as string]: '--slide-3' }} src="/img/2/glacier.jpg" role="presentation" alt="" />
          </div>
          <div className="lg:absolute -z-10 inset-0 h-full w-full overflow-x-auto snap-mandatory scroll-smooth snap-x scrollbar-hidden pointer-events-auto" style={{ ['scrollTimeline' as string]: '--scroller x' }}>
            <div className="grid grid-flow-col auto-cols-[50cqw] px-[25cqw] lg:h-full w-fit">
              <div className="snap-center overflow-hidden max-lg:pb-[3rem] flex items-center justify-center" style={{ ['viewTimeline' as string]: '--slide-1 x', ['viewTimelineInset' as string]: '25cqw' }}>
                <img className="animate-bottle lg:h-4/5 object-contain" style={{ ['animationTimeline' as string]: '--slide-1' }} src="/img/2/abyss.png" alt="White water bottle" />
              </div>
              <div className="snap-center overflow-hidden max-lg:pb-[3rem] flex items-center justify-center" style={{ ['viewTimeline' as string]: '--slide-2 x', ['viewTimelineInset' as string]: '25cqw' }}>
                <img className="animate-bottle lg:h-4/5 object-contain" style={{ ['animationTimeline' as string]: '--slide-2' }} src="/img/2/black.png" alt="White water bottle" />
              </div>
              <div className="snap-center overflow-hidden max-lg:pb-[3rem] flex items-center justify-center" style={{ ['viewTimeline' as string]: '--slide-3 x', ['viewTimelineInset' as string]: '25cqw' }}>
                <img className="animate-bottle lg:h-4/5 object-contain" style={{ ['animationTimeline' as string]: '--slide-3' }} src="/img/2/white.png" alt="White water bottle" />
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
          {/* Slides */}
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
        <a href="/" className="max-lg:hidden absolute z-50 bottom-7 right-7 pointer-events-auto">Previous Demo</a>
      </main>
      <div className="supports-sda:hidden p-7">
        Your browser does not support scroll-driven animations. See <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations">MDN</a> for browser compatibility tables.
      </div>
    </div>
  );
};

export default FollowPage; 
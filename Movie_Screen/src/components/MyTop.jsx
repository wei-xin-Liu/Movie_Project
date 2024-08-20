import React from 'react'


function MyTop() {

    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {/* {isVisible && ( */}
                <button
                    onClick={scrollToTop}
                    className={`
                        fixed
                        bottom-5
                        right-5
                        bg-blue-600
                        text-white
                        p-3
                        rounded-full
                        shadow-lg
                        transition-opacity
                        duration-300
                        hover:bg-blue-600
                        focus:outline-none
                        ${isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            {/* )} */}
        </>
    );




    // const backToTopBtn = document.getElementById('backToTopBtn');

    // window.addEventListener('scroll', () => {
    //     if (window.scrollY > 300) {
    //         backToTopBtn.classList.remove('opacity-0');
    //         backToTopBtn.classList.add('opacity-100');
    //     } else {
    //         backToTopBtn.classList.remove('opacity-100');
    //         backToTopBtn.classList.add('opacity-0');
    //     }
    // });

    // backToTopBtn.addEventListener('click', () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });
    // });


    // return (
    //     <button id="backToTopBtn" className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 hover:bg-blue-600 focus:outline-none">
    //         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    //         </svg>
    //     </button>
    // )
}


export default MyTop
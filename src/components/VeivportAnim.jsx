import { useEffect, useRef } from "react";

const VievportAnim = ({ children }) => {
    const ref = useRef(null);

    useEffect(() => {

      const observer = new IntersectionObserver (
        ([entry]) => {
            if(entry.isIntersecting) {
                entry.target.classList.add("animated");
                observer.unobserve(entry.target);
            }
        },
        {threshold: 0.2}
    );

    if(ref.current) observer.observe(ref.current);

    
      return () => observer.disconnect();
    }, [])
    

    return (
        <div ref={ref} className="viewportAnim">
            {children}
        </div>
    )
};

export default VievportAnim;
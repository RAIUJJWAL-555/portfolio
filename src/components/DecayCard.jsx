import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const DecayCard = ({
  width = 120,
  height = 120,
  image = 'https://picsum.photos/120/120?grayscale',
  children,
}) => {
  // 💡 Note: Using the wrapper div (ref={svgRef}) for both events and GSAP transforms.
  const svgRef = useRef(null); 
  const displacementMapRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const cursor = useRef({ x: width / 2, y: height / 2 }); // Initialize cursor to center
  const cachedCursor = useRef({ x: width / 2, y: height / 2 });

  // Utility function (moved inside component for clarity, as used in render)
  const lerp = (a, b, n) => (1 - n) * a + n * b;
  const distance = (x1, x2, y1, y2) => Math.hypot(x1 - x2, y1 - y2);
  const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c; // Re-introduced map function

  useEffect(() => {
    if (!svgRef.current) return;
    
    // --- Local Event Handler ---
    function handleMove(ev) {
      const rect = svgRef.current.getBoundingClientRect();
      cursor.current = {
        x: ev.clientX - rect.left,
        y: ev.clientY - rect.top,
      };
    }

    if (isHovered) {
      // Add event listener only when hovered
      svgRef.current.addEventListener('mousemove', handleMove);
    } else {
      // Remove event listener when not hovered
      svgRef.current.removeEventListener('mousemove', handleMove);
      // Reset targets instantly when leaving
      cursor.current = { x: width / 2, y: height / 2 };
      cachedCursor.current = { x: width / 2, y: height / 2 };
    }

    const imgValues = {
      imgTransforms: { x: 0, y: 0, rz: 0 },
      displacementScale: 0,
    };

    const render = () => {
      // 💡 CHANGE 1: Tilt/Parallax (movement logic)
      // Lerp toward the center of the card
      let targetX = lerp(imgValues.imgTransforms.x, map(cursor.current.x, 0, width, -15, 15), 0.15); // Increased sensitivity to -15/15
      let targetY = lerp(imgValues.imgTransforms.y, map(cursor.current.y, 0, height, -15, 15), 0.15); // Increased sensitivity to -15/15

      // Resetting the final transform values
      imgValues.imgTransforms.x = targetX;
      imgValues.imgTransforms.y = targetY;

      // Apply tilt/parallax to the wrapper div
      if (svgRef.current) {
        gsap.set(svgRef.current, {
          x: imgValues.imgTransforms.x,
          y: imgValues.imgTransforms.y,
        });
      }

      // 💡 CHANGE 2: Stronger Displacement Effect Calculation
      const cursorTravelledDistance = distance(
        cachedCursor.current.x,
        cursor.current.x,
        cachedCursor.current.y,
        cursor.current.y
      );

      // Map mouse travel (0 to 50px) to a large scale (0 to 400) for strong distortion
      imgValues.displacementScale = lerp(
        imgValues.displacementScale,
        map(cursorTravelledDistance, 0, 50, 0, 400), // <-- Max scale 400 set for strong wave
        0.08 // Increased interpolation speed for a snappier look
      );

      if (displacementMapRef.current) {
        gsap.set(displacementMapRef.current, {
          attr: { scale: imgValues.displacementScale },
        });
      }

      cachedCursor.current = { ...cursor.current };

      if (isHovered) requestAnimationFrame(render);
    };
    
    // Start animation loop only if hovered
    if (isHovered) {
      render();
    }


    return () => {
      // Cleanup events
      if (svgRef.current) {
          svgRef.current.removeEventListener('mousemove', handleMove);
      }
      // Reset GSAP properties for a clean exit
      gsap.set(svgRef.current, { x: 0, y: 0 }); 
      if (displacementMapRef.current) {
        gsap.set(displacementMapRef.current, { attr: { scale: 0 } });
      }
    };
  }, [isHovered, width, height]);

  return (
    <div
      ref={svgRef}
      className="relative cursor-pointer"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        // Setting pointer-events: auto on wrapper (ref={svgRef}) to capture events
        pointerEvents: 'auto', 
        transition: 'all .2s ease-out',
        // Note: The z-index/transform changes are now handled by GSAP, not CSS transition
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        className="relative w-full h-full block"
        // 💡 Ensure SVG does not capture events, letting the parent div handle it
        style={{ pointerEvents: 'none' }} 
      >
        <filter id="imgFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.015"
            numOctaves="5"
            seed="4"
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence1"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turbulence1"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="displacementMap3"
          />
        </filter>
        <g>
          <image
            href={image}
            x="0"
            y="0"
            width={width}
            height={height}
            filter="url(#imgFilter)"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>
      <div className="absolute bottom-2 left-2 tracking-[-0.5px] font-black text-lg leading-none">
        {children}
      </div>
    </div>
  );
};

export default DecayCard;
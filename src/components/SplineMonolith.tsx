import { lazy, Suspense, useState, useEffect, useRef } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

function shouldLoadSpline(mobileBreakpoint: number): boolean {
  if (typeof window === 'undefined') return false;

  const isMobile = window.innerWidth < mobileBreakpoint;
  const isLowEnd = navigator.hardwareConcurrency <= 2;

  let noWebGL = false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    noWebGL = !gl;
  } catch (e) {
    noWebGL = true;
  }

  return !isMobile && !isLowEnd && !noWebGL;
}

interface SplineMonolithProps {
  onLoad?: () => void;
  isRTL?: boolean;
}

const SplineMonolith = ({ onLoad, isRTL = false }: SplineMonolithProps) => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineFailed, setSplineFailed] = useState(false);
  const [canLoad, setCanLoad] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // The latest Spline scene URL provided
  const sceneUrl = "https://prod.spline.design/5HUupDEG1D4F9k3Z/scene.splinecode";

  useEffect(() => {
    const check = shouldLoadSpline(768);
    console.log("Spline hardware check result:", check, {
      innerWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
      concurrency: typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : 0
    });
    // Force load for debugging
    setCanLoad(true);
  }, []);

  useEffect(() => {
    if (!canLoad) return;

    // Timeout fallback (8 seconds) if Spline CDN is slow
    timeoutRef.current = setTimeout(() => {
      if (!splineLoaded) {
        setSplineFailed(true);
      }
    }, 8000);

    return () => clearTimeout(timeoutRef.current);
  }, [canLoad, splineLoaded]);

  function handleLoad(app: any) {
    clearTimeout(timeoutRef.current);

    // Dynamically remove the template text from the scene 
    // by finding any text object and destroying it so ONLY the sphere remains
    try {
      // Find and hide/destroy all text objects or specific named groups in the Spline scene
      const allObjects = app.getAllObjects();
      allObjects.forEach((obj: any) => {
        // "Text" objects usually contain the template copy
        if (obj.name && (
          obj.name.toLowerCase().includes('text') ||
          obj.name.toLowerCase().includes('effortless') ||
          obj.name.toLowerCase().includes('integration')
        )) {
          obj.visible = false;
        }
      });
    } catch (e) {
      console.warn("Could not modify Spline objects directly");
    }

    setSplineLoaded(true);
    if (onLoad) onLoad();
  }

  const showFallback = !canLoad || splineFailed;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Fallback layer — shows if not loaded or failed / matches the Teal Sphere! */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-out z-0 pointer-events-none"
        style={{ opacity: splineLoaded && !showFallback ? 0 : 1 }}
      >
        <div className="w-[85%] aspect-square rounded-full relative"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #00EAD3 0%, #008f81 25%, #0A0A0B 75%)',
            boxShadow: '0 0 60px rgba(0, 234, 211, 0.15), inset -20px -20px 40px rgba(0, 0, 0, 0.8)',
            opacity: 0.9,
            transform: isRTL ? 'scaleX(-1)' : 'none'
          }}
        >
          {/* Subtle teal glow below fallback sphere */}
          <div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-24 rounded-full opacity-40 blur-2xl"
            style={{
              background: 'radial-gradient(ellipse, rgba(0, 234, 211, 0.4) 0%, transparent 60%)',
            }}
          />
        </div>
      </div>

      {/* Brand Glow Array — Shines *through* the sphere's dark spots using mix-blend-mode! */}
      <div
        className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square rounded-full opacity-40 blur-[60px] pointer-events-none z-0 transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle at center, rgba(197,160,89,0.8) 0%, rgba(0,234,211,0.4) 50%, transparent 70%)',
          opacity: splineLoaded ? 0.6 : 0
        }}
      />

      {/* Spline scene — cropped to target the sphere */}
      {canLoad && !splineFailed && (
        <Suspense fallback={null}>
          <Spline
            scene={sceneUrl}
            onLoad={handleLoad}
            style={{
              position: 'absolute',
              // Restored the perfect positioning you loved
              width: '160%',
              height: '160%',
              top: '-30%',
              left: '-60%',
              zIndex: 1,
              // Fade in when ready
              opacity: splineLoaded ? 1 : 0,
              transition: 'opacity 1.2s ease',
              pointerEvents: 'auto',
              // MAGIC TRICK: 'screen' drops pure black, revealing our background and gold/teal glow beneath!
              mixBlendMode: 'screen',
              filter: 'brightness(1.1) contrast(1.1)'
            }}
          />
        </Suspense>
      )}
    </div>
  );
};

export default SplineMonolith;

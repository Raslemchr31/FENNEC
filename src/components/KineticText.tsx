import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface KineticTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  staggerDelay?: number;
  enableStretch?: boolean;
  enableRotation?: boolean;
}

const KineticText = ({
  children,
  className = '',
  as: Component = 'span',
  staggerDelay = 0.02,
  enableStretch = true,
  enableRotation = true,
}: KineticTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Spring configuration for smooth animation
  const springConfig = { stiffness: 100, damping: 20, restDelta: 0.001 };
  
  const letters = children.split('');

  return (
    <Component ref={containerRef as any} className={`inline-block ${className}`}>
      {letters.map((letter, index) => (
        <KineticLetter
          key={index}
          letter={letter}
          index={index}
          scrollYProgress={scrollYProgress}
          springConfig={springConfig}
          staggerDelay={staggerDelay}
          enableStretch={enableStretch}
          enableRotation={enableRotation}
          totalLetters={letters.length}
        />
      ))}
    </Component>
  );
};

interface KineticLetterProps {
  letter: string;
  index: number;
  scrollYProgress: any;
  springConfig: { stiffness: number; damping: number; restDelta: number };
  staggerDelay: number;
  enableStretch: boolean;
  enableRotation: boolean;
  totalLetters: number;
}

const KineticLetter = ({
  letter,
  index,
  scrollYProgress,
  springConfig,
  staggerDelay,
  enableStretch,
  enableRotation,
}: KineticLetterProps) => {
  // Create unique transform values based on letter position
  const delayOffset = index * staggerDelay;
  
  // Stretch effect: scale Y from 1 to 1.1 based on scroll
  const stretchRaw = useTransform(
    scrollYProgress,
    [0 + delayOffset, 0.3 + delayOffset, 0.7 + delayOffset, 1],
    [1, enableStretch ? 1.1 : 1, enableStretch ? 1.1 : 1, 1]
  );
  
  // Rotation effect: subtle rotation based on scroll
  const rotationRaw = useTransform(
    scrollYProgress,
    [0 + delayOffset, 0.5 + delayOffset, 1],
    [0, enableRotation ? (index % 2 === 0 ? 2 : -2) : 0, 0]
  );
  
  // Apply spring physics for smooth motion
  const stretch = useSpring(stretchRaw, springConfig);
  const rotation = useSpring(rotationRaw, springConfig);

  // Skip animation for spaces
  if (letter === ' ') {
    return <span className="inline-block">&nbsp;</span>;
  }

  return (
    <motion.span
      className="kinetic-letter inline-block origin-center"
      style={{
        scaleY: stretch,
        rotate: rotation,
      }}
    >
      {letter}
    </motion.span>
  );
};

// Pre-animated kinetic headline for hero sections
export const KineticHeadline = ({
  line1,
  line2,
  highlightWord,
  className = '',
}: {
  line1: string;
  line2: string;
  highlightWord?: string;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const springConfig = { stiffness: 100, damping: 20 };
  
  // Global stretch for the entire headline
  const globalStretch = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1]),
    springConfig
  );

  const renderLine = (text: string, isHighlight: boolean = false) => {
    return text.split('').map((char, i) => (
      <motion.span
        key={i}
        className={`inline-block origin-center ${isHighlight ? 'text-[#C5A059]' : ''}`}
        style={{
          scaleY: globalStretch,
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  return (
    <div ref={containerRef} className={className}>
      <h1 className="text-[clamp(36px,6vw,84px)] font-bold uppercase leading-[0.92] tracking-tight font-['Kode_Mono']">
        <div className="block">{renderLine(line1)}</div>
        <div className="block mt-2">
          {highlightWord && line2.includes(highlightWord) ? (
            <>
              {line2.split(highlightWord)[0] && renderLine(line2.split(highlightWord)[0])}
              {renderLine(highlightWord, true)}
              {line2.split(highlightWord)[1] && renderLine(line2.split(highlightWord)[1])}
            </>
          ) : (
            renderLine(line2)
          )}
        </div>
      </h1>
    </div>
  );
};

export default KineticText;

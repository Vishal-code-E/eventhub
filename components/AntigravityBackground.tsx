'use client';

import dynamic from 'next/dynamic';
import { useReducedMotion, useIsMobile } from '@/lib/motion';

// Dynamically import Antigravity with no SSR
const Antigravity = dynamic(() => import('./Antigravity'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-black via-gray-900 to-black" />,
});

export function AntigravityBackground() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  // Disable heavy 3D effects on mobile or when user prefers reduced motion
  const shouldShowAntigravity = !prefersReducedMotion && !isMobile;

  if (!shouldShowAntigravity) {
    return <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />;
  }

  return (
    <div className="absolute inset-0 opacity-30">
      <Antigravity
        magnetRadius={8}
        ringRadius={9}
        waveSpeed={0.3}
        waveAmplitude={0.8}
        particleSize={1.2}
        particleVariance={1}
        lerpSpeed={0.05}
        count={200}
        rotationSpeed={0}
        depthFactor={1}
        pulseSpeed={2}
        fieldStrength={8}
        color="#5227FF"
        particleShape="capsule"
      />
    </div>
  );
}

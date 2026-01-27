"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useReducedMotion, useIsMobile } from "@/lib/motion";

// Dynamically import heavy DomeGallery component with no SSR
const DomeGallery = dynamic(() => import("@/components/DomeGallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-gray-400">Loading Gallery...</p>
      </div>
    </div>
  ),
});

export default function GalleryPage() {
  const autoRotateRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  const shouldAutoRotate = !prefersReducedMotion && !isMobile;

  useEffect(() => {
    if (!shouldAutoRotate) return;
    
    // Auto-rotate the dome gallery
    let rotation = 0;
    const animate = () => {
      rotation += 0.3; // Rotation speed
      const sphereElement = document.querySelector('.dg-sphere') as HTMLElement;
      if (sphereElement) {
        sphereElement.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(0deg) rotateY(${rotation}deg)`;
      }
      autoRotateRef.current = requestAnimationFrame(animate);
    };

    // Start animation after a short delay
    const timeoutId = setTimeout(() => {
      animate();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      if (autoRotateRef.current) {
        cancelAnimationFrame(autoRotateRef.current);
      }
    };
  }, [shouldAutoRotate]);

  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", alt: "Tech Event 1" },
    { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800", alt: "Tech Event 2" },
    { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800", alt: "Cultural Event 1" },
    { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800", alt: "Workshop 1" },
    { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800", alt: "Hackathon 1" },
    { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800", alt: "Conference 1" },
    { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800", alt: "Seminar 1" },
    { src: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800", alt: "Team Event 1" },
    { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800", alt: "Meeting 1" },
    { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800", alt: "Team Building 1" },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header Section */}
      <div className="pt-24 pb-8 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Event Gallery
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Explore moments from our vibrant campus events. Drag to rotate and click to enlarge.
        </p>
      </div>

      {/* Dome Gallery */}
      <div className="w-full h-[600px] md:h-[700px]">
        <DomeGallery
          images={galleryImages}
          segments={35}
          maxVerticalRotationDeg={8}
          dragSensitivity={25}
          enlargeTransitionMs={400}
          openedImageWidth="500px"
          openedImageHeight="500px"
          imageBorderRadius="20px"
          openedImageBorderRadius="20px"
          grayscale={false}
          overlayBlurColor="#000000"
        />
      </div>

      {/* Instructions */}
      <div className="py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-zinc-900 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-2">🖱️ Drag</h3>
            <p className="text-gray-400">
              Click and drag to rotate the gallery dome
            </p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-2">👆 Click</h3>
            <p className="text-gray-400">
              Click any image to view it in full size
            </p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-2">📱 Mobile</h3>
            <p className="text-gray-400">
              Swipe to rotate on touch devices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useReducedMotion, useIsMobile } from "@/lib/motion";

// Dynamically import TiltedCard with no SSR for better performance
const TiltedCard = dynamic(() => import("./TiltedCard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl animate-pulse" />
  ),
});


export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  // Reduce tilt effects on mobile or for reduced motion preference
  const tiltAmplitude = prefersReducedMotion || isMobile ? 0 : 18;
  const scaleAmount = prefersReducedMotion || isMobile ? 1 : 1.15;

  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Clubs Section */}
        <h2 className="text-4xl font-bold mb-4">
          Explore Clubs at REC
        </h2>
        <p className="text-gray-300 mb-12">
          REC is more than classrooms — it’s where passion meets action.
          Explore the vibrant student clubs that make our campus culture thrive.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <TiltedCard
            imageSrc="https://placehold.co/400x400/1a1a1a/ffffff?text=E-CELL+REC"
            altText="E-CELL REC"
            captionText="E-CELL REC"
            containerHeight="350px"
            imageHeight="350px"
            scaleOnHover={scaleAmount}
            rotateAmplitude={tiltAmplitude}
            showTooltip={!isMobile}
            overlayContent={
              <div className="text-center p-4">
                <p className="text-sm">Innovation • Entrepreneurship • Technology</p>
              </div>
            }
            displayOverlayContent={true}
          />
          <TiltedCard
            imageSrc="https://placehold.co/400x400/1a1a1a/ffffff?text=GDG"
            altText="GDG"
            captionText="GDG"
            containerHeight="350px"
            imageHeight="350px"
            scaleOnHover={scaleAmount}
            rotateAmplitude={tiltAmplitude * 0.9}
            showTooltip={!isMobile}
            overlayContent={
              <div className="text-center p-4">
                <p className="text-sm">Google Developer Group</p>
              </div>
            }
            displayOverlayContent={true}
          />
          <TiltedCard
            imageSrc="https://placehold.co/400x400/1a1a1a/ffffff?text=CSI"
            altText="CSI"
            captionText="CSI"
            containerHeight="350px"
            imageHeight="350px"
            scaleOnHover={1.1}
            rotateAmplitude={14}
            showTooltip={true}
            overlayContent={
              <div className="text-center p-4">
                <p className="text-sm">Computer Society of India</p>
              </div>
            }
            displayOverlayContent={true}
          />
          <TiltedCard
            imageSrc="https://placehold.co/400x400/1a1a1a/ffffff?text=IEEE"
            altText="IEEE"
            captionText="IEEE"
            containerHeight="350px"
            imageHeight="350px"
            scaleOnHover={1.13}
            rotateAmplitude={15}
            showTooltip={true}
            overlayContent={
              <div className="text-center p-4">
                <p className="text-sm">Technology • Research • Innovation</p>
              </div>
            }
            displayOverlayContent={true}
          />
          <TiltedCard
            imageSrc="https://placehold.co/400x400/1a1a1a/ffffff?text=NSS"
            altText="NSS"
            captionText="NSS"
            containerHeight="350px"
            imageHeight="350px"
            scaleOnHover={1.14}
            rotateAmplitude={17}
            showTooltip={true}
            overlayContent={
              <div className="text-center p-4">
                <p className="text-sm">National Service Scheme</p>
              </div>
            }
            displayOverlayContent={true}
          />
          <TiltedCard
            imageSrc="https://placehold.co/400x400/1a1a1a/ffffff?text=Rotaract+Club"
            altText="Rotaract Club"
            captionText="Rotaract Club"
            containerHeight="350px"
            imageHeight="350px"
            scaleOnHover={1.11}
            rotateAmplitude={16}
            showTooltip={true}
            overlayContent={
              <div className="text-center p-4">
                <p className="text-sm">Service • Leadership • Fellowship</p>
              </div>
            }
            displayOverlayContent={true}
          />
        </div>
      </div>
    </section>
  );
}

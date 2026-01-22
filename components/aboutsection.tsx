"use client";

import TiltedCard from "./TiltedCard";


export default function AboutSection() {
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
            imageSrc="/clubs/ecell.jpg"
            altText="E-CELL REC"
            captionText="E-CELL REC"
            containerHeight="350px"
            imageHeight="350px"
          />
          <TiltedCard
            imageSrc="/clubs/gdg.jpg"
            altText="GDG"
            captionText="GDG"
            containerHeight="350px"
            imageHeight="350px"
          />
          <TiltedCard
            imageSrc="/clubs/csi.jpg"
            altText="CSI"
            captionText="CSI"
            containerHeight="350px"
            imageHeight="350px"
          />
          <TiltedCard
            imageSrc="/clubs/ieee.jpg"
            altText="IEEE"
            captionText="IEEE"
            containerHeight="350px"
            imageHeight="350px"
          />
          <TiltedCard
            imageSrc="/clubs/nss.jpg"
            altText="NSS"
            captionText="NSS"
            containerHeight="350px"
            imageHeight="350px"
          />
          <TiltedCard
            imageSrc="/clubs/rotaract.jpg"
            altText="Rotaract Club"
            captionText="Rotaract Club"
            containerHeight="350px"
            imageHeight="350px"
          />
        </div>
      </div>
    </section>
  );
}

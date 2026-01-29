"use client";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-black">
      
      <section className="relative z-10 text-white text-center px-6 py-16">
        <h1 className="font-aalto text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wider bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          EVENTHUB REC
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Discover, register, and celebrate every event in our college.
        </p>
      </section>
    </div>
  );
}

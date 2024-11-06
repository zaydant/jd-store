"use client";

import { useState, useEffect } from 'react';

const Hero = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const videoSrc = "/videos/herodemo.mp4";

  useEffect(() => {
    // Ensure that this code only runs on the client
    setIsClient(true);
  }, []);

  return (
    <div className="relative w-full bg-blue-500">
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
        {/* Background Video - rendered only on client */}
        {isClient && (
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsLoading(false)}
            onError={() => setHasError(true)}
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Content */}
        <div className="container mx-auto relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center">
            Timeless style, for every soul.
          </h1>
        </div>

        {/* Conditional Rendering for Loading/Error States */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 bg-white opacity-100 flex items-center justify-center">
            <p className="text-white text-2xl">Loading...</p>
          </div>
        )}
        {hasError && (
          <div className="absolute inset-0 bg-red-500 opacity-75 flex items-center justify-center">
            <p className="text-white text-2xl">Error loading video</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Hero;

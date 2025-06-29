import { useEffect, useRef, useState } from 'react';

export function Wheel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameLoaded, setFrameLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;

    const captureFrame = () => {
      requestAnimationFrame(() => {
        const context = canvas.getContext('2d');
        if (!context) return;

        // Ensure video has dimensions
        if (video.videoWidth === 0 || video.videoHeight === 0) {
          setTimeout(captureFrame, 100);
          return;
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setFrameLoaded(true);
      });
    };

    // Try multiple events to ensure we capture the frame
    video.addEventListener('loadeddata', captureFrame);
    video.addEventListener('loadedmetadata', captureFrame);
    video.addEventListener('canplay', captureFrame);
    
    // Force load
    video.load();

    return () => {
      video.removeEventListener('loadeddata', captureFrame);
      video.removeEventListener('loadedmetadata', captureFrame);
      video.removeEventListener('canplay', captureFrame);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Wheel of Stuff</h1>
      
      <div className="relative">
        <video
          ref={videoRef}
          src="/wheel.mp4"
          className="hidden"
          muted
          playsInline
          preload="auto"
        />
        
        <canvas
          ref={canvasRef}
          className={`rounded-full shadow-2xl ${frameLoaded ? 'block' : 'hidden'}`}
          style={{ maxWidth: '512px', maxHeight: '512px' }}
        />
        
        {!frameLoaded && (
          <div className="w-96 h-96 bg-gray-300 rounded-full animate-pulse flex items-center justify-center">
            <span className="text-gray-600">Loading wheel...</span>
          </div>
        )}
      </div>
    </div>
  );
}
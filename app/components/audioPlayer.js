"use client";
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Play, Pause } from "lucide-react";

const AudioPlayer = forwardRef(({ src }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);


  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    },
    isPlaying: () => isPlaying
  }));

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 w-full z-[9999] bg-[#0f172a] border-t border-gray-700 
                 flex items-center justify-between px-4 py-3 md:px-6 backdrop-blur-lg"
      style={{ 
        position: "fixed", 
        bottom: 0,
        // Ensure it stays above other content
        zIndex: 9999 
      }}
    >
      <button
        onClick={togglePlay}
        className="bg-white text-black rounded-full p-3 hover:bg-gray-200 transition"
      >
        {isPlaying ? <Pause size={22} /> : <Play size={22} />}
      </button>

      <audio
        ref={audioRef}
        src={src}
        controls
        className="w-[80%] accent-green-500"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
});

AudioPlayer.displayName = "AudioPlayer";

export default AudioPlayer;
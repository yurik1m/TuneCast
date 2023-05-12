import styled from "styled-components";
import { useEffect, useState, useRef } from "react";

export default function AudioPlayer({ src }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef();

  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      setProgress(audio.currentTime / audio.duration);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  const onPlayPauseClick = () => {
    const audio = audioRef.current;
    setIsPlaying(!isPlaying);

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  return (
    <div>
      <audio ref={audioRef} src={src} />
      <button onClick={onPlayPauseClick}>{isPlaying ? 'Pause' : 'Play'}</button>
      <progress max="1" value={progress} />
    </div>
  );
}

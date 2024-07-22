import React, { useRef, useEffect, useState } from 'react';

const MusicVisualizer = ({ audioSrc, isPlaying, width = 300, height = 300 }) => {
   const canvasRef = useRef(null);
   const audioContextRef = useRef(null);
   const analyserRef = useRef(null);
   const sourceRef = useRef(null);
   const audioRef = useRef(null);
   const animationFrameId = useRef(null);
   const [isVisualizerReady, setIsVisualizerReady] = useState(false);
   const fadeFactorRef = useRef(1);

   useEffect(() => {
      console.log('MusicVisualizer: Component mounted');
      return () => {
         console.log('MusicVisualizer: Component unmounted');
         if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
         }
      };
   }, []);

   useEffect(() => {
      console.log('MusicVisualizer: Audio source changed', audioSrc);
      setIsVisualizerReady(false);
      
      const setupAudio = async () => {
         if (!audioSrc) {
            console.log('MusicVisualizer: No audio source provided');
            setIsVisualizerReady(false);
            return;
         }

         try {
            if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
               audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            } else if (audioContextRef.current.state === 'suspended') {
               await audioContextRef.current.resume();
            }
            
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 2048;
            
            if (sourceRef.current) {
               sourceRef.current.disconnect();
            }

            audioRef.current = new Audio(audioSrc);
            audioRef.current.crossOrigin = "anonymous";
            
            sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
            sourceRef.current.connect(analyserRef.current);
            // Commented out to avoid echo:
            // analyserRef.current.connect(audioContextRef.current.destination);

            setIsVisualizerReady(true);
            console.log('MusicVisualizer: Audio setup complete');

            if (isPlaying) {
               audioRef.current.play().catch(e => console.error('Error playing audio:', e));
            }
         } catch (error) {
            console.error('MusicVisualizer: Error setting up audio:', error);
            setIsVisualizerReady(false);
         }
      };

      setupAudio();

      return () => {
         if (sourceRef.current) {
            sourceRef.current.disconnect();
         }
         if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
         }
      };
   }, [audioSrc, isPlaying]);

   useEffect(() => {
      console.log('MusicVisualizer: isPlaying changed', isPlaying);
      if (isPlaying && audioRef.current && isVisualizerReady) {
         audioRef.current.play().catch(e => console.error('Error playing audio:', e));
         fadeFactorRef.current = 1;
      } else if (audioRef.current) {
         audioRef.current.pause();
      }
   }, [isPlaying, isVisualizerReady]);

   useEffect(() => {
      if (!isVisualizerReady || !canvasRef.current || !analyserRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      ctx.lineWidth= 2;
      ctx.globalCompositeOperation = 'color-burn';

      const barWidth = 15;
      let barHeight;
      let x;

      // function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
      //    for (let i = 0; i < bufferLength; i++) {
      //       barHeight = dataArray[i] * 0.7 * fadeFactorRef.current;
      //       ctx.save();
      //       ctx.translate(canvas.width / 2, canvas.height / 2);
      //       ctx.rotate(i * 3);
      //       const hue = 140 + i * 0.3;
      //       ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${fadeFactorRef.current})`;
      //       ctx.beginPath();
      //       ctx.arc(25, barHeight / 2, barHeight / 2, 0, Math.PI / 3.5);
      //       ctx.fill();
      //       ctx.stroke();
      //       x += barWidth;
      //       ctx.restore();
      //    }
      // }

      // function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
      //    for (let i = 0; i < bufferLength; i++) {
      //       barHeight = dataArray[i] * 0.7 * fadeFactorRef.current;
      //       ctx.save();
      //       ctx.translate(canvas.width / 2, canvas.height / 2);
      //       ctx.rotate(i * 4.184);
      //       const hue = 150 + i * 0.111;
      //       ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
      //       ctx.beginPath();
      //       ctx.arc( 10, barHeight / 2, barHeight / 2, 0, Math.PI / 4);
      //       ctx.fill();
      //       ctx.stroke();
      //       x += barWidth;
      //       ctx.restore();
      //    }
      // }

      function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray) {
         for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] * 0.7 * fadeFactorRef.current;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(i * 3.2);
            const hue = 175 + i * 0.08;
            ctx.strokeStyle = 'hsl(' + hue + ', 100%,'+ barHeight/3 + '%)';
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(0, barHeight);
            ctx.stroke();
            x += barWidth;
            if (i > bufferLength * 0.6){
               ctx.beginPath();
               ctx.arc(0,0, barHeight/1.5, 0, Math.PI * 2);
               ctx.stroke();
            }
            ctx.restore();
         }
      }

      function animate() {
         x = 0;
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         analyserRef.current.getByteFrequencyData(dataArray);
         drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
         
         if (!isPlaying) {
            fadeFactorRef.current = Math.max(fadeFactorRef.current - 0.01, 0);
         } else {
            fadeFactorRef.current = Math.min(fadeFactorRef.current + 0.05, 1);
         }

         animationFrameId.current = requestAnimationFrame(animate);
      }

      console.log('MusicVisualizer: Starting animation');
      animate();

      return () => {
         if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
         }
      };
   }, [isVisualizerReady, isPlaying]);

   return (
      <div>
         <canvas ref={canvasRef} width={width} height={height} />
         {!isVisualizerReady && <p>Preparing visualizer...</p>}
      </div>
   );
};

export default MusicVisualizer;
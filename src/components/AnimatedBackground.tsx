import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Simple floating musical notes
    class MusicalNote {
      x: number;
      y: number;
      vx: number;
      vy: number;
      opacity: number;
      size: number;
      type: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = -Math.random() * 0.8 - 0.2;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.size = Math.random() * 20 + 15;
        
        // Different musical symbols
        const types = ['♪', '♫', '♬', '♩', '♭', '♯'];
        this.type = types[Math.floor(Math.random() * types.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Gentle floating motion
        this.x += Math.sin(Date.now() * 0.001 + this.y * 0.01) * 0.1;

        // Reset when note goes off screen
        if (this.y < -50) {
          this.y = canvas.height + 50;
          this.x = Math.random() * canvas.width;
        }

        if (this.x < -50 || this.x > canvas.width + 50) {
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.font = `${this.size}px serif`;
        ctx.textAlign = 'center';
        ctx.fillText(this.type, this.x, this.y);
        ctx.restore();
      }
    }

    // Simple sound wave visualization
    class SoundWave {
      y: number;
      amplitude: number;
      frequency: number;
      phase: number;
      speed: number;
      opacity: number;

      constructor(yPos: number) {
        this.y = yPos;
        this.amplitude = Math.random() * 20 + 10;
        this.frequency = Math.random() * 0.01 + 0.005;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.01 + 0.005;
        this.opacity = Math.random() * 0.2 + 0.1;
      }

      update() {
        this.phase += this.speed;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();

        for (let x = 0; x <= canvas.width; x += 10) {
          const y = this.y + Math.sin(x * this.frequency + this.phase) * this.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
        ctx.restore();
      }
    }

    // Create minimal elements
    const notes: MusicalNote[] = [];
    const waves: SoundWave[] = [];
    
    // Only a few notes for minimalism
    for (let i = 0; i < 8; i++) {
      notes.push(new MusicalNote());
    }

    // A few subtle waves
    for (let i = 0; i < 3; i++) {
      waves.push(new SoundWave(canvas.height * 0.2 + i * canvas.height * 0.3));
    }

    // Animation loop
    let animationId: number;
    
    const animate = () => {
      // Clear canvas with subtle gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1a1a1a');
      gradient.addColorStop(0.5, '#2d2d2d');
      gradient.addColorStop(1, '#1a1a1a');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle waves
      waves.forEach(wave => {
        wave.update();
        wave.draw();
      });

      // Draw floating notes
      notes.forEach(note => {
        note.update();
        note.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Minimal animated canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      
      {/* Subtle musical staff lines */}
      <div 
        className="fixed inset-0 opacity-10"
        style={{
          zIndex: 2,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 80px,
              rgba(255,255,255,0.1) 82px,
              rgba(255,255,255,0.1) 84px,
              transparent 86px
            )
          `,
          backgroundPosition: '0 20%'
        }}
      />

      {/* Minimal treble clef pattern */}
      <div 
        className="fixed top-1/4 left-1/4 opacity-5"
        style={{
          zIndex: 3,
          fontSize: '200px',
          color: 'rgba(255,255,255,0.1)',
          fontFamily: 'serif',
          transform: 'rotate(-15deg)',
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      >
        𝄞
      </div>

      <div 
        className="fixed bottom-1/4 right-1/4 opacity-5"
        style={{
          zIndex: 3,
          fontSize: '150px',
          color: 'rgba(255,255,255,0.1)',
          fontFamily: 'serif',
          transform: 'rotate(20deg)',
          userSelect: 'none',
          pointerEvents: 'none'
        }}
      >
        𝄢
      </div>
    </>
  );
};

export default AnimatedBackground;
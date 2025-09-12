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

    // Warm floating orbs
    class Orb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 35 + 20;
        this.opacity = Math.random() * 0.12 + 0.03;
        // Warm color palette: purples, blues, teals
        const colors = [260, 280, 300, 320, 200, 220, 180];
        this.hue = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.size || this.x > canvas.width + this.size) this.vx *= -1;
        if (this.y < -this.size || this.y > canvas.height + this.size) this.vy *= -1;

        // Gentle floating
        this.x += Math.sin(Date.now() * 0.0006 + this.x * 0.003) * 0.2;
        this.y += Math.cos(Date.now() * 0.0006 + this.y * 0.003) * 0.2;
        
        // Slowly shift hue within warm range
        this.hue += 0.1;
        if (this.hue > 340) this.hue = 180;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `hsla(${this.hue}, 60%, 65%, 0.7)`);
        gradient.addColorStop(1, `hsla(${this.hue}, 60%, 45%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create warm orbs
    const orbs: Orb[] = [];
    const orbCount = Math.min(10, Math.floor((canvas.width * canvas.height) / 50000));
    
    for (let i = 0; i < orbCount; i++) {
      orbs.push(new Orb());
    }

    // Animation loop
    let animationId: number;
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw orbs
      orbs.forEach(orb => {
        orb.update();
        orb.draw();
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
      {/* Warm animated canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      
      {/* Warmer gradient overlays */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-teal-800/25" style={{ zIndex: 2 }} />
      <div className="fixed inset-0 bg-gradient-to-t from-gray-900/40 via-gray-800/20 to-gray-700/30" style={{ zIndex: 3 }} />
      
      {/* Musical pattern background */}
      <div 
        className="fixed inset-0 opacity-8"
        style={{
          zIndex: 4,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(200,150,255,0.1) 2px, transparent 2px),
            radial-gradient(circle at 80% 80%, rgba(150,200,255,0.1) 2px, transparent 2px),
            linear-gradient(45deg, transparent 40%, rgba(200,150,255,0.05) 42%, rgba(200,150,255,0.05) 58%, transparent 60%)
          `,
          backgroundSize: '120px 120px, 80px 80px, 200px 200px',
          backgroundPosition: '0 0, 40px 40px, 0 0'
        }}
      />
      
      {/* Musical notes and symbols pattern */}
      <div 
        className="fixed inset-0 opacity-12"
        style={{
          zIndex: 5,
          background: `
            url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle%3E.note%7Bfill:rgba(200,150,255,0.3);%7D%3C/style%3E%3C/defs%3E%3Cg%3E%3Ccircle class='note' cx='20' cy='80' r='3'/%3E%3Cpath class='note' d='M23,80 L23,40 L35,38 L35,78 L32,79 L26,80 Z'/%3E%3Ccircle class='note' cx='70' cy='30' r='2'/%3E%3Cpath class='note' d='M72,30 L72,10 L80,8 L80,28 Z'/%3E%3Cpath class='note' d='M10,50 Q20,45 30,50 Q40,55 50,50' stroke='rgba(150,200,255,0.2)' stroke-width='1' fill='none'/%3E%3C/g%3E%3C/svg%3E")
          `,
          backgroundSize: 'clamp(150px, 25vw, 300px) clamp(150px, 25vw, 300px)',
          backgroundRepeat: 'repeat'
        }}
      />
      
      {/* Vinyl records pattern */}
      <div 
        className="fixed inset-0 opacity-6"
        style={{
          zIndex: 6,
          background: `
            url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle%3E.vinyl%7Bfill:none;stroke:rgba(200,150,255,0.15);stroke-width:1;%7D%3C/style%3E%3C/defs%3E%3Cg transform='translate(100,100)'%3E%3Ccircle class='vinyl' r='80'/%3E%3Ccircle class='vinyl' r='60'/%3E%3Ccircle class='vinyl' r='40'/%3E%3Ccircle class='vinyl' r='20'/%3E%3Ccircle class='vinyl' r='8' fill='rgba(150,200,255,0.1)'/%3E%3C/g%3E%3C/svg%3E")
          `,
          backgroundSize: 'clamp(400px, 50vw, 800px) clamp(400px, 50vw, 800px)',
          backgroundRepeat: 'repeat',
          backgroundPosition: '25% 25%'
        }}
      />
    </>
  );
};

export default AnimatedBackground;
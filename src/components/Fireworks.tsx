
import { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const Fireworks = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  
  // Set up canvas size
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('fireworks-container');
      if (container) {
        setCanvasSize({
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Fireworks animation
  useEffect(() => {
    if (!isPlaying || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const fireworks: Firework[] = [];
    const particles: Particle[] = [];
    let animationFrameId: number;
    
    // Firework class
    class Firework {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      angle: number;
      friction: number;
      gravity: number;
      hue: number;
      brightness: number;
      alpha: number;
      decay: number;
      
      constructor() {
        // Starting position at bottom
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        
        // Target coordinates
        this.targetX = Math.random() * canvas.width;
        this.targetY = Math.random() * canvas.height / 2;
        
        // Calculate angle between starting point and target
        const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
        const speed = 5 + Math.random() * 5;
        
        this.speed = speed;
        this.angle = angle;
        this.friction = 0.95;
        this.gravity = 0.3;
        this.hue = Math.floor(Math.random() * 360);
        this.brightness = Math.random() * 50 + 50;
        this.alpha = 1;
        this.decay = 0.015;
      }
      
      update() {
        // Move towards target
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        
        // Apply friction
        this.speed *= this.friction;
        
        // Calculate distance to target
        const distX = this.targetX - this.x;
        const distY = this.targetY - this.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // If close enough to target, explode
        if (distance < 5 || this.speed < 0.5) {
          this.explode();
          return false; // Remove firework
        }
        
        return true; // Keep firework
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
        ctx.fill();
      }
      
      explode() {
        const particleCount = 50 + Math.floor(Math.random() * 50);
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(this.x, this.y, this.hue));
        }
      }
    }
    
    // Particle class (for explosion)
    class Particle {
      x: number;
      y: number;
      angle: number;
      speed: number;
      friction: number;
      gravity: number;
      hue: number;
      brightness: number;
      alpha: number;
      decay: number;
      
      constructor(x: number, y: number, hue: number) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.cos(Math.random() * Math.PI / 2) * 10;
        this.friction = 0.95;
        this.gravity = 0.3;
        this.hue = hue + Math.random() * 20 - 10;
        this.brightness = Math.random() * 50 + 50;
        this.alpha = 1;
        this.decay = 0.015 + Math.random() * 0.01;
      }
      
      update() {
        // Move particle
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        
        // Apply friction
        this.speed *= this.friction;
        
        // Fade out
        this.alpha -= this.decay;
        
        return this.alpha >= 0.01; // Keep if still visible
      }
      
      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
        ctx.fill();
      }
    }
    
    // Animation loop
    const animate = () => {
      // Add background with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Random chance to add a new firework
      if (Math.random() < 0.05) {
        fireworks.push(new Firework());
      }
      
      // Update and draw fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];
        if (firework.update()) {
          firework.draw();
        } else {
          fireworks.splice(i, 1);
        }
      }
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        if (particle.update()) {
          particle.draw();
        } else {
          particles.splice(i, 1);
        }
      }
      
      // Auto-stop after 10 seconds
      if (isPlaying) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    // Start animation
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animationFrameId = requestAnimationFrame(animate);
    
    // Auto-stop after 10 seconds
    const timeout = setTimeout(() => {
      setIsPlaying(false);
    }, 10000);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeout);
    };
  }, [isPlaying, canvasSize]);

  const handlePlayFireworks = () => {
    setIsPlaying(true);
  };

  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-love-800 mb-2 flex items-center justify-center">
          <Sparkles className="mr-2 text-love-600" size={24} />
          Birthday Celebration
        </h2>
        <p className="text-love-600 text-lg max-w-md mx-auto">
          Click the button to set off a spectacular firework display!
        </p>
      </div>

      <div 
        id="fireworks-container" 
        className="relative aspect-video glass-morphism rounded-xl overflow-hidden shadow-lg"
      >
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="absolute inset-0 w-full h-full"
        />
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayFireworks}
              className="px-6 py-3 bg-love-600 hover:bg-love-700 text-white rounded-full shadow-lg transform transition-transform hover:scale-105 focus:outline-none font-medium flex items-center"
            >
              <Sparkles className="mr-2" size={20} />
              Celebrate with Fireworks!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fireworks;

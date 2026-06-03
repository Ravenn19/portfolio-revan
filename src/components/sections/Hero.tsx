import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import ParticleBackground from '../ui/ParticleBackground';
import FloatingShapes from '../ui/FloatingShapes';
import { heroData, carouselData } from '../../data/portfolioData';

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = carouselData.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextSlide]);

  const getCardStyle = (index: number) => {
    let offset = index - currentIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const abs = Math.abs(offset);
    const sign = offset < 0 ? -1 : 1;

    if (abs === 0) {
      return { x: 0, z: 0, rotateY: 0, scale: 1, opacity: 1, zIndex: 10 };
    } else if (abs === 1) {
      return { x: sign * 340, z: -200, rotateY: -sign * 25, scale: 0.85, opacity: 0.7, zIndex: 5 };
    } else if (abs === 2) {
      return { x: sign * 550, z: -350, rotateY: -sign * 35, scale: 0.7, opacity: 0.4, zIndex: 3 };
    } else {
      return { x: sign * 700, z: -450, rotateY: -sign * 40, scale: 0.6, opacity: 0, zIndex: 1 };
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      const headerHeight = document.getElementById('header')?.offsetHeight || 80;
      window.scrollTo({ top: el.offsetTop - headerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
      <div className="absolute inset-0">
        <div className="ambient-blob ambient-blob-1" />
        <div className="ambient-blob ambient-blob-2" />
      </div>
      <ParticleBackground />
      <FloatingShapes />

      {/* Hero content */}
      <div className="relative z-10 text-center px-5 pt-28 sm:pt-32 pb-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-block mb-4 px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm"
        >
          <span className="text-blue-400 text-sm font-mono font-medium tracking-wider">
            ✦ AI Engineer & Full Stack Developer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-5 leading-tight"
        >
          <span className="gradient-text">{heroData.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {heroData.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a href="#projects" className="btn-primary inline-flex items-center gap-2">
            View Projects
          </a>
          <a href="#contact" className="btn-outline inline-flex items-center gap-2">
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* 3D Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative z-10 w-full max-w-6xl mx-auto mt-4 sm:mt-6"
        style={{ perspective: '1200px' }}
      >
        {/* Indicators */}
        <div className="flex justify-center gap-3 mb-6">
          {carouselData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-400 scale-125 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Carousel viewport */}
        <div className="relative h-[380px] sm:h-[440px] md:h-[480px]" style={{ transformStyle: 'preserve-3d' }}>
          <AnimatePresence>
            {carouselData.map((item, index) => {
              const style = getCardStyle(index);
              return (
                <div
                  key={item.id}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ zIndex: style.zIndex, transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className="w-[280px] sm:w-[320px] md:w-[360px]"
                    animate={{
                      x: style.x,
                      rotateY: style.rotateY,
                      scale: style.scale,
                      opacity: style.opacity,
                    }}
                    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                    style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
                  >
                  <div
                    className="glass-card p-5 sm:p-6 cursor-pointer h-[360px] sm:h-[400px] md:h-[440px] flex flex-col"
                    onClick={scrollToProjects}
                  >
                    <div className="absolute top-4 right-5 text-5xl sm:text-6xl font-bold text-blue-500/10 font-mono">
                      0{item.id}
                    </div>
                    <div className="w-full h-[140px] sm:h-[160px] md:h-[180px] rounded-xl overflow-hidden mb-4 border border-blue-500/10">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 gradient-text-static leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.tech.map((t) => (
                        <span key={t} className="tech-badge text-[10px] sm:text-xs py-1 px-2.5">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button className="btn-primary text-sm py-2.5 px-6 w-fit" onClick={scrollToProjects}>
                      Explore
                    </button>
                  </div>
                </motion.div>
                </div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-blue-400 hover:text-white hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-blue-400 hover:text-white hover:border-blue-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 mt-8 sm:mt-12 pb-8"
      >
        <a href="#about" className="flex flex-col items-center text-slate-500 hover:text-blue-400 transition-colors">
          <span className="text-xs tracking-widest uppercase mb-2">Scroll Down</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown size={18} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}

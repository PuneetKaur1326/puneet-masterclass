'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Header() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 60) {
        navRef.current.classList.add('nav-scrolled');
      } else {
        navRef.current.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const handleScroll = () => setMenuOpen(false);
      window.addEventListener('scroll', handleScroll, { passive: true, once: true });
    }
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 py-5 px-6 md:px-12 flex justify-between items-center transition-all duration-500"
        style={{ transition: 'padding 0.4s ease, background 0.4s ease' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
          <AppLogo size={36} />
          <span className="font-display font-bold text-sm tracking-tight text-foreground hidden sm:block">
            Puneet Kaur Saluja
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <button onClick={() => scrollTo('discover')} className="hover:text-foreground transition-colors focus:outline-none">
            What You&apos;ll Learn
          </button>
          <button onClick={() => scrollTo('mentor')} className="hover:text-foreground transition-colors focus:outline-none">
            About
          </button>
          <a
            href="https://rzp.io/rzp/J6xwaRTb"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold uppercase tracking-widest hover:bg-accent transition-all duration-300 text-[10px]"
          >
            Join for ₹99
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-3 border border-border rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
          <button onClick={() => scrollTo('discover')} className="text-lg font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors focus:outline-none">
            What You&apos;ll Learn
          </button>
          <button onClick={() => scrollTo('mentor')} className="text-lg font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors focus:outline-none">
            About Puneet
          </button>
          <a
            href="https://rzp.io/rzp/J6xwaRTb"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-10 py-5 bg-primary text-primary-foreground rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-accent transition-all text-center block"
          >
            Join for ₹99
          </a>
        </div>
      )}
    </>
  );
}

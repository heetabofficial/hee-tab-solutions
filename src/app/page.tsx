// Suggested code may be subject to a license. Learn more: ~LicenseLog:2272663559.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:609920850.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1495750644.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2687877562.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:801415085.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1952795127.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1273254432.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1983411859.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3912236969.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:4164840654.
'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function Home(): JSX.Element
 {
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout
(timer);
  }, []);

  function calculateTimeLeft(): Record<string, number> {
    const targetDate = new Date('2024-12-31');
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft: Record<string, number> = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.
floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const gridSize = 40;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.strokeStyle = '#333';

    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y <= canvas
.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, [gridSize]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      fontFamily: 'sans-serif',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute' }} />

      <div style={{
        maxWidth: '800px',
        padding: '32px',
        textAlign: 'center',
        zIndex: 1,
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
        }}>
          Something Amazing is Coming Soon!
        </h1>

        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          marginBottom: '3rem',
        }}>
          {Object.entries(timeLeft).map(([key, value]) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>{value}</div>
              <div>{key}</div> {/* Display the keys (days, hours, etc.) */}
            </div>
          ))}
        </div>

        <p style={{ fontSize: '1.2rem' }}>
          Get ready for an unforgettable experience!
        </p>
      </div>
    </div>
  );
}

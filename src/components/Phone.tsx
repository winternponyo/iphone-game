import { useEffect, useRef, type ReactNode } from 'react';

interface PhoneProps {
  children: ReactNode;
}

const Phone = ({ children }: PhoneProps) => {
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fitPhone = () => {
      const phone = phoneRef.current;
      if (!phone) return;
      const scaleX = (window.innerWidth - 40) / 413;
      const scaleY = (window.innerHeight - 40) / 872;
      const scale = Math.min(scaleX, scaleY);
      phone.style.setProperty('--phone-scale', String(scale));
    };

    fitPhone();
    window.addEventListener('resize', fitPhone);
    return () => window.removeEventListener('resize', fitPhone);
  }, []);

  return (
    <div id="phone" ref={phoneRef}>
      <div className="screen">
        <div id="island" />
        <div className="status-bar">
          <span id="statusTime">5:51</span>
        </div>
        {children}
        <div id="homeIndicator">
          <div style={{ width: 130, height: 5, background: '#fff', borderRadius: 10 }} />
        </div>
      </div>
    </div>
  );
};

export default Phone;

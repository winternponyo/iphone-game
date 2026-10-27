// src/components/Phone.tsx
import { useEffect, useRef, type ReactNode } from 'react';

interface PhoneProps {
  children: ReactNode;
  onGoHome?: () => void;
}

const Phone = ({ children, onGoHome }: PhoneProps) => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const swipeStartY = useRef(0);

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

  // 全局返回主畫面手勢（模擬 iOS Home 條）
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0].clientY > window.innerHeight - 100) {
      swipeStartY.current = e.touches[0].clientY;
    } else {
      swipeStartY.current = 0;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (swipeStartY.current > 0) {
      const endY = e.changedTouches[0].clientY;
      if (swipeStartY.current - endY > 30 && onGoHome) {
        onGoHome();
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.clientY > window.innerHeight - 100) {
      swipeStartY.current = e.clientY;
    } else {
      swipeStartY.current = 0;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (swipeStartY.current > 0 && onGoHome) {
      if (swipeStartY.current - e.clientY > 30) {
        onGoHome();
      }
    }
  };

  return (
    <div id="phone" ref={phoneRef}>
      <div 
        className="screen"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div id="island" />
        
        {/* 狀態欄：結構已經修復，只留一個 span 同一個 img */}
        <div className="status-bar">
          <span id="statusTime">5:51</span>
          <img src="/icon/Status Bars.svg" alt="状态栏" style={{ height: 14, filter: 'invert(1)', marginBottom: 2 }} />
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
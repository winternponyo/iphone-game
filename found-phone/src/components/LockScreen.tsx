// src/components/LockScreen.tsx
import { useRef } from 'react';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const startY = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endY = e.changedTouches[0].clientY;
    // 如果向上滑動超過 30px 就解鎖
    if (startY.current - endY > 30) {
      onUnlock();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startY.current = e.clientY;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    // 如果向上滑動超過 30px 就解鎖
    if (startY.current - e.clientY > 30) {
      onUnlock();
    }
  };

  return (
    <div 
      className="lock-screen" 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="lock-date">10月24日 星期六</div>
      <div className="lock-time">5:51</div>

      <div className="lock-notification">
        <div style={{ fontSize: 13, opacity: 0.9 }}>微信</div>
        <div style={{ fontWeight: 600 }}>小昱</div>
        <div>我到机场了，你睡了没？</div>
      </div>

      <div className="lock-bottom" style={{ justifyContent: 'space-between' }}>
        <div className="lock-circle">
          <img src="/icon/lock.png" style={{ width: 26, height: 26, filter: 'invert(1)' }} alt="flashlight" />
        </div>
        <div className="swipe-hint" style={{ opacity: 0.6 }}>向上轻扫以解锁</div>
        <div className="lock-circle">
          <img src="/icon/calling.png" style={{ width: 32, height: 32, filter: 'invert(1)' }} alt="camera" />
        </div>
      </div>
        <div className="swipe-hint">向上轻扫以解锁</div>
      </div>
  );
};

export default LockScreen;
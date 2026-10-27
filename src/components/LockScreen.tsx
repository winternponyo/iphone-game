interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  return (
    <div className="lock-screen" onClick={onUnlock}>
      <div className="lock-date">10月24日 星期六</div>
      <div className="lock-time">5:51</div>

      <div className="lock-notification">
        <div style={{ fontSize: 13, opacity: 0.9 }}>微信</div>
        <div style={{ fontWeight: 600 }}>小昱</div>
        <div>我到机场了，你睡了没？</div>
      </div>

      <div className="lock-bottom">
        <div className="swipe-hint">向上轻扫以解锁</div>
      </div>
    </div>
  );
};

export default LockScreen;

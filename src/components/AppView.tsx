import type { StoryFlags } from '../types';

interface AppViewProps {
  appName: string;
  flags: StoryFlags;
  onClose: () => void;
  onCallAnswered: () => void;
}

const AppView = ({ appName, flags, onClose, onCallAnswered }: AppViewProps) => {
  const renderContent = () => {
    switch (appName) {
      case '相册':
        return (
          <div style={{ padding: 20, color: '#000', background: '#fff', height: '100%' }}>
            <div onClick={onClose} style={{ color: '#007aff', cursor: 'pointer', marginBottom: 20 }}>
              ‹ 主屏幕
            </div>
            <h2>图库</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
              <div style={{ aspectRatio: 1, background: '#eee' }}>🐱</div>
              <div style={{ aspectRatio: 1, background: '#eee' }}>🏆</div>
              <div style={{ aspectRatio: 1, background: '#eee' }}>🏎️</div>
            </div>

            {flags.hiddenAlbumUnlocked && (
              <div style={{ marginTop: 30 }}>
                <h3>隐藏相簿</h3>
                <div style={{ background: '#f2f2f7', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: 30 }}>🔓</div>
                  <div style={{ color: '#007aff' }}>已解锁：两只手戴着同款手链</div>
                </div>
              </div>
            )}
          </div>
        );

      case '微信':
        return (
          <div style={{ padding: 20, color: '#000', background: '#ededed', height: '100%' }}>
            <div onClick={onClose} style={{ cursor: 'pointer', marginBottom: 10 }}>‹ 返回</div>
            <h3>微信</h3>
            <div style={{ background: '#fff', padding: 12, borderRadius: 8, marginBottom: 8 }}>
              <strong>小昱</strong>
              <div style={{ color: '#888' }}>我到机场了，你睡了没？</div>
            </div>
            <button
              onClick={onCallAnswered}
              style={{ marginTop: 20, padding: 10, background: '#07c160', color: '#fff', border: 'none', borderRadius: 8 }}
            >
              模拟接听小昱来电
            </button>
          </div>
        );

      default:
        return (
          <div style={{ padding: 20, color: '#000', background: '#fff', height: '100%' }}>
            <div onClick={onClose} style={{ cursor: 'pointer', marginBottom: 20 }}>‹ 主屏幕</div>
            <h2>{appName}</h2>
            <p>这个 App 还没做。</p>
          </div>
        );
    }
  };

  return (
    <div className="app-view show">
      <div className="app-content">{renderContent()}</div>
    </div>
  );
};

export default AppView;
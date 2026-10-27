import Calculator from './apps/Calculator';
import WeChat from './apps/WeChat'; // 👈 新增引入 WeChat

interface AppViewProps {
  appName: string;
  onClose: () => void;
}

const AppView = ({ appName, onClose }: AppViewProps) => {
  const renderContent = () => {
    switch (appName) {
      case '相册':
        return (
          <div style={{ padding: 20, color: '#000', background: '#fff', height: '100%', overflowY: 'auto' }}>
            <div onClick={onClose} style={{ color: '#007aff', cursor: 'pointer', marginBottom: 20 }}>
              ‹ 主屏幕
            </div>
            <h2>图库</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
              <div style={{ aspectRatio: 1, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🐱</div>
              <div style={{ aspectRatio: 1, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🏆</div>
              <div style={{ aspectRatio: 1, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🏎️</div>
              <div style={{ aspectRatio: 1, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🫶</div>
              <div style={{ aspectRatio: 1, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>📦</div>
              <div style={{ aspectRatio: 1, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>✈️</div>
            </div>
          </div>
        );

      case '微信':
        return <WeChat onClose={onClose} />; // 👈 改用 WeChat Component

      case '计算器':
        return <Calculator />;

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

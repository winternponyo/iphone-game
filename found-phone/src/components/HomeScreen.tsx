// src/components/HomeScreen.tsx
import type { StoryFlags } from '../types';

interface HomeScreenProps {
  flags: StoryFlags;
  onOpenApp: (name: string) => void;
}

const HomeScreen = ({ flags: _flags, onOpenApp }: HomeScreenProps) => {
  const apps = [
    { name: '相册', icon: '/icon/photos.png' },
    { name: '天气', icon: '/icon/weather.png' },
    { name: '备忘录', icon: '/icon/notes.png' },
    { name: '设置', icon: '/icon/settings.png' },
    { name: '微信', icon: '/icon/wechat.png' },
    { name: '小红书', icon: '/icon/xhs.png' },
    { name: '微博', icon: '/icon/weibo.png' }, 
    { name: '闲鱼', icon: '/icon/xianyu.png' }, 
    { name: '倒数日', icon: '⏳', isEmoji: true }, 
    { name: '音乐', icon: '/icon/music.png' }, // 用你上載嘅 music.png
    { name: '计算器', icon: '/icon/calculator.png' },
    { name: '日历', icon: '📅', isEmoji: true },
  ];

  return (
    <div className="home-screen show">
      <div className="home-content">
        {/* 頂部卡片 */}
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: 20,
          padding: '15px 20px',
          marginBottom: 20,
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 75,
          boxSizing: 'border-box'
        }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>广州</div>
            <div style={{ fontSize: 24, fontWeight: 300 }}>26°</div>
          </div>
          <div style={{ fontSize: 20, opacity: 0.9, margin: '0 15px' }}>ᯓᰔ</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 14, fontWeight: 'bold' }}>圆圆满满</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>陪伴第 991 天</div>
          </div>
        </div>

        <div className="app-grid">
          {apps.map((app) => (
            <div key={app.name} className="app" onClick={() => onOpenApp(app.name)}>
              <div 
                className="app-icon" 
                style={app.isEmoji ? { background: '#ff3b30', color: '#fff', fontSize: 28, borderRadius: 15 } : { background: 'transparent', boxShadow: 'none' }}
              >
                {app.isEmoji ? app.icon : <img src={app.icon} alt={app.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 15 }} />}
              </div>
              <span>{app.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
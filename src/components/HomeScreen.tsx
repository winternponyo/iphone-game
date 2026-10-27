import type { StoryFlags } from '../types';

interface HomeScreenProps {
  flags: StoryFlags;
  onOpenApp: (name: string) => void;
}

const HomeScreen = ({ flags, onOpenApp }: HomeScreenProps) => {
  const apps = [
    { name: '相册', icon: '🖼️' },
    { name: '微信', icon: '💬' },
    { name: '备忘录', icon: '📝' },
    { name: '天气', icon: '🌤️' },
    { name: '计算器', icon: '🔢' },
    { name: '日历', icon: '📅' },
  ];

  return (
    <div className="home-screen show">
      <div className="home-content">
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 20,
          padding: 15,
          marginBottom: 20,
          color: '#fff',
        }}>
          <div>广州 26°</div>
          <div>陪伴第 991 天</div>
        </div>

        <div className="app-grid">
          {apps.map(app => (
            <div key={app.name} className="app" onClick={() => onOpenApp(app.name)}>
              <div className="app-icon">{app.icon}</div>
              <span>{app.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

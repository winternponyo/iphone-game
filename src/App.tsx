import { useState } from 'react';
import Phone from './components/Phone';
import LockScreen from './components/LockScreen';
import PasscodeScreen from './components/PasscodeScreen';
import HomeScreen from './components/HomeScreen';
import AppView from './components/AppView';
import type { ScreenState, StoryFlags } from './types';
import './index.css';

function App() {
  const [screen, setScreen] = useState<ScreenState>('lock');
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [flags, setFlags] = useState<StoryFlags>({
    callAnswered: false,
    hiddenAlbumUnlocked: false,
  });

  const handlePasscodeSuccess = () => setScreen('home');

  const handleCallAnswered = () => {
    setFlags(prev => ({ ...prev, callAnswered: true, hiddenAlbumUnlocked: true }));
  };

  const openApp = (appName: string) => setActiveApp(appName);
  const closeApp = () => setActiveApp(null);

  return (
    <Phone>
      {screen === 'lock' && (
        <LockScreen onUnlock={() => setScreen('passcode')} />
      )}

      {screen === 'passcode' && (
        <PasscodeScreen
          correctCode="0528"
          onSuccess={handlePasscodeSuccess}
          onCancel={() => setScreen('lock')}
        />
      )}

      {screen === 'home' && (
        <HomeScreen flags={flags} onOpenApp={openApp} />
      )}

      {activeApp && (
        <AppView
          appName={activeApp}
          flags={flags}
          onClose={closeApp}
          onCallAnswered={handleCallAnswered}
        />
      )}
    </Phone>
  );
}

export default App;

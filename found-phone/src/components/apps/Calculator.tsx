// src/components/apps/Calculator.tsx
import { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [showCake, setShowCake] = useState(false);
  const [easterEgg, setEasterEgg] = useState('');

  const handleInput = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setEasterEgg('');
      return;
    }
    
    if (val === '=') {
      // 彩蛋 1：5201314
      if (display === '5201314') {
        setEasterEgg('lgywawmy❤️wmywalgy');
        setDisplay('');
        setTimeout(() => { setEasterEgg(''); setDisplay('0'); }, 4000);
      } 
      // 彩蛋 2：林高遠生日 319
      else if (display === '319') {
        setEasterEgg('林高远生日快乐');
        setShowCake(true);
        setDisplay('');
        setTimeout(() => { setEasterEgg(''); setShowCake(false); setDisplay('0'); }, 4000);
      }
      // 彩蛋 3：王曼昱生日 209
      else if (display === '209') {
        setEasterEgg('王曼昱生日快乐');
        setShowCake(true);
        setDisplay('');
        setTimeout(() => { setEasterEgg(''); setShowCake(false); setDisplay('0'); }, 4000);
      }
      else {
        try {
          // eslint-disable-next-line no-eval
          const result = eval(display);
          setDisplay(String(result));
        } catch {
          setDisplay('Error');
        }
      }
      return;
    }

    if (val === '+/-') {
      setDisplay(prev => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
      return;
    }

    if (val === '%') {
      setDisplay(prev => String(Number(prev) / 100));
      return;
    }

    if (val === '.') {
      if (!display.includes('.')) setDisplay(prev => prev + '.');
      return;
    }

    // 處理加減乘除
    if (['+', '-', '*', '/'].includes(val)) {
      const lastChar = display.slice(-1);
      if (['+', '-', '*', '/'].includes(lastChar)) {
        setDisplay(prev => prev.slice(0, -1) + val);
      } else {
        setDisplay(prev => prev + val);
      }
      return;
    }

    // 處理數字
    setDisplay(prev => (prev === '0' ? val : prev + val));
  };

  return (
    <div style={{ background: '#000', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: 40, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* 顯示屏 */}
      <div style={{ padding: '0 20px 20px', textAlign: 'right', color: '#fff', position: 'relative', minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        {showCake && <div style={{ fontSize: 40, position: 'absolute', right: 20, top: -50 }}>🎂</div>}
        
        {easterEgg ? (
          <div style={{ fontSize: 28, color: '#ff9a9e', fontWeight: 500, marginBottom: 10, textShadow: '0 0 10px rgba(255,154,158,0.8)', letterSpacing: 1 }}>
            {easterEgg}
          </div>
        ) : (
          <div style={{ fontSize: 72, fontWeight: 300, overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1 }}>
            {display}
          </div>
        )}
      </div>

      {/* 鍵盤區 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, padding: '0 16px' }}>
        <button onClick={() => handleInput('C')} style={{ background: '#a5a5a5', color: '#000', borderRadius: '50%', aspectRatio: 1, fontSize: 32, border: 'none' }}>AC</button>
        <button onClick={() => handleInput('+/-')} style={{ background: '#a5a5a5', color: '#000', borderRadius: '50%', aspectRatio: 1, fontSize: 32, border: 'none' }}>+/-</button>
        <button onClick={() => handleInput('%')} style={{ background: '#a5a5a5', color: '#000', borderRadius: '50%', aspectRatio: 1, fontSize: 32, border: 'none' }}>%</button>
        <button onClick={() => handleInput('/')} style={{ background: '#ff9500', color: '#fff', borderRadius: '50%', aspectRatio: 1, fontSize: 36, border: 'none' }}>÷</button>

        {['7', '8', '9'].map(n => (
          <button key={n} onClick={() => handleInput(n)} style={{ background: '#333', color: '#fff', borderRadius: '50%', aspectRatio: 1, fontSize: 32, border: 'none' }}>{n}</button>
        ))}
        <button onClick={() => handleInput('*')} style={{ background: '#ff9500', color: '#fff', borderRadius: '50%', aspectRatio: 1, fontSize: 36, border: 'none' }}>×</button>

        {['4', '5', '6'].map(n => (
          <button key={n} onClick={() => handleInput(n)} style={{ background: '#333', color: '#fff', borderRadius: '50%', aspectRatio: 1, fontSize: 32, border: 'none' }}>{n}</button>
        ))}
        <button onClick={() => handleInput('-')} style={{ background: '#ff9500', color: '#fff', borderRadius: '50%', aspectRatio: 1, fontSize: 36, border: 'none' }}>−</button>

        {['1', '2', '3'].map(n => (
          <button key={n} onClick={() => handleInput(n)} style={{ background: '#333', color: '#fff', borderRadius: '50%', aspectRatio: 1, fontSize: 32, border: 'none' }}>{n}</button>
        ))}
        <button onClick={() => handleInput('+')} style={{ background: '#ff9500', color: '#fff', borderRadius: '50%', aspectRatio: 1, fontSize: 36, border: 'none' }}>+</button>

        <button onClick={() => handleInput('0')} style={{ background: '#333', color: '#fff', borderRadius: 40, gridColumn: 'span 2', display: 'flex', alignItems: 'center', paddingLeft: 28, fontSize: 32, border: 'none' }}>0</button>
        <button onClick={() => handleInput('.')} style={{ background: '#333', color: '#fff', borderRadius: '50%', aspectRatio: 1, fontSize: 32, border: 'none' }}>.</button>
        <button onClick={() => handleInput('=')} style={{ background: '#ff9500', color: '#fff', borderRadius: '50%', aspectRatio: 1, fontSize: 36, border: 'none' }}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
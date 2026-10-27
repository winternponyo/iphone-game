import { useState } from 'react';

interface PasscodeScreenProps {
  correctCode: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PasscodeScreen = ({ correctCode, onSuccess, onCancel }: PasscodeScreenProps) => {
  const [input, setInput] = useState('');

  const handleKey = (num: string) => {
    if (input.length >= 4) return;
    const next = input + num;
    setInput(next);

    if (next.length === 4) {
      if (next === correctCode) {
        setTimeout(onSuccess, 200);
      } else {
        setTimeout(() => setInput(''), 300);
      }
    }
  };

  return (
    <div className="passcode-screen show">
      <div className="passcode-title">输入密码</div>
      <div className="passcode-dots">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`dot ${i < input.length ? 'filled' : ''}`} />
        ))}
      </div>

      <div className="keypad">
        {['1','2','3','4','5','6','7','8','9','','0',''].map((k, i) => (
          <div
            key={i}
            className={`key ${k === '' ? 'blank' : ''}`}
            onClick={() => k && handleKey(k)}
          >
            {k}
          </div>
        ))}
      </div>

      <div className="passcode-bottom">
        <div className="passcode-btn" onClick={onCancel}>取消</div>
      </div>
    </div>
  );
};

export default PasscodeScreen;

// src/components/apps/WeChat.tsx
import { useState } from 'react';

const WeChat = ({ onClose }: { onClose: () => void }) => {
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [input, setInput] = useState('');
  
  // 將你提供嘅對話放晒入嚟
  const [messages, setMessages] = useState([
    { id: 1, text: "我到机场了，你睡了没？", isMe: false, time: "02:15" },
    { id: 2, text: "还没，在猫咖这边弄新品呢...你到了记得报平安！", isMe: true, time: "02:16" },
    { id: 3, text: "知道了，你明天也要好好练体能~", isMe: false, time: "02:17" },
    { id: 4, text: "好~你在飞机上好好休息~", isMe: true, time: "02:18" },
    { id: 5, text: "貂蝉今天怎么样啊", isMe: false, time: "02:20" },
    { id: 6, text: "挺好的，今天是乖乖小公主，像她妈", isMe: true, time: "02:21" },
    { id: 7, text: "那是😼", isMe: true, time: "02:21" }, 
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), text: input, isMe: true, time: "现在" };
    setMessages([...messages, newMsg]);
    setInput('');

    // 模擬自動回覆
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "收到啦，你快点休息吧~",
        isMe: false,
        time: "现在"
      }]);
    }, 1500);
  };

  // 聊天列表畫面
  if (!currentChat) {
    return (
      <div style={{ background: '#ededed', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#ededed', padding: '50px 16px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #dcdcdc' }}>
          <div style={{ fontSize: 17, fontWeight: 600, color: '#000' }}>微信(99+)</div>
          <div onClick={onClose} style={{ fontSize: 20, cursor: 'pointer' }}>✕</div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {/* 小昱對話 */}
          <div onClick={() => setCurrentChat('小昱')} style={{ background: '#f4f4f4', padding: '12px 16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #e5e5e5', cursor: 'pointer' }}>
            <div style={{ width: 48, height: 48, borderRadius: 6, background: '#f7b2c1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginRight: 12 }}>🏓</div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: 16, color: '#111', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                <span>小昱</span> <span style={{ fontSize: 12, color: '#999', fontWeight: 400 }}>凌晨 2:15</span>
              </div>
              <div style={{ fontSize: 14, color: '#999', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>我到机场了，你睡了没？</div>
            </div>
          </div>
          
          {/* 廣東隊對話 */}
          <div onClick={() => setCurrentChat('广东队')} style={{ background: '#fff', padding: '12px 16px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #e5e5e5', cursor: 'pointer' }}>
            <div style={{ width: 48, height: 48, borderRadius: 6, background: '#007aff', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginRight: 12 }}>粤</div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: 16, color: '#111', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                <span>广东队</span> <span style={{ fontSize: 12, color: '#999', fontWeight: 400 }}>昨天</span>
              </div>
              <div style={{ fontSize: 14, color: '#999', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>远哥，明天练体能？</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 聊天室畫面
  return (
    <div style={{ background: '#ededed', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ background: '#ededed', padding: '50px 16px 10px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #dcdcdc', position: 'relative', justifyContent: 'center' }}>
        <div onClick={() => setCurrentChat(null)} style={{ position: 'absolute', left: 16, color: '#333', fontSize: 28, cursor: 'pointer', fontWeight: 300 }}>‹</div>
        <div style={{ fontSize: 17, fontWeight: 600, color: '#000' }}>{currentChat}</div>
      </div>

      <div style={{ flex: 1, padding: '15px 16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
        
        {/* 顯示時間分隔線（模擬真實微信） */}
        <div style={{ textAlign: 'center', fontSize: 12, color: '#999', margin: '10px 0' }}>今天 02:15</div>

        {/* 如果我哋係同小昱傾偈 */}
        {currentChat === '小昱' && messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: msg.isMe ? 'row-reverse' : 'row', alignItems: 'flex-start', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 6, background: msg.isMe ? 'linear-gradient(45deg, #1c1c3a, #b76e79)' : '#f7b2c1', color: msg.isMe ? 'white' : 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
              {msg.isMe ? '远' : '🏓'}
            </div>
            <div style={{ maxWidth: '65%', padding: '10px 14px', borderRadius: 6, fontSize: 16, lineHeight: 1.5, background: msg.isMe ? '#95ec69' : '#fff', color: '#000', borderTopLeftRadius: msg.isMe ? 6 : 2, borderTopRightRadius: msg.isMe ? 2 : 6 }}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {/* 如果係其他對話，求其顯示 */}
        {currentChat !== '小昱' && <div style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>呢個對話未寫劇情~</div>}
      </div>

      {/* 底部輸入區（只有小昱可以打字） */}
      {currentChat === '小昱' && (
        <div style={{ background: '#f7f7f7', padding: '10px 15px 30px', display: 'flex', gap: 10, alignItems: 'center', borderTop: '1px solid #ddd' }}>
          <div style={{ fontSize: 24, color: '#333', cursor: 'pointer' }}>🎤</div>
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, padding: 10, borderRadius: 6, border: 'none', outline: 'none', fontSize: 16, background: '#fff' }}
          />
          <div onClick={handleSend} style={{ fontSize: 24, color: '#07c160', cursor: 'pointer' }}>发送</div>
        </div>
      )}
    </div>
  );
};

export default WeChat;

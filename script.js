function updateTime() {
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const t = `${h}:${m}`;
  document.getElementById('statusTime').textContent = t;
  const lockTime = document.querySelector('.lock-time');
  if (lockTime) lockTime.textContent = t;
  
  // 更新鎖屏日期 (簡體中文)
  const dateEl = document.getElementById('lockDate');
  if (dateEl) {
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    dateEl.textContent = `${month}月${date}日 ${days[now.getDay()]}`;
  }
}
updateTime();
setInterval(updateTime, 1000);

// 上滑解锁
const lockScreen = document.getElementById('lockScreen');
let startY = 0;

lockScreen.addEventListener('touchstart', e => {
  startY = e.touches[0].clientY;
});
lockScreen.addEventListener('touchmove', e => {
  const dy = e.touches[0].clientY - startY;
  if (dy < 0) lockScreen.style.transform = `translateY(${dy}px)`;
});
lockScreen.addEventListener('touchend', e => {
  const dy = e.changedTouches[0].clientY - startY;
  if (dy < -100) {
    showPasscode(); 
  } else {
    lockScreen.style.transform = '';
  }
});
lockScreen.addEventListener('mousedown', e => { startY = e.clientY; });
lockScreen.addEventListener('mouseup', e => {
  if (e.clientY - startY < -100) showPasscode(); 
});

// App 打开/关闭
const appView = document.getElementById('appView');
const appTitle = document.getElementById('appTitle');
const appContent = document.getElementById('appContent');

const appData = {
  '相册': '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px; padding:20px;">' +
          ['🌄','🏙️','🌊','🌸','🐱','🍜'].map(e =>
          `<div style="aspect-ratio:1;background:#ddd;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:28px">${e}</div>`).join('') + '</div>',
  
  '天气': '<div style="text-align:center;padding-top:40px"><img src="icon/emoji/sun.png" alt="太阳" style="width:80px; height:80px; object-fit:contain;"><div style="font-size:48px;font-weight:200; margin-top:10px;">18°</div><div style="color:#666">首尔 · 大部晴朗</div><div style="margin-top:20px;color:#999">最高21° 最低12°</div></div>',
  
  '备忘录': `
    <div style="padding: 20px; height: 100%; display: flex; flex-direction: column;">
      <div style="font-size: 22px; font-weight: bold; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
        她的生日 
        <img src="icon/emoji/cake.png" alt="蛋糕" style="width: 24px; height: 24px; object-fit: contain;">
      </div>
      <div style="font-size: 12px; color: #888; margin-bottom: 20px;">2月9日 · 10天后</div>
      <textarea style="flex: 1; width: 100%; border: none; outline: none; font-size: 16px; font-family: inherit; background: transparent; resize: none;" placeholder="在这里输入内容...">记得订餐厅。</textarea>
    </div>
  `,

  '设置': `
    <div style="background: #f2f2f7; height: 100%; padding: 20px 16px; font-family: -apple-system, sans-serif;">
      <div style="background: white; border-radius: 10px; padding: 0 16px; margin-bottom: 25px;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #e5e5ea;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 17px; color: #000;">
            <div style="width: 29px; height: 29px; border-radius: 7px; background: #ff9500; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">✈️</div> 飞行模式
          </div>
          <div style="color: #c7c7cc; font-size: 20px;">›</div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #e5e5ea;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 17px; color: #000;">
            <div style="width: 29px; height: 29px; border-radius: 7px; background: #34c759; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">📶</div> 蜂窝网络
          </div>
          <div style="color: #c7c7cc; font-size: 20px;">›</div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 17px; color: #000;">
            <div style="width: 29px; height: 29px; border-radius: 7px; background: #007aff; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">🌐</div> Wi-Fi
          </div>
          <div style="color: #c7c7cc; font-size: 20px;">›</div>
        </div>
      </div>
      <div style="background: white; border-radius: 10px; padding: 0 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #e5e5ea;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 17px; color: #000;">
            <div style="width: 29px; height: 29px; border-radius: 7px; background: #ff3b30; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">🔔</div> 通知
          </div>
          <div style="color: #c7c7cc; font-size: 20px;">›</

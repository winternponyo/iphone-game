function updateTime() {
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const t = `${h}:${m}`;
  document.getElementById('statusTime').textContent = t;
  const lockTime = document.querySelector('.lock-time');
  if (lockTime) lockTime.textContent = t;
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
    showPasscode(); // 
  } else {
    lockScreen.style.transform = '';
  }
});

lockScreen.addEventListener('mousedown', e => { startY = e.clientY; });
lockScreen.addEventListener('mouseup', e => {
  if (e.clientY - startY < -100) showPasscode(); // 
});
// 鼠标拖拽也支持（方便电脑调试）
lockScreen.addEventListener('mousedown', e => { startY = e.clientY; });
lockScreen.addEventListener('mouseup', e => {
  if (e.clientY - startY < -100) lockScreen.classList.add('unlocked');
});

// App 打开/关闭
const appView = document.getElementById('appView');
const appTitle = document.getElementById('appTitle');
const appContent = document.getElementById('appContent');

const appData = {
  '相册': '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px">' +
          ['🌄','🏙️','🌊','🌸','🐱','🍜'].map(e =>
          `<div style="aspect-ratio:1;background:#ddd;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:28px">${e}</div>`).join('') + '</div>',
  '天气': '<div style="text-align:center;padding-top:40px"><div style="font-size:64px">☀️</div><div style="font-size:48px;font-weight:200">18°</div><div style="color:#666">首尔 · 大部晴朗</div><div style="margin-top:20px;color:#999">最高21° 最低12°</div></div>',
  '备忘录': '<div style="font-size:15px;line-height:1.8"><b>이소희的生日 <img src="icon/cake.png" alt="蛋糕" style="width: 16px; height: 16px; vertical-align: middle; margin: 0 2px;"> </b><br>11月21日 · 35天后<br><br>记得提前准备礼物。</div>',
  '设置': '<div style="font-size:15px;line-height:2.4">📶 蜂窝网络<br>📡 Wi-Fi<br>🔔 通知<br>🔒 隐私与安全</div>',
  '电话': '<div style="font-size:15px;line-height:2.2">📞 妈妈 · 昨天<br>📞 小李 · 星期二<br>📞 快递 · 10月14日</div>',
  'Safari': '<div style="text-align:center;padding-top:60px;color:#999">🌐<br>输入网址开始浏览</div>',
  '音乐': '<div style="text-align:center;padding-top:40px"><div style="font-size:60px">🎵</div><div style="margin-top:12px">暂无播放</div></div>'
};

function openApp(name) {
  appTitle.textContent = name;
  appContent.innerHTML = appData[name] || '这个 App 还没做。';
  appView.classList.add('show');
}
function closeApp() {
  appView.classList.remove('show');
}
const notif = document.getElementById('notification');
setTimeout(() => notif.classList.add('show'), 3000);
notif.addEventListener('click', () => {
  notif.classList.remove('show');
  openApp('备忘录');
});
// ===== 密碼解鎖邏輯 =====
let currentPass = '';
const correctPass = '1234'; // 👈 你可以在這裡改密碼

function showPasscode() {
  const passScreen = document.getElementById('passcodeScreen');
  const lockScreen = document.getElementById('lockScreen');
  
  // 動畫：鎖屏滑走
  lockScreen.classList.add('unlocked');
  
  // 顯示密碼鍵盤
  passScreen.classList.add('show');
  resetDots();
}

function enterPass(num) {
  if (currentPass.length < 4) {
    currentPass += num;
    updateDots();
    
    // 輸滿 4 位就檢查
    if (currentPass.length === 4) {
      setTimeout(checkPass, 200); // 延遲少少，等最後一粒點填滿先檢查
    }
  }
}

function deletePass() {
  if (currentPass.length > 0) {
    currentPass = currentPass.slice(0, -1);
    updateDots();
  }
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index < currentPass.length) {
      dot.classList.add('filled');
    } else {
      dot.classList.remove('filled');
    }
  });
}

function resetDots() {
  currentPass = '';
  updateDots();
}

function checkPass() {
  if (currentPass === correctPass) {
    // 密碼正確：隱藏鍵盤，進入桌面
    document.getElementById('passcodeScreen').classList.remove('show');
    // 如果之前有通知，可以喺呢度觸發
    setTimeout(() => document.getElementById('notification').classList.add('show'), 2000);
  } else {
    // 密碼錯誤：震動動畫
    const dotsContainer = document.querySelector('.passcode-dots');
    dotsContainer.style.transform = 'translateX(-10px)';
    setTimeout(() => dotsContainer.style.transform = 'translateX(10px)', 50);
    setTimeout(() => dotsContainer.style.transform = 'translateX(-10px)', 100);
    setTimeout(() => dotsContainer.style.transform = 'translateX(10px)', 150);
    setTimeout(() => {
      dotsContainer.style.transform = 'translateX(0)';
      resetDots(); // 清空重新輸入
    }, 200);
  }
}
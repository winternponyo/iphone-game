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
  '天气': '<div style="text-align:center;padding-top:40px"><img src="icon/emoji/sun.png" alt="太阳" style="width:80px; height:80px; object-fit:contain;"><div style="font-size:48px;font-weight:200; margin-top:10px;">18°</div><div style="color:#666">首尔 · 大部晴朗</div><div style="margin-top:20px;color:#999">最高21° 最低12°</div></div>',
  '备忘录': '<div style="font-size:15px;line-height:1.8"><b>她的生日 <img src="icon/emoji/cake.png" style="width:18px; height:18px; vertical-align:middle;"> </b><br>11月21日 · 35天后<br><br>记得提前准备礼物。</div>',
  '设置': `
    <div style="background: #f2f2f7; height: 100%; margin: -20px; padding: 20px 16px; border-radius: 10px;">
      
      <!-- 個人資料卡 -->
      <div style="background: white; border-radius: 10px; padding: 12px; display: flex; align-items: center; gap: 15px; margin-bottom: 25px;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: #ccc; display: flex; align-items: center; justify-content: center; font-size: 30px;">👤</div>
        <div>
          <div style="font-size: 20px; font-weight: 500; color: #000;">Wonbin</div>
          <div style="font-size: 13px; color: #888; margin-top: 4px;">Apple ID、iCloud、媒体与购买项目</div>
        </div>
      </div>

      <!-- 列表項目 -->
      <div style="background: white; border-radius: 10px; padding: 0 16px; margin-bottom: 25px;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #eee;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 16px; color: #000;"><img src="icon/emoji/antenna.png" style="width: 28px; height: 28px; border-radius: 6px; background: #007aff; padding: 4px;"> 飞行模式</div>
          <div style="color: #ccc;">›</div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #eee;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 16px; color: #000;"><img src="icon/emoji/signal.png" style="width: 28px; height: 28px; border-radius: 6px; background: #34c759; padding: 4px;"> 蜂窝网络</div>
          <div style="color: #ccc;">›</div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 16px; color: #000;"><img src="icon/emoji/global.png" style="width: 28px; height: 28px; border-radius: 6px; background: #007aff; padding: 4px;"> Wi-Fi</div>
          <div style="color: #ccc;">›</div>
        </div>
      </div>

      <!-- 第二個列表 -->
      <div style="background: white; border-radius: 10px; padding: 0 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #eee;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 16px; color: #000;"><img src="icon/emoji/bell.png" style="width: 28px; height: 28px; border-radius: 6px; background: #ff3b30; padding: 4px;"> 通知</div>
          <div style="color: #ccc;">›</div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 16px; color: #000;"><img src="icon/emoji/lock.png" style="width: 28px; height: 28px; border-radius: 6px; background: #8e8e93; padding: 4px;"> 隐私与安全</div>
          <div style="color: #ccc;">›</div>
        </div>
      </div>
      
    </div>
  `,
  '电话': `
    <div style="background: #f2f2f7; height: 100%; margin: -20px; padding-top: 10px;">
      
      <!-- 頂部標題同編輯按鈕 -->
      <div style="display: flex; justify-content: space-between; padding: 0 16px; margin-bottom: 10px;">
        <div style="font-size: 34px; font-weight: bold; color: #000;">最近通话</div>
        <div style="color: #007aff; font-size: 17px; margin-top: 12px;">编辑</div>
      </div>

      <!-- 通話記錄列表 -->
      <div style="background: white; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">
        
        <!-- 記錄 1 (未接來電) -->
        <div style="display: flex; align-items: center; padding: 12px 16px; border-bottom: 1px solid #eee;">
          <div style="color: #ff3b30; font-size: 20px; margin-right: 12px;">↙</div>
          <div style="flex: 1;">
            <div style="font-size: 17px; color: #000;">妈妈</div>
            <div style="font-size: 14px; color: #888;">手机 · 昨天</div>
          </div>
          <div style="color: #007aff; font-size: 24px;">ⓘ</div>
        </div>

        <!-- 記錄 2 (已接來電) -->
        <div style="display: flex; align-items: center; padding: 12px 16px; border-bottom: 1px solid #eee;">
          <div style="color: #888; font-size: 20px; margin-right: 12px;">↙</div>
          <div style="flex: 1;">
            <div style="font-size: 17px; color: #000;">小李</div>
            <div style="font-size: 14px; color: #888;">手机 · 星期二</div>
          </div>
          <div style="color: #007aff; font-size: 24px;">ⓘ</div>
        </div>

        <!-- 記錄 3 (已撥出) -->
        <div style="display: flex; align-items: center; padding: 12px 16px;">
          <div style="color: #888; font-size: 20px; margin-right: 12px;">↗</div>
          <div style="flex: 1;">
            <div style="font-size: 17px; color: #000;">快递员</div>
            <div style="font-size: 14px; color: #888;">手机 · 10月14日</div>
          </div>
          <div style="color: #007aff; font-size: 24px;">ⓘ</div>
        </div>

      </div>

      <!-- 底部 Tab Bar (模擬) -->
      <div style="position: absolute; bottom: 30px; left: 0; right: 0; display: flex; justify-content: space-around; background: rgba(255,255,255,0.9); backdrop-filter: blur(20px); border-top: 1px solid #ddd; padding: 10px 0 20px 0;">
        <div style="text-align: center; color: #007aff; font-size: 12px;">
          <div style="font-size: 24px; margin-bottom: 2px;">🕒</div>最近通话
        </div>
        <div style="text-align: center; color: #888; font-size: 12px;">
          <div style="font-size: 24px; margin-bottom: 2px;">👤</div>个人收藏
        </div>
        <div style="text-align: center; color: #888; font-size: 12px;">
          <div style="font-size: 24px; margin-bottom: 2px;">⌨️</div>拨号键盘
        </div>
        <div style="text-align: center; color: #888; font-size: 12px;">
          <div style="font-size: 24px; margin-bottom: 2px;">📞</div>语音留言
        </div>
      </div>

    </div>
  `,
  'Safari': '<div style="text-align:center;padding-top:40px;color:#666"><img src="icon/emoji/global.png" style="width:60px; height:60px; object-fit:contain; margin-bottom:10px;"><br>输入网址开始浏览</div>',
  '音乐': '<div style="text-align:center;padding-top:40px"><img src="icon/emoji/musicnote.png" style="width:80px; height:80px; object-fit:contain; margin-bottom:10px;"><br><div style="margin-top:12px; color:#666;">暂无播放</div></div>'
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
const correctPass = '0528'; // 👈 你可以在這裡改密碼

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

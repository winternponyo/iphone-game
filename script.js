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
  '相册': '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px">' +
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
          <div style="color: #c7c7cc; font-size: 20px;">›</div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 0;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 17px; color: #000;">
            <div style="width: 29px; height: 29px; border-radius: 7px; background: #8e8e93; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">🔒</div> 隐私与安全
          </div>
          <div style="color: #c7c7cc; font-size: 20px;">›</div>
        </div>
      </div>
    </div>
  `,

  '电话': `
    <div style="background: #f2f2f7; height: 100%; padding-top: 10px;">
      <div style="display: flex; justify-content: space-between; padding: 0 16px; margin-bottom: 10px;">
        <div style="font-size: 34px; font-weight: bold; color: #000;">最近通话</div>
        <div style="color: #007aff; font-size: 17px; margin-top: 12px;">编辑</div>
      </div>
      <div style="background: white; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">
        <div style="display: flex; align-items: center; padding: 12px 16px; border-bottom: 1px solid #eee;">
          <div style="color: #ff3b30; font-size: 20px; margin-right: 12px;">↙</div>
          <div style="flex: 1;">
            <div style="font-size: 17px; color: #000;">妈妈</div>
            <div style="font-size: 14px; color: #888;">手机 · 昨天</div>
          </div>
          <div style="color: #007aff; font-size: 24px;">ⓘ</div>
        </div>
        <div style="display: flex; align-items: center; padding: 12px 16px; border-bottom: 1px solid #eee;">
          <div style="color: #888; font-size: 20px; margin-right: 12px;">↙</div>
          <div style="flex: 1;">
            <div style="font-size: 17px; color: #000;">小李</div>
            <div style="font-size: 14px; color: #888;">手机 · 星期二</div>
          </div>
          <div style="color: #007aff; font-size: 24px;">ⓘ</div>
        </div>
        <div style="display: flex; align-items: center; padding: 12px 16px;">
          <div style="color: #888; font-size: 20px; margin-right: 12px;">↗</div>
          <div style="flex: 1;">
            <div style="font-size: 17px; color: #000;">快递员</div>
            <div style="font-size: 14px; color: #888;">手机 · 10月14日</div>
          </div>
          <div style="color: #007aff; font-size: 24px;">ⓘ</div>
        </div>
      </div>
      <div style="position: absolute; bottom: 30px; left: 0; right: 0; display: flex; justify-content: space-around; background: rgba(255,255,255,0.9); backdrop-filter: blur(20px); border-top: 1px solid #ddd; padding: 10px 0 20px 0;">
        <div style="text-align: center; color: #007aff; font-size: 12px;"><div style="font-size: 24px; margin-bottom: 2px;">🕒</div>最近通话</div>
        <div style="text-align: center; color: #888; font-size: 12px;"><div style="font-size: 24px; margin-bottom: 2px;">👤</div>个人收藏</div>
        <div style="text-align: center; color: #888; font-size: 12px;"><div style="font-size: 24px; margin-bottom: 2px;">⌨️</div>拨号键盘</div>
        <div style="text-align: center; color: #888; font-size: 12px;"><div style="font-size: 24px; margin-bottom: 2px;">📞</div>语音留言</div>
      </div>
    </div>
  `,

  'Safari': `
    <div style="display: flex; flex-direction: column; height: 100%; background: #f2f2f7;">
      <!-- 頂部網址欄 -->
      <div style="padding: 10px; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); border-bottom: 1px solid #ddd; display: flex; gap: 10px; align-items: center; z-index: 10;">
        <input type="text" id="safariUrl" value="https://m.baidu.com/" placeholder="搜尋或輸入網址" style="flex:1; padding: 8px; border-radius: 10px; border: none; background: #e5e5ea; font-size:14px; text-align:center; outline:none;">
        <button onclick="loadSafari()" style="border:none; background:none; color:#007aff; font-size:16px; cursor:pointer;">前往</button>
      </div>
      <!-- 內嵌網頁 -->
      <div style="flex: 1; background: #fff;">
        <iframe id="safariFrame" src="https://m.baidu.com/" style="width:100%; height:100%; border:none;"></iframe>
      </div>
    </div>
  `,
  
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
const correctPass = '0528';

function showPasscode() {
  const passScreen = document.getElementById('passcodeScreen');
  const lockScreen = document.getElementById('lockScreen');
  lockScreen.classList.add('unlocked');
  passScreen.classList.add('show');
  resetDots();
}

function enterPass(num) {
  if (currentPass.length < 4) {
    currentPass += num;
    updateDots();
    if (currentPass.length === 4) setTimeout(checkPass, 200);
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
    if (index < currentPass.length) dot.classList.add('filled');
    else dot.classList.remove('filled');
  });
}
function resetDots() {
  currentPass = '';
  updateDots();
}
function checkPass() {
  if (currentPass === correctPass) {
    document.getElementById('passcodeScreen').classList.remove('show');
    setTimeout(() => document.getElementById('notification').classList.add('show'), 2000);
  } else {
    const dotsContainer = document.querySelector('.passcode-dots');
    dotsContainer.style.transform = 'translateX(-10px)';
    setTimeout(() => dotsContainer.style.transform = 'translateX(10px)', 50);
    setTimeout(() => dotsContainer.style.transform = 'translateX(-10px)', 100);
    setTimeout(() => dotsContainer.style.transform = 'translateX(10px)', 150);
    setTimeout(() => {
      dotsContainer.style.transform = 'translateX(0)';
      resetDots();
    }, 200);
  }
}

// ===== 動態日夜背景 =====
function updateBatteryAndBg() {
  const now = new Date();
  const h = now.getHours();
  const screen = document.querySelector('.screen');
  if (h >= 6 && h < 18) {
    screen.style.background = 'linear-gradient(160deg, #2b5876 0%, #4e4376 100%)';
  } else {
    screen.style.background = 'linear-gradient(160deg, #1c1c3a 0%, #3a2b5c 40%, #6b4c7a 70%, #b76e79 100%)';
  }
}
updateBatteryAndBg();

// ===== 控制中心邏輯 =====
const controlCenter = document.getElementById('controlCenter');
const screenEl = document.querySelector('.screen');

// 監聽整個螢幕嘅觸控
screenEl.addEventListener('touchstart', e => {
  // 確保係由頂部下拉 (螢幕最頂 80px 內)
  if (e.touches[0].clientY < 80) {
    ccStartY = e.touches[0].clientY;
    isCCDragging = true;
  }
});

screenEl.addEventListener('touchmove', e => {
  if (isCCDragging) {
    const dy = e.touches[0].clientY - ccStartY;
    if (dy > 0) {
      // 可以喺度加實時拖拽效果，但為咗簡單，我哋靠 touchend 判斷
    }
  }
});

screenEl.addEventListener('touchend', e => {
  if (isCCDragging) {
    const endY = e.changedTouches[0].clientY;
    // 如果向下拉超過 100px
    if (endY - ccStartY > 100) {
      controlCenter.classList.add('show');
    }
    isCCDragging = false;
  }
});
// ===== WeChat 邏輯 =====
let currentChatUser = '';

function openWeChat() {
  appTitle.textContent = 'WeChat';
  // 顯示返回按鈕，並設定點擊後的行為（返主屏幕）
  document.querySelector('.app-header button').onclick = function() { closeApp(); };
  
  // 渲染聊天列表
  appContent.innerHTML = `
    <div style="background: #ededed; height: 100%;">
      <div class="wechat-list-item" onclick="openChat('妈妈')">
        <div class="wechat-avatar" style="background: #ffb6c1;">👩</div>
        <div class="wechat-info">
          <div class="wechat-name"><span>妈妈</span> <span style="font-size:12px; color:#999;">昨天</span></div>
          <div class="wechat-msg">今晚回来吃饭？</div>
        </div>
      </div>
      <div class="wechat-list-item" onclick="openChat('小咪')">
        <div class="wechat-avatar" style="background: #87ceeb;">😼</div>
        <div class="wechat-info">
          <div class="wechat-name"><span>小咪</span> <span style="font-size:12px; color:#999;">10:30</span></div>
          <div class="wechat-msg">在哪？</div>
        </div>
      </div>
      <div class="wechat-list-item" onclick="openChat('快递员')">
        <div class="wechat-avatar" style="background: #f0e68c;">📦</div>
        <div class="wechat-info">
          <div class="wechat-name"><span>快递员</span> <span style="font-size:12px; color:#999;">星期一</span></div>
          <div class="wechat-msg">林先生，你的包裹到了，给您放门口了。</div>
        </div>
      </div>
    </div>
  `;
  appView.classList.add('show');
}

function openChat(user) {
  currentChatUser = user;
  appTitle.textContent = user;
  
  // 修改返回按鈕行為：由聊天室退返去聊天列表
  document.querySelector('.app-header button').onclick = function() { openWeChat(); };

  // 根據唔同人設定初始對話 (完全跟足你嘅設定)
  let initialMsg = '早';
  if (user === '妈妈') initialMsg = '今晚回来吃饭？';
  if (user === '小咪') initialMsg = '在哪？';
  if (user === '快递员') initialMsg = '林先生，你的包裹到了，给您放门口了。';

  appContent.innerHTML = `
    <div class="wechat-chat-bg">
      <div class="wechat-msg-container" id="chatContainer">
        <!-- 初始對話 -->
        <div class="wechat-bubble left">${initialMsg}</div>
      </div>
      <div class="wechat-input-area">
        <input type="text" class="wechat-input" id="chatInput" placeholder="输入讯息..." onkeypress="handleEnter(event)">
        <button class="wechat-send-btn" onclick="sendMessage()">发送</button>
      </div>
    </div>
  `;
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  const container = document.getElementById('chatContainer');

  // 加入自己嘅訊息（右邊綠色氣泡）
  container.innerHTML += `<div class="wechat-bubble right">${text}</div>`;
  input.value = '';
  container.scrollTop = container.scrollHeight;

  // 模擬對方自動回覆 (配合你設定嘅角色)
  setTimeout(() => {
    let reply = '';
    
    if (currentChatUser === '妈妈') {
      const replies = ['我做了你喜欢吃的菜，快回来吧', '还没下班吗？', '好，那我留饭给你。'];
      reply = replies[Math.floor(Math.random() * replies.length)];
    } 
    else if (currentChatUser === '小咪') {
      const replies = ['我也，快下班了！ ', '忙着呢，一会再说', '什么时候？ '];
      reply = replies[Math.floor(Math.random() * replies.length)];
    } 
    else if (currentChatUser === '快递员') {
      const replies = ['好的，麻烦了！ ', '收到，我回去拿。 ', '谢谢！ '];
      reply = replies[Math.floor(Math.random() * replies.length)];
    } 
    else {
      reply = '收到！';
    }

    container.innerHTML += `<div class="wechat-bubble left">${reply}</div>`;
    container.scrollTop = container.scrollHeight;
  }, 1000); // 1秒後回覆
}

function handleEnter(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
}

function loadSafari() {
  const url = document.getElementById('safariUrl').value;
  document.getElementById('safariFrame').src = url;
}

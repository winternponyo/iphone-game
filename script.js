function updateTime() {
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const t = `${h}:${m}`;
  document.getElementById('statusTime').textContent = t;
  const lockTime = document.querySelector('.lock-time');
  if (lockTime) lockTime.textContent = t;
  
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

// 上滑解鎖 (強制修復版)
const lockScreen = document.getElementById('lockScreen');
let startY = 0;
let isDragging = false;

lockScreen.addEventListener('touchstart', e => {
  startY = e.touches[0].clientY;
  isDragging = true;
  // 確保 Safari 唔會搶咗個觸控
  lockScreen.style.transition = 'none'; 
}, { passive: false });

lockScreen.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const dy = e.touches[0].clientY - startY;
  if (dy < 0) {
    // 跟住手指移動
    lockScreen.style.transform = `translateY(${dy}px)`;
  }
}, { passive: false });

lockScreen.addEventListener('touchend', e => {
  if (!isDragging) return;
  const dy = e.changedTouches[0].clientY - startY;
  
  // 只要向上掃超過 30px 就當解鎖 (之前係 100px 太難掃)
  if (dy < -30) {
    showPasscode(); 
  } else {
    // 掃得唔夠高，彈返去原位
    lockScreen.style.transition = 'transform 0.3s ease';
    lockScreen.style.transform = 'translateY(0)';
  }
  isDragging = false;
});

// 滑鼠拖拽 (電腦測試用)
lockScreen.addEventListener('mousedown', e => { startY = e.clientY; isDragging = true; lockScreen.style.transition = 'none'; });
lockScreen.addEventListener('mouseup', e => {
  if (isDragging && e.clientY - startY < -30) {
    showPasscode();
  } else {
    lockScreen.style.transition = 'transform 0.3s ease';
    lockScreen.style.transform = 'translateY(0)';
  }
  isDragging = false;
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

  'Safari': '<div style="text-align:center;padding-top:40px;color:#666"><img src="icon/emoji/global.png" style="width:60px; height:60px; object-fit:contain; margin-bottom:10px;"><br>输入网址开始浏览</div>',
  
  '音乐': '<div style="text-align:center;padding-top:40px"><img src="icon/emoji/musicnote.png" style="width:80px; height:80px; object-fit:contain; margin-bottom:10px;"><br><div style="margin-top:12px; color:#666;">暂无播放</div></div>'
};

function openApp(name) {
  appTitle.textContent = name;
  appContent.innerHTML = appData[name] || '这个 App 还没做。';
  appView.classList.add('show');
  document.querySelector('.app-header button').onclick = function() { closeApp(); };
}
function closeApp() {
  appView.classList.remove('show');
}

// ====== WeChat 邏輯 (已改簡體) ======
let currentChatUser = '';

function openWeChat() {
  appTitle.textContent = '微信';
  document.querySelector('.app-header button').onclick = function() { closeApp(); };
  
  appContent.innerHTML = `
    <div class="wechat-bg">
      <!-- 微信頂部 -->
      <div class="wechat-header">
        <div class="wechat-header-title">微信(3)</div>
        <div class="wechat-header-icons">
          <span>🔍</span>
          <span>+</span>
        </div>
      </div>
      <div class="wechat-search">🔍 搜索</div>
      
function openWeChat() {
  appTitle.textContent = '微信';
  document.querySelector('.app-header button').onclick = function() { closeApp(); };
  
  appContent.innerHTML = `
    <div class="wechat-bg">
      <!-- 微信頂部 -->
      <div class="wechat-header">
        <div class="wechat-header-title">微信(3)</div>
        <div class="wechat-header-icons">
          <span>🔍</span>
          <span>+</span>
        </div>
      </div>
      <div class="wechat-search">🔍 搜索</div>
      
      <!-- 聊天列表 -->
      <div style="flex:1; overflow-y:auto;">
        <!-- 寶寶 (置頂) -->
        <div class="wechat-list-item pinned" onclick="openChat('小昱')">
          <div class="wechat-avatar" style="background: #87ceeb;">👧</div>
          <div class="wechat-info">
            <div class="wechat-name"><span>小昱</span> <span style="font-size:12px; color:#999;">上午 10:30</span></div>
            <div class="wechat-msg">在哪？</div>
          </div>
        </div>
        
        <!-- 媽媽 -->
        <div class="wechat-list-item" onclick="openChat('妈妈')">
          <div class="wechat-avatar" style="background: #ffb6c1;">👩</div>
          <div class="wechat-info">
            <div class="wechat-name"><span>妈妈</span> <span style="font-size:12px; color:#999;">昨天</span></div>
            <div class="wechat-msg">乖仔，今晚回不回家吃饭？</div>
          </div>
        </div>
        
        <!-- 快遞員 -->
        <div class="wechat-list-item" onclick="openChat('快递员')">
          <div class="wechat-avatar" style="background: #f0e68c;">📦</div>
          <div class="wechat-info">
            <div class="wechat-name"><span>顺丰快递</span> <span style="font-size:12px; color:#999;">星期一</span></div>
            <div class="wechat-msg">林先生，您的包裹已放至门口。</div>
          </div>
        </div>
      </div>
    </div>
  `;
  appView.classList.add('show');
}

function openChat(user) {
  currentChatUser = user;
  appTitle.textContent = user;
  document.querySelector('.app-header button').onclick = function() { openWeChat(); };

  let initialMsg = '早';
  if (user === '妈妈') initialMsg = '乖仔，今晚回不回家吃饭？';
  if (user === '小昱') initialMsg = '在哪？';
  if (user === '快递员') initialMsg = '林先生，您的包裹到了，给您放门口了。';

  appContent.innerHTML = `
    <div class="wechat-chat-bg">
      <div class="wechat-msg-container" id="chatContainer">
        <div class="wechat-bubble left">${initialMsg}</div>
      </div>
      <div class="wechat-input-area">
        <input type="text" class="wechat-input" id="chatInput" placeholder="输入..." onkeypress="handleEnter(event)">
        <button class="wechat-send-btn" onclick="sendMessage()">发送</button>
      </div>
    </div>
  `;
}

// 自動回覆全面轉做普通話口語
function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  const container = document.getElementById('chatContainer');
  container.innerHTML += `<div class="wechat-bubble right">${text}</div>`;
  input.value = '';
  container.scrollTop = container.scrollHeight;

  setTimeout(() => {
    let reply = '';
    if (currentChatUser === '妈妈') {
      reply = ['我做了你爱吃的菜，快点回来。', '还没下班吗？', '好，那我给你留饭。'][Math.floor(Math.random() * 3)];
    } else if (currentChatUser === '小昱') {
      reply = ['我在公司呀，你呢？', '在忙，待会回你。', '你要不要过来找我？'][Math.floor(Math.random() * 3)];
    } else if (currentChatUser === '快递员') {
      reply = ['好的，谢谢！', '收到了，我回去的时候拿。', '麻烦了！'][Math.floor(Math.random() * 3)];
    } else {
      reply = '收到！';
    }
    container.innerHTML += `<div class="wechat-bubble left">${reply}</div>`;
    container.scrollTop = container.scrollHeight;
  }, 1000);
}

// ====== 密碼解鎖邏輯 ======
let currentPass = '';
const correctPass = '0528';

function showPasscode() {
  const passScreen = document.getElementById('passcodeScreen');
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
    // 已經刪除彈出備忘錄通知嘅代碼
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

// ====== 控制中心 ======
const controlCenter = document.getElementById('controlCenter');
const screenEl = document.querySelector('.screen');
let ccStartY = 0;
let isCCDragging = false;

screenEl.addEventListener('touchstart', e => {
  if (e.touches[0].clientY < 80) {
    ccStartY = e.touches[0].clientY;
    isCCDragging = true;
  }
}, { passive: false });

screenEl.addEventListener('touchend', e => {
  if (isCCDragging) {
    const endY = e.changedTouches[0].clientY;
    if (endY - ccStartY > 100) controlCenter.classList.add('show');
    isCCDragging = false;
  }
});

controlCenter.addEventListener('click', e => {
  if(e.target === controlCenter || e.target.classList.contains('cc-panel')) {
    controlCenter.classList.remove('show');
  }
});

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

// ====== 密碼解鎖邏輯 ======
let currentPass = '';
const correctPass = '0528';

function showPasscode() {
  const passScreen = document.getElementById('passcodeScreen');
  const lockScreen = document.getElementById('lockScreen');
  if(lockScreen) lockScreen.classList.add('unlocked');
  if(passScreen) passScreen.classList.add('show');
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

// App 打開/關閉
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
    <div style="background: #f2f2f7; height: 100%; padding: 20px 16px; font-family: -apple-system, sans-serif; margin: -20px;">
      <div style="font-size: 34px; font-weight: bold; color: #000; padding-top: 20px; margin-bottom: 10px;">设置</div>
      <div style="background: #e3e3e8; border-radius: 10px; padding: 8px 10px; display: flex; align-items: center; gap: 8px; color: #888; font-size: 17px; margin-bottom: 20px;">🔍 搜索</div>
      <div style="background: white; border-radius: 10px; padding: 12px 16px; display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: #f7b2c1; display: flex; align-items: center; justify-content: center; font-size: 22px; color: white; font-weight: 500;">KL</div>
        <div style="flex: 1;">
          <div style="font-size: 20px; color: #000;">Ka Wai Lam</div>
          <div style="font-size: 13px; color: #888; margin-top: 2px;">Apple ID、iCloud、媒体与购买项目</div>
        </div>
        <div style="color: #c7c7cc; font-size: 20px;">›</div>
      </div>
      <div style="background: white; border-radius: 10px; padding: 0 16px; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e5ea;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 17px; color: #000;"><div style="width: 29px; height: 29px; border-radius: 7px; background: #ff9500; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">✈️</div> 飞行模式</div>
          <div style="width: 40px; height: 24px; background: #e5e5ea; border-radius: 12px;"></div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e5ea;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 17px; color: #000;"><div style="width: 29px; height: 29px; border-radius: 7px; background: #007aff; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">📶</div> 无线局域网</div>
          <div style="color: #888; font-size: 17px;">Lam's_5G ›</div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e5ea;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 17px; color: #000;"><div style="width: 29px; height: 29px; border-radius: 7px; background: #007aff; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">📻</div> 蓝牙</div>
          <div style="color: #888; font-size: 17px;">未连接 ›</div>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0;">
          <div style="display: flex; align-items: center; gap: 12px; font-size: 17px; color: #000;"><div style="width: 29px; height: 29px; border-radius: 7px; background: #34c759; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">📱</div> 蜂窝网络</div>
          <div style="color: #c7c7cc; font-size: 20px;">›</div>
        </div>
      </div>
    </div>
  `,

  '电话': `
    <div style="background: #fff; height: 100%; padding: 10px 16px; margin: -20px; display: flex; flex-direction: column;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; margin-bottom: 15px;">
        <div style="color: #007aff; font-size: 17px;">编辑</div>
        <div style="background: #e5e5ea; border-radius: 8px; display: flex; padding: 2px;">
          <div style="background: #fff; padding: 4px 16px; border-radius: 6px; font-size: 14px; font-weight: 500; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">全部</div>
          <div style="padding: 4px 16px; border-radius: 6px; font-size: 14px; color: #333;">未接来电</div>
        </div>
      </div>
      <div style="font-size: 34px; font-weight: bold; margin-bottom: 10px;">最近通话</div>
      <div style="background: #e3e3e8; border-radius: 10px; padding: 8px 10px; display: flex; align-items: center; gap: 8px; color: #888; font-size: 17px; margin-bottom: 15px;">🔍 搜索</div>
      <div style="flex: 1; overflow-y: auto;">
        <div style="display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #ccc; display: flex; align-items: center; justify-content: center; font-size: 20px; color: white; margin-right: 12px;">👤</div>
          <div style="flex: 1;">
            <div style="font-size: 17px; color: #000;">妈咪</div>
            <div style="font-size: 13px; color: #888; margin-top: 2px;">↙ 手机</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 15px; color: #888;">晚上 8:40</div>
            <div style="color: #007aff; font-size: 18px; margin-top: 2px;">ⓘ</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #f7b2c1; display: flex; align-items: center; justify-content: center; font-size: 20px; color: white; margin-right: 12px;">M</div>
          <div style="flex: 1;">
            <div style="font-size: 17px; color: #000;">小昱(2)</div>
            <div style="font-size: 13px; color: #888; margin-top: 2px;">↙ 手机</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 15px; color: #888;">晚上 6:51</div>
            <div style="color: #007aff; font-size: 18px; margin-top: 2px;">ⓘ</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #ccc; display: flex; align-items: center; justify-content: center; font-size: 20px; color: white; margin-right: 12px;">👤</div>
          <div style="flex: 1;">
            <div style="font-size: 17px; color: #ff3b30;">139xxxxxxxx</div>
            <div style="font-size: 13px; color: #888; margin-top: 2px;">miss</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 15px; color: #888;">星期二</div>
            <div style="color: #007aff; font-size: 18px; margin-top: 2px;">ⓘ</div>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-around; padding: 10px 0 20px 0; background: #f9f9f9; border-top: 1px solid #ddd; margin: 0 -16px -10px -16px;">
        <div style="text-align: center; color: #888; font-size: 11px;"><div style="font-size: 22px; margin-bottom: 2px;">⭐</div>个人收藏</div>
        <div style="text-align: center; color: #007aff; font-size: 11px;"><div style="font-size: 22px; margin-bottom: 2px;">🕒</div>最近通话</div>
        <div style="text-align: center; color: #888; font-size: 11px;"><div style="font-size: 22px; margin-bottom: 2px;">👤</div>通讯录</div>
        <div style="text-align: center; color: #888; font-size: 11px;"><div style="font-size: 22px; margin-bottom: 2px;">⌨️</div>拨号键盘</div>
        <div style="text-align: center; color: #888; font-size: 11px;"><div style="font-size: 22px; margin-bottom: 2px;">📞</div>语音留言</div>
      </div>
    </div>
  `,

  'Safari': '<div style="text-align:center;padding-top:40px;color:#666"><img src="icon/emoji/global.png" style="width:60px; height:60px; object-fit:contain; margin-bottom:10px;"><br>输入网址开始浏览</div>',
  
  '音乐': '<div style="text-align:center;padding-top:100px;color:#888;"><div style="font-size:60px; margin-bottom:20px;">🎵</div><div style="font-size:16px; color:#000; font-weight:500; margin-bottom:10px;">告白气球</div><div style="font-size:14px; margin-bottom:20px;">周杰伦</div><button onclick="openMusic()" style="background:#ff3b30; color:white; border:none; padding:10px 20px; border-radius:20px; font-size:14px; cursor:pointer;">打开播放器</button></div>'
};

function openApp(name) {
  if (name === 'instagram') {
    document.getElementById('igCallScreen').classList.add('show');
    return;
  }
  
  appTitle.textContent = name;
  appContent.innerHTML = appData[name] || '这个 App 还没做。';
  appView.classList.add('show');
  document.querySelector('.app-header button').onclick = function() { closeApp(); };
}

function closeApp() {
  appView.classList.remove('show');
}

// ====== Instagram 視像通話邏輯 ======
function endIgCall() {
  document.getElementById('igCallScreen').classList.remove('show');
}

// ====== Apple Music 邏輯 ======
let isPlaying = false;
let progressInterval;

function openMusic() {
  appView.classList.remove('show');
  document.getElementById('amPlayer').classList.add('show');
}

function closeMusic() {
  document.getElementById('amPlayer').classList.remove('show');
  stopPlay();
}

function togglePlay() {
  const btn = document.getElementById('amPlayBtn');
  if (isPlaying) {
    stopPlay();
    btn.textContent = '▶️';
  } else {
    playMusic();
    btn.textContent = '⏸';
  }
}

function playMusic() {
  isPlaying = true;
  const progress = document.getElementById('amProgress');
  let width = parseFloat(progress.style.width) || 0;
  
  progressInterval = setInterval(() => {
    width += 0.5;
    if (width >= 100) {
      width = 0;
      isPlaying = false;
      document.getElementById('amPlayBtn').textContent = '▶️';
      clearInterval(progressInterval);
    }
    progress.style.width = width + '%';
  }, 1000);
}

function stopPlay() {
  isPlaying = false;
  clearInterval(progressInterval);
}

// ====== WeChat 邏輯 ======
let currentChatUser = '';

function openWeChat() {
  appTitle.textContent = '微信';
  document.querySelector('.app-header button').onclick = function() { closeApp(); };
  
  appContent.innerHTML = `
    <div class="wechat-bg">
      <div class="wechat-header">
        <div class="wechat-header-title">微信(3)</div>
        <div class="wechat-header-icons">
          <span>🔍</span>
          <span>＋</span>
        </div>
      </div>
      <div class="wechat-search">🔍 搜索</div>
      <div style="flex:1; overflow-y:auto;">
        <div class="wechat-list-item pinned" onclick="openChat('小昱')">
          <div class="wechat-avatar" style="background: #87ceeb;">😸</div>
          <div class="wechat-info">
            <div class="wechat-name"><span>小昱</span> <span style="font-size:12px; color:#999;">上午 10:30</span></div>
            <div class="wechat-msg">在干嘛？</div>
          </div>
        </div>
        <div class="wechat-list-item" onclick="openChat('妈妈')">
          <div class="wechat-avatar" style="background: #ffb6c1;">👩</div>
          <div class="wechat-info">
            <div class="wechat-name"><span>妈妈</span> <span style="font-size:12px; color:#999;">昨天</span></div>
            <div class="wechat-msg">乖仔，今晚回不回家吃饭？</div>
          </div>
        </div>
        <div class="wechat-list-item" onclick="openChat('小黎')">
          <div class="wechat-avatar" style="background: #34c759; color: white;">🧑‍💻</div>
          <div class="wechat-info">
            <div class="wechat-name"><span>小黎</span> <span style="font-size:12px; color:#999;">下午 2:15</span></div>
            <div class="wechat-msg">远哥，我们坐下午3点半那班飞机可以吗？</div>
          </div>
        </div>
        <div class="wechat-list-item" onclick="openChat('周末去哪玩')">
          <div class="wechat-avatar" style="background: #ccc; overflow:hidden;">
            <div style="display:grid; grid-template-columns:1fr 1fr; width:100%; height:100%;">
               <img src="icon/emoji/sun.png" style="width:100%; height:100%; object-fit:cover;">
               <img src="icon/emoji/cake.png" style="width:100%; height:100%; object-fit:cover;">
               <img src="icon/emoji/lock.png" style="width:100%; height:100%; object-fit:cover;">
               <img src="icon/emoji/bell.png" style="width:100%; height:100%; object-fit:cover;">
            </div>
          </div>
          <div class="wechat-info">	
            <div class="wechat-name"><span>周末去哪玩</span> <span style="font-size:12px; color:#999;">下午 11:01</span></div>
            <div class="wechat-msg">小昱: 大家记得带身份证</div>
          </div>
        </div>
        <div class="wechat-list-item" onclick="openChat('官方帐号')">
          <div class="wechat-avatar" style="background: #007aff; color:white; border-radius:50%;">🌐</div>
          <div class="wechat-info">
            <div class="wechat-name"><span>官方帐号</span> <span style="font-size:12px; color:#999;">下午 10:08</span></div>
            <div class="wechat-msg">[3 则] 深圳本地宝: 深圳7场演唱会审批通过！</div>
          </div>
        </div>
        <div class="wechat-list-item" onclick="openChat('文件传输助手')">
          <div class="wechat-avatar" style="background: #07c160; color:white;">📁</div>
          <div class="wechat-info">
            <div class="wechat-name"><span>文件传输助手</span> <span style="font-size:12px; color:#999;">下午 5:20</span></div>
            <div class="wechat-msg">https://winterponyo.github.io/iphone-game/</div>
          </div>
        </div>
      </div>
      <div style="display: flex; justify-content: space-around; padding: 10px 0 20px 0; background: #f9f9f9; border-top: 1px solid #ddd;">
        <div style="text-align: center; color: #07c160; font-size: 11px;"><div style="font-size: 22px; margin-bottom: 2px;">💬</div>微信</div>
        <div style="text-align: center; color: #888; font-size: 11px;"><div style="font-size: 22px; margin-bottom: 2px;">👤</div>通讯录</div>
        <div style="text-align: center; color: #888; font-size: 11px;"><div style="font-size: 22px; margin-bottom: 2px;">🧭</div>发现</div>
        <div style="text-align: center; color: #888; font-size: 11px;"><div style="font-size: 22px; margin-bottom: 2px;">👤</div>我</div>
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
  if (user === '小昱') initialMsg = '在干嘛？';
  if (user === '小黎') initialMsg = '远哥，我们坐下午3点半那班飞机可以吗？';
  if (user === '周末去哪玩') initialMsg = '小昱: 大家记得带身份证';

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

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  const container = document.getElementById('chatContainer');
  container.innerHTML += `<div class="wechat-bubble right">${text}</div>`;
  input.value = '';
  container.scrollTop = container.scrollHeight;

  setTimeout(() => {
    let reply = '收到！';
    if (currentChatUser === '妈妈') reply = '好，那我给你留饭。';
    if (currentChatUser === '小昱') reply = '我也在练球';
    container.innerHTML += `<div class="wechat-bubble left">${reply}</div>`;
    container.scrollTop = container.scrollHeight;
  }, 1000);
}

function handleEnter(e) {
  if (e.key === 'Enter') sendMessage();
}
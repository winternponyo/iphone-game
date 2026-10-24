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

  const startDate = new Date('2022-10-31'); 
  const diff = now - startDate;
  const daysTogether = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  const wDays = document.getElementById('togetherDays');
  if(wDays) wDays.textContent = daysTogether;
}
updateTime();
setInterval(updateTime, 1000);

// ====== 密碼解鎖邏輯 ======
let currentPass = '';
const correctPass = '0528';

function showPasscode() {
  const passScreen = document.getElementById('passcodeScreen');
  const lockScreen = document.getElementById('lockScreen');
  const homeScreen = document.getElementById('homeScreen');
  
  if(lockScreen) lockScreen.classList.add('unlocked');
  if(passScreen) passScreen.classList.add('show');
  if(homeScreen) homeScreen.classList.add('dim'); 
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
    const homeScreen = document.getElementById('homeScreen');
    if(homeScreen) homeScreen.classList.remove('dim'); 
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

function cancelPasscode() {
  if (currentPass.length > 0) {
    deletePass();
  } else {
    const passScreen = document.getElementById('passcodeScreen');
    const lockScreen = document.getElementById('lockScreen');
    const homeScreen = document.getElementById('homeScreen');
    
    passScreen.classList.remove('show');
    lockScreen.classList.remove('unlocked');
    setTimeout(() => {
      if(homeScreen) homeScreen.classList.remove('dim');
    }, 300); 
    resetDots();
  }
}

// App 打開/關閉
const appView = document.getElementById('appView');
const appTitle = document.getElementById('appTitle');
const appContent = document.getElementById('appContent');

const appData = {
  '相册': `
    <div style="background: #fff; height: 100%; margin: -20px; padding: 10px;">
      <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px; padding-left: 10px;">相簿</div>
      <div onclick="alert('需要 Face ID 驗證... 驗證成功！\\n（裡面全是圓圓滿滿的結婚證和神圖）')" style="background: #f2f2f7; border-radius: 10px; padding: 15px; margin-bottom: 15px; display: flex; align-items: center; gap: 15px; cursor: pointer;">
        <div style="font-size: 24px;">🔒</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 500;">已隱藏</div>
          <div style="font-size: 12px; color: #888;">1 个项目</div>
        </div>
        <div style="color: #c7c7cc; font-size: 20px;">›</div>
      </div>
      <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px; padding-left: 10px;">最近项目</div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px;">
        <div style="aspect-ratio: 1; background: #e5e5ea; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 35px;">🏓</div>
        <div style="aspect-ratio: 1; background: #e5e5ea; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 35px;">🏆</div>
        <div style="aspect-ratio: 1; background: #e5e5ea; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 35px;">🇨🇳</div>
        <div style="aspect-ratio: 1; background: #e5e5ea; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 35px;">🫶</div>
        <div style="aspect-ratio: 1; background: #e5e5ea; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 35px;">🎤</div>
        <div style="aspect-ratio: 1; background: #e5e5ea; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 35px;">🛫</div>
      </div>
    </div>
  `,
  
  '天气': '<div style="text-align:center;padding-top:40px"><img src="icon/emoji/sun.png" alt="太阳" style="width:80px; height:80px; object-fit:contain;"><div style="font-size:48px;font-weight:200; margin-top:10px;">18°</div><div style="color:#666">首尔 · 大部晴朗</div><div style="margin-top:20px;color:#999">最高21° 最低12°</div></div>',
  
  '备忘录': `
    <div style="background: #f2f2f7; height: 100%; margin: -20px; padding: 20px 16px; font-family: -apple-system;">
      <div style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <div style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 10px;">追星待办清单 🏓</div>
        <div style="font-size: 15px; line-height: 2;">
          <div>☑️ 抢法兰克福冠军赛门票</div>
          <div>☑️ 买双人同款手链</div>
          <div>☐ 给超话打榜做数据</div>
          <div>☐ 准备线下应援物（手幅、透扇）</div>
        </div>
      </div>
      <div style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
          <div style="font-size: 16px; font-weight: bold; color: #000;">10月22日 谁懂啊家人们 😭</div>
          <div style="font-size: 12px; color: #999;">今天 15:20</div>
        </div>
        <div style="font-size: 14px; color: #333; line-height: 1.6;">
          今天训练馆的直拍绝了！远哥那个反手拧拉失误，曼昱在旁边憋笑。他俩怎么连对视都这么有宿命感啊！狠狠磕到了，圆圆满满就是最配的！
        </div>
      </div>
    </div>
  `,

  '设置': `
    <div style="background: #f2f2f7; height: 100%; padding: 20px 16px; font-family: -apple-system, sans-serif; margin: -20px;">
      <div style="font-size: 34px; font-weight: bold; color: #000; padding-top: 20px; margin-bottom: 10px;">设置</div>
      <div style="background: #e3e3e8; border-radius: 10px; padding: 8px 10px; display: flex; align-items: center; gap: 8px; color: #888; font-size: 17px; margin-bottom: 20px;">🔍 搜索</div>
      <div style="background: white; border-radius: 10px; padding: 12px 16px; display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(45deg, #ff9a9e, #fecfef); display: flex; align-items: center; justify-content: center; font-size: 30px;">👩‍❤️‍👨</div>
        <div style="flex: 1;">
          <div style="font-size: 20px; color: #000; font-weight: 500;">圆圆满满 数据组会长</div>
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
          <div style="color: #888; font-size: 17px;">圆圆满满_WiFi ›</div>
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
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #f7b2c1; display: flex; align-items: center; justify-content: center; font-size: 20px; color: white; margin-right: 12px;">🏓</div>
          <div style="flex: 1;">
            <div style="font-size: 17px; color: #000;">追星搭子小美</div>
            <div style="font-size: 13px; color: #888; margin-top: 2px;">↙ 手机</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 15px; color: #888;">晚上 8:40</div>
            <div style="color: #007aff; font-size: 18px; margin-top: 2px;">ⓘ</div>
          </div>
        </div>
      </div>
    </div>
  `,

  'Safari': '<div style="text-align:center;padding-top:40px;color:#666"><img src="icon/emoji/global.png" style="width:60px; height:60px; object-fit:contain; margin-bottom:10px;"><br>输入网址开始浏览</div>'
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

// ====== WeChat 邏輯 ======
let currentChatUser = '';

function openWeChat() {
  appTitle.textContent = '微信';
  document.querySelector('.app-header button').onclick = function() { closeApp(); };
  
  appContent.innerHTML = `
    <div class="wechat-bg">
      <div class="wechat-header">
        <div class="wechat-header-title">微信(99+)</div>
        <div class="wechat-header-icons">
          <span>＋</span>
        </div>
      </div>
      <div class="wechat-search">🔍 搜索</div>
      <div style="flex:1; overflow-y:auto;">
        <div class="wechat-list-item pinned" onclick="openChat('圆圆满满·全国后援会')">
          <div class="wechat-avatar" style="background: #f7b2c1;">🏓</div>
          <div class="wechat-info">
            <div class="wechat-name"><span>圆圆满满·全国后援会</span> <span style="font-size:12px; color:#999;">上午 10:30</span></div>
            <div class="wechat-msg">管理-小鱼: 今晚比赛都给我去超话签到！</div>
          </div>
        </div>
        <div class="wechat-list-item" onclick="openChat('圆圆满满_神仙产粮群')">
          <div class="wechat-avatar" style="background: #34c759; color:white;">🎨</div>
          <div class="wechat-info">
            <div class="wechat-name"><span>圆圆满满_神仙产粮群</span> <span style="font-size:12px; color:#999;">昨天</span></div>
            <div class="wechat-msg">画手太太: 昨晚摸鱼画了一张同人图，速看！</div>
          </div>
        </div>
        <div class="wechat-list-item" onclick="openChat('追星搭子小美')">
          <div class="wechat-avatar" style="background: #87ceeb;">👧</div>
          <div class="wechat-info">
            <div class="wechat-name"><span>追星搭子小美</span> <span style="font-size:12px; color:#999;">下午 2:15</span></div>
            <div class="wechat-msg">你看微博了吗？远哥今天采访提到曼昱了！！</div>
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
  if (user === '追星搭子小美') initialMsg = '你看微博了吗？远哥今天采访提到曼昱了！！';
  if (user === '圆圆满满·全国后援会') initialMsg = '管理-小鱼: 今晚比赛都给我去超话签到！';
  if (user === '圆圆满满_神仙产粮群') initialMsg = '画手太太: 昨晚摸鱼画了一张同人图，速看！';

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
    if (currentChatUser === '追星搭子小美') reply = '啊啊啊我死了！他说“曼昱最近状态很好”，他好爱她！';
    if (currentChatUser === '圆圆满满·全国后援会') reply = '群友A: 收到！立刻去做数据！';
    if (currentChatUser === '圆圆满满_神仙产粮群') reply = '画手太太: 发了发了，在超话，快去点赞！';
    container.innerHTML += `<div class="wechat-bubble left">${reply}</div>`;
    container.scrollTop = container.scrollHeight;
  }, 1000);
}

function handleEnter(e) {
  if (e.key === 'Enter') sendMessage();
}

// ====== 微博 (包含熱搜同超話) ======
function openWeibo() {
  appTitle.textContent = '微博';
  document.querySelector('.app-header button').onclick = function() { closeApp(); };

  appContent.innerHTML = `
    <div style="background: #f2f2f7; height: 100%; padding: 10px; font-family: -apple-system, sans-serif;">
      <div style="background: white; border-radius: 10px; padding: 10px; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <span style="color:#ff8200; font-weight:bold; font-size:18px;">微</span>
        <div style="flex:1; background: #f2f2f7; border-radius: 6px; padding: 6px 10px; color: #888; font-size: 14px;">搜索微博...</div>
      </div>
      <div style="background: white; border-radius: 12px; padding: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); margin-bottom: 15px;">
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px; display: flex; justify-content: space-between;">
          <span>微博热搜榜</span><span style="font-size: 12px; color: #888; font-weight: normal; margin-top: 5px;">实时热度</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <div style="display: flex; gap: 10px;"><span style="color: #ff3b30; font-weight: bold; width: 20px;">1</span><div style="flex: 1;"><div style="font-size: 16px; font-weight: 500; color: #000;">林高远王曼昱 混双搭档</div><div style="font-size: 12px; color: #ff3b30;">热 · 1,245,678</div></div></div>
          <div style="display: flex; gap: 10px;"><span style="color: #ff9500; font-weight: bold; width: 20px;">2</span><div style="flex: 1;"><div style="font-size: 16px; font-weight: 500; color: #000;">圆满 法兰克福加油</div><div style="font-size: 12px; color: #ff9500;">热 · 987,654</div></div></div>
          <div style="display: flex; gap: 10px;"><span style="color: #ffcc00; font-weight: bold; width: 20px;">3</span><div style="flex: 1;"><div style="font-size: 16px; font-weight: 500; color: #000;">王曼昱 反手拧拉</div><div style="font-size: 12px; color: #ffcc00;">热 · 876,543</div></div></div>
        </div>
      </div>
      <div style="background: white; border-radius: 12px; padding: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
          <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(45deg, #ff9a9e, #fecfef); display: flex; align-items: center; justify-content: center; font-size: 24px;">🏓</div>
          <div style="flex: 1;">
            <div style="font-size: 18px; font-weight: bold; color: #000;">林高远王曼昱超话</div>
            <div style="font-size: 12px; color: #888;">粉丝：52.8万 · 帖子：120万</div>
          </div>
          <button onclick="alert('签到成功！已连续签到 365 天')" style="background: #ff9500; color: white; border: none; padding: 6px 16px; border-radius: 15px; font-size: 14px; font-weight: bold;">签到</button>
        </div>
        <div style="font-size: 15px; line-height: 1.5; color: #333; border-top: 1px solid #f0f0f0; padding-top: 10px;">
          <span style="font-weight: bold;">圆满今天发糖了吗：</span>今天又是为圆圆满满流泪的一天，采访里他提到她的那个笑容，我看了 100 遍！！
        </div>
      </div>
    </div>
  `;
  appView.classList.add('show');
}

// ====== 倒數日 ======
function openCountdown() {
  appTitle.textContent = '倒数日';
  document.querySelector('.app-header button').onclick = function() { closeApp(); };

  const now = new Date();
  const target = new Date(now.getFullYear(), 10, 21);
  if (now > target) target.setFullYear(now.getFullYear() + 1);
  const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));

  appContent.innerHTML = `
    <div style="background: #000; height: 100%; padding: 20px; color: #fff; font-family: -apple-system, sans-serif;">
      <div style="text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 30px; margin-top: 20px;">倒数日</div>
      <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); border-radius: 20px; padding: 20px; text-align: center; color: #000; box-shadow: 0 10px 20px rgba(255,154,158,0.3);">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 10px;">距离 混双决赛</div>
        <div style="font-size: 64px; font-weight: bold; line-height: 1;">${diffDays}</div>
        <div style="font-size: 14px; font-weight: 500; margin-top: 5px;">天</div>
        <div style="font-size: 12px; opacity: 0.7; margin-top: 15px;">11月21日 · 记得看直播</div>
      </div>
    </div>
  `;
  appView.classList.add('show');
}

// ====== Apple Music (跟足 iOS 排版) ======
function openMusic() {
  appTitle.textContent = '正在播放';
  document.querySelector('.app-header button').onclick = function() { closeApp(); };

  appContent.innerHTML = `
    <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); height: 100%; margin: -20px; display: flex; flex-direction: column; align-items: center; padding: 40px 20px;">
      <div style="width: 100%; display: flex; justify-content: center; font-size: 12px; font-weight: 600; color: #888; margin-bottom: 30px;">正在播放</div>
      <div style="width: 280px; height: 280px; border-radius: 10px; background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%); display: flex; justify-content: center; align-items: center; font-size: 80px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); margin-bottom: 40px;">🎵</div>
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="font-size: 22px; font-weight: 600; color: #000; margin-bottom: 5px;">落在生命里的光</div>
        <div style="font-size: 18px; color: #888;">圆圆满满粉丝歌单</div>
      </div>
      <div style="width: 100%; margin-bottom: 30px; padding: 0 10px;">
        <div style="width: 100%; height: 4px; background: #ddd; border-radius: 2px; position: relative;">
          <div style="height: 100%; background: #ff3b30; border-radius: 2px; width: 30%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: #888; margin-top: 8px;"><span>1:05</span><span>3:35</span></div>
      </div>
      <div style="display: flex; gap: 40px; align-items: center;">
        <div style="font-size: 32px; cursor: pointer; color: #000;">⏮</div>
        <div style="font-size: 50px; cursor: pointer; color: #000;">⏸</div>
        <div style="font-size: 32px; cursor: pointer; color: #000;">⏭</div>
      </div>
    </div>
  `;
  appView.classList.add('show');
}

// ====== 計算機 (彩蛋版) ======
function openCalculator() {
  appTitle.textContent = '计算器';
  document.querySelector('.app-header button').onclick = function() { closeApp(); };

  appContent.innerHTML = `
    <div style="background: #000; height: 100%; margin: -20px; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end;">
      <input type="text" id="calcInput" readonly value="0" style="width: 100%; background: transparent; border: none; color: #fff; font-size: 64px; text-align: right; outline: none; margin-bottom: 20px;">
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
        <div onclick="calcInput('C')" style="background: #a5a5a5; color: #000; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 28px; cursor: pointer;">AC</div>
        <div onclick="calcInput('+/-')" style="background: #a5a5a5; color: #000; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 28px; cursor: pointer;">+/-</div>
        <div onclick="calcInput('%')" style="background: #a5a5a5; color: #000; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 28px; cursor: pointer;">%</div>
        <div onclick="calcInput('/')" style="background: #ff9500; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">÷</div>
        <div onclick="calcInput('7')" style="background: #333; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">7</div>
        <div onclick="calcInput('8')" style="background: #333; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">8</div>
        <div onclick="calcInput('9')" style="background: #333; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">9</div>
        <div onclick="calcInput('*')" style="background: #ff9500; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">×</div>
        <div onclick="calcInput('4')" style="background: #333; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">4</div>
        <div onclick="calcInput('5')" style="background: #333; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">5</div>
        <div onclick="calcInput('6')" style="background: #333; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">6</div>
        <div onclick="calcInput('-')" style="background: #ff9500; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">−</div>
        <div onclick="calcInput('1')" style="background: #333; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">1</div>
        <div onclick="calcInput('2')" style="background: #333; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">2</div>
        <div onclick="calcInput('3')" style="background: #333; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">3</div>
        <div onclick="calcInput('+')" style="background: #ff9500; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">+</div>
        <div onclick="calcInput('0')" style="background: #333; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; grid-column: span 2; cursor: pointer;">0</div>
        <div onclick="calcInput('.')" style="background: #333; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">.</div>
        <div onclick="calcInput('=')" style="background: #ff9500; color: #fff; border-radius: 50%; height: 70px; display: flex; justify-content: center; align-items: center; font-size: 32px; cursor: pointer;">=</div>
      </div>
    </div>
  `;
  appView.classList.add('show');
}

function calcInput(val) {
  const input = document.getElementById('calcInput');
  if (val === 'C') {
    input.value = '0';
  } else if (val === '=') {
    if (input.value === '5201314') {
      input.style.fontSize = '24px'; 
      input.value = 'lgywawmy❤️wmywalgy'; 
      setTimeout(() => { input.style.fontSize = '64px'; input.value = '0'; }, 3000);
    } else if (input.value === '0319') {
      input.style.fontSize = '32px'; 
      input.value = '林高远生日快乐🎂'; 
      setTimeout(() => { input.style.fontSize = '64px'; input.value = '0'; }, 3000);
    } else if (input.value === '0209') {
      input.style.fontSize = '32px'; 
      input.value = '王曼昱生日快乐🎂'; 
      setTimeout(() => { input.style.fontSize = '64px'; input.value = '0'; }, 3000);
    } else {
      try { input.value = eval(input.value); } catch { input.value = 'Error'; }
    }
  } else {
    if (input.value === '0' && val !== '.') input.value = val;
    else input.value += val;
  }
}

// ====== 日曆 (加入生日) ======
let currentCalYear = 2024;
let currentCalMonth = 9; // 0-11, 9代表10月

function openCalendar() {
  appTitle.textContent = '日历';
  document.querySelector('.app-header button').onclick = function() { closeApp(); };
  renderCalendar();
  appView.classList.add('show');
}

function renderCalendar() {
  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  const firstDay = new Date(currentCalYear, currentCalMonth, 1).getDay();
  const daysInMonth = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
  
  let daysHtml = '';
  for (let i = 0; i < firstDay; i++) { daysHtml += `<div></div>`; }
  for (let i = 1; i <= daysInMonth; i++) {
    let isToday = (i === 23 && currentCalMonth === 9) ? 'background:#ff3b30; color:#fff; border-radius:50%; width:30px; height:30px; display:flex; justify-content:center; align-items:center; margin:0 auto;' : '';
    daysHtml += `<div style="${isToday}">${i}</div>`;
  }

  appContent.innerHTML = `
    <div style="background: #fff; height: 100%; margin: -20px; padding: 20px; font-family: -apple-system, sans-serif;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <button onclick="changeMonth(-1)" style="border:none; background:none; font-size:20px; color:#007aff; cursor:pointer;">‹</button>
        <div style="font-size: 24px; font-weight: bold;">${currentCalYear}年 ${monthNames[currentCalMonth]}</div>
        <button onclick="changeMonth(1)" style="border:none; background:none; font-size:20px; color:#007aff; cursor:pointer;">›</button>
      </div>
      <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; text-align: center; font-size: 15px; margin-bottom: 10px; color: #888;">
        <div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; text-align: center; font-size: 17px;">
        ${daysHtml}
      </div>
      <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px;">日程</div>
        <div style="border-left: 3px solid #ff3b30; padding-left: 10px; margin-bottom: 10px;">
          <div style="font-size: 14px; color: #ff3b30; font-weight: bold;">林高远生日</div>
          <div style="font-size: 15px;">每年 3月19日</div>
        </div>
        <div style="border-left: 3px solid #ff3b30; padding-left: 10px;">
          <div style="font-size: 14px; color: #ff3b30; font-weight: bold;">王曼昱生日</div>
          <div style="font-size: 15px;">每年 2月9日</div>
        </div>
      </div>
    </div>
  `;
}

function changeMonth(offset) {
  currentCalMonth += offset;
  if (currentCalMonth < 0) { currentCalMonth = 11; currentCalYear--; }
  if (currentCalMonth > 11) { currentCalMonth = 0; currentCalYear++; }
  renderCalendar();
}

// ====== 閑魚 App ======
function openXianyu() {
  appTitle.textContent = '闲鱼';
  document.querySelector('.app-header button').onclick = function() { closeApp(); };

  appContent.innerHTML = `
    <div style="background: #f2f2f7; height: 100%; padding: 10px; font-family: -apple-system, sans-serif;">
      <div style="background: white; border-radius: 10px; padding: 10px; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
        <span style="color:#ffca28; font-weight:bold; font-size:18px;">闲鱼</span>
        <div style="flex:1; background: #f2f2f7; border-radius: 6px; padding: 6px 10px; color: #888; font-size: 14px;">搜索：林高远 王曼昱 门票...</div>
      </div>
      <div style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; display: flex; gap: 15px;">
        <div style="width: 80px; height: 80px; border-radius: 8px; background: linear-gradient(135deg, #a1c4fd, #c2e9fb); display: flex; align-items: center; justify-content: center; font-size: 30px;">🎫</div>
        <div style="flex: 1;">
          <div style="font-size: 15px; font-weight: 500; color: #000; margin-bottom: 5px;">【出票】WTT法兰克福站 10.31 内场B区</div>
          <div style="font-size: 12px; color: #888; margin-bottom: 5px;">原价出！临时去不了，含泪转给家人。</div>
          <div style="font-size: 16px; color: #ff3b30; font-weight: bold;">¥ 888</div>
        </div>
      </div>
      <div style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; display: flex; gap: 15px;">
        <div style="width: 80px; height: 80px; border-radius: 8px; background: linear-gradient(135deg, #ff9a9e, #fecfef); display: flex; align-items: center; justify-content: center; font-size: 30px;">📿</div>
        <div style="flex: 1;">
          <div style="font-size: 15px; font-weight: 500; color: #000; margin-bottom: 5px;">【收票】求太原站决赛两张连坐！</div>
          <div style="font-size: 12px; color: #888; margin-bottom: 5px;">溢价勿扰！带价来，圆圆满满冲鸭！</div>
          <div style="font-size: 16px; color: #ff3b30; font-weight: bold;">求购 2 张</div>
        </div>
      </div>
      <div style="background: white; border-radius: 12px; padding: 15px; display: flex; gap: 15px;">
        <div style="width: 80px; height: 80px; border-radius: 8px; background: linear-gradient(135deg, #a8edea, #fed6e3); display: flex; align-items: center; justify-content: center; font-size: 30px;">👕</div>
        <div style="flex: 1;">
          <div style="font-size: 15px; font-weight: 500; color: #000; margin-bottom: 5px;">【Get同款】林高远同款外套 全新 L码</div>
          <div style="font-size: 12px; color: #888; margin-bottom: 5px;">买大了穿不下，绝对正品。</div>
          <div style="font-size: 16px; color: #ff3b30; font-weight: bold;">¥ 199</div>
        </div>
      </div>
    </div>
  `;
  appView.classList.add('show');
}

// ====== 神級全螢幕判斷 ======
function checkMobile() {
  const phone = document.getElementById('phone');
  if (window.innerWidth <= 500) {
    phone.classList.add('mob');
  } else {
    phone.classList.remove('mob');
  }
}
window.addEventListener('load', checkMobile);
window.addEventListener('resize', checkMobile);
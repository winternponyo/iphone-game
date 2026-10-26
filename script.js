// ====== 時間與日期更新 ======
function updateTime() {
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, '0');
  const t = `${h}:${m}`;
  
  const statusTime = document.getElementById('statusTime');
  if (statusTime) statusTime.textContent = t;
  
  const lockTime = document.querySelector('.lock-time');
  if (lockTime) lockTime.textContent = t;
  
  const dateEl = document.getElementById('lockDate');
  if (dateEl) dateEl.textContent = '10月24日 星期六';

  const ncTime = document.getElementById('ncTime');
  if (ncTime) ncTime.textContent = t;
  const ncDate = document.getElementById('ncDate');
  if (ncDate) ncDate.textContent = '10月24日 星期六';

  // 計算在一起天數 (2022-10-31 到 2026-10-24)
  const startDate = new Date('2022-10-31'); 
  const currentDate = new Date('2026-10-24');
  const diff = currentDate - startDate;
  const daysTogether = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  const wDays = document.getElementById('togetherDays');
  const wDaysHome = document.getElementById('togetherDaysHome');
  if(wDays) wDays.textContent = daysTogether;
  if(wDaysHome) wDaysHome.textContent = daysTogether;
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
    const homeScreen = document.getElementById('homeScreen');
    if(homeScreen) {
      homeScreen.style.opacity = '1';
      homeScreen.style.pointerEvents = 'auto';
      homeScreen.classList.add('show');
    }
    
    // 💡 每次解鎖都強制清走記錄，保證個 Timer 一定會行 (15秒)
    localStorage.removeItem('callAnswered');
    if (window.callTimer) clearTimeout(window.callTimer);
    window.callTimer = setTimeout(triggerCall, 15000);
    
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
    
    passScreen.classList.remove('show');
    lockScreen.classList.remove('unlocked');
    resetDots();
  }
}

// ====== 模擬來電邏輯 (iOS 26 風格) ======
function triggerCall() {
  const callScreen = document.getElementById('callScreen');
  if (callScreen) {
    callScreen.classList.add('show');
    closeApp(); // 關閉 App
    const nc = document.getElementById('notificationCenter');
    if (nc) nc.classList.remove('show'); // 關閉通知中心

    document.getElementById('callStatus').textContent = '邀请你进行语音通话...';
    document.getElementById('callChat').style.display = 'none';
    document.getElementById('callActionsInCall').style.display = 'none';
    document.getElementById('callAnswerActions').style.display = 'flex';
    document.getElementById('callEndBtn').style.display = 'none';
  }
}

function acceptCall() {
  document.getElementById('callStatus').textContent = '00:01';
  document.getElementById('callAnswerActions').style.display = 'none';
  
  const chat = document.getElementById('callChat');
  chat.style.display = 'flex';
  document.getElementById('callActionsInCall').style.display = 'grid';
  document.getElementById('callEndBtn').style.display = 'flex';
  
  const bubbles = chat.querySelectorAll('.call-chat-bubble');
  bubbles.forEach((bubble, index) => {
    bubble.style.animationDelay = `${index * 1.5}s`;
  });
}

function declineCall() {
  document.getElementById('callScreen').classList.remove('show');
  localStorage.setItem('callAnswered', 'declined');
}

function endCall() {
  document.getElementById('callScreen').classList.remove('show');
  localStorage.setItem('callAnswered', 'true');
}

// ====== 通知中心手勢邏輯 ======
let ncStartY = 0;
const ncElement = document.getElementById('notificationCenter');
const statusBarElement = document.querySelector('.status-bar');

if (statusBarElement) {
  statusBarElement.style.pointerEvents = 'auto';
  statusBarElement.addEventListener('touchstart', e => { ncStartY = e.touches[0].clientY; }, { passive: true });
  statusBarElement.addEventListener('touchmove', e => {
    const dy = e.changedTouches[0].clientY - ncStartY;
    if (dy > 20 && dy < 100) {
      ncElement.style.transition = 'none';
      ncElement.style.transform = `translateY(${-100 + (dy/2)}%)`;
    }
  }, { passive: false });
  statusBarElement.addEventListener('touchend', e => {
    const dy = e.changedTouches[0].clientY - ncStartY;
    ncElement.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    if (dy > 50) {
      ncElement.classList.add('show');
      ncElement.style.transform = '';
    } else {
      ncElement.style.transform = '';
    }
  }, { passive: true });

  statusBarElement.addEventListener('mousedown', e => { ncStartY = e.clientY; });
  statusBarElement.addEventListener('mouseup', e => {
    if (e.clientY - ncStartY > 30) {
      ncElement.classList.add('show');
    }
  });
}

function openWeChatFromNC() {
  ncElement.classList.remove('show');
  openWeChat();
}

// ====== App 數據與渲染 ======
const appContent = document.getElementById('appContent');
const appView = document.getElementById('appView');

const appData = {
  '相册': `<div style="background: #fff; height: 100%; padding: 20px; font-family: -apple-system, sans-serif; overflow-y: auto;">
    <div style="padding: 60px 16px 5px; display: flex; justify-content: space-between; align-items: center; background: #fff; position: sticky; top: 0; z-index: 10;">
      <div onclick="closeApp()" style="color: #007aff; font-size: 17px; display: flex; align-items: center; gap: 4px; cursor: pointer;">‹ 主屏幕</div>
      <div style="color: #007aff; font-size: 17px;">选择</div>
    </div>
    <div style="padding: 0 16px 15px;">
      <div style="font-size: 34px; font-weight: bold; color: #000; letter-spacing: 0.5px;">图库</div>
      <div style="font-size: 13px; color: #888; margin-top: 2px;">48 张照片</div>
    </div>
    <div style="padding: 0 16px 8px; font-size: 20px; font-weight: bold; color: #000;">2026年10月</div>
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px;">
      <div style="aspect-ratio: 1; background: #e5e5ea; display: flex; align-items: center; justify-content: center; font-size: 40px;">🐱</div>
      <div style="aspect-ratio: 1; background: #e5e5ea; display: flex; align-items: center; justify-content: center; font-size: 40px;">🏆</div>
      <div style="aspect-ratio: 1; background: #e5e5ea; display: flex; align-items: center; justify-content: center; font-size: 40px;">🏎️</div>
      <div style="aspect-ratio: 1; background: #e5e5ea; display: flex; align-items: center; justify-content: center; font-size: 40px;">🫶</div>
      <div style="aspect-ratio: 1; background: #e5e5ea; display: flex; align-items: center; justify-content: center; font-size: 40px;">📦</div>
      <div style="aspect-ratio: 1; background: #e5e5ea; display: flex; align-items: center; justify-content: center; font-size: 40px;">✈️</div>
    </div>
    <div style="padding: 20px 16px 8px; font-size: 20px; font-weight: bold; color: #000;">隐藏相簿</div>
    <div style="padding: 0 16px 80px;">
      <div style="font-size: 13px; color: #888; margin-bottom: 10px;">需要验证面容 ID</div>
      <div onclick="alert('🔒 两只手戴着同款手链的照片。\\n快递单截图：收件人 王曼昱，北京市...')" style="background: #f2f2f7; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer;">
        <div style="font-size: 30px; margin-bottom: 5px;">🔒</div>
        <div style="font-size: 14px; color: #007aff; font-weight: 500;">点击查看隐藏照片</div>
      </div>
    </div>
  </div>`,
  
  '天气': `<div style="background: linear-gradient(180deg, #4A90E2 0%, #50E3C2 100%); height: 100%; padding: 20px; color: white; margin: -20px; display: flex; flex-direction: column;">
    <div style="text-align: center; padding-top: 40px;">
      <div style="font-size: 24px; font-weight: 500; margin-bottom: 10px;">广州市</div>
      <div style="font-size: 80px; font-weight: 200; line-height: 1;">26°</div>
      <div style="font-size: 18px; opacity: 0.9; margin-bottom: 20px;">多云</div>
      <div style="font-size: 16px; opacity: 0.8;">最高 28° 最低 21°</div>
    </div>
  </div>`,
  
  '备忘录': `<div style="background: #f2f2f7; height: 100%; margin: -20px; padding: 20px 16px; font-family: -apple-system; overflow-y: auto;">
    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 30px; margin-bottom: 15px;">
      <div style="font-size: 32px; font-weight: bold; color: #000;">备忘录</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <div style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 10px;">10.24 曼昱飞法国</div>
      <div style="font-size: 14px; color: #666; line-height: 1.5;">凌晨的航班。记得定闹钟发信息。法国那边天气冷了，护手霜应该快到了。</div>
    </div>
    <div style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <div style="font-size: 16px; font-weight: bold; color: #000; margin-bottom: 10px;">12.16-23 全国锦标赛（福州）</div>
      <div style="font-size: 14px; color: #666; line-height: 1.5;">要和弟弟们提前磨合。远剑工作室那边要安排好，不能走开太久。</div>
    </div>
  </div>`,
  
  '设置': `<div style="background: #f2f2f7; height: 100%; padding: 20px 16px; font-family: -apple-system, sans-serif; margin: -20px; overflow-y: auto;">
    <div style="font-size: 34px; font-weight: bold; color: #000; padding-top: 20px; margin-bottom: 10px;">设置</div>
    <div style="background: white; border-radius: 10px; padding: 12px 16px; display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
      <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(45deg, #1c1c3a, #b76e79); display: flex; align-items: center; justify-content: center; font-size: 30px; color: white; font-weight: bold;">远</div>
      <div style="flex: 1;">
        <div style="font-size: 20px; color: #000; font-weight: 500;">林高远</div>
        <div style="font-size: 13px; color: #888; margin-top: 2px;">Apple ID、iCloud、媒体与购买项目</div>
      </div>
    </div>
  </div>`,
  
  '电话': `<div style="background: #fff; height: 100%; padding: 10px 16px; margin: -20px; display: flex; flex-direction: column; padding-top: 50px;">
    <div style="font-size: 34px; font-weight: bold; margin-bottom: 20px;">最近通话</div>
    <div style="display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
      <div style="width: 40px; height: 40px; border-radius: 50%; background: #f7b2c1; display: flex; align-items: center; justify-content: center; font-size: 20px; color: white; margin-right: 12px;">昱</div>
      <div style="flex: 1;">
        <div style="font-size: 17px; color: #000;">小昱</div>
        <div style="font-size: 13px; color: #888; margin-top: 2px;">↙ 手机</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 15px; color: #888;">昨天</div>
        <div style="color: #007aff; font-size: 18px; margin-top: 2px;">ⓘ</div>
      </div>
    </div>
  </div>`,
  
  'Safari': '<div style="text-align:center;padding-top:40px;color:#666"><img src="icon/emoji/global.png" style="width:60px; height:60px; object-fit:contain; margin-bottom:10px;"><br>输入网址开始浏览</div>'
};

function openApp(name) {
  showHint(); // 👈 加呢句，等所有 App 都會觸發提示

  if (name === 'instagram') {
    appContent.innerHTML = `
      <div style="background: #000; height: 100%; margin: -20px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; position: relative;">
        <div style="position: absolute; top: 60px; text-align: center;">
          <div style="font-size: 20px; font-weight: 500; margin-bottom: 5px;">小昱</div>
          <div style="font-size: 14px; color: #aaa;">Instagram 语音通话...</div>
        </div>
        <div style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); display: flex; align-items: center; justify-content: center; font-size: 50px; margin-bottom: 30px; box-shadow: 0 0 30px rgba(220,39,67,0.5);">
          🏓
        </div>
        <div style="display: flex; gap: 40px; position: absolute; bottom: 80px;">
          <div onclick="closeApp()" style="width: 70px; height: 70px; border-radius: 50%; background: #ff3b30; display: flex; align-items: center; justify-content: center; font-size: 30px; cursor: pointer;">📞</div>
        </div>
      </div>
    `;
    appView.classList.add('show');
    return;
  }
  appContent.innerHTML = appData[name] || '这个 App 还没做。';
  appView.classList.add('show');
}

function closeApp() {
  appView.classList.remove('show');
}

// ====== WeChat 邏輯 ======
let currentChatUser = '';

function openWeChat() {
  showHint(); 
  
  appContent.innerHTML = `
    <div class="wechat-bg" style="background: #ededed; height: 100%; display: flex; flex-direction: column;">
      <div class="wechat-header" style="background: #ededed; padding: 50px 16px 10px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #dcdcdc;">
        <div class="wechat-header-title" style="font-size: 17px; font-weight: 600; color: #000;">微信(99+)</div>
        <div class="wechat-header-icons" style="display: flex; gap: 16px; font-size: 20px; color: #000;">
          <span>🔍</span>
          <span>＋</span>
        </div>
      </div>

      <div style="flex:1; overflow-y:auto;">
        <!-- 置頂：小昱 -->
        <div class="wechat-list-item pinned" onclick="openChat('小昱')" style="background: #f4f4f4; padding: 12px 16px; display: flex; align-items: center; border-bottom: 1px solid #e5e5e5; cursor: pointer;">
          <div class="wechat-avatar" style="width: 48px; height: 48px; border-radius: 6px; background: #f7b2c1; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-right: 12px;">🏓</div>
          <div class="wechat-info" style="flex: 1; overflow: hidden;">
            <div class="wechat-name" style="font-size: 16px; color: #111; margin-bottom: 4px; display: flex; justify-content: space-between;">
              <span>小昱</span> <span style="font-size:12px; color:#999; font-weight: 400;">凌晨 2:15</span>
            </div>
            <div class="wechat-msg" style="font-size: 14px; color: #999; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">我到机场了，你睡了没？</div>
          </div>
        </div>

        <!-- 群組：广东队 -->
        <div class="wechat-list-item" onclick="openChat('广东队')" style="background: #fff; padding: 12px 16px; display: flex; align-items: center; border-bottom: 1px solid #e5e5e5; cursor: pointer;">
          <div class="wechat-avatar" style="width: 48px; height: 48px; border-radius: 6px; background: #007aff; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-right: 12px; color: white;">粤</div>
          <div class="wechat-info" style="flex: 1; overflow: hidden;">
            <div class="wechat-name" style="font-size: 16px; color: #111; margin-bottom: 4px; display: flex; justify-content: space-between;">
              <span>广东队</span> <span style="font-size:12px; color:#999; font-weight: 400;">昨天</span>
            </div>
            <div class="wechat-msg" style="font-size: 14px; color: #999; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">远哥，明天练体能？</div>
          </div>
        </div>

        <!-- 群組：远剑工作室 -->
        <div class="wechat-list-item" onclick="openChat('远剑工作室')" style="background: #fff; padding: 12px 16px; display: flex; align-items: center; border-bottom: 1px solid #e5e5e5; cursor: pointer;">
          <div class="wechat-avatar" style="width: 48px; height: 48px; border-radius: 6px; background: #34c759; color: white; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-right: 12px;">💼</div>
          <div class="wechat-info" style="flex: 1; overflow: hidden;">
            <div class="wechat-name" style="font-size: 16px; color: #111; margin-bottom: 4px; display: flex; justify-content: space-between;">
              <span>远剑工作室</span> <span style="font-size:12px; color:#999; font-weight: 400;">下午 3:40</span>
            </div>
            <div class="wechat-msg" style="font-size: 14px; color: #999; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">林总，猫咖明天的粉丝打卡活动准备好了...</div>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-around; padding: 8px 0 20px 0; background: #f9f9f9; border-top: 1px solid #ddd;">
        <div style="text-align: center; color: #07c160; font-size: 11px;"><div style="font-size: 22px; margin-bottom: 2px;">💬</div>微信</div>
        <div style="text-align: center; color: #888; font-size: 11px;"><div style="font-size: 22px; margin-bottom: 2px;">👤</div>通讯录</div>
        <div style="text-align: center; color: #888; font-size: 11px;"><div style="font-size: 22px; margin-bottom: 2px;">🧭</div>发现</div>
        <div style="text-align: center; color: #888; font-size: 11px;"><div style="font-size: 22px; margin-bottom: 2px;">👤</div>我</div>
      </div>
    </div>
  `;
  appView.classList.add('show');
  localStorage.setItem('seenWeChat', 'true');
}

function openChat(user) {
  currentChatUser = user;
  let chatHtml = '';

  if (user === '小昱') {
    chatHtml = `
      <div class="wechat-bubble-wrapper left">
        <div class="wechat-bubble-avatar" style="background: #f7b2c1;">🏓</div>
        <div class="wechat-bubble left">我到机场了，你睡了没？</div>
      </div>
      <div class="wechat-bubble-wrapper right">
        <div class="wechat-bubble-avatar" style="background: linear-gradient(45deg, #1c1c3a, #b76e79); color:white;">远</div>
        <div class="wechat-bubble right">还没，在猫咖这边弄新品呢。你到法国记得报平安。</div>
      </div>
      <div class="wechat-time-tip">今天 02:15</div>
      <div class="wechat-bubble-wrapper left">
        <div class="wechat-bubble-avatar" style="background: #f7b2c1;">🏓</div>
        <div class="wechat-bubble left">知道了。你十二月全锦赛单打和团体加油~</div>
      </div>
      <div class="wechat-bubble-wrapper right">
        <div class="wechat-bubble-avatar" style="background: linear-gradient(45deg, #1c1c3a, #b76e79); color:white;">远</div>
        <div class="wechat-bubble right">好，你在飞机上好好休息~。</div>
      </div>
      <div class="wechat-bubble-wrapper left">
        <div class="wechat-bubble-avatar" style="background: #f7b2c1;">🏓</div>
        <div class="wechat-bubble left">貂蝉今天怎么样啊。</div>
      </div>
      <div class="wechat-bubble-wrapper right">
        <div class="wechat-bubble-avatar" style="background: linear-gradient(45deg, #1c1c3a, #b76e79); color:white;">远</div>
        <div class="wechat-bubble right">挺好的，今天是乖乖小公主，像她妈</div>
      </div>
    `;
  } else if (user === '广东队') {
    chatHtml = `
      <div class="wechat-bubble-wrapper left">
        <div class="wechat-bubble-avatar" style="background: #007aff; color: white;">粤</div>
        <div class="wechat-bubble left">远哥，明天练体能？</div>
      </div>
      <div class="wechat-bubble-wrapper right">
        <div class="wechat-bubble-avatar" style="background: linear-gradient(45deg, #1c1c3a, #b76e79); color:white;">远</div>
        <div class="wechat-bubble right">行，我明天上午先去趟猫咖，下午过去。</div>
      </div>
      <div class="wechat-bubble-wrapper left">
        <div class="wechat-bubble-avatar" style="background: #007aff; color: white;">粤</div>
        <div class="wechat-bubble left">好，那下午三点老地方见。</div>
      </div>
    `;
  } else if (user === '远剑工作室') {
    chatHtml = `
      <div class="wechat-bubble-wrapper left">
        <div class="wechat-bubble-avatar" style="background: #34c759; color: white;">💼</div>
        <div class="wechat-bubble left">林总，猫咖明天的粉丝打卡活动准备好了，周边也备齐了。</div>
      </div>
      <div class="wechat-bubble-wrapper right">
        <div class="wechat-bubble-avatar" style="background: linear-gradient(45deg, #1c1c3a, #b76e79); color:white;">远</div>
        <div class="wechat-bubble right">行，记得多拍几张貂蝉的照片发给我。</div>
      </div>
      <div class="wechat-bubble-wrapper left">
        <div class="wechat-bubble-avatar" style="background: #34c759; color: white;">💼</div>
        <div class="wechat-bubble left">好的，另外新品葡萄果茶的反馈很不错，要加推吗？</div>
      </div>
      <div class="wechat-bubble-wrapper right">
        <div class="wechat-bubble-avatar" style="background: linear-gradient(45deg, #1c1c3a, #b76e79); color:white;">远</div>
        <div class="wechat-bubble right">先看看周末的销量，新品海报设计图发我邮箱。</div>
      </div>
    `;
  }

  appContent.innerHTML = `
    <div class="wechat-chat-bg" style="background: #ededed; height: 100%; display: flex; flex-direction: column;">
      <div style="background: #ededed; padding: 50px 16px 10px; display: flex; align-items: center; border-bottom: 1px solid #dcdcdc; position: relative; justify-content: center;">
        <div onclick="openWeChat()" style="position: absolute; left: 16px; color: #333; font-size: 28px; cursor: pointer; font-weight: 300;">‹</div>
        <div style="font-size: 17px; font-weight: 600; color: #000;">${user}</div>
        <div style="position: absolute; right: 16px; color: #333; font-size: 20px; font-weight: bold; cursor: pointer;">···</div>
      </div>

      <div class="wechat-msg-container" id="chatContainer">
        ${chatHtml}
      </div>

      <div class="wechat-input-area" style="background: #f7f7f7; padding: 10px 15px; display: flex; gap: 10px; align-items: center; border-top: 1px solid #ddd; padding-bottom: 30px;">
        <div style="font-size: 24px; color: #333; cursor: pointer;">🎤</div>
        <input type="text" class="wechat-input" id="chatInput" placeholder="" onkeypress="handleEnter(event)" style="flex: 1; padding: 10px; border-radius: 6px; border: none; outline: none; font-size: 16px; background: #fff;">
        <div style="font-size: 24px; color: #333; cursor: pointer;">😀</div>
        <div style="font-size: 24px; color: #333; cursor: pointer;">⊕</div>
      </div>
    </div>
  `;
  appView.classList.add('show');
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  
  const container = document.getElementById('chatContainer');
  
  container.innerHTML += `
    <div class="wechat-bubble-wrapper right">
      <div class="wechat-bubble-avatar" style="background: linear-gradient(45deg, #1c1c3a, #b76e79); color:white;">远</div>
      <div class="wechat-bubble right">${text}</div>
    </div>
  `;
  input.value = '';
  container.scrollTop = container.scrollHeight;

  setTimeout(() => {
    let reply = '收到！';
    let avatar = '🏓';
    let avatarBg = '#f7b2c1';

    if (currentChatUser === '小昱') {
      const replies = ['嗯，早点休息吧，别弄太晚。', '知道了，你也早点睡。', '等我打完比赛，请你吃大餐。', '记得想我。'];
      reply = replies[Math.floor(Math.random() * replies.length)];
      avatar = '🏓'; avatarBg = '#f7b2c1';
    } else if (currentChatUser === '广东队') {
      const replies = ['收到，远哥！', '没问题，等你回来合练。', '好的，我转告教练。'];
      reply = replies[Math.floor(Math.random() * replies.length)];
      avatar = '粤'; avatarBg = '#007aff';
    } else if (currentChatUser === '远剑工作室') {
      const replies = ['好的林总，马上办。', '收到，这就去安排。', '没问题，海报已经发您了。'];
      reply = replies[Math.floor(Math.random() * replies.length)];
      avatar = '💼'; avatarBg = '#34c759';
    }

    container.innerHTML += `
      <div class="wechat-bubble-wrapper left">
        <div class="wechat-bubble-avatar" style="background: ${avatarBg}; color:white;">${avatar}</div>
        <div class="wechat-bubble left">${reply}</div>
      </div>
    `;
    container.scrollTop = container.scrollHeight;
  }, 1000);
}

function handleEnter(e) { if (e.key === 'Enter') sendMessage(); }

// ====== 其他 App (微博/倒數/音樂/計算機/日曆/閒魚) ======
function openWeibo() {
  showHint();
  appContent.innerHTML = `
    <div style="background: #f2f2f7; height: 100%; padding: 10px; font-family: -apple-system, sans-serif; margin: -20px; padding-top: 50px;">
      <div style="background: white; border-radius: 10px; padding: 10px; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;"><span style="color:#ff8200; font-weight:bold; font-size:18px;">微</span><div style="flex:1; background: #f2f2f7; border-radius: 6px; padding: 6px 10px; color: #888; font-size: 14px;">搜索微博...</div></div>
      <div style="background: white; border-radius: 12px; padding: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); margin-bottom: 15px;">
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 15px; display: flex; justify-content: space-between;"><span>微博热搜榜</span><span style="font-size: 12px; color: #888; font-weight: normal; margin-top: 5px;">实时热度</span></div>
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <div style="display: flex; gap: 10px;"><span style="color: #ff3b30; font-weight: bold; width: 20px;">1</span><div style="flex: 1;"><div style="font-size: 16px; font-weight: 500; color: #000;">林高远王曼昱 混双搭档</div><div style="font-size: 12px; color: #ff3b30;">热 · 1,245,678</div></div></div>
          <div style="display: flex; gap: 10px;"><span style="color: #ff9500; font-weight: bold; width: 20px;">2</span><div style="flex: 1;"><div style="font-size: 16px; font-weight: 500; color: #000;">王曼昱出发法国</div><div style="font-size: 12px; color: #ff9500;">热 · 987,654</div></div></div>
        </div>
      </div>
    </div>
  `;
  appView.classList.add('show');
}

function openCountdown() {
  showHint();
  const now = new Date();
  const target = new Date(now.getFullYear(), 10, 21);
  if (now > target) target.setFullYear(now.getFullYear() + 1);
  const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  appContent.innerHTML = `
    <div style="background: #000; height: 100%; padding: 20px; color: #fff; font-family: -apple-system, sans-serif; margin: -20px;">
      <div style="text-align: center; font-size: 24px; font-weight: bold; margin-bottom: 30px; margin-top: 40px;">倒数日</div>
      <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); border-radius: 20px; padding: 20px; text-align: center; color: #000; box-shadow: 0 10px 20px rgba(255,154,158,0.3);">
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 10px;">距离 混双决赛</div><div style="font-size: 64px; font-weight: bold; line-height: 1;">${diffDays}</div><div style="font-size: 14px; font-weight: 500; margin-top: 5px;">天</div><div style="font-size: 12px; opacity: 0.7; margin-top: 15px;">11月21日 · 记得看直播</div>
      </div>
    </div>
  `;
  appView.classList.add('show');
}

function openMusic() {
  showHint();
  appContent.innerHTML = `
    <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); height: 100%; margin: -20px; display: flex; flex-direction: column; align-items: center; padding: 40px 20px;">
      <div style="width: 100%; display: flex; justify-content: center; font-size: 12px; font-weight: 600; color: #888; margin-bottom: 30px; margin-top: 20px;">正在播放</div>
      <div style="width: 280px; height: 280px; border-radius: 10px; background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%); display: flex; justify-content: center; align-items: center; font-size: 80px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); margin-bottom: 40px;">🎵</div>
      <div style="text-align: center; margin-bottom: 30px;"><div style="font-size: 22px; font-weight: 600; color: #000; margin-bottom: 5px;">落在生命里的光</div><div style="font-size: 18px; color: #888;">圆圆满满粉丝歌单</div></div>
    </div>
  `;
  appView.classList.add('show');
}

function openCalculator() {
  showHint();
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
  if (val === 'C') { input.value = '0'; }
  else if (val === '=') {
    if (input.value === '5201314') { input.style.fontSize = '24px'; input.value = 'lgywawmy❤️wmywalgy'; setTimeout(() => { input.style.fontSize = '64px'; input.value = '0'; }, 3000); }
    else if (input.value === '0319') { input.style.fontSize = '32px'; input.value = '林高远生日快乐🎂'; setTimeout(() => { input.style.fontSize = '64px'; input.value = '0'; }, 3000); }
    else if (input.value === '0209') { input.style.fontSize = '32px'; input.value = '王曼昱生日快乐🎂'; setTimeout(() => { input.style.fontSize = '64px'; input.value = '0'; }, 3000); }
    else { try { input.value = eval(input.value); } catch { input.value = 'Error'; } }
  } else { if (input.value === '0' && val !== '.') input.value = val; else input.value += val; }
}

let currentCalYear = 2026; 
let currentCalMonth = 9; 
function openCalendar() { showHint(); renderCalendar(); appView.classList.add('show'); }
function renderCalendar() {
  const monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  const firstDay = new Date(currentCalYear, currentCalMonth, 1).getDay();
  const daysInMonth = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
  let daysHtml = '';
  for (let i = 0; i < firstDay; i++) { daysHtml += `<div></div>`; }
  
  for (let i = 1; i <= daysInMonth; i++) {
    let isToday = (i === 24 && currentCalMonth === 9 && currentCalYear === 2026) ? 'background:#ff3b30; color:#fff; border-radius:50%; width:30px; height:30px; display:flex; justify-content:center; align-items:center; margin:0 auto;' : '';
    daysHtml += `<div style="${isToday}">${i}</div>`;
  }
  
  appContent.innerHTML = `
    <div style="background: #fff; height: 100%; margin: -20px; padding: 20px; font-family: -apple-system, sans-serif; padding-top: 50px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;"><button onclick="changeMonth(-1)" style="border:none; background:none; font-size:20px; color:#007aff; cursor:pointer;">‹</button><div style="font-size: 24px; font-weight: bold;">${currentCalYear}年 ${monthNames[currentCalMonth]}</div><button onclick="changeMonth(1)" style="border:none; background:none; font-size:20px; color:#007aff; cursor:pointer;">›</button></div>
      <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; text-align: center; font-size: 15px; margin-bottom: 10px; color: #888;"><div>日</div><div>一</div><div>二</div><div>三</div><div>四</div><div>五</div><div>六</div></div>
      <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px; text-align: center; font-size: 17px;">${daysHtml}</div>
    </div>
  `;
}
function changeMonth(offset) {
  currentCalMonth += offset;
  if (currentCalMonth < 0) { currentCalMonth = 11; currentCalYear--; }
  if (currentCalMonth > 11) { currentCalMonth = 0; currentCalYear++; }
  renderCalendar();
}

function openXianyu() {
  showHint();
  appContent.innerHTML = `
    <div style="background: #f2f2f7; height: 100%; padding: 10px; font-family: -apple-system, sans-serif; margin: -20px; padding-top: 50px;">
      <div style="background: white; border-radius: 10px; padding: 10px; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;"><span style="color:#ffca28; font-weight:bold; font-size:18px;">闲鱼</span><div style="flex:1; background: #f2f2f7; border-radius: 6px; padding: 6px 10px; color: #888; font-size: 14px;">搜索：林高远 王曼昱 门票...</div></div>
      <div style="background: white; border-radius: 12px; padding: 15px; margin-bottom: 15px; display: flex; gap: 15px;"><div style="width: 80px; height: 80px; border-radius: 8px; background: linear-gradient(135deg, #a1c4fd, #c2e9fb); display: flex; align-items: center; justify-content: center; font-size: 30px;">🎫</div><div style="flex: 1;"><div style="font-size: 15px; font-weight: 500; color: #000; margin-bottom: 5px;">【出票】WTT法兰克福站 10.31 内场B区</div><div style="font-size: 12px; color: #888; margin-bottom: 5px;">原价出！临时去不了，含泪转给家人。</div><div style="font-size: 16px; color: #ff3b30; font-weight: bold;">¥ 888</div></div></div>
    </div>
  `;
  appView.classList.add('show');
}

// ====== 手勢返回 & 提示 ======
function checkMobile() {
  const phone = document.getElementById('phone');
  if (window.innerWidth <= 500) {
    phone.classList.add('mob');
  } else {
    phone.classList.remove('mob');
  }
}
window.addEventListener('resize', checkMobile);
setTimeout(checkMobile, 100);

function goHome() { closeApp(); }

let homeStartY = 0;
let edgeStartX = 0;

const homeIndicator = document.getElementById('homeIndicator');
const screenEl = document.querySelector('.screen');

if (homeIndicator) {
  homeIndicator.addEventListener('touchstart', e => { homeStartY = e.touches[0].clientY; }, { passive: true });
  homeIndicator.addEventListener('touchend', e => {
    const dy = e.changedTouches[0].clientY - homeStartY;
    if (dy < -20) {
      closeApp();
      const nc = document.getElementById('notificationCenter');
      if (nc) nc.classList.remove('show');
    }
  }, { passive: true });
  homeIndicator.addEventListener('mousedown', e => { homeStartY = e.clientY; });
  homeIndicator.addEventListener('mouseup', e => { 
    if (homeStartY - e.clientY > 20) {
      closeApp();
      const nc = document.getElementById('notificationCenter');
      if (nc) nc.classList.remove('show');
    } 
  });
}

if (screenEl) {
  screenEl.addEventListener('touchstart', e => {
    if (e.touches[0].clientX < 30) { edgeStartX = e.touches[0].clientX; } else { edgeStartX = null; }
  }, { passive: true });
  screenEl.addEventListener('touchend', e => {
    if (edgeStartX !== null) {
      const dx = e.changedTouches[0].clientX - edgeStartX;
      if (dx > 50) closeApp();
    }
  }, { passive: true });
}

function showHint() {
  const toast = document.getElementById('hintToast');
  // 確保元素存在，且本次 Refresh 未顯示過
  if (toast && !window.hasShownHint) {
    toast.style.opacity = '1';
    setTimeout(() => { 
      toast.style.opacity = '0'; 
      window.hasShownHint = true; // 標記為已顯示
    }, 2000);
  }
}

// 鎖屏滑動解鎖 & 點擊解鎖
let lockStartY = 0;
const lockScreenElement = document.getElementById('lockScreen');
if (lockScreenElement) {
  lockScreenElement.addEventListener('touchmove', e => { e.preventDefault(); }, { passive: false });
  lockScreenElement.addEventListener('touchstart', e => { lockStartY = e.touches[0].clientY; }, { passive: true });
  lockScreenElement.addEventListener('touchend', e => {
    const dy = e.changedTouches[0].clientY - lockStartY;
    if (dy < -20) showPasscode();
  });
  lockScreenElement.addEventListener('mousedown', e => { lockStartY = e.clientY; });
  lockScreenElement.addEventListener('mouseup', e => { if (e.clientY - lockStartY < -20) showPasscode(); });
  lockScreenElement.addEventListener('click', e => {
    if (e.target.closest('.lock-bottom') || e.target.closest('.lock-circle') || e.target.closest('.lock-notification')) return;
    showPasscode();
  });
}
const $ = (selector) => document.querySelector(selector);
let globalPassword = '000000';
const error = $('#error');

async function loadGlobalPassword() {
  try {
    const response = await fetch(`./password-config.json?refresh=${Date.now()}`, { cache: 'no-store' });
    const config = await response.json();
    if (response.ok && typeof config.password === 'string' && config.password) globalPassword = config.password;
  } catch {
    // 保留当前配置；部署刚完成时短暂的网络失败不影响初始密码使用。
  }
}

$('#loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const password = $('#password').value.trim();
  if (password === globalPassword) {
    $('#loginCard').classList.add('hidden');
    $('#reveal').classList.remove('hidden');
    error.textContent = '';
  } else {
    error.textContent = '答案似乎还差一点，再想想。';
    $('#password').animate([{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'translateX(0)'}], {duration:220});
  }
});

$('#togglePassword').addEventListener('click', () => {
  const input = $('#password');
  input.type = input.type === 'password' ? 'text' : 'password';
});

$('#back').addEventListener('click', () => {
  $('#reveal').classList.add('hidden');
  $('#loginCard').classList.remove('hidden');
  $('#password').value = '';
});

const dialog = $('#settingsDialog');
$('#settingsTrigger').addEventListener('click', () => {
  dialog.showModal();
});
$('#closeSettings').addEventListener('click', () => dialog.close());

loadGlobalPassword();

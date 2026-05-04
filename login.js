// js/login.js - Sistema de Login NutriMarket (Client-side)
document.addEventListener('DOMContentLoaded', function() {
  initLoginSystem();
});

function initLoginSystem() {
  atualizarNavbarAuth();
  configurarBotoesLogin();
}

function configurarBotoesLogin() {
  const loginBtns = document.querySelectorAll('.login-btn');
  const logoutBtns = document.querySelectorAll('.logout-btn');
  
  loginBtns.forEach(btn => {
    btn.addEventListener('click', mostrarLoginModal);
  });
  
  logoutBtns.forEach(btn => {
    btn.addEventListener('click', fazerLogout);
  });

  // Fechar modal clicando fora
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('login-modal')) {
      esconderLoginModal();
    }
  });
}

function mostrarLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.style.display = 'flex';
    document.getElementById('loginEmail').focus();
  }
}

function esconderLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.style.display = 'none';
}

function fazerLogin(email, senha) {
  // Credenciais demo
  const usuarios = {
    'cliente': { email: 'cliente@nutrimarket.com', senha: '123', nome: 'Cliente', role: 'user' },
    'admin': { email: 'admin@nutrimarket.com', senha: '123', nome: 'Admin', role: 'admin' }
  };

  if (usuarios[senha] && usuarios[senha].email === email) {
    const userData = usuarios[senha];
    localStorage.setItem('nutriAuth', JSON.stringify({
      loggedIn: true,
      user: userData.nome,
      email,
      role: userData.role,
      timestamp: Date.now()
    }));
    atualizarNavbarAuth();
    esconderLoginModal();
    
    // Redirecionar baseado no role
    setTimeout(() => {
      if (userData.role === 'admin') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'loja.html';
      }
    }, 800);
    
    mostrarAlert('Login realizado com sucesso! Redirecionando...', 'success');
    return true;
  }
  return false;
}

function fazerLogout() {
  localStorage.removeItem('nutriAuth');
  atualizarNavbarAuth();
  mostrarAlert('Logout realizado com sucesso!', 'success');
  window.location.href = 'index.html';
}

function atualizarNavbarAuth() {
  const auth = obterAuth();
  const loginItem = document.querySelector('.nav-auth-item');
  
  if (loginItem) {
    if (auth.loggedIn) {
      loginItem.innerHTML = `
        <li>
          <a href="#" class="logout-btn">
            <i class="fas fa-user"></i> ${auth.user} <i class="fas fa-sign-out-alt"></i>
          </a>
        </li>
      `;
    } else {
      loginItem.innerHTML = `
        <li>
          <a href="#" class="login-btn">
            <i class="fas fa-sign-in-alt"></i> Entrar
          </a>
        </li>
      `;
    }
    configurarBotoesLogin(); // Reconfigurar events
  }
  
  // Proteger páginas
  protegerPaginas(auth);
}

function protegerPaginas(auth) {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  if (!auth.loggedIn) {
    if (currentPath === 'admin.html') {
      mostrarAlert('Acesso restrito à área administrativa. Faça login como admin.', 'warning');
      setTimeout(() => window.location.href = 'index.html', 2000);
      return;
    }
    // Loja ok sem login, mas mostra msg
    if (currentPath === 'loja.html') {
      const titulo = document.querySelector('.section-title h2');
      if (titulo) {
        titulo.innerHTML += ' <span style="color:var(--text-muted);font-size:0.8em;">(Faça login para recomendações personalizadas)</span>';
      }
    }
  } else if (currentPath === 'loja.html' && auth.role === 'user') {
    // Bem-vindo usuário na loja
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle && !sectionTitle.querySelector('.welcome-user')) {
      const welcome = document.createElement('p');
      welcome.className = 'alert alert-success welcome-user';
      welcome.innerHTML = `<i class="fas fa-user-check"></i> Olá, <strong>${auth.user}</strong>! Bem-vindo de volta à nossa loja.`;
      sectionTitle.parentNode.insertBefore(welcome, sectionTitle.nextSibling);
    }
  }
}

function obterAuth() {
  try {
    const authStr = localStorage.getItem('nutriAuth');
    return authStr ? JSON.parse(authStr) : { loggedIn: false };
  } catch {
    return { loggedIn: false };
  }
}

function mostrarAlert(mensagem, tipo = 'info') {
  // Remove alert anterior
  const oldAlert = document.querySelector('.login-alert');
  if (oldAlert) oldAlert.remove();
  
  const alert = document.createElement('div');
  alert.className = `alert alert-${tipo} login-alert`;
  alert.innerHTML = `<i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i> ${mensagem}`;
  alert.style.cssText = 'position:fixed;top:20px;right:20px;z-index:10000;max-width:350px;';
  
  document.body.appendChild(alert);
  
  setTimeout(() => {
    alert.style.opacity = '0';
    setTimeout(() => alert.remove(), 300);
  }, 4000);
}

// Form submit handler (chamar no HTML)
function handleLoginForm(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;
  
  if (!email || !senha) {
    mostrarAlert('Preencha email e senha!', 'warning');
    return;
  }
  
  const sucesso = fazerLogin(email, senha);
  if (!sucesso) {
    mostrarAlert('Credenciais inválidas! Tente: cliente@nutrimarket.com / 123 ou admin@nutrimarket.com / 123', 'warning');
    document.getElementById('loginSenha').value = '';
    document.getElementById('loginSenha').focus();
  }
}

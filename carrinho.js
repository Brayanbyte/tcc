
function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('nutriCart')) || [];
  const count = carrinho.reduce((sum, item) => sum + item.qtd, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

function getCarrinho() {
  return JSON.parse(localStorage.getItem('nutriCart')) || [];
}

function salvarCarrinho(carrinho) {
  localStorage.setItem('nutriCart', JSON.stringify(carrinho));
}

function renderCarrinho() {
  const carrinho = getCarrinho();
  const tbody = document.getElementById('carrinhoBody');
  const vazio = document.getElementById('carrinhoVazio');
  const tabela = document.getElementById('carrinhoTable');
  const resumo = document.getElementById('resumoArea');

  if (carrinho.length === 0) {
    vazio.style.display = 'block';
    tabela.style.display = 'none';
    resumo.style.display = 'none';
    return;
  }

  vazio.style.display = 'none';
  tabela.style.display = 'table';
  resumo.style.display = 'block';

  let html = '';
  let subtotal = 0;

  carrinho.forEach(item => {
    const itemTotal = item.preco * item.qtd;
    subtotal += itemTotal;
    html += `
      <tr>
        <td data-label="Produto">
          <div style="display:flex; align-items:center; gap:15px;">
            <img src="${item.imagem}" alt="${item.nome}" onerror="this.src='https://via.placeholder.com/60?text=NK'">
            <span style="font-weight:600;">${item.nome}</span>
          </div>
        </td>
        <td data-label="Preço">R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
        <td data-label="Qtd">
          <div class="qty-control">
            <button class="qty-btn" onclick="alterarQtd(${item.id}, -1)">-</button>
            <span>${item.qtd}</span>
            <button class="qty-btn" onclick="alterarQtd(${item.id}, 1)">+</button>
          </div>
        </td>
        <td data-label="Subtotal"><strong>R$ ${itemTotal.toFixed(2).replace('.', ',')}</strong></td>
        <td>
          <button onclick="removerItem(${item.id})" style="background:none;border:none;color:#C62828;cursor:pointer;font-size:1.2rem;">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;

  const frete = subtotal > 200 ? 0 : 19.90;
  const total = subtotal + frete;

  document.getElementById('subtotalValor').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('freteValor').textContent = frete === 0 ? 'GRÁTIS' : `R$ ${frete.toFixed(2).replace('.', ',')}`;
  document.getElementById('totalValor').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function alterarQtd(id, delta) {
  let carrinho = getCarrinho();
  const item = carrinho.find(i => i.id === id);
  if (!item) return;

  item.qtd += delta;
  if (item.qtd <= 0) {
    carrinho = carrinho.filter(i => i.id !== id);
  }
  salvarCarrinho(carrinho);
  renderCarrinho();
  atualizarContadorCarrinho();
}

function removerItem(id) {
  let carrinho = getCarrinho();
  carrinho = carrinho.filter(i => i.id !== id);
  salvarCarrinho(carrinho);
  renderCarrinho();
  atualizarContadorCarrinho();
}

function finalizarCompra() {
  const carrinho = getCarrinho();
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  document.getElementById('checkoutForm').style.display = 'block';
  document.getElementById('checkoutForm').scrollIntoView({ behavior: 'smooth' });
}

function processarPagamento(e) {
  e.preventDefault();
  const carrinho = getCarrinho();
  if (carrinho.length === 0) return;

  const subtotal = carrinho.reduce((sum, item) => sum + (item.preco * item.qtd), 0);
  const frete = subtotal > 200 ? 0 : 19.90;
  const total = subtotal + frete;

  // Simulação de processamento
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
  btn.disabled = true;

  setTimeout(() => {
    alert(`Pagamento simulado com sucesso!\\n\\nValor total: R$ ${total.toFixed(2).replace('.', ',')}\\n\\nObrigado por comprar na NutriMarket!`);
    localStorage.removeItem('nutriCart');
    atualizarContadorCarrinho();
    window.location.href = 'index.html';
  }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
  atualizarContadorCarrinho();
  renderCarrinho();
});

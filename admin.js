
function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('nutriCart')) || [];
  const count = carrinho.reduce((sum, item) => sum + item.qtd, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

function getProdutos() {
  let produtos = localStorage.getItem('nutriProdutos');
  if (!produtos) {
    
    return [];
  }
  return JSON.parse(produtos);
}

function salvarProdutos(produtos) {
  localStorage.setItem('nutriProdutos', JSON.stringify(produtos));
}

function gerarId() {
  const produtos = getProdutos();
  return produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
}

function renderTabela() {
  const produtos = getProdutos();
  const tbody = document.getElementById('produtosTableBody');
  
  if (produtos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">
      Nenhum produto cadastrado. Adicione o primeiro acima!
    </td></tr>`;
    return;
  }

  tbody.innerHTML = produtos.map(p => `
    <tr>
      <td>${p.id}</td>
      <td><img src="${p.imagem}" style="width:50px; height:50px; object-fit:cover; border-radius:6px;" onerror="this.src='https://via.placeholder.com/50?text=NK'"></td>
      <td><strong>${p.nome}</strong></td>
      <td>${getCategoriaNome(p.categoria)}</td>
      <td>R$ ${p.preco.toFixed(2).replace('.', ',')}</td>
      <td>${p.objetivos.join(', ')}</td>
      <td>
        <button class="btn-edit" onclick="editarProduto(${p.id})"><i class="fas fa-edit"></i></button>
        <button class="btn-delete" onclick="excluirProduto(${p.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function getCategoriaNome(cat) {
  const nomes = { whey: 'Whey Protein', creatina: 'Creatina', 'pre-treino': 'Pré-treino', vitamina: 'Vitaminas' };
  return nomes[cat] || cat;
}

function salvarProduto(e) {
  e.preventDefault();
  
  const id = document.getElementById('produtoId').value;
  const produto = {
    id: id ? parseInt(id) : gerarId(),
    nome: document.getElementById('pNome').value,
    categoria: document.getElementById('pCategoria').value,
    preco: parseFloat(document.getElementById('pPreco').value),
    imagem: document.getElementById('pImagem').value,
    descricao: document.getElementById('pDescricao').value,
    objetivos: document.getElementById('pObjetivos').value.split(',').map(o => o.trim())
  };

  let produtos = getProdutos();
  
  if (id) {
    const idx = produtos.findIndex(p => p.id === parseInt(id));
    if (idx !== -1) produtos[idx] = produto;
  } else {
    produtos.push(produto);
  }

  salvarProdutos(produtos);
  limparForm();
  renderTabela();
  alert('Produto salvo com sucesso!');
}

function editarProduto(id) {
  const produtos = getProdutos();
  const p = produtos.find(prod => prod.id === id);
  if (!p) return;

  document.getElementById('produtoId').value = p.id;
  document.getElementById('pNome').value = p.nome;
  document.getElementById('pCategoria').value = p.categoria;
  document.getElementById('pPreco').value = p.preco;
  document.getElementById('pImagem').value = p.imagem;
  document.getElementById('pDescricao').value = p.descricao;
  document.getElementById('pObjetivos').value = p.objetivos.join(', ');

  document.getElementById('formTitle').innerHTML = '<i class="fas fa-edit"></i> Editar Produto';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function excluirProduto(id) {
  if (!confirm('Tem certeza que deseja excluir este produto?')) return;
  
  let produtos = getProdutos();
  produtos = produtos.filter(p => p.id !== id);
  salvarProdutos(produtos);
  renderTabela();
}

function limparForm() {
  document.getElementById('produtoForm').reset();
  document.getElementById('produtoId').value = '';
  document.getElementById('formTitle').innerHTML = '<i class="fas fa-plus"></i> Novo Produto';
}

document.addEventListener('DOMContentLoaded', function() {
  atualizarContadorCarrinho();
  renderTabela();
});

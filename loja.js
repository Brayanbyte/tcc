
const produtosPadrao = [
  {
    id: 1,
    nome: 'Whey Protein Isolado 900g',
    categoria: 'whey',
    preco: 189.90,
    imagem: 'https://lojamaxtitanium.vtexassets.com/arquivos/ids/157500/iso-whey-max-titanium-900g-morango-1.jpg?v=638348682213800000',
    descricao: 'Whey Protein Isolado de alta pureza. 27g de proteína por dose, zero lactose, baixo teor de gordura.',
    objetivos: ['ganho', 'manutencao', 'perda']
  },
  {
    id: 2,
    nome: 'Whey Protein Concentrado 1kg',
    categoria: 'whey',
    preco: 129.90,
    imagem: 'https://emporioquatroestrelas.vteximg.com.br/arquivos/ids/235114-1000-1000/100--Whey-Protein-Concentrado-Sorvete-de-Baunilha-1Kg-FTW-ProImagem-15906.jpg?v=638858509252900000',
    descricao: 'Whey Protein Concentrado com excelente custo-benefício. Ideal para ganho de massa muscular.',
    objetivos: ['ganho', 'manutencao']
  },
  {
    id: 3,
    nome: 'Whey Isolado Zero Lactose',
    categoria: 'whey',
    preco: 219.90,
    imagem: 'https://images.tcdn.com.br/img/img_prod/1104100/100_pure_whey_zero_lactose_pote_900g_probiotica_661_2_06c28bedf2a9969a0f46f91d4ad02a54.jpg',
    descricao: 'Perfeito para intolerantes à lactose. Proteína pura, rápida absorção, ideal para perda de peso.',
    objetivos: ['perda', 'manutencao']
  },
  {
    id: 4,
    nome: 'Creatina Monohidratada 300g',
    categoria: 'creatina',
    preco: 89.90,
    imagem: 'https://drogariasp.vteximg.com.br/arquivos/ids/1226653-1000-1000/887188---Creatina-Monohidratada-Integralmedica-300g-1.jpg.jpg?v=638828320189200000',
    descricao: 'Creatina 100% pura, micronizada. Aumenta força, potência e recuperação muscular.',
    objetivos: ['ganho']
  },
  {
    id: 5,
    nome: 'Creatina em Cápsulas 120caps',
    categoria: 'creatina',
    preco: 69.90,
    imagem: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400',
    descricao: 'Creatina em cápsulas para praticidade. Dose diária de 3g de creatina pura.',
    objetivos: ['ganho', 'manutencao']
  },
  {
    id: 6,
    nome: 'Pré-Treino Explosivo 300g',
    categoria: 'pre-treino',
    preco: 119.90,
    imagem: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400',
    descricao: 'Energia e foco máximos para seus treinos. Com cafeína, beta-alanina e citrulina.',
    objetivos: ['ganho', 'perda']
  },
  {
    id: 7,
    nome: 'Pré-Treino Natural',
    categoria: 'pre-treino',
    preco: 99.90,
    imagem: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=400',
    descricao: 'Pré-treino sem cafeína sintética. Energia natural com extratos de chá verde e guaraná.',
    objetivos: ['perda', 'manutencao']
  },
  {
    id: 8,
    nome: 'Multivitamínico Completo',
    categoria: 'vitamina',
    preco: 59.90,
    imagem: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    descricao: 'Fórmula completa com vitaminas A, B, C, D, E e minerais essenciais para saúde diária.',
    objetivos: ['perda', 'ganho', 'manutencao']
  },
  {
    id: 9,
    nome: 'Vitamina D3 + K2',
    categoria: 'vitamina',
    preco: 49.90,
    imagem: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400',
    descricao: 'Suplemento essencial para saúde óssea, imunidade e bem-estar geral.',
    objetivos: ['manutencao', 'ganho']
  },
  {
    id: 10,
    nome: 'Ômega 3 Ultra 1000mg',
    categoria: 'vitamina',
    preco: 79.90,
    imagem: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
    descricao: 'Óleo de peixe puro, rico em EPA e DHA. Anti-inflamatório natural para coração e cérebro.',
    objetivos: ['perda', 'manutencao', 'ganho']
  },
  {
    id: 11,
    nome: 'Termogênico Fat Burner',
    categoria: 'pre-treino',
    preco: 109.90,
    imagem: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400',
    descricao: 'Acelera o metabolismo e auxilia na queima de gordura. Com cafeína, chá verde e cromo.',
    objetivos: ['perda']
  },
  {
    id: 12,
    nome: 'Caseína Micelar 900g',
    categoria: 'whey',
    preco: 159.90,
    imagem: 'https://images.unsplash.com/photo-1599679258693-57e347982d62?w=400',
    descricao: 'Proteína de absorção lenta, ideal para tomar antes de dormir. Anti-catabolismo noturno.',
    objetivos: ['ganho']
  }
];

function getProdutos() {
  let produtos = localStorage.getItem('nutriProdutos');
  if (!produtos) {
    localStorage.setItem('nutriProdutos', JSON.stringify(produtosPadrao));
    return produtosPadrao;
  }
  return JSON.parse(produtos);
}

function getCategoriaNome(cat) {
  const nomes = { whey: 'Whey Protein', creatina: 'Creatina', 'pre-treino': 'Pré-treino', vitamina: 'Vitaminas' };
  return nomes[cat] || cat;
}

function renderProdutoCard(produto, isRecomendado = false) {
  return `
    <div class="product-wrapper">
      ${isRecomendado ? '<span class="recommended-badge"><i class="fas fa-star"></i> Recomendado</span>' : ''}
      <div class="product-card">
        <img src="${produto.imagem}" alt="${produto.nome}" class="product-image" onerror="this.src='https://via.placeholder.com/400x220?text=NutriMarket'">
        <div class="product-body">
          <div class="product-category">${getCategoriaNome(produto.categoria)}</div>
          <h4 class="product-title">${produto.nome}</h4>
          <p class="product-description">${produto.descricao}</p>
          <div class="product-price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
          <div class="product-actions">
            <button onclick="adicionarCarrinho(${produto.id})" class="btn btn-primary btn-sm">
              <i class="fas fa-cart-plus"></i>
            </button>
            <a href="carrinho.html" onclick="comprarAgora(${produto.id})" class="btn btn-accent btn-sm" style="text-decoration:none;">
              Comprar
            </a>
          </div>
      </div>
  `;
}

function filtrarProdutos() {
  const busca = document.getElementById('searchInput').value.toLowerCase();
  const categoria = document.getElementById('categoriaFilter').value;
  const precoOrdem = document.getElementById('precoFilter').value;

  let produtos = getProdutos();

  if (busca) {
    produtos = produtos.filter(p => p.nome.toLowerCase().includes(busca) || p.descricao.toLowerCase().includes(busca));
  }
  if (categoria) {
    produtos = produtos.filter(p => p.categoria === categoria);
  }
  if (precoOrdem === 'menor') {
    produtos.sort((a, b) => a.preco - b.preco);
  } else if (precoOrdem === 'maior') {
    produtos.sort((a, b) => b.preco - a.preco);
  }

  const grid = document.getElementById('produtosGrid');
  if (produtos.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);">
      <i class="fas fa-search" style="font-size:3rem; margin-bottom:15px;"></i>
      <p>Nenhum produto encontrado.</p>
    </div>`;
  } else {
    grid.innerHTML = produtos.map(p => renderProdutoCard(p)).join('');
  }
}

function adicionarCarrinho(produtoId) {
  const produtos = getProdutos();
  const produto = produtos.find(p => p.id === produtoId);
  if (!produto) return;

  let carrinho = JSON.parse(localStorage.getItem('nutriCart')) || [];
  const existente = carrinho.find(item => item.id === produtoId);
  if (existente) {
    existente.qtd++;
  } else {
    carrinho.push({ id: produto.id, nome: produto.nome, preco: produto.preco, imagem: produto.imagem, qtd: 1 });
  }
  localStorage.setItem('nutriCart', JSON.stringify(carrinho));
  atualizarContadorCarrinho();
  alert(`${produto.nome} adicionado ao carrinho!`);
}

function comprarAgora(produtoId) {
  const produtos = getProdutos();
  const produto = produtos.find(p => p.id === produtoId);
  if (!produto) return;
  let carrinho = [{ id: produto.id, nome: produto.nome, preco: produto.preco, imagem: produto.imagem, qtd: 1 }];
  localStorage.setItem('nutriCart', JSON.stringify(carrinho));
}

function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('nutriCart')) || [];
  const count = carrinho.reduce((sum, item) => sum + item.qtd, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

document.addEventListener('DOMContentLoaded', function() {
  atualizarContadorCarrinho();

  const user = JSON.parse(localStorage.getItem('nutriUser'));
  const produtos = getProdutos();

  if (user && user.objetivo) {
    const recomendados = produtos.filter(p => p.objetivos.includes(user.objetivo));
    if (recomendados.length > 0) {
      const recArea = document.getElementById('recomendadosArea');
      const recGrid = document.getElementById('recomendadosGrid');
      recArea.style.display = 'block';
      recGrid.innerHTML = recomendados.slice(0, 4).map(p => renderProdutoCard(p, true)).join('');
    }
  }

  filtrarProdutos();
});

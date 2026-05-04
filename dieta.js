

document.addEventListener('DOMContentLoaded', function() {
  atualizarContadorCarrinho();
  carregarPlano();
});

function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('nutriCart')) || [];
  const count = carrinho.reduce((sum, item) => sum + item.qtd, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

const planosAlimentares = {
  perda: {
    cafe: ['2 ovos cozidos', '1 fatia de pão integral', '1 xícara de café sem açúcar', '1 fatia de queijo branco'],
    lanche1: ['1 maçã', '10 castanhas-do-pará'],
    almoco: ['150g de peito de frango grelhado', 'Salada verde à vontade', '3 colheres de arroz integral', 'Feijão preto'],
    lanche2: ['1 iogurte natural desnatado', '1 colher de semente de chia'],
    jantar: ['Sopa de legumes', '1 filé de peixe grelhado (120g)', 'Salada de folhas'],
    ceia: ['Chá de camomila', '2 colheres de cottage']
  },
  ganho: {
    cafe: ['3 ovos mexidos', '2 fatias de pão integral com pasta de amendoim', '1 banana', '1 vitamina de whey protein'],
    lanche1: ['100g de frango desfiado', '1 batata doce média', '1 punhado de amendoim'],
    almoco: ['200g de carne vermelha magra', '5 colheres de arroz branco', 'Feijão', 'Legumes refogados', '1 colher de azeite'],
    lanche2: ['1 shake de whey protein com leite', '1 sanduíche de peito de peru'],
    jantar: ['150g de salmão', 'Purê de batata', 'Brócolis no vapor', '1 colher de azeite'],
    ceia: ['1 iogurte grego', '1 colher de mel', ' aveia']
  },
  manutencao: {
    cafe: ['1 ovo cozido', '2 fatias de pão integral', '1 fruta da estação', '1 xícara de café ou chá'],
    lanche1: ['1 punhado de nuts', '1 fruta'],
    almoco: ['120g de proteína (frango/peixe/carne)', '4 colheres de arroz integral', 'Feijão', 'Salada colorida', '1 colher de azeite'],
    lanche2: ['1 iogurte natural', '1 colher de granola'],
    jantar: ['Sopa de legumes', 'Omelete com 2 ovos e vegetais', 'Salada'],
    ceia: ['Chá verde', '1 fatia de queijo branco']
  }
};

function carregarPlano() {
  const user = JSON.parse(localStorage.getItem('nutriUser'));
  const container = document.getElementById('dietaContent');

  if (!user) {
    container.innerHTML = `
      <div class="alert alert-warning">
        <i class="fas fa-exclamation-circle"></i> Nenhum dado encontrado. 
        <a href="index.html" style="color:var(--dark-blue); font-weight:600;">Calcule seu IMC primeiro</a>.
      </div>
    `;
    return;
  }

  const objetivo = user.objetivo || 'manutencao';
  const plano = planosAlimentares[objetivo] || planosAlimentares.manutencao;

  const traducao = {
    cafe: 'Café da Manhã',
    lanche1: 'Lanche da Manhã',
    almoco: 'Almoço',
    lanche2: 'Lanche da Tarde',
    jantar: 'Jantar',
    ceia: 'Ceia'
  };

  const objetivoTexto = {
    perda: 'Perda de Peso',
    ganho: 'Ganho de Massa Muscular',
    manutencao: 'Manutenção e Saúde'
  };

  let html = `
    <div class="card fade-in" style="margin-bottom:30px; background: linear-gradient(135deg, #E8F5E9 0%, #E3F2FD 100%);">
      <h3 style="color:var(--dark-blue); margin-bottom:15px;">
        <i class="fas fa-user"></i> Perfil de ${user.nome}
      </h3>
      <div class="grid grid-3" style="gap:15px;">
        <div style="text-align:center; padding:15px; background:white; border-radius:8px;">
          <strong style="color:var(--primary-green); font-size:1.5rem;">${user.imc}</strong>
          <p style="color:var(--text-muted); font-size:0.9rem; margin:0;">IMC</p>
        </div>
        <div style="text-align:center; padding:15px; background:white; border-radius:8px;">
          <strong style="color:var(--primary-green); font-size:1.5rem;">${user.caloriasDiarias}</strong>
          <p style="color:var(--text-muted); font-size:0.9rem; margin:0;">kcal/dia</p>
        </div>
        <div style="text-align:center; padding:15px; background:white; border-radius:8px;">
          <strong style="color:var(--primary-green); font-size:1.5rem;">${objetivoTexto[objetivo]}</strong>
          <p style="color:var(--text-muted); font-size:0.9rem; margin:0;">Objetivo</p>
        </div>
    </div>
    <div style="margin-bottom:20px;">
      <h3 style="color:var(--dark-blue);">
        <i class="fas fa-calendar-day"></i> Plano Alimentar Diário
      </h3>
      <p style="color:var(--text-muted);">Meta calórica diária: <strong>${user.caloriasDiarias} kcal</strong></p>
    </div>
  `;

  for (const [refeicao, itens] of Object.entries(plano)) {
    html += `
      <div class="meal-card fade-in">
        <div class="meal-time">
          <i class="fas fa-utensil-spoon"></i> ${traducao[refeicao]}
        </div>
        <div class="meal-items">
          ${itens.map(item => `<div><i class="fas fa-check-circle" style="color:var(--primary-green); margin-right:8px;"></i>${item}</div>`).join('')}
        </div>
    `;
  }

  html += `
    <div class="alert alert-info" style="margin-top:20px;">
      <strong><i class="fas fa-info-circle"></i> Importante:</strong> 
      Este é um plano básico de referência. Consulte um nutricionista para um plano completamente personalizado às suas necessidades.
    </div>
  `;

  container.innerHTML = html;
}

function gerarPDF() {
  const user = JSON.parse(localStorage.getItem('nutriUser'));
  if (!user) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFillColor(46, 125, 50);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('NutriMarket', 105, 20, { align: 'center' });
  doc.setFontSize(14);
  doc.text('Plano Alimentar Personalizado', 105, 32, { align: 'center' });

  doc.setTextColor(33, 33, 33);
  doc.setFontSize(12);
  let y = 55;
  doc.setFont(undefined, 'bold');
  doc.text(`Paciente: ${user.nome}`, 20, y);
  y += 8;
  doc.setFont(undefined, 'normal');
  doc.text(`IMC: ${user.imc}  |  Classificação: ${user.classificacao}`, 20, y);
  y += 8;
  doc.text(`Meta Calórica: ${user.caloriasDiarias} kcal/dia`, 20, y);
  y += 15;

  const objetivo = user.objetivo || 'manutencao';
  const plano = planosAlimentares[objetivo] || planosAlimentares.manutencao;
  const traducao = {
    cafe: 'Café da Manhã',
    lanche1: 'Lanche da Manhã',
    almoco: 'Almoço',
    lanche2: 'Lanche da Tarde',
    jantar: 'Jantar',
    ceia: 'Ceia'
  };

  for (const [refeicao, itens] of Object.entries(plano)) {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    doc.setFont(undefined, 'bold');
    doc.setTextColor(26, 35, 126);
    doc.text(traducao[refeicao], 20, y);
    y += 8;
    doc.setFont(undefined, 'normal');
    doc.setTextColor(33, 33, 33);
    itens.forEach(item => {
      doc.text(`  • ${item}`, 20, y);
      y += 6;
    });
    y += 8;
  }

  doc.setFontSize(10);
  doc.setTextColor(117, 117, 117);
  doc.text('Este plano é de caráter informativo. Consulte um nutricionista.', 105, 285, { align: 'center' });
  doc.text('NutriMarket - www.nutrimarket.com.br', 105, 290, { align: 'center' });

  doc.save(`Plano_Alimentar_${user.nome.replace(/\s+/g, '_')}.pdf`);
}

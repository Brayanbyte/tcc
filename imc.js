
function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('nutriCart')) || [];
  const count = carrinho.reduce((sum, item) => sum + item.qtd, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

function classificarIMC(imc) {
  if (imc < 18.5) return { class: 'Abaixo do Peso', cor: 'alert-warning', emoji: '⚠️' };
  if (imc < 24.9) return { class: 'Peso Normal', cor: 'alert-success', emoji: '✅' };
  if (imc < 29.9) return { class: 'Sobrepeso', cor: 'alert-warning', emoji: '⚠️' };
  return { class: 'Obesidade', cor: 'alert-warning', emoji: '⚠️' };
}

function getRecomendacao(objetivo, imc) {
  const recs = {
    perda: {
      titulo: 'Perda de Peso',
      calorias: '1.200 - 1.500 kcal/dia',
      foco: 'Déficit calórico moderado com alto consumo de proteínas e fibras.',
      dicas: [
        'Priorize alimentos ricos em proteína para preservar massa muscular',
        'Consuma bastante vegetais e fibras para saciedade',
        'Evite açúcares refinados e ultraprocessados',
        'Faça atividade física regular (mín. 150 min/semana)'
      ]
    },
    ganho: {
      titulo: 'Ganho de Massa Muscular',
      calorias: '2.500 - 3.000+ kcal/dia',
      foco: 'Superávit calórico controlado com ênfase em proteínas e carboidratos complexos.',
      dicas: [
        'Consuma proteína em todas as refeições (1.6-2.2g/kg)',
        'Carboidratos complexos antes e depois do treino',
        'Não pule refeições - coma a cada 3-4 horas',
        'Priorize treinos de força progressivos'
      ]
    },
    manutencao: {
      titulo: 'Manutenção e Saúde',
      calorias: '2.000 - 2.200 kcal/dia',
      foco: 'Equilíbrio nutricional com variedade de alimentos e micronutrientes.',
      dicas: [
        'Mantenha uma dieta variada e colorida',
        'Hidrate-se com no mínimo 2L de água por dia',
        'Durma 7-9 horas por noite',
        'Pratique atividades físicas que você goste'
      ]
    }
  };
  return recs[objetivo] || recs.manutencao;
}

function calcularTMB(peso, altura, idade, sexo) {
  if (sexo === 'M') {
    return (10 * peso) + (6.25 * altura * 100) - (5 * idade) + 5;
  } else {
    return (10 * peso) + (6.25 * altura * 100) - (5 * idade) - 161;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  atualizarContadorCarrinho();

  const form = document.getElementById('imcForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const idade = parseInt(document.getElementById('idade').value);
    const sexo = document.getElementById('sexo').value;
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const objetivo = document.getElementById('objetivo').value;

  
    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(1);

    const classificacao = classificarIMC(imc);
    const recomendacao = getRecomendacao(objetivo, imc);
    const tmb = calcularTMB(peso, altura, idade, sexo);

    let caloriasDiarias = tmb;
    if (objetivo === 'perda') caloriasDiarias *= 0.85;
    else if (objetivo === 'ganho') caloriasDiarias *= 1.20;
    else caloriasDiarias *= 1.10;

    const userProfile = {
      nome,
      idade,
      sexo,
      peso,
      altura,
      objetivo,
      imc: imcFormatado,
      classificacao: classificacao.class,
      caloriasDiarias: Math.round(caloriasDiarias),
      tmb: Math.round(tmb)
    };
    localStorage.setItem('nutriUser', JSON.stringify(userProfile));

    const resultadoArea = document.getElementById('resultadoArea');
    const resultadoDiv = document.getElementById('imcResultado');

    resultadoDiv.innerHTML = `
      <div class="alert ${classificacao.cor}">
        <strong>${classificacao.emoji} Seu IMC: ${imcFormatado}</strong><br>
        Classificação: ${classificacao.class}
      </div>
      <div style="margin-top:20px;">
        <p><strong>Olá, ${nome}!</strong></p>
        <p style="margin:10px 0; color:var(--text-muted);">
          Para seu objetivo de <strong style="color:var(--primary-green);">${recomendacao.titulo}</strong>, 
          recomendamos uma ingestão diária de aproximadamente <strong>${recomendacao.calorias}</strong>.
        </p>
        <div style="background:var(--bg-light); padding:15px; border-radius:8px; margin:15px 0;">
          <strong>Foco nutricional:</strong>
          <p style="margin-top:5px; color:var(--text-muted);">${recomendacao.foco}</p>
        </div>
        <div style="margin-top:15px;">
          <strong><i class="fas fa-lightbulb" style="color:var(--accent-orange);"></i> Dicas Importantes:</strong>
          <ul style="margin-top:10px; padding-left:20px; color:var(--text-muted);">
            ${recomendacao.dicas.map(d => `<li style="margin-bottom:5px;">${d}</li>`).join('')}
          </ul>
        </div>
        <div style="margin-top:15px; padding:15px; background:#E3F2FD; border-radius:8px;">
          <strong><i class="fas fa-fire"></i> Sua Taxa Metabólica Basal (TMB):</strong> ${Math.round(tmb)} kcal/dia<br>
          <strong><i class="fas fa-bullseye"></i> Meta Calórica Diária:</strong> ${Math.round(caloriasDiarias)} kcal/dia
        </div>
    `;

    resultadoArea.style.display = 'block';
    document.getElementById('resultadoCard').scrollIntoView({ behavior: 'smooth' });
  });
});

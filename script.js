// 1. Sistema de Navegação entre Abas (SPA)
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page');
        switchPage(targetPage);
    });
});

function switchPage(pageId) {
    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if(activeLink) activeLink.classList.add('active');
}

// 2. Renderização de Gráficos (Chart.js)
document.addEventListener("DOMContentLoaded", () => {
    // Gráfico de Linhas - PIB
    const ctxPib = document.getElementById('pibChart').getContext('2d');
    new Chart(ctxPib, {
        type: 'line',
        data: {
            labels: ['2021', '2022', '2023', '2024', '2025', '2026 (Proj.)'],
            datasets: [{
                label: 'PIB do Agro (R$ Trilhões)',
                data: [2.3, 2.5, 2.62, 2.58, 2.65, 2.8],
                borderColor: '#2c5e3b',
                backgroundColor: 'rgba(44, 94, 59, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: { responsive: true }
    });

    // Gráfico de Rosca - Exportações
    const ctxPizza = document.getElementById('pizzaChart').getContext('2d');
    new Chart(ctxPizza, {
        type: 'doughnut',
        data: {
            labels: ['Complexo Soja', 'Carnes', 'Setor Sucroenergético', 'Produtos Florestais', 'Outros'],
            datasets: [{
                data: [45, 16, 10, 9, 20],
                backgroundColor: ['#2c5e3b', '#8da254', '#d4a373', '#a3b18a', '#ccc']
            }]
        },
        options: { responsive: true }
    });
});

// 3. Lógica da Calculadora / Simulador Econômico
function calcularRetorno() {
    const cultura = document.getElementById('cultura').value;
    const area = parseFloat(document.getElementById('area').value);
    const produtividade = parseFloat(document.getElementById('produtividade').value);
    
    // Preços fictícios médios simulados por saca/arroba
    const precos = {
        soja: 135.00,
        milho: 60.00,
        algodao: 145.00
    };

    if (isNaN(area) || isNaN(produtividade) || area <= 0 || produtividade <= 0) {
        alert("Por favor, insira valores válidos.");
        return;
    }

    const producaoTotal = area * produtividade;
    const receitaBruta = producaoTotal * precos[cultura];

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = `
        <h3>Resultado da Estimativa:</h3>
        <p><strong>Produção Total Esperada:</strong> ${producaoTotal.toLocaleString('pt-BR')} ${cultura === 'algodao' ? 'Arrobas' : 'Sacas'}</p>
        <p><strong>Preço Médio Estimado:</strong> R$ ${precos[cultura].toFixed(2)} por unidade</p>
        <hr style="margin: 10px 0; border: 0; border-top: 1px solid #ccc;">
        <p style="font-size: 1.2rem; color: #2c5e3b;"><strong>Receita Bruta Estimada:</strong> R$ ${receitaBruta.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <small style="color: #666;">*Nota: Este é um cálculo hipotético e não desconta custos operacionais, frete e impostos.</small>
    `;
}

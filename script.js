document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function() {
        document.querySelector('nav a.active').classList.remove('active');
        this.classList.add('active');
    });
});


const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null, // Usa a viewport como root
    rootMargin: '-30% 0px', // Ativa a bolinha quando a seção estiver 30% visível
    threshold: 0.5 // Ativa a bolinha quando 50% da seção estiver visível
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetId = entry.target.id;
            dots.forEach(dot => dot.classList.toggle('active', dot.dataset.target === targetId));
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const targetId = dot.dataset.target;
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Efeito de fade no scroll da seção #quem-somos


const quemSomos = document.getElementById('quem-somos');
const fadeStart = quemSomos.offsetTop + quemSomos.offsetHeight * 0.2;
const fadeEnd = quemSomos.offsetTop + quemSomos.offsetHeight * 0.8;

window.addEventListener('scroll', () => {
  if (quemSomos) {
    const scrollPosition = window.scrollY;
    if (scrollPosition >= fadeStart && scrollPosition <= fadeEnd) {
      const opacity = 1 - ((scrollPosition - fadeStart) / (fadeEnd - fadeStart));
      quemSomos.style.opacity = opacity;
    } else if (scrollPosition < fadeStart) {
      quemSomos.style.opacity = 1;
    } else {
      quemSomos.style.opacity = 0;
    }
  }
});


const servicoItems = document.querySelectorAll('.servico-item');

servicoItems.forEach(item => {
  item.addEventListener('mouseover', () => {
    item.style.border = '2px solid #D4AF37'; // Borda dourada ao passar o mouse
  });

  item.addEventListener('mouseout', () => {
    item.style.border = '2px solid transparent'; // Borda transparente ao tirar o mouse
  });
});



// Função para gerar os horários
function gerarHorarios(inicio, fim) {
    const horarios = [];
    let [horaAtual, minutoAtual] = inicio.split(':').map(Number);
    const [horaFim, minutoFim] = fim.split(':').map(Number);

    while (horaAtual < horaFim || (horaAtual === horaFim && minutoAtual <= minutoFim)) { 
        horarios.push(`${horaAtual.toString().padStart(2, '0')}:${minutoAtual.toString().padStart(2, '0')}`);
        minutoAtual += 30;
        if (minutoAtual >= 60) {
            minutoAtual = 0;
            horaAtual++;
        }
    }
    return horarios;
}


const horarios = gerarHorarios('09:00', '17:30');


const tbody = calendario.querySelector('tbody');

// Cria as linhas da tabela com os horários

horarios.forEach((horario, index) => {
  const row = tbody.insertRow();
  const horarioCell = row.insertCell();
  horarioCell.classList.add('horario');
  horarioCell.textContent = horario;

  // Adiciona os slots para os dias da semana (segunda a sábado)
  for (let i = 0; i < 6; i++) {
    const slotCell = row.insertCell();
    slotCell.classList.add('slot');
    slotCell.textContent = 'Livre';

    slotCell.addEventListener('click', () => {
      slotCell.classList.toggle('reserved');
      slotCell.textContent = slotCell.classList.contains('reserved') ? 'Reservado' : 'Livre';
    });
  }
});



// ACESSA OS ELEMENTOS DO DOM DO BTN-CALENDAR QUE ESTÁ MINIMIZADO E EXPANDE-O CONFORME AS NECESSIDADES 


document.addEventListener('DOMContentLoaded', function() {
  const expandBtn = document.getElementById('expand-calendar-btn');
  const calendar = document.getElementById('calendar');

  expandBtn.addEventListener('click', function() {
    if (calendar.classList.contains('minimized')) {
      calendar.classList.remove('minimized');
      calendar.classList.add('expanded');
      expandBtn.textContent = 'Minimizar Calendário';
    } else {
      calendar.classList.remove('expanded');
      calendar.classList.add('minimized');
      expandBtn.textContent = 'Expandir Calendário';
    }
  });
});




// Obtém todas as células de horário
const slots = document.querySelectorAll('.slot');

// Adiciona um evento de clique para cada célula de horário
slots.forEach(slot => {
    slot.addEventListener('click', () => {
        // Verifica se a célula já está reservada
        if (slot.classList.contains('reserved')) {
            // Se estiver reservada, muda a cor de fundo para vermelho claro
            slot.style.backgroundColor = '#ffb3b3';
        } else {
            // Caso contrário, retorna à cor padrão
            slot.style.backgroundColor = '';
        }
    });
});


    // EFEITO NO PERGAMINHO DO SITE






const servicoItems = document.querySelectorAll('.servico-item');
const pergaminhoContainer = document.getElementById('pergaminho-container');

servicoItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.opacity = '0.7';
    item.style.transform = 'scale(1.05)';
  });

  item.addEventListener('mouseleave', () => {
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
  });

  item.addEventListener('click', () => {
    const pergaminho = document.createElement('div');
    pergaminho.classList.add('pergaminho');
    pergaminho.innerHTML = `
      <span class="fechar-pergaminho">X</span>
      ${item.querySelector('.servico-descricao').innerHTML}
    `;
    pergaminhoContainer.appendChild(pergaminho);

// Verifica se já existe um pergaminho aberto

  const pergaminhoExistente = pergaminhoContainer.querySelector('.pergaminho');
  if (pergaminhoExistente) {
    pergaminhoExistente.remove(); // Remove o pergaminho anterior se existir
  }
  
    pergaminhoContainer.appendChild(pergaminho);

    // Posicionamento e animação do pergaminho
    const rect = item.getBoundingClientRect();
    pergaminho.style.top = `${rect.top + window.scrollY}px`;
    pergaminho.style.left = `${rect.left + window.scrollX}px`;

    setTimeout(() => {
      pergaminho.style.opacity = '1';
      pergaminho.style.transform = 'translate(-50%, -50%) scale(1.2)'; // Centraliza e aumenta
    }, 50); // Pequeno atraso para a animação fluir

    // Fechar pergaminho ao clicar no "X"
    pergaminho.querySelector('.fechar-pergaminho').addEventListener('click', () => {
      pergaminho.style.opacity = '0';
      pergaminho.style.transform = 'translate(-50%, -50%) scale(0.8)'; // Diminui antes de remover
      setTimeout(() => pergaminho.remove(), 500); // Remove após a animação de fechamento
    });
  });
});


/* ============================================== */
/* JAVASCRIPT DA LANDING PAGE OSLO                */
/* Menu mobile, animações, countdown e formulário */
/* ============================================== */

const WHATSAPP_NUMERO = '5521976865742';
const DEADLINE_NR1 = new Date('2026-05-26T00:00:00-03:00');

const btnHamburguer = document.getElementById('btnHamburguer');
const menuNav = document.getElementById('menuNav');
const cabecalho = document.getElementById('cabecalho');
const formContato = document.getElementById('formContato');
const formErro = document.getElementById('formErro');
const contadorDias = document.getElementById('days');

if (btnHamburguer && menuNav) {
  btnHamburguer.addEventListener('click', function () {
    btnHamburguer.classList.toggle('ativo');
    menuNav.classList.toggle('ativo');
  });

  menuNav.querySelectorAll('.cabecalho__link').forEach(function (link) {
    link.addEventListener('click', function () {
      btnHamburguer.classList.remove('ativo');
      menuNav.classList.remove('ativo');
    });
  });
}

if (cabecalho) {
  window.addEventListener('scroll', function () {
    cabecalho.classList.toggle('cabecalho--rolou', window.scrollY > 50);
  });
}

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (evento) {
    const destino = this.getAttribute('href');

    if (!destino || destino === '#') {
      return;
    }

    const elementoDestino = document.querySelector(destino);
    if (!elementoDestino) {
      return;
    }

    evento.preventDefault();

    window.scrollTo({
      top: elementoDestino.offsetTop - 80,
      behavior: 'smooth',
    });
  });
});

const elementosParaAnimar = document.querySelectorAll('[data-animar]');

if (elementosParaAnimar.length) {
  const observador = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  elementosParaAnimar.forEach(function (elemento) {
    observador.observe(elemento);
  });
}

document.querySelectorAll('.problema__cartao').forEach(function (cartao, indice) {
  cartao.style.transitionDelay = indice * 120 + 'ms';
});

document.querySelectorAll('.solucao__etapa, .solucao__seta').forEach(function (etapa, indice) {
  etapa.style.transitionDelay = indice * 120 + 'ms';
});

document.querySelectorAll('.beneficios__item').forEach(function (item, indice) {
  item.style.transitionDelay = indice * 100 + 'ms';
});

document.querySelectorAll('.faq__item').forEach(function (item, indice) {
  item.style.transitionDelay = indice * 90 + 'ms';
});

function atualizarCountdown() {
  if (!contadorDias) {
    return;
  }

  const agora = new Date();
  const diferenca = DEADLINE_NR1 - agora;
  const dias = Math.max(0, Math.ceil(diferenca / (1000 * 60 * 60 * 24)));
  contadorDias.textContent = dias;
}

window.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.hero [data-animar]').forEach(function (elemento, indice) {
    setTimeout(function () {
      elemento.classList.add('visivel');
    }, 180 + indice * 160);
  });

  atualizarCountdown();
  window.setInterval(atualizarCountdown, 1000 * 60 * 60);
});

const campoCnpj = document.getElementById('campoCnpj');
if (campoCnpj) {
  campoCnpj.addEventListener('input', function () {
    const apenasDigitos = campoCnpj.value.replace(/\D/g, '').slice(0, 14);
    let formatado = apenasDigitos;
    if (apenasDigitos.length > 12) {
      formatado = apenasDigitos.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2}).*/, '$1.$2.$3/$4-$5');
    } else if (apenasDigitos.length > 8) {
      formatado = apenasDigitos.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4}).*/, '$1.$2.$3/$4');
    } else if (apenasDigitos.length > 5) {
      formatado = apenasDigitos.replace(/^(\d{2})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
    } else if (apenasDigitos.length > 2) {
      formatado = apenasDigitos.replace(/^(\d{2})(\d{0,3}).*/, '$1.$2');
    }
    campoCnpj.value = formatado;
  });
}

if (formContato && formErro) {
  formContato.addEventListener('submit', function (evento) {
    evento.preventDefault();

    if (!formContato.checkValidity()) {
      formErro.hidden = false;
      formErro.textContent = 'Preencha os campos obrigatórios para continuar.';
      formContato.reportValidity();
      return;
    }

    formErro.hidden = true;
    formErro.textContent = '';

    const obterValor = function (campo) {
      return formContato.elements[campo] ? formContato.elements[campo].value.trim() : '';
    };

    const dados = {
      nome: obterValor('nome'),
      email: obterValor('email'),
      telefone: obterValor('telefone'),
      bairro: obterValor('bairro'),
      assunto: obterValor('assunto'),
      possuiCnpj: obterValor('possuiCnpj'),
      cnpj: obterValor('cnpj'),
      colaboradores: obterValor('colaboradores'),
      mensagem: obterValor('mensagem'),
    };

    if (!/^\d{10,15}$/.test(WHATSAPP_NUMERO)) {
      formErro.hidden = false;
      formErro.textContent = 'WhatsApp ainda não configurado corretamente.';
      return;
    }

    const linhas = [
      'Olá! Vim pela landing page da Oslo e quero falar com um especialista.',
      '',
      '*Nome:* ' + dados.nome,
      '*E-mail:* ' + dados.email,
      '*Telefone:* ' + dados.telefone,
      '*Bairro:* ' + (dados.bairro || 'Não informado'),
      '*Assunto:* ' + (dados.assunto || 'Não informado'),
      '*Possui CNPJ:* ' + (dados.possuiCnpj || 'Não informado'),
    ];

    if (dados.cnpj) {
      linhas.push('*CNPJ:* ' + dados.cnpj);
    }

    linhas.push('*Nº de colaboradores:* ' + (dados.colaboradores || 'Não informado'));

    if (dados.mensagem) {
      linhas.push('*Mensagem:* ' + dados.mensagem);
    }

    const url =
      'https://wa.me/' +
      WHATSAPP_NUMERO +
      '?text=' +
      encodeURIComponent(linhas.join('\n'));

    window.open(url, '_blank', 'noopener');
    formContato.reset();
  });
}

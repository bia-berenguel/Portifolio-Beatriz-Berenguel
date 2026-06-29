/**
 * script.js - Interações do portfólio
 * JavaScript puro (sem frameworks ou bibliotecas)
 */

/* =============================================
   MENU MOBILE RESPONSIVO
   Abre/fecha o menu em telas pequenas
   ============================================= */
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');
const navLinks = document.querySelectorAll('.nav__link');

menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('open');
    navList.classList.toggle('open');
});

// Fecha o menu ao clicar em um link (mobile)
navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        menuToggle.classList.remove('open');
        navList.classList.remove('open');
    });
});

/* =============================================
   DESTAQUE DO LINK ATIVO NO MENU
   Marca a seção visível conforme o scroll
   ============================================= */
const sections = document.querySelectorAll('.section');

function highlightActiveLink() {
    let current = '';

    sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

/* =============================================
   ALTERNÂNCIA DE TEMA CLARO / ESCURO
   Salva preferência no localStorage
   ============================================= */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function applyTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
    }
}

// Restaura tema salvo ao carregar a página
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    applyTheme(true);
}

themeToggle.addEventListener('click', function () {
    const isDark = !body.classList.contains('dark-theme');
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* =============================================
   VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   Verifica campos obrigatórios e formato de e-mail
   ============================================= */
const contactForm = document.getElementById('contact-form');
const successModal = document.getElementById('success-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

/**
 * Valida se o e-mail possui formato correto (usuario@dominio.com)
 * @param {string} email - Endereço de e-mail informado
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Exibe mensagem de erro abaixo do campo
 * @param {string} fieldId - ID do campo com erro
 * @param {string} message - Texto da mensagem de erro
 */
function showError(fieldId, message) {
    const errorElement = document.getElementById('error-' + fieldId);
    const inputElement = document.getElementById(fieldId);
    errorElement.textContent = message;
    inputElement.classList.add('form-input--error');
}

/** Limpa todas as mensagens de erro do formulário */
function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    const inputElements = document.querySelectorAll('.form-input');

    errorElements.forEach(function (el) {
        el.textContent = '';
    });

    inputElements.forEach(function (el) {
        el.classList.remove('form-input--error');
    });
}

/** Abre o modal de confirmação de envio */
function openModal() {
    successModal.classList.add('open');
    successModal.setAttribute('aria-hidden', 'false');
}

/** Fecha o modal de confirmação */
function closeModal() {
    successModal.classList.remove('open');
    successModal.setAttribute('aria-hidden', 'true');
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Envio do formulário com validação
contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    clearErrors();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    let isValid = true;

    // Validação: nome obrigatório
    if (nome === '') {
        showError('nome', 'Por favor, informe seu nome.');
        isValid = false;
    }

    // Validação: e-mail obrigatório e com formato válido
    if (email === '') {
        showError('email', 'Por favor, informe seu e-mail.');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Informe um e-mail válido (ex: usuario@dominio.com).');
        isValid = false;
    }

    // Validação: mensagem obrigatória
    if (mensagem === '') {
        showError('mensagem', 'Por favor, escreva uma mensagem.');
        isValid = false;
    }

    if (isValid) {
        // Simulação de envio: limpa campos e exibe confirmação
        contactForm.reset();
        openModal();
    }
});

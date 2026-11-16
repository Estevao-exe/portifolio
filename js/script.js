
"use strict";

// 1. ELEMENTOS DO HTML

// Seleciona o botão de idioma.
const languageButton = document.querySelector("#language-toggle");

// Seleciona todos os elementos que possuem data-i18n.
const translatableElements = document.querySelectorAll("[data-i18n]");

// Seleciona as seções que receberão animações.
const revealElements = document.querySelectorAll(
    ".about, .projects, .project-card, .skills, .contact"
);

// Elementos do menu mobile.
const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#navigation");

revealElements.forEach(function (element) {
    element.classList.add("reveal");
});

// 2. TRADUÇÕES DO PORTFÓLIO

const translations = {

    pt: {
        navHome: "Início",
        navAbout: "Sobre",
        navProjects: "Projetos",
        navSkills: "Habilidades",
        navContact: "Contato",

        greeting: "Olá, seja bem-vindo!",
        heroNamePrefix: "Eu sou",
        description: "Desenvolvedor em formação e estudante de Ciência da Computação.",
        heroText: "Sou um desenvolvedor em formação, interessado em tecnologia e programação. Estou sempre em busca de novos desafios e oportunidades para aprimorar minhas habilidades e contribuir para projetos inovadores, e gosto de desenvolver jogos também.",

        heroProjectsButton: "Meus Projetos",
        heroAboutButton: "Sobre Mim",

        characterTitle: "Personagem Pixel Art",
        comingSoon: "Em breve...",

        aboutTitle: "Sobre mim",
        aboutText: "Sou estudante de Ciência da Computação e estou desenvolvendo minhas habilidades em programação. Gosto de aprender criando projetos, experimentar ideias e entender como as coisas funcionam por trás do código.",

        projectsTitle: "Meus Projetos",
        projectsIntro: "Projetos pessoais e experimentais que fazem parte da minha jornada de aprendizado em programação.",

        gameTitle: "Meu Jogo",
        gameDescription: "Projeto de desenvolvimento de um jogo 2D utilizando Godot e GDScript.",
        githubProjectLink: "Ver no GitHub ↗",

        algorithmDescription: "Projeto experimental para estudar algoritmos, lógica de programação e C#.",
        projectStatus: "Em desenvolvimento",

        skillsTitle: "Habilidades e tecnologias",
        skillsIntro: "Ferramentas e linguagens que estou estudando e utilizando nos meus projetos.",

        contactTitle: "Vamos conversar?",
        contactText: "Você pode conhecer meus projetos e acompanhar minha evolução pelo GitHub.",
        githubProfileLink: "Meu GitHub ↗",

        footerText: "© 2026 Estevão Figueiredo Garcia. Todos os direitos reservados."
    },

    en: {
        navHome: "Home",
        navAbout: "About",
        navProjects: "Projects",
        navSkills: "Skills",
        navContact: "Contact",

        greeting: "Hello, welcome!",
        heroNamePrefix: "I'm",
        description: "Developer in training and Computer Science student.",
        heroText: "I'm a developer in training, interested in technology and programming. I'm always looking for new challenges and opportunities to improve my skills and contribute to innovative projects. I also enjoy game development.",

        heroProjectsButton: "My Projects",
        heroAboutButton: "About Me",

        characterTitle: "Pixel Art Character",
        comingSoon: "Coming soon...",

        aboutTitle: "About me",
        aboutText: "I'm a Computer Science student developing my programming skills. I enjoy learning by creating projects, experimenting with ideas, and understanding how things work behind the code.",

        projectsTitle: "My Projects",
        projectsIntro: "Personal and experimental projects that are part of my programming learning journey.",

        gameTitle: "My Game",
        gameDescription: "A 2D game development project using Godot and GDScript.",
        githubProjectLink: "View on GitHub ↗",

        algorithmDescription: "An experimental project to study algorithms, programming logic, and C#.",
        projectStatus: "In development",

        skillsTitle: "Skills and technologies",
        skillsIntro: "Tools and programming languages I'm studying and using in my projects.",

        contactTitle: "Let's talk?",
        contactText: "You can explore my projects and follow my progress on GitHub.",
        githubProfileLink: "My GitHub ↗",

        footerText: "© 2026 Estevão Figueiredo Garcia. All rights reserved."
    }

};


// 3. IDIOMA ATUAL

let currentLanguage = "pt";


// 4. FUNÇÃO PARA ALTERAR O IDIOMA


function changeLanguage(language) {

    translatableElements.forEach(function (element) {

        const key = element.dataset.i18n;

        element.textContent = translations[language][key];

    });

    currentLanguage = language;
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";

    languageButton.setAttribute(
    "aria-label",
    language === "pt"
        ? "Alterar idioma para inglês"
        : "Switch language to Portuguese"
    );
}

languageButton.addEventListener("click", function () {

    if (currentLanguage === "pt") {
        changeLanguage("en");
    } else {
        changeLanguage("pt");
    }
});

changeLanguage(currentLanguage);

// Observa quando os elementos entram na tela.
const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");

            observer.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15 //15% dos elementos vão estar visiveis na tela para que a animação seja ativada
});

// Começa a observar cada elemento selecionado.
revealElements.forEach(function (element) {
    observer.observe(element);
});

// Abre e fecha o menu mobile.
menuToggle.addEventListener("click", function () {
    navigation.classList.toggle("active");

    const menuIsOpen = navigation.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", menuIsOpen);

    menuToggle.textContent = menuIsOpen ? "✕" : "☰";
    menuToggle.setAttribute(
        "aria-label",
        menuIsOpen ? "Fechar menu" : "Abrir menu"
    );
});

// Fecha o menu quando um link é selecionado.
navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

document.addEventListener("keydown", function (event){
    if (event.key ==="Escape") {
        navigation.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    }
});


// Cursor personalizado

const cursor = document.querySelector("#cursor");

let ultimoRastro = 0;
const intervaloRastro = 35;

document.addEventListener("mousemove", function (event) {
    // O cursor principal acompanha o mouse imediatamente
    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";

    // Controla a frequência de criação das partículas
    const agora = Date.now();

    if (agora - ultimoRastro < intervaloRastro) {
        return;
    }

    ultimoRastro = agora;

    // Cria uma partícula
    const particula = document.createElement("div");

    particula.classList.add("cursor-rastro");

    particula.style.left = event.clientX + "px";
    particula.style.top = event.clientY + "px";

    document.body.appendChild(particula);

    // Remove a partícula após a animação
    setTimeout(function () {
        particula.remove();
    }, 700);
});

    // Verifica se o mouse está sobre algo interativo
    const elementoInterativo = event.target.closest(
        "a, button, input, textarea, select, [role='button']"
    );

    cursor.classList.toggle(
        "cursor-hover",
        Boolean(elementoInterativo)
    );


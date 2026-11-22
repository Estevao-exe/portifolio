
"use strict";

// 1. ELEMENTOS DO HTML

const languageButton = document.querySelector("#language-toggle");
const translatableElements = document.querySelectorAll("[data-i18n]");

const revealElements = document.querySelectorAll(
    ".about, .projects, .project-card, .skills, .contact"
);

const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector("#navigation");

const cursor = document.querySelector("#cursor");
const profileImage = document.querySelector("#profile-image");


// 2. SISTEMA DE TRADUÇÃO

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
        heroText: "Sou um desenvolvedor em formação, interessado em tecnologia e programação. Estou sempre em busca de novos desafios e oportunidades para aprimorar minhas habilidades e contribuir para projetos inovadores. Também gosto de desenvolver jogos.",

        heroProjectsButton: "Meus Projetos",
        heroAboutButton: "Sobre Mim",

        characterTitle: "Personagem Pixel Art",
        comingSoon: "Em breve...",

        aboutTitle: "Sobre mim",
        aboutText: "Sou estudante de Ciência da Computação e estou desenvolvendo minhas habilidades em programação. Gosto de aprender criando projetos, experimentar ideias e entender como as coisas funcionam por trás do código.",

        aboutLearningText: "Busco realmente aprender a programar, compreender algoritmos e estruturas de dados, em vez de apenas copiar e colar código. Quero encontrar oportunidades para crescer e entender cada vez mais o mundo da programação.",

        projectsTitle: "Meus Projetos",
        projectsIntro: "Projetos pessoais e experimentais que fazem parte da minha jornada de aprendizado em programação.",

        gameTitle: "Meu Jogo",
        gameDescription: "Projeto de desenvolvimento de um jogo 2D utilizando Godot e GDScript.",
        githubProjectLink: "Ver no GitHub ↗",

        otherTitle: "Outros Projetos",
        otherProjectsDescription: "Vários outros projetos disponíveis no meu GitHub.",
        projectStatus: "Em desenvolvimento",

        skillsTitle: "Habilidades e tecnologias",
        skillsIntro: "Ferramentas e linguagens que estou estudando e utilizando nos meus projetos.",

        contactTitle: "Vamos conversar?",
        contactText: "Você pode conhecer meus projetos e acompanhar minha evolução pelo GitHub.",

        githubProfileLink: "Meu GitHub ↗",
        emailLink: "Meu E-mail",
        linkedinLink: "Meu LinkedIn ↗",

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

        aboutLearningText: "I genuinely want to learn how to program and understand algorithms and data structures instead of just copying and pasting code. I'm looking for opportunities to grow and learn more about the world of programming.",

        projectsTitle: "My Projects",
        projectsIntro: "Personal and experimental projects that are part of my programming learning journey.",

        gameTitle: "My Game",
        gameDescription: "A 2D game development project using Godot and GDScript.",
        githubProjectLink: "View on GitHub ↗",

        otherTitle: "Other Projects",
        otherProjectsDescription: "Several other projects are available on my GitHub.",
        projectStatus: "In development",

        skillsTitle: "Skills and technologies",
        skillsIntro: "Tools and programming languages I'm studying and using in my projects.",

        contactTitle: "Let's talk?",
        contactText: "You can explore my projects and follow my progress on GitHub.",

        githubProfileLink: "My GitHub ↗",
        emailLink: "My Email",
        linkedinLink: "My LinkedIn ↗",

        footerText: "© 2026 Estevão Figueiredo Garcia. All rights reserved."
    }

};


// 3. CONTROLE DE IDIOMA

let currentLanguage = "pt";

function changeLanguage(language) {

    translatableElements.forEach(function (element) {

        const key = element.dataset.i18n;
        const translatedText = translations[language]?.[key];

        if (translatedText !== undefined) {
            element.textContent = translatedText;
        }

    });

    currentLanguage = language;

    document.documentElement.lang =
        language === "pt" ? "pt-BR" : "en";

    if (languageButton) {

        languageButton.setAttribute(
            "aria-label",
            language === "pt"
                ? "Alterar idioma para inglês"
                : "Switch language to Portuguese"
        );

    }

}

if (languageButton) {

    languageButton.addEventListener("click", function () {

        if (currentLanguage === "pt") {
            changeLanguage("en");
        } else {
            changeLanguage("pt");
        }

    });

}

changeLanguage(currentLanguage);


// 4. ANIMAÇÕES AO ROLAR A PÁGINA

if ("IntersectionObserver" in window) {

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

}


// 5. MENU MOBILE

function closeMobileMenu() {

    if (!menuToggle || !navigation) return;

    navigation.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰";

}

if (menuToggle && navigation) {

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

    navigation.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", closeMobileMenu);

    });

}

// 6. CURSOR PERSONALIZADO

let ultimoRastro = 0;
const intervaloRastro = 35;

if (cursor) {

    document.addEventListener("mousemove", function (event) {

        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";

        const elementoInterativo = event.target.closest(
            "a, button, input, textarea, select, [role='button']"
        );

        cursor.classList.toggle(
            "cursor-hover",
            Boolean(elementoInterativo)
        );

        const agora = Date.now();

        if (agora - ultimoRastro < intervaloRastro) {
            return;
        }

        ultimoRastro = agora;

        const particula = document.createElement("div");

        particula.classList.add("cursor-rastro");

        particula.style.left = event.clientX + "px";
        particula.style.top = event.clientY + "px";

        document.body.appendChild(particula);

        setTimeout(function () {
            particula.remove();
        }, 700);

    });

}


// 7. AMPLIAR FOTO DE PERFIL

if (profileImage) {

    function openProfileImage(event) {

        // Impede que o link do logo também seja acionado.
        event.preventDefault();
        event.stopPropagation();

        // Evita criar várias ampliações ao mesmo tempo.
        if (document.querySelector(".image-lightbox")) return;

        const lightbox = document.createElement("div");
        lightbox.classList.add("image-lightbox");

        const enlargedImage = document.createElement("img");

        enlargedImage.src = profileImage.src;
        enlargedImage.alt = profileImage.alt;

        lightbox.appendChild(enlargedImage);
        document.body.appendChild(lightbox);

        requestAnimationFrame(function () {
            lightbox.classList.add("active");
        });

        function closeLightbox() {

            lightbox.classList.remove("active");

            document.removeEventListener("keydown", closeWithEscape);

            setTimeout(function () {
                lightbox.remove();
            }, 350);

        }

        function closeWithEscape(event) {

            if (event.key === "Escape") {
                closeLightbox();
            }

        }

        // Fecha somente quando o fundo for clicado.
        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

        document.addEventListener("keydown", closeWithEscape);

    }

    profileImage.addEventListener("click", openProfileImage);

    // Permite abrir usando Enter ou Espaço.
    profileImage.addEventListener("keydown", function (event) {

        if (event.key === "Enter" || event.key === " ") {

            event.preventDefault();
            event.stopPropagation();

            openProfileImage(event);

        }

    });

}
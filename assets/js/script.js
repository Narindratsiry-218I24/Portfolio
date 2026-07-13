document.addEventListener('DOMContentLoaded', () => {
    
    // --- Splash Screen ---
    const splashScreen = document.getElementById('splash-screen');
    const loadingPercentage = document.getElementById('loading-percentage');
    
    if (splashScreen) {
        let currentPercent = 0;
        // The bar takes ~5 seconds (5000ms). Let's increment the counter.
        // We'll update the number every 50ms.
        const totalDuration = 5000;
        const intervalTime = 50;
        const totalSteps = totalDuration / intervalTime;
        const increment = 100 / totalSteps;
        
        const interval = setInterval(() => {
            currentPercent += increment;
            if (currentPercent >= 100) {
                currentPercent = 100;
                clearInterval(interval);
            }
            if(loadingPercentage) loadingPercentage.innerText = Math.floor(currentPercent) + '%';
        }, intervalTime);

        // Wait for the 5s loading animation to finish
        setTimeout(() => {
            splashScreen.style.opacity = '0';
            splashScreen.style.visibility = 'hidden';
            setTimeout(() => {
                splashScreen.remove(); // Clean up DOM
            }, 800); // wait for fade out transition
        }, 5200); // 5.2s duration to ensure bar is completely full
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Sticky Header & Active Link Highlighting ---
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Theme Toggle (Dark/Light Mode) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn.querySelector('i');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.skill-modern-card, .timeline-item, .contact-modern-card, .about-glass-card, .project-modern-card');
    
    // Add initial reveal class
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    // Initial check and event listener
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // --- Card Tilt Effect ---
    const tiltElements = document.querySelectorAll('.project-modern-card, .skill-modern-card, .about-glass-card');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
            const rotateY = ((x - centerX) / centerX) * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            el.style.transition = 'none';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
            el.style.transition = 'all 0.4s ease';
        });
    });

    // --- Button Ripple Effect ---
    const buttons = document.querySelectorAll('.btn-modern');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.className = 'ripple';
            this.appendChild(ripples);
            
            setTimeout(() => {
                ripples.remove();
            }, 1000);
        });
    });

    // --- Initialize Skills Carousel Auto-play ---
    const skillsCarouselElement = document.querySelector('#skillsCarousel');
    if (skillsCarouselElement && window.bootstrap) {
        new bootstrap.Carousel(skillsCarouselElement, {
            interval: 2000,
            ride: 'carousel',
            pause: 'hover'
        });
    }

});

// --- Rich Project Data & Modal Logic ---
const projectData = {
    campusmaps: {
        title: "CampusMaps",
        subtitle: "Université de Fianarantsoa",
        role: "Développeur Mobile Principal (Flutter)",
        duration: "6 mois",
        description: "Application mobile Flutter permettant aux étudiants, enseignants et visiteurs de s'orienter facilement sur le campus de l'Université de Fianarantsoa.",
        technologies: ["Flutter", "Dart", "SQLite", "Supabase", "OpenStreetMap", "REST API"],
        features: [
            "Cartographie interactive et Navigation GPS",
            "Recherche intelligente de salles et bâtiments",
            "Mode Offline avec base de données SQLite",
            "Synchronisation Cloud via Supabase",
            "Historique de navigation et Assistant IA"
        ],
        images: [
            'assets/image/CampusMaps/capture_decran_campus.png', // Main map/dashboard
            'assets/image/CampusMaps/loginCampus.png',
            'assets/image/CampusMaps/RechercherCampus.png',
            'assets/image/CampusMaps/Assistant.png',
            'assets/image/CampusMaps/loginCampus1_2.png'
        ]
    },
    edunova: {
        title: "Edunova",
        subtitle: "Système de Gestion Scolaire",
        role: "Responsable Développeur Backend Laravel",
        duration: "4 mois",
        description: "Plateforme complète de gestion administrative, pédagogique et financière pour les établissements scolaires.",
        technologies: ["Laravel", "PHP", "MySQL", "GitHub Actions", "Docker", "Linux"],
        features: [
            "Gestion des utilisateurs, élèves et professeurs",
            "Gestion des notes, bulletins et classes",
            "Suivi des emplois du temps et inventaire",
            "Authentification sécurisée par JWT"
        ],
        images: [
            'assets/image/EDUNOVA/Edunova.png', // Dashboard
            'assets/image/EDUNOVA/etudiant.png',
            'assets/image/EDUNOVA/emploi_du_temps.png',
            'assets/image/EDUNOVA/note.png',
            'assets/image/EDUNOVA/Inventaire.png',
            'assets/image/EDUNOVA/etudiant1.png'
        ]
    },
    plateforme: {
        title: "Plateforme E-learning",
        subtitle: "Apprentissage et Suivi Étudiant",
        role: "Développeur Full-Stack (Spring-Boot & React)",
        duration: "3 mois",
        description: "Solution d'apprentissage en ligne interactive offrant des cours vidéos, quiz et évaluations pour étudiants.",
        technologies: ["Spring Boot", "React", "Spring Security", "JWT", "MySQL"],
        features: [
            "Gestion complète des cours et modules",
            "Espaces dédiés pour professeurs et étudiants",
            "Système de Quiz, Examens et notation automatique",
            "Génération de certificats"
        ],
        images: [
            'assets/image/plateforme/Plateforme.png', // Dashboard
            'assets/image/plateforme/plateforme_1_2.png',
            'assets/image/plateforme/Plateforme2.png',
            'assets/image/plateforme/plateforme_cap_1.png',
            'assets/image/plateforme/plateforme_cap_2.png',
            'assets/image/plateforme/plateforme_cap_3.png',
            'assets/image/plateforme/plateforme_cap_4.png'
        ]
    },
    dst: {
        title: "Application de DST",
        subtitle: "Gestion d'Inventaire Matériel",
        role: "Stagiaire Développeur Full-Stack JS",
        duration: "4 mois",
        description: "Application web de gestion, de suivi et d'inventaire de matériel informatique au sein du département DST à Anosy.",
        technologies: ["React", "NodeJS", "Express", "MySQL", "JWT"],
        features: [
            "Inventaire en temps réel et suivi des affectations",
            "Module de maintenance et d'historique",
            "Générateur de rapports statistiques et Export Excel",
            "Authentification et gestion des droits utilisateurs"
        ],
        images: [
            'assets/image/DST/dashboard.png', // Dashboard first
            'assets/image/DST/affectation.png',
            'assets/image/DST/Expo.png'
        ]
    },
    edt: {
        title: "Gestion EDT",
        subtitle: "EMIT Fianarantsoa",
        role: "Développeur Web/Mobile",
        duration: "2 mois",
        description: "Application de suivi et de gestion d'emploi du temps pour l'université EMIT à Fianarantsoa.",
        technologies: ["React", "Mobile", "REST API", "MySQL"],
        features: [
            "Consultation de l'emploi du temps en temps réel",
            "Notifications de changement de salles ou d'heures",
            "Interface adaptée pour mobile et web"
        ],
        images: [
            'assets/image/EDT/creneau.png', // Main view
            'assets/image/EDT/generer.png'
        ]
    }
};

window.loadProjectData = function(projectKey) {
    if (!projectData[projectKey]) return;
    
    const data = projectData[projectKey];
    
    // Set Header Info
    document.getElementById('projectModalLabel').innerText = data.title;
    document.getElementById('projectModalSubtitle').innerText = data.subtitle;
    
    // Set Main Content
    document.getElementById('projectRole').innerText = data.role;
    document.getElementById('projectDescription').innerText = data.description;
    
    // Set Lists
    const featuresList = document.getElementById('projectFeatures');
    featuresList.innerHTML = '';
    data.features.forEach(f => {
        let li = document.createElement('li');
        li.innerText = f;
        featuresList.appendChild(li);
    });
    
    // Set Tech Badges
    const techsContainer = document.getElementById('projectTechs');
    techsContainer.innerHTML = '';
    data.technologies.forEach(tech => {
        let span = document.createElement('span');
        span.innerText = tech;
        techsContainer.appendChild(span);
    });
    
    // Set Carousel Images
    const carouselInner = document.getElementById('carouselInner');
    carouselInner.innerHTML = '';
    
    data.images.forEach((imgSrc, index) => {
        // Item
        const div = document.createElement('div');
        div.className = 'carousel-item' + (index === 0 ? ' active' : '');
        div.style.display = index === 0 ? 'block' : 'none'; // Temporarily force display block for measuring, Bootstrap will manage it later
        
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = 'Capture du projet ' + (index + 1);
        
        // Adapt height naturally without cutting the image
        img.style.objectFit = 'contain';
        img.style.width = '100%';
        img.style.maxHeight = '400px'; 
        img.style.backgroundColor = 'transparent';
        img.style.borderRadius = '10px';
        img.style.display = 'block';
        img.style.margin = '0 auto';
        
        div.appendChild(img);
        carouselInner.appendChild(div);
        
        // Reset display after a tiny timeout so Bootstrap takes over properly
        setTimeout(() => {
             div.style.display = '';
        }, 10);
    });
};

// --- Certifications Modal Logic ---
const certData = {
    odc: {
        img: 'assets/image/Certification/ODC.png',
        note: ''
    },
    git: {
        img: 'assets/image/Certification/Git.png',
        note: "Attestation de réussite : Les cours ont été validés avec succès. Le certificat officiel est en attente d'obtention (nécessite l'activation de l'abonnement Premium OpenClassrooms)."
    },
    algo: {
        img: 'assets/image/Certification/Algo.png',
        note: "Attestation de réussite : Les cours ont été validés avec succès. Le certificat officiel est en attente d'obtention (nécessite l'activation de l'abonnement Premium OpenClassrooms)."
    }
};

window.openCertModal = function(key) {
    if (!certData[key]) return;
    
    document.getElementById('certModalImage').src = certData[key].img;
    const noteEl = document.getElementById('certModalNote');
    const noteWrapper = document.getElementById('certModalNoteWrapper');
    
    if (certData[key].note) {
        noteEl.innerText = certData[key].note;
        noteWrapper.style.display = 'block';
    } else {
        noteWrapper.style.display = 'none';
    }
    
    const modal = new bootstrap.Modal(document.getElementById('certModal'));
    modal.show();
};
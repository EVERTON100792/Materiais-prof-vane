/**
 * Script Principal para o site Prof Vane PDFs
 *
 * @version 2.0
 * @description Script otimizado e refatorado para controlar todas as
 * funcionalidades do site, incluindo menu, animações e eventos.
 */

// Envolve todo o código em uma função para evitar poluir o escopo global
(() => {
    // --- FUNÇÃO PRINCIPAL DE INICIALIZAÇÃO ---
    // Aguarda o DOM estar completamente carregado para executar os scripts
    document.addEventListener('DOMContentLoaded', () => {
        // Inicializa todos os módulos do site
        initMobileMenu();
        initScrollEffects();
        initFaqAccordion();
        initBuyButtons();
        initAOS();
        initLazyLoading();
        initAccessibility();
        initAnimations();

        console.log("Site Prof Vane PDFs inicializado com sucesso!");
    });

    // --- EVENTOS QUE DEPENDEM DO CARREGAMENTO TOTAL DA PÁGINA (INCLUINDO IMAGENS) ---
    window.addEventListener('load', () => {
        initLoadingScreen();
        initPWA();
    });

    // ===================================================================
    // MÓDULOS DE FUNCIONALIDADE
    // ===================================================================

    /**
     * ✅ Controla o menu mobile (abrir, fechar, fechar ao clicar no link ou fora)
     */
    function initMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');

        if (!mobileMenu || !navMenu) return;

        // Abrir/Fechar o menu ao clicar no ícone
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fechar o menu ao clicar em um link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /**
     * ✅ Controla todos os efeitos de rolagem da página
     */
    function initScrollEffects() {
        const header = document.querySelector('.header');
        const backToTopButton = document.getElementById('backToTop');

        // Animações que podem rodar a cada frame de rolagem
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            const bgElements = document.querySelectorAll('.bg-element');
            bgElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05); // Velocidades diferentes
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        };
        
        // Efeitos que rodam com menor frequência para melhor performance
        const handleScrollState = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Efeito do cabeçalho
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Botão "Voltar ao Topo"
            if (scrollTop > 300) {
                backToTopButton.classList.add('active'); // Usando 'active' que já foi estilizado
            } else {
                backToTopButton.classList.remove('active');
            }
        };

        // Adiciona um único listener para a rolagem
        window.addEventListener('scroll', () => {
            requestAnimationFrame(handleParallax);
            handleScrollState();
        });
        
        // Funcionalidade do clique no botão "Voltar ao Topo"
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * ✅ Controla a funcionalidade do acordeão de Perguntas Frequentes (FAQ)
     */
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                // Fecha outros itens para manter apenas um aberto
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Alterna (abre/fecha) o item clicado
                item.classList.toggle('active');
            });
        });
    }

    /**
     * ✅ Controla os botões de compra da Hotmart
     */
    function initBuyButtons() {
        document.querySelectorAll('.btn-buy').forEach(button => {
            button.addEventListener('click', function() {
                const originalText = this.innerHTML;
                const hotmartLink = this.getAttribute('data-hotmart-link');

                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';
                this.disabled = true;

                setTimeout(() => {
                    if (hotmartLink && !hotmartLink.includes('SEU_LINK_HOTMART_AQUI')) {
                        window.open(hotmartLink, '_blank', 'noopener,noreferrer');
                    } else {
                        alert('Link do Hotmart não configurado!');
                    }
                    // Restaura o botão
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 800);
            });
        });
    }

    /**
     * ✅ Inicializa a biblioteca Animate On Scroll (AOS)
     */
    function initAOS() {
        const aosElements = document.querySelectorAll('[data-aos]');
        if (!aosElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        aosElements.forEach(element => observer.observe(element));
    }

    /**
     * ✅ Inicializa o carregamento preguiçoso (lazy loading) de imagens
     */
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        if (!images.length) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    /**
     * ✅ Controla a tela de carregamento inicial
     */
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loading');
        if (!loadingScreen) return;
        
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500); // Tempo para a animação de fade-out
    }

    /**
     * ✅ Adiciona melhorias de acessibilidade
     */
    function initAccessibility() {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');

        if (!mobileMenu || !navMenu) return;

        // Permite abrir o menu com a tecla Enter/Espaço
        mobileMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                mobileMenu.click();
            }
        });

        // Permite fechar o menu com a tecla Esc
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    /**
     * ✅ Adiciona animações de entrada e de hover
     */
    function initAnimations() {
        // Animação de entrada do título principal
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateY(20px)';
            setTimeout(() => {
                heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 300);
        }
    }
    
    /**
     * ✅ Inicializa o Service Worker para capacidades PWA (Progressive Web App)
     */
    function initPWA() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('Service Worker registrado com sucesso:', registration))
                .catch(error => console.log('Falha no registro do Service Worker:', error));
        }
    }

})(); // Fim da função de escopo

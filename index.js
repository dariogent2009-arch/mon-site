
// === Apparition fluide du titre principal ===
window.addEventListener('load', () => {
  const title = document.querySelector('h1');
  if (title) {
    title.style.opacity = '0';
    title.style.transform = 'scale(0.9)';
    title.style.transition = 'all 0.8s ease';
    setTimeout(() => {
      title.style.opacity = '1';
      title.style.transform = 'scale(1)';
    }, 400);
  }
});

// === Menu noir avec ombre légère au scroll ===
const menu = document.querySelector('.menu');
window.addEventListener('scroll', () => {
  menu.style.boxShadow = window.scrollY > 50
    ? '0 2px 8px rgba(0,0,0,0.5)'
    : 'none';
});

// === Hover doux sur les liens du menu ===
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.letterSpacing = '1px';
    link.style.transition = 'all 0.2s ease';
  });
  link.addEventListener('mouseout', () => {
    link.style.letterSpacing = '0px';
  });
});


// === MENU BURGER SIMPLE AVEC TRANSITION JS ===
const burger = document.querySelector('.burger');
const menuLinks = document.querySelectorAll('.menu a:not(:first-child)'); // Exclut le logo
const menuItems = document.querySelectorAll('.menu .menu-item');
let menuOpen = false;

// Fonction d'affichage avec animation fluide
burger.addEventListener('click', () => {
  menuOpen = !menuOpen;

  if (menuOpen) {
    menu.classList.add('open');
    burger.innerHTML = '&#10006;'; // icône croix
    menuLinks.forEach(link => {
      link.style.display = 'block';
      link.style.opacity = 0;
      link.style.transform = 'translateY(-10px)';
      link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      // petit délai pour activer l’animation après affichage
      requestAnimationFrame(() => {
        link.style.opacity = 1;
        link.style.transform = 'translateY(0)';
      });
    });
    menuItems.forEach(item => {
      item.style.display = 'block';
      item.style.opacity = 0;
      item.style.transform = 'translateY(-10px)';
      item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      requestAnimationFrame(() => {
        item.style.opacity = 1;
        item.style.transform = 'translateY(0)';
      });
    });
  } else {
    menu.classList.remove('open');
    burger.innerHTML = '&#9776;'; // icône burger
    menuLinks.forEach(link => {
      // anime la disparition
      link.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      link.style.opacity = 0;
      link.style.transform = 'translateY(-10px)';
      // après l’animation → cacher
      setTimeout(() => {
        if (!menuOpen) link.style.display = 'none';
      }, 300);
    });
    menuItems.forEach(item => {
      item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      item.style.opacity = 0;
      item.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        if (!menuOpen) item.style.display = 'none';
      }, 300);
    });
  }
});

// Réinitialisation si resize en grand écran
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    menu.classList.remove('open');
    menuLinks.forEach(link => {
      link.style.display = 'inline-block';
      link.style.opacity = 1;
      link.style.transform = 'translateY(0)';
    });
    menuItems.forEach(item => {
      item.style.display = 'inline-block';
      item.style.opacity = 1;
      item.style.transform = 'translateY(0)';
    });
    burger.innerHTML = '&#9776;';
    menuOpen = false;
  } else {
    menuLinks.forEach(link => {
      link.style.display = 'none';
    });
    menuItems.forEach(item => {
      item.style.display = 'none';
    });
  }
});

// === SUBMENU TOGGLE ON CLICK FOR MOBILE ===
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      const link = item.querySelector('a');
      if (e.target === link) {
        e.preventDefault(); // Prevent navigation on click for submenu toggle
        const sousMenu = item.querySelector('.sous-menu');
        if (sousMenu) {
          sousMenu.classList.toggle('visible');
        }
      }
    }
  });
});

// === Hide menu items on mobile load ===
window.addEventListener('load', () => {
  if (window.innerWidth <= 768) {
    menuLinks.forEach(link => link.style.display = 'none');
    menuItems.forEach(item => item.style.display = 'none');
  }
});

// === Fonction utilitaire pour observer un groupe d’éléments ===
function makeObserver(selector, visibleClass) {
  const elements = document.querySelectorAll(selector);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(visibleClass);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => {
    observer.observe(el);
  });
}

// === Animation du premier bloc (.nous) : slide depuis la droite ===
makeObserver('.nous', 'slide-visible');

// === Animation du second bloc (.apropos2) : slide depuis la gauche ===
makeObserver('.apropos2', 'slide-left-visible');

// === Styles d’animation dynamiques ===
const style = document.createElement('style');
style.textContent = `
  /* Bloc 1 — slide depuis la droite */
  .nous {
    opacity: 0;
    transform: translateX(100px);
    transition: all 0.8s ease-out;
  }
  .slide-visible {
    opacity: 1 !important;
    transform: translateX(0) !important;
  }

  /* Bloc 2 — slide depuis la gauche */
  .apropos2 {
    opacity: 0;
    transform: translateX(-100px);
    transition: all 0.8s ease-out;
  }
  .slide-left-visible {
    opacity: 1 !important;
    transform: translateX(0) !important;
  }
`;
document.head.appendChild(style);


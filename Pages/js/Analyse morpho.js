document.addEventListener("DOMContentLoaded", () => {

    const texte1Elems = document.querySelectorAll('.texte1 h1, .texte1 h2, .texte1 p');
    const texte2Elems = document.querySelectorAll('.texte2 h1, .texte2 h2, .texte2 p');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    texte1Elems.forEach(el => observer.observe(el));
    texte2Elems.forEach(el => observer.observe(el));
    

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


// === Menu noir avec ombre légère au scroll ===
const menu = document.querySelector('.menu');
window.addEventListener('scroll', () => {
  menu.style.boxShadow = window.scrollY > 50
    ? '0 2px 8px rgba(0,0,0,0.5)'
    : 'none';
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

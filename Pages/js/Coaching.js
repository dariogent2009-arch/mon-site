
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
// === Coaching.js ===

// Quand la page est chargée
document.addEventListener("DOMContentLoaded", () => {
    const coachItems = document.querySelectorAll(".coach-items");
    const boutons = document.querySelectorAll(".bouton");
    const images = document.querySelectorAll(".coach-items img");

    // --- Apparition progressive au scroll ---
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.2 }
    );

    coachItems.forEach((item) => {
        observer.observe(item);
    });

    // --- Animation au survol d’image ---
    images.forEach((img) => {
        img.addEventListener("mouseenter", () => {
            img.classList.add("zoom");
        });
        img.addEventListener("mouseleave", () => {
            img.classList.remove("zoom");
        });
    });

    // --- Animation bouton clic ---
    boutons.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.classList.add("pulse");
            setTimeout(() => {
                btn.classList.remove("pulse");
            }, 500);
        });
    });
});











// === MENU BURGER SIMPLE AVEC TRANSITION JS ===
const burger = document.querySelector('.burger');
const menuLinks = document.querySelectorAll('.menu a:not(:first-child)'); // Exclut le logo
const menuItems = document.querySelectorAll('.menu-item'); // Pour les sous-menus
let menuOpen = false;

// Fonction d'affichage avec animation fluide
burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  const menu = document.querySelector('.menu');

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
    // Afficher les menu-items pour les sous-menus
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
    // Cacher les menu-items
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

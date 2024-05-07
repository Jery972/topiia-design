const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: false,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  autoplay: {
    delay: 4000,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

// Fonction pour vérifier et déplacer l'ancre section
function checkAndMoveAnchor() {
  var anchorDiv = document.getElementById("ancreSection");

  if (!anchorDiv) {
    // Créer l'ancre si elle n'existe pas
    anchorDiv = document.createElement("div");
    anchorDiv.id = "ancreSection";
  }

  if (window.innerWidth > 480) {
    // Si l'écran est au-dessus de 480px, placer l'ancre à l'intérieur et au début de serviceSectionDesktop
    var serviceDesktop = document.getElementById("serviceSectionDesktop");
    serviceDesktop.insertBefore(anchorDiv, serviceDesktop.firstChild);
  } else {
    // Sinon, placer l'ancre à l'intérieur et au début de serviceSectionMobile
    var serviceMobile = document.getElementById("serviceSectionMobile");
    serviceMobile.insertBefore(anchorDiv, serviceMobile.firstChild);
  }
}

// Attacher la fonction à l'événement de redimensionnement de la fenêtre
window.addEventListener("resize", checkAndMoveAnchor);

// Appeler la fonction une première fois pour prendre en compte la taille initiale de la fenêtre
checkAndMoveAnchor();

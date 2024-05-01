//MENU SANDWICH
// Sélectionnez l'élément du menu
const menu = document.getElementById("menu");

// Sélectionnez l'élément du bouton de menu (à ajuster selon votre structure HTML)
const menuButton = document.getElementById("sandwichMenu");

// Ajoutez un gestionnaire d'événements au bouton de menu
menuButton.addEventListener("click", () => {
  // Basculez la classe "open" sur l'élément du menu
  menu.classList.toggle("open");
});

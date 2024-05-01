//CODE CARROUSEL IMAGE + AFFICHAGE

const popupSpan = document.querySelector("#popupPictures span");
if (popupSpan) {
  const galleryContainer = document.getElementById("galleryPictures");
  const selectBoxInput = document.querySelectorAll(".select-box__input");
  const paginationContainer = document.getElementById("paginationContainer"); // Ajoutez cet élément dans votre HTML pour contenir la pagination

  let currentPage = 1;
  const imagesPerPage = 10;

  function loadGalleryImages(folder) {
    const imagePath = `/images/galleryPictures/${folder}/`;
    // const imagePath = `/images/galleryPictures/vitre/`;

    fetch(imagePath)
      .then((response) => response.text())
      .then((html) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;

        const imageLinks = Array.from(tempDiv.querySelectorAll("a"));
        // console.log(imageLinks);
        // imageLinks.shift();

        // for (let index = 0; index < imageLinks.length; index++) {
        //   console.log(imageLinks[index].title);
        //   if (imageLinks[index].title === "htaccess") {
        //     imageLinks.splice(index, 1);
        //   }
        // }
        imageLinks.splice(0, 5);
        const totalImages = imageLinks.length;

        const totalPages = Math.ceil(totalImages / imagesPerPage);

        // Nettoyer le contenu existant de la pagination
        paginationContainer.innerHTML = "";

        // Ajouter les numéros de page si le nombre de pages est supérieur à 1
        if (totalPages > 1) {
          for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.addEventListener("click", () => {
              currentPage = i;
              loadGalleryImages(getSelectedValue());
            });
            paginationContainer.appendChild(pageButton);
          }
        }

        // Afficher les images de la page actuelle
        displayImages(imageLinks, totalImages, totalPages, folder);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération du contenu HTML :", error)
      );
  }

  function displayImages(imageLinks, totalImages, totalPages, folder) {
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = Math.min(startIndex + imagesPerPage, totalImages);

    galleryContainer.innerHTML = "";

    // Utiliser la fonction slice pour exclure le premier élément du tableau avant la pagination
    const displayedImages = imageLinks.slice(startIndex, endIndex);

    displayedImages.forEach((link) => {
      const imgElement = document.createElement("img");
      const fileName = link.textContent.split(".")[0];

      imgElement.src =
        `/images/galleryPictures/${folder}/` + link.getAttribute("href");
      imgElement.alt = fileName;

      const imageGalleryDiv = document.createElement("div");
      imageGalleryDiv.classList.add("imageGallery");

      imageGalleryDiv.appendChild(imgElement);
      galleryContainer.appendChild(imageGalleryDiv);

      imgElement.onclick = () => {
        const imgPopup = document.createElement("img");
        imgPopup.src = imgElement.src;
        document.querySelector("#popupPictures").appendChild(imgPopup);
        document.querySelector("#popupPictures").style.display = "block";
      };
    });

    // Mettre à jour la classe CSS pour indiquer la page active
    updatePaginationStyle(currentPage, totalPages);
  }

  function updatePaginationStyle(currentPage) {
    const pageButtons = document.querySelectorAll(
      "#paginationContainer button"
    );
    pageButtons.forEach((button, index) => {
      if (index + 1 === currentPage) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  function getSelectedValue() {
    let selectedValue = "";
    selectBoxInput.forEach((input) => {
      if (input.checked) {
        selectedValue = input.value;
      }
    });
    return selectedValue;
  }

  selectBoxInput.forEach((input) => {
    input.addEventListener("change", () => {
      currentPage = 1;
      loadGalleryImages(getSelectedValue());
    });
  });

  // Ajouter l'événement pour fermer la popup lorsque le bouton "×" est cliqué

  popupSpan.onclick = () => {
    document.querySelector("#popupPictures").style.display = "none";
    const popupPictures = document.querySelector("#popupPictures");
    const popupImage = document.querySelector("#popupPictures img");
    if (popupImage) {
      popupPictures.removeChild(popupImage);
    }
  };

  // Charger les images initiales (vitre teintées)
  loadGalleryImages("vitre");
}

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

//FORM SUBMIT
const form = document.getElementById("formContact");

if (form) {
  document.addEventListener("DOMContentLoaded", function () {
    const nom = document.getElementById("nom");
    const email = document.getElementById("email");
    const tel = document.getElementById("tel");
    const services = document.getElementById("services");
    const message = document.getElementById("message");
    const siteweb = document.getElementById("siteweb");
    const submitButton = document.getElementById("submitButton");

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Empêche l'envoi du formulaire par défaut

      // Vérification du champ honeypot
      if (siteweb.value !== "") {
        // Si le champ honeypot est rempli, c'est probablement un robot, on ne fait rien
        return false;
      }

      // Validation des champs email ou téléphone (au moins un est obligatoire)
      if (email.value.trim() === "" && tel.value.trim() === "") {
        alert(
          "Veuillez entrer au moins une adresse email ou un numéro de téléphone."
        );
        return false;
      }
      // Validation du choix de service
      if (services.value === "") {
        alert("Veuillez choisir un service.");
        return false;
      }

      // Validation du message
      if (message.value.trim() === "") {
        alert("Veuillez entrer un message.");
        return false;
      }

      // Envoi du formulaire si tout est valide
      // alert("Le formulaire a été envoyé avec succès !"); // Remplacer par votre code d'envoi réel
      form.submit(); // Utiliser cette ligne pour envoyer le formulaire réellement
    });
  });
}

//CODE CARROUSEL IMAGE + AFFICHAGE

const galleryContainer = document.getElementById("galleryPictures");

const imagesPerPage = 10;
let currentPage = 1;
const popupSpan = document.querySelector("#popupPictures span");
const selectBoxInput = document.querySelectorAll(".select-box__input");
const paginationContainer = document.getElementById("paginationContainer"); // Ajoutez cet élément dans votre HTML pour contenir la pagination

function loadGalleryImages(folder) {
  const imagePath = `/images/galleryPictures/${folder}/`;
  // const imagePath = `/images/galleryPictures/vitre/`;

  fetch(imagePath)
    .then((response) => response.text())
    .then((html) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;

      const imageLinks = Array.from(tempDiv.querySelectorAll("a"));

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
  const pageButtons = document.querySelectorAll("#paginationContainer button");
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

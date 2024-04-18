const galleryContainer = document.getElementById('galleryPictures');
const selectBoxInput = document.querySelectorAll('.select-box__input');
const paginationContainer = document.getElementById('paginationContainer'); // Ajoutez cet élément dans votre HTML pour contenir la pagination

let currentPage = 1;
const imagesPerPage = 10;

function loadGalleryImages(folder) {
	const imagePath = `images/galleryPictures/${folder}/`;

	fetch(imagePath)
		.then((response) => response.text())
		.then((html) => {
			const tempDiv = document.createElement('div');
			tempDiv.innerHTML = html;

			const imageLinks = Array.from(tempDiv.querySelectorAll('#files li a'));
			imageLinks.shift();
			const totalImages = imageLinks.length;

			const totalPages = Math.ceil(totalImages / imagesPerPage);

			// Nettoyer le contenu existant de la pagination
			paginationContainer.innerHTML = '';

			// Ajouter les numéros de page si le nombre de pages est supérieur à 1
			if (totalPages > 1) {
				for (let i = 1; i <= totalPages; i++) {
					const pageButton = document.createElement('button');
					pageButton.textContent = i;
					pageButton.addEventListener('click', () => {
						currentPage = i;
						loadGalleryImages(getSelectedValue());
					});
					paginationContainer.appendChild(pageButton);
				}
			}

			// Afficher les images de la page actuelle
			displayImages(imageLinks, totalImages, totalPages);
		})
		.catch((error) => console.error('Erreur lors de la récupération du contenu HTML :', error));
}

function displayImages(imageLinks, totalImages, totalPages) {
	const startIndex = (currentPage - 1) * imagesPerPage;
	const endIndex = Math.min(startIndex + imagesPerPage, totalImages);

	galleryContainer.innerHTML = '';

	// Utiliser la fonction slice pour exclure le premier élément du tableau avant la pagination
	const displayedImages = imageLinks.slice(startIndex, endIndex);

	displayedImages.forEach((link) => {
		const imgElement = document.createElement('img');
		const fileName = link.textContent.split('.')[0];

		imgElement.src = link.href;
		imgElement.alt = fileName;

		const imageGalleryDiv = document.createElement('div');
		imageGalleryDiv.classList.add('imageGallery');

		imageGalleryDiv.appendChild(imgElement);
		galleryContainer.appendChild(imageGalleryDiv);

		imgElement.onclick = () => {
			const imgPopup = document.createElement('img');
			imgPopup.src = imgElement.src;
			document.querySelector('#popupPictures').appendChild(imgPopup);
			document.querySelector('#popupPictures').style.display = 'block';
		};
	});

	// Mettre à jour la classe CSS pour indiquer la page active
	updatePaginationStyle(currentPage, totalPages);
}

function updatePaginationStyle(currentPage) {
	const pageButtons = document.querySelectorAll('#paginationContainer button');
	pageButtons.forEach((button, index) => {
		if (index + 1 === currentPage) {
			button.classList.add('active');
		} else {
			button.classList.remove('active');
		}
	});
}

function getSelectedValue() {
	let selectedValue = '';
	selectBoxInput.forEach((input) => {
		if (input.checked) {
			selectedValue = input.value;
		}
	});
	return selectedValue;
}

selectBoxInput.forEach((input) => {
	input.addEventListener('change', () => {
		currentPage = 1;
		loadGalleryImages(getSelectedValue());
	});
});

// Ajouter l'événement pour fermer la popup lorsque le bouton "×" est cliqué
document.querySelector('#popupPictures span').onclick = () => {
	document.querySelector('#popupPictures').style.display = 'none';
	document
		.querySelector('#popupPictures')
		.removeChild(document.querySelector('#popupPictures img'));
};

// Charger les images initiales (vitre teintées)
loadGalleryImages('vitre');

//MENU SANDWICH
// Sélectionnez l'élément du menu
const menu = document.getElementById('menu');

// Sélectionnez l'élément du bouton de menu (à ajuster selon votre structure HTML)
const menuButton = document.getElementById('sandwichMenu');

// Ajoutez un gestionnaire d'événements au bouton de menu
menuButton.addEventListener('click', () => {
	// Basculez la classe "open" sur l'élément du menu
	menu.classList.toggle('open');
});

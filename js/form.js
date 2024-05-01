//FORM SUBMIT
const form = document.getElementById("formContact");

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

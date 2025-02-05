// Attendre que le DOM soit complètement chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector("form");
  
    form.addEventListener("submit", (event) => {
      // Empêcher le comportement par défaut (rechargement de la page)
      event.preventDefault();
  
      // Récupérer les valeurs saisies dans les champs de formulaire
      const login = document.getElementById("login").value; 
      const password = document.getElementById("password").value;
  
      // Construire un objet JSON avec les données du formulaire
      const formData = {
        email: login,      
        password: password 
      };
  

      console.log("Données à envoyer :", formData);
  
      fetch("http://localhost:3650/auth/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData), // Convertir l'objet formData en chaîne JSON
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la connexion");
          }
          // Retourne la réponse sous forme de JSON
          return response.json();
        })
        .then((data) => {
          console.log("Réponse de l'API :", data);
  
          // Stocker les données de l'utilisateur dans le localStorage 
          localStorage.setItem("userData", JSON.stringify(data));
  
          // Rediriger l'utilisateur en fonction de son rôle
          switch (data.role) {
            case "admin":
              window.location.href = "/client/pages/admin/admin.html";
              break;
            case "supervisor":
              window.location.href = "/client/pages/formations/formationapi.html";
              break;
            case "trainee":
              window.location.href = "/client/pages/mood-main-stagiaire/main-stagiaire.html";
              break;
            default:
              alert("Rôle inconnu. Accès refusé.");
          }
        })
        .catch((error) => {
          console.error("Erreur :", error);
          alert("Erreur lors de la connexion.");
        });
    });
  });
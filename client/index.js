document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Empêche le rechargement de la page
  
      // Récupérer les valeurs du formulaire
      const login = document.getElementById("login").value;
      const password = document.getElementById("password").value;
  
      // Construire l'objet JSON
      const formData = {
        email: login,
        password: password,
      };
  
      console.log("Données à envoyer :", formData);
  
      // Envoyer les données à l'API
      fetch("http://localhost:3650/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la connexion");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Réponse de l'API :", data);

          // Stockage dans le localStorage
        localStorage.setItem("userData", JSON.stringify(data));
  
          // Redirection en fonction du rôle
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
  
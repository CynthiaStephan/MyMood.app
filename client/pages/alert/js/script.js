document.addEventListener("DOMContentLoaded", async () => {
    const confirmButton = document.getElementById("confirm-button");
    const cancelButton = document.getElementById("cancel-button");

    // user_id sera stocké dans le localstorage
    let userId;
    try {
        const response = await fetch("/auth/user-info", {
            method: "GET",
            // credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            userId = data.id;
        } else {
            alert("Impossible de récupérer l'ID utilisateur.");
            return;
        }
    } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Impossible de contacter le serveur.");
        return;
    }
    
    confirmButton.addEventListener("click", async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`/activate-alert/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            if (response.ok) {
                window.location.href = "alert-valid.html";
            } else {
                alert("Une erreur est survenue lors de l'activation de l'alerte.");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Impossible de contacter le serveur.");
        }
    });
    
    cancelButton.addEventListener("click", () => {
        window.history.back();
    });
});

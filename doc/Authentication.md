# Authentification : Gestion de la connexion et du token 🔑

## 1. **Requête de Connexion** 💻
Pour que l'utilisateur se connecte, il faut envoyer une requête POST à l'endpoint de connexion, avec son email et son mot de passe :

**URL** : `/auth/login`  
**Méthode** : POST  
**Corps de la requête** :
```json
{
  "email": "utilisateur@example.com",
  "password": "motdepasse123"
}
```

## 2. **Réponse du Serveur** 🎉
Lorsque l'utilisateur est authentifié, le serveur renvoie un objet JSON contenant ses informations (comme son ID et son rôle). De plus, un token JWT est ajouté dans un cookie sécurisé, pour être utilisé lors des futures requêtes nécessitant une authentification.

Exemple de réponse :
```json
{
  "id": 1,
  "role": "étudiant"
}
```
Un cookie nommé `token` sera aussi défini dans l'en-tête de la réponse, et il sera envoyé automatiquement dans les requêtes ultérieures.

## 3. **Stocker le JSON dans `localStorage`** 💾
Une fois que la connexion a réussi, vous pouvez stocker les informations retournées par le serveur (par exemple, l'ID et le rôle de l'utilisateur) dans le `localStorage` du navigateur. Cela permet d'y accéder facilement sans avoir à refaire une requête au serveur.

Exemple en JavaScript :
```javascript
// Exemple avec la réponse du serveur
const response = await fetch('/auth/login', {
  method: 'POST',
  body: JSON.stringify({
    email: 'utilisateur@example.com',
    password: 'motdepasse123'
  }),
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'  // Important : inclure le cookie dans la requête
});

const data = await response.json();

// Stocker les informations dans localStorage
localStorage.setItem('user', JSON.stringify(data));
```

## 4. **Le fonctionnement du Token dans les Cookies** 🍪
Le token JWT est stocké dans un cookie avec l'attribut `httpOnly`. Cela signifie que le cookie ne peut pas être accédé par JavaScript, ce qui protège le token contre d'éventuelles attaques par scripts malveillants. En plus, le cookie sera automatiquement inclus dans les requêtes envoyées au serveur, sans avoir à le spécifier manuellement.

## 5. **Accéder au Token** 🔑
Le token sera automatiquement envoyé par le navigateur dans l'en-tête `cookie` des requêtes aux endpoints sécurisés. Vous n'avez donc pas à vous soucier de l'ajouter dans les en-têtes de chaque requête. Le serveur pourra lire ce cookie et authentifier l'utilisateur en validant le token JWT.

## 6. **Se Déconnecter** 🚪
Pour déconnecter l'utilisateur, vous devez supprimer le cookie `token` et effacer les informations de l'utilisateur stockées dans `localStorage`.

Exemple en JavaScript :
```javascript
// Effacer localStorage
localStorage.removeItem('user');

// Supprimer le cookie du token en le définissant avec une date d'expiration passée
document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

// Optionnellement, rediriger l'utilisateur vers la page de connexion
window.location.href = '/login';
```

## 7. **Considérations de Sécurité** 🔒
- **Expiration du Token** : Les tokens ont une durée de vie limitée (1 heure par exemple). Une fois le token expiré, l'utilisateur devra se reconnecter pour en obtenir un nouveau.

## 8. **Utilisation des `credentials` dans le `fetch`** 🌐
Lorsque vous effectuez des requêtes `fetch` et que vous avez besoin d'envoyer le cookie contenant le token, il est crucial d'utiliser l'option `credentials` dans votre requête. Cela garantit que le cookie est envoyé avec la requête.

Voici un exemple d'utilisation :
```javascript
const response = await fetch('/protected-endpoint', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'  // Envoie les cookies associés à la requête
});

const data = await response.json();
```
L'option `credentials: 'include'` permet d'envoyer les cookies, même si l'API est sur un domaine différent de celui de votre application. Cette option est nécessaire pour garantir que le token JWT est transmis lors des requêtes.


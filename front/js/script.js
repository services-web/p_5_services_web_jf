InsérerProduits();

// Récupération des articles de l'API
// requêter l’API pour lui demander l’ensemble des produits
async function getArticles() {
    let articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
}

// Étape 3 : Insérer les produits dans la page d’accueil

async function InsérerProduits() {
    var result = await getArticles ()
//récupérer la réponse émise

/*L'API Promise propose ce qui suit :

Chaque tâche asynchrone renverra un promise objet.
Chaque promiseo bjet aura une then fonction qui peut prendre deux arguments, 
un success gestionnaire et un errorgestionnaire.
Le gestionnaire de réussite ou d'erreur dans la thenfonction ne sera appelé qu'une seule fois , 
après la fin de la tâche asynchrone.
La thenfonction renverra également un promise, pour permettre le chaînage de plusieurs appels.
Chaque gestionnaire (succès ou erreur) peut renvoyer un value, 
qui sera passé à la fonction suivante en tant que argument, dans la chaîne de promises.
Si un gestionnaire renvoie un promise(fait une autre requête asynchrone),
 le prochain gestionnaire (succès ou erreur) ne sera appelé qu'une fois cette requête terminée.
Ainsi, l'exemple de code précédent pourrait se traduire par quelque chose comme ce qui suit,
 en utilisant des promesses et le $httpservice (dans AngularJs) :

$http.get('/api/server-config').then(
    function(configResponse) {
        return $http.get('/api/' + configResponse.data.USER_END_POINT);
    }
).then(
    function(userResponse) {
        return $http.get('/api/' + userResponse.data.id + '/items');
    }
).then(
    function(itemResponse) {
        // Display items here
    }, 
    function(error) {
        // Common error handling
    }
);*/
    .then(function (resultatAPI){
        const articles = resultatAPI;
        console.table(articles);


//parcourir celle-ci pour insérer chaque élément (chaque produit) dans la page d’accueil (dans le DOM).
        for (let article in articles) {

            // Insertion de l'élément "a"
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
//paramétrer la balise “a” et son attribut “href”.
            productLink.href = "product.html?id=" + resultatAPI[article]._id;
           

            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'image
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = resultatAPI[article].imageUrl;
            productImg.alt = resultatAPI[article].altTxt;

            // Insertion du titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = resultatAPI[article].name;

            // Insertion de la description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = resultatAPI[article].description;
        }
    })
    .catch (function(error){
        return error;
    });
}
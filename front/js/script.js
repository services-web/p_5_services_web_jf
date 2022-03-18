
// requêter l’API pour lui demander l’ensemble des produits
async function getArticles() {
    let articlesCatch = await fetch("http://localhost:3000/api/products")
    return articlesCatch.json();
}



// Étape 3 : Insérer les produits dans la page d’accueil

 function InsérerProduits() {
    let result =  getArticles()

        //récupérer la réponse émise
        .then(function (articles) {
        console.table(articles);


            //parcourir celle-ci pour insérer chaque élément (chaque produit) dans la page d’accueil (dans le DOM).
            for (let article in articles) {

                // Insertion de l'élément "a"
                let productLink = document.createElement("a");
                document.querySelector(".items").appendChild(productLink);
                //paramétrer la balise “a” et son attribut “href”.
                productLink.href = "product.html?id=" + articles[article]._id;


                // Insertion de l'élément "article"
                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);

                // Insertion de l'image
                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = articles[article].imageUrl;
                productImg.alt = articles[article].altTxt;

                // Insertion du titre "h3"
                let productName = document.createElement("h3");
                productArticle.appendChild(productName);
                productName.classList.add("productName");
                productName.innerHTML = articles[article].name;

                // Insertion de la description "p"
                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productName");
                productDescription.innerHTML = articles[article].description;
            }
        })
        .catch(function (error) {
            return error;
        });
}
InsérerProduits();
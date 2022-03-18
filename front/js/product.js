//récupérer l’id du produit en question dans l’URL (URLSearchParams).

let idProduct = new URL(window.location.href).searchParams.get("id");
console.log(idProduct);

let article = "";
const couleurChoisie = document.querySelector("#colors");
const quantitéChoisie = document.querySelector("#quantity");

// Récupération des articles de l'API grace a l'ID du produit a afficher
function requeteApiId() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then((response) => {
            return response.json();
        })

        //promise stocké dans une variable
        .then(async function (resultatAPI) {
            article = await resultatAPI;
            console.table(article);
            if (article) {
                insererArticle(article);
            }
        })
        .catch((error) => {
            console.log("Erreur de la requête API");
        })
}
requeteApiId();
//Insérer ces détails dans la page Produit (dans le DOM).
function insererArticle(article) {

    // Insertion de l'image
    let imageProduit = document.createElement("img");
    document.querySelector(".item__img").appendChild(imageProduit);
    //insertion des attributs image
    imageProduit.src = article.imageUrl;
    imageProduit.alt = article.altTxt;

    // Modification du titre "h1"
    let titreProduit = document.getElementById('title');
    titreProduit.innerHTML = article.name;

    // Modification du prix
    let prixProduit = document.getElementById('price');
    prixProduit.innerHTML = article.price;

    // Modification de la description
    let descriptionProduit = document.getElementById('description');
    descriptionProduit.innerHTML = article.description;

    // Insertion des options de couleurs
    for (let colors of article.colors) {
        console.table(colors);
        let couleurProduit = document.createElement("option");
        document.querySelector("#colors").appendChild(couleurProduit);
        couleurProduit.value = colors;
        couleurProduit.innerHTML = colors;
    }
}

//Gestion du panier

    const btnEnvoyer = document.querySelector("#addToCart");

    //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    btnEnvoyer.addEventListener("click", (event) => {
        if (quantitéChoisie.value > 0 && quantitéChoisie.value <= 100) {

            //Recupération du choix de la couleur
            let choixCouleur = couleurChoisie.value;

            //Recupération du choix de la quantité
            let choixQuantite = quantitéChoisie.value;

            //Récupération des options de l'article à ajouter au panier
            let optionsProduit = {
                idProduit: idProduct,
                couleurProduit: choixCouleur,
                quantiteProduit: Number(choixQuantite),
                nomProduit: article.name,
                prixProduit: article.price,
                descriptionProduit: article.description,
                imgProduit: article.imageUrl,
                altImgProduit: article.altTxt
            }

            //Initialisation du local storage 
            let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

            //fenêtre pop-up
            const alerteConfirmation = () => {
                if (window.confirm('Votre commande de ' + article.name + ' ' + choixQuantite + ' ' + choixCouleur + ' , cliquez sur OK pour valider')) {
                }
            }

            //Importation dans le local storage
            //Si le panier comporte déjà au moins 1 article
            if (produitLocalStorage) {
                let envoieProduitLocalS = produitLocalStorage.find(
                    (conditions) => conditions.idProduit === idProduct && conditions.couleurProduit === choixCouleur);
                //Si le produit commandé est déjà dans le panier
                if (envoieProduitLocalS) {

                    let newQuantite =
                        parseInt(optionsProduit.quantiteProduit) + parseInt(envoieProduitLocalS.quantiteProduit);
                    envoieProduitLocalS.quantiteProduit = newQuantite;
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    console.table(produitLocalStorage);
                    alerteConfirmation();
                    //Si le produit commandé n'est pas dans le panier
                } else {
                    produitLocalStorage.push(optionsProduit);
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    console.table(produitLocalStorage);
                    alerteConfirmation();
                }
                //Si le panier est vide
            } else {
                produitLocalStorage = [];
                produitLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                console.table(produitLocalStorage);
                alerteConfirmation();
            }
        }
    });

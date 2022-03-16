//récupérer l’id du produit en question dans l’URL (URLSearchParams).

let idProduct = new URL(window.location.href).searchParams.get("id");
console.log(idProduct);

let article = "";

const couleurChoisie = document.querySelector("#colors");
const quantitéChoisie = document.querySelector("#quantity");

requeteApiId();

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
//Insérer ces détails dans la page Produit (dans le DOM).
function insererArticle(article) {

    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    //insertion des attributs image
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Modification du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Modification du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Insertion des options de couleurs
    for (let colors of article.colors) {
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }

    ajoutPanier(article);
}

//Gestion du panier
function ajoutPanier(article) {
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
            const popupConfirmation = () => {
                if (window.confirm('Votre commande de ' + article.name + ' ' + choixQuantite + ' ' + choixCouleur + ' , cliquez sur OK pour valider')) {
                 window.location.href = "/front/html/cart.html";  
                }
            }

            //Importation dans le local storage
            //Si le panier comporte déjà au moins 1 article

            if (produitLocalStorage) {
                let resultFind = produitLocalStorage.find(
                    (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
                //Si le produit commandé est déjà dans le panier
                if (resultFind) {

                    let newQuantite =
                        parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
                    resultFind.quantiteProduit = newQuantite;
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    console.table(produitLocalStorage);
                    popupConfirmation();
                    //Si le produit commandé n'est pas dans le panier
                } else {
                    produitLocalStorage.push(optionsProduit);
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    console.table(produitLocalStorage);
                    popupConfirmation();
                }
                //Si le panier est vide
            } else {
                produitLocalStorage = [];
                produitLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                console.table(produitLocalStorage);
                popupConfirmation();
            }
        }
    });
}
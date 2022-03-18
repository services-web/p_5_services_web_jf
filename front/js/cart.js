//Initialisation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);


// Si le panier est vide

    if (produitLocalStorage === null) {
        const panierVide = document.querySelector("#cart__items");
        panierVide.textContent = "Votre panier est vide";
    } else {
        for (let produit in produitLocalStorage) {

            // Insertion de l'élément "article"
            let detailsProduit = document.createElement("article");
            document.querySelector("#cart__items").appendChild(detailsProduit);
            detailsProduit.className = "cart__item";
            detailsProduit.setAttribute('data-id', produitLocalStorage[produit].idProduit);

            // Insertion de l'élément "div"
            let imageProduit = document.createElement("div");
            detailsProduit.appendChild(imageProduit);
            imageProduit.className = "cart__item__img";

            // Insertion de l'image
            let imageEtAttribut = document.createElement("img");
            imageProduit.appendChild(imageEtAttribut);
            imageEtAttribut.src = produitLocalStorage[produit].imgProduit;
            imageEtAttribut.alt = produitLocalStorage[produit].altImgProduit;

            // Insertion de l'élément "div"
            let conteneurProduitDiv = document.createElement("div");
            detailsProduit.appendChild(conteneurProduitDiv);
            conteneurProduitDiv.className = "cart__item__content";

            // Insertion de l'élément "div"
            let conteneurProduitDivPrix = document.createElement("div");
            conteneurProduitDiv.appendChild(conteneurProduitDivPrix);
            conteneurProduitDivPrix.className = "cart__item__content__titlePrice";

            // Insertion du titre h3
            let titreProduit = document.createElement("h2");
            conteneurProduitDivPrix.appendChild(titreProduit);
            titreProduit.innerHTML = produitLocalStorage[produit].nomProduit;

            // Insertion de la couleur
            let couleurProduit = document.createElement("p");
            titreProduit.appendChild(couleurProduit);
            couleurProduit.innerHTML = produitLocalStorage[produit].couleurProduit;

            // Insertion du prix
            let prixProduit = document.createElement("p");
            conteneurProduitDivPrix.appendChild(prixProduit);
            prixProduit.innerHTML = produitLocalStorage[produit].prixProduit + " €";

            // Insertion de l'élément "div"
            let conteneurProduitDivSettings = document.createElement("div");
            conteneurProduitDiv.appendChild(conteneurProduitDivSettings);
            conteneurProduitDivSettings.className = "cart__item__content__settings";

            // Insertion de l'élément "div"
            let conteneurProduitDivSettingsQuantity = document.createElement("div");
            conteneurProduitDivSettings.appendChild(conteneurProduitDivSettingsQuantity);
            conteneurProduitDivSettingsQuantity.className = "cart__item__content__settings__quantity";

            // Insertion de "Qté : "
            let qteProduit = document.createElement("p");
            conteneurProduitDivSettingsQuantity.appendChild(qteProduit);
            qteProduit.innerHTML = "Quantité : ";

            // Insertion de la quantité
            let quantiteProduit = document.createElement("input");
            conteneurProduitDivSettingsQuantity.appendChild(quantiteProduit);
            quantiteProduit.value = produitLocalStorage[produit].quantiteProduit;
            quantiteProduit.className = "itemQuantity";
            quantiteProduit.setAttribute("type", "number");


            // Insertion de l'élément "div"
            let conteneurProduitDivSettingsDelete = document.createElement("div");
            conteneurProduitDivSettings.appendChild(conteneurProduitDivSettingsDelete);
            conteneurProduitDivSettingsDelete.className = "cart__item__content__settings__delete";

            // Insertion de "p" supprimer
            let productSupprimer = document.createElement("p");
            conteneurProduitDivSettingsDelete.appendChild(productSupprimer);
            productSupprimer.className = "deleteItem";
            productSupprimer.innerHTML = "Supprimer";
        }
    }



function totalPanier() {

    // Récupération du total des quantités
    let elemsQtt = document.getElementsByClassName('itemQuantity');
    totalQtt = 0;

    for (let i = 0; i < elemsQtt.length; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let quantiteTotal = document.getElementById('totalQuantity');
    quantiteTotal.innerHTML = totalQtt;
    console.log(totalQtt);

    // Récupération du prix total
    totalPrix = 0;

    for (var i = 0; i < elemsQtt.length; ++i) {
        totalPrix += (elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit);
    }

    let productTotalPrix = document.getElementById('totalPrice');
    productTotalPrix.innerHTML = totalPrix;
    console.log(totalPrix);
}
totalPanier();

// Modification d'une quantité de produit

    let qttModifié = document.querySelectorAll(".itemQuantity");

    for (let j = 0; j < qttModifié.length; j++) {
        qttModifié[j].addEventListener("change", (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantiteModifie = produitLocalStorage[j].quantiteProduit;
            let qttModifieValue = qttModifié[j].valueAsNumber;

            let resultatTrouve = produitLocalStorage.find((condition) => condition.qttModifieValue !== quantiteModifie);

            resultatTrouve.quantiteProduit = qttModifieValue;
            produitLocalStorage[j].quantiteProduit = resultatTrouve.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            // refresh rapide
            window.location.reload();
        })
    }


// Suppression d'un produit

    let btnSupprimer = document.querySelectorAll(".deleteItem");

    for (let k = 0; k < btnSupprimer.length; k++) {
        btnSupprimer[k].addEventListener("click", (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = produitLocalStorage[k].idProduit;
            let colorDelete = produitLocalStorage[k].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter(condition => condition.idProduit !== idDelete || condition.couleurProduit !== colorDelete);

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            window.location.reload();
        })
    }



//Instauration formulaire avec regex
function formulaireInitialisation() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[a-zA-Z0-9\s\,\''\\ \\'\\()\-]*$");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', firstNameValidate);
    function firstNameValidate() {
        if (charRegExp.test(form.firstName.value)) {
            firstNameErrorMsg.innerHTML = 'Quel beau prénom ' + form.firstName.value;
        } else {
            alert('Prénom manquant');
            firstNameErrorMsg.innerHTML = 'veuillez saisir votre prenom';
        }
    }


    // Ecoute de la modification du nom
    form.lastName.addEventListener('change', lastNameValidate);
    function lastNameValidate() {
        if (charRegExp.test(form.lastName.value)) {
            lastNameErrorMsg.innerHTML = 'Nom: Mme/Mr ' + form.lastName.value;
        } else {
            alert('Nom manquant');
            lastNameErrorMsg.innerHTML = 'veuillez saisir votre nom';
        }
    }

    // Ecoute de la modification du address
    form.address.addEventListener('change', addressValidate);
    function addressValidate() {
        if (addressRegExp.test(form.address.value)) {
            addressErrorMsg.innerHTML = 'Vous habitez à: ' + form.address.value;
        } else {
            alert('Adresse manquante !');
            addressErrorMsg.innerHTML = 'veuillez saisir votre adresse';
        }
    }

    // Ecoute de la modification du vile
    form.city.addEventListener('change', cityValidate);
    function cityValidate() {
        if (charRegExp.test(form.city.value)) {
            cityErrorMsg.innerHTML = 'Votre ville est: ' + form.city.value;
        } else {
            alert('Ville manquante !');
            cityErrorMsg.innerHTML = 'veuillez saisir votre ville';
        }
    }

    // Ecoute de la modification du email
    form.email.addEventListener('change', emailValidate);
    function emailValidate() {
        if (emailRegExp.test(form.email.value)) {
            emailErrorMsg.innerHTML = 'Votre email est: ' + form.email.value;
        } else {
            alert('Email manquant !');
            emailErrorMsg.innerHTML = 'veuillez saisir votre email';
        }
    }
}
formulaireInitialisation();


//Envoi des informations client au localstorage

    const bouttonCommander = document.getElementById("order");

    //Ecouter le panier
    bouttonCommander.addEventListener("click", (event) => {

        //Récupération des coordonnées du formulaire client
        let valueNom = document.getElementById('firstName');
        let valuePrenom = document.getElementById('lastName');
        let valueAdress = document.getElementById('address');
        let valueVille = document.getElementById('city');
        let valueMail = document.getElementById('email');


        
        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i < produitLocalStorage.length; i++) {
            idProducts.push(produitLocalStorage[i].idProduit);
        }
        console.log(idProducts);

        const order = {
            contact: {
                firstName: valueNom.value,
                lastName: valuePrenom.value,
                address: valueAdress.value,
                city: valueVille.value,
                email: valueMail.value,
            },
            products: idProducts,
        }
        /*requête POST sur l’API et récupérer l’identifiant de commande dans la réponse de celle-ci.*/
        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.clear();
                localStorage.setItem("orderId", data.orderId);


                document.location.href = "confirmation.html";
            })
            .catch((err) => {
                alert("Problème avec fetch : " + err.message);
            });
    })











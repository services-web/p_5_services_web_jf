function main() {
    const affichageId = document.getElementById("orderId");
    affichageId.innerText = localStorage.getItem("orderId");

    //creation d'un <p> pour plus de lisibilité

    let panierValider = document.createElement("p");
    document.querySelector("#orderId").appendChild(panierValider);
    panierValider.innerText =  " Merci pour votre commande";
    console.log(localStorage.getItem("orderId"))

    //vider le local storage
    localStorage.clear();
}

main();
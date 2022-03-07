function main(){
    const affichageId = document.getElementById("orderId");
    affichageId.innerText = localStorage.getItem("orderId") + " Merci pour votre commande";
    console.log(localStorage.getItem("orderId"))
    localStorage.clear();
}

main();
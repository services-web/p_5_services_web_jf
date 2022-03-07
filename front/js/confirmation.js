function main(){
    const idNode = document.getElementById("orderId");
    idNode.innerText = localStorage.getItem("orderId") + " Merci pour votre commande";
    console.log(localStorage.getItem("orderId"))
    localStorage.clear();
}

main();
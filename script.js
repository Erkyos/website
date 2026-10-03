

function setup() {
    const bouton = document.getElementById("test_but");
    bouton.addEventListener("click", test);
}


function test() {
    alert("Test Sucessfull !");
}





window.addEventListener('load', setup);

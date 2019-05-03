var pokeInfo = document.getElementById("poke-info");
var pokeImg = document.getElementById("poke-img");

var firstRequest = new XMLHttpRequest();
firstRequest.open('GET', 'https://pokeapi.co/api/v2/pokemon/1/');

firstRequest.onload = function(){
    var pokeData = JSON.parse(firstRequest.responseText);
     console.log(pokeData);
};

firstRequest.send();


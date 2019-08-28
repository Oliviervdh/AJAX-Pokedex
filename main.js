var input = document.getElementById("search");


var pokeInfo = document.getElementById("poke-info");
var pokeImg = document.getElementById("poke-img");


// XMLHttpRequest
var firstRequest = new XMLHttpRequest();
firstRequest.open('GET', 'https://pokeapi.co/api/v2/generation/1/');

// fetching pokemon species
firstRequest.onload = function(){
    var pokeData = JSON.parse(firstRequest.responseText);
     // console.log(pokeData.pokemon_species);

    // using a map function to iterate over every date and console.log the pokemon's name.
    pokeData.pokemon_species.map((pokemon)=>{
        console.log(pokemon.name);
    })
};

firstRequest.send();


//scanning the api according to the input. "use e.target to capture the input field data from the form and then scan/filter pokeData.pokemon_species and display the corresponding data into the associated div".
// input.addEventListener("keyup");






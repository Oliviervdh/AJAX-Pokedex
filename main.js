// Reusable function that GETs the data with MXL_req
function fetchData (url) {
    const requests = new XMLHttpRequest();
    requests.open('GET', url, false);
    requests.send();
    return (JSON.parse(requests.response));
}

// function that changes the color of the blue light while fetching
function changeLightColor() {
    const blueLight = document.getElementById("blue-light");

    setTimeout(function(){
        blueLight.style.backgroundColor = "rgba(255, 179, 0, 1)";}, 10);

    const clearLight = setInterval(function(){
        blueLight.style.backgroundColor = "rgba(21, 245, 244, 1)";
    clearInterval(clearLight)
    }, 500);
}

// Gets the full Poke Json data.
const pokeData = fetchData("https://pokeapi.co/api/v2/generation/1/");

const input = document.getElementById("search");
input.addEventListener("keyup", filterData);

function filterData(event){

    if(event.keyCode === 13) {


        changeLightColor();

        // Gets all the pokemon species from the data.
        const pokeSpecies = pokeData.pokemon_species;

        const inputVal = event.target.value;
        const lowerCaseValue = inputVal.toLowerCase();

        const filteredArray = pokeSpecies.filter((arrValue) => {
            return arrValue.name === lowerCaseValue
        });

        // using a map function to iterate over the data in the filtered array and retrieving the name from it.
        filteredArray.map((pokemon)=>{

            // Pokémon name.
            const pokeName = pokemon.name;
            const displayPokeName = document.getElementById("top-span");
            displayPokeName.innerHTML = "";
            displayPokeName.innerHTML += " " + pokeName;

            const pokeUrl = fetchData(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);

            // Pokémon image.
            const pokeImg = pokeUrl.sprites.front_shiny;

            const displayPokeImg = document.getElementById("poke-img");
            const img = document.createElement("IMG");
            img.setAttribute("src", pokeImg);
            img.setAttribute("width", "320");
            img.setAttribute("height", "205");
            displayPokeImg.innerHTML = "";
            displayPokeImg.appendChild(img);

            // Pokémon weight.
            const pokeWeight = pokeUrl.weight;
            const displayPokeWeight = document.getElementById("middle-span");
            displayPokeImg.style.backgroundImage = "url('grass5.jpg')";
            displayPokeWeight.innerHTML = "";
            displayPokeWeight.innerHTML = " " + pokeWeight;

            // Pokémon evolution.
            const pokeEvo = fetchData(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`);

            const pokeEvoName = pokeEvo.evolves_from_species;
            const displayPokeEvoName = document.getElementById("bottom-span");

            if(pokeEvoName.name !== null){
                displayPokeEvoName.innerHTML = "";
                displayPokeEvoName.innerHTML = pokeEvoName.name;
            }else return;


            // Pokémon moves.
            const pokeMoves = pokeUrl.moves;
            function shuffle(array) {
                array.sort(() => Math.random() - 0.5);
            }
            shuffle(pokeMoves);


            const slicedMoves = pokeMoves.slice(0,4);

            slicedMoves.forEach((move)=>{
                pokeMove = move.move.name;
                const changeDisplayColor = document.getElementById("poke-info");
                changeDisplayColor.style.backgroundColor = "rgba(54, 243, 7, 1)";

                const displayPokeMoves = document.getElementById("right-span");

                if(displayPokeMoves.innerHTML !== ""){
                    displayPokeMoves.innerHTML += "";
                    displayPokeMoves.innerHTML += pokeMove + "<br>";
                }else{
                    displayPokeMoves.innerHTML += pokeMove + "<br>";
                }
            });

        });

       event.target.value = "";
    }
}



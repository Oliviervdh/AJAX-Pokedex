
// Reusable function that GETs the data with MXL_req
function fetchData (url) {
    const requests = new XMLHttpRequest();
    requests.open('GET', url, false);
    requests.send();
    return (JSON.parse(requests.response));
}

// Gets the full Poke Json data.
const pokeData = fetchData("https://pokeapi.co/api/v2/generation/1/");

const input = document.getElementById("search");
input.addEventListener("keyup", filterData);

function filterData(event){

    if(event.keyCode === 13) {

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
            displayPokeName.innerHTML += " " + pokeName;

            const pokeUrl = fetchData(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);

            // Pokémon image.
            const pokeImg = pokeUrl.sprites.front_shiny;

            const displayPokeImg = document.getElementById("poke-img");
            const img = document.createElement("IMG");
            img.setAttribute("src", pokeImg);
            img.setAttribute("width", "330");
            img.setAttribute("height", "215");
            displayPokeImg.innerHTML = "";
            displayPokeImg.appendChild(img);

            // Pokémon weight.
            const pokeWeight = pokeUrl.weight;
            const displayPokeWeight = document.getElementById("middle-span");
            displayPokeImg.style.backgroundImage = "url('grass5.jpg')";
            displayPokeWeight.innerHTML = " " + pokeWeight;

            // Pokémon moves.
            const pokeMoves = pokeUrl.moves;
            function shuffle(array) {
                array.sort(() => Math.random() - 0.5);
            }
            shuffle(pokeMoves);
            const slicedMoves = pokeMoves.slice(0,4);
            const displayPokeMoves = document.getElementById("right-span");
            const changeDisplayColor = document.getElementById("poke-info");
            slicedMoves.forEach((move)=>{
                pokeMove = move.move.name;
                changeDisplayColor.style.backgroundColor = "rgba(54, 243, 7, 1)";
                displayPokeMoves.innerHTML += pokeMove + "<br>" ;
            });
        });

       event.target.value = "";
    }
}




// Reusable function that GETs the data with MXL_req
function fetchData (url) {
    const requests = new XMLHttpRequest();
    requests.open('GET', url, false);
    requests.send();
    return (JSON.parse(requests.response));
}


function filterData(){

    if(event.keyCode === 13) {

        // Gets the full Poke Json data.
        const pokeData = fetchData("https://pokeapi.co/api/v2/generation/1/");

        // Gets all the pokemon species from the data.
        const pokeSpecies = pokeData.pokemon_species;

        const inputVal = document.getElementById("search").value;
        const lowerCaseValue = inputVal.toLowerCase();

        const filteredArray = pokeSpecies.filter((arrValue) => {
            return arrValue.name === lowerCaseValue
        });

        // using a map function to iterate over the data in the filtered array and retrieving the name from it.
        filteredArray.map((pokemon)=>{

            const pokeName = pokemon.name;
            console.log(pokeName);

            const pokeUrl = fetchData(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);

            const pokeImg = pokeUrl.sprites.front_shiny;
            console.log(pokeImg);

            const pokeMoves = pokeUrl.weight;
            console.log(pokeMoves);

        });




        document.getElementById("search").value = " ";
    }
}














// https://pokeapi.co/api/v2/pokemon/{id or name}

//scanning the api according to the input. "use e.target to capture the input field data from the form and then scan/filter pokeData.pokemon_species and display the corresponding data into the associated div".
// input.addEventListener("keyup");






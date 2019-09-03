// Reusable function that GETs the data with MXL_req
function fetchData (url) {
    const requests = new XMLHttpRequest();
    requests.open('GET', url, false);
    requests.send();
    return (JSON.parse(requests.response));
}

// Gets the full Poke Json data.
const pokeData = fetchData("https://pokeapi.co/api/v2/generation/1/");

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

const input = document.getElementById("search");
// input.addEventListener("keyup", validateInput);
// input.addEventListener("keyup", dataIncludesDropdown);
input.addEventListener("keyup", filterData);


// function validateInput(event){
//     // Gets all the pokemon species from the data.
//     const pokeSpecies = pokeData.pokemon_species;
//
//     const inputVal = event.target.value;
//     const lowerCaseValue = inputVal.toLowerCase();
//
//     if(event.keyCode === 13){
//
//         const filteredArray = pokeSpecies.filter((arrValue) => {
//             return arrValue.name === lowerCaseValue
//         });
//
//         console.log(filteredArray);
//
//         filteredArray.forEach((pokemon)=> {
//             // Pokémon name.
//             const pokeName = pokemon.name;
//             console.log(pokeName, lowerCaseValue);
//
//
//
//
//             if( lowerCaseValue !== pokeName){
//                 alert("Please specify your search by clicking one of the suggestions or entering the full Pokémon name");
//             }else{
//                 alert("run Filterdata")
//                 // filterData(event);
//             }
//
//         });
//
//
//
//
//     }
// }



function dataIncludesDropdown() {
    const pokeSpecies = pokeData.pokemon_species;
    const inputValue = input.value;
    const lowerCaseValue = inputValue.toLowerCase();
    const filteredArray = pokeSpecies.filter((arrValue) => {
        return arrValue.name.includes(lowerCaseValue);
    });

    listContainer = document.createElement('div');
    listContainer.style.width = "100%";
    listContainer.style.display = "flex";
    listContainer.style.flexDirection = "column";
    listContainer.style.textAlign = "left";

    filteredArray.map((pokemon)=>{
        const dropdownName = pokemon.name;
        const pokeUrl = fetchData(`https://pokeapi.co/api/v2/pokemon/${dropdownName}`);
        const pokeImg = pokeUrl.sprites.front_shiny;

        document.getElementById('dropdown').innerHTML = "";

        const dropdown = document.getElementById('dropdown').appendChild(listContainer);
        dropdown.style.maxHeight = "130px";
        dropdown.style.overflow = "auto";
        dropdown.style.borderColor = "black";
        dropdown.style.borderStyle = "solid";
        dropdown.style.borderRadius = "10px";

        listItem = document.createElement('span');
        listItem.setAttribute("color", "white");
        listItem.setAttribute( "text-align", "left");
        listItem.classList.add("clickMe");
        listItem.style.paddingTop = "10px";
        listItem.style.paddingLeft = "10px";
        listItem.style.margin = "auto";
        listItem.style.width = "100%";
        listItem.style.cursor = "pointer";

        // listItem.addEventListener("click", clicked);

        // function clicked(e){
        //
        //     // console.log(e.target);
        //     // e.target.classList.add("clickMe");
        //     // listItem.classList.add("clickMe");
        //
        //
        //    filterData()
        // }

        listImg = document.createElement('IMG');
        listImg.setAttribute("src", pokeImg);

        listImg.setAttribute("width", "50");
        listImg.setAttribute("height", "50");
        listImg.setAttribute("align", "right");

        for (i = 0; i < dropdownName.length; ++i) {
            listItem.innerText = "";
            listItem.innerHTML += dropdownName ;
            listItem.appendChild(listImg);
            listContainer.appendChild(listItem);
        }
    });
}

function filterData(event){

    console.log("clicked");

    // Gets all the pokemon species from the data.
    const pokeSpecies = pokeData.pokemon_species;

    const inputVal = event.target.value;
    const lowerCaseValue = inputVal.toLowerCase();

    const filteredArray = pokeSpecies.filter((arrValue) => {
        return arrValue.name === lowerCaseValue
    });

    if(event.keyCode === 13 ) {



        // Changes the colors of the right display & fonts & light
        const changeDisplayColor = document.getElementById("poke-info");
        changeDisplayColor.style.backgroundColor = "rgba(54, 243, 7, 1)";
        const changeFontColorLeft = document.getElementById("left-info");
        changeFontColorLeft.style.color = "rgba(39, 39, 39, 1)";
        const changeFontColorRight = document.getElementById("right-info");
        changeFontColorRight.style.color = "rgba(39, 39, 39, 1)";
        changeLightColor();

        // Using a map function to iterate over the data in the filtered array and retrieving the name from it.
        filteredArray.map((pokemon)=>{

            // Pokémon name.
            const pokeName = pokemon.name;


            console.log(pokeName);

            const displayPokeName = document.getElementById("top-span");
            displayPokeName.innerHTML = "";
            displayPokeName.innerHTML += " " + pokeName;

            const pokeUrl = fetchData(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);

            // Pokémon image.
            const pokeImg = pokeUrl.sprites.front_default
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

            // Pokémon type.
            const pokeTypes = pokeUrl.types;
            pokeTypes.map((type)=>{
                const pokeType = type.type.name;
                const displayPokeType = document.getElementById("right-span-bottom");
                displayPokeType.innerHTML = "";
                displayPokeType.innerHTML = pokeType;
            });

            // Pokémon Game_index
            const pokeIndex = pokeUrl.game_indices.slice(0,1);

            pokeIndex.map((index)=>{
               const pokeIndexNr = index.game_index;
               const displayPokeIndexNr = document.getElementById("right-span-middle");
                displayPokeIndexNr.innerHTML = "";
                displayPokeIndexNr.innerHTML = " " + pokeIndexNr;
            });

            // Pokémon evolution.
            const pokeEvo = fetchData(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`);
            const pokeEvoName = pokeEvo.evolves_from_species;
            const displayPokeEvoName = document.getElementById("bottom-span");

            if(pokeEvoName){
                displayPokeEvoName.innerHTML = "";
                displayPokeEvoName.innerHTML = pokeEvoName.name;
            }else {
                displayPokeEvoName.innerHTML = "";
                displayPokeEvoName.innerHTML = "No evo"
            }

            // Pokémon moves.
            const pokeMoves = pokeUrl.moves;
            function shuffle(array) {
                array.sort(() => Math.random() - 0.5);
            }
            shuffle(pokeMoves);

            const slicedMoves = pokeMoves.slice(0,1);

            const displayPokeMoves = document.getElementById("right-span-top");
            displayPokeMoves.innerHTML = "";

            slicedMoves.forEach((move)=>{
                const pokeMove = move.move.name;
                displayPokeMoves.innerHTML += pokeMove + " ";
            });
        });
       event.target.value = "";
    }
}



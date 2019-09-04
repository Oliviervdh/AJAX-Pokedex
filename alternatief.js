{
  //Elementen
  const storage = window.localStorage;
  const input = document.querySelector('#search');
  const dropdown = document.querySelector('#dropdown');

  // init functie
  const start = () => {
    //data ophalen en opslaan in localstorage
    fetch("https://pokeapi.co/api/v2/generation/1/")
      .then(r => r.json())
      .then(data => storage.setItem('pokedata', JSON.stringify(data)));

    //beginnen luisteren naar keydown event
    input.addEventListener('keyup', handleInput)
  };

  // Event handlers
  const handleClick = (e) => {
    removeDropdown();
    const pokemonToDisplay = e.currentTarget.innerText;
    displayPokemon(pokemonToDisplay);
    input.value = '';
  };

  const handleInput = (e) => {
    removeDropdown();
    if (e.currentTarget.value === '') return;

    //telkens als er getypt wordt moet de data gefilterd worden + dropdown aanmaken
    const filteredPokemon = filterPokemon(e.currentTarget.value.toLowerCase());
    createDropdown(filteredPokemon);

    //als er op enter gedrukt wordt moet een resultaat verschijnen
    if(e.key === "Enter" && filteredPokemon.length === 1){
      displayPokemon(filteredPokemon[0].name);

      input.value = '';
    } else if (e.key === "Enter"){
      const changeDisplayColor = document.getElementById("poke-img");
      changeDisplayColor.innerHTML = "Please be more precise or choose from the dropdown";
      input.value = '';
    }
  };

  //functies

  const changeLightColor = () => {
    const blueLight = document.getElementById("blue-light");
    setTimeout(function(){
      blueLight.style.backgroundColor = "rgba(255, 179, 0, 1)";}, 10);
    const clearLight = setInterval(function(){
      blueLight.style.backgroundColor = "rgba(21, 245, 244, 1)";
      clearInterval(clearLight)
    }, 500);
  };

  const changeDisplayColor = () => {
    const changeDisplayColor = document.getElementById("poke-info");
    changeDisplayColor.style.backgroundColor = "rgba(54, 243, 7, 1)";
    const changeFontColorLeft = document.getElementById("left-info");
    changeFontColorLeft.style.color = "rgba(39, 39, 39, 1)";
    const changeFontColorRight = document.getElementById("right-info");
    changeFontColorRight.style.color = "rgba(39, 39, 39, 1)";
  };

  const filterPokemon = (input) => {
    const { pokemon_species } = JSON.parse(storage.getItem('pokedata'));
    return pokemon_species.filter(pokemon => pokemon.name.includes(input));
  };

  const createDropdown = (filteredPokemonArray) => {
    filteredPokemonArray.forEach(pokemon => addToDropdown(pokemon)); 
    dropdown.classList.add("dropdownOut");
  };

  const removeDropdown = () => {
    dropdown.childNodes.forEach(element => element.removeEventListener('click', handleClick));
    dropdown.innerHTML = ``;
    dropdown.classList.remove("dropdownOut");
  };

  const addToDropdown = async (pokemon) => {

    const pokeUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(r => r.json());
    const pokeImg =  pokeUrl.sprites.front_default;

    //elementen creëren
    const listItem = document.createElement('span');
    const listImg = document.createElement('IMG');
    listImg.setAttribute("src", pokeImg);
    listImg.classList.add("listImg");
    
    //element configureren
    listItem.innerText = pokemon.name;
    listItem.appendChild(listImg);
    listItem.classList.add('listItem');
    listItem.addEventListener('click', handleClick);

    //toevoegen aan dom
    dropdown.appendChild(listItem);
  };

  const displayPokemon = async (pokemonName) => {

    changeLightColor();
    changeDisplayColor();

    // Pokémon name.
    const pokeName = pokemonName;

    const displayPokeName = document.getElementById("top-span");
    displayPokeName.innerHTML = "";
    displayPokeName.innerHTML += " " + pokeName;

    const pokeUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`).then(r => r.json());

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
    const pokeEvo = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`).then(res => res.json());
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

    removeDropdown();
  };
  
  //GO Go Go
  start();
}

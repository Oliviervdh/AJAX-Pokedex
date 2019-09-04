{
  //Elementen
  const storage = window.localStorage;
  const input = document.querySelector('#search');
  const dropdown = document.querySelector('#dropdown');

  // init functie
  const init = () => {
    //data ophalen en opslaan in localstorage
    fetch("https://pokeapi.co/api/v2/generation/1/")
      .then(r => r.json())
      .then(data => storage.setItem('pokedata', JSON.stringify(data)));

    //beginnen luisteren naar keydown event
    input.addEventListener('keyup', handleInput)
  };

  // Event handlers
  const handleClick = (e) => {
    console.log(e.currentTarget.innerText)
  };

  const handleInput = (e) => {
    //check als er input is
    if (e.currentTarget.value === ``) {
      removeDropdown()
      return;
    };

    //telkens als er getypt wordt moet de data gefilterd worden + dropdown aanmaken
    const filteredPokemon = filterPokemon(e.currentTarget.value.toLowerCase());
    createDropdown(filteredPokemon);

    //als er op enter gedrukt wordt moet een resultaat verschijnen
    if(e.key === "Enter"){
      console.log('Proficiat, je hebt op enter gedrukt.');
    };
  };

  //functies
  const filterPokemon = (input) => {
    const { pokemon_species } = JSON.parse(storage.getItem('pokedata'));
    return pokemon_species.filter(pokemon => pokemon.name.includes(input));
  };

  const addToDropdown = (pokemon) => {
    const pokeItem = document.createElement('li');

    pokeItem.innerText = pokemon.name;
    pokeItem.addEventListener('click', handleClick);

    dropdown.appendChild(pokeItem);
  };

  const createDropdown = (filteredPokemon) => {
    filteredPokemon.forEach(pokemon => addToDropdown(pokemon));
  };

  const removeDropdown = () => {
    dropdown.childNodes.forEach(element => element.removeEventListener('click', handleClick));
    dropdown.innerHTML = ``;
  }

  
  //GOGOGOOGOGOGO
  init();
}
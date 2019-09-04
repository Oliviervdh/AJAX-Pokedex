{
  //Elementen
  const storage = window.localStorage;
  const input = document.querySelector('#search');
  const dropdown = document.querySelector('#dropdown');

  //functies
  const filterPokemon = (input) => {
    const { pokemon_species } = JSON.parse(storage.getItem('pokedata'))

    return pokemon_species.filter(pokemon => pokemon.name.includes(input))
  }

  const addToDropdown = (pokemon) => {
    const pokeItem = document.createElement('li');
    pokeItem.innerText = pokemon.name;

    dropdown.appendChild(pokeItem);
  }

    
  const createDropdown = (filteredPokemon) => {
    dropdown.innerHTML = ``;
    filteredPokemon.forEach(pokemon => addToDropdown(pokemon))
  }

  const handleInput = (e) => {
    //check als er input is
    if (e.currentTarget.value === ``) {
      dropdown.innerHTML = ''; 
      return
    }

    //telkens als er getypt wordt moet de data gefilterd worden + dropdown aanmaken
    const filteredPokemon = filterPokemon(e.currentTarget.value)
    createDropdown(filteredPokemon);

    //als er op enter gedrukt wordt moet een resultaat verschijnen
    if(e.key === "Enter"){
      
    }

  }





  // init functie
  const init = () => {
    //data ophalen en opslaan in localstorage
    fetch("https://pokeapi.co/api/v2/generation/1/")
      .then(r => r.json())
      .then(data => storage.setItem('pokedata', JSON.stringify(data)));

    //beginnen luisteren naar keydown event
    input.addEventListener('keyup', handleInput)
  };

  init();
}
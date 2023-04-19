const main$$ = document.querySelector("main");
const pokedex$$ = document.querySelectorAll(".pokedex");
const inicio$$ = document.querySelectorAll(".inicio");
const agenda$$ = document.querySelectorAll(".agenda");
const batalla$$ = document.querySelectorAll(".batalla");
const contacto$$ = document.querySelectorAll(".contacto");
const about$$ = document.querySelectorAll(".about");

//Landing page build
const landing = () => {
  const topImg = document.createElement("section");
  topImg.innerHTML = `
    <article>
    <img src="./styles/assets/img/banner.png" alt="bannerPokedex" class="banner">
    </article>
  `;
  const titleSection = document.createElement("section");
  titleSection.setAttribute("class", "titlesection");
  titleSection.innerHTML = `
<article class="titlesection-article">
<h1>¡BIENVENIDO!</h1>
<p class="title-p">A tu sitio de información sobre el mundo pokemon de confianza.</p>
</article>
`;
  const imgSection = document.createElement("section");
  imgSection.setAttribute("class", "imgsection");
  imgSection.innerHTML = `
<article class="imgsection-article">
<img src="./styles/assets/img/oak.png" alt="Professor Oak" ></img>
</article>
`;
  const videoSection = document.createElement("section");
  videoSection.setAttribute("class", "videosection");
  videoSection.innerHTML = `
<article class="videosection-article">
<video width="500" height="300" controls autoplay>
  <source src="./styles/assets/video/pokemon.mp4" type="video/mp4">
</video>
</article>
<article class="articletwo">
<h2>Nuestro Compromiso:</h2>
<p>Ofrecerte la mejor información sobre los pokemon y su universo</p>
<p>¡Atrapalos a todos!</p>
</article>
`;
  main$$.appendChild(topImg);
  main$$.appendChild(titleSection);
  main$$.appendChild(videoSection);
  main$$.appendChild(imgSection);
};
//Build Pokemon Datalayer
//Get first page
const getFirstPagePokemon = async () => {
  try {
    const pokemonCards = [];
    for (let i = 1; i < 151; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const res = await response.json();
      let pokNameFirstLetter = res.name[0].toUpperCase();
      let pokNameRest = res.name.slice(1);
      let pokName = pokNameFirstLetter + pokNameRest;
      let pokType = res.types.map((type) => type.type.name).toString();
      const pokemon = {
        name: pokName,
        typeClass: pokType.replace(",", " "),
        image: res.sprites["front_default"],
        type: pokType,
        html: `
        <article class="card">
        <h3 class="card-title">${pokName}</h3>
        <img src="${res.sprites["front_default"]}" alt="${pokName}" class="card-image"></img>
        <p class="${pokType} card-subtitle">${pokType}</p>
        </article>
        `
      };
      pokemonCards.push(pokemon);
    }
    return pokemonCards;
  } catch (error) {
    console.log("Se ha producido el siguiente error:", error);
  }
};

const drawPokemons = (pokemons) => {
  console.log(pokemons);
  if (main$$.children.length < 2) {
    const sectionPokemons = document.createElement("section");
    sectionPokemons.setAttribute("id", "pokedex");
    pokemons.forEach((pokemon) => {   
    sectionPokemons.innerHTML += pokemon.html;
});
    main$$.appendChild(sectionPokemons);
  } else {
    console.log(pokemons);
    const pokecards = [];
    pokemons.forEach((pokemon) => { 
        pokecards.push(pokemon.html);
    });    
    const pokeSection$$ = document.querySelector("#pokedex");
    pokeSection$$.innerHTML = pokecards;
  }
};
const underConstruction = () => {
  main$$.innerHTML = `
 <img src="./styles/assets/img/underconstruction.png" alt="under construction"></img>
 `;
};
const searchEngine = (arr, pattern) => {
  let results = arr.filter((pokemon) => {
   return pokemon.name.toLowerCase().includes(pattern.toLowerCase());
  });
  drawPokemons(results);
};
const takeInput = (arr) => {
  const input$$ = document.querySelector("input");  
  input$$.addEventListener("input", () =>
    searchEngine(arr, input$$.value)
  );
};

const init = async () => {
  landing();
  const pokemons = await getFirstPagePokemon();
  pokedex$$.forEach((element) => {
    element.addEventListener("click", () => {
      main$$.innerHTML = "";
      const searchBar = document.createElement("input");
      searchBar.innerHTML = `
    <input type="text">
     `;
      main$$.appendChild(searchBar);
      takeInput(pokemons);
      drawPokemons(pokemons);
      const pokePs$$ = document.getElementsByClassName("card-subtitle");
      for (let i = 0; i < pokePs$$.length; i++) {
        if (pokePs$$[i].innerHTML.indexOf(",") !== -1) {
          pokePs$$[i].innerHTML = `
            <div class="pcontainer">
            <p class="${
              pokePs$$[i].innerText.split(",")[0]
            } card-subtitle multiple-type">${
            pokePs$$[i].innerText.split(",")[0]
          }</p>
            <p class="${
              pokePs$$[i].innerText.split(",")[1]
            } card-subtitle multiple-type">${
            pokePs$$[i].innerText.split(",")[1]
          }</p>
            </div>
            `;
        }
      }
    });
  });
  inicio$$.forEach((element) => {
    element.addEventListener("click", () => {
      main$$.innerHTML = "";
      landing();
    });
  });
  agenda$$.forEach((element) => {
    element.addEventListener("click", () => {
      main$$.innerHTML = "";
      underConstruction();
    });
  });
  batalla$$.forEach((element) => {
    element.addEventListener("click", () => {
      main$$.innerHTML = "";
      underConstruction();
    });
  });
  contacto$$.forEach((element) => {
    element.addEventListener("click", () => {
      main$$.innerHTML = "";
      underConstruction();
    });
  });
  about$$.forEach((element) => {
    element.addEventListener("click", () => {
      main$$.innerHTML = "";
      underConstruction();
    });
  });  
};

init();

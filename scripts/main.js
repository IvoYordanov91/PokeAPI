const main$$ = document.querySelector("main");
const pokedex$$ = document.querySelectorAll(".pokedex");
const inicio$$ = document.querySelectorAll(".inicio");
const agenda$$ = document.querySelectorAll(".agenda");
const batalla$$ = document.querySelectorAll(".batalla");
const contacto$$ = document.querySelectorAll(".contacto");
const about$$ = document.querySelectorAll(".about");
let formulario$$;

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
const getFormData = (form) => {
  const formData = new FormData(form);
  console.log(formData);
}

const drawPokemons = (pokemons) => {
  if (main$$.children.length < 2) {
    const sectionPokemons = document.createElement("section");
    sectionPokemons.setAttribute("id", "pokedex");
    pokemons.forEach((pokemon) => {   
    sectionPokemons.innerHTML += pokemon.html;
});
    main$$.appendChild(sectionPokemons);
  } else {    
    const pokecards = [];
    pokemons.forEach((pokemon) => { 
        pokecards.push(pokemon.html);
    });    
    const pokeSection$$ = document.querySelector("#pokedex");
    pokeSection$$.innerHTML = "";
    pokecards.forEach(value => {
      pokeSection$$.innerHTML += value;
    });    
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
const toDoList = () => {
  main$$.innerHTML = `
  <section>
  <article>
  <img src="./styles/assets/img/banner.png" alt="bannerPokedex" class="banner">
  </article>
  </section>
  <section class="section-form">
  <article>
  <h1 class="agenda-title">TO-DO LIST 📝</h1>
  <ul id="lista-tareas" class="agenda-ul"></ul>
  </article>
  <article class="articulo-formulario">
  <form id="formulario-tarea" class="agenda-form">
      <label for="titulo" class="agenda-label">Titulo</label>
      <input type="text" id="titulo" name="titulo" required>
      <label for="estado" class="agenda-label">Estado:</label>
      <select name="estado" id="estado">
          <option value="">Seleccionar</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Completada">Completada</option>
      </select>
      <label for="fecha" class="agenda-label">Fecha Limite</label>
      <input type="text" id="fecha" name="fecha" placeholder="YYYY-MM-DD" required>
      <label for="prioridad" class="agenda-label">Prioridad:</label>
      <select name="prioridad" id="prioridad" required>
          <option value="">Seleccionar</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
      </select>
      <label for="descripcion" class="agenda-label">Descripción</label>
      <textarea name="descripcion" id="descripcion" cols="30" rows="10"></textarea>
      <button type="submit">Agregar Tarea</button>
  </form>
  </article>
  </section>
  `;
}

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
      toDoList();
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
      underConstruction();
    });
  });
};

init();

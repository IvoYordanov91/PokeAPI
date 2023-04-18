const main$$ = document.querySelector("main");

//Landing page build
const landing = () => {

const titleSection = document.createElement('section')
titleSection.setAttribute("class", "titlesection")
titleSection.innerHTML = `
<article class="titlesection-article">
<h1>¡BIENVENIDO!</h1>
<p class="title-p">A tu sitio de información sobre el mundo pokemon de confianza.</p>
</article>
`;   
const imgSection = document.createElement('section');
imgSection.setAttribute("class", "imgsection");
imgSection.innerHTML = `
<article class="imgsection-article">
<img src="./styles/assets/img/oak.png" alt="Professor Oak" ></img>
</article>
`;
const videoSection = document.createElement("section");
videoSection.setAttribute("class", "videosection")
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
main$$.appendChild(titleSection);
main$$.appendChild(videoSection);
main$$.appendChild(imgSection);
}

const init = () => {
    landing();
}

init();
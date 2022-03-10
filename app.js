let pagina = 1;
const botonAnterior = document.getElementById("btnAnterior");
const botonSiguiente = document.getElementById("btnSiguiente");

botonSiguiente.addEventListener("click", () => {
    if (pagina < 42) {
            pagina+=1;
            obtenerData();
    }
})

botonAnterior.addEventListener("click", () => {
    if (pagina > 1) {
            pagina-=1;
            obtenerData();
    }
})

        // ESTO ES PARA ESPERAR QUE CARGUE EL DOM

document.addEventListener("DOMContentLoaded", () => {
    obtenerData();
})


const obtenerData = async () => {
    // console.log("obteniendo datos...");
    try {
        loadingData(true);
        const res = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`)
        const data = await res.json();

        console.log(data.info);
        pintarData(data);

    } catch (error) {

    } finally {
        loadingData(false);
    }
    
}


const pintarData = (data) => {
    const card = document.getElementById("card-dinamicas");
    const template = document.getElementById("template-card").content;
    const fragment = document.createDocumentFragment();
    data.results.forEach(item => {
        // console.log(item);
        const clone = template.cloneNode(true);
        clone.querySelector("h5").textContent = item.name;
        clone.querySelector(".pr1").textContent = item.species;
        clone.querySelector(".pr2").textContent = item.status;
        if (item.status == "Dead") {
            clone.querySelector(".pr2").style.color = "#FF0000"
        } else if (item.status == "Alive") {
            clone.querySelector(".pr2").style.color = "#00bb2d"
        }
        clone.querySelector(".pr3").textContent = item.gender;
        clone.querySelector(".card-img-top").setAttribute("src", item.image);

        // GUARDO EN EL FRAGMENT PARA EVITAR EL REFLOW

        fragment.appendChild(clone);

    });
    
    card.appendChild(fragment);
} 




const loadingData = (estado) =>{
    const loading = document.getElementById("loading");
    if (estado) {
        loading.classList.remove("d-none");
        // console.log("si");
    } else {
        loading.classList.add("d-none");
        // console.log("no");
    }
}
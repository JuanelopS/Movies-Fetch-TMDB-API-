let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
})

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
})

const cargarPeliculas = async() => {
	// Cuando se trabaja con funciones asíncronas, se debería trabajar con try y catch.
	// try: Intenta ejecutar el código entre llaves. Si se presenta un error, catch te permite capturarlo;
	try{
	// await solo es válido dentro de funciones asíncronas
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=`/*YOUR API KEY HERE*/`&language=es-ES&page=${pagina}`);

		console.log(respuesta);

		// 200 -> respuesta del servidor: OK
		if(respuesta.status === 200){
			// json: método del objeto respuesta que nos permitirá acceder a la información.
			// Este método también es asíncrono -> usamos await
			const datos = await respuesta.json();
			//console.log(datos.results);

			let peliculas = "";
			datos.results.forEach(pelicula => {
				// console.log(pelicula.title);
				peliculas += `
				<div class="pelicula">
					<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
				<h3 class="titulo">${pelicula.title}</h3>
				</div>
				`
			});

			document.getElementById("contenedor").innerHTML = peliculas;
				
		} else if(respuesta.status === 401){
			console.log("API Key incorrecta");
		} else if(respuesta.status === 404){
			console.log("La película que buscas no existe");
		} else{
			console.log("Error desconocido");
		}

	} catch(error){
		console.log(error); // error será un objeto con propiedades para entender que produjo el error

	}
	
}

cargarPeliculas();

// Siempre que se utiliza async y await se debería utilizar try y catch.
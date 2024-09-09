/*
 | ------------+-------------------------------------------
 | Archivo     | app.js
 | Descripcion | Archivo JavaScript para la funcionalidad de   
 |             | la seccion del Perfil (index.html)
 | Autor       | Raul Ibañez
 | Version     | 1.0
 | Fecha       | 07/09/2024 
 | ------------+--------------------------------------------
*/
let indice=1;

function leerArchivo() {
	fetch(`data/info.json`)
	.then(response => response.json())
    .then(data => {
    	textos = data;
    	render(textos);		
    	});
}

const render= textos => {
	contenido = document.getElementById('name');
	contenido.textContent = '';
	contenido.textContent += `${textos[indice].name}`;

	contenido = document.getElementById('profile');
	contenido.innerHTML = '';
	contenido.innerHTML += `${textos[indice].profile}`;

	contenido= document.querySelector('#project');
	contenido.innerHTML = '';
	textos[indice].projects.forEach(project => {
		contenido.innerHTML +=`<div class="project-card"> <div class="project-info"><h4>${project.title}</h4> <p>${project.body}</p> <a href="${project.href}" target="_blank">Ver en GitHub</a></div><div class="project-img"><img src="${project.logo}" alt='Imagen de ejemplo' width='90' height='90'></div>`;		
	});
	
  contenido= document.getElementById('mail');
  contenido.innerHTML = '';
  contenido.innerHTML += `<p>e-mail: ${textos[indice].email}</p>`;

  contenido= document.getElementById('linkedin');
  contenido.innerHTML = '';
  contenido.innerHTML += `<a href="${textos[indice].page}">LinkedIn</a>`;

}

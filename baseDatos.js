class Alumno {
  constructor(nombre, apellidos, edad) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.edad = edad;
    this.materiasInscritas = [];
  }
}

let alumnos = [];

function darDeAltaAlumno() {
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const edad = document.getElementById("edad").value;

  const nuevoAlumno = new Alumno(nombre, apellidos, edad);
  alumnos.push(nuevoAlumno);

  // Ordenar la lista de alumnos por nombre y apellidos
  alumnos.sort((a, b) => (a.nombre + " " + a.apellidos).localeCompare(b.nombre + " " + b.apellidos));

  document.getElementById("nombre").value = "";
  document.getElementById("apellidos").value = "";
  document.getElementById("edad").value = "";

  actualizarListaAlumnos();
}

function actualizarListaAlumnos() {
  const listaAlumnos = document.getElementById("alumnos");
  listaAlumnos.innerHTML = "";

  alumnos.forEach((alumno, index) => {
    const item = document.createElement("li");
    item.className = "alumno-item";
    item.innerHTML = `${alumno.nombre} ${alumno.apellidos} - Edad: ${alumno.edad}
      <button onclick="mostrarInformacion(${index})">Información</button>
      <button onclick="inscribirMateria(${index})">Inscribir a Materia</button>
      <button onclick="darDeBajaAlumno(${index})">Dar de Baja</button>`;
    listaAlumnos.appendChild(item);
  });
}

function mostrarInformacion(index) {
  const alumno = alumnos[index];

  let informacion = `<h2>Información de ${alumno.nombre} ${alumno.apellidos}</h2>
    <ul>`;
  if (alumno.materiasInscritas.length > 0) {
    alumno.materiasInscritas.forEach((materia, i) => {
      const promedio = calcularPromedio(materia.calificaciones);
      informacion += `<li>${materia.materia} - Calificaciones: ${materia.calificaciones.join(', ')} - Promedio: ${promedio.toFixed(2)}
        <button onclick="modificarCalificaciones(${index}, ${i})">Modificar Calificaciones</button>
        <button onclick="darDeBajaMateria(${index}, ${i})">Darse de Baja</button></li>`;
    });
  } else {
    informacion += "<p>No está inscrito en ninguna materia.</p>";
  }

  informacion += `</ul>
    <button onclick="regresarPaginaPrincipal()">Regresar</button>`;

  document.getElementById("informacionAlumno").innerHTML = informacion;
  document.getElementById("formularioAlta").style.display = "none";
  document.getElementById("listaAlumnos").style.display = "none";
  document.getElementById("informacionAlumno").style.display = "block";
}

function inscribirMateria(index) {
  const alumno = alumnos[index];
  const materia = prompt("Ingrese la materia:");
  const grupo = prompt("Ingrese el grupo:");

  alumno.materiasInscritas.push({ materia: `${materia} - ${grupo}`, calificaciones: [] });

  actualizarListaAlumnos();
}

function darDeBajaAlumno(index) {
  alumnos.splice(index, 1);

  actualizarListaAlumnos();
}

function regresarPaginaPrincipal() {
  document.getElementById("formularioAlta").style.display = "block";
  document.getElementById("listaAlumnos").style.display = "block";
  document.getElementById("informacionAlumno").style.display = "none";

  actualizarListaAlumnos();
}

function calcularPromedio(calificaciones) {
  const suma = calificaciones.reduce((total, calificacion) => total + calificacion, 0);
  return calificaciones.length > 0 ? suma / calificaciones.length : 0;
}

function modificarCalificaciones(alumnoIndex, materiaIndex) {
  const alumno = alumnos[alumnoIndex];
  const materia = alumno.materiasInscritas[materiaIndex];

  const nuevasCalificaciones = [];

  for (let i = 0; i < 3; i++) {
    const calificacion = parseFloat(prompt(`Ingrese la nueva calificación ${i + 1} para ${materia.materia}:`));
    nuevasCalificaciones.push(calificacion);
  }

  materia.calificaciones = nuevasCalificaciones;

  mostrarInformacion(alumnoIndex);
}

function darDeBajaMateria(alumnoIndex, materiaIndex) {
  const alumno = alumnos[alumnoIndex];
  alumno.materiasInscritas.splice(materiaIndex, 1);

  mostrarInformacion(alumnoIndex);
}

function buscarAlumno() {
  const busqueda = prompt("Ingrese el nombre o apellido del alumno a buscar:").toLowerCase();
  const resultadosBusqueda = alumnos.filter(alumno => 
    alumno.nombre.toLowerCase().includes(busqueda) || alumno.apellidos.toLowerCase().includes(busqueda)
  );

  // Si no se encuentran resultados, mostrar un mensaje y no actualizar la lista
  if (resultadosBusqueda.length === 0) {
    alert("No se encontraron alumnos que coincidan con la búsqueda.");
    return;
  }

  // Actualizar la interfaz con los resultados de la búsqueda
  const listaAlumnos = document.getElementById("alumnos");
  listaAlumnos.innerHTML = ""; // Limpiar la lista actual

  resultadosBusqueda.forEach((alumno, index) => {
    const item = document.createElement("li");
    item.className = "alumno-item";
    // Nota: Dado que estamos filtrando la lista, el índice de cada alumno en `resultadosBusqueda`
    // no corresponderá con su índice en la lista original `alumnos`. Por lo tanto, usaremos el
    // método `indexOf` para encontrar el índice correcto en la lista original.
    const indiceOriginal = alumnos.indexOf(alumno);
    item.innerHTML = `${alumno.nombre} ${alumno.apellidos} - Edad: ${alumno.edad}
      <button onclick="mostrarInformacion(${indiceOriginal})">Información</button>
      <button onclick="inscribirMateria(${indiceOriginal})">Inscribir a Materia</button>
      <button onclick="darDeBajaAlumno(${indiceOriginal})">Dar de Baja</button>`;
    listaAlumnos.appendChild(item);
  });
}

function mostrarTodosLosAlumnos() {
  actualizarListaAlumnos(); 
}
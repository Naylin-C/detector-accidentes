let modelo;

// Cargar modelo al iniciar
async function cargarModelo() {
  try {
    modelo = await tf.loadLayersModel('/models/modelo_web/model.json');
    console.log("✅ Modelo cargado correctamente");
  } catch (error) {
    console.error("❌ Error al cargar el modelo:", error);
  }
}
window.addEventListener('load', cargarModelo);

// Mostrar secciones
function mostrarImagen() {
  ocultarTodo();
  ocultarMenuPrincipal();
  document.getElementById('seccionImagen').style.display = 'block';
   ocultarBarraSuperior();
}
function mostrarVideo() {
  ocultarTodo();
  ocultarMenuPrincipal();
  document.getElementById('seccionVideo').style.display = 'block';
   ocultarBarraSuperior();
}
function mostrarCamara() {
  ocultarTodo();
  ocultarMenuPrincipal();
  document.getElementById('seccionCamara').style.display = 'block';
   ocultarBarraSuperior();
}
function volverAlMenu() {
  ocultarTodo();
  mostrarMenuPrincipal();
}
function ocultarTodo() {
  document.querySelectorAll('.seccion').forEach(seccion => {
    seccion.style.display = 'none';
  });
}
function ocultarMenuPrincipal() {
  const menu = document.querySelector('.menu-principal');
  menu.style.display = 'none';
  menu.style.justifyContent = 'center';
}
function mostrarMenuPrincipal() {
  const menu = document.querySelector('.menu-principal');
  menu.style.display = 'flex';
  menu.style.justifyContent = 'center';
}

// ----------------------
// PREDICCIÓN: IMAGEN
// ----------------------
function cargarImagen(event) {
  const img = document.getElementById('imagenVista');
  img.src = URL.createObjectURL(event.target.files[0]);
  img.style.display = 'block';
  document.getElementById('btnPredecirImagen').style.display = 'inline-block';
}

async function predecirImagen() {
  const etiquetas = ["🚫 Sin choque", "💥 Con choque"];
  const imgElement = document.getElementById('imagenVista');

  const tensor = tf.browser.fromPixels(imgElement)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims();

  const inicio = performance.now();
  const prediccion = await modelo.predict(tensor).data();
  const fin = performance.now();

  const probabilidad = Math.max(...prediccion);
  const clase = prediccion.indexOf(probabilidad);
  const etiqueta = etiquetas[clase];
  const porcentaje = (probabilidad * 100).toFixed(2);
  const tiempo = (fin - inicio).toFixed(2);

  document.getElementById('resultadoImagen').innerHTML = `
    <div style="font-size: 18px; color: ${clase === 1 ? '#ff4d4d' : '#4caf50'};">
      <strong>${etiqueta}</strong>
    </div>
    <div>🧠 Precisión: <strong>${porcentaje}%</strong><br>⏱ Tiempo: ${tiempo} ms</div>
  `;
}

// ----------------------
// PREDICCIÓN: VIDEO
// ----------------------
function mostrarBotonVideo() {
  document.getElementById('btnPredecirVideo').style.display = 'inline-block';
}

async function predecirVideo() {
  const etiquetas = ["🚫 Sin choque", "💥 Con choque"];
  const video = document.getElementById('videoVista');
  const archivo = document.getElementById('inputVideo').files[0];

  video.src = URL.createObjectURL(archivo);
  video.style.display = 'block';
  video.play();

  const canvas = document.createElement('canvas');
  canvas.width = 224;
  canvas.height = 224;
  const ctx = canvas.getContext('2d');

  async function analizarFrame() {
    if (video.paused || video.ended) return;

    ctx.drawImage(video, 0, 0, 224, 224);
    const imgData = ctx.getImageData(0, 0, 224, 224);
    const tensor = tf.browser.fromPixels(imgData).toFloat().expandDims().div(255);

    const prediccion = await modelo.predict(tensor).data();
    const probabilidad = Math.max(...prediccion);
    const clase = prediccion.indexOf(probabilidad);
    const etiqueta = etiquetas[clase];
    const porcentaje = (probabilidad * 100).toFixed(2);

    document.getElementById('resultadoVideo').innerHTML = `
      <div style="font-size: 18px; color: ${clase === 1 ? '#ff4d4d' : '#4caf50'};">
        <strong>${etiqueta}</strong>
      </div>
      <div>🧠 Precisión: <strong>${porcentaje}%</strong></div>
    `;

    setTimeout(analizarFrame, 1000); // cada segundo
  }

  video.addEventListener('play', analizarFrame);
}

// ----------------------
// PREDICCIÓN: CÁMARA
// ----------------------
function activarCamara() {
  const video = document.getElementById('camaraVista');
  const btnAnalizar = document.getElementById('btnAnalizarCamara');
  const resultado = document.getElementById('resultadoCamara');

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.style.display = 'block';
      btnAnalizar.style.display = 'inline-block';
      resultado.innerHTML = "";
    })
    .catch(err => {
      alert('No se pudo acceder a la cámara: ' + err);
    });
}

async function analizarCamara() {
  const etiquetas = ["🚫 Sin choque", "💥 Con choque"];
  const video = document.getElementById('camaraVista');
  const canvas = document.createElement('canvas');
  canvas.width = 224;
  canvas.height = 224;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, 224, 224);

  const imgData = ctx.getImageData(0, 0, 224, 224);
  const tensor = tf.browser.fromPixels(imgData).toFloat().expandDims();

  const inicio = performance.now();
  const prediccion = await modelo.predict(tensor).data();
  const fin = performance.now();

  const probabilidad = Math.max(...prediccion);
  const clase = prediccion.indexOf(probabilidad);
  const etiqueta = etiquetas[clase];
  const porcentaje = (probabilidad * 100).toFixed(2);
  const tiempo = (fin - inicio).toFixed(2);

  document.getElementById('resultadoCamara').innerHTML = `
    <div style="font-size: 18px; color: ${clase === 1 ? '#ff4d4d' : '#4caf50'};">
      <strong>${etiqueta}</strong>
    </div>
    <div>🧠 Precisión: <strong>${porcentaje}%</strong><br>⏱ Tiempo: ${tiempo} ms</div>
  `;
}

function apagarCamara() {
  const video = document.getElementById('camaraVista');
  const btnAnalizar = document.getElementById('btnAnalizarCamara');
  const resultado = document.getElementById('resultadoCamara');

  const stream = video.srcObject;
  if (stream) {
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    video.srcObject = null;
  }

  video.style.display = 'none';
  btnAnalizar.style.display = 'none';
  resultado.innerHTML = '';
}
function ocultarBarraSuperior() {
  const barra = document.getElementById('barraSuperior');
  if (barra) barra.style.display = 'none';
}
function volverAlMenu() {
  ocultarTodo();
  mostrarMenuPrincipal();
  const barra = document.getElementById('barraSuperior');
  if (barra) barra.style.display = 'flex'; 
}
// ----------------------
// UBICACIÓN CDMX
// ----------------------
const datosUbicacion = {
  cdmx: {
    "Álvaro Obregón": ["Santa Fe", "San Ángel", "Olivar de los Padres", "Atlamaya", "Florida"],
    "Azcapotzalco": ["Clavería", "San Álvaro", "Santa Bárbara", "El Rosario", "Camarones"],
    "Benito Juárez": ["Del Valle", "Nápoles", "Narvarte Poniente", "Portales Norte", "Acacias"],
    "Cuajimalpa de Morelos": ["Santa Fe", "La Venta", "El Contadero", "San Mateo Tlaltenango", "Cruz Manca"],
    "Coyoacán": ["Del Carmen", "Villa Coyoacán", "Romero de Terreros", "La Concepción", "Copilco"],
    "Cuauhtémoc": ["Centro Histórico", "Roma Norte", "Condesa", "Juárez", "Santa María la Ribera"],
    "Gustavo A. Madero": ["Lindavista", "La Villa", "Cuautepec", "Tepeyac Insurgentes", "San Felipe de Jesús"],
    "Iztacalco": ["Agrícola Oriental", "Viaducto Piedad", "Romero Rubio", "Valle de la Magdalena", "Pantitlán"],
    "Iztapalapa": ["Santa Martha Acatitla", "Culhuacán", "San Miguel Teotongo", "Lomas Estrella", "Ermita Zaragoza"],
    "La Magdalena Contreras": ["El Bosque", "Cerro del Judío", "El Ocotal", "El Tanque", "Potrerillo"],
    "Miguel Hidalgo": ["Polanco", "Anzures", "Tacubaya", "Lomas de Chapultepec", "Popotla"],
    "Milpa Alta": ["San Antonio Tecómitl", "Villa Milpa Alta", "San Salvador Cuauhtenco", "San Pablo Oztotepec", "San Bartolomé Xicomulco"],
    "Tláhuac": ["San Andrés Tetepilco", "La Conchita Zapotitlán", "Santiago Zapotitlán", "Santa Catarina", "Miguel Hidalgo"],
    "Tlalpan": ["Tlalpan Centro", "San Andrés Totoltepec", "Coapa", "Pedregal de Santa Úrsula", "Héroes de Padierna"],
    "Venustiano Carranza": ["Moctezuma", "Jardín Balbuena", "20 de Noviembre", "Morelos", "La Merced"],
    "Xochimilco": ["San Gregorio Atlapulco", "Santa Crucita", "Santiago Tulyehualco", "San Lucas Xochimanca", "San Luis Tlaxialtemalco"]
  }
};

function actualizarMunicipios() {
  const estado = document.getElementById("estado").value;
  const municipioSelect = document.getElementById("municipio");
  const coloniaSelect = document.getElementById("colonia");

  municipioSelect.innerHTML = "<option value='0'>Selecciona Municipio</option>";
  coloniaSelect.innerHTML = "<option value='0'>Selecciona Colonia</option>";

  if (datosUbicacion[estado]) {
    Object.keys(datosUbicacion[estado]).forEach(municipio => {
      const option = document.createElement("option");
      option.value = municipio;
      option.text = municipio;
      municipioSelect.appendChild(option);
    });
  }

  validarUbicacion();
}

function actualizarColonias() {
  const estado = document.getElementById("estado").value;
  const municipio = document.getElementById("municipio").value;
  const coloniaSelect = document.getElementById("colonia");

  coloniaSelect.innerHTML = "<option value='0'>Selecciona Colonia</option>";

  if (datosUbicacion[estado] && datosUbicacion[estado][municipio]) {
    datosUbicacion[estado][municipio].forEach(colonia => {
      const option = document.createElement("option");
      option.value = colonia;
      option.text = colonia;
      coloniaSelect.appendChild(option);
    });
  }

  validarUbicacion();
}

function validarUbicacion() {
  const estado = document.getElementById("estado").value;
  const municipio = document.getElementById("municipio").value;
  const colonia = document.getElementById("colonia").value;

  const btnCamara = document.getElementById("btnActivarCamara");
  const esValido = estado !== "0" && municipio !== "0" && colonia !== "0";

  btnCamara.disabled = !esValido;
}


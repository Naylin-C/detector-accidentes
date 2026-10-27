# Accident Detection System | Sistema de Detección de Accidentes

> **Status / Estado:** Historical academic prototype under recovery and technical review. **Not yet validated as a working release.**  
> Prototipo académico histórico en recuperación y revisión técnica. **Su funcionamiento aún no ha sido validado.**

## Overview / Descripción

Academic computer-vision project intended to classify traffic-accident scenes through a browser interface. The recovered code contains interfaces for image uploads, video uploads and camera input, with inference implemented using TensorFlow.js.

Proyecto académico de visión por computadora orientado a clasificar escenas de accidentes de tránsito mediante una interfaz web. El código recuperado incluye opciones para imágenes, videos y cámara, con inferencia mediante TensorFlow.js.

## Technologies / Tecnologías

- HTML, CSS, JavaScript
- TensorFlow.js
- TensorFlow / Keras (exported model metadata)

## Recovered structure / Estructura recuperada

- `AccidentesC5/index.html`: browser interface / interfaz web
- `AccidentesC5/css/styles.css`: styles / estilos
- `AccidentesC5/js/app.js`: application and inference logic / lógica de aplicación e inferencia
- `AccidentesC5/models/modelo_web/`: model manifest and weight shards / manifiesto y pesos del modelo
- `AccidentesC5/images/`: UI assets / recursos visuales

## Technical review / Revisión técnica

The following issues were identified by static code inspection; runtime behavior has **not** been tested:

1. **Model path (code fix applied, runtime unverified):** `app.js` now uses `./models/modelo_web/model.json` relative to the application page. Test with a local HTTP server to confirm it resolves.
2. **Preprocessing consistency:** image, video and camera paths do not apply identical pixel normalization. The expected input scaling must be checked against the original training pipeline before changing it.
3. **Model readiness (code fix applied, runtime unverified):** image, video and camera prediction actions now check whether the model has loaded and display an alert otherwise.
4. **Video processing:** frame processing and playback event handling need runtime testing to verify behavior and resource cleanup.
5. **Evaluation:** no independently verified accuracy, validation dataset, or reproducible performance benchmark is established by this recovery review.

## Next steps / Próximos pasos

- Confirm which historical revision is appropriate for restoration.
- Run the web application locally with a server and inspect console errors.
- Verify model loading, input preprocessing, and output labels.
- Test image, video, and camera paths independently.
- Add reproducible setup instructions and evidence of validated results.

## Context / Contexto

This is a recovered historical snapshot, not a claim that the current branch is the final version of the original project. Do not use it for safety-critical accident detection or emergency response.

Este repositorio documenta una versión histórica recuperada; no se presenta como la versión definitiva del proyecto ni como un sistema apto para respuesta a emergencias.

## Local test / Prueba local

From the recovered branch, run a local HTTP server with `AccidentesC5` as the document root (for example, `cd AccidentesC5` followed by `python -m http.server 8000`). Open `http://localhost:8000/` in a browser, inspect the developer console, and confirm the model manifest and all weight shards load successfully. Camera access may require a secure context; `localhost` is normally treated as secure by modern browsers. The model is large, so initial loading may take time. Do not interpret the UI's per-prediction confidence percentage as independently measured accuracy.

Desde la rama recuperada, inicia un servidor HTTP local desde `AccidentesC5`, abre `http://localhost:8000/` y revisa la consola del navegador. Verifica que se carguen el manifiesto y los pesos. El porcentaje mostrado por predicción representa una puntuación del modelo, no una precisión global validada.

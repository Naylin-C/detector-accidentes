# Traffic Accident Detection | Detección de Accidentes

**Computer Vision · Deep Learning · TensorFlow.js · JavaScript**

## About the project

An academic computer-vision prototype designed to explore automated classification of traffic scenes into **accident** and **no accident** categories. The project combines a TensorFlow/Keras model exported to TensorFlow.js with a browser-based interface.

The recovered implementation includes three input modes:
- **Image:** upload a photograph for classification.
- **Video:** analyze frames from an uploaded video.
- **Camera:** capture a frame from a connected camera for classification.

The interface displays the predicted class, the model's output score, and inference timing for some modes. It also includes a location-selection interface for Mexico City; this is a UI feature, **not** verified geolocation or emergency-service integration.

## Technologies

| Area | Tools |
| --- | --- |
| Machine learning | TensorFlow / Keras, TensorFlow.js |
| Frontend | HTML, CSS, JavaScript |
| Model integration | Browser-based image processing and inference |
| Inputs | Image upload, video upload, camera |

## Repository structure

```text
AccidentesC5/
├── index.html              # Web interface
├── css/styles.css          # Styling
├── js/app.js               # Input handling and inference
├── images/                 # Interface assets
└── models/modelo_web/      # TensorFlow.js model and weights
```

## What this project demonstrates

- Integration of a deep-learning model into a web application
- Image and video input processing in JavaScript
- Interactive user-interface development
- Working with model predictions and browser APIs

## Project status

**Academic prototype — historical version recovered.** The source code and model files are available for review, but this snapshot has **not been fully tested or independently benchmarked**. The original training notebook and evaluation dataset are not available, so no accuracy percentage is claimed here. The application is not intended for real-world emergency or safety-critical use.

The model is large (approximately 646 MB of weight files), and running the demo requires serving `AccidentesC5/` through a local HTTP server. The model's preprocessing and end-to-end behavior still need validation.

---

## Español

Este proyecto académico explora la **detección de accidentes de tránsito mediante visión por computadora e inteligencia artificial**. Integra un modelo de TensorFlow/Keras exportado a TensorFlow.js con una interfaz web desarrollada en HTML, CSS y JavaScript.

La aplicación contempla el análisis de **imágenes, videos y capturas de cámara**, mostrando la clasificación estimada entre *con choque* y *sin choque*. También incluye una interfaz de selección de ubicación en la Ciudad de México.

**Habilidades aplicadas:** integración de modelos de aprendizaje profundo, procesamiento de imágenes, desarrollo frontend y programación en JavaScript.

**Estado:** prototipo académico recuperado de una versión histórica. No se ha completado su validación funcional ni se dispone del cuaderno de entrenamiento o de métricas verificables de evaluación. No es un sistema operativo de atención a emergencias.

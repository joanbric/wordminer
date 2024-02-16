# Proyecto Name

## Descripción del Proyecto
Este proyecto es una aplicación web diseñada para ayudar a los lectores que están aprendiendo inglés. La aplicación permite a los usuarios tomar una foto de una palabra desconocida en un texto impreso, luego utiliza la tecnología de reconocimiento óptico de caracteres (OCR) proporcionada por la librería Tesseract.js para extraer el texto de la imagen. Una vez que se identifica la palabra, la aplicación utiliza inteligencia artificial para proporcionar al usuario la definición de esa palabra en el contexto específico de la oración o párrafo en el que aparece.

## Tecnologías Utilizadas
- SvelteKit: Un marco de trabajo de desarrollo web progresivo para construir aplicaciones web interactivas y reactivas.
- Tesseract.js: Una librería de OCR basada en JavaScript que permite reconocer texto en imágenes.

## Características Principales
- Escaneo de Palabras: Los usuarios pueden tomar una foto de una palabra desconocida en un texto impreso.
- Reconocimiento de Texto: La aplicación utiliza Tesseract.js para extraer el texto de la imagen.
- Definiciones Contextuales: Utilizando inteligencia artificial, la aplicación proporciona al usuario la definición de la palabra en el contexto específico de la oración o párrafo en el que aparece.

## Instalación
1. Clona este repositorio: `git clone https://github.com/joanbric/wordminer-sveltekit.git`
2. Accede al directorio del proyecto: `cd wordminer-sveltekit`
3. Instala las dependencias: `npm install`

## Uso
1. Ejecuta la aplicación localmente: `npm run dev`
2. Abre tu navegador y accede a `http://localhost:3000`
3. Usa la aplicación para escanear palabras desconocidas en textos impresos y obtener definiciones contextuales.

## Contribuciones
¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto, sigue estos pasos:
1. Crea un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit de ellos (`git commit -am 'Añade nueva característica'`).
4. Haz push de la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia
Este proyecto está bajo la Licencia [MIT](./LICENSE).
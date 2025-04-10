// Colores de las estrellas
const colors = ['#FF00FF', '#9095f4', '#95ecac'];
let starCount = 0;
const maxStars = 100; // Límite máximo de estrellas

function createStar() {
    if (starCount >= maxStars) return;
    
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Tamaño aleatorio
    const size = Math.random() * 5 + 5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Posición en toda la página (incluyendo área de scroll)
    star.style.left = `${Math.random() * document.documentElement.scrollWidth}px`;
    star.style.top = `${Math.random() * document.documentElement.scrollHeight}px`;
    
    // Color aleatorio
    star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(star);
    starCount++;
    
    // Eliminar después de 10 segundos
    setTimeout(() => {
        star.remove();
        starCount--;
    }, 10000);
}

function generateStars() {
    // Generar primeras 10 estrellas inmediatamente
    for (let i = 0; i < 10; i++) {
        createStar();
    }
    
    // Luego generar gradualmente
    const starInterval = setInterval(() => {
        if (starCount < maxStars) {
            createStar();
        } else {
            clearInterval(starInterval);
        }
    }, 300); // Cada 300ms
}

// Ajustar estrellas al redimensionar
window.addEventListener('resize', () => {
    document.querySelectorAll('.star').forEach(star => {
        star.style.left = `${Math.random() * document.documentElement.scrollWidth}px`;
        star.style.top = `${Math.random() * document.documentElement.scrollHeight}px`;
    });
});

window.onload = generateStars;

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Redirigir todas las rutas no encontradas a la página 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
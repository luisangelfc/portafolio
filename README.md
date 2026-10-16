# 🚀 Portafolio Web — Luis Angel Hernández Martínez

Portafolio web personal desarrollado con React 19 y TypeScript. Diseño **Glassmorphism** con sistema de tokens personalizado, navegación responsiva con menú hamburguesa, animaciones fluidas con Framer Motion y efecto typewriter en el Hero.

🔗 **Demo en vivo:** [portafolioweb-angel.netlify.app](https://portafolioweb-angel.netlify.app/)

---

## ✨ Características

- **Hero interactivo** con efecto typewriter animado en el nombre
- **Split Card** con foto de perfil integrada, badge de disponibilidad y redes sociales
- **Carrusel de proyectos** con navegación por flechas, dots de paginación y scroll táctil
- **Sección de habilidades** organizada por categorías con badges tecnológicos
- **Sección de contacto** con copia de email al portapapeles
- **Navegación hamburguesa** responsiva con overlay animado para móvil
- **Glassmorphism** con backdrop-filter, gradientes y micro-animaciones
- **SEO optimizado**: meta tags, Open Graph, Twitter Card y robots
- **Compresión de assets**: gzip + brotli vía vite-plugin-compression
- **Accesibilidad**: roles ARIA, etiquetas semánticas y navegación por teclado

---

## 🛠️ Tecnologías

| Categoría | Tecnología |
|---|---|
| Framework | React 19 + TypeScript |
| Bundler | Vite 6 |
| Estilos | Emotion (CSS-in-JS) |
| Animaciones | Framer Motion |
| Iconos | React Icons (Font Awesome) |
| Fuentes | Google Fonts — Inter + Poppins |
| Deploy | Netlify (CI/CD desde GitHub) |

---

## 📁 Estructura del proyecto

```
src/
├── assets/               # Imágenes (foto, proyectos)
├── components/
│   ├── layout/           # Layout principal
│   ├── navigation/       # FloatingNav + hamburguesa
│   └── sections/         # Hero, Projects, Skills, Contact
├── hooks/                # useKeyboardNavigation
├── styles/               # theme.ts + GlobalStyles
├── App.tsx
└── main.tsx
```

---

## 🗂️ Proyectos incluidos

1. **Keso Pastelería** — Backend Java + Spring Boot (Bootcamp Generation MX)
2. **Salón Carmín** — Sitio web freelance en producción
3. **EDAT** — Prototipo web para Hackatón LiverHack (Liverpool)
4. **PokeAPI Pagination** — Consumo de API REST con JavaScript Vanilla
5. **To Do List** — Gestor de tareas con persistencia en cookies
6. **Portafolio Web** — Este mismo proyecto

---

## ⚙️ Instalación y uso local

```bash
# Clonar el repositorio
git clone https://github.com/luisangelfc/portafolio.git
cd portafolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build
```

---

## 📬 Contacto

- **GitHub:** [github.com/luisangelfc](https://github.com/luisangelfc)
- **LinkedIn:** [linkedin.com/in/luisangelhm04](https://www.linkedin.com/in/luisangelhm04)
- **Email:** angelhmtzz@gmail.com

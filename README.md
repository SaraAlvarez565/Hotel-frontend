# 🌸 StayBloom

![Logo](https://img.shields.io/badge/StayBloom-Hotel%20Booking-ff6f91?style=for-the-badge)

Aplicación web full stack para reservas de alojamientos y hoteles.  
Permite a los usuarios registrarse, iniciar sesión, explorar alojamientos disponibles, reservar fechas, agregar favoritos y dejar reseñas.  
Los administradores pueden gestionar productos y categorías desde un panel administrativo.

---

# 🎨 Paleta de colores

| Color | Hex |
|------|------|
| Rosa principal | `#ff6f91` |
| Rosa suave | `#ffe4ec` |
| Fondo claro | `#fff5f8` |
| Gris oscuro | `#2b2b2b` |
| Gris texto | `#666666` |
| Blanco | `#ffffff` |

---

# ✨ Características principales

✅ Registro e inicio de sesión  
✅ Panel administrador  
✅ CRUD de productos  
✅ Categorías dinámicas  
✅ Sistema de reservas  
✅ Favoritos  
✅ Reviews y calificaciones  
✅ Compartir productos  
✅ Historial de reservas  
✅ Responsive design  
✅ Navbar dinámica  
✅ Diseño moderno y minimalista  

---

# ⚙️ Tecnologías

## 🖥️ Frontend
- React 18 + Vite
- React Router DOM
- Axios
- CSS Inline Styles
- LocalStorage

## ☕ Backend
- Java 17
- Spring Boot 3
- Spring Data JPA
- Spring Security
- MySQL
- Lombok

---

# 🚀 Instalación local

## 🧩 Requisitos previos
- Node.js 18+
- Java 17+
- MySQL
- IntelliJ IDEA o VS Code

---

## 📦 Clonar el repositorio

```bash
git clone https://github.com/saralvarez/staybloom.git
cd staybloom
```

---

# 📁 Backend (`/backend`)

```bash
cd backend
```

## 🗄️ Configurar base de datos

```sql
CREATE DATABASE hotel_db;
```

---

## ⚙️ Configurar `application.properties`

Ubicado en:

```bash
src/main/resources/application.properties
```

Contenido:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hotel_db
spring.datasource.username=root
spring.datasource.password=https891601@STHV

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

---

## ▶️ Ejecutar backend

Desde IntelliJ:
- Abrir proyecto backend
- Ejecutar clase principal `BackendApplication`

O desde terminal:

```bash
./mvnw spring-boot:run
```

> Backend disponible en:

```bash
http://localhost:8080
```

---

# 🖼️ Frontend (`/frontend`)

```bash
cd frontend
npm install
```

---

## ⚙️ Configurar API

Crear archivo:

```bash
src/services/api.js
```

Contenido:

```javascript
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api"
});
```

---

## ▶️ Ejecutar frontend

```bash
npm run dev
```

> Frontend disponible en:

```bash
http://localhost:5173
```

---

# 📬 Endpoints (API REST)

| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| POST | /api/auth/register | Registro de usuario |
| POST | /api/auth/login | Inicio de sesión |
| GET | /api/products | Obtener productos |
| GET | /api/products/{id} | Detalle producto |
| POST | /api/products | Crear producto |
| DELETE | /api/products/{id} | Eliminar producto |
| GET | /api/categories | Obtener categorías |
| POST | /api/reservations | Crear reserva |
| GET | /api/reservations/product/{id} | Reservas por producto |
| POST | /api/reviews | Crear reseña |
| GET | /api/reviews/product/{id} | Obtener reseñas |
| POST | /api/favorites | Agregar/Quitar favorito |
| GET | /api/favorites/user/{id} | Favoritos usuario |

---

# 🗂️ Entidades principales

- User
- Product
- Category
- Reservation
- Review
- Favorite
- Feature

---

# 📱 Responsive Design

La aplicación fue diseñada para:
- Desktop 💻
- Tablet 📱
- Mobile 📲

---

# ☁️ Deploy

## Backend
- Spring Boot

## Frontend
- React + Vite

---

# 👤 Autor

### Sara Alvarez 🌸

Proyecto académico desarrollado como plataforma de reservas tipo Digital Booking.

---

# 📄 Licencia

MIT License

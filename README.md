# 💈 AppSalon

**AppSalon** is a complete hair salon booking system built with **PHP (MVC pattern)**, **MySQL**, **JavaScript**, **SASS**, and **Gulp**.  
It includes both **client** and **admin** modules, and a custom **REST API** for managing services and appointments.

The system allows users to **register**, **verify their accounts via email token**, **recover passwords**, and **book appointments**.  
Administrators can **manage services**, **update or delete bookings**, and **view appointments by date**.  

---

## 🌐 Live Demo
🔗 **View the project:** [Appsalon](https://appsalon-mvc-ingmichelleberrio.nue.dom.my.id/)

---

## 🧱 Project Structure
```
APPSALON/
│
├── classes/ # Core classes and helpers
├── controllers/ # Application controllers (MVC)
├── includes/ # Configuration and global functions
├── models/ # Database models
├── node_modules/ # Node dependencies
├── public/ # Public assets (CSS, JS, images)
├── src/ # Source SASS and JS files
├── vendor/ # Composer dependencies
├── views/ # PHP views (frontend & admin)
│
├── .gitignore
├── appsalon_mvc.sql # Database structure
├── composer.json # PHP dependencies
├── gulpfile.js # Build automation setup
├── package.json # Node dependencies
├── Router.php # Main router
```
---

## 🧰 Tech Stack

- **PHP** – MVC architecture  
- **MySQL** – Relational database  
- **JavaScript** – Dynamic front-end interactions  
- **SASS** – Advanced styling preprocessor  
- **Gulp** – Task runner for compiling and minifying assets  
- **Composer** – PHP dependency manager  
- **REST API** – For handling appointments and services  
- **Email Service:** Mailtrap for testing email sending  
---

## ⚙️ Installation & Configuration

1. **Clone the repository**  
```bash
git clone https://github.com/Michelle453/appsalon-mvc
cd real-estate-mvc
```
2. **Install Composer and npm dependencies**
```bash
composer install
npm install
```
3. **Set up the database**
   - Create a new MySQL database.
   - Import the appsalon_mvc.sql file.
     
4. **Set up configuration**
   -Edit your config file inside /includes or create an .env file.
   -Add your database credentials, email server settings.

5. **Configure email (Mailtrap)**
   - Create a free account at Mailtrap
   - Get your username and password from Mailtrap.
    
6. **Compile assets (SCSS & JS)**
```bash
   gulp
```
7. **Run the local server**
```bash
   php -S localhost:3000 -t public
```
---
## ✨ Features

### 👤 User Module
- Account registration and verification via email token  
- Password recovery  
- Appointment booking with date and service selection  

### 🧑‍💼 Admin Module
- Create, edit, and delete salon services  
- View and manage appointments by date  
- Delete appointments  

### 🔗 REST API
Built-in API for managing:  
- **Services** (`GET`, `POST`, `DELETE`)  
- **Appointments** (`GET`, `POST`, `DELETE`)  
Provides secure and modular interaction between front-end and back-end.  

### ⚙️ Technical
- MVC design pattern for scalability  
- Separation of concerns between logic, views, and data  
- Gulp automated workflow (compile, minify, watch)  
- Clean, maintainable PHP and SASS structure
  
---

## 🔐 Test Credentials

You can use the following test accounts to explore the system:

### 🧑‍💼 Administrator
- **Email:** `admin@admin.com`  
- **Password:** `1234567`

### 👤 Client
- **Email:** `prueba2@prueba.com`  
- **Password:** `1234567`
  
---
⭐ If you liked this project, don’t forget to give it a star on GitHub! ⭐

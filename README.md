# SPA-G70-2022: Fleet Management System

This repository contains the Single Page Application (SPA) frontend for the Fleet Management System developed by Group 70 in 2022. The project was built using Angular as part of LAPR5 (Laboratory of Software Architecture and Design 5) at ISEP (Instituto Superior de Engenharia do Porto).

## 📋 Table of Contents

- [🚀 Overview](#-overview)
- [🛠️ Technologies](#️-technologies)
- [📂 Repository Structure](#-repository-structure)
- [🚦 Features](#-features)
- [🔧 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Building for Production](#building-for-production)
- [💻 Project Structure](#-project-structure)
- [📱 Angular Components](#-angular-components)
- [🌐 API Integration](#-api-integration)
- [👥 Contributors](#-contributors)

## 🚀 Overview

This SPA (Single Page Application) serves as the frontend for a comprehensive Fleet Management System. It provides a user-friendly interface for managing vehicles, routes, planning deliveries, and visualizing the fleet's operational data. The application integrates with a .NET Core backend system and is built using Angular framework.

## 🛠️ Technologies

- **Angular** - Frontend framework
- **TypeScript** - Programming language
- **Angular Material** - UI component library
- **Angular Router** - For navigation
- **RxJS** - Reactive extensions for asynchronous operations
- **HttpClient** - For API communication
- **NgRx** (if used) - State management
- **Leaflet/OpenLayers** - For maps and visualization
- **JWT** - For authentication

## 📂 Repository Structure

The project follows a standard Angular application structure:

```
/
├── src/                     # Source code
│   ├── app/                 # Angular application
│   │   ├── components/      # Shared components
│   │   ├── models/          # Data models & interfaces
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── guards/          # Route guards
│   │   ├── interceptors/    # HTTP interceptors
│   │   ├── app-routing.module.ts # Routing configuration
│   │   ├── app.component.ts # Root component
│   │   └── app.module.ts    # Root module
│   ├── assets/              # Static assets
│   ├── environments/        # Environment configuration
│   ├── index.html           # Main HTML file
│   ├── styles.scss          # Global styles
│   └── main.ts              # Application entry point
├── angular.json             # Angular CLI configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # Documentation
```

## 🚦 Features

- **User Authentication** - Secure login and role-based access control
- **Vehicle Management** - Add, edit, and track fleet vehicles
- **Route Planning** - Create and optimize delivery routes
- **Warehouse Management** - Track inventory and logistics
- **Interactive Maps** - Visualize routes and vehicle locations
- **Delivery Planning** - Schedule and monitor deliveries
- **Analytics Dashboard** - View operational statistics and KPIs

## 🔧 Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)
- API backend running (see related repository for backend setup)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GuilhermeCunha79/spa-g70-2022.git
   cd spa-g70-2022
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   Edit `src/environments/environment.ts` for development or `environment.prod.ts` for production settings.

### Running the Application

1. Start the development server:
   ```bash
   ng serve
   ```

2. Access the application at `http://localhost:4200`

### Building for Production

1. Generate a production build:
   ```bash
   ng build --prod
   ```

2. The output will be in the `dist/` directory

## 💻 Project Structure

The application follows Angular's component-based architecture with separation of concerns:

- **Modules** - Feature and shared modules
- **Components** - Reusable UI elements
- **Services** - Business logic and API communication
- **Models** - TypeScript interfaces for data structures
- **Guards** - Route access control
- **Interceptors** - HTTP request/response handling

## 📱 Angular Components

The application includes various components for different features:

- **Authentication** - Login, registration forms
- **Navigation** - Sidebar, navbar, breadcrumbs
- **Tables** - Data tables for various entity types
- **Forms** - Creation and editing forms with Angular Reactive Forms
- **Maps** - Route visualization and planning components
- **Dashboard** - Analytics and reporting widgets

## 🌐 API Integration

The SPA integrates with a .NET Core backend API for data management. The communication is handled through Angular's HttpClient service and follows RESTful principles.

## 👥 Contributors

This project was developed by ISEP students from Group 70 (2022):
- Guilherme Cunha
- Beatriz Cardoso
- Hugo Carvalho
- Érica Lopes

---

This project is part of the Software Engineering curriculum at ISEP, developed for LAPR5.

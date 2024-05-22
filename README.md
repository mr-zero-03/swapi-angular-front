# PruebaTecnicaAngular

## Arhivos empleados
Tomando la carpeta src/app como raiz, tenemos que:

En el componente de "list" se definen los props
- components/ --> Es la carpeta que almacena todos los componentes
- components/list/ --> Componente dinamico que permite mostrar la informaciom de cada vista en tabla

Cada vista se encarga de sacar los datos respectivos desde el controlador y pasarlos al componente list
- pages/ --> Es la carpeta que almacena nuestras paginas o vistas
- pages/planetas/ --> Vista empleada para el listado de planetas
- pages/residentes/ --> Vista empleada para el listado de residentes
- pages/vehiculos/ --> Vista empleada para el listado de vehiculos

- api/ --> Es nuestro servicio que se encarga de consumir los datos del API de swapi.dev

- app.routes.ts --> Archivo en donde configuramos cada una de las rutas de nuestra App


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

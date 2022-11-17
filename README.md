## Guía de inicialización

# 1. Iniciar contenedores
* Acceder a la carpeta "container"
* Ejecutar comando 
```bash
$ docker-compose up
```
* Asegurarse todo esté activo
<p align="center">
  <img src="https://file.pinfile.net/sx8qtsvgn/docker-compose-up.png" width="200" alt="" />
</p>


# 2. Iniciar módulo antifraude
* Acceder a la carpeta "anti-fraud"
* Ejecutar comando de instalación
```bash
$ npm install
```
* Ejecutar comando de inicialización
```bash
$ npm run start:dev
```
* Asegurarse todo esté activo
<p align="center">
  <img src="https://file.pinfile.net/daunljmoz/antifraude-up.png" width="200" alt="" />
</p>


# 3. Iniciar módulo transacción
* Acceder a la carpeta "transaction"
* Ejecutar comando de instalación
```bash
$ npm install
```
* Ejecutar comando de inicialización
```bash
$ npm run start:dev
```
* Asegurarse todo esté activo
<p align="center">
  <img src="https://file.pinfile.net/etkofzkom/transaction-up.png" width="200" alt="" />
</p>


# 4. Iniciar api/graphql
* Acceder a la carpeta "api"
* Ejecutar comando de instalación
```bash
$ npm install
```
* Ejecutar comando de inicialización
```bash
$ npm run start:dev
```
* Asegurarse todo esté activo
<p align="center">
  <img src="https://file.pinfile.net/yfok8yhoh/api-up.png" width="200" alt="" />
</p>

* Utilizar API en http://localhost:3000/graphql
* Las estructuras para creación y consulta de transacción están en ./graphql/*.txt


## Flujo de transacción

# Crear transacción. Registra con estado 'pending'
<p align="center">
  <img src="https://file.pinfile.net/1pbccxx/create-transaction.png" width="200" alt="" />
</p>

# Mensaje recibido por módulo antifraude - transacción pendiente. Solo evalúa regla de monto
<p align="center">
  <img src="https://file.pinfile.net/bubug3to6/message-antifraud.png" width="200" alt="" />
</p>

# Mensaje recibido por módulo transacción - transacción 'approved' o 'rejected'. Actualiza estado final de transacción
<p align="center">
  <img src="https://file.pinfile.net/judo9yooh/message-transaction.png" width="200" alt="" />
</p>

# Consulta a consola database
<p align="center">
  <img src="https://file.pinfile.net/3lp4jx6kb/console-db.png" width="200" alt="" />
</p>

# Consulta en entorno graphql
<p align="center">
  <img src="https://file.pinfile.net/ikzzmgmy4/get-transaction.png" width="200" alt="" />
</p>

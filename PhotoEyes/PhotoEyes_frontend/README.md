# Démarrage du projet PhotoEyes
## Prérequis

Avant de démarrer le projet, assurez-vous d'avoir installé :

'-Java 21'
'-Node.js (version 20+ recommandée)'
'-Angular CLI'
'-MySQL ou XAMPP'
'-Git'
'-IntelliJ IDEA (Backend)'
'-VS Code ou IntelliJ IDEA (Frontend)'

1. Démarrer la base de données

## Lancer MySQL depuis XAMPP.

'Créer une base de données :'

    CREATE DATABASE photoeyes;

'Configurer :'

spring.datasource.url=jdbc:mysql://localhost:3306/photoeyes
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

2. Démarrer le Backend Spring Boot

## Ouvrir le projet backend :

sa-backend

## Installer les dépendances Maven :

mvn clean install

## Lancer l'application :

mvn spring-boot:run

## ou directement depuis IntelliJ :

Run -> SaBackendApplication

## Le serveur démarre sur :

http://localhost:8080

3. Démarrer le Frontend Angular

## Ouvrir le projet :

PhotoEyes_frontend 

'Installer les dépendances :'

npm install

'Démarrer Angular :'

ng serve

'Application disponible sur :'

http://localhost:4200

4. Communication Front ↔ Back

## Le frontend Angular communique avec Spring Boot via HTTP.

Exemple :

'POST http://localhost:8080/api/auth/register'
'POST http://localhost:8080/api/auth/login'
'POST http://localhost:8080/api/reservation/create'
Dynamic Label Change Pilot Project
Overview
This repository contains a backend application built with Spring Boot and a frontend application developed using React and TypeScript. The project is designed to manage label personalization for different modules, screens, and tenants.
Project Structure
Backend

src/main/java/org/backend: Main source directory for the backend.
config: Configuration files.
controller: REST controllers (e.g., LabelController.java).
dto: Data transfer objects (e.g., LabelDto.java, LabelPersonalizationFullRequest.java).
entity: Entity classes (e.g., Label.java, Screen.java).
exception: Custom exception classes.
repository: Repository interfaces (e.g., LabelPersonalizationRepository.java).
service: Service classes (e.g., BackendApplication.java).


resources: Configuration files (e.g., application.properties).
pom.xml: Maven build file with dependencies.

Frontend

public: Static assets (e.g., vite.svg).
src: Main source directory for the frontend.
App.css, App.tsx: Main application styles and component.
api: API service files (e.g., labelService.ts).
assets: Static assets (e.g., react.svg).
components: Reusable components (e.g., CustomerDetailsForm.tsx, Header.tsx).
hooks: Custom hooks (e.g., useLabels.ts).
types: TypeScript type definitions.


package.json: Node.js package configuration.

Setup
Prerequisites

Java 17
Node.js and npm
MySQL

Backend Setup

Configure application.properties with your MySQL database details.
Run mvn clean install to build the project.
Start the application using mvn spring-boot:run or run BackendApplication.java in your IDE.

Frontend Setup

Navigate to the frontend directory.
Run npm install to install dependencies.
Start the development server with npm run dev.

APIs
Get All Labels

Endpoint: GET http://localhost:8080/fusionX/{{moduleName}}/{{tenantId}}/{{screenName}}/labels
Response: JSON array of labels.

Get Single Label

Endpoint: GET http://localhost:8080/fusionX/{{moduleName}}/{{tenantId}}/{{screenName}}/labels/{{labelKey}}
Response: JSON object of a single label.

Personalize Label

Endpoint: POST http://localhost:8080/fusionX/{{moduleName}}/{{tenantId}}/{{screenName}}/labels/{{labelKey}}
Payload: { "personalizedName": "string", "updatedBy": "string" }
Response: JSON object with updated label.

Bulk Personalize Labels (Backend Use Only)

Endpoint: POST http://localhost:8080/fusionX/labels/personalize
Payload: JSON array of label personalization requests.


# Requirements
```
npm install
```

# Build 
- install the requirements with npm 
- build the production angular code which will be placed in the /dist directory
- then build the docker image, where the /dist directory gets copied to the nginx static content directory
```
docker build -t auth-dev-frontend
```

# Run 
## Docker
- set env "KEYCLOAK_URL" as URL to the Keycloak service
- set env "KONG_URL" as URL to Kong
- set env "CLIENT_ID" as the id of the client that has to be setup at Keycloak because this frontend acts as an client

```
docker run -e "CLIENT_ID=auth-dev-frontend" -e "KONG_URL=http://fgseitsrancher.wifa.intern.uni-leipzig.de:8000" -e "KEYCLOAK_URL=http://fgseitsrancher.wifa.intern.uni-leipzig.de:8087" auth-dev-frontend
```

# Angular CLI
- angular environments:
- debug: for local dev with ng serve, no environent variables needed, hardcoded urls to kong and keycloak
```
ng serve
```
- production: for Rancher - you have to set environment variables

# Documentation
## How to add documentation
To add sites to the documentation:
- add component in the platform-doc folder
- add route in app.module.ts
- add page to search logic in app.component.ts

# Theme 
To update the theme, change the theme.scss file in the assets directory.
https://material.angular.io/guide/theming

# TODO
- change platform doc layout to css grid + responsiv
- LOGIN_REQUIRED field 


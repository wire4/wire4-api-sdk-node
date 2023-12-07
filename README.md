## wire4-api-sdk-node

Referencia de la API de Wire4  

Cliente sdk para trabajar con el api de wire4<br>Wire4 es una API - Fintech de Banco Monex con la que podrás administrar transferencias SPEI

- Versión del API de Wire4: 1.0.0
- Versión del paquete SDK: 1.2.4

Entorno
* Javascript es5+
* NodeJS v10.15.0+
* npm v6.4+


### Instalación desde el respositorio fuente

Para compilar el proyecto fuente y descargar las librerias asociadas, clonar el proyecto desde este repositorio de github y ejecutar la instrucción:
```
npm install

```

### Publicar

Primeramente compilar el proyecto y ejecutar la instrucción ```npm publish``` recuerde que debe gestionar su proyecto en npm.

### Consumir desde npm

Para consumir la librería actual de Wire4 para nodejs sin utilizar el repositorio fuente, descargue directamente el compilado desde npm con las siguientes instrucciones.

_publicado:_

```
npm install wire4-api-sdk --save
```

## Cómo iniciar
### Importar librería de Wire4
Primeramente se tiene que hacer uso del autenticador en el código pues es el que permitirá consumir los endpoints del API. Para implementar el autenticador se debe hacer lo siguiente:

```
var ow = require('oauthwire4').default; 
var environment = require('oauthwire4/dist/src/environmentEnum').EnvironmentEnum;

var outhWire4 = new ow(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, environment.SANDBOX);
```

El environment se refiere al uso de SANDBOX o de PRODUCTION, según se requiera.

### Implementación de código

Por favor sigue el procedimiento de instalación (Instalacion y uso) y ejecuta el siguiente código de ejemplo reemplazando las credenciales de aplicación por tus datos. Toma en cuanta que estos son ejemplos que te servirán de referencia y que pueden cambiar pero debes crear una cuenta en wire4.mx para obtener tus datos de aplicación.

```
try {
    var instance = new api.InstitucionesApi();
    var oauthWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

    const authorization = await oauthWire4.obtainAccessTokenApp('general');
    const response = await instance.getAllInstitutionsUsingGET(authorization, {});
    console.log(JSON.stringify(response));
} catch (error) {

    if(error.status !== undefined ) {
        console.log('Error:' + error.status, ' mensaje:' + error.statusText);
    } else {
        console.log('Error:' + error);
    }

}
```

En el proyecto de github https://github.com/wire4/wire4-api-sdk-node encontrarás una sección de ejemplos (examples) que ilustra el uso del sdk en cada uno de los recursos disponibles en el api, sin embargo, si requieres mas información te recomendamos visitar el sitio de referencia en **https://developers.wire4.mx**
## Documentación para la autenticación


## Autenticación de aplicación

- **Type**: OAuth
- **Flow**: application
- **Authorization URL Sandbox**: *https://sandbox-api.wire4.mx/token*
- **Authorization URL Producción**: *https://api.wire4.mx/token*
- **Scopes**:
- **** `general`
- **** `codi_general`

## Autenticación de usuario de aplicación SPEI

- **Type**: OAuth
- **Flow**: password
- **Authorization URL Sandbox**: *https://sandbox-api.wire4.mx/token*
- **Authorization URL Producción**: *https://api.wire4.mx/token*
- **Scopes**:
- **** spei_admin
- **** codi_admin
- **** codi_report

## Autenticación de usuario de aplicación SPID

- **Type**: OAuth
- **Flow**: password
- **Authorization URL Sandbox**: *https://sandbox-api.wire4.mx/token*
- **Authorization URL Producción**: *https://api.wire4.mx/token*
- **Scopes**:
- **** spid_admin:


## Author

Wire4 Todos los derechos reservados 2020. Politicas de privacidad - Términos y condiciones  *https://wire4.mx/#/policies/use-policies*

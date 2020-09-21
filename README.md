## wire4-api-sdk-node

Referencia de la API de Wire4  

Cliente sdk para trabajar con el api de wire4<br>Wire4 es una API - Fintech de Banco Monex con la que podrás administrar transferencias SPEI

Entorno
* Javascript es5+
* NodeJS v10.15.0+
* npm v6.4+


### Instalación desde el respositorio fuente

Para copilar el proyecto fuente y descargas las librerias asociadas, clonar el proyecto desde este repositorio de github y ejecutar la instrucción:
```
npm install

```

### Publicar

Primeramente compilar el proyecto y ejecutar la instrucción ```npm publish``` recuerde que debe gestionar su proyecto en npm.

### Consumir desde npm

Para consumir la librería actual de Wire4 para nodejs sin utilizar el repositorio fuente, descargando directamente el compilado desde npm si tienen las siguientes instrucciones.

_publicado:_

```
npm install wire4-api-sdk-node --save
```

## Cómo iniciar

Por favor sigue el procedimiento de instalación (Instalacion y uso) y ejecuta el siguiente código de ejemplo reemplazando las credenciales de aplicación por tus datos. Toma en cuanta que estos son ejemplos que te servirán de referencia y que pueden cambiar pero debes crear una cuenta en wire4.mx para obtener tus datos de aplicación.

```
describe("InstitucionesApi", () => {
    var instance  = null;
    var oauthWire4 = null;
    beforeEach(function() {
        instance = new api.InstitucionesApi();
        oauthWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("getAllInstitutionsUsingGET", async () => {
        const authorization = await oauthWire4.obtainAccessTokenApp('general');
        const response = await instance.getAllInstitutionsUsingGET(authorization, {});
        console.log(JSON.stringify(response));
        expect(response).not.toBe(null);

    });
});
```

"use strict";
/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * Wire4RestAPI
 *  # Referencia de API La API de Wire4 está organizada en torno a REST. Nuestra API tiene URLs predecibles orientadas a los recursos, acepta peticiones en formato JSON, y las respuestas devueltas son formato JSON y utiliza códigos de respuesta HTTP, autenticación y verbos estándares.  Puede usar la API de Wire4 en nuestro entorno de prueba, que no afecta sus productivos ni interactúa con la red bancaria. La URL de conexión que se usa para invocar los servicios determina si la solicitud es en modo en de prueba o en modo producción.    # Autenticación La API de Wire4 utiliza el protocolo OAuth 2.0 para autenticación y autorización.   Para comenzar, es necesario que registre una cuenta en nuestro ambiente de pruebas en [registro](https://app-sndbx.wire4.mx/#/register) y obtenga las credenciales de cliente OAuth 2.0 desde la [consola de administración](https://app-sndbx.wire4.mx/#/dashboard/api-keys).   Esta página ofrece una descripción general de los escenarios de autorización de OAuth 2.0 que admite Wire4.   Después de crear su aplicación con Wire4, asegúrese de tener a la mano su `client_id` y `client_secret`. El siguiente paso es descubrir qué flujo de OAuth2 es el adecuado para sus propósitos.   ## URLS La siguiente tabla muestra las urls de los recursos de autenticación para el ambiente de pruebas.  URL                  | Descripción ------------------------------------ | ------------- https://sandbox-api.wire4.mx/token   | Obtener token de autorización llaves de API (*client_id*, *client_secret*), datos de suscripción (*client_id*, *client_secret*, *user_key*, *user_secret*) o (*refresh_token*) https://sandbox-api.wire4.mx/revoke  | Revocación de token  **Nota:** De acuerdo con el RFC 6749, la URL del token sólo acepta el tipo de contenido x-www-form-urlencoded. El contenido JSON no está permitido y devolverá un error.  ## Scopes Los `scopes` limitan el acceso de una aplicación a los recursos de Wire4. Se ofrecen los siguientes scopes de acuerdo al producto:  Producto                             |Scope                      | Descripción -------------------------------------|------------------------------------ | ------------- SPEI-SPID                            |general                              | Permite llamar a operaciones que no requieren a un cliente Monex suscrito en Wire4, los recursos que se pueden consumir con este scope son: consulta de Instituciones, CEP y generación de una presuscripción. SPEI-SPID                            |spei_admin                           | Permite llamar a operaciones que requieren de un cliente Monex suscrito en Wire4, ya que se proporciona información de saldos, administración de transacciones, cuentas de beneficiarios y cuentas de depositantes. SPEI-SPID                            |spid_admin                           | Permite llamar sólo a operaciones SPID, se requiere de un cliente Monex suscrito en Wire4. CODI                                 |codi_general                         | Permite llamar a operaciones de administración sobre el producto CoDi, como creación y listado de empresas  CODI                                 |codi_admin                           | Permite llamar sólo a operaciones CoDi dentro de un punto de venta, las operaciones incluyen creación, consulta, listado, etc de peticiones de pago CODI                                 |codi_report                          | Permite generar reportes de operaciones CoDi. TODOS                                |device_[dispositivo]                 | Se debe especificar cuándo se gestionan token's desde distintos dispositivos.  ## Tipos de autenticación   Wire4 cuenta con dos tipos de autenticación: Autenticación de Aplicación (OAuth 2.0  Client Credentials Grant)  y Autenticación de Usuario de Aplicación (OAuth 2.0 Password Grant).  ### Autenticación de Aplicación  Esta autenticación se obtiene proporcionando únicamente las llaves de API las cuáles se pueden consultar en [Llaves de API](https://app-sndbx.wire4.mx/#/dashboard/api-keys) de la consola de administración.  La autenticación de aplicación permite accesso a recursos generales y de administración que dependeran del scope.  Para este tipo de autenticación se sigue el flujo OAuth 2.0 Client Credentials Grant, que se describe más adelante en **Obtener el token de acceso de aplicación**, algunos de los recursos que requieren este tipo de autenticación son:   * [/subscriptions/pre-subscription](link) * [/institutions](link>) * [/ceps](<link>) * [/codi/compaies](<link>)  ### Autenticación de Usuario de Aplicación  Esta autenticación se obtiene proporcionando las llaves de API las cuáles se pueden consultar en [Llaves de API](https://app-sndbx.wire4.mx/#/dashboard/api-keys) más el ***user_key*** y ***user_secret*** que se proporcionan al momento de crear una suscripción o un punto de venta, para más información puedes consultar las guías [creación de suscripción](https://www.wire4.mx/#/guides/subscriptions), [creación de punto de venta](https://www.wire4.mx/#/guides/salespoint).  Con este tipo de autenticación se puede acceder a los recursos especificos que requieren configuraciones y acceso más puntual como información de una cuentas, saldos y administración de transacciones SPEID-SPID o CODI.    ## Obtener token de acceso Antes de que su aplicación pueda acceder a los datos mediante la API de Wire4, debe obtener un token de acceso ***(access_token)*** que le otorgue acceso a la API. En las siguientes secciones se muestra como obtener un token para cada una de las autenticaciones.     ### Obtener el token de acceso para autenticación de aplicación  El primer paso es crear la solicitud de token de acceso (*access_token*), con los parámetros que identifican su aplicación, el siguiente código muestra cómo obtener un `token`.  ``` curl -k -d \"grant_type= client_credentials&scope=general\"  -u \"<client id>:<client secret>\" https://sandbox-api.wire4.mx/token ``` **Ejemplo:**   ``` curl -k -d \"grant_type=client_credentials&scope=general\"  -u \"8e59YqaFW_Yo5dwWNxEY8Lid0u0a:AXahn79hfKWBXKzQfj011x8cvcQa\"  https://sandbox-api.wire4.mx /token ``` Obtendrá una respuesta como la que se muestra a continuación, donde se debe obtener el *access_token* para realizar llamadas posteriores a la API.   ``` {     \"access_token\":\"eyJ4NXQiOiJZak5sWVdWa05tWmlNR1ZoTldSaU1EUXpaREJpWlRJNU1qYzFZV1ZoWWpneU5UYzJPV05sWVEiLCJraWQiOiJZak5sWVdWa05tWmlNR1ZoTldSaU1EUXpaREJpWlRJNU1qYzFZV1ZoWWpneU5UYzJPV05sWVEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpc21hZWwuZXNjYW1pbGxhQHRjcGlwLnRlY2hAc2FuZGJveC5zcGVpb2suY29tIiwiYXVkIjoiOGU1OVlxYUZXX1lvNWR3V054RVk4TGlkMHUwYSIsIm5iZiI6MTU3MTMyMDg3NywiYXpwIjoiOGU1OVlxYUZXX1lvNWR3V054RVk4TGlkMHUwYSIsInNjb3BlIjoiYW1fYXBwbGljYXRpb25fc2NvcGUgZ2VuZXJhbCIsImlzcyI6ImFwaW0taWRwIiwiZXhwIjoxNTcxMzI0NDc3LCJpYXQiOjE1NzEzMjA4NzcsImp0aSI6ImJkMTdjMjcyLTg4MGQtNDk0ZS1iMTMwLTBiYTkwMjYyN2M4NCJ9.AjngGylkd_Chs5zlIjyLRPu9xPGyz4dfCd_aax2_ts653xrnNMoLpVHUDmaxIDFF2XyBJKH2IAbKxjo6VsFM07QkoPhlysO1PLoAF-Vkt4xYkh-f7nJRl0oOe2utDWFlUdgiAOmx5tPcStrdCEftgNNrjwJ50LXysFjXVshpoST-zIJPLgXknM3esGrkAsLcZRM7XUB187jxLHbtefVYPMvSO31T9pd5_Co9UXdeHpuA98sk_wZknASM1phxXQZAMLRLHz3LYvjCWCr_v80oVCM9SWTzf0vrMI6xphoIfirfWloADKPTTSUpIGBw9ePF_WbEPvbMm_BZaApJcEH2w\",    \"scope\":\"am_application_scope general\",    \"token_type\":\"Bearer\",    \"expires_in\":3600 }  ```  Es posible generar tokens con más de un scope, en caso que sea necesario utilizar dicho token para hacer más de una operación. Para generarlo basta con agregarlo a la petición separado por un espacio.     ``` curl -k -d \"grant_type=client_credentials&scope=codi_general codi_report\"  -u \"8e59YqaFW_Yo5dwWNxEY8Lid0u0a:AXahn79hfKWBXKzQfj011x8cvcQa\"  https://sandbox-api.wire4.mx /token ```  ### Obtener el token de acceso para autenticación usuario de aplicación   Antes de que su aplicación pueda acceder a los datos de una cuenta Monex mediante la API de Wire4, debe obtener un token de acceso  (*access_token*) que le otorgue acceso a la API y contar con el  *user_key* y *user_secret* que se proporcionan al momento de crear  una suscripción para más información puedes consultar [creación de suscripción](https://wire4.mx/#/guides/subscriptions) .   El primer paso es crear la solicitud de token de acceso con los parámetros que identifican su aplicación y la suscripción y con `scope` `spei_admin`  ```   curl -k -d \"grant_type=password&scope=spei_admin&username=<user_key>&password=<user_secret>\"  -u \"<client_id>:<client_secret>\" https://sandbox-api.wire4.mx/token ``` **Ejemplo**  ``` curl -k -d \"grant_type=password&scope=spei_admin&username=6 nbC5e99tTO@sandbox.wire4com&password= Nz7IqJGe9h\" -u \" zgMlQbqmOr:plkMJoPXCI\" https://sandbox-api.wire4.mx /token  ```  ``` {     \"access_token\":\"eyJ4NXQiOiJPR1EyTURFM00yTmpObVZoTnpFeE5EWXlObUV4TURKa01qUTJaVEU0TWpGaE1tVmlZakV5TkEiLCJraWQiOiJPR1EyTURFM00yTmpObVZoTnpFeE5EWXlObUV4TURKa01qUTJaVEU0TWpGaE1tVmlZakV5TkEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzMzE0ODRlZTdjZDRkYWU5MzRmMjY2Zjc5YmY1YWFAZGV2LWllc2NhbWlsbGEuc3BlaW9rLmNvbSIsImF1ZCI6IkJVR0xjNWw1bW5CZXlPeGxtamNUZ0JoS19WTWEiLCJuYmYiOjE1NzEzNDk4ODMsImF6cCI6IkJVR0xjNWw1bW5CZXlPeGxtamNUZ0JoS19WTWEiLCJzY29wZSI6InNwZWlfYWRtaW4iLCJpc3MiOiJhcGltLWlkcCIsImV4cCI6MTU3MTM1MzQ4MywiaWF0IjoxNTcxMzQ5ODgzLCJqdGkiOiJiOWQ1M2Q0MC0xN2MwLTQxOTItYjUwNy0wZWFhN2ZkNDA1MGYifQ.hLTk8AFoIce1GpLcgch-U5aLLgiiFTo49wfBErD8D6VF-H9sG13ZyfAx9T-vQkk2m1zPapYVQjwibz3GRAJMN0Vczs6flV1mUJwFDQbEE-AELPdRcaRFOMBCfF6H9TVLfhFsGb9U2pVR9TLJcKqR57DyO_dIcc9I6d0tIkxqn2VcqypLVi5YQf36WzBbPeG-iPHYpMA-bhr4rwfjKA-O6jm1NSSxNHF4sHS0YHDPoO_x6cCc677MQEe0_CozfnQhoEWNfG8tcWUqhPtmcfjqon1p7PdQoXxriq_R85d06pVO9Se7Q6ok0V8Qgz0MOJ6z3ku6mtZSuba7niMAOt2TyA\",    \"refresh_token\":\"f962d5c6-0d99-3809-8275-11c7aa0aa020\",    \"scope\":\"spei_admin\",    \"token_type\":\"Bearer\",    \"expires_in\":3600 } ```  **Suscripciones in activas**   En caso de intentar obtener el token de acceso para una suscriptión que no esta activa obtendra una respuesta de error con código 400 ``` curl -k -d \"grant_type=password&scope=spei_admin&username=6 nbC5e99tTO@sandbox.wire4com&password= Nz7IqJGe9h\" -u \" zgMlQbqmOr:plkMJoPXCI\" https://sandbox-api.wire4.mx /token  ``` ``` {     \"error_description\": \"Error while authenticating user from user store\",     \"error\": \"invalid_grant\" } ```    Una vez que la suscripción se reactive podrá generar el token de acceso de forma normal.    **Nota:** Los ejemplos anteriores se presentan considerando que se realiza una implementación desde cero,  esto se puede simplificar a sólo configurar sus llaves (*client_id*, *client_secret*),  datos de suscripción (*client_id*, *client_secret*, *user_key*, *user_secret*) si utiliza nuestros sdks.      **Consideraci&oacute;n:** Si la aplicaci&oacute;n en la que implementar&aacute; Wire4 estar&aacute; desplegada en más de una instancia o servidor en cada solicitud de token debe especificar un scope adicional. La forma de hacer esto es que, cuándo se solicita un token se debe especificar un scope adicional con el prefijo \"device_\" +  el dispositivo, por ejemplo:                                                                                                                                                                                                                     device_server1<br> device_server2  en consecuencia cada instancia debe operar con el token gestionado. ***Si se opera con el mismo token en instancias diferentes encontrará problemas de Credenciales Inv&aacute;lidas.***  **Ejemplo de solicitud de token para instancias diferentes:**  ``` curl -k -d \"grant_type=password&username=0883b97333046abb76367698b57d9e@sandbox.wire4.mx&password=9e0d81f95705079b9fe1e129315c25&scope=device_server1 codi_admin\" -H \"Authorization: Basic dmZSeURpTHdFbVZqd2VIclp0OWRMbXFmb3YwYTpJQJBuamBac3V6SllLWlJHUkJEYUZrN1BhRmNh\" https://sandbox-api.wire4.mx/token  curl -k -d \"grant_type=password&username=0883b97333046abb76367698b57d9e@sandbox.wire4.mx&password=9e0d81f95705079b9fe1e129315c25&scope=device_server2 codi_admin\" -H \"Authorization: Basic dmZSeURpTHdFbVZqd2VIclp0OWRMbXFmb3YwYTpJQJBuamBac3V6SllLWlJHUkJEYUZrN1BhRmNh\" https://sandbox-api.wire4.mx/token ```  ## Caducidad del token El token de acceso es válido durante 60 minutos (una hora), después de transcurrido este tiempo se debe solicitar un nuevo token,  cuando el token caduca se obtendrá un error ***401 Unauthorized*** con mensaje ***“Invalid Credentials”.***   El nuevo token se puede solicitar  utilizando el último token de actualización (***refresh_token***) que se devolvió en la solicitud del token,   esto sólo aplica para el token de tipo password (Autenticación de Usuario de Aplicación). El siguiente ejemplo muestra cómo obtener un toke con el token de actualización.  ``` curl -k -d \"grant_type=refresh_token&refresh_token=<refresh_token>\" -u \" Client_Id:Client_Secret\" -H \"Content-Type: application/x-www-form-urlencoded\" https://sandbox-api.wire4.mx/oauth2/token ```  **Ejemplo:**  ``` curl -k -d \"grant_type=refresh_token&refresh_token=f932d5c6-0d39-3809-8275-11c7ax0aa020\" -u \"zgMlQbqmOr:plkMJoPXCI\" -H \"Content-Type: application/x-www-form-urlencoded\" https://sandbox-api.wire4.mx/token ```  El token de actualización (***refresh_token***) tiene una duración de hasta 23 horas. Si en este periodo no se utiliza, se tienen que solicitar un nuevo token.  Un token de acceso podría dejar de funcionar por uno de estos motivos:  * El usuario ha revocado el acceso a su aplicación, si un usuario ha solicitado la baja de su aplicación de WIre4. * El token de acceso ha caducado: si el token de acceso ha pasado de una hora, recibirá un error ***401 Unauthorized*** mientras realiza una llamada a la API de Wire4. Cuando esto sucede, debe solicitar un nuevo token utilizando el token de actualización que recibió por última al solicitar un token, sólo aplica si el token en cuestión es de autenticación de usuario de aplicación, en caso contrario solicitar un nuevo token.   ## Revocar token Su aplicación puede revocar mediante programación el token de acceso, una vez revocado el token no podrá hacer uso de él para acceder a la API. El siguiente código muestra un ejemplo de cómo revocar el token:    ```  curl -X POST --basic -u \"<client id>:<client secret>\" -H \"Content-Type: application/x-www-form-urlencoded;charset=UTF-8\" -k -d \"token=<token to revoke>&token_type_hint=access_token\" https://sandbox-api.wire4.mx/revoke ```      **Ejemplo:**  ```   curl -X POST --basic -u \"8e59YqaFW_Yo5dwWNxEY8Lid0u0a:AXahn79hfKWBXKzQfj011x8cvcQa\" -H \"Content-Type: application/x-www-form-urlencoded;charset=UTF-8\" -k -d \"token=eyJ4NXQiOiJZak5sWVdWa05tWmlNR1ZoTldSaU1EUXpaREJpWlRJNU1qYzFZV1ZoWWpneU5UYzJPV05sWVEiLCJraWQiOiJZak5sWVdWa05tWmlNR1ZoTldSaU1EUXpaREJpWlRJNU1qYzFZV1ZoWWpneU5UYzJPV05sWVEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpc21hZWwuZXNjYW1pbGxhQHRjcGlwLnRlY2hAc2FuZGJveC5zcGVpb2suY29tIiwiYXVkIjoiOGU1OVlxYUZXX1lvNWR3V054RVk4TGlkMHUwYSIsIm5iZiI6MTU3MTMyMDg3NywiYXpwIjoiOGU1OVlxYUZXX1lvNWR3V054RVk4TGlkMHUwYSIsInNjb3BlIjoiYW1fYXBwbGljYXRpb25fc2NvcGUgZ2VuZXJhbCIsImlzcyI6ImFwaW0taWRwIiwiZXhwIjoxNTcxMzI0NDc3LCJpYXQiOjE1NzEzMjA4NzcsImp0aSI6ImJkMTdjMjcyLTg4MGQtNDk0ZS1iMTMwLTBiYTkwMjYyN2M4NCJ9.AjngGylkd_Chs5zlIjyLRPu9xPGyz4dfCd_aax2_ts653xrnNMoLpVHUDmaxIDFF2XyBJKH2IAbKxjo6VsFM07QkoPhlysO1PLoAF-Vkt4xYkh-f7nJRl0oOe2utDWFlUdgiAOmx5tPcStrdCEftgNNrjwJ50LXysFjXVshpoST-zIJPLgXknM3esGrkAsLcZRM7XUB187jxLHbtefVYPMvSO31T9pd5_Co9UXdeHpuA98sk_wZknASM1phxXQZAMLRLHz3LYvjCWCr_v80oVCM9SWTzf0vrMI6xphoIfirfWloADKPTTSUpIGBw9ePF_WbEPvbMm_BZaApJcEH2w&token_type_hint=access_token\"  https://sandbox-api.wire4.mx/revoke ```  # Ambientes  Wire4 cuentas con dos ambientes Pruebas (Sandbox) y Producción, son dos ambientes separados los cuáles se pueden utilizar simultáneamente. Los usuarios que han sido creados en cada uno de los ambientes no son intercambiables.   Las ligas de acceso a la `api` para cada uno de los ambientes son:  * Pruebas  https://sandbox-api.wire4.mx * Producción https://api.wire4.mx     # Eventos  Los eventos son nuestra forma de informarle cuando algo sucede en su cuenta. Cuando ocurre un evento se crea un objeto  [Evento](#tag/Webhook-Message). Por ejemplo, cuando se recibe un depósito, se crea un evento TRANSACTION.INCOMING.UPDATED.   Los eventos ocurren cuando cambia el estado de un recurso. El recurso se encuentra dentro del objeto [Evento](#tag/Webhook-Message) en el campo data.  Por ejemplo, un evento TRANSACTION.INCOMING.UPDATED contendrá un depósito y un evento ACCOUNT.CREATED contendrá una cuenta.   Wire4 puede agregar más campos en un futuro, o agregar nuevos valores a campos existentes, por lo que es recomendado que tu endpoint pueda manejar datos adicionales desconocidos. En esta [liga](#tag/Webhook-Message) se encuentra  la definición del objeto [Evento](#tag/Webhook-Message).  ## Tipos de Eventos  Wire4 cuenta con los siguientes tipos de eventos*   | Evento                               | Tipo                               | Objeto                                                  | | ------------------------------------ |----------------------------------- | ------------------------------------------------------- | | Suscripción                          | ENROLLMENT.CREATED                 | [suscription](#tag/subscription)                        | | Cuenta de beneficiario               | ACCOUNT.CREATED                    | [beneficiary](#tag/BeneficiaryAccount)                  | | Depósito recibido                    | TRANSACTION.INCOMING.UPDATED       | [spei_incoming](#tag/deposit)                           | | Solicitud de autorización de depósito| TRANSACTION.INCOMING.AUTHORIZATION | [spei_incoming_authorization](#tag/depositAuthorization)| | Transferencia realizada              | TRANSACTION.OUTGOING.RECEIVED      | [spei_outgoing](#tag/transfer)                          | | Transferencia SPID enviada           | TRANSACTION.OUTGOING.SPID.RECEIVED | [spid_outgoing](#tag/transfer)                          | | Transferencias Autorizadas           | REQUEST.OUTGOING.CHANGED           | [request_outgoing](#tag/requestOutMsg)                  | | Operación CoDi                       | CODI.ACTIONS                       | [codi_actions](#tag/codiActions)                        | | Punto de venta CoDi                  | SALE.POINT.CREATED                 | [codi_sales_point](#tag/codiSalesPoint)                 |   # Codigos de Error Al registrar transferencias tanto SPEI como SPID se aplican las validaciones de formato de datos a la petición descritas en la definición de cada recurso. Si la petición contiene errores, se genera una respuesta de error 409 que contiene el listado de las validaciones que no fueran exitosas.  Por cada error detectado se genera un elemento \"error\" que contiene el order_id de la transacción que genero el error, el código de error y un mensaje con más información sobre el mismo.  Si una misma transacción contiene varios errores, la respuesta  tendrá un elemento en la lista \"errors\" por cada validación que no fue exitosa.  Existen dos casos por los cuales alguno de los elementos en el listado de errores puede no contener order_id:  * Si alguna transacción no provee esta información  * En caso de transacciones SPEI, si el error está en las URLs ya que son datos relacionados a un lote de transacciones     **Ejemplo:**    ```   {      \"http_status\": 409,     \"message\": \"La divisa es incorrecta para esta transacción se espera: MXP, y se recibió: MXPD., El identificador 18e9c4a3-8c7a-42e8-99f4-ebi7r5r6y034 esta duplicado.\",     \"errors\": [         {             \"error\": \"La divisa es incorrecta para esta transacción se espera: MXP, y se recibió: MXPD.\",             \"code\": \"TR-1010\",             \"order_id\": \"18e9c4a3-8c7a-42e8-99f4-ebi7r5r6y034\"         },         {             \"error\": \"El identificador 18e9c4a3-8c7a-42e8-99f4-ebi7r5r6y034 esta duplicado.\",             \"code\": \"TR-1004\",             \"order_id\": \"18e9c4a3-8c7a-42e8-99f4-ebi7r5r6y034\"         }     ] }  ```      ## Códigos de error para generación de transferencias SPEI/SPID | Código                        | Descripción                                                                        | |-------------------------------|-----------------------------------------------------------------------------------| |A-1001     |La URL para éxito es requerida                                                                         | | A-1002  |La URL para retorno en caso de error es requerida                                                      | | TR-1001  |La petición debe incluir al menos una transacción                                                      | | TR-1002  |El identificador de la transacción es requerido                                                         | | TR-1003  |El identificador de la transacción no es valido                                                         | | TR-1004  |El identificador de la transacción esta duplicado                                                       | | TR-1005  |El monto de la transacción es requerido                                                                | | TR-1006  |El valor del monto no es valido                                                                        | | TR-1007  |La cuenta de beneficiario es requerida                                                                  | | TR-1008  |La cuenta de beneficiario no es valida                                                                  | | TR-1009  |El código de moneda es requerido                                                                       | | TR-1010  |El código de moneda no es valido                                                                       | | TR-1011  |El listado de email supera 10 elementos                                                                | | TR-1012  |La referencia es requerida                                                                             | | TR-1013  |La referencia no es valida                                                                             | | TR-1014  |El concepto es requerido                                                                               | | TR-1015  |El concepto no es valido                                                                               | | TR-1016  |El identificador de clasificación SPID es requerido                                                      |
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturasApiFetchParamCreator = exports.EmpresasCoDiApi = exports.EmpresasCoDiApiFactory = exports.EmpresasCoDiApiFp = exports.EmpresasCoDiApiFetchParamCreator = exports.DepositantesApi = exports.DepositantesApiFactory = exports.DepositantesApiFp = exports.DepositantesApiFetchParamCreator = exports.CuentasDeBeneficiariosSPIDApi = exports.CuentasDeBeneficiariosSPIDApiFactory = exports.CuentasDeBeneficiariosSPIDApiFp = exports.CuentasDeBeneficiariosSPIDApiFetchParamCreator = exports.CuentasDeBeneficiariosSPEIApi = exports.CuentasDeBeneficiariosSPEIApiFactory = exports.CuentasDeBeneficiariosSPEIApiFp = exports.CuentasDeBeneficiariosSPEIApiFetchParamCreator = exports.ContractsDetailsApi = exports.ContractsDetailsApiFactory = exports.ContractsDetailsApiFp = exports.ContractsDetailsApiFetchParamCreator = exports.ContactoApi = exports.ContactoApiFactory = exports.ContactoApiFp = exports.ContactoApiFetchParamCreator = exports.ComprobanteElectrnicoDePagoCEPApi = exports.ComprobanteElectrnicoDePagoCEPApiFactory = exports.ComprobanteElectrnicoDePagoCEPApiFp = exports.ComprobanteElectrnicoDePagoCEPApiFetchParamCreator = exports.AutorizacinDeDepsitosApi = exports.AutorizacinDeDepsitosApiFactory = exports.AutorizacinDeDepsitosApiFp = exports.AutorizacinDeDepsitosApiFetchParamCreator = exports.WebhookResponse = exports.Webhook = exports.UseServiceBanking = exports.SubscriptionChangeStatusRequest = exports.SalesPointFound = exports.PaymentCODI = exports.Operations = exports.MessageRequestChanged = exports.CodiOperationsFiltersRequestDTO = exports.CodiCodeRequestDTO = exports.CodiCodeQrResponseDTO = exports.BillingTransaction = exports.Billing = exports.BeneficiariesQueryRegisterStatus = exports.RequiredError = exports.BaseAPI = exports.COLLECTION_FORMATS = void 0;
exports.WebhooksApi = exports.WebhooksApiFactory = exports.WebhooksApiFp = exports.WebhooksApiFetchParamCreator = exports.TransferenciasSPIDApi = exports.TransferenciasSPIDApiFactory = exports.TransferenciasSPIDApiFp = exports.TransferenciasSPIDApiFetchParamCreator = exports.TransferenciasSPEIApi = exports.TransferenciasSPEIApiFactory = exports.TransferenciasSPEIApiFp = exports.TransferenciasSPEIApiFetchParamCreator = exports.SuscripcionesApi = exports.SuscripcionesApiFactory = exports.SuscripcionesApiFp = exports.SuscripcionesApiFetchParamCreator = exports.SaldoApi = exports.SaldoApiFactory = exports.SaldoApiFp = exports.SaldoApiFetchParamCreator = exports.PuntosDeVentaCoDiApi = exports.PuntosDeVentaCoDiApiFactory = exports.PuntosDeVentaCoDiApiFp = exports.PuntosDeVentaCoDiApiFetchParamCreator = exports.PeticionesDePagoPorCoDiApi = exports.PeticionesDePagoPorCoDiApiFactory = exports.PeticionesDePagoPorCoDiApiFp = exports.PeticionesDePagoPorCoDiApiFetchParamCreator = exports.OperacionesCoDiApi = exports.OperacionesCoDiApiFactory = exports.OperacionesCoDiApiFp = exports.OperacionesCoDiApiFetchParamCreator = exports.LmitesDeMontosApi = exports.LmitesDeMontosApiFactory = exports.LmitesDeMontosApiFp = exports.LmitesDeMontosApiFetchParamCreator = exports.InstitucionesApi = exports.InstitucionesApiFactory = exports.InstitucionesApiFp = exports.InstitucionesApiFetchParamCreator = exports.FacturasApi = exports.FacturasApiFactory = exports.FacturasApiFp = void 0;
const url = require("url");
const portableFetch = require("portable-fetch");
const BASE_PATH = "https://sandbox-api.wire4.mx/wire4/1.0.0".replace(/\/+$/, "");
/**
 *
 * @export
 */
exports.COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};
/**
 *
 * @export
 * @class BaseAPI
 */
class BaseAPI {
    constructor(configuration, basePath = BASE_PATH, fetch = portableFetch) {
        this.basePath = basePath;
        this.fetch = fetch;
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
}
exports.BaseAPI = BaseAPI;
;
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
class RequiredError extends Error {
    constructor(field, msg) {
        super(msg);
        this.field = field;
    }
}
exports.RequiredError = RequiredError;
/**
 * @export
 * @namespace BeneficiariesQueryRegisterStatus
 */
var BeneficiariesQueryRegisterStatus;
(function (BeneficiariesQueryRegisterStatus) {
    /**
     * @export
     * @enum {string}
     */
    let StatusRequestEnum;
    (function (StatusRequestEnum) {
        StatusRequestEnum[StatusRequestEnum["PENDING"] = 'PENDING'] = "PENDING";
        StatusRequestEnum[StatusRequestEnum["AUTHORIZED"] = 'AUTHORIZED'] = "AUTHORIZED";
    })(StatusRequestEnum = BeneficiariesQueryRegisterStatus.StatusRequestEnum || (BeneficiariesQueryRegisterStatus.StatusRequestEnum = {}));
})(BeneficiariesQueryRegisterStatus = exports.BeneficiariesQueryRegisterStatus || (exports.BeneficiariesQueryRegisterStatus = {}));
/**
 * @export
 * @namespace Billing
 */
var Billing;
(function (Billing) {
    /**
     * @export
     * @enum {string}
     */
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["PAID"] = 'PAID'] = "PAID";
        StatusEnum[StatusEnum["OMMITED"] = 'OMMITED'] = "OMMITED";
        StatusEnum[StatusEnum["WAITINGPAYMENT"] = 'WAITING_PAYMENT'] = "WAITINGPAYMENT";
        StatusEnum[StatusEnum["EMISSIONPENDING"] = 'EMISSION_PENDING'] = "EMISSIONPENDING";
    })(StatusEnum = Billing.StatusEnum || (Billing.StatusEnum = {}));
})(Billing = exports.Billing || (exports.Billing = {}));
/**
 * @export
 * @namespace BillingTransaction
 */
var BillingTransaction;
(function (BillingTransaction) {
    /**
     * @export
     * @enum {string}
     */
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["IN"] = 'IN'] = "IN";
        TypeEnum[TypeEnum["OUT"] = 'OUT'] = "OUT";
    })(TypeEnum = BillingTransaction.TypeEnum || (BillingTransaction.TypeEnum = {}));
})(BillingTransaction = exports.BillingTransaction || (exports.BillingTransaction = {}));
/**
 * @export
 * @namespace CodiCodeQrResponseDTO
 */
var CodiCodeQrResponseDTO;
(function (CodiCodeQrResponseDTO) {
    /**
     * @export
     * @enum {string}
     */
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["RECEIVED"] = 'RECEIVED'] = "RECEIVED";
        StatusEnum[StatusEnum["COMPLETED"] = 'COMPLETED'] = "COMPLETED";
        StatusEnum[StatusEnum["CANCELLED"] = 'CANCELLED'] = "CANCELLED";
    })(StatusEnum = CodiCodeQrResponseDTO.StatusEnum || (CodiCodeQrResponseDTO.StatusEnum = {}));
    /**
     * @export
     * @enum {string}
     */
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["PUSHNOTIFICATION"] = 'PUSH_NOTIFICATION'] = "PUSHNOTIFICATION";
        TypeEnum[TypeEnum["QRCODE"] = 'QR_CODE'] = "QRCODE";
    })(TypeEnum = CodiCodeQrResponseDTO.TypeEnum || (CodiCodeQrResponseDTO.TypeEnum = {}));
})(CodiCodeQrResponseDTO = exports.CodiCodeQrResponseDTO || (exports.CodiCodeQrResponseDTO = {}));
/**
 * @export
 * @namespace CodiCodeRequestDTO
 */
var CodiCodeRequestDTO;
(function (CodiCodeRequestDTO) {
    /**
     * @export
     * @enum {string}
     */
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["PUSHNOTIFICATION"] = 'PUSH_NOTIFICATION'] = "PUSHNOTIFICATION";
        TypeEnum[TypeEnum["QRCODE"] = 'QR_CODE'] = "QRCODE";
    })(TypeEnum = CodiCodeRequestDTO.TypeEnum || (CodiCodeRequestDTO.TypeEnum = {}));
})(CodiCodeRequestDTO = exports.CodiCodeRequestDTO || (exports.CodiCodeRequestDTO = {}));
/**
 * @export
 * @namespace CodiOperationsFiltersRequestDTO
 */
var CodiOperationsFiltersRequestDTO;
(function (CodiOperationsFiltersRequestDTO) {
    /**
     * @export
     * @enum {string}
     */
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["RECEIVED"] = 'RECEIVED'] = "RECEIVED";
        StatusEnum[StatusEnum["COMPLETED"] = 'COMPLETED'] = "COMPLETED";
        StatusEnum[StatusEnum["CANCELLED"] = 'CANCELLED'] = "CANCELLED";
    })(StatusEnum = CodiOperationsFiltersRequestDTO.StatusEnum || (CodiOperationsFiltersRequestDTO.StatusEnum = {}));
})(CodiOperationsFiltersRequestDTO = exports.CodiOperationsFiltersRequestDTO || (exports.CodiOperationsFiltersRequestDTO = {}));
/**
 * @export
 * @namespace MessageRequestChanged
 */
var MessageRequestChanged;
(function (MessageRequestChanged) {
    /**
     * @export
     * @enum {string}
     */
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["AUTHORIZED"] = 'AUTHORIZED'] = "AUTHORIZED";
    })(StatusEnum = MessageRequestChanged.StatusEnum || (MessageRequestChanged.StatusEnum = {}));
})(MessageRequestChanged = exports.MessageRequestChanged || (exports.MessageRequestChanged = {}));
/**
 * @export
 * @namespace Operations
 */
var Operations;
(function (Operations) {
    /**
     * @export
     * @enum {string}
     */
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["RECEIVED"] = 'RECEIVED'] = "RECEIVED";
        StatusEnum[StatusEnum["COMPLETED"] = 'COMPLETED'] = "COMPLETED";
        StatusEnum[StatusEnum["CANCELLED"] = 'CANCELLED'] = "CANCELLED";
    })(StatusEnum = Operations.StatusEnum || (Operations.StatusEnum = {}));
    /**
     * @export
     * @enum {string}
     */
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["PUSHNOTIFICATION"] = 'PUSH_NOTIFICATION'] = "PUSHNOTIFICATION";
        TypeEnum[TypeEnum["QRCODE"] = 'QR_CODE'] = "QRCODE";
    })(TypeEnum = Operations.TypeEnum || (Operations.TypeEnum = {}));
})(Operations = exports.Operations || (exports.Operations = {}));
/**
 * @export
 * @namespace PaymentCODI
 */
var PaymentCODI;
(function (PaymentCODI) {
    /**
     * @export
     * @enum {string}
     */
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["RECEIVED"] = 'RECEIVED'] = "RECEIVED";
        StatusEnum[StatusEnum["COMPLETED"] = 'COMPLETED'] = "COMPLETED";
        StatusEnum[StatusEnum["CANCELLED"] = 'CANCELLED'] = "CANCELLED";
    })(StatusEnum = PaymentCODI.StatusEnum || (PaymentCODI.StatusEnum = {}));
})(PaymentCODI = exports.PaymentCODI || (exports.PaymentCODI = {}));
/**
 * @export
 * @namespace SalesPointFound
 */
var SalesPointFound;
(function (SalesPointFound) {
    /**
     * @export
     * @enum {string}
     */
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["ACTIVE"] = 'ACTIVE'] = "ACTIVE";
        StatusEnum[StatusEnum["INACTIVE"] = 'INACTIVE'] = "INACTIVE";
    })(StatusEnum = SalesPointFound.StatusEnum || (SalesPointFound.StatusEnum = {}));
})(SalesPointFound = exports.SalesPointFound || (exports.SalesPointFound = {}));
/**
 * @export
 * @namespace SubscriptionChangeStatusRequest
 */
var SubscriptionChangeStatusRequest;
(function (SubscriptionChangeStatusRequest) {
    /**
     * @export
     * @enum {string}
     */
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["ACTIVE"] = 'ACTIVE'] = "ACTIVE";
        StatusEnum[StatusEnum["INACTIVE"] = 'INACTIVE'] = "INACTIVE";
    })(StatusEnum = SubscriptionChangeStatusRequest.StatusEnum || (SubscriptionChangeStatusRequest.StatusEnum = {}));
})(SubscriptionChangeStatusRequest = exports.SubscriptionChangeStatusRequest || (exports.SubscriptionChangeStatusRequest = {}));
/**
 * @export
 * @namespace UseServiceBanking
 */
var UseServiceBanking;
(function (UseServiceBanking) {
    /**
     * @export
     * @enum {string}
     */
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["ACTIVE"] = 'ACTIVE'] = "ACTIVE";
        StatusEnum[StatusEnum["INACTIVE"] = 'INACTIVE'] = "INACTIVE";
    })(StatusEnum = UseServiceBanking.StatusEnum || (UseServiceBanking.StatusEnum = {}));
    /**
     * @export
     * @enum {string}
     */
    let UseEnum;
    (function (UseEnum) {
        UseEnum[UseEnum["WITHDRAWALDEPOSIT"] = 'WITHDRAWAL_DEPOSIT'] = "WITHDRAWALDEPOSIT";
        UseEnum[UseEnum["WITHDRAWAL"] = 'WITHDRAWAL'] = "WITHDRAWAL";
        UseEnum[UseEnum["DEPOSIT"] = 'DEPOSIT'] = "DEPOSIT";
    })(UseEnum = UseServiceBanking.UseEnum || (UseServiceBanking.UseEnum = {}));
})(UseServiceBanking = exports.UseServiceBanking || (exports.UseServiceBanking = {}));
/**
 * @export
 * @namespace Webhook
 */
var Webhook;
(function (Webhook) {
    /**
     * @export
     * @enum {string}
     */
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["ACTIVE"] = 'ACTIVE'] = "ACTIVE";
        StatusEnum[StatusEnum["INACTIVE"] = 'INACTIVE'] = "INACTIVE";
        StatusEnum[StatusEnum["DELETED"] = 'DELETED'] = "DELETED";
    })(StatusEnum = Webhook.StatusEnum || (Webhook.StatusEnum = {}));
})(Webhook = exports.Webhook || (exports.Webhook = {}));
/**
 * @export
 * @namespace WebhookResponse
 */
var WebhookResponse;
(function (WebhookResponse) {
    /**
     * @export
     * @enum {string}
     */
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["ACTIVE"] = 'ACTIVE'] = "ACTIVE";
        StatusEnum[StatusEnum["INACTIVE"] = 'INACTIVE'] = "INACTIVE";
        StatusEnum[StatusEnum["DELETED"] = 'DELETED'] = "DELETED";
    })(StatusEnum = WebhookResponse.StatusEnum || (WebhookResponse.StatusEnum = {}));
})(WebhookResponse = exports.WebhookResponse || (exports.WebhookResponse = {}));
/**
 * AutorizacinDeDepsitosApi - fetch parameter creator
 * @export
 */
const AutorizacinDeDepsitosApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Obtiene la información de la autorización de depósitos del contrato relacionado a la suscripción.
         * @summary Consulta autorización de depósitos
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDepositAuthConfigurations(authorization, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling getDepositAuthConfigurations.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling getDepositAuthConfigurations.');
            }
            const localVarPath = `/subscriptions/{subscription}/configurations/deposit-authorization`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Habilita o deshabilita la autorización de depósitos. Devuelve la información final de la autorización de depósitos del contrato relacionado a la suscripción al terminar.
         * @summary Habilita / Deshabilita la autorización de depósitos
         * @param {DepositAuthorizationRequest} body Información para habilitar / deshabilitar la autorización de depósito
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        putDepositAuthConfigurations(body, authorization, subscription, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling putDepositAuthConfigurations.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling putDepositAuthConfigurations.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling putDepositAuthConfigurations.');
            }
            const localVarPath = `/subscriptions/{subscription}/configurations/deposit-authorization`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("DepositAuthorizationRequest" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.AutorizacinDeDepsitosApiFetchParamCreator = AutorizacinDeDepsitosApiFetchParamCreator;
/**
 * AutorizacinDeDepsitosApi - functional programming interface
 * @export
 */
const AutorizacinDeDepsitosApiFp = function (configuration) {
    return {
        /**
         * Obtiene la información de la autorización de depósitos del contrato relacionado a la suscripción.
         * @summary Consulta autorización de depósitos
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDepositAuthConfigurations(authorization, subscription, options) {
            const localVarFetchArgs = exports.AutorizacinDeDepsitosApiFetchParamCreator(configuration).getDepositAuthConfigurations(authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Habilita o deshabilita la autorización de depósitos. Devuelve la información final de la autorización de depósitos del contrato relacionado a la suscripción al terminar.
         * @summary Habilita / Deshabilita la autorización de depósitos
         * @param {DepositAuthorizationRequest} body Información para habilitar / deshabilitar la autorización de depósito
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        putDepositAuthConfigurations(body, authorization, subscription, options) {
            const localVarFetchArgs = exports.AutorizacinDeDepsitosApiFetchParamCreator(configuration).putDepositAuthConfigurations(body, authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.AutorizacinDeDepsitosApiFp = AutorizacinDeDepsitosApiFp;
/**
 * AutorizacinDeDepsitosApi - factory interface
 * @export
 */
const AutorizacinDeDepsitosApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Obtiene la información de la autorización de depósitos del contrato relacionado a la suscripción.
         * @summary Consulta autorización de depósitos
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDepositAuthConfigurations(authorization, subscription, options) {
            return exports.AutorizacinDeDepsitosApiFp(configuration).getDepositAuthConfigurations(authorization, subscription, options)(fetch, basePath);
        },
        /**
         * Habilita o deshabilita la autorización de depósitos. Devuelve la información final de la autorización de depósitos del contrato relacionado a la suscripción al terminar.
         * @summary Habilita / Deshabilita la autorización de depósitos
         * @param {DepositAuthorizationRequest} body Información para habilitar / deshabilitar la autorización de depósito
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        putDepositAuthConfigurations(body, authorization, subscription, options) {
            return exports.AutorizacinDeDepsitosApiFp(configuration).putDepositAuthConfigurations(body, authorization, subscription, options)(fetch, basePath);
        },
    };
};
exports.AutorizacinDeDepsitosApiFactory = AutorizacinDeDepsitosApiFactory;
/**
 * AutorizacinDeDepsitosApi - object-oriented interface
 * @export
 * @class AutorizacinDeDepsitosApi
 * @extends {BaseAPI}
 */
class AutorizacinDeDepsitosApi extends BaseAPI {
    /**
     * Obtiene la información de la autorización de depósitos del contrato relacionado a la suscripción.
     * @summary Consulta autorización de depósitos
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AutorizacinDeDepsitosApi
     */
    getDepositAuthConfigurations(authorization, subscription, options) {
        return exports.AutorizacinDeDepsitosApiFp(this.configuration).getDepositAuthConfigurations(authorization, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Habilita o deshabilita la autorización de depósitos. Devuelve la información final de la autorización de depósitos del contrato relacionado a la suscripción al terminar.
     * @summary Habilita / Deshabilita la autorización de depósitos
     * @param {DepositAuthorizationRequest} body Información para habilitar / deshabilitar la autorización de depósito
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AutorizacinDeDepsitosApi
     */
    putDepositAuthConfigurations(body, authorization, subscription, options) {
        return exports.AutorizacinDeDepsitosApiFp(this.configuration).putDepositAuthConfigurations(body, authorization, subscription, options)(this.fetch, this.basePath);
    }
}
exports.AutorizacinDeDepsitosApi = AutorizacinDeDepsitosApi;
/**
 * ComprobanteElectrnicoDePagoCEPApi - fetch parameter creator
 * @export
 */
const ComprobanteElectrnicoDePagoCEPApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Consulta el CEP de un pago realizado a través del SPEI, si es que este se encuentra disponible en BANXICO.
         * @summary Consulta de CEP
         * @param {CepSearchBanxico} body Información para buscar un CEP
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainTransactionCepUsingPOST(body, authorization, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling obtainTransactionCepUsingPOST.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling obtainTransactionCepUsingPOST.');
            }
            const localVarPath = `/ceps`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("CepSearchBanxico" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.ComprobanteElectrnicoDePagoCEPApiFetchParamCreator = ComprobanteElectrnicoDePagoCEPApiFetchParamCreator;
/**
 * ComprobanteElectrnicoDePagoCEPApi - functional programming interface
 * @export
 */
const ComprobanteElectrnicoDePagoCEPApiFp = function (configuration) {
    return {
        /**
         * Consulta el CEP de un pago realizado a través del SPEI, si es que este se encuentra disponible en BANXICO.
         * @summary Consulta de CEP
         * @param {CepSearchBanxico} body Información para buscar un CEP
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainTransactionCepUsingPOST(body, authorization, options) {
            const localVarFetchArgs = exports.ComprobanteElectrnicoDePagoCEPApiFetchParamCreator(configuration).obtainTransactionCepUsingPOST(body, authorization, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.ComprobanteElectrnicoDePagoCEPApiFp = ComprobanteElectrnicoDePagoCEPApiFp;
/**
 * ComprobanteElectrnicoDePagoCEPApi - factory interface
 * @export
 */
const ComprobanteElectrnicoDePagoCEPApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Consulta el CEP de un pago realizado a través del SPEI, si es que este se encuentra disponible en BANXICO.
         * @summary Consulta de CEP
         * @param {CepSearchBanxico} body Información para buscar un CEP
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainTransactionCepUsingPOST(body, authorization, options) {
            return exports.ComprobanteElectrnicoDePagoCEPApiFp(configuration).obtainTransactionCepUsingPOST(body, authorization, options)(fetch, basePath);
        },
    };
};
exports.ComprobanteElectrnicoDePagoCEPApiFactory = ComprobanteElectrnicoDePagoCEPApiFactory;
/**
 * ComprobanteElectrnicoDePagoCEPApi - object-oriented interface
 * @export
 * @class ComprobanteElectrnicoDePagoCEPApi
 * @extends {BaseAPI}
 */
class ComprobanteElectrnicoDePagoCEPApi extends BaseAPI {
    /**
     * Consulta el CEP de un pago realizado a través del SPEI, si es que este se encuentra disponible en BANXICO.
     * @summary Consulta de CEP
     * @param {CepSearchBanxico} body Información para buscar un CEP
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ComprobanteElectrnicoDePagoCEPApi
     */
    obtainTransactionCepUsingPOST(body, authorization, options) {
        return exports.ComprobanteElectrnicoDePagoCEPApiFp(this.configuration).obtainTransactionCepUsingPOST(body, authorization, options)(this.fetch, this.basePath);
    }
}
exports.ComprobanteElectrnicoDePagoCEPApi = ComprobanteElectrnicoDePagoCEPApi;
/**
 * ContactoApi - fetch parameter creator
 * @export
 */
const ContactoApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Notifica a un asesor Monex para que se ponga en contacto con un posible cliente.
         * @summary Solicitud de contacto
         * @param {ContactRequest} body Información del contacto
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sendContactUsingPOST(body, authorization, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling sendContactUsingPOST.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling sendContactUsingPOST.');
            }
            const localVarPath = `/contact`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("ContactRequest" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.ContactoApiFetchParamCreator = ContactoApiFetchParamCreator;
/**
 * ContactoApi - functional programming interface
 * @export
 */
const ContactoApiFp = function (configuration) {
    return {
        /**
         * Notifica a un asesor Monex para que se ponga en contacto con un posible cliente.
         * @summary Solicitud de contacto
         * @param {ContactRequest} body Información del contacto
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sendContactUsingPOST(body, authorization, options) {
            const localVarFetchArgs = exports.ContactoApiFetchParamCreator(configuration).sendContactUsingPOST(body, authorization, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.ContactoApiFp = ContactoApiFp;
/**
 * ContactoApi - factory interface
 * @export
 */
const ContactoApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Notifica a un asesor Monex para que se ponga en contacto con un posible cliente.
         * @summary Solicitud de contacto
         * @param {ContactRequest} body Información del contacto
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        sendContactUsingPOST(body, authorization, options) {
            return exports.ContactoApiFp(configuration).sendContactUsingPOST(body, authorization, options)(fetch, basePath);
        },
    };
};
exports.ContactoApiFactory = ContactoApiFactory;
/**
 * ContactoApi - object-oriented interface
 * @export
 * @class ContactoApi
 * @extends {BaseAPI}
 */
class ContactoApi extends BaseAPI {
    /**
     * Notifica a un asesor Monex para que se ponga en contacto con un posible cliente.
     * @summary Solicitud de contacto
     * @param {ContactRequest} body Información del contacto
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContactoApi
     */
    sendContactUsingPOST(body, authorization, options) {
        return exports.ContactoApiFp(this.configuration).sendContactUsingPOST(body, authorization, options)(this.fetch, this.basePath);
    }
}
exports.ContactoApi = ContactoApi;
/**
 * ContractsDetailsApi - fetch parameter creator
 * @export
 */
const ContractsDetailsApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Se obtiene la URL para la autorización del usuario Monex.
         * @summary Devuelve la URL para autorización del usuario Monex
         * @param {PreMonexAuthorization} body Información para la autorización
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAuthorization(body, authorization, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling createAuthorization.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling createAuthorization.');
            }
            const localVarPath = `/onboarding/accounts/authorize`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("PreMonexAuthorization" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Obtienen los detalles de los usuarios autorizados de Monex.
         * @summary Obtiene los usuarios autorizados
         * @param {string} authorization Header para token
         * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
         * @param {string} requestId El identificador de la petición a esta API
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainAuthorizedUsers(authorization, X_ACCESS_KEY, requestId, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling obtainAuthorizedUsers.');
            }
            // verify required parameter 'X_ACCESS_KEY' is not null or undefined
            if (X_ACCESS_KEY === null || X_ACCESS_KEY === undefined) {
                throw new RequiredError('X_ACCESS_KEY', 'Required parameter X_ACCESS_KEY was null or undefined when calling obtainAuthorizedUsers.');
            }
            // verify required parameter 'requestId' is not null or undefined
            if (requestId === null || requestId === undefined) {
                throw new RequiredError('requestId', 'Required parameter requestId was null or undefined when calling obtainAuthorizedUsers.');
            }
            const localVarPath = `/onboarding/accounts/{requestId}/authorized-users`
                .replace(`{${"requestId"}}`, encodeURIComponent(String(requestId)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            if (X_ACCESS_KEY !== undefined && X_ACCESS_KEY !== null) {
                localVarHeaderParameter['X-ACCESS-KEY'] = String(X_ACCESS_KEY);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Obtienen los detalles de los usuarios autorizados por contrato Monex.
         * @summary Obtiene los usuarios autorizados por contrato
         * @param {string} authorization Header para token
         * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
         * @param {string} [contract] El contrato Monex
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainAuthorizedUsersByContract(authorization, X_ACCESS_KEY, contract, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling obtainAuthorizedUsersByContract.');
            }
            // verify required parameter 'X_ACCESS_KEY' is not null or undefined
            if (X_ACCESS_KEY === null || X_ACCESS_KEY === undefined) {
                throw new RequiredError('X_ACCESS_KEY', 'Required parameter X_ACCESS_KEY was null or undefined when calling obtainAuthorizedUsersByContract.');
            }
            const localVarPath = `/onboarding/accounts/authorized-users`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (contract !== undefined) {
                localVarQueryParameter['contract'] = contract;
            }
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            if (X_ACCESS_KEY !== undefined && X_ACCESS_KEY !== null) {
                localVarHeaderParameter['X-ACCESS-KEY'] = String(X_ACCESS_KEY);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Detalles de la compañía relacionada con el contrato de Monex.
         * @summary Obtiene los detalles de la empresa del contrato
         * @param {ContractDetailRequest} body Información para obtener los detalles de la companía
         * @param {string} authorization Header para token
         * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainContractDetails(body, authorization, X_ACCESS_KEY, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling obtainContractDetails.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling obtainContractDetails.');
            }
            // verify required parameter 'X_ACCESS_KEY' is not null or undefined
            if (X_ACCESS_KEY === null || X_ACCESS_KEY === undefined) {
                throw new RequiredError('X_ACCESS_KEY', 'Required parameter X_ACCESS_KEY was null or undefined when calling obtainContractDetails.');
            }
            const localVarPath = `/onboarding/accounts/details`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            if (X_ACCESS_KEY !== undefined && X_ACCESS_KEY !== null) {
                localVarHeaderParameter['X-ACCESS-KEY'] = String(X_ACCESS_KEY);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("ContractDetailRequest" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.ContractsDetailsApiFetchParamCreator = ContractsDetailsApiFetchParamCreator;
/**
 * ContractsDetailsApi - functional programming interface
 * @export
 */
const ContractsDetailsApiFp = function (configuration) {
    return {
        /**
         * Se obtiene la URL para la autorización del usuario Monex.
         * @summary Devuelve la URL para autorización del usuario Monex
         * @param {PreMonexAuthorization} body Información para la autorización
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAuthorization(body, authorization, options) {
            const localVarFetchArgs = exports.ContractsDetailsApiFetchParamCreator(configuration).createAuthorization(body, authorization, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Obtienen los detalles de los usuarios autorizados de Monex.
         * @summary Obtiene los usuarios autorizados
         * @param {string} authorization Header para token
         * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
         * @param {string} requestId El identificador de la petición a esta API
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainAuthorizedUsers(authorization, X_ACCESS_KEY, requestId, options) {
            const localVarFetchArgs = exports.ContractsDetailsApiFetchParamCreator(configuration).obtainAuthorizedUsers(authorization, X_ACCESS_KEY, requestId, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Obtienen los detalles de los usuarios autorizados por contrato Monex.
         * @summary Obtiene los usuarios autorizados por contrato
         * @param {string} authorization Header para token
         * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
         * @param {string} [contract] El contrato Monex
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainAuthorizedUsersByContract(authorization, X_ACCESS_KEY, contract, options) {
            const localVarFetchArgs = exports.ContractsDetailsApiFetchParamCreator(configuration).obtainAuthorizedUsersByContract(authorization, X_ACCESS_KEY, contract, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Detalles de la compañía relacionada con el contrato de Monex.
         * @summary Obtiene los detalles de la empresa del contrato
         * @param {ContractDetailRequest} body Información para obtener los detalles de la companía
         * @param {string} authorization Header para token
         * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainContractDetails(body, authorization, X_ACCESS_KEY, options) {
            const localVarFetchArgs = exports.ContractsDetailsApiFetchParamCreator(configuration).obtainContractDetails(body, authorization, X_ACCESS_KEY, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.ContractsDetailsApiFp = ContractsDetailsApiFp;
/**
 * ContractsDetailsApi - factory interface
 * @export
 */
const ContractsDetailsApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Se obtiene la URL para la autorización del usuario Monex.
         * @summary Devuelve la URL para autorización del usuario Monex
         * @param {PreMonexAuthorization} body Información para la autorización
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAuthorization(body, authorization, options) {
            return exports.ContractsDetailsApiFp(configuration).createAuthorization(body, authorization, options)(fetch, basePath);
        },
        /**
         * Obtienen los detalles de los usuarios autorizados de Monex.
         * @summary Obtiene los usuarios autorizados
         * @param {string} authorization Header para token
         * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
         * @param {string} requestId El identificador de la petición a esta API
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainAuthorizedUsers(authorization, X_ACCESS_KEY, requestId, options) {
            return exports.ContractsDetailsApiFp(configuration).obtainAuthorizedUsers(authorization, X_ACCESS_KEY, requestId, options)(fetch, basePath);
        },
        /**
         * Obtienen los detalles de los usuarios autorizados por contrato Monex.
         * @summary Obtiene los usuarios autorizados por contrato
         * @param {string} authorization Header para token
         * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
         * @param {string} [contract] El contrato Monex
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainAuthorizedUsersByContract(authorization, X_ACCESS_KEY, contract, options) {
            return exports.ContractsDetailsApiFp(configuration).obtainAuthorizedUsersByContract(authorization, X_ACCESS_KEY, contract, options)(fetch, basePath);
        },
        /**
         * Detalles de la compañía relacionada con el contrato de Monex.
         * @summary Obtiene los detalles de la empresa del contrato
         * @param {ContractDetailRequest} body Información para obtener los detalles de la companía
         * @param {string} authorization Header para token
         * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainContractDetails(body, authorization, X_ACCESS_KEY, options) {
            return exports.ContractsDetailsApiFp(configuration).obtainContractDetails(body, authorization, X_ACCESS_KEY, options)(fetch, basePath);
        },
    };
};
exports.ContractsDetailsApiFactory = ContractsDetailsApiFactory;
/**
 * ContractsDetailsApi - object-oriented interface
 * @export
 * @class ContractsDetailsApi
 * @extends {BaseAPI}
 */
class ContractsDetailsApi extends BaseAPI {
    /**
     * Se obtiene la URL para la autorización del usuario Monex.
     * @summary Devuelve la URL para autorización del usuario Monex
     * @param {PreMonexAuthorization} body Información para la autorización
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContractsDetailsApi
     */
    createAuthorization(body, authorization, options) {
        return exports.ContractsDetailsApiFp(this.configuration).createAuthorization(body, authorization, options)(this.fetch, this.basePath);
    }
    /**
     * Obtienen los detalles de los usuarios autorizados de Monex.
     * @summary Obtiene los usuarios autorizados
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {string} requestId El identificador de la petición a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContractsDetailsApi
     */
    obtainAuthorizedUsers(authorization, X_ACCESS_KEY, requestId, options) {
        return exports.ContractsDetailsApiFp(this.configuration).obtainAuthorizedUsers(authorization, X_ACCESS_KEY, requestId, options)(this.fetch, this.basePath);
    }
    /**
     * Obtienen los detalles de los usuarios autorizados por contrato Monex.
     * @summary Obtiene los usuarios autorizados por contrato
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {string} [contract] El contrato Monex
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContractsDetailsApi
     */
    obtainAuthorizedUsersByContract(authorization, X_ACCESS_KEY, contract, options) {
        return exports.ContractsDetailsApiFp(this.configuration).obtainAuthorizedUsersByContract(authorization, X_ACCESS_KEY, contract, options)(this.fetch, this.basePath);
    }
    /**
     * Detalles de la compañía relacionada con el contrato de Monex.
     * @summary Obtiene los detalles de la empresa del contrato
     * @param {ContractDetailRequest} body Información para obtener los detalles de la companía
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContractsDetailsApi
     */
    obtainContractDetails(body, authorization, X_ACCESS_KEY, options) {
        return exports.ContractsDetailsApiFp(this.configuration).obtainContractDetails(body, authorization, X_ACCESS_KEY, options)(this.fetch, this.basePath);
    }
}
exports.ContractsDetailsApi = ContractsDetailsApi;
/**
 * CuentasDeBeneficiariosSPEIApi - fetch parameter creator
 * @export
 */
const CuentasDeBeneficiariosSPEIApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Solicta la agrupación de las cuentas de beneficiarios en estado pendiente para que sean autorizadas,  para ello se crea un conjunto de éstas que puede incluir tanto de SPEI como de SPID. Además se debe indicar las urls de redirección en caso de error y éxito
         * @summary Solicitud para agrupar cuentas de beneficiarios SPEI/SPID en estado pendiente.
         * @param {UrlsRedirect} body Información de la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authorizeAccountsPendingPUT(body, authorization, subscription, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling authorizeAccountsPendingPUT.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling authorizeAccountsPendingPUT.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling authorizeAccountsPendingPUT.');
            }
            const localVarPath = `/subscriptions/{subscription}/beneficiaries/pending`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("UrlsRedirect" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Elimina la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la suscripción. La cuenta a borrar debe ser una que opere con SPEI.
         * @summary Elimina la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {string} account Es la cuenta del beneficiario que será eliminada.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteAccountUsingDELETE(authorization, account, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling deleteAccountUsingDELETE.');
            }
            // verify required parameter 'account' is not null or undefined
            if (account === null || account === undefined) {
                throw new RequiredError('account', 'Required parameter account was null or undefined when calling deleteAccountUsingDELETE.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling deleteAccountUsingDELETE.');
            }
            const localVarPath = `/subscriptions/{subscription}/beneficiaries/spei/{account}`
                .replace(`{${"account"}}`, encodeURIComponent(String(account)))
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Obtiene las posibles relaciones existentes para registrar beneficiarios en Monex. Se debe invocar este recurso antes de pre-registrar una cuenta de beneficiario.
         * @summary Consulta de relaciones
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAvailableRelationshipsMonexUsingGET(authorization, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling getAvailableRelationshipsMonexUsingGET.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling getAvailableRelationshipsMonexUsingGET.');
            }
            const localVarPath = `/subscriptions/{subscription}/beneficiaries/relationships`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Obtiene los beneficiarios enviados para registro en una petición al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex, que pertenezcan a la petición que se solicita.
         * @summary Consulta los beneficiarios por el identificador de la petición de registro
         * @param {string} authorization Header para token
         * @param {string} requestId El identificador de la petición del registro de beneficiarios a esta API.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBeneficiariesByRequestId(authorization, requestId, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling getBeneficiariesByRequestId.');
            }
            // verify required parameter 'requestId' is not null or undefined
            if (requestId === null || requestId === undefined) {
                throw new RequiredError('requestId', 'Required parameter requestId was null or undefined when calling getBeneficiariesByRequestId.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling getBeneficiariesByRequestId.');
            }
            const localVarPath = `/subscriptions/{subscription}/beneficiaries/spei/{requestId}`
                .replace(`{${"requestId"}}`, encodeURIComponent(String(requestId)))
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Obtiene los beneficiarios registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
         * @summary Consulta los beneficiarios registrados
         * @param {string} authorization Header para token
         * @param {string} [account] Es la cuenta del beneficiario, podría ser teléfono celular (es de 10 dígitos), Tarjeta de débito (TDD, es de 16 dígitos) o cuenta CLABE (es de 18 dígitos). &lt;br/&gt;&lt;br/&gt;Por ejemplo Teléfono celular: 5525072600, TDD: 4323 1234 5678 9123, CLABE: 032180000118359719.
         * @param {string} [beneficiaryBank] Es la clave del banco beneficiario. Se puede obtener del recurso de las &lt;a href&#x3D;\&quot;#operation/getAllInstitutionsUsingGET\&quot;&gt;instituciones.&lt;/a&gt;
         * @param {string} [beneficiaryName] Es el nombre del beneficiario.
         * @param {string} [endDate] Es la fecha de inicio del perido a filtrar en formato dd-mm-yyyy.
         * @param {string} [initDate] Es la fºecha de inicio del perido a filtrar en formato dd-mm-yyyy.
         * @param {string} [rfc] Es el Registro Federal de Controbuyentes (RFC) del beneficiario.
         * @param {string} [status] Es el estado (estatus) de la cuenta. Los valores pueden ser &lt;b&gt;PENDING&lt;/b&gt; y &lt;b&gt;REGISTERED&lt;/b&gt;.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBeneficiariesForAccountUsingGET(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling getBeneficiariesForAccountUsingGET.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling getBeneficiariesForAccountUsingGET.');
            }
            const localVarPath = `/subscriptions/{subscription}/beneficiaries/spei`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (account !== undefined) {
                localVarQueryParameter['account'] = account;
            }
            if (beneficiaryBank !== undefined) {
                localVarQueryParameter['beneficiary_bank'] = beneficiaryBank;
            }
            if (beneficiaryName !== undefined) {
                localVarQueryParameter['beneficiary_name'] = beneficiaryName;
            }
            if (endDate !== undefined) {
                localVarQueryParameter['end_date'] = endDate;
            }
            if (initDate !== undefined) {
                localVarQueryParameter['init_date'] = initDate;
            }
            if (rfc !== undefined) {
                localVarQueryParameter['rfc'] = rfc;
            }
            if (status !== undefined) {
                localVarQueryParameter['status'] = status;
            }
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Pre-registra una o más cuentas de beneficiario en la plataforma de Wire4, ésta le proporcionará una URL donde lo llevará al centro de autorización para que el cuentahabiente Monex ingrese su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/> Los posibles valores de <em>relationship</em> y <em>kind_of_relationship</em> se deben  obtener de <a href=\"#operation/getAvailableRelationshipsMonexUsingGET\">/subscriptions/{subscription}/beneficiaries/relationships.</a><br/><br/>La confirmación de registro en Monex se realizará a través de una notificación a los webhooks registrados con el evento de tipo <a href=\"#section/Eventos/Tipos-de-Eventos\">ACCOUNT.CREATED.</a>
         * @summary Pre-registro de cuentas de beneficiarios SPEI®.
         * @param {AccountRequest} body Información de la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        preRegisterAccountsUsingPOST(body, authorization, subscription, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling preRegisterAccountsUsingPOST.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling preRegisterAccountsUsingPOST.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling preRegisterAccountsUsingPOST.');
            }
            const localVarPath = `/subscriptions/{subscription}/beneficiaries/spei`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("AccountRequest" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Elimina uno o más beneficiarios que se encuentran en estado pendiente de confirmar (autorizar) de la cuenta del cliente Monex relacionada a la suscripción.
         * @summary Eliminación de beneficiarios SPEI® sin confirmar
         * @param {string} authorization Header para token
         * @param {string} requestId Es el identificador con el que se dió de alta a los beneficiarios (viene en el cuerpo de la respuesta del &lt;a href&#x3D;\&quot;#operation/getAvailableRelationshipsMonexUsingGET\&quot;&gt;pre-registro de beneficiarios&lt;/a&gt;), los registros bajo éste campo van a ser eliminados.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeBeneficiariesPendingUsingDELETE(authorization, requestId, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling removeBeneficiariesPendingUsingDELETE.');
            }
            // verify required parameter 'requestId' is not null or undefined
            if (requestId === null || requestId === undefined) {
                throw new RequiredError('requestId', 'Required parameter requestId was null or undefined when calling removeBeneficiariesPendingUsingDELETE.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling removeBeneficiariesPendingUsingDELETE.');
            }
            const localVarPath = `/subscriptions/{subscription}/beneficiaries/spei/request/{requestId}`
                .replace(`{${"requestId"}}`, encodeURIComponent(String(requestId)))
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Se crea una solicitud para actualizar el monto límite a la cuenta de beneficiario proporcionada y relacionada al contrato perteneciente a la subscripción. Una vez enviada la solicitud se retornará una URl que lo llevará al centro de autorización para que el cuentahabiente Monex ingrese su llave digital para confirmar la actualización del monto límite.
         * @summary Solicitud para actualizar el monto límite de una cuenta
         * @param {AmountRequest} body Información de la cuenta y el monto límite a actualizar.
         * @param {string} authorization Header para token
         * @param {string} account Es la cuenta que va a ser actualizada.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateAmountLimitAccountUsingPUT(body, authorization, account, subscription, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling updateAmountLimitAccountUsingPUT.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling updateAmountLimitAccountUsingPUT.');
            }
            // verify required parameter 'account' is not null or undefined
            if (account === null || account === undefined) {
                throw new RequiredError('account', 'Required parameter account was null or undefined when calling updateAmountLimitAccountUsingPUT.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling updateAmountLimitAccountUsingPUT.');
            }
            const localVarPath = `/subscriptions/{subscription}/beneficiaries/spei/{account}`
                .replace(`{${"account"}}`, encodeURIComponent(String(account)))
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("AmountRequest" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.CuentasDeBeneficiariosSPEIApiFetchParamCreator = CuentasDeBeneficiariosSPEIApiFetchParamCreator;
/**
 * CuentasDeBeneficiariosSPEIApi - functional programming interface
 * @export
 */
const CuentasDeBeneficiariosSPEIApiFp = function (configuration) {
    return {
        /**
         * Solicta la agrupación de las cuentas de beneficiarios en estado pendiente para que sean autorizadas,  para ello se crea un conjunto de éstas que puede incluir tanto de SPEI como de SPID. Además se debe indicar las urls de redirección en caso de error y éxito
         * @summary Solicitud para agrupar cuentas de beneficiarios SPEI/SPID en estado pendiente.
         * @param {UrlsRedirect} body Información de la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authorizeAccountsPendingPUT(body, authorization, subscription, options) {
            const localVarFetchArgs = exports.CuentasDeBeneficiariosSPEIApiFetchParamCreator(configuration).authorizeAccountsPendingPUT(body, authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Elimina la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la suscripción. La cuenta a borrar debe ser una que opere con SPEI.
         * @summary Elimina la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {string} account Es la cuenta del beneficiario que será eliminada.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteAccountUsingDELETE(authorization, account, subscription, options) {
            const localVarFetchArgs = exports.CuentasDeBeneficiariosSPEIApiFetchParamCreator(configuration).deleteAccountUsingDELETE(authorization, account, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Obtiene las posibles relaciones existentes para registrar beneficiarios en Monex. Se debe invocar este recurso antes de pre-registrar una cuenta de beneficiario.
         * @summary Consulta de relaciones
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAvailableRelationshipsMonexUsingGET(authorization, subscription, options) {
            const localVarFetchArgs = exports.CuentasDeBeneficiariosSPEIApiFetchParamCreator(configuration).getAvailableRelationshipsMonexUsingGET(authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Obtiene los beneficiarios enviados para registro en una petición al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex, que pertenezcan a la petición que se solicita.
         * @summary Consulta los beneficiarios por el identificador de la petición de registro
         * @param {string} authorization Header para token
         * @param {string} requestId El identificador de la petición del registro de beneficiarios a esta API.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBeneficiariesByRequestId(authorization, requestId, subscription, options) {
            const localVarFetchArgs = exports.CuentasDeBeneficiariosSPEIApiFetchParamCreator(configuration).getBeneficiariesByRequestId(authorization, requestId, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Obtiene los beneficiarios registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
         * @summary Consulta los beneficiarios registrados
         * @param {string} authorization Header para token
         * @param {string} [account] Es la cuenta del beneficiario, podría ser teléfono celular (es de 10 dígitos), Tarjeta de débito (TDD, es de 16 dígitos) o cuenta CLABE (es de 18 dígitos). &lt;br/&gt;&lt;br/&gt;Por ejemplo Teléfono celular: 5525072600, TDD: 4323 1234 5678 9123, CLABE: 032180000118359719.
         * @param {string} [beneficiaryBank] Es la clave del banco beneficiario. Se puede obtener del recurso de las &lt;a href&#x3D;\&quot;#operation/getAllInstitutionsUsingGET\&quot;&gt;instituciones.&lt;/a&gt;
         * @param {string} [beneficiaryName] Es el nombre del beneficiario.
         * @param {string} [endDate] Es la fecha de inicio del perido a filtrar en formato dd-mm-yyyy.
         * @param {string} [initDate] Es la fºecha de inicio del perido a filtrar en formato dd-mm-yyyy.
         * @param {string} [rfc] Es el Registro Federal de Controbuyentes (RFC) del beneficiario.
         * @param {string} [status] Es el estado (estatus) de la cuenta. Los valores pueden ser &lt;b&gt;PENDING&lt;/b&gt; y &lt;b&gt;REGISTERED&lt;/b&gt;.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBeneficiariesForAccountUsingGET(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options) {
            const localVarFetchArgs = exports.CuentasDeBeneficiariosSPEIApiFetchParamCreator(configuration).getBeneficiariesForAccountUsingGET(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Pre-registra una o más cuentas de beneficiario en la plataforma de Wire4, ésta le proporcionará una URL donde lo llevará al centro de autorización para que el cuentahabiente Monex ingrese su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/> Los posibles valores de <em>relationship</em> y <em>kind_of_relationship</em> se deben  obtener de <a href=\"#operation/getAvailableRelationshipsMonexUsingGET\">/subscriptions/{subscription}/beneficiaries/relationships.</a><br/><br/>La confirmación de registro en Monex se realizará a través de una notificación a los webhooks registrados con el evento de tipo <a href=\"#section/Eventos/Tipos-de-Eventos\">ACCOUNT.CREATED.</a>
         * @summary Pre-registro de cuentas de beneficiarios SPEI®.
         * @param {AccountRequest} body Información de la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        preRegisterAccountsUsingPOST(body, authorization, subscription, options) {
            const localVarFetchArgs = exports.CuentasDeBeneficiariosSPEIApiFetchParamCreator(configuration).preRegisterAccountsUsingPOST(body, authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Elimina uno o más beneficiarios que se encuentran en estado pendiente de confirmar (autorizar) de la cuenta del cliente Monex relacionada a la suscripción.
         * @summary Eliminación de beneficiarios SPEI® sin confirmar
         * @param {string} authorization Header para token
         * @param {string} requestId Es el identificador con el que se dió de alta a los beneficiarios (viene en el cuerpo de la respuesta del &lt;a href&#x3D;\&quot;#operation/getAvailableRelationshipsMonexUsingGET\&quot;&gt;pre-registro de beneficiarios&lt;/a&gt;), los registros bajo éste campo van a ser eliminados.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeBeneficiariesPendingUsingDELETE(authorization, requestId, subscription, options) {
            const localVarFetchArgs = exports.CuentasDeBeneficiariosSPEIApiFetchParamCreator(configuration).removeBeneficiariesPendingUsingDELETE(authorization, requestId, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Se crea una solicitud para actualizar el monto límite a la cuenta de beneficiario proporcionada y relacionada al contrato perteneciente a la subscripción. Una vez enviada la solicitud se retornará una URl que lo llevará al centro de autorización para que el cuentahabiente Monex ingrese su llave digital para confirmar la actualización del monto límite.
         * @summary Solicitud para actualizar el monto límite de una cuenta
         * @param {AmountRequest} body Información de la cuenta y el monto límite a actualizar.
         * @param {string} authorization Header para token
         * @param {string} account Es la cuenta que va a ser actualizada.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateAmountLimitAccountUsingPUT(body, authorization, account, subscription, options) {
            const localVarFetchArgs = exports.CuentasDeBeneficiariosSPEIApiFetchParamCreator(configuration).updateAmountLimitAccountUsingPUT(body, authorization, account, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.CuentasDeBeneficiariosSPEIApiFp = CuentasDeBeneficiariosSPEIApiFp;
/**
 * CuentasDeBeneficiariosSPEIApi - factory interface
 * @export
 */
const CuentasDeBeneficiariosSPEIApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Solicta la agrupación de las cuentas de beneficiarios en estado pendiente para que sean autorizadas,  para ello se crea un conjunto de éstas que puede incluir tanto de SPEI como de SPID. Además se debe indicar las urls de redirección en caso de error y éxito
         * @summary Solicitud para agrupar cuentas de beneficiarios SPEI/SPID en estado pendiente.
         * @param {UrlsRedirect} body Información de la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authorizeAccountsPendingPUT(body, authorization, subscription, options) {
            return exports.CuentasDeBeneficiariosSPEIApiFp(configuration).authorizeAccountsPendingPUT(body, authorization, subscription, options)(fetch, basePath);
        },
        /**
         * Elimina la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la suscripción. La cuenta a borrar debe ser una que opere con SPEI.
         * @summary Elimina la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {string} account Es la cuenta del beneficiario que será eliminada.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteAccountUsingDELETE(authorization, account, subscription, options) {
            return exports.CuentasDeBeneficiariosSPEIApiFp(configuration).deleteAccountUsingDELETE(authorization, account, subscription, options)(fetch, basePath);
        },
        /**
         * Obtiene las posibles relaciones existentes para registrar beneficiarios en Monex. Se debe invocar este recurso antes de pre-registrar una cuenta de beneficiario.
         * @summary Consulta de relaciones
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAvailableRelationshipsMonexUsingGET(authorization, subscription, options) {
            return exports.CuentasDeBeneficiariosSPEIApiFp(configuration).getAvailableRelationshipsMonexUsingGET(authorization, subscription, options)(fetch, basePath);
        },
        /**
         * Obtiene los beneficiarios enviados para registro en una petición al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex, que pertenezcan a la petición que se solicita.
         * @summary Consulta los beneficiarios por el identificador de la petición de registro
         * @param {string} authorization Header para token
         * @param {string} requestId El identificador de la petición del registro de beneficiarios a esta API.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBeneficiariesByRequestId(authorization, requestId, subscription, options) {
            return exports.CuentasDeBeneficiariosSPEIApiFp(configuration).getBeneficiariesByRequestId(authorization, requestId, subscription, options)(fetch, basePath);
        },
        /**
         * Obtiene los beneficiarios registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
         * @summary Consulta los beneficiarios registrados
         * @param {string} authorization Header para token
         * @param {string} [account] Es la cuenta del beneficiario, podría ser teléfono celular (es de 10 dígitos), Tarjeta de débito (TDD, es de 16 dígitos) o cuenta CLABE (es de 18 dígitos). &lt;br/&gt;&lt;br/&gt;Por ejemplo Teléfono celular: 5525072600, TDD: 4323 1234 5678 9123, CLABE: 032180000118359719.
         * @param {string} [beneficiaryBank] Es la clave del banco beneficiario. Se puede obtener del recurso de las &lt;a href&#x3D;\&quot;#operation/getAllInstitutionsUsingGET\&quot;&gt;instituciones.&lt;/a&gt;
         * @param {string} [beneficiaryName] Es el nombre del beneficiario.
         * @param {string} [endDate] Es la fecha de inicio del perido a filtrar en formato dd-mm-yyyy.
         * @param {string} [initDate] Es la fºecha de inicio del perido a filtrar en formato dd-mm-yyyy.
         * @param {string} [rfc] Es el Registro Federal de Controbuyentes (RFC) del beneficiario.
         * @param {string} [status] Es el estado (estatus) de la cuenta. Los valores pueden ser &lt;b&gt;PENDING&lt;/b&gt; y &lt;b&gt;REGISTERED&lt;/b&gt;.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBeneficiariesForAccountUsingGET(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options) {
            return exports.CuentasDeBeneficiariosSPEIApiFp(configuration).getBeneficiariesForAccountUsingGET(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options)(fetch, basePath);
        },
        /**
         * Pre-registra una o más cuentas de beneficiario en la plataforma de Wire4, ésta le proporcionará una URL donde lo llevará al centro de autorización para que el cuentahabiente Monex ingrese su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/> Los posibles valores de <em>relationship</em> y <em>kind_of_relationship</em> se deben  obtener de <a href=\"#operation/getAvailableRelationshipsMonexUsingGET\">/subscriptions/{subscription}/beneficiaries/relationships.</a><br/><br/>La confirmación de registro en Monex se realizará a través de una notificación a los webhooks registrados con el evento de tipo <a href=\"#section/Eventos/Tipos-de-Eventos\">ACCOUNT.CREATED.</a>
         * @summary Pre-registro de cuentas de beneficiarios SPEI®.
         * @param {AccountRequest} body Información de la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        preRegisterAccountsUsingPOST(body, authorization, subscription, options) {
            return exports.CuentasDeBeneficiariosSPEIApiFp(configuration).preRegisterAccountsUsingPOST(body, authorization, subscription, options)(fetch, basePath);
        },
        /**
         * Elimina uno o más beneficiarios que se encuentran en estado pendiente de confirmar (autorizar) de la cuenta del cliente Monex relacionada a la suscripción.
         * @summary Eliminación de beneficiarios SPEI® sin confirmar
         * @param {string} authorization Header para token
         * @param {string} requestId Es el identificador con el que se dió de alta a los beneficiarios (viene en el cuerpo de la respuesta del &lt;a href&#x3D;\&quot;#operation/getAvailableRelationshipsMonexUsingGET\&quot;&gt;pre-registro de beneficiarios&lt;/a&gt;), los registros bajo éste campo van a ser eliminados.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeBeneficiariesPendingUsingDELETE(authorization, requestId, subscription, options) {
            return exports.CuentasDeBeneficiariosSPEIApiFp(configuration).removeBeneficiariesPendingUsingDELETE(authorization, requestId, subscription, options)(fetch, basePath);
        },
        /**
         * Se crea una solicitud para actualizar el monto límite a la cuenta de beneficiario proporcionada y relacionada al contrato perteneciente a la subscripción. Una vez enviada la solicitud se retornará una URl que lo llevará al centro de autorización para que el cuentahabiente Monex ingrese su llave digital para confirmar la actualización del monto límite.
         * @summary Solicitud para actualizar el monto límite de una cuenta
         * @param {AmountRequest} body Información de la cuenta y el monto límite a actualizar.
         * @param {string} authorization Header para token
         * @param {string} account Es la cuenta que va a ser actualizada.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateAmountLimitAccountUsingPUT(body, authorization, account, subscription, options) {
            return exports.CuentasDeBeneficiariosSPEIApiFp(configuration).updateAmountLimitAccountUsingPUT(body, authorization, account, subscription, options)(fetch, basePath);
        },
    };
};
exports.CuentasDeBeneficiariosSPEIApiFactory = CuentasDeBeneficiariosSPEIApiFactory;
/**
 * CuentasDeBeneficiariosSPEIApi - object-oriented interface
 * @export
 * @class CuentasDeBeneficiariosSPEIApi
 * @extends {BaseAPI}
 */
class CuentasDeBeneficiariosSPEIApi extends BaseAPI {
    /**
     * Solicta la agrupación de las cuentas de beneficiarios en estado pendiente para que sean autorizadas,  para ello se crea un conjunto de éstas que puede incluir tanto de SPEI como de SPID. Además se debe indicar las urls de redirección en caso de error y éxito
     * @summary Solicitud para agrupar cuentas de beneficiarios SPEI/SPID en estado pendiente.
     * @param {UrlsRedirect} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    authorizeAccountsPendingPUT(body, authorization, subscription, options) {
        return exports.CuentasDeBeneficiariosSPEIApiFp(this.configuration).authorizeAccountsPendingPUT(body, authorization, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Elimina la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la suscripción. La cuenta a borrar debe ser una que opere con SPEI.
     * @summary Elimina la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} account Es la cuenta del beneficiario que será eliminada.
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    deleteAccountUsingDELETE(authorization, account, subscription, options) {
        return exports.CuentasDeBeneficiariosSPEIApiFp(this.configuration).deleteAccountUsingDELETE(authorization, account, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Obtiene las posibles relaciones existentes para registrar beneficiarios en Monex. Se debe invocar este recurso antes de pre-registrar una cuenta de beneficiario.
     * @summary Consulta de relaciones
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    getAvailableRelationshipsMonexUsingGET(authorization, subscription, options) {
        return exports.CuentasDeBeneficiariosSPEIApiFp(this.configuration).getAvailableRelationshipsMonexUsingGET(authorization, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Obtiene los beneficiarios enviados para registro en una petición al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex, que pertenezcan a la petición que se solicita.
     * @summary Consulta los beneficiarios por el identificador de la petición de registro
     * @param {string} authorization Header para token
     * @param {string} requestId El identificador de la petición del registro de beneficiarios a esta API.
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    getBeneficiariesByRequestId(authorization, requestId, subscription, options) {
        return exports.CuentasDeBeneficiariosSPEIApiFp(this.configuration).getBeneficiariesByRequestId(authorization, requestId, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Obtiene los beneficiarios registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
     * @summary Consulta los beneficiarios registrados
     * @param {string} authorization Header para token
     * @param {string} [account] Es la cuenta del beneficiario, podría ser teléfono celular (es de 10 dígitos), Tarjeta de débito (TDD, es de 16 dígitos) o cuenta CLABE (es de 18 dígitos). &lt;br/&gt;&lt;br/&gt;Por ejemplo Teléfono celular: 5525072600, TDD: 4323 1234 5678 9123, CLABE: 032180000118359719.
     * @param {string} [beneficiaryBank] Es la clave del banco beneficiario. Se puede obtener del recurso de las &lt;a href&#x3D;\&quot;#operation/getAllInstitutionsUsingGET\&quot;&gt;instituciones.&lt;/a&gt;
     * @param {string} [beneficiaryName] Es el nombre del beneficiario.
     * @param {string} [endDate] Es la fecha de inicio del perido a filtrar en formato dd-mm-yyyy.
     * @param {string} [initDate] Es la fºecha de inicio del perido a filtrar en formato dd-mm-yyyy.
     * @param {string} [rfc] Es el Registro Federal de Controbuyentes (RFC) del beneficiario.
     * @param {string} [status] Es el estado (estatus) de la cuenta. Los valores pueden ser &lt;b&gt;PENDING&lt;/b&gt; y &lt;b&gt;REGISTERED&lt;/b&gt;.
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    getBeneficiariesForAccountUsingGET(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options) {
        return exports.CuentasDeBeneficiariosSPEIApiFp(this.configuration).getBeneficiariesForAccountUsingGET(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Pre-registra una o más cuentas de beneficiario en la plataforma de Wire4, ésta le proporcionará una URL donde lo llevará al centro de autorización para que el cuentahabiente Monex ingrese su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/> Los posibles valores de <em>relationship</em> y <em>kind_of_relationship</em> se deben  obtener de <a href=\"#operation/getAvailableRelationshipsMonexUsingGET\">/subscriptions/{subscription}/beneficiaries/relationships.</a><br/><br/>La confirmación de registro en Monex se realizará a través de una notificación a los webhooks registrados con el evento de tipo <a href=\"#section/Eventos/Tipos-de-Eventos\">ACCOUNT.CREATED.</a>
     * @summary Pre-registro de cuentas de beneficiarios SPEI®.
     * @param {AccountRequest} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    preRegisterAccountsUsingPOST(body, authorization, subscription, options) {
        return exports.CuentasDeBeneficiariosSPEIApiFp(this.configuration).preRegisterAccountsUsingPOST(body, authorization, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Elimina uno o más beneficiarios que se encuentran en estado pendiente de confirmar (autorizar) de la cuenta del cliente Monex relacionada a la suscripción.
     * @summary Eliminación de beneficiarios SPEI® sin confirmar
     * @param {string} authorization Header para token
     * @param {string} requestId Es el identificador con el que se dió de alta a los beneficiarios (viene en el cuerpo de la respuesta del &lt;a href&#x3D;\&quot;#operation/getAvailableRelationshipsMonexUsingGET\&quot;&gt;pre-registro de beneficiarios&lt;/a&gt;), los registros bajo éste campo van a ser eliminados.
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    removeBeneficiariesPendingUsingDELETE(authorization, requestId, subscription, options) {
        return exports.CuentasDeBeneficiariosSPEIApiFp(this.configuration).removeBeneficiariesPendingUsingDELETE(authorization, requestId, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Se crea una solicitud para actualizar el monto límite a la cuenta de beneficiario proporcionada y relacionada al contrato perteneciente a la subscripción. Una vez enviada la solicitud se retornará una URl que lo llevará al centro de autorización para que el cuentahabiente Monex ingrese su llave digital para confirmar la actualización del monto límite.
     * @summary Solicitud para actualizar el monto límite de una cuenta
     * @param {AmountRequest} body Información de la cuenta y el monto límite a actualizar.
     * @param {string} authorization Header para token
     * @param {string} account Es la cuenta que va a ser actualizada.
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    updateAmountLimitAccountUsingPUT(body, authorization, account, subscription, options) {
        return exports.CuentasDeBeneficiariosSPEIApiFp(this.configuration).updateAmountLimitAccountUsingPUT(body, authorization, account, subscription, options)(this.fetch, this.basePath);
    }
}
exports.CuentasDeBeneficiariosSPEIApi = CuentasDeBeneficiariosSPEIApi;
/**
 * CuentasDeBeneficiariosSPIDApi - fetch parameter creator
 * @export
 */
const CuentasDeBeneficiariosSPIDApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Obtiene los beneficiarios SPID registrados al contrato relacionado con la suscripción. Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
         * @summary Consulta los beneficiarios SPID registrados
         * @param {string} authorization Header para token
         * @param {string} [account] Cuenta del beneficiario, puede ser CLABE (18 dígitos), Tarjeta de débito  (TDD, 16 dígitos) o número de celular (10 dígitos).
         * @param {string} [beneficiaryBank] Es la clave del banco beneficiario. Se puede obtener del catalogo de &lt;a href&#x3D;\&quot;#operation/getAllInstitutionsUsingGET\&quot;&gt;instituciones.&lt;/a&gt;
         * @param {string} [beneficiaryName] Es el nombre del beneficiario.
         * @param {string} [endDate] Es la fecha de inicio del periodo a filtrar en formato dd-mm-yyyy.
         * @param {string} [initDate] Es la fecha de inicio del periodo a filtrar en formato dd-mm-yyyy.
         * @param {string} [rfc] Es el Registro Federal de Contribuyentes (RFC) del beneficiario.
         * @param {string} [status] Es el estado (estatus) de la cuenta, Los valores pueden ser &lt;b&gt;PENDING&lt;/b&gt; y &lt;b&gt;REGISTERED&lt;/b&gt;.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSpidBeneficiariesForAccount(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling getSpidBeneficiariesForAccount.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling getSpidBeneficiariesForAccount.');
            }
            const localVarPath = `/subscriptions/{subscription}/beneficiaries/spid`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (account !== undefined) {
                localVarQueryParameter['account'] = account;
            }
            if (beneficiaryBank !== undefined) {
                localVarQueryParameter['beneficiary_bank'] = beneficiaryBank;
            }
            if (beneficiaryName !== undefined) {
                localVarQueryParameter['beneficiary_name'] = beneficiaryName;
            }
            if (endDate !== undefined) {
                localVarQueryParameter['end_date'] = endDate;
            }
            if (initDate !== undefined) {
                localVarQueryParameter['init_date'] = initDate;
            }
            if (rfc !== undefined) {
                localVarQueryParameter['rfc'] = rfc;
            }
            if (status !== undefined) {
                localVarQueryParameter['status'] = status;
            }
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Pre-registra una o más cuentas de beneficiario SPID® en la plataforma de Wire4, ésta le proporcionaará una URL donde lo llevará al centro de autorización para que el cuentahabiente Monex ingrese su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/> Los posibles valores de <em>relationship</em> y <em>kind_of_relationship</em> se deben  obtener de <a href=\"#operation/getAvailableRelationshipsMonexUsingGET\">/subscriptions/{subscription}/beneficiaries/relationships.</a><br/><br/>La confirmación de registro en Monex se realizará a través de una notificación a los webhooks registrados con el evento de tipo <a href=\"#section/Eventos/Tipos-de-Eventos\">ACCOUNT.CREATED.</a>
         * @summary Pre-registro de cuentas de beneficiarios SPID®
         * @param {AccountSpid} body Información de la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        preRegisterAccountsUsingPOST1(body, authorization, subscription, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling preRegisterAccountsUsingPOST1.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling preRegisterAccountsUsingPOST1.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling preRegisterAccountsUsingPOST1.');
            }
            const localVarPath = `/subscriptions/{subscription}/beneficiaries/spid`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("AccountSpid" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.CuentasDeBeneficiariosSPIDApiFetchParamCreator = CuentasDeBeneficiariosSPIDApiFetchParamCreator;
/**
 * CuentasDeBeneficiariosSPIDApi - functional programming interface
 * @export
 */
const CuentasDeBeneficiariosSPIDApiFp = function (configuration) {
    return {
        /**
         * Obtiene los beneficiarios SPID registrados al contrato relacionado con la suscripción. Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
         * @summary Consulta los beneficiarios SPID registrados
         * @param {string} authorization Header para token
         * @param {string} [account] Cuenta del beneficiario, puede ser CLABE (18 dígitos), Tarjeta de débito  (TDD, 16 dígitos) o número de celular (10 dígitos).
         * @param {string} [beneficiaryBank] Es la clave del banco beneficiario. Se puede obtener del catalogo de &lt;a href&#x3D;\&quot;#operation/getAllInstitutionsUsingGET\&quot;&gt;instituciones.&lt;/a&gt;
         * @param {string} [beneficiaryName] Es el nombre del beneficiario.
         * @param {string} [endDate] Es la fecha de inicio del periodo a filtrar en formato dd-mm-yyyy.
         * @param {string} [initDate] Es la fecha de inicio del periodo a filtrar en formato dd-mm-yyyy.
         * @param {string} [rfc] Es el Registro Federal de Contribuyentes (RFC) del beneficiario.
         * @param {string} [status] Es el estado (estatus) de la cuenta, Los valores pueden ser &lt;b&gt;PENDING&lt;/b&gt; y &lt;b&gt;REGISTERED&lt;/b&gt;.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSpidBeneficiariesForAccount(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options) {
            const localVarFetchArgs = exports.CuentasDeBeneficiariosSPIDApiFetchParamCreator(configuration).getSpidBeneficiariesForAccount(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Pre-registra una o más cuentas de beneficiario SPID® en la plataforma de Wire4, ésta le proporcionaará una URL donde lo llevará al centro de autorización para que el cuentahabiente Monex ingrese su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/> Los posibles valores de <em>relationship</em> y <em>kind_of_relationship</em> se deben  obtener de <a href=\"#operation/getAvailableRelationshipsMonexUsingGET\">/subscriptions/{subscription}/beneficiaries/relationships.</a><br/><br/>La confirmación de registro en Monex se realizará a través de una notificación a los webhooks registrados con el evento de tipo <a href=\"#section/Eventos/Tipos-de-Eventos\">ACCOUNT.CREATED.</a>
         * @summary Pre-registro de cuentas de beneficiarios SPID®
         * @param {AccountSpid} body Información de la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        preRegisterAccountsUsingPOST1(body, authorization, subscription, options) {
            const localVarFetchArgs = exports.CuentasDeBeneficiariosSPIDApiFetchParamCreator(configuration).preRegisterAccountsUsingPOST1(body, authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.CuentasDeBeneficiariosSPIDApiFp = CuentasDeBeneficiariosSPIDApiFp;
/**
 * CuentasDeBeneficiariosSPIDApi - factory interface
 * @export
 */
const CuentasDeBeneficiariosSPIDApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Obtiene los beneficiarios SPID registrados al contrato relacionado con la suscripción. Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
         * @summary Consulta los beneficiarios SPID registrados
         * @param {string} authorization Header para token
         * @param {string} [account] Cuenta del beneficiario, puede ser CLABE (18 dígitos), Tarjeta de débito  (TDD, 16 dígitos) o número de celular (10 dígitos).
         * @param {string} [beneficiaryBank] Es la clave del banco beneficiario. Se puede obtener del catalogo de &lt;a href&#x3D;\&quot;#operation/getAllInstitutionsUsingGET\&quot;&gt;instituciones.&lt;/a&gt;
         * @param {string} [beneficiaryName] Es el nombre del beneficiario.
         * @param {string} [endDate] Es la fecha de inicio del periodo a filtrar en formato dd-mm-yyyy.
         * @param {string} [initDate] Es la fecha de inicio del periodo a filtrar en formato dd-mm-yyyy.
         * @param {string} [rfc] Es el Registro Federal de Contribuyentes (RFC) del beneficiario.
         * @param {string} [status] Es el estado (estatus) de la cuenta, Los valores pueden ser &lt;b&gt;PENDING&lt;/b&gt; y &lt;b&gt;REGISTERED&lt;/b&gt;.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSpidBeneficiariesForAccount(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options) {
            return exports.CuentasDeBeneficiariosSPIDApiFp(configuration).getSpidBeneficiariesForAccount(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options)(fetch, basePath);
        },
        /**
         * Pre-registra una o más cuentas de beneficiario SPID® en la plataforma de Wire4, ésta le proporcionaará una URL donde lo llevará al centro de autorización para que el cuentahabiente Monex ingrese su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/> Los posibles valores de <em>relationship</em> y <em>kind_of_relationship</em> se deben  obtener de <a href=\"#operation/getAvailableRelationshipsMonexUsingGET\">/subscriptions/{subscription}/beneficiaries/relationships.</a><br/><br/>La confirmación de registro en Monex se realizará a través de una notificación a los webhooks registrados con el evento de tipo <a href=\"#section/Eventos/Tipos-de-Eventos\">ACCOUNT.CREATED.</a>
         * @summary Pre-registro de cuentas de beneficiarios SPID®
         * @param {AccountSpid} body Información de la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        preRegisterAccountsUsingPOST1(body, authorization, subscription, options) {
            return exports.CuentasDeBeneficiariosSPIDApiFp(configuration).preRegisterAccountsUsingPOST1(body, authorization, subscription, options)(fetch, basePath);
        },
    };
};
exports.CuentasDeBeneficiariosSPIDApiFactory = CuentasDeBeneficiariosSPIDApiFactory;
/**
 * CuentasDeBeneficiariosSPIDApi - object-oriented interface
 * @export
 * @class CuentasDeBeneficiariosSPIDApi
 * @extends {BaseAPI}
 */
class CuentasDeBeneficiariosSPIDApi extends BaseAPI {
    /**
     * Obtiene los beneficiarios SPID registrados al contrato relacionado con la suscripción. Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
     * @summary Consulta los beneficiarios SPID registrados
     * @param {string} authorization Header para token
     * @param {string} [account] Cuenta del beneficiario, puede ser CLABE (18 dígitos), Tarjeta de débito  (TDD, 16 dígitos) o número de celular (10 dígitos).
     * @param {string} [beneficiaryBank] Es la clave del banco beneficiario. Se puede obtener del catalogo de &lt;a href&#x3D;\&quot;#operation/getAllInstitutionsUsingGET\&quot;&gt;instituciones.&lt;/a&gt;
     * @param {string} [beneficiaryName] Es el nombre del beneficiario.
     * @param {string} [endDate] Es la fecha de inicio del periodo a filtrar en formato dd-mm-yyyy.
     * @param {string} [initDate] Es la fecha de inicio del periodo a filtrar en formato dd-mm-yyyy.
     * @param {string} [rfc] Es el Registro Federal de Contribuyentes (RFC) del beneficiario.
     * @param {string} [status] Es el estado (estatus) de la cuenta, Los valores pueden ser &lt;b&gt;PENDING&lt;/b&gt; y &lt;b&gt;REGISTERED&lt;/b&gt;.
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPIDApi
     */
    getSpidBeneficiariesForAccount(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options) {
        return exports.CuentasDeBeneficiariosSPIDApiFp(this.configuration).getSpidBeneficiariesForAccount(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Pre-registra una o más cuentas de beneficiario SPID® en la plataforma de Wire4, ésta le proporcionaará una URL donde lo llevará al centro de autorización para que el cuentahabiente Monex ingrese su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/> Los posibles valores de <em>relationship</em> y <em>kind_of_relationship</em> se deben  obtener de <a href=\"#operation/getAvailableRelationshipsMonexUsingGET\">/subscriptions/{subscription}/beneficiaries/relationships.</a><br/><br/>La confirmación de registro en Monex se realizará a través de una notificación a los webhooks registrados con el evento de tipo <a href=\"#section/Eventos/Tipos-de-Eventos\">ACCOUNT.CREATED.</a>
     * @summary Pre-registro de cuentas de beneficiarios SPID®
     * @param {AccountSpid} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPIDApi
     */
    preRegisterAccountsUsingPOST1(body, authorization, subscription, options) {
        return exports.CuentasDeBeneficiariosSPIDApiFp(this.configuration).preRegisterAccountsUsingPOST1(body, authorization, subscription, options)(this.fetch, this.basePath);
    }
}
exports.CuentasDeBeneficiariosSPIDApi = CuentasDeBeneficiariosSPIDApi;
/**
 * DepositantesApi - fetch parameter creator
 * @export
 */
const DepositantesApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Obtiene una lista de depositantes asociados al contrato relacionado a la suscripción.
         * @summary Consulta de cuentas de depositantes
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDepositantsUsingGET(authorization, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling getDepositantsUsingGET.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling getDepositantsUsingGET.');
            }
            const localVarPath = `/subscriptions/{subscription}/depositants`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Registra un nuevo depositante en el contrato asociado a la suscripción.
         * @summary Registra un nuevo depositante
         * @param {DepositantsRegister} body Depositant info
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerDepositantsUsingPOST(body, authorization, subscription, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling registerDepositantsUsingPOST.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling registerDepositantsUsingPOST.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling registerDepositantsUsingPOST.');
            }
            const localVarPath = `/subscriptions/{subscription}/depositants`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("DepositantsRegister" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.DepositantesApiFetchParamCreator = DepositantesApiFetchParamCreator;
/**
 * DepositantesApi - functional programming interface
 * @export
 */
const DepositantesApiFp = function (configuration) {
    return {
        /**
         * Obtiene una lista de depositantes asociados al contrato relacionado a la suscripción.
         * @summary Consulta de cuentas de depositantes
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDepositantsUsingGET(authorization, subscription, options) {
            const localVarFetchArgs = exports.DepositantesApiFetchParamCreator(configuration).getDepositantsUsingGET(authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Registra un nuevo depositante en el contrato asociado a la suscripción.
         * @summary Registra un nuevo depositante
         * @param {DepositantsRegister} body Depositant info
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerDepositantsUsingPOST(body, authorization, subscription, options) {
            const localVarFetchArgs = exports.DepositantesApiFetchParamCreator(configuration).registerDepositantsUsingPOST(body, authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.DepositantesApiFp = DepositantesApiFp;
/**
 * DepositantesApi - factory interface
 * @export
 */
const DepositantesApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Obtiene una lista de depositantes asociados al contrato relacionado a la suscripción.
         * @summary Consulta de cuentas de depositantes
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getDepositantsUsingGET(authorization, subscription, options) {
            return exports.DepositantesApiFp(configuration).getDepositantsUsingGET(authorization, subscription, options)(fetch, basePath);
        },
        /**
         * Registra un nuevo depositante en el contrato asociado a la suscripción.
         * @summary Registra un nuevo depositante
         * @param {DepositantsRegister} body Depositant info
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerDepositantsUsingPOST(body, authorization, subscription, options) {
            return exports.DepositantesApiFp(configuration).registerDepositantsUsingPOST(body, authorization, subscription, options)(fetch, basePath);
        },
    };
};
exports.DepositantesApiFactory = DepositantesApiFactory;
/**
 * DepositantesApi - object-oriented interface
 * @export
 * @class DepositantesApi
 * @extends {BaseAPI}
 */
class DepositantesApi extends BaseAPI {
    /**
     * Obtiene una lista de depositantes asociados al contrato relacionado a la suscripción.
     * @summary Consulta de cuentas de depositantes
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DepositantesApi
     */
    getDepositantsUsingGET(authorization, subscription, options) {
        return exports.DepositantesApiFp(this.configuration).getDepositantsUsingGET(authorization, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Registra un nuevo depositante en el contrato asociado a la suscripción.
     * @summary Registra un nuevo depositante
     * @param {DepositantsRegister} body Depositant info
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DepositantesApi
     */
    registerDepositantsUsingPOST(body, authorization, subscription, options) {
        return exports.DepositantesApiFp(this.configuration).registerDepositantsUsingPOST(body, authorization, subscription, options)(this.fetch, this.basePath);
    }
}
exports.DepositantesApi = DepositantesApi;
/**
 * EmpresasCoDiApi - fetch parameter creator
 * @export
 */
const EmpresasCoDiApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Consulta de empresas CODI® registradas para la aplicación.
         * @summary Consulta de empresas CODI®
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainCompanies(authorization, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling obtainCompanies.');
            }
            const localVarPath = `/codi/companies`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Registra una empresa para hacer uso de operaciones CODI®.<br><br> <b>Nota:<b> Es requerido tener el certificado emitido por BANXICO® asi como el Nombre de la empresa, Nombre comercial y el Registro Federal de Contribuyentes (RFC) de la empresa.<br/>
         * @summary Registro de empresas CODI®
         * @param {CompanyRequested} body Información de la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerCompanyUsingPOST(body, authorization, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling registerCompanyUsingPOST.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling registerCompanyUsingPOST.');
            }
            const localVarPath = `/codi/companies`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("CompanyRequested" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.EmpresasCoDiApiFetchParamCreator = EmpresasCoDiApiFetchParamCreator;
/**
 * EmpresasCoDiApi - functional programming interface
 * @export
 */
const EmpresasCoDiApiFp = function (configuration) {
    return {
        /**
         * Consulta de empresas CODI® registradas para la aplicación.
         * @summary Consulta de empresas CODI®
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainCompanies(authorization, options) {
            const localVarFetchArgs = exports.EmpresasCoDiApiFetchParamCreator(configuration).obtainCompanies(authorization, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Registra una empresa para hacer uso de operaciones CODI®.<br><br> <b>Nota:<b> Es requerido tener el certificado emitido por BANXICO® asi como el Nombre de la empresa, Nombre comercial y el Registro Federal de Contribuyentes (RFC) de la empresa.<br/>
         * @summary Registro de empresas CODI®
         * @param {CompanyRequested} body Información de la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerCompanyUsingPOST(body, authorization, options) {
            const localVarFetchArgs = exports.EmpresasCoDiApiFetchParamCreator(configuration).registerCompanyUsingPOST(body, authorization, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.EmpresasCoDiApiFp = EmpresasCoDiApiFp;
/**
 * EmpresasCoDiApi - factory interface
 * @export
 */
const EmpresasCoDiApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Consulta de empresas CODI® registradas para la aplicación.
         * @summary Consulta de empresas CODI®
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainCompanies(authorization, options) {
            return exports.EmpresasCoDiApiFp(configuration).obtainCompanies(authorization, options)(fetch, basePath);
        },
        /**
         * Registra una empresa para hacer uso de operaciones CODI®.<br><br> <b>Nota:<b> Es requerido tener el certificado emitido por BANXICO® asi como el Nombre de la empresa, Nombre comercial y el Registro Federal de Contribuyentes (RFC) de la empresa.<br/>
         * @summary Registro de empresas CODI®
         * @param {CompanyRequested} body Información de la cuenta del beneficiario
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerCompanyUsingPOST(body, authorization, options) {
            return exports.EmpresasCoDiApiFp(configuration).registerCompanyUsingPOST(body, authorization, options)(fetch, basePath);
        },
    };
};
exports.EmpresasCoDiApiFactory = EmpresasCoDiApiFactory;
/**
 * EmpresasCoDiApi - object-oriented interface
 * @export
 * @class EmpresasCoDiApi
 * @extends {BaseAPI}
 */
class EmpresasCoDiApi extends BaseAPI {
    /**
     * Consulta de empresas CODI® registradas para la aplicación.
     * @summary Consulta de empresas CODI®
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmpresasCoDiApi
     */
    obtainCompanies(authorization, options) {
        return exports.EmpresasCoDiApiFp(this.configuration).obtainCompanies(authorization, options)(this.fetch, this.basePath);
    }
    /**
     * Registra una empresa para hacer uso de operaciones CODI®.<br><br> <b>Nota:<b> Es requerido tener el certificado emitido por BANXICO® asi como el Nombre de la empresa, Nombre comercial y el Registro Federal de Contribuyentes (RFC) de la empresa.<br/>
     * @summary Registro de empresas CODI®
     * @param {CompanyRequested} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmpresasCoDiApi
     */
    registerCompanyUsingPOST(body, authorization, options) {
        return exports.EmpresasCoDiApiFp(this.configuration).registerCompanyUsingPOST(body, authorization, options)(this.fetch, this.basePath);
    }
}
exports.EmpresasCoDiApi = EmpresasCoDiApi;
/**
 * FacturasApi - fetch parameter creator
 * @export
 */
const FacturasApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Se debe especificar el identificador de la factura
         * @summary Consulta de facturas por identificador
         * @param {string} authorization Header para token
         * @param {string} id Identificador de la factura
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        billingsReportByIdUsingGET(authorization, id, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling billingsReportByIdUsingGET.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id', 'Required parameter id was null or undefined when calling billingsReportByIdUsingGET.');
            }
            const localVarPath = `/billings/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Es posible filtrar por periodo de fecha yyyy-MM, por ejemplo 2019-11
         * @summary Consulta de facturas
         * @param {string} authorization Header para token
         * @param {string} [period] Filtro de fecha yyyy-MM
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        billingsReportUsingGET(authorization, period, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling billingsReportUsingGET.');
            }
            const localVarPath = `/billings`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (period !== undefined) {
                localVarQueryParameter['period'] = period;
            }
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.FacturasApiFetchParamCreator = FacturasApiFetchParamCreator;
/**
 * FacturasApi - functional programming interface
 * @export
 */
const FacturasApiFp = function (configuration) {
    return {
        /**
         * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Se debe especificar el identificador de la factura
         * @summary Consulta de facturas por identificador
         * @param {string} authorization Header para token
         * @param {string} id Identificador de la factura
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        billingsReportByIdUsingGET(authorization, id, options) {
            const localVarFetchArgs = exports.FacturasApiFetchParamCreator(configuration).billingsReportByIdUsingGET(authorization, id, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Es posible filtrar por periodo de fecha yyyy-MM, por ejemplo 2019-11
         * @summary Consulta de facturas
         * @param {string} authorization Header para token
         * @param {string} [period] Filtro de fecha yyyy-MM
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        billingsReportUsingGET(authorization, period, options) {
            const localVarFetchArgs = exports.FacturasApiFetchParamCreator(configuration).billingsReportUsingGET(authorization, period, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.FacturasApiFp = FacturasApiFp;
/**
 * FacturasApi - factory interface
 * @export
 */
const FacturasApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Se debe especificar el identificador de la factura
         * @summary Consulta de facturas por identificador
         * @param {string} authorization Header para token
         * @param {string} id Identificador de la factura
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        billingsReportByIdUsingGET(authorization, id, options) {
            return exports.FacturasApiFp(configuration).billingsReportByIdUsingGET(authorization, id, options)(fetch, basePath);
        },
        /**
         * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Es posible filtrar por periodo de fecha yyyy-MM, por ejemplo 2019-11
         * @summary Consulta de facturas
         * @param {string} authorization Header para token
         * @param {string} [period] Filtro de fecha yyyy-MM
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        billingsReportUsingGET(authorization, period, options) {
            return exports.FacturasApiFp(configuration).billingsReportUsingGET(authorization, period, options)(fetch, basePath);
        },
    };
};
exports.FacturasApiFactory = FacturasApiFactory;
/**
 * FacturasApi - object-oriented interface
 * @export
 * @class FacturasApi
 * @extends {BaseAPI}
 */
class FacturasApi extends BaseAPI {
    /**
     * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Se debe especificar el identificador de la factura
     * @summary Consulta de facturas por identificador
     * @param {string} authorization Header para token
     * @param {string} id Identificador de la factura
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FacturasApi
     */
    billingsReportByIdUsingGET(authorization, id, options) {
        return exports.FacturasApiFp(this.configuration).billingsReportByIdUsingGET(authorization, id, options)(this.fetch, this.basePath);
    }
    /**
     * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Es posible filtrar por periodo de fecha yyyy-MM, por ejemplo 2019-11
     * @summary Consulta de facturas
     * @param {string} authorization Header para token
     * @param {string} [period] Filtro de fecha yyyy-MM
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FacturasApi
     */
    billingsReportUsingGET(authorization, period, options) {
        return exports.FacturasApiFp(this.configuration).billingsReportUsingGET(authorization, period, options)(this.fetch, this.basePath);
    }
}
exports.FacturasApi = FacturasApi;
/**
 * InstitucionesApi - fetch parameter creator
 * @export
 */
const InstitucionesApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Se obtiene un listado de las instituciones bancarias y la información de cada una de estas.
         * @summary Consulta de instituciones bancarias
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllInstitutionsUsingGET(authorization, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling getAllInstitutionsUsingGET.');
            }
            const localVarPath = `/institutions`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.InstitucionesApiFetchParamCreator = InstitucionesApiFetchParamCreator;
/**
 * InstitucionesApi - functional programming interface
 * @export
 */
const InstitucionesApiFp = function (configuration) {
    return {
        /**
         * Se obtiene un listado de las instituciones bancarias y la información de cada una de estas.
         * @summary Consulta de instituciones bancarias
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllInstitutionsUsingGET(authorization, options) {
            const localVarFetchArgs = exports.InstitucionesApiFetchParamCreator(configuration).getAllInstitutionsUsingGET(authorization, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.InstitucionesApiFp = InstitucionesApiFp;
/**
 * InstitucionesApi - factory interface
 * @export
 */
const InstitucionesApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Se obtiene un listado de las instituciones bancarias y la información de cada una de estas.
         * @summary Consulta de instituciones bancarias
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllInstitutionsUsingGET(authorization, options) {
            return exports.InstitucionesApiFp(configuration).getAllInstitutionsUsingGET(authorization, options)(fetch, basePath);
        },
    };
};
exports.InstitucionesApiFactory = InstitucionesApiFactory;
/**
 * InstitucionesApi - object-oriented interface
 * @export
 * @class InstitucionesApi
 * @extends {BaseAPI}
 */
class InstitucionesApi extends BaseAPI {
    /**
     * Se obtiene un listado de las instituciones bancarias y la información de cada una de estas.
     * @summary Consulta de instituciones bancarias
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InstitucionesApi
     */
    getAllInstitutionsUsingGET(authorization, options) {
        return exports.InstitucionesApiFp(this.configuration).getAllInstitutionsUsingGET(authorization, options)(this.fetch, this.basePath);
    }
}
exports.InstitucionesApi = InstitucionesApi;
/**
 * LmitesDeMontosApi - fetch parameter creator
 * @export
 */
const LmitesDeMontosApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación.
         * @summary Consulta de configuraciones
         * @param {string} authorization Header para token
         * @param {string} suscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainConfigurationsLimits(authorization, suscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling obtainConfigurationsLimits.');
            }
            // verify required parameter 'suscription' is not null or undefined
            if (suscription === null || suscription === undefined) {
                throw new RequiredError('suscription', 'Required parameter suscription was null or undefined when calling obtainConfigurationsLimits.');
            }
            const localVarPath = `/subscriptions/{suscription}/configurations`
                .replace(`{${"suscription"}}`, encodeURIComponent(String(suscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Actualiza las configuraciones de un contrato asociado a una suscripción
         * @summary Actualiza configuraciones por suscripción
         * @param {UpdateConfigurationsRequestDTO} body updateConfigurationsResquestDTO
         * @param {string} authorization Header para token
         * @param {string} suscription suscription
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateConfigurations(body, authorization, suscription, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling updateConfigurations.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling updateConfigurations.');
            }
            // verify required parameter 'suscription' is not null or undefined
            if (suscription === null || suscription === undefined) {
                throw new RequiredError('suscription', 'Required parameter suscription was null or undefined when calling updateConfigurations.');
            }
            const localVarPath = `/subscriptions/{suscription}/configurations`
                .replace(`{${"suscription"}}`, encodeURIComponent(String(suscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("UpdateConfigurationsRequestDTO" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.LmitesDeMontosApiFetchParamCreator = LmitesDeMontosApiFetchParamCreator;
/**
 * LmitesDeMontosApi - functional programming interface
 * @export
 */
const LmitesDeMontosApiFp = function (configuration) {
    return {
        /**
         * Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación.
         * @summary Consulta de configuraciones
         * @param {string} authorization Header para token
         * @param {string} suscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainConfigurationsLimits(authorization, suscription, options) {
            const localVarFetchArgs = exports.LmitesDeMontosApiFetchParamCreator(configuration).obtainConfigurationsLimits(authorization, suscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Actualiza las configuraciones de un contrato asociado a una suscripción
         * @summary Actualiza configuraciones por suscripción
         * @param {UpdateConfigurationsRequestDTO} body updateConfigurationsResquestDTO
         * @param {string} authorization Header para token
         * @param {string} suscription suscription
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateConfigurations(body, authorization, suscription, options) {
            const localVarFetchArgs = exports.LmitesDeMontosApiFetchParamCreator(configuration).updateConfigurations(body, authorization, suscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.LmitesDeMontosApiFp = LmitesDeMontosApiFp;
/**
 * LmitesDeMontosApi - factory interface
 * @export
 */
const LmitesDeMontosApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación.
         * @summary Consulta de configuraciones
         * @param {string} authorization Header para token
         * @param {string} suscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainConfigurationsLimits(authorization, suscription, options) {
            return exports.LmitesDeMontosApiFp(configuration).obtainConfigurationsLimits(authorization, suscription, options)(fetch, basePath);
        },
        /**
         * Actualiza las configuraciones de un contrato asociado a una suscripción
         * @summary Actualiza configuraciones por suscripción
         * @param {UpdateConfigurationsRequestDTO} body updateConfigurationsResquestDTO
         * @param {string} authorization Header para token
         * @param {string} suscription suscription
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateConfigurations(body, authorization, suscription, options) {
            return exports.LmitesDeMontosApiFp(configuration).updateConfigurations(body, authorization, suscription, options)(fetch, basePath);
        },
    };
};
exports.LmitesDeMontosApiFactory = LmitesDeMontosApiFactory;
/**
 * LmitesDeMontosApi - object-oriented interface
 * @export
 * @class LmitesDeMontosApi
 * @extends {BaseAPI}
 */
class LmitesDeMontosApi extends BaseAPI {
    /**
     * Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación.
     * @summary Consulta de configuraciones
     * @param {string} authorization Header para token
     * @param {string} suscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LmitesDeMontosApi
     */
    obtainConfigurationsLimits(authorization, suscription, options) {
        return exports.LmitesDeMontosApiFp(this.configuration).obtainConfigurationsLimits(authorization, suscription, options)(this.fetch, this.basePath);
    }
    /**
     * Actualiza las configuraciones de un contrato asociado a una suscripción
     * @summary Actualiza configuraciones por suscripción
     * @param {UpdateConfigurationsRequestDTO} body updateConfigurationsResquestDTO
     * @param {string} authorization Header para token
     * @param {string} suscription suscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LmitesDeMontosApi
     */
    updateConfigurations(body, authorization, suscription, options) {
        return exports.LmitesDeMontosApiFp(this.configuration).updateConfigurations(body, authorization, suscription, options)(this.fetch, this.basePath);
    }
}
exports.LmitesDeMontosApi = LmitesDeMontosApi;
/**
 * OperacionesCoDiApi - fetch parameter creator
 * @export
 */
const OperacionesCoDiApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Obtiene las operaciones generadas a partir de peticiones de pago CODI® de forma paginada, pudiendo aplicar filtros.
         * @summary Consulta de operaciones
         * @param {CodiOperationsFiltersRequestDTO} [body] Filtros de busqueda
         * @param {string} authorization Header para token
         * @param {string} [companyId] Es el identificador de empresa CODI®.
         * @param {string} [page] Es el número de pago.
         * @param {string} [salesPointId] Es el identificador del punto de venta.
         * @param {string} [size] Es el tamaño de página.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        consultCodiOperations(body, authorization, companyId, page, salesPointId, size, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling consultCodiOperations.');
            }
            const localVarPath = `/codi/charges`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (companyId !== undefined) {
                localVarQueryParameter['company_id'] = companyId;
            }
            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }
            if (salesPointId !== undefined) {
                localVarQueryParameter['sales_point_id'] = salesPointId;
            }
            if (size !== undefined) {
                localVarQueryParameter['size'] = size;
            }
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("CodiOperationsFiltersRequestDTO" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.OperacionesCoDiApiFetchParamCreator = OperacionesCoDiApiFetchParamCreator;
/**
 * OperacionesCoDiApi - functional programming interface
 * @export
 */
const OperacionesCoDiApiFp = function (configuration) {
    return {
        /**
         * Obtiene las operaciones generadas a partir de peticiones de pago CODI® de forma paginada, pudiendo aplicar filtros.
         * @summary Consulta de operaciones
         * @param {CodiOperationsFiltersRequestDTO} [body] Filtros de busqueda
         * @param {string} authorization Header para token
         * @param {string} [companyId] Es el identificador de empresa CODI®.
         * @param {string} [page] Es el número de pago.
         * @param {string} [salesPointId] Es el identificador del punto de venta.
         * @param {string} [size] Es el tamaño de página.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        consultCodiOperations(body, authorization, companyId, page, salesPointId, size, options) {
            const localVarFetchArgs = exports.OperacionesCoDiApiFetchParamCreator(configuration).consultCodiOperations(body, authorization, companyId, page, salesPointId, size, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.OperacionesCoDiApiFp = OperacionesCoDiApiFp;
/**
 * OperacionesCoDiApi - factory interface
 * @export
 */
const OperacionesCoDiApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Obtiene las operaciones generadas a partir de peticiones de pago CODI® de forma paginada, pudiendo aplicar filtros.
         * @summary Consulta de operaciones
         * @param {CodiOperationsFiltersRequestDTO} [body] Filtros de busqueda
         * @param {string} authorization Header para token
         * @param {string} [companyId] Es el identificador de empresa CODI®.
         * @param {string} [page] Es el número de pago.
         * @param {string} [salesPointId] Es el identificador del punto de venta.
         * @param {string} [size] Es el tamaño de página.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        consultCodiOperations(body, authorization, companyId, page, salesPointId, size, options) {
            return exports.OperacionesCoDiApiFp(configuration).consultCodiOperations(body, authorization, companyId, page, salesPointId, size, options)(fetch, basePath);
        },
    };
};
exports.OperacionesCoDiApiFactory = OperacionesCoDiApiFactory;
/**
 * OperacionesCoDiApi - object-oriented interface
 * @export
 * @class OperacionesCoDiApi
 * @extends {BaseAPI}
 */
class OperacionesCoDiApi extends BaseAPI {
    /**
     * Obtiene las operaciones generadas a partir de peticiones de pago CODI® de forma paginada, pudiendo aplicar filtros.
     * @summary Consulta de operaciones
     * @param {CodiOperationsFiltersRequestDTO} [body] Filtros de busqueda
     * @param {string} authorization Header para token
     * @param {string} [companyId] Es el identificador de empresa CODI®.
     * @param {string} [page] Es el número de pago.
     * @param {string} [salesPointId] Es el identificador del punto de venta.
     * @param {string} [size] Es el tamaño de página.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OperacionesCoDiApi
     */
    consultCodiOperations(body, authorization, companyId, page, salesPointId, size, options) {
        return exports.OperacionesCoDiApiFp(this.configuration).consultCodiOperations(body, authorization, companyId, page, salesPointId, size, options)(this.fetch, this.basePath);
    }
}
exports.OperacionesCoDiApi = OperacionesCoDiApi;
/**
 * PeticionesDePagoPorCoDiApi - fetch parameter creator
 * @export
 */
const PeticionesDePagoPorCoDiApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Obtiene la información de una petición de pago CODI® por orderId para un punto de venta.
         * @summary Consulta información de petición por orderId
         * @param {string} authorization Header para token
         * @param {string} orderId Identificador del pago CODI®
         * @param {string} salesPointId Identificador del punto de venta
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        consultCodiRequestByOrderId(authorization, orderId, salesPointId, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling consultCodiRequestByOrderId.');
            }
            // verify required parameter 'orderId' is not null or undefined
            if (orderId === null || orderId === undefined) {
                throw new RequiredError('orderId', 'Required parameter orderId was null or undefined when calling consultCodiRequestByOrderId.');
            }
            // verify required parameter 'salesPointId' is not null or undefined
            if (salesPointId === null || salesPointId === undefined) {
                throw new RequiredError('salesPointId', 'Required parameter salesPointId was null or undefined when calling consultCodiRequestByOrderId.');
            }
            const localVarPath = `/codi/sales-point/charges`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (orderId !== undefined) {
                localVarQueryParameter['orderId'] = orderId;
            }
            if (salesPointId !== undefined) {
                localVarQueryParameter['salesPointId'] = salesPointId;
            }
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Genera un código QR solicitado por un punto de venta para un pago mediante CODI®
         * @summary Genera código QR
         * @param {CodiCodeRequestDTO} body Información del pago CODI®
         * @param {string} authorization Header para token
         * @param {string} salesPointId Identificador del punto de venta
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        generateCodiCodeQR(body, authorization, salesPointId, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling generateCodiCodeQR.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling generateCodiCodeQR.');
            }
            // verify required parameter 'salesPointId' is not null or undefined
            if (salesPointId === null || salesPointId === undefined) {
                throw new RequiredError('salesPointId', 'Required parameter salesPointId was null or undefined when calling generateCodiCodeQR.');
            }
            const localVarPath = `/codi/sales-point/charges`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (salesPointId !== undefined) {
                localVarQueryParameter['salesPointId'] = salesPointId;
            }
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("CodiCodeRequestDTO" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.PeticionesDePagoPorCoDiApiFetchParamCreator = PeticionesDePagoPorCoDiApiFetchParamCreator;
/**
 * PeticionesDePagoPorCoDiApi - functional programming interface
 * @export
 */
const PeticionesDePagoPorCoDiApiFp = function (configuration) {
    return {
        /**
         * Obtiene la información de una petición de pago CODI® por orderId para un punto de venta.
         * @summary Consulta información de petición por orderId
         * @param {string} authorization Header para token
         * @param {string} orderId Identificador del pago CODI®
         * @param {string} salesPointId Identificador del punto de venta
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        consultCodiRequestByOrderId(authorization, orderId, salesPointId, options) {
            const localVarFetchArgs = exports.PeticionesDePagoPorCoDiApiFetchParamCreator(configuration).consultCodiRequestByOrderId(authorization, orderId, salesPointId, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Genera un código QR solicitado por un punto de venta para un pago mediante CODI®
         * @summary Genera código QR
         * @param {CodiCodeRequestDTO} body Información del pago CODI®
         * @param {string} authorization Header para token
         * @param {string} salesPointId Identificador del punto de venta
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        generateCodiCodeQR(body, authorization, salesPointId, options) {
            const localVarFetchArgs = exports.PeticionesDePagoPorCoDiApiFetchParamCreator(configuration).generateCodiCodeQR(body, authorization, salesPointId, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.PeticionesDePagoPorCoDiApiFp = PeticionesDePagoPorCoDiApiFp;
/**
 * PeticionesDePagoPorCoDiApi - factory interface
 * @export
 */
const PeticionesDePagoPorCoDiApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Obtiene la información de una petición de pago CODI® por orderId para un punto de venta.
         * @summary Consulta información de petición por orderId
         * @param {string} authorization Header para token
         * @param {string} orderId Identificador del pago CODI®
         * @param {string} salesPointId Identificador del punto de venta
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        consultCodiRequestByOrderId(authorization, orderId, salesPointId, options) {
            return exports.PeticionesDePagoPorCoDiApiFp(configuration).consultCodiRequestByOrderId(authorization, orderId, salesPointId, options)(fetch, basePath);
        },
        /**
         * Genera un código QR solicitado por un punto de venta para un pago mediante CODI®
         * @summary Genera código QR
         * @param {CodiCodeRequestDTO} body Información del pago CODI®
         * @param {string} authorization Header para token
         * @param {string} salesPointId Identificador del punto de venta
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        generateCodiCodeQR(body, authorization, salesPointId, options) {
            return exports.PeticionesDePagoPorCoDiApiFp(configuration).generateCodiCodeQR(body, authorization, salesPointId, options)(fetch, basePath);
        },
    };
};
exports.PeticionesDePagoPorCoDiApiFactory = PeticionesDePagoPorCoDiApiFactory;
/**
 * PeticionesDePagoPorCoDiApi - object-oriented interface
 * @export
 * @class PeticionesDePagoPorCoDiApi
 * @extends {BaseAPI}
 */
class PeticionesDePagoPorCoDiApi extends BaseAPI {
    /**
     * Obtiene la información de una petición de pago CODI® por orderId para un punto de venta.
     * @summary Consulta información de petición por orderId
     * @param {string} authorization Header para token
     * @param {string} orderId Identificador del pago CODI®
     * @param {string} salesPointId Identificador del punto de venta
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PeticionesDePagoPorCoDiApi
     */
    consultCodiRequestByOrderId(authorization, orderId, salesPointId, options) {
        return exports.PeticionesDePagoPorCoDiApiFp(this.configuration).consultCodiRequestByOrderId(authorization, orderId, salesPointId, options)(this.fetch, this.basePath);
    }
    /**
     * Genera un código QR solicitado por un punto de venta para un pago mediante CODI®
     * @summary Genera código QR
     * @param {CodiCodeRequestDTO} body Información del pago CODI®
     * @param {string} authorization Header para token
     * @param {string} salesPointId Identificador del punto de venta
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PeticionesDePagoPorCoDiApi
     */
    generateCodiCodeQR(body, authorization, salesPointId, options) {
        return exports.PeticionesDePagoPorCoDiApiFp(this.configuration).generateCodiCodeQR(body, authorization, salesPointId, options)(this.fetch, this.basePath);
    }
}
exports.PeticionesDePagoPorCoDiApi = PeticionesDePagoPorCoDiApi;
/**
 * PuntosDeVentaCoDiApi - fetch parameter creator
 * @export
 */
const PuntosDeVentaCoDiApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Se registra un punto de venta (TPV) desde donde se emitarán los cobros CODI®. El punto de venta se debe asociar a un cuenta CLABE registrada previamente ante Banxico para realizar cobros con CODI®.
         * @summary Registro de punto de venta.
         * @param {SalesPointRequest} body Es el objeto que contiene información del punto de venta CODI®.
         * @param {string} authorization Header para token
         * @param {string} companyId Es el identificador de la empresa.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createSalesPoint(body, authorization, companyId, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling createSalesPoint.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling createSalesPoint.');
            }
            // verify required parameter 'companyId' is not null or undefined
            if (companyId === null || companyId === undefined) {
                throw new RequiredError('companyId', 'Required parameter companyId was null or undefined when calling createSalesPoint.');
            }
            const localVarPath = `/codi/companies/salespoint`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (companyId !== undefined) {
                localVarQueryParameter['companyId'] = companyId;
            }
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("SalesPointRequest" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Obtiene los puntos de venta asociados a una empresa en las cuales se hacen operaciones CODI®.
         * @summary Consulta de puntos de venta
         * @param {string} authorization Header para token
         * @param {string} companyId Es el identificador de la empresa. Ejemplo: 8838d513-5916-4662-bb30-2448f0f543ed
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainSalePoints(authorization, companyId, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling obtainSalePoints.');
            }
            // verify required parameter 'companyId' is not null or undefined
            if (companyId === null || companyId === undefined) {
                throw new RequiredError('companyId', 'Required parameter companyId was null or undefined when calling obtainSalePoints.');
            }
            const localVarPath = `/codi/companies/salespoint`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (companyId !== undefined) {
                localVarQueryParameter['companyId'] = companyId;
            }
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.PuntosDeVentaCoDiApiFetchParamCreator = PuntosDeVentaCoDiApiFetchParamCreator;
/**
 * PuntosDeVentaCoDiApi - functional programming interface
 * @export
 */
const PuntosDeVentaCoDiApiFp = function (configuration) {
    return {
        /**
         * Se registra un punto de venta (TPV) desde donde se emitarán los cobros CODI®. El punto de venta se debe asociar a un cuenta CLABE registrada previamente ante Banxico para realizar cobros con CODI®.
         * @summary Registro de punto de venta.
         * @param {SalesPointRequest} body Es el objeto que contiene información del punto de venta CODI®.
         * @param {string} authorization Header para token
         * @param {string} companyId Es el identificador de la empresa.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createSalesPoint(body, authorization, companyId, options) {
            const localVarFetchArgs = exports.PuntosDeVentaCoDiApiFetchParamCreator(configuration).createSalesPoint(body, authorization, companyId, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Obtiene los puntos de venta asociados a una empresa en las cuales se hacen operaciones CODI®.
         * @summary Consulta de puntos de venta
         * @param {string} authorization Header para token
         * @param {string} companyId Es el identificador de la empresa. Ejemplo: 8838d513-5916-4662-bb30-2448f0f543ed
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainSalePoints(authorization, companyId, options) {
            const localVarFetchArgs = exports.PuntosDeVentaCoDiApiFetchParamCreator(configuration).obtainSalePoints(authorization, companyId, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.PuntosDeVentaCoDiApiFp = PuntosDeVentaCoDiApiFp;
/**
 * PuntosDeVentaCoDiApi - factory interface
 * @export
 */
const PuntosDeVentaCoDiApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Se registra un punto de venta (TPV) desde donde se emitarán los cobros CODI®. El punto de venta se debe asociar a un cuenta CLABE registrada previamente ante Banxico para realizar cobros con CODI®.
         * @summary Registro de punto de venta.
         * @param {SalesPointRequest} body Es el objeto que contiene información del punto de venta CODI®.
         * @param {string} authorization Header para token
         * @param {string} companyId Es el identificador de la empresa.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createSalesPoint(body, authorization, companyId, options) {
            return exports.PuntosDeVentaCoDiApiFp(configuration).createSalesPoint(body, authorization, companyId, options)(fetch, basePath);
        },
        /**
         * Obtiene los puntos de venta asociados a una empresa en las cuales se hacen operaciones CODI®.
         * @summary Consulta de puntos de venta
         * @param {string} authorization Header para token
         * @param {string} companyId Es el identificador de la empresa. Ejemplo: 8838d513-5916-4662-bb30-2448f0f543ed
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        obtainSalePoints(authorization, companyId, options) {
            return exports.PuntosDeVentaCoDiApiFp(configuration).obtainSalePoints(authorization, companyId, options)(fetch, basePath);
        },
    };
};
exports.PuntosDeVentaCoDiApiFactory = PuntosDeVentaCoDiApiFactory;
/**
 * PuntosDeVentaCoDiApi - object-oriented interface
 * @export
 * @class PuntosDeVentaCoDiApi
 * @extends {BaseAPI}
 */
class PuntosDeVentaCoDiApi extends BaseAPI {
    /**
     * Se registra un punto de venta (TPV) desde donde se emitarán los cobros CODI®. El punto de venta se debe asociar a un cuenta CLABE registrada previamente ante Banxico para realizar cobros con CODI®.
     * @summary Registro de punto de venta.
     * @param {SalesPointRequest} body Es el objeto que contiene información del punto de venta CODI®.
     * @param {string} authorization Header para token
     * @param {string} companyId Es el identificador de la empresa.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PuntosDeVentaCoDiApi
     */
    createSalesPoint(body, authorization, companyId, options) {
        return exports.PuntosDeVentaCoDiApiFp(this.configuration).createSalesPoint(body, authorization, companyId, options)(this.fetch, this.basePath);
    }
    /**
     * Obtiene los puntos de venta asociados a una empresa en las cuales se hacen operaciones CODI®.
     * @summary Consulta de puntos de venta
     * @param {string} authorization Header para token
     * @param {string} companyId Es el identificador de la empresa. Ejemplo: 8838d513-5916-4662-bb30-2448f0f543ed
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PuntosDeVentaCoDiApi
     */
    obtainSalePoints(authorization, companyId, options) {
        return exports.PuntosDeVentaCoDiApiFp(this.configuration).obtainSalePoints(authorization, companyId, options)(this.fetch, this.basePath);
    }
}
exports.PuntosDeVentaCoDiApi = PuntosDeVentaCoDiApi;
/**
 * SaldoApi - fetch parameter creator
 * @export
 */
const SaldoApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Obtiene el saldo de un contrato, según las divisas que se manejen en dicho contrato, ya sea peso mexicano (MXP) o dólar estadounidense (USD).
         * @summary Consulta los saldo de una cuenta
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBalanceUsingGET(authorization, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling getBalanceUsingGET.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling getBalanceUsingGET.');
            }
            const localVarPath = `/subscriptions/{subscription}/balance`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.SaldoApiFetchParamCreator = SaldoApiFetchParamCreator;
/**
 * SaldoApi - functional programming interface
 * @export
 */
const SaldoApiFp = function (configuration) {
    return {
        /**
         * Obtiene el saldo de un contrato, según las divisas que se manejen en dicho contrato, ya sea peso mexicano (MXP) o dólar estadounidense (USD).
         * @summary Consulta los saldo de una cuenta
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBalanceUsingGET(authorization, subscription, options) {
            const localVarFetchArgs = exports.SaldoApiFetchParamCreator(configuration).getBalanceUsingGET(authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.SaldoApiFp = SaldoApiFp;
/**
 * SaldoApi - factory interface
 * @export
 */
const SaldoApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Obtiene el saldo de un contrato, según las divisas que se manejen en dicho contrato, ya sea peso mexicano (MXP) o dólar estadounidense (USD).
         * @summary Consulta los saldo de una cuenta
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBalanceUsingGET(authorization, subscription, options) {
            return exports.SaldoApiFp(configuration).getBalanceUsingGET(authorization, subscription, options)(fetch, basePath);
        },
    };
};
exports.SaldoApiFactory = SaldoApiFactory;
/**
 * SaldoApi - object-oriented interface
 * @export
 * @class SaldoApi
 * @extends {BaseAPI}
 */
class SaldoApi extends BaseAPI {
    /**
     * Obtiene el saldo de un contrato, según las divisas que se manejen en dicho contrato, ya sea peso mexicano (MXP) o dólar estadounidense (USD).
     * @summary Consulta los saldo de una cuenta
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SaldoApi
     */
    getBalanceUsingGET(authorization, subscription, options) {
        return exports.SaldoApiFp(this.configuration).getBalanceUsingGET(authorization, subscription, options)(this.fetch, this.basePath);
    }
}
exports.SaldoApi = SaldoApi;
/**
 * SuscripcionesApi - fetch parameter creator
 * @export
 */
const SuscripcionesApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Se cambia el estado o estatus de la suscripción a los posibles valores que son: ACTIVE o INACTIVE
         * @summary Cambia el estatus de la suscripción
         * @param {SubscriptionChangeStatusRequest} body request
         * @param {string} authorization Header para token
         * @param {string} subscription subscription
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeSubscriptionStatusUsingPUT(body, authorization, subscription, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling changeSubscriptionStatusUsingPUT.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling changeSubscriptionStatusUsingPUT.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling changeSubscriptionStatusUsingPUT.');
            }
            const localVarPath = `/subscriptions/{subscription}/status`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'PUT' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("SubscriptionChangeStatusRequest" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Se asigna o cambia el uso y el estatus que se le dará a la subscripción para los servicios SPEI y SPID en el manejo de Cobros y Pagos El status puede tener los posibles valores: ACTIVE o INACTIVE. El uso puede tener los posibles valores: WITHDRAWAL_DEPOSIT o WITHDRAWAL o DEPOSIT
         * @summary Cambia el uso de la suscripción
         * @param {ServiceBanking} body request
         * @param {string} authorization Header para token
         * @param {string} subscription subscription
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeSubscriptionUseUsingPATCH(body, authorization, subscription, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling changeSubscriptionUseUsingPATCH.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling changeSubscriptionUseUsingPATCH.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling changeSubscriptionUseUsingPATCH.');
            }
            const localVarPath = `/subscriptions/{subscription}`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'PATCH' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("ServiceBanking" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Pre-registra una suscripción para operar un contrato a través de un aplicación socio de la plataforma. Se retorna una dirección URL hacia el centro de autorización donde el cliente  Monex debe autorizar el acceso a los datos de su cuenta a el socio.<br/><br/>Una vez que el cuentahabiente autorice el acceso, se envía una notificación (webhook configurado) con el evento 'ENROLLMENT.CREATED', el cuál contiene los datos de acceso a esta API.
         * @summary Pre-registro de una suscripción
         * @param {PreEnrollmentData} body Información para la pre-suscripción
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        preEnrollmentMonexUserUsingPOST(body, authorization, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling preEnrollmentMonexUserUsingPOST.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling preEnrollmentMonexUserUsingPOST.');
            }
            const localVarPath = `/subscriptions/pre-subscription`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("PreEnrollmentData" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Elimina una suscripción mediante su identificador. Una vez eliminada dicha suscripción, ya no se podrán realizar operaciones en el API utilizando sus credenciales
         * @summary Elimina suscripción por su identificador.
         * @param {string} authorization Header para token
         * @param {string} subscription El identificador de la suscripción a ésta API
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeEnrollmentUserUsingDELETE(authorization, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling removeEnrollmentUserUsingDELETE.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling removeEnrollmentUserUsingDELETE.');
            }
            const localVarPath = `/subscriptions/{subscription}`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Se elimina el pre-registro de suscripción. Sólo se elimina en caso de que el cliente Monex no haya concedido su autorización de acceso (token), es decir que la suscripcion esté pendiente.
         * @summary Elimina pre-registro de suscripción
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeSubscriptionPendingStatusUsingDELETE(authorization, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling removeSubscriptionPendingStatusUsingDELETE.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling removeSubscriptionPendingStatusUsingDELETE.');
            }
            const localVarPath = `/subscriptions/pre-subscription/{subscription}`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.SuscripcionesApiFetchParamCreator = SuscripcionesApiFetchParamCreator;
/**
 * SuscripcionesApi - functional programming interface
 * @export
 */
const SuscripcionesApiFp = function (configuration) {
    return {
        /**
         * Se cambia el estado o estatus de la suscripción a los posibles valores que son: ACTIVE o INACTIVE
         * @summary Cambia el estatus de la suscripción
         * @param {SubscriptionChangeStatusRequest} body request
         * @param {string} authorization Header para token
         * @param {string} subscription subscription
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeSubscriptionStatusUsingPUT(body, authorization, subscription, options) {
            const localVarFetchArgs = exports.SuscripcionesApiFetchParamCreator(configuration).changeSubscriptionStatusUsingPUT(body, authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Se asigna o cambia el uso y el estatus que se le dará a la subscripción para los servicios SPEI y SPID en el manejo de Cobros y Pagos El status puede tener los posibles valores: ACTIVE o INACTIVE. El uso puede tener los posibles valores: WITHDRAWAL_DEPOSIT o WITHDRAWAL o DEPOSIT
         * @summary Cambia el uso de la suscripción
         * @param {ServiceBanking} body request
         * @param {string} authorization Header para token
         * @param {string} subscription subscription
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeSubscriptionUseUsingPATCH(body, authorization, subscription, options) {
            const localVarFetchArgs = exports.SuscripcionesApiFetchParamCreator(configuration).changeSubscriptionUseUsingPATCH(body, authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Pre-registra una suscripción para operar un contrato a través de un aplicación socio de la plataforma. Se retorna una dirección URL hacia el centro de autorización donde el cliente  Monex debe autorizar el acceso a los datos de su cuenta a el socio.<br/><br/>Una vez que el cuentahabiente autorice el acceso, se envía una notificación (webhook configurado) con el evento 'ENROLLMENT.CREATED', el cuál contiene los datos de acceso a esta API.
         * @summary Pre-registro de una suscripción
         * @param {PreEnrollmentData} body Información para la pre-suscripción
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        preEnrollmentMonexUserUsingPOST(body, authorization, options) {
            const localVarFetchArgs = exports.SuscripcionesApiFetchParamCreator(configuration).preEnrollmentMonexUserUsingPOST(body, authorization, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Elimina una suscripción mediante su identificador. Una vez eliminada dicha suscripción, ya no se podrán realizar operaciones en el API utilizando sus credenciales
         * @summary Elimina suscripción por su identificador.
         * @param {string} authorization Header para token
         * @param {string} subscription El identificador de la suscripción a ésta API
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeEnrollmentUserUsingDELETE(authorization, subscription, options) {
            const localVarFetchArgs = exports.SuscripcionesApiFetchParamCreator(configuration).removeEnrollmentUserUsingDELETE(authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Se elimina el pre-registro de suscripción. Sólo se elimina en caso de que el cliente Monex no haya concedido su autorización de acceso (token), es decir que la suscripcion esté pendiente.
         * @summary Elimina pre-registro de suscripción
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeSubscriptionPendingStatusUsingDELETE(authorization, subscription, options) {
            const localVarFetchArgs = exports.SuscripcionesApiFetchParamCreator(configuration).removeSubscriptionPendingStatusUsingDELETE(authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.SuscripcionesApiFp = SuscripcionesApiFp;
/**
 * SuscripcionesApi - factory interface
 * @export
 */
const SuscripcionesApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Se cambia el estado o estatus de la suscripción a los posibles valores que son: ACTIVE o INACTIVE
         * @summary Cambia el estatus de la suscripción
         * @param {SubscriptionChangeStatusRequest} body request
         * @param {string} authorization Header para token
         * @param {string} subscription subscription
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeSubscriptionStatusUsingPUT(body, authorization, subscription, options) {
            return exports.SuscripcionesApiFp(configuration).changeSubscriptionStatusUsingPUT(body, authorization, subscription, options)(fetch, basePath);
        },
        /**
         * Se asigna o cambia el uso y el estatus que se le dará a la subscripción para los servicios SPEI y SPID en el manejo de Cobros y Pagos El status puede tener los posibles valores: ACTIVE o INACTIVE. El uso puede tener los posibles valores: WITHDRAWAL_DEPOSIT o WITHDRAWAL o DEPOSIT
         * @summary Cambia el uso de la suscripción
         * @param {ServiceBanking} body request
         * @param {string} authorization Header para token
         * @param {string} subscription subscription
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        changeSubscriptionUseUsingPATCH(body, authorization, subscription, options) {
            return exports.SuscripcionesApiFp(configuration).changeSubscriptionUseUsingPATCH(body, authorization, subscription, options)(fetch, basePath);
        },
        /**
         * Pre-registra una suscripción para operar un contrato a través de un aplicación socio de la plataforma. Se retorna una dirección URL hacia el centro de autorización donde el cliente  Monex debe autorizar el acceso a los datos de su cuenta a el socio.<br/><br/>Una vez que el cuentahabiente autorice el acceso, se envía una notificación (webhook configurado) con el evento 'ENROLLMENT.CREATED', el cuál contiene los datos de acceso a esta API.
         * @summary Pre-registro de una suscripción
         * @param {PreEnrollmentData} body Información para la pre-suscripción
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        preEnrollmentMonexUserUsingPOST(body, authorization, options) {
            return exports.SuscripcionesApiFp(configuration).preEnrollmentMonexUserUsingPOST(body, authorization, options)(fetch, basePath);
        },
        /**
         * Elimina una suscripción mediante su identificador. Una vez eliminada dicha suscripción, ya no se podrán realizar operaciones en el API utilizando sus credenciales
         * @summary Elimina suscripción por su identificador.
         * @param {string} authorization Header para token
         * @param {string} subscription El identificador de la suscripción a ésta API
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeEnrollmentUserUsingDELETE(authorization, subscription, options) {
            return exports.SuscripcionesApiFp(configuration).removeEnrollmentUserUsingDELETE(authorization, subscription, options)(fetch, basePath);
        },
        /**
         * Se elimina el pre-registro de suscripción. Sólo se elimina en caso de que el cliente Monex no haya concedido su autorización de acceso (token), es decir que la suscripcion esté pendiente.
         * @summary Elimina pre-registro de suscripción
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeSubscriptionPendingStatusUsingDELETE(authorization, subscription, options) {
            return exports.SuscripcionesApiFp(configuration).removeSubscriptionPendingStatusUsingDELETE(authorization, subscription, options)(fetch, basePath);
        },
    };
};
exports.SuscripcionesApiFactory = SuscripcionesApiFactory;
/**
 * SuscripcionesApi - object-oriented interface
 * @export
 * @class SuscripcionesApi
 * @extends {BaseAPI}
 */
class SuscripcionesApi extends BaseAPI {
    /**
     * Se cambia el estado o estatus de la suscripción a los posibles valores que son: ACTIVE o INACTIVE
     * @summary Cambia el estatus de la suscripción
     * @param {SubscriptionChangeStatusRequest} body request
     * @param {string} authorization Header para token
     * @param {string} subscription subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuscripcionesApi
     */
    changeSubscriptionStatusUsingPUT(body, authorization, subscription, options) {
        return exports.SuscripcionesApiFp(this.configuration).changeSubscriptionStatusUsingPUT(body, authorization, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Se asigna o cambia el uso y el estatus que se le dará a la subscripción para los servicios SPEI y SPID en el manejo de Cobros y Pagos El status puede tener los posibles valores: ACTIVE o INACTIVE. El uso puede tener los posibles valores: WITHDRAWAL_DEPOSIT o WITHDRAWAL o DEPOSIT
     * @summary Cambia el uso de la suscripción
     * @param {ServiceBanking} body request
     * @param {string} authorization Header para token
     * @param {string} subscription subscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuscripcionesApi
     */
    changeSubscriptionUseUsingPATCH(body, authorization, subscription, options) {
        return exports.SuscripcionesApiFp(this.configuration).changeSubscriptionUseUsingPATCH(body, authorization, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Pre-registra una suscripción para operar un contrato a través de un aplicación socio de la plataforma. Se retorna una dirección URL hacia el centro de autorización donde el cliente  Monex debe autorizar el acceso a los datos de su cuenta a el socio.<br/><br/>Una vez que el cuentahabiente autorice el acceso, se envía una notificación (webhook configurado) con el evento 'ENROLLMENT.CREATED', el cuál contiene los datos de acceso a esta API.
     * @summary Pre-registro de una suscripción
     * @param {PreEnrollmentData} body Información para la pre-suscripción
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuscripcionesApi
     */
    preEnrollmentMonexUserUsingPOST(body, authorization, options) {
        return exports.SuscripcionesApiFp(this.configuration).preEnrollmentMonexUserUsingPOST(body, authorization, options)(this.fetch, this.basePath);
    }
    /**
     * Elimina una suscripción mediante su identificador. Una vez eliminada dicha suscripción, ya no se podrán realizar operaciones en el API utilizando sus credenciales
     * @summary Elimina suscripción por su identificador.
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a ésta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuscripcionesApi
     */
    removeEnrollmentUserUsingDELETE(authorization, subscription, options) {
        return exports.SuscripcionesApiFp(this.configuration).removeEnrollmentUserUsingDELETE(authorization, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Se elimina el pre-registro de suscripción. Sólo se elimina en caso de que el cliente Monex no haya concedido su autorización de acceso (token), es decir que la suscripcion esté pendiente.
     * @summary Elimina pre-registro de suscripción
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuscripcionesApi
     */
    removeSubscriptionPendingStatusUsingDELETE(authorization, subscription, options) {
        return exports.SuscripcionesApiFp(this.configuration).removeSubscriptionPendingStatusUsingDELETE(authorization, subscription, options)(this.fetch, this.basePath);
    }
}
exports.SuscripcionesApi = SuscripcionesApi;
/**
 * TransferenciasSPEIApi - fetch parameter creator
 * @export
 */
const TransferenciasSPEIApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Agrupa transacciones SPEI/SPID en un mismo transaction_id, posteriormente genera la dirección URL del centro de autorización para la confirmación de las transacciones. <br><br>Las transacciones deben estar en estatus PENDING y pertenecer a un mismo contrato.
         * @summary Agrupa transacciones bajo un request_id
         * @param {AuthorizationTransactionGroup} body Objeto con la información para agrupar transacciones existentes y autorizarlas de forma conjunta.
         * @param {string} authorization Header para token
         * @param {string} subscription Es el Identificador de la suscripción.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAuthorizationTransactionsGroup(body, authorization, subscription, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling createAuthorizationTransactionsGroup.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling createAuthorizationTransactionsGroup.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling createAuthorizationTransactionsGroup.');
            }
            const localVarPath = `/subscriptions/{subscription}/transactions/group`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("AuthorizationTransactionGroup" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Elimina un conjunto de transferencias en estado pendiente de confirmar o autorizar, en la cuenta del cliente Monex relacionada a la suscripción.<br><br><b>Nota:</b> Las transferencias no deben haber sido confirmadas o autorizadas por el cliente.
         * @summary Eliminación de transferencias SPEI® pendientes
         * @param {string} authorization Header para token
         * @param {string} [orderId] Listado de identificadores dentro del request_id para eliminar.
         * @param {string} requestId Identificador de las transferencias a eliminar.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dropTransactionsPendingUsingDELETE(authorization, orderId, requestId, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling dropTransactionsPendingUsingDELETE.');
            }
            // verify required parameter 'requestId' is not null or undefined
            if (requestId === null || requestId === undefined) {
                throw new RequiredError('requestId', 'Required parameter requestId was null or undefined when calling dropTransactionsPendingUsingDELETE.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling dropTransactionsPendingUsingDELETE.');
            }
            const localVarPath = `/subscriptions/{subscription}/transactions/outcoming/spei/request/{requestId}`
                .replace(`{${"requestId"}}`, encodeURIComponent(String(requestId)))
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'DELETE' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (orderId !== undefined) {
                localVarQueryParameter['order_id'] = orderId;
            }
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Realiza una consulta de las transferencias recibidas (depósitos) en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias  recibidas durante el día en el que se realiza la consulta.
         * @summary Consulta de transferencias recibidas
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        incomingSpeiTransactionsReportUsingGET(authorization, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling incomingSpeiTransactionsReportUsingGET.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling incomingSpeiTransactionsReportUsingGET.');
            }
            const localVarPath = `/subscriptions/{subscription}/transactions/incoming/spei`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Consulta las transferencias de salida registradas en una petición, las transferencias que regresa este recuso son únicamente las transferencias de salida agrupadas al identificador de la petición que se generó al hacer el registro de las transacciones el cuál se debe especificar como parte del path de este endpoint.
         * @summary Consulta de transferencias de salida por identificador de petición
         * @param {string} authorization Header para token
         * @param {string} requestId Identificador de la petición a buscar.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        outCommingSpeiRequestIdTransactionsReportUsingGET(authorization, requestId, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling outCommingSpeiRequestIdTransactionsReportUsingGET.');
            }
            // verify required parameter 'requestId' is not null or undefined
            if (requestId === null || requestId === undefined) {
                throw new RequiredError('requestId', 'Required parameter requestId was null or undefined when calling outCommingSpeiRequestIdTransactionsReportUsingGET.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling outCommingSpeiRequestIdTransactionsReportUsingGET.');
            }
            const localVarPath = `/subscriptions/{subscription}/transactions/outcoming/spei/{requestId}`
                .replace(`{${"requestId"}}`, encodeURIComponent(String(requestId)))
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Consulta las transferencias realizadas en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias recibidas en el día en el que se realiza la consulta.<br>Se pueden realizar consultas por <strong>order_id</strong> al realizar este tipo de consultas no importa el día en el que se realizó la transferencia
         * @summary Consulta de transferencias realizadas
         * @param {string} authorization Header para token
         * @param {string} [orderId] Es el identificador de la orden a buscar.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        outgoingSpeiTransactionsReportUsingGET(authorization, orderId, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling outgoingSpeiTransactionsReportUsingGET.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling outgoingSpeiTransactionsReportUsingGET.');
            }
            const localVarPath = `/subscriptions/{subscription}/transactions/outcoming/spei`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (orderId !== undefined) {
                localVarQueryParameter['order_id'] = orderId;
            }
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Se registra un conjunto de transferencias (una o más) a realizar en la cuenta del cliente Monex relacionada a la suscripción. En la respuesta se proporcionará una dirección URL que lo llevará al centro de autorización para que las transferencias sean confirmadas (autorizadas) por el cliente para que se efectúen, para ello debe ingresar la llave electrónica (Token).
         * @summary Registro de transferencias
         * @param {TransactionsOutgoingRegister} body Información de las transferencias SPEI de salida
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerOutgoingSpeiTransactionUsingPOST(body, authorization, subscription, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling registerOutgoingSpeiTransactionUsingPOST.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling registerOutgoingSpeiTransactionUsingPOST.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling registerOutgoingSpeiTransactionUsingPOST.');
            }
            const localVarPath = `/subscriptions/{subscription}/transactions/outcoming/spei`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("TransactionsOutgoingRegister" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.TransferenciasSPEIApiFetchParamCreator = TransferenciasSPEIApiFetchParamCreator;
/**
 * TransferenciasSPEIApi - functional programming interface
 * @export
 */
const TransferenciasSPEIApiFp = function (configuration) {
    return {
        /**
         * Agrupa transacciones SPEI/SPID en un mismo transaction_id, posteriormente genera la dirección URL del centro de autorización para la confirmación de las transacciones. <br><br>Las transacciones deben estar en estatus PENDING y pertenecer a un mismo contrato.
         * @summary Agrupa transacciones bajo un request_id
         * @param {AuthorizationTransactionGroup} body Objeto con la información para agrupar transacciones existentes y autorizarlas de forma conjunta.
         * @param {string} authorization Header para token
         * @param {string} subscription Es el Identificador de la suscripción.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAuthorizationTransactionsGroup(body, authorization, subscription, options) {
            const localVarFetchArgs = exports.TransferenciasSPEIApiFetchParamCreator(configuration).createAuthorizationTransactionsGroup(body, authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Elimina un conjunto de transferencias en estado pendiente de confirmar o autorizar, en la cuenta del cliente Monex relacionada a la suscripción.<br><br><b>Nota:</b> Las transferencias no deben haber sido confirmadas o autorizadas por el cliente.
         * @summary Eliminación de transferencias SPEI® pendientes
         * @param {string} authorization Header para token
         * @param {string} [orderId] Listado de identificadores dentro del request_id para eliminar.
         * @param {string} requestId Identificador de las transferencias a eliminar.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dropTransactionsPendingUsingDELETE(authorization, orderId, requestId, subscription, options) {
            const localVarFetchArgs = exports.TransferenciasSPEIApiFetchParamCreator(configuration).dropTransactionsPendingUsingDELETE(authorization, orderId, requestId, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response;
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Realiza una consulta de las transferencias recibidas (depósitos) en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias  recibidas durante el día en el que se realiza la consulta.
         * @summary Consulta de transferencias recibidas
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        incomingSpeiTransactionsReportUsingGET(authorization, subscription, options) {
            const localVarFetchArgs = exports.TransferenciasSPEIApiFetchParamCreator(configuration).incomingSpeiTransactionsReportUsingGET(authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Consulta las transferencias de salida registradas en una petición, las transferencias que regresa este recuso son únicamente las transferencias de salida agrupadas al identificador de la petición que se generó al hacer el registro de las transacciones el cuál se debe especificar como parte del path de este endpoint.
         * @summary Consulta de transferencias de salida por identificador de petición
         * @param {string} authorization Header para token
         * @param {string} requestId Identificador de la petición a buscar.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        outCommingSpeiRequestIdTransactionsReportUsingGET(authorization, requestId, subscription, options) {
            const localVarFetchArgs = exports.TransferenciasSPEIApiFetchParamCreator(configuration).outCommingSpeiRequestIdTransactionsReportUsingGET(authorization, requestId, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Consulta las transferencias realizadas en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias recibidas en el día en el que se realiza la consulta.<br>Se pueden realizar consultas por <strong>order_id</strong> al realizar este tipo de consultas no importa el día en el que se realizó la transferencia
         * @summary Consulta de transferencias realizadas
         * @param {string} authorization Header para token
         * @param {string} [orderId] Es el identificador de la orden a buscar.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        outgoingSpeiTransactionsReportUsingGET(authorization, orderId, subscription, options) {
            const localVarFetchArgs = exports.TransferenciasSPEIApiFetchParamCreator(configuration).outgoingSpeiTransactionsReportUsingGET(authorization, orderId, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Se registra un conjunto de transferencias (una o más) a realizar en la cuenta del cliente Monex relacionada a la suscripción. En la respuesta se proporcionará una dirección URL que lo llevará al centro de autorización para que las transferencias sean confirmadas (autorizadas) por el cliente para que se efectúen, para ello debe ingresar la llave electrónica (Token).
         * @summary Registro de transferencias
         * @param {TransactionsOutgoingRegister} body Información de las transferencias SPEI de salida
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerOutgoingSpeiTransactionUsingPOST(body, authorization, subscription, options) {
            const localVarFetchArgs = exports.TransferenciasSPEIApiFetchParamCreator(configuration).registerOutgoingSpeiTransactionUsingPOST(body, authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.TransferenciasSPEIApiFp = TransferenciasSPEIApiFp;
/**
 * TransferenciasSPEIApi - factory interface
 * @export
 */
const TransferenciasSPEIApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Agrupa transacciones SPEI/SPID en un mismo transaction_id, posteriormente genera la dirección URL del centro de autorización para la confirmación de las transacciones. <br><br>Las transacciones deben estar en estatus PENDING y pertenecer a un mismo contrato.
         * @summary Agrupa transacciones bajo un request_id
         * @param {AuthorizationTransactionGroup} body Objeto con la información para agrupar transacciones existentes y autorizarlas de forma conjunta.
         * @param {string} authorization Header para token
         * @param {string} subscription Es el Identificador de la suscripción.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAuthorizationTransactionsGroup(body, authorization, subscription, options) {
            return exports.TransferenciasSPEIApiFp(configuration).createAuthorizationTransactionsGroup(body, authorization, subscription, options)(fetch, basePath);
        },
        /**
         * Elimina un conjunto de transferencias en estado pendiente de confirmar o autorizar, en la cuenta del cliente Monex relacionada a la suscripción.<br><br><b>Nota:</b> Las transferencias no deben haber sido confirmadas o autorizadas por el cliente.
         * @summary Eliminación de transferencias SPEI® pendientes
         * @param {string} authorization Header para token
         * @param {string} [orderId] Listado de identificadores dentro del request_id para eliminar.
         * @param {string} requestId Identificador de las transferencias a eliminar.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        dropTransactionsPendingUsingDELETE(authorization, orderId, requestId, subscription, options) {
            return exports.TransferenciasSPEIApiFp(configuration).dropTransactionsPendingUsingDELETE(authorization, orderId, requestId, subscription, options)(fetch, basePath);
        },
        /**
         * Realiza una consulta de las transferencias recibidas (depósitos) en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias  recibidas durante el día en el que se realiza la consulta.
         * @summary Consulta de transferencias recibidas
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        incomingSpeiTransactionsReportUsingGET(authorization, subscription, options) {
            return exports.TransferenciasSPEIApiFp(configuration).incomingSpeiTransactionsReportUsingGET(authorization, subscription, options)(fetch, basePath);
        },
        /**
         * Consulta las transferencias de salida registradas en una petición, las transferencias que regresa este recuso son únicamente las transferencias de salida agrupadas al identificador de la petición que se generó al hacer el registro de las transacciones el cuál se debe especificar como parte del path de este endpoint.
         * @summary Consulta de transferencias de salida por identificador de petición
         * @param {string} authorization Header para token
         * @param {string} requestId Identificador de la petición a buscar.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        outCommingSpeiRequestIdTransactionsReportUsingGET(authorization, requestId, subscription, options) {
            return exports.TransferenciasSPEIApiFp(configuration).outCommingSpeiRequestIdTransactionsReportUsingGET(authorization, requestId, subscription, options)(fetch, basePath);
        },
        /**
         * Consulta las transferencias realizadas en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias recibidas en el día en el que se realiza la consulta.<br>Se pueden realizar consultas por <strong>order_id</strong> al realizar este tipo de consultas no importa el día en el que se realizó la transferencia
         * @summary Consulta de transferencias realizadas
         * @param {string} authorization Header para token
         * @param {string} [orderId] Es el identificador de la orden a buscar.
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        outgoingSpeiTransactionsReportUsingGET(authorization, orderId, subscription, options) {
            return exports.TransferenciasSPEIApiFp(configuration).outgoingSpeiTransactionsReportUsingGET(authorization, orderId, subscription, options)(fetch, basePath);
        },
        /**
         * Se registra un conjunto de transferencias (una o más) a realizar en la cuenta del cliente Monex relacionada a la suscripción. En la respuesta se proporcionará una dirección URL que lo llevará al centro de autorización para que las transferencias sean confirmadas (autorizadas) por el cliente para que se efectúen, para ello debe ingresar la llave electrónica (Token).
         * @summary Registro de transferencias
         * @param {TransactionsOutgoingRegister} body Información de las transferencias SPEI de salida
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerOutgoingSpeiTransactionUsingPOST(body, authorization, subscription, options) {
            return exports.TransferenciasSPEIApiFp(configuration).registerOutgoingSpeiTransactionUsingPOST(body, authorization, subscription, options)(fetch, basePath);
        },
    };
};
exports.TransferenciasSPEIApiFactory = TransferenciasSPEIApiFactory;
/**
 * TransferenciasSPEIApi - object-oriented interface
 * @export
 * @class TransferenciasSPEIApi
 * @extends {BaseAPI}
 */
class TransferenciasSPEIApi extends BaseAPI {
    /**
     * Agrupa transacciones SPEI/SPID en un mismo transaction_id, posteriormente genera la dirección URL del centro de autorización para la confirmación de las transacciones. <br><br>Las transacciones deben estar en estatus PENDING y pertenecer a un mismo contrato.
     * @summary Agrupa transacciones bajo un request_id
     * @param {AuthorizationTransactionGroup} body Objeto con la información para agrupar transacciones existentes y autorizarlas de forma conjunta.
     * @param {string} authorization Header para token
     * @param {string} subscription Es el Identificador de la suscripción.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApi
     */
    createAuthorizationTransactionsGroup(body, authorization, subscription, options) {
        return exports.TransferenciasSPEIApiFp(this.configuration).createAuthorizationTransactionsGroup(body, authorization, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Elimina un conjunto de transferencias en estado pendiente de confirmar o autorizar, en la cuenta del cliente Monex relacionada a la suscripción.<br><br><b>Nota:</b> Las transferencias no deben haber sido confirmadas o autorizadas por el cliente.
     * @summary Eliminación de transferencias SPEI® pendientes
     * @param {string} authorization Header para token
     * @param {string} [orderId] Listado de identificadores dentro del request_id para eliminar.
     * @param {string} requestId Identificador de las transferencias a eliminar.
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApi
     */
    dropTransactionsPendingUsingDELETE(authorization, orderId, requestId, subscription, options) {
        return exports.TransferenciasSPEIApiFp(this.configuration).dropTransactionsPendingUsingDELETE(authorization, orderId, requestId, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Realiza una consulta de las transferencias recibidas (depósitos) en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias  recibidas durante el día en el que se realiza la consulta.
     * @summary Consulta de transferencias recibidas
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApi
     */
    incomingSpeiTransactionsReportUsingGET(authorization, subscription, options) {
        return exports.TransferenciasSPEIApiFp(this.configuration).incomingSpeiTransactionsReportUsingGET(authorization, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Consulta las transferencias de salida registradas en una petición, las transferencias que regresa este recuso son únicamente las transferencias de salida agrupadas al identificador de la petición que se generó al hacer el registro de las transacciones el cuál se debe especificar como parte del path de este endpoint.
     * @summary Consulta de transferencias de salida por identificador de petición
     * @param {string} authorization Header para token
     * @param {string} requestId Identificador de la petición a buscar.
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApi
     */
    outCommingSpeiRequestIdTransactionsReportUsingGET(authorization, requestId, subscription, options) {
        return exports.TransferenciasSPEIApiFp(this.configuration).outCommingSpeiRequestIdTransactionsReportUsingGET(authorization, requestId, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Consulta las transferencias realizadas en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias recibidas en el día en el que se realiza la consulta.<br>Se pueden realizar consultas por <strong>order_id</strong> al realizar este tipo de consultas no importa el día en el que se realizó la transferencia
     * @summary Consulta de transferencias realizadas
     * @param {string} authorization Header para token
     * @param {string} [orderId] Es el identificador de la orden a buscar.
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApi
     */
    outgoingSpeiTransactionsReportUsingGET(authorization, orderId, subscription, options) {
        return exports.TransferenciasSPEIApiFp(this.configuration).outgoingSpeiTransactionsReportUsingGET(authorization, orderId, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Se registra un conjunto de transferencias (una o más) a realizar en la cuenta del cliente Monex relacionada a la suscripción. En la respuesta se proporcionará una dirección URL que lo llevará al centro de autorización para que las transferencias sean confirmadas (autorizadas) por el cliente para que se efectúen, para ello debe ingresar la llave electrónica (Token).
     * @summary Registro de transferencias
     * @param {TransactionsOutgoingRegister} body Información de las transferencias SPEI de salida
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApi
     */
    registerOutgoingSpeiTransactionUsingPOST(body, authorization, subscription, options) {
        return exports.TransferenciasSPEIApiFp(this.configuration).registerOutgoingSpeiTransactionUsingPOST(body, authorization, subscription, options)(this.fetch, this.basePath);
    }
}
exports.TransferenciasSPEIApi = TransferenciasSPEIApi;
/**
 * TransferenciasSPIDApi - fetch parameter creator
 * @export
 */
const TransferenciasSPIDApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Obtiene las clasificaciones para operaciones con dólares (SPID®) de Monex.<br/><br/>Este recurso se debe invocar previo al realizar una operación SPID.<br/><br/>
         * @summary Consulta de clasificaciones para operaciones SPID®
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSpidClassificationsUsingGET(authorization, subscription, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling getSpidClassificationsUsingGET.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling getSpidClassificationsUsingGET.');
            }
            const localVarPath = `/subscriptions/{subscription}/beneficiaries/spid/classifications`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción. En la respuesta se proporcionará una dirección URL que lo llevará al centro de autorización para que las transferencias sean confirmadas (autorizadas) por el cliente para que se efectúen, para ello debe ingresar la llave electrónica (Token).
         * @summary Registro de transferencias SPID®
         * @param {TransactionOutgoingSpid} body Información de las transferencias SPID de salida
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerOutgoingSpidTransactionUsingPOST(body, authorization, subscription, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling registerOutgoingSpidTransactionUsingPOST.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling registerOutgoingSpidTransactionUsingPOST.');
            }
            // verify required parameter 'subscription' is not null or undefined
            if (subscription === null || subscription === undefined) {
                throw new RequiredError('subscription', 'Required parameter subscription was null or undefined when calling registerOutgoingSpidTransactionUsingPOST.');
            }
            const localVarPath = `/subscriptions/{subscription}/transactions/outcoming/spid`
                .replace(`{${"subscription"}}`, encodeURIComponent(String(subscription)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("TransactionOutgoingSpid" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.TransferenciasSPIDApiFetchParamCreator = TransferenciasSPIDApiFetchParamCreator;
/**
 * TransferenciasSPIDApi - functional programming interface
 * @export
 */
const TransferenciasSPIDApiFp = function (configuration) {
    return {
        /**
         * Obtiene las clasificaciones para operaciones con dólares (SPID®) de Monex.<br/><br/>Este recurso se debe invocar previo al realizar una operación SPID.<br/><br/>
         * @summary Consulta de clasificaciones para operaciones SPID®
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSpidClassificationsUsingGET(authorization, subscription, options) {
            const localVarFetchArgs = exports.TransferenciasSPIDApiFetchParamCreator(configuration).getSpidClassificationsUsingGET(authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción. En la respuesta se proporcionará una dirección URL que lo llevará al centro de autorización para que las transferencias sean confirmadas (autorizadas) por el cliente para que se efectúen, para ello debe ingresar la llave electrónica (Token).
         * @summary Registro de transferencias SPID®
         * @param {TransactionOutgoingSpid} body Información de las transferencias SPID de salida
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerOutgoingSpidTransactionUsingPOST(body, authorization, subscription, options) {
            const localVarFetchArgs = exports.TransferenciasSPIDApiFetchParamCreator(configuration).registerOutgoingSpidTransactionUsingPOST(body, authorization, subscription, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.TransferenciasSPIDApiFp = TransferenciasSPIDApiFp;
/**
 * TransferenciasSPIDApi - factory interface
 * @export
 */
const TransferenciasSPIDApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Obtiene las clasificaciones para operaciones con dólares (SPID®) de Monex.<br/><br/>Este recurso se debe invocar previo al realizar una operación SPID.<br/><br/>
         * @summary Consulta de clasificaciones para operaciones SPID®
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSpidClassificationsUsingGET(authorization, subscription, options) {
            return exports.TransferenciasSPIDApiFp(configuration).getSpidClassificationsUsingGET(authorization, subscription, options)(fetch, basePath);
        },
        /**
         * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción. En la respuesta se proporcionará una dirección URL que lo llevará al centro de autorización para que las transferencias sean confirmadas (autorizadas) por el cliente para que se efectúen, para ello debe ingresar la llave electrónica (Token).
         * @summary Registro de transferencias SPID®
         * @param {TransactionOutgoingSpid} body Información de las transferencias SPID de salida
         * @param {string} authorization Header para token
         * @param {string} subscription Es el identificador de la suscripción a esta API.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerOutgoingSpidTransactionUsingPOST(body, authorization, subscription, options) {
            return exports.TransferenciasSPIDApiFp(configuration).registerOutgoingSpidTransactionUsingPOST(body, authorization, subscription, options)(fetch, basePath);
        },
    };
};
exports.TransferenciasSPIDApiFactory = TransferenciasSPIDApiFactory;
/**
 * TransferenciasSPIDApi - object-oriented interface
 * @export
 * @class TransferenciasSPIDApi
 * @extends {BaseAPI}
 */
class TransferenciasSPIDApi extends BaseAPI {
    /**
     * Obtiene las clasificaciones para operaciones con dólares (SPID®) de Monex.<br/><br/>Este recurso se debe invocar previo al realizar una operación SPID.<br/><br/>
     * @summary Consulta de clasificaciones para operaciones SPID®
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPIDApi
     */
    getSpidClassificationsUsingGET(authorization, subscription, options) {
        return exports.TransferenciasSPIDApiFp(this.configuration).getSpidClassificationsUsingGET(authorization, subscription, options)(this.fetch, this.basePath);
    }
    /**
     * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción. En la respuesta se proporcionará una dirección URL que lo llevará al centro de autorización para que las transferencias sean confirmadas (autorizadas) por el cliente para que se efectúen, para ello debe ingresar la llave electrónica (Token).
     * @summary Registro de transferencias SPID®
     * @param {TransactionOutgoingSpid} body Información de las transferencias SPID de salida
     * @param {string} authorization Header para token
     * @param {string} subscription Es el identificador de la suscripción a esta API.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPIDApi
     */
    registerOutgoingSpidTransactionUsingPOST(body, authorization, subscription, options) {
        return exports.TransferenciasSPIDApiFp(this.configuration).registerOutgoingSpidTransactionUsingPOST(body, authorization, subscription, options)(this.fetch, this.basePath);
    }
}
exports.TransferenciasSPIDApi = TransferenciasSPIDApi;
/**
 * WebhooksApi - fetch parameter creator
 * @export
 */
const WebhooksApiFetchParamCreator = function (configuration) {
    return {
        /**
         * Obtiene un webhook registrado en la plataforma mediante su identificador.
         * @summary Consulta de Webhook
         * @param {string} authorization Header para token
         * @param {string} webhookId Es el identificador del webhook. Ejemplo: wh_54a932866f784b439bc625c0f4e04e12
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWebhook(authorization, webhookId, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling getWebhook.');
            }
            // verify required parameter 'webhookId' is not null or undefined
            if (webhookId === null || webhookId === undefined) {
                throw new RequiredError('webhookId', 'Required parameter webhookId was null or undefined when calling getWebhook.');
            }
            const localVarPath = `/webhooks/{id}`
                .replace(`{${"webhook_id"}}`, encodeURIComponent(String(webhookId)));
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Obtiene una lista de los webhooks registrados en la plataforma que tengan el estado (estatus)  Activo (ACTIVE) e Inactivo (INACTIVE).
         * @summary Consulta la lista de Webhooks
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWebhooks(authorization, options = {}) {
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling getWebhooks.');
            }
            const localVarPath = `/webhooks`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * Registra un webhook en la plataforma para su uso como notificador de eventos, cuándo estos ocurran.
         * @summary Alta de Webhook
         * @param {WebhookRequest} body Información para registrar un Webhook
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerWebhook(body, authorization, options = {}) {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body', 'Required parameter body was null or undefined when calling registerWebhook.');
            }
            // verify required parameter 'authorization' is not null or undefined
            if (authorization === null || authorization === undefined) {
                throw new RequiredError('authorization', 'Required parameter authorization was null or undefined when calling registerWebhook.');
            }
            const localVarPath = `/webhooks`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'POST' }, options);
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (authorization !== undefined && authorization !== null) {
                localVarHeaderParameter['Authorization'] = String(authorization);
            }
            localVarHeaderParameter['Content-Type'] = 'application/json';
            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);
            const needsSerialization = ("WebhookRequest" !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.body = needsSerialization ? JSON.stringify(body || {}) : (body || "");
            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
exports.WebhooksApiFetchParamCreator = WebhooksApiFetchParamCreator;
/**
 * WebhooksApi - functional programming interface
 * @export
 */
const WebhooksApiFp = function (configuration) {
    return {
        /**
         * Obtiene un webhook registrado en la plataforma mediante su identificador.
         * @summary Consulta de Webhook
         * @param {string} authorization Header para token
         * @param {string} webhookId Es el identificador del webhook. Ejemplo: wh_54a932866f784b439bc625c0f4e04e12
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWebhook(authorization, webhookId, options) {
            const localVarFetchArgs = exports.WebhooksApiFetchParamCreator(configuration).getWebhook(authorization, webhookId, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Obtiene una lista de los webhooks registrados en la plataforma que tengan el estado (estatus)  Activo (ACTIVE) e Inactivo (INACTIVE).
         * @summary Consulta la lista de Webhooks
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWebhooks(authorization, options) {
            const localVarFetchArgs = exports.WebhooksApiFetchParamCreator(configuration).getWebhooks(authorization, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
        /**
         * Registra un webhook en la plataforma para su uso como notificador de eventos, cuándo estos ocurran.
         * @summary Alta de Webhook
         * @param {WebhookRequest} body Información para registrar un Webhook
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerWebhook(body, authorization, options) {
            const localVarFetchArgs = exports.WebhooksApiFetchParamCreator(configuration).registerWebhook(body, authorization, options);
            return (fetch = portableFetch, basePath = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    }
                    else {
                        throw response;
                    }
                });
            };
        },
    };
};
exports.WebhooksApiFp = WebhooksApiFp;
/**
 * WebhooksApi - factory interface
 * @export
 */
const WebhooksApiFactory = function (configuration, fetch, basePath) {
    return {
        /**
         * Obtiene un webhook registrado en la plataforma mediante su identificador.
         * @summary Consulta de Webhook
         * @param {string} authorization Header para token
         * @param {string} webhookId Es el identificador del webhook. Ejemplo: wh_54a932866f784b439bc625c0f4e04e12
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWebhook(authorization, webhookId, options) {
            return exports.WebhooksApiFp(configuration).getWebhook(authorization, webhookId, options)(fetch, basePath);
        },
        /**
         * Obtiene una lista de los webhooks registrados en la plataforma que tengan el estado (estatus)  Activo (ACTIVE) e Inactivo (INACTIVE).
         * @summary Consulta la lista de Webhooks
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWebhooks(authorization, options) {
            return exports.WebhooksApiFp(configuration).getWebhooks(authorization, options)(fetch, basePath);
        },
        /**
         * Registra un webhook en la plataforma para su uso como notificador de eventos, cuándo estos ocurran.
         * @summary Alta de Webhook
         * @param {WebhookRequest} body Información para registrar un Webhook
         * @param {string} authorization Header para token
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        registerWebhook(body, authorization, options) {
            return exports.WebhooksApiFp(configuration).registerWebhook(body, authorization, options)(fetch, basePath);
        },
    };
};
exports.WebhooksApiFactory = WebhooksApiFactory;
/**
 * WebhooksApi - object-oriented interface
 * @export
 * @class WebhooksApi
 * @extends {BaseAPI}
 */
class WebhooksApi extends BaseAPI {
    /**
     * Obtiene un webhook registrado en la plataforma mediante su identificador.
     * @summary Consulta de Webhook
     * @param {string} authorization Header para token
     * @param {string} webhookId Es el identificador del webhook. Ejemplo: wh_54a932866f784b439bc625c0f4e04e12
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApi
     */
    getWebhook(authorization, webhookId, options) {
        return exports.WebhooksApiFp(this.configuration).getWebhook(authorization, webhookId, options)(this.fetch, this.basePath);
    }
    /**
     * Obtiene una lista de los webhooks registrados en la plataforma que tengan el estado (estatus)  Activo (ACTIVE) e Inactivo (INACTIVE).
     * @summary Consulta la lista de Webhooks
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApi
     */
    getWebhooks(authorization, options) {
        return exports.WebhooksApiFp(this.configuration).getWebhooks(authorization, options)(this.fetch, this.basePath);
    }
    /**
     * Registra un webhook en la plataforma para su uso como notificador de eventos, cuándo estos ocurran.
     * @summary Alta de Webhook
     * @param {WebhookRequest} body Información para registrar un Webhook
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApi
     */
    registerWebhook(body, authorization, options) {
        return exports.WebhooksApiFp(this.configuration).registerWebhook(body, authorization, options)(this.fetch, this.basePath);
    }
}
exports.WebhooksApi = WebhooksApi;

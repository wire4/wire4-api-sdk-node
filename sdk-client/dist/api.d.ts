/**
 * Wire4RestAPI
 *  # Referencia de API La API de Wire4 está organizada en torno a REST. Nuestra API tiene URLs predecibles orientadas a los recursos, acepta peticiones en formato JSON, y las respuestas devueltas son formato JSON y utiliza códigos de respuesta HTTP, autenticación y verbos estándares.  Puede usar la API de Wire4 en nuestro entorno de prueba, que no afecta sus productivos ni interactúa con la red bancaria. La URL de conexión que se usa para invocar los servicios determina si la solicitud es en modo en de prueba o en modo producción.    # Autenticación La API de Wire4 utiliza el protocolo OAuth 2.0 para autenticación y autorización.   Para comenzar, es necesario que registre una cuenta en nuestro ambiente de pruebas en [registro](https://app-sndbx.wire4.mx/#/register) y obtenga las credenciales de cliente OAuth 2.0 desde la [consola de administración](https://app-sndbx.wire4.mx/#/dashboard/api-keys).   Esta página ofrece una descripción general de los escenarios de autorización de OAuth 2.0 que admite Wire4.   Después de crear su aplicación con Wire4, asegúrese de tener a la mano su `client_id` y `client_secret`. El siguiente paso es descubrir qué flujo de OAuth2 es el adecuado para sus propósitos.   ## URLS La siguiente tabla muestra las urls de los recursos de autenticación para el ambiente de pruebas.  URL                  | Descripción ------------------------------------ | ------------- https://sandbox-api.wire4.mx/token   | Obtener token de autorización llaves de API (*client_id*, *client_secret*), datos de suscripción (*client_id*, *client_secret*, *user_key*, *user_secret*) o (*refresh_token*) https://sandbox-api.wire4.mx/revoke  | Revocación de token  **Nota:** De acuerdo con el RFC 6749, la URL del token sólo acepta el tipo de contenido x-www-form-urlencoded. El contenido JSON no está permitido y devolverá un error.  ## Scopes Los `scopes` limitan el acceso de una aplicación a los recursos de Wire4. Se ofrecen los siguientes scopes de acuerdo al producto:  Producto                             |Scope                      | Descripción -------------------------------------|------------------------------------ | ------------- SPEI-SPID                            |general                              | Permite llamar a operaciones que no requieren a un cliente Monex suscrito en Wire4, los recursos que se pueden consumir con este scope son: consulta de Instituciones, CEP y generación de una presuscripción. SPEI-SPID                            |spei_admin                           | Permite llamar a operaciones que requieren de un cliente Monex suscrito en Wire4, ya que se proporciona información de saldos, administración de transacciones, cuentas de beneficiarios y cuentas de depositantes. SPEI-SPID                            |spid_admin                           | Permite llamar sólo a operaciones SPID, se requiere de un cliente Monex suscrito en Wire4. CODI                                 |codi_general                         | Permite llamar a operaciones de administración sobre el producto CoDi, como creación y listado de empresas  CODI                                 |codi_admin                           | Permite llamar sólo a operaciones CoDi dentro de un punto de venta, las operaciones incluyen creación, consulta, listado, etc de peticiones de pago CODI                                 |codi_report                          | Permite generar reportes de operaciones CoDi. TODOS                                |device_[dispositivo]                 | Se debe especificar cuando se gestionan token's desde distintos dispositivos.  ## Tipos de autenticación   Wire4 cuenta con dos tipos de autenticación: Autenticación de Aplicación (OAuth 2.0  Client Credentials Grant)  y Autenticación de Usuario de Aplicación (OAuth 2.0 Password Grant).  ### Autenticación de Aplicación  Esta autenticación se obtiene proporcionando únicamente las llaves de API las cuales se pueden consultar en [Llaves de API](https://app-sndbx.wire4.mx/#/dashboard/api-keys) de la consola de administración.  La autenticación de aplicación permite accesso a recursos generales y de administración que dependeran del scope.  Para este tipo de autenticación se sigue el flujo OAuth 2.0 Client Credentials Grant, que se describe más adelante en **Obtener el token de acceso de aplicación**, algunos de los recursos que requieren este tipo de autenticación son:   * [/subscriptions/pre-subscription](link) * [/institutions](link>) * [/ceps](<link>) * [/codi/compaies](<link>)  ### Autenticación de Usuario de Aplicación  Esta autenticación se obtiene proporcionando las llaves de API las cuales se pueden consultar en [Llaves de API](https://app-sndbx.wire4.mx/#/dashboard/api-keys) más el ***user_key*** y ***user_secret*** que se proporcionan al momento de crear una suscripción o un punto de venta, para más información puedes consultar las guías [creación de suscripción](https://www.wire4.mx/#/guides/subscriptions), [creación de punto de venta](https://www.wire4.mx/#/guides/salespoint).  Con este tipo de autenticación se puede acceder a los recursos especificos que requieren configuraciones y acceso mas puntual como información de una cuentas, saldos y administración de transacciones SPEID-SPID o CODI.    ## Obtener token de acceso Antes de que su aplicación pueda acceder a los datos mediante la API de Wire4, debe obtener un token de acceso ***(access_token)*** que le otorgue acceso a la API. En las siguientes secciones se muestra como obtener un token para cada una de las autenticaciones.     ### Obtener el token de acceso para autenticación de aplicación  El primer paso es crear la solicitud de token de acceso (*access_token*), con los parámetros que identifican su aplicación, el siguiente código muestra cómo obtener un `token`.  ``` curl -k -d \"grant_type= client_credentials&scope=general\"  -u \"<client id>:<client secret>\" https://sandbox-api.wire4.mx/token ``` **Ejemplo:**   ``` curl -k -d \"grant_type=client_credentials&scope=general\"  -u \"8e59YqaFW_Yo5dwWNxEY8Lid0u0a:AXahn79hfKWBXKzQfj011x8cvcQa\"  https://sandbox-api.wire4.mx /token ``` Obtendrá una respuesta como la que se muestra  a continuación, donde se debe obtener el *access_token* para realizar llamadas posteriores a la API.   ``` {     \"access_token\":\"eyJ4NXQiOiJZak5sWVdWa05tWmlNR1ZoTldSaU1EUXpaREJpWlRJNU1qYzFZV1ZoWWpneU5UYzJPV05sWVEiLCJraWQiOiJZak5sWVdWa05tWmlNR1ZoTldSaU1EUXpaREJpWlRJNU1qYzFZV1ZoWWpneU5UYzJPV05sWVEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpc21hZWwuZXNjYW1pbGxhQHRjcGlwLnRlY2hAc2FuZGJveC5zcGVpb2suY29tIiwiYXVkIjoiOGU1OVlxYUZXX1lvNWR3V054RVk4TGlkMHUwYSIsIm5iZiI6MTU3MTMyMDg3NywiYXpwIjoiOGU1OVlxYUZXX1lvNWR3V054RVk4TGlkMHUwYSIsInNjb3BlIjoiYW1fYXBwbGljYXRpb25fc2NvcGUgZ2VuZXJhbCIsImlzcyI6ImFwaW0taWRwIiwiZXhwIjoxNTcxMzI0NDc3LCJpYXQiOjE1NzEzMjA4NzcsImp0aSI6ImJkMTdjMjcyLTg4MGQtNDk0ZS1iMTMwLTBiYTkwMjYyN2M4NCJ9.AjngGylkd_Chs5zlIjyLRPu9xPGyz4dfCd_aax2_ts653xrnNMoLpVHUDmaxIDFF2XyBJKH2IAbKxjo6VsFM07QkoPhlysO1PLoAF-Vkt4xYkh-f7nJRl0oOe2utDWFlUdgiAOmx5tPcStrdCEftgNNrjwJ50LXysFjXVshpoST-zIJPLgXknM3esGrkAsLcZRM7XUB187jxLHbtefVYPMvSO31T9pd5_Co9UXdeHpuA98sk_wZknASM1phxXQZAMLRLHz3LYvjCWCr_v80oVCM9SWTzf0vrMI6xphoIfirfWloADKPTTSUpIGBw9ePF_WbEPvbMm_BZaApJcEH2w\",    \"scope\":\"am_application_scope general\",    \"token_type\":\"Bearer\",    \"expires_in\":3600 }  ```  Es posible generar tokens con mas de un scope, en caso que sea necesario utilizar dicho token para hacer mas de una operación. Para generarlo basta con agregarlo a la petición separado por un espacio.     ``` curl -k -d \"grant_type=client_credentials&scope=codi_general codi_report\"  -u \"8e59YqaFW_Yo5dwWNxEY8Lid0u0a:AXahn79hfKWBXKzQfj011x8cvcQa\"  https://sandbox-api.wire4.mx /token ```  ### Obtener el token de acceso para autenticación usuario de aplicación   Antes de que su aplicación pueda acceder a los datos de una cuenta Monex mediante la API de Wire4, debe obtener un token de acceso  (*access_token*) que le otorgue acceso a la API y contar con el  *user_key* y *user_secret* que se proporcionan al momento de crear  una suscripción para más información puedes consultar [creación de suscripción](https://wire4.mx/#/guides/subscriptions) .   El primer paso es crear la solicitud de token de acceso con los parámetros que identifican su aplicación y la suscripción y con `scope` `spei_admin`  ```   curl -k -d \"grant_type=password&scope=spei_admin&username=<user_key>&password=<user_secret>\"  -u \"<client_id>:<client_secret>\" https://sandbox-api.wire4.mx/token ``` **Ejemplo**  ``` curl -k -d \"grant_type=password&scope=spei_admin&username=6 nbC5e99tTO@sandbox.wire4com&password= Nz7IqJGe9h\" -u \" zgMlQbqmOr:plkMJoPXCI\" https://sandbox-api.wire4.mx /token  ```  ``` {     \"access_token\":\"eyJ4NXQiOiJPR1EyTURFM00yTmpObVZoTnpFeE5EWXlObUV4TURKa01qUTJaVEU0TWpGaE1tVmlZakV5TkEiLCJraWQiOiJPR1EyTURFM00yTmpObVZoTnpFeE5EWXlObUV4TURKa01qUTJaVEU0TWpGaE1tVmlZakV5TkEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzMzE0ODRlZTdjZDRkYWU5MzRmMjY2Zjc5YmY1YWFAZGV2LWllc2NhbWlsbGEuc3BlaW9rLmNvbSIsImF1ZCI6IkJVR0xjNWw1bW5CZXlPeGxtamNUZ0JoS19WTWEiLCJuYmYiOjE1NzEzNDk4ODMsImF6cCI6IkJVR0xjNWw1bW5CZXlPeGxtamNUZ0JoS19WTWEiLCJzY29wZSI6InNwZWlfYWRtaW4iLCJpc3MiOiJhcGltLWlkcCIsImV4cCI6MTU3MTM1MzQ4MywiaWF0IjoxNTcxMzQ5ODgzLCJqdGkiOiJiOWQ1M2Q0MC0xN2MwLTQxOTItYjUwNy0wZWFhN2ZkNDA1MGYifQ.hLTk8AFoIce1GpLcgch-U5aLLgiiFTo49wfBErD8D6VF-H9sG13ZyfAx9T-vQkk2m1zPapYVQjwibz3GRAJMN0Vczs6flV1mUJwFDQbEE-AELPdRcaRFOMBCfF6H9TVLfhFsGb9U2pVR9TLJcKqR57DyO_dIcc9I6d0tIkxqn2VcqypLVi5YQf36WzBbPeG-iPHYpMA-bhr4rwfjKA-O6jm1NSSxNHF4sHS0YHDPoO_x6cCc677MQEe0_CozfnQhoEWNfG8tcWUqhPtmcfjqon1p7PdQoXxriq_R85d06pVO9Se7Q6ok0V8Qgz0MOJ6z3ku6mtZSuba7niMAOt2TyA\",    \"refresh_token\":\"f962d5c6-0d99-3809-8275-11c7aa0aa020\",    \"scope\":\"spei_admin\",    \"token_type\":\"Bearer\",    \"expires_in\":3600 } ```  **Nota:** Los ejemplos anteriores se presentan considerando que se realiza una implementación desde cero,  esto se puede simplificar a sólo configurar sus llaves (*client_id*, *client_secret*),  datos de suscripción (*client_id*, *client_secret*, *user_key*, *user_secret*) si utiliza nuestros sdks.      **Consideraci&oacute;n:** Si la aplicaci&oacute;n en la que implementar&aacute; Wire4 estar&aacute; desplegada en mas de una instancia o servidor en cada solicitud de token debe especificar un scope adicional. La forma de hacer esto es que cuando se solicita un token se debe especificar un scope adicional con el prefijo \"device_\" +  el dispositivo, por ejemplo:                                                                                                                                                                                                                     device_server1<br> device_server2  en consecuencia cada instancia debe operar con el token gestionado. ***Si se opera con el mismo token en instancias diferentes encontrará problemas de Credenciales Inv&aacute;lidas.***  **Ejemplo de solicitud de token para instancias diferentes:**  ``` curl -k -d \"grant_type=password&username=0883b97333046abb76367698b57d9e@sandbox.wire4.mx&password=9e0d81f95705079b9fe1e129315c25&scope=device_server1 codi_admin\" -H \"Authorization: Basic dmZSeURpTHdFbVZqd2VIclp0OWRMbXFmb3YwYTpJQJBuamBac3V6SllLWlJHUkJEYUZrN1BhRmNh\" https://sandbox-api.wire4.mx/token  curl -k -d \"grant_type=password&username=0883b97333046abb76367698b57d9e@sandbox.wire4.mx&password=9e0d81f95705079b9fe1e129315c25&scope=device_server2 codi_admin\" -H \"Authorization: Basic dmZSeURpTHdFbVZqd2VIclp0OWRMbXFmb3YwYTpJQJBuamBac3V6SllLWlJHUkJEYUZrN1BhRmNh\" https://sandbox-api.wire4.mx/token ```  ## Caducidad del token El token de acceso es válido durante 60 minutos (una hora), después de transcurrido este tiempo se debe solicitar un nuevo token,  cuando el token caduca se obtendrá un error ***401 Unauthorized*** con mensaje ***“Invalid Credentials”.***   El nuevo token se puede solicitar  utilizando el último token de actualización (***refresh_token***) que se devolvió en la solicitud del token,   esto sólo aplica para el token de tipo password (Autenticación de Usuario de Aplicación). El siguiente ejemplo muestra cómo obtener un toke con el token de actualización.  ``` curl -k -d \"grant_type=refresh_token&refresh_token=<refresh_token>\" -u \" Client_Id:Client_Secret\" -H \"Content-Type: application/x-www-form-urlencoded\" https://sandbox-api.wire4.mx/oauth2/token ```  **Ejemplo:**  ``` curl -k -d \"grant_type=refresh_token&refresh_token=f932d5c6-0d39-3809-8275-11c7ax0aa020\" -u \"zgMlQbqmOr:plkMJoPXCI\" -H \"Content-Type: application/x-www-form-urlencoded\" https://sandbox-api.wire4.mx/token ```  El token de actualización (***refresh_token***) tiene una duración de hasta 23 horas. Si en este periodo no se utiliza, se tienen que solicitar un nuevo token.  Un token de acceso podría dejar de funcionar por uno de estos motivos:  * El usuario ha revocado el acceso a su aplicación, si un usuario ha solicitado la baja de su aplicación de WIre4. * El token de acceso ha caducado: si el token de acceso ha pasado de una hora, recibirá un error ***401 Unauthorized*** mientras realiza una llamada a la API de Wire4. Cuando esto sucede, debe solicitar un nuevo token utilizando el token de actualización que recibió por última al solicitar un token, sólo aplica si el token en cuestión es de autenticación de usuario de aplicación, en caso contrario solicitar un nuevo token.   ## Revocar token Su aplicación puede revocar mediante programación el token de acceso, una vez revocado el token no podrá hacer uso de él para acceder a la API. El siguiente código muestra un ejemplo de cómo revocar el token:    ```  curl -X POST --basic -u \"<client id>:<client secret>\" -H \"Content-Type: application/x-www-form-urlencoded;charset=UTF-8\" -k -d \"token=<token to revoke>&token_type_hint=access_token\" https://sandbox-api.wire4.mx/revoke ```      **Ejemplo:**  ```   curl -X POST --basic -u \"8e59YqaFW_Yo5dwWNxEY8Lid0u0a:AXahn79hfKWBXKzQfj011x8cvcQa\" -H \"Content-Type: application/x-www-form-urlencoded;charset=UTF-8\" -k -d \"token=eyJ4NXQiOiJZak5sWVdWa05tWmlNR1ZoTldSaU1EUXpaREJpWlRJNU1qYzFZV1ZoWWpneU5UYzJPV05sWVEiLCJraWQiOiJZak5sWVdWa05tWmlNR1ZoTldSaU1EUXpaREJpWlRJNU1qYzFZV1ZoWWpneU5UYzJPV05sWVEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpc21hZWwuZXNjYW1pbGxhQHRjcGlwLnRlY2hAc2FuZGJveC5zcGVpb2suY29tIiwiYXVkIjoiOGU1OVlxYUZXX1lvNWR3V054RVk4TGlkMHUwYSIsIm5iZiI6MTU3MTMyMDg3NywiYXpwIjoiOGU1OVlxYUZXX1lvNWR3V054RVk4TGlkMHUwYSIsInNjb3BlIjoiYW1fYXBwbGljYXRpb25fc2NvcGUgZ2VuZXJhbCIsImlzcyI6ImFwaW0taWRwIiwiZXhwIjoxNTcxMzI0NDc3LCJpYXQiOjE1NzEzMjA4NzcsImp0aSI6ImJkMTdjMjcyLTg4MGQtNDk0ZS1iMTMwLTBiYTkwMjYyN2M4NCJ9.AjngGylkd_Chs5zlIjyLRPu9xPGyz4dfCd_aax2_ts653xrnNMoLpVHUDmaxIDFF2XyBJKH2IAbKxjo6VsFM07QkoPhlysO1PLoAF-Vkt4xYkh-f7nJRl0oOe2utDWFlUdgiAOmx5tPcStrdCEftgNNrjwJ50LXysFjXVshpoST-zIJPLgXknM3esGrkAsLcZRM7XUB187jxLHbtefVYPMvSO31T9pd5_Co9UXdeHpuA98sk_wZknASM1phxXQZAMLRLHz3LYvjCWCr_v80oVCM9SWTzf0vrMI6xphoIfirfWloADKPTTSUpIGBw9ePF_WbEPvbMm_BZaApJcEH2w&token_type_hint=access_token\"  https://sandbox-api.wire4.mx/revoke ```  # Ambientes  Wire4 cuentas con dos ambientes Pruebas (Sandbox) y Producción, son dos ambientes separados los cuales se pueden utilizar simultáneamente. Los usuarios que han sido creados en cada uno de los ambientes no son intercambiables.   Las ligas de acceso a la `api` para cada uno de los ambientes son:  * Pruebas  https://sandbox-api.wire4.mx * Producción https://api.wire4.mx     # Eventos  Los eventos son nuestra forma de informarle cuando algo  sucede en su cuenta. Cuando ocurre un evento se crea un objeto  [Evento](#tag/Webhook-Message). Por ejemplo, cuando se recibe un depósito, se crea un evento TRANSACTION.INCOMING.UPDATED.   Los eventos ocurren cuando cambia el estado de un recurso. El recurso se encuentra dentro del objeto [Evento](#tag/Webhook-Message) en el campo data.  Por ejemplo, un evento TRANSACTION.INCOMING.UPDATED contendrá un depósito y un evento ACCOUNT.CREATED contendrá una cuenta.   Wire4 puede agregar más campos en un futuro, o agregar nuevos valores a campos existentes, por lo que es recomendado que tu endpoint pueda manejar datos adicionales desconocidos. En esta [liga](#tag/Webhook-Message) se encuentra  la definición del objeto [Evento](#tag/Webhook-Message).  ## Tipos de Eventos  Wire4 cuenta con los siguientes tipos de eventos*   | Evento                     | Tipo                               | Objeto                                        | | -------------------------- |----------------------------------- | --------------------------------------------- | | Suscripción                | ENROLLMENT.CREATED                 | [suscription](#tag/subscription)              | | Cuenta de beneficiario     | ACCOUNT.CREATED                    | [beneficiary](#tag/BeneficiaryAccount)           | | Depósito recibido          | TRANSACTION.INCOMING.UPDATED       | [spei_incoming](#tag/deposit)                 | | Transferencia realizada    | TRANSACTION.OUTGOING.RECEIVED      | [spei_outgoing](#tag/transfer)                | | Transferencia SPID enviada | TRANSACTION.OUTGOING.SPID.RECEIVED | [spid_outgoing](#tag/transfer)                | | Transferencias Autorizadas | REQUEST.OUTGOING.CHANGED           | [request_outgoing](#tag/requestOutMsg)        | | Operación CoDi             | CODI.ACTIONS                       |[codi_actions](#tag/codiActions)               | | Punto de venta CoDi        | SALE.POINT.CREATED                 |[codi_sales_point](#tag/codiSalesPoint)        |
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */
/// <reference path="../custom.d.ts" />
import { Configuration } from "./configuration";
/**
 *
 * @export
 */
export declare const COLLECTION_FORMATS: {
    csv: string;
    ssv: string;
    tsv: string;
    pipes: string;
};
/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init: any): Promise<Response>;
}
/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}
/**
 *
 * @export
 * @class BaseAPI
 */
export declare class BaseAPI {
    protected basePath: string;
    protected fetch: FetchAPI;
    protected configuration: Configuration;
    constructor(configuration: Configuration, basePath?: string, fetch?: FetchAPI);
}
/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export declare class RequiredError extends Error {
    field: string;
    name: "RequiredError";
    constructor(field: string, msg: string);
}
/**
 * Objeto que contiene información de la cuenta
 * @export
 * @interface Account
 */
export interface Account {
    /**
     * Monto límite permitido registrado para la cuenta
     * @type {number}
     * @memberof Account
     */
    amountLimit: number;
    /**
     * Clave del banco, es requerido en caso de que la cuenta del beneficiario sea un número de celular
     * @type {string}
     * @memberof Account
     */
    bankKey: string;
    /**
     * Cuenta del beneficiario, podría ser teléfono celular, TDD o cuenta CLABE
     * @type {string}
     * @memberof Account
     */
    beneficiaryAccount: string;
    /**
     * Lista de email's, este dato es opcional
     * @type {Array<string>}
     * @memberof Account
     */
    email: Array<string>;
    /**
     *
     * @type {BeneficiaryInstitution}
     * @memberof Account
     */
    institution: BeneficiaryInstitution;
    /**
     * Tipo de relación con el propietario de la cuenta, para registrar una cuenta este valor se debe obtener  del recurso relationships. <br> Nota: Si en la respuesta de Monex esta propiedad es nula, tampoco estará presente en esta respuesta.
     * @type {string}
     * @memberof Account
     */
    kindOfRelationship: string;
    /**
     * Referencia numérica a utilizar cuando se realice una transferencia y no se especifique una referencia
     * @type {string}
     * @memberof Account
     */
    numericReferenceSpei: string;
    /**
     * Concepto de pago a utilizar cuando se realice una transferencia y no se especifique un concepto
     * @type {string}
     * @memberof Account
     */
    paymentConceptSpei: string;
    /**
     *
     * @type {Person}
     * @memberof Account
     */
    person: Person;
    /**
     * Relación con el propietario de la cuenta, para registrar una cuenta este valor se debe obtener  del recurso relationships. <br> Nota: Si en la respuesta de Monex esta propiedad es nula, tampoco estará presente en esta respuesta.
     * @type {string}
     * @memberof Account
     */
    relationship: string;
    /**
     * Registro federal de contribuyentes de la persona o institución propietaria de la cuenta. <br> Nota: Si en la respuesta de Monex esta propiedad es nula, tampoco estará presente en esta respuesta.
     * @type {string}
     * @memberof Account
     */
    rfc: string;
}
/**
 * La información de la compañía que corresponde al contrato
 * @export
 * @interface AccountDetail
 */
export interface AccountDetail {
    /**
     *
     * @type {AddressCompany}
     * @memberof AccountDetail
     */
    address: AddressCompany;
    /**
     * El nombre del negocio
     * @type {string}
     * @memberof AccountDetail
     */
    businessName: string;
    /**
     * La fecha de constitución del negocio
     * @type {string}
     * @memberof AccountDetail
     */
    constitutionDate: string;
    /**
     * La lista de correos del negocio
     * @type {Array<string>}
     * @memberof AccountDetail
     */
    emails: Array<string>;
    /**
     * La lista de los representantes legales negocio
     * @type {Array<string>}
     * @memberof AccountDetail
     */
    legalRepresentatives: Array<string>;
    /**
     * El RFC del negocio
     * @type {string}
     * @memberof AccountDetail
     */
    rfc: string;
}
/**
 * Objeto que contiene información de las cuenta SPEI/SPID reasignadas bajo un nuevo identificador de solicitud
 * @export
 * @interface AccountReassigned
 */
export interface AccountReassigned {
    /**
     * Monto límite permitido registrado para la cuenta
     * @type {number}
     * @memberof AccountReassigned
     */
    amountLimit: number;
    /**
     *
     * @type {Institution}
     * @memberof AccountReassigned
     */
    bank: Institution;
    /**
     * Cuenta del beneficiario, podría ser teléfono celular, TDD o cuenta CLABE
     * @type {string}
     * @memberof AccountReassigned
     */
    beneficiaryAccount: string;
    /**
     * Código de moneda, este dato es opcional, al registrar una cuenta si no se cuenta con este valor se asignara MXP
     * @type {string}
     * @memberof AccountReassigned
     */
    currencyCode: string;
    /**
     * Lista de email's, este dato es opcional
     * @type {Array<string>}
     * @memberof AccountReassigned
     */
    email: Array<string>;
    /**
     *
     * @type {BeneficiaryInstitution}
     * @memberof AccountReassigned
     */
    institution: BeneficiaryInstitution;
    /**
     * Tipo de relación con el propietario de la cuenta, para registrar una cuenta este valor se debe obtener  del recurso relationships. <br> Nota: Si en la respuesta de Monex esta propiedad es nula, tampoco estará presente en esta respuesta.
     * @type {string}
     * @memberof AccountReassigned
     */
    kindOfRelationship: string;
    /**
     * Referencia numérica a utilizar cuando se realice una transferencia y no se especifique una referencia
     * @type {string}
     * @memberof AccountReassigned
     */
    numericReferenceSpei: string;
    /**
     * Concepto de pago a utilizar cuando se realice una transferencia y no se especifique un concepto
     * @type {string}
     * @memberof AccountReassigned
     */
    paymentConceptSpei: string;
    /**
     *
     * @type {Person}
     * @memberof AccountReassigned
     */
    person: Person;
    /**
     * La fecha en la que se registro el beneficiario
     * @type {Date}
     * @memberof AccountReassigned
     */
    registerDate: Date;
    /**
     * Relación con el propietario de la cuenta, para registrar una cuenta este valor se debe obtener  del recurso relationships. <br> Nota: Si en la respuesta de Monex esta propiedad es nula, tampoco estará presente en esta respuesta.
     * @type {string}
     * @memberof AccountReassigned
     */
    relationship: string;
    /**
     * Registro federal de contribuyentes de la persona o institución propietaria de la cuenta. <br> Nota: Si en la respuesta de Monex esta propiedad es nula, tampoco estará presente en esta respuesta.
     * @type {string}
     * @memberof AccountReassigned
     */
    rfc: string;
    /**
     * El estado (status) en el que se encuentra el registro del beneficiario
     * @type {string}
     * @memberof AccountReassigned
     */
    status: string;
}
/**
 * Objeto request para guardar la cuenta del beneficiario
 * @export
 * @interface AccountRequest
 */
export interface AccountRequest {
    /**
     * Lista de cuentas del beneficiario que serán registradas
     * @type {Array<Account>}
     * @memberof AccountRequest
     */
    accounts: Array<Account>;
    /**
     * Url a la que se redirigira en caso de que el cliente cancele el registro
     * @type {string}
     * @memberof AccountRequest
     */
    cancelReturnUrl: string;
    /**
     * Url a la que se redireccionara en caso exitoso
     * @type {string}
     * @memberof AccountRequest
     */
    returnUrl: string;
}
/**
 * Objeto que contiene información de la cuenta
 * @export
 * @interface AccountResponse
 */
export interface AccountResponse {
    /**
     * Monto límite permitido registrado para la cuenta
     * @type {number}
     * @memberof AccountResponse
     */
    amountLimit: number;
    /**
     *
     * @type {Institution}
     * @memberof AccountResponse
     */
    bank: Institution;
    /**
     * Cuenta del beneficiario, podría ser teléfono celular, TDD o cuenta CLABE
     * @type {string}
     * @memberof AccountResponse
     */
    beneficiaryAccount: string;
    /**
     * Lista de email's, este dato es opcional
     * @type {Array<string>}
     * @memberof AccountResponse
     */
    email: Array<string>;
    /**
     *
     * @type {BeneficiaryInstitution}
     * @memberof AccountResponse
     */
    institution: BeneficiaryInstitution;
    /**
     * Tipo de relación con el propietario de la cuenta, para registrar una cuenta este valor se debe obtener  del recurso relationships. <br> Nota: Si en la respuesta de Monex esta propiedad es nula, tampoco estará presente en esta respuesta.
     * @type {string}
     * @memberof AccountResponse
     */
    kindOfRelationship: string;
    /**
     * Referencia numérica a utilizar cuando se realice una transferencia y no se especifique una referencia
     * @type {string}
     * @memberof AccountResponse
     */
    numericReferenceSpei: string;
    /**
     * Concepto de pago a utilizar cuando se realice una transferencia y no se especifique un concepto
     * @type {string}
     * @memberof AccountResponse
     */
    paymentConceptSpei: string;
    /**
     *
     * @type {Person}
     * @memberof AccountResponse
     */
    person: Person;
    /**
     * La fecha en la que se registro el beneficiario
     * @type {Date}
     * @memberof AccountResponse
     */
    registerDate: Date;
    /**
     * Relación con el propietario de la cuenta, para registrar una cuenta este valor se debe obtener  del recurso relationships. <br> Nota: Si en la respuesta de Monex esta propiedad es nula, tampoco estará presente en esta respuesta.
     * @type {string}
     * @memberof AccountResponse
     */
    relationship: string;
    /**
     * Registro federal de contribuyentes de la persona o institución propietaria de la cuenta. <br> Nota: Si en la respuesta de Monex esta propiedad es nula, tampoco estará presente en esta respuesta.
     * @type {string}
     * @memberof AccountResponse
     */
    rfc: string;
    /**
     * El estado (status) en el que se encuentra el registro del beneficiario
     * @type {string}
     * @memberof AccountResponse
     */
    status: string;
}
/**
 * Objeto que contiene información de la cuenta
 * @export
 * @interface AccountSpid
 */
export interface AccountSpid {
    /**
     * Monto límite permitido para la cuenta
     * @type {number}
     * @memberof AccountSpid
     */
    amountLimit: number;
    /**
     * Código banxico con una longitud de 5 dígitos, es requerido en caso de que la cuenta del beneficiario sea un número de celular
     * @type {string}
     * @memberof AccountSpid
     */
    bankCodeBanxico: string;
    /**
     * Cuenta del beneficiario debe ser una cuenta CLABE
     * @type {string}
     * @memberof AccountSpid
     */
    beneficiaryAccount: string;
    /**
     * Url a la que se redirigira en caso no exitoso
     * @type {string}
     * @memberof AccountSpid
     */
    cancelReturnUrl: string;
    /**
     * Lista de email's, este dato es opcional
     * @type {Array<string>}
     * @memberof AccountSpid
     */
    email: Array<string>;
    /**
     *
     * @type {BeneficiaryInstitution}
     * @memberof AccountSpid
     */
    institution: BeneficiaryInstitution;
    /**
     * Tipo de relación de la cuenta, este valor debe ser igual a uno de los obtenidos del recurso de consulta de relationships
     * @type {string}
     * @memberof AccountSpid
     */
    kindOfRelationship: string;
    /**
     * Referencia numérica
     * @type {string}
     * @memberof AccountSpid
     */
    numericReference: string;
    /**
     * Concepto de pago
     * @type {string}
     * @memberof AccountSpid
     */
    paymentConcept: string;
    /**
     * Código de relación de la cuenta, este valor debe ser igual a uno de los obtenidos del recurso de consulta de  relationship
     * @type {string}
     * @memberof AccountSpid
     */
    relationship: string;
    /**
     * Url a la que se redireccionara en caso exitoso
     * @type {string}
     * @memberof AccountSpid
     */
    returnUrl: string;
    /**
     * Registro federal de contribuyentes
     * @type {string}
     * @memberof AccountSpid
     */
    rfc: string;
}
/**
 * La dirección de la companía
 * @export
 * @interface AddressCompany
 */
export interface AddressCompany {
    /**
     * La ciudad
     * @type {string}
     * @memberof AddressCompany
     */
    city: string;
    /**
     * La clabe del país
     * @type {string}
     * @memberof AddressCompany
     */
    countryCode: string;
    /**
     * Número exterior
     * @type {string}
     * @memberof AddressCompany
     */
    exteriorNumber: string;
    /**
     * Número interior
     * @type {string}
     * @memberof AddressCompany
     */
    interiorNumber: string;
    /**
     * El municipio
     * @type {string}
     * @memberof AddressCompany
     */
    municipality: string;
    /**
     * Código postal
     * @type {string}
     * @memberof AddressCompany
     */
    postalCode: string;
    /**
     * El asentamiento
     * @type {string}
     * @memberof AddressCompany
     */
    settlement: string;
    /**
     * El nombre del asentamiento
     * @type {string}
     * @memberof AddressCompany
     */
    settlementName: string;
    /**
     * El estado
     * @type {string}
     * @memberof AddressCompany
     */
    state: string;
    /**
     * La calle
     * @type {string}
     * @memberof AddressCompany
     */
    streetAddress: string;
}
/**
 * Objeto que contiene la información del previo y nuevo monto límite
 * @export
 * @interface AmountRequest
 */
export interface AmountRequest {
    /**
     * Nuevo monto límite que reemplazará al actual, un monto de 0.0 implica que no hay límite
     * @type {number}
     * @memberof AmountRequest
     */
    amountLimit: number;
    /**
     * Url a la que se redirigirá en caso de que el cliente cancele el registro
     * @type {string}
     * @memberof AmountRequest
     */
    cancelReturnUrl: string;
    /**
     * Código de moneda de la cuenta
     * @type {string}
     * @memberof AmountRequest
     */
    currencyCode: string;
    /**
     * Monto límite registrado actualmente, un monto de 0.0 implica que no hay límite
     * @type {number}
     * @memberof AmountRequest
     */
    previousAmountLimit: number;
    /**
     * Url a la que se redirigirá en caso de éxito
     * @type {string}
     * @memberof AmountRequest
     */
    returnUrl: string;
}
/**
 * Contiene la información para agrupar transacciones existentes y autorizarlas de forma conjunta
 * @export
 * @interface AuthorizationTransactionGroup
 */
export interface AuthorizationTransactionGroup {
    /**
     *
     * @type {UrlsRedirect}
     * @memberof AuthorizationTransactionGroup
     */
    redirectUrls: UrlsRedirect;
    /**
     * Listado de order_id de las transacciones a agrupar
     * @type {Array<string>}
     * @memberof AuthorizationTransactionGroup
     */
    transactions: Array<string>;
}
/**
 *
 * @export
 * @interface AuthorizedBeneficiariesResponse
 */
export interface AuthorizedBeneficiariesResponse {
    /**
     * Lista de cuentas obtenidas
     * @type {Array<AccountReassigned>}
     * @memberof AuthorizedBeneficiariesResponse
     */
    accounts: Array<AccountReassigned>;
    /**
     * Identificador público generado para la petición
     * @type {string}
     * @memberof AuthorizedBeneficiariesResponse
     */
    requestId: string;
    /**
     * La url generada para confirmación de la operación
     * @type {string}
     * @memberof AuthorizedBeneficiariesResponse
     */
    url: string;
}
/**
 * La información del usuario autorizado para usar el API de Monex.
 * @export
 * @interface AuthorizedUsers
 */
export interface AuthorizedUsers {
    /**
     * El contrato al cual se le brinda el acceso a la API
     * @type {string}
     * @memberof AuthorizedUsers
     */
    account: string;
    /**
     * El contrato enmascarado al cual se le brinda el acceso a la API
     * @type {string}
     * @memberof AuthorizedUsers
     */
    maskedAccount: string;
    /**
     * El usuario enmascarado que se autorizó
     * @type {string}
     * @memberof AuthorizedUsers
     */
    maskedName: string;
    /**
     * El nombre enmascarado del usuario de acceso que se autorizó
     * @type {string}
     * @memberof AuthorizedUsers
     */
    maskedUserName: string;
    /**
     * El usuario que se autorizó
     * @type {string}
     * @memberof AuthorizedUsers
     */
    name: string;
    /**
     * El usuario de acceso que se autorizó
     * @type {string}
     * @memberof AuthorizedUsers
     */
    userName: string;
}
/**
 * Objeto que contiene el saldo, moneda y código de moneda
 * @export
 * @interface Balance
 */
export interface Balance {
    /**
     * Monto del balance del contrato para la moneda especificada
     * @type {number}
     * @memberof Balance
     */
    balance: number;
    /**
     * Moneda
     * @type {string}
     * @memberof Balance
     */
    currency: string;
    /**
     * Código de la moneda
     * @type {string}
     * @memberof Balance
     */
    currencyCode: string;
}
/**
 * Objeto que contiene la lista de movimientos del balance del contrato
 * @export
 * @interface BalanceListResponse
 */
export interface BalanceListResponse {
    /**
     * Lista de movimientos
     * @type {Array<Balance>}
     * @memberof BalanceListResponse
     */
    balances: Array<Balance>;
}
/**
 *
 * @export
 * @interface BeneficiariesQueryRegisterStatus
 */
export interface BeneficiariesQueryRegisterStatus {
    /**
     * Fecha en que el usuario propietario del token autorizo el registro de beneficiarios
     * @type {Date}
     * @memberof BeneficiariesQueryRegisterStatus
     */
    authorizationDate: Date;
    /**
     * Lista de beneficiarios obtenidos
     * @type {Array<AccountResponse>}
     * @memberof BeneficiariesQueryRegisterStatus
     */
    beneficiaries: Array<AccountResponse>;
    /**
     * Fecha en que se realizó la petición de registro de beneficiarios
     * @type {Date}
     * @memberof BeneficiariesQueryRegisterStatus
     */
    requestDate: Date;
    /**
     * Identificador de la petición del registro de beneficiarios
     * @type {string}
     * @memberof BeneficiariesQueryRegisterStatus
     */
    requestId: string;
    /**
     * Indica sí la petición ya fue autorizada usando el token del usuario
     * @type {string}
     * @memberof BeneficiariesQueryRegisterStatus
     */
    statusRequest: BeneficiariesQueryRegisterStatus.StatusRequestEnum;
    /**
     * Total de beneficiarios enviados en la petición
     * @type {number}
     * @memberof BeneficiariesQueryRegisterStatus
     */
    totalBeneficiaries: number;
}
/**
 * @export
 * @namespace BeneficiariesQueryRegisterStatus
 */
export declare namespace BeneficiariesQueryRegisterStatus {
    /**
     * @export
     * @enum {string}
     */
    enum StatusRequestEnum {
        PENDING,
        AUTHORIZED
    }
}
/**
 *
 * @export
 * @interface BeneficiariesResponse
 */
export interface BeneficiariesResponse {
    /**
     * Lista de beneficiarios obtenidos
     * @type {Array<AccountResponse>}
     * @memberof BeneficiariesResponse
     */
    beneficiaries: Array<AccountResponse>;
}
/**
 * Objeto que contiene el nombre de la institución, este campo se debe llenar si el dueño de la cuenta es una persona moral
 * @export
 * @interface BeneficiaryInstitution
 */
export interface BeneficiaryInstitution {
    /**
     * Nombre de la institución / empresa (persona moral) propietaria la cuenta bancaria
     * @type {string}
     * @memberof BeneficiaryInstitution
     */
    name: string;
}
/**
 * Contiene la información de la factura
 * @export
 * @interface Billing
 */
export interface Billing {
    /**
     * Monto total de la factura
     * @type {number}
     * @memberof Billing
     */
    amount: number;
    /**
     * Fecha y hora en que se emitió de la factura
     * @type {Date}
     * @memberof Billing
     */
    emissionAt: Date;
    /**
     * Fecha en que finaliza el periodo que se factura
     * @type {Date}
     * @memberof Billing
     */
    endDate: Date;
    /**
     * Identificador de la factura
     * @type {string}
     * @memberof Billing
     */
    id: string;
    /**
     * Fecha de inicio del periodo que se factura
     * @type {Date}
     * @memberof Billing
     */
    startDate: Date;
    /**
     * Estatus de la factura
     * @type {string}
     * @memberof Billing
     */
    status: Billing.StatusEnum;
    /**
     *
     * @type {Array<BillingTransaction>}
     * @memberof Billing
     */
    transactions: Array<BillingTransaction>;
    /**
     * Url de la representación impresa en pdf de la factura
     * @type {string}
     * @memberof Billing
     */
    urlPdf: string;
    /**
     * Url del archivo xml de la factura
     * @type {string}
     * @memberof Billing
     */
    urlXml: string;
}
/**
 * @export
 * @namespace Billing
 */
export declare namespace Billing {
    /**
     * @export
     * @enum {string}
     */
    enum StatusEnum {
        PAID,
        OMMITED,
        WAITINGPAYMENT,
        EMISSIONPENDING
    }
}
/**
 * Contiene información de las transacciones que se facturan
 * @export
 * @interface BillingTransaction
 */
export interface BillingTransaction {
    /**
     * Monto de la transacción
     * @type {number}
     * @memberof BillingTransaction
     */
    amount: number;
    /**
     * Clave de rastreo que se asignó a la transacción
     * @type {string}
     * @memberof BillingTransaction
     */
    claveRastreo: string;
    /**
     * Identificador de transaccion en banco monex
     * @type {number}
     * @memberof BillingTransaction
     */
    monexId: number;
    /**
     *
     * @type {Timestamp}
     * @memberof BillingTransaction
     */
    operationDate: Timestamp;
    /**
     * Identificador de la orden
     * @type {string}
     * @memberof BillingTransaction
     */
    orderId: string;
    /**
     * Identificador de la orden de pago
     * @type {string}
     * @memberof BillingTransaction
     */
    paymentOrderId: string;
    /**
     * Identificador de la transacción
     * @type {number}
     * @memberof BillingTransaction
     */
    transactionId: number;
    /**
     * Tipo de transaccion IN | OUT
     * @type {string}
     * @memberof BillingTransaction
     */
    type: BillingTransaction.TypeEnum;
}
/**
 * @export
 * @namespace BillingTransaction
 */
export declare namespace BillingTransaction {
    /**
     * @export
     * @enum {string}
     */
    enum TypeEnum {
        IN,
        OUT
    }
}
/**
 *
 * @export
 * @interface CepResponse
 */
export interface CepResponse {
    /**
     * Cuenta del beneficiario
     * @type {string}
     * @memberof CepResponse
     */
    accountBeneficiary: string;
    /**
     * Cuenta del ordenante
     * @type {string}
     * @memberof CepResponse
     */
    accountSender: string;
    /**
     * Monto de la transferencia
     * @type {number}
     * @memberof CepResponse
     */
    amount: number;
    /**
     * Indica si o no el CEP se encuentra disponible
     * @type {boolean}
     * @memberof CepResponse
     */
    available: boolean;
    /**
     * Clave del banco beneficiario
     * @type {string}
     * @memberof CepResponse
     */
    beneficiaryBankKey: string;
    /**
     * Nombre del beneficiario
     * @type {string}
     * @memberof CepResponse
     */
    beneficiaryName: string;
    /**
     * RFC del beneficiario
     * @type {string}
     * @memberof CepResponse
     */
    beneficiaryRfc: string;
    /**
     * Cadena original del CEP
     * @type {string}
     * @memberof CepResponse
     */
    cadenaOriginal: string;
    /**
     * Fecha de captura de la transferencia
     * @type {Date}
     * @memberof CepResponse
     */
    captureDate: Date;
    /**
     * Número de serie del certificado
     * @type {string}
     * @memberof CepResponse
     */
    certificateSerialNumber: string;
    /**
     * Clave de rastreo
     * @type {string}
     * @memberof CepResponse
     */
    claveRastreo: string;
    /**
     * Descripción de la transferencia
     * @type {string}
     * @memberof CepResponse
     */
    description: string;
    /**
     * IVA de la transferencia
     * @type {number}
     * @memberof CepResponse
     */
    iva: number;
    /**
     * Fecha de operación de la transferencia
     * @type {Date}
     * @memberof CepResponse
     */
    operationDate: Date;
    /**
     * Fecha de abono registrada en el CEP
     * @type {Date}
     * @memberof CepResponse
     */
    operationDateCep: Date;
    /**
     * Referencia numérica de la transferencia
     * @type {string}
     * @memberof CepResponse
     */
    reference: string;
    /**
     * Clave del banco emisor
     * @type {string}
     * @memberof CepResponse
     */
    senderBankKey: string;
    /**
     * Nombre del emisor
     * @type {string}
     * @memberof CepResponse
     */
    senderName: string;
    /**
     * RFC del emisor
     * @type {string}
     * @memberof CepResponse
     */
    senderRfc: string;
    /**
     * Firma del CEP
     * @type {string}
     * @memberof CepResponse
     */
    signature: string;
    /**
     * La url al archivo zip del CEP, el cual contiene el xml y pdf
     * @type {string}
     * @memberof CepResponse
     */
    urlZip: string;
}
/**
 *
 * @export
 * @interface CepSearchBanxico
 */
export interface CepSearchBanxico {
    /**
     * Monto de la transferencia
     * @type {number}
     * @memberof CepSearchBanxico
     */
    amount: number;
    /**
     * Cuenta de beneficiario
     * @type {string}
     * @memberof CepSearchBanxico
     */
    beneficiaryAccount: string;
    /**
     * Clave del banco beneficiario, se puede obtener este valor del listado de institucines '/institutions'. Si este valor no esta presente se obtiene de la cuenta del beneficiario, si la cuenta de beneficiario es un número celular este campo es requerido
     * @type {string}
     * @memberof CepSearchBanxico
     */
    beneficiaryBankKey: string;
    /**
     * Clave de rastreo de la transferencia
     * @type {string}
     * @memberof CepSearchBanxico
     */
    claveRastreo: string;
    /**
     * Fecha de operación de la transferencia, formato: dd-MM-yyyy
     * @type {string}
     * @memberof CepSearchBanxico
     */
    operationDate: string;
    /**
     * Referencia numérica de la transferencia
     * @type {string}
     * @memberof CepSearchBanxico
     */
    reference: string;
    /**
     * Cuenta ordenante, es requerida cuando se no se envía la clave del banco ordenante
     * @type {string}
     * @memberof CepSearchBanxico
     */
    senderAccount: string;
    /**
     * Clave del banco ordenante, se puede obtener este valor del listado de institucines '/institutions'. Es requerida cuando no se envía la cuenta ordenante
     * @type {string}
     * @memberof CepSearchBanxico
     */
    senderBankKey: string;
}
/**
 * Certificado de la empresa que se esta registrando
 * @export
 * @interface CertificateRequest
 */
export interface CertificateRequest {
    /**
     * Alias del certificado
     * @type {string}
     * @memberof CertificateRequest
     */
    alias: string;
    /**
     * Numero de certificado
     * @type {string}
     * @memberof CertificateRequest
     */
    certificateNumber: string;
    /**
     * Dígito verificador
     * @type {string}
     * @memberof CertificateRequest
     */
    checkDigit: string;
    /**
     * Información de cifrado
     * @type {string}
     * @memberof CertificateRequest
     */
    cipherData: string;
}
/**
 *
 * @export
 * @interface CodiCodeQrResponseDTO
 */
export interface CodiCodeQrResponseDTO {
    /**
     * Monto del pago CODI®
     * @type {number}
     * @memberof CodiCodeQrResponseDTO
     */
    amount: number;
    /**
     * El código QR en su represantación base 64
     * @type {string}
     * @memberof CodiCodeQrResponseDTO
     */
    barcodeBase64: string;
    /**
     * La URL del código QR
     * @type {string}
     * @memberof CodiCodeQrResponseDTO
     */
    barcodeUrl: string;
    /**
     * Descripción del pago CODI®
     * @type {string}
     * @memberof CodiCodeQrResponseDTO
     */
    concept: string;
    /**
     * Fecha de creación del código QR para pago CODI®
     * @type {Date}
     * @memberof CodiCodeQrResponseDTO
     */
    creationDate: Date;
    /**
     * Fecha de operación del pago CODI®
     * @type {Date}
     * @memberof CodiCodeQrResponseDTO
     */
    dueDate: Date;
    /**
     * Referencia de la transferencia asignada por el cliente
     * @type {string}
     * @memberof CodiCodeQrResponseDTO
     */
    orderId: string;
    /**
     * Número de teléfono móvil en caso de ser un pago CODI® usando 'PUSH_NOTIFICATION'
     * @type {string}
     * @memberof CodiCodeQrResponseDTO
     */
    phoneNumber: string;
    /**
     * El estado del código QR para pago CODI®
     * @type {string}
     * @memberof CodiCodeQrResponseDTO
     */
    status: CodiCodeQrResponseDTO.StatusEnum;
    /**
     * El tipo de código QR para pago con CODI®
     * @type {string}
     * @memberof CodiCodeQrResponseDTO
     */
    type: CodiCodeQrResponseDTO.TypeEnum;
}
/**
 * @export
 * @namespace CodiCodeQrResponseDTO
 */
export declare namespace CodiCodeQrResponseDTO {
    /**
     * @export
     * @enum {string}
     */
    enum StatusEnum {
        RECEIVED,
        COMPLETED,
        CANCELLED
    }
    /**
     * @export
     * @enum {string}
     */
    enum TypeEnum {
        PUSHNOTIFICATION,
        QRCODE
    }
}
/**
 *
 * @export
 * @interface CodiCodeRequestDTO
 */
export interface CodiCodeRequestDTO {
    /**
     * Monto del pago CODI®
     * @type {number}
     * @memberof CodiCodeRequestDTO
     */
    amount: number;
    /**
     * Descripción del pago CODI®
     * @type {string}
     * @memberof CodiCodeRequestDTO
     */
    concept: string;
    /**
     * Fecha de operación pago CODI®, formato: yyyy-MM-dd'T'HH:mm:ss
     * @type {Date}
     * @memberof CodiCodeRequestDTO
     */
    dueDate: Date;
    /**
     * Campo de metada CODI®, longitud máxima determinada por configuracion de la empresa, por defecto 100 caracteres
     * @type {string}
     * @memberof CodiCodeRequestDTO
     */
    metadata: string;
    /**
     * Referencia de la transferencia asignada por el cliente
     * @type {string}
     * @memberof CodiCodeRequestDTO
     */
    orderId: string;
    /**
     * Número de teléfono móvil en caso de ser un pago CODI® usando 'PUSH_NOTIFICATION' estecampo sería obligatorio
     * @type {string}
     * @memberof CodiCodeRequestDTO
     */
    phoneNumber: string;
    /**
     * El tipo de código QR para pago con CODI®
     * @type {string}
     * @memberof CodiCodeRequestDTO
     */
    type: CodiCodeRequestDTO.TypeEnum;
}
/**
 * @export
 * @namespace CodiCodeRequestDTO
 */
export declare namespace CodiCodeRequestDTO {
    /**
     * @export
     * @enum {string}
     */
    enum TypeEnum {
        PUSHNOTIFICATION,
        QRCODE
    }
}
/**
 * Objeto que contiene la información de solicitud de pago por CODI®.
 * @export
 * @interface CodiOperationResponseDTO
 */
export interface CodiOperationResponseDTO {
    /**
     * Monto de la operacion.
     * @type {number}
     * @memberof CodiOperationResponseDTO
     */
    amount: number;
    /**
     * Concepto del pago.
     * @type {string}
     * @memberof CodiOperationResponseDTO
     */
    concept: string;
    /**
     * Identificador de la operacion.
     * @type {string}
     * @memberof CodiOperationResponseDTO
     */
    id: string;
    /**
     * Fecha de la operacion.
     * @type {Date}
     * @memberof CodiOperationResponseDTO
     */
    operationDate: Date;
    /**
     * Tipo de pago.
     * @type {string}
     * @memberof CodiOperationResponseDTO
     */
    paymentType: string;
    /**
     * Estatus.
     * @type {string}
     * @memberof CodiOperationResponseDTO
     */
    status: string;
    /**
     * Identificador de la transacción.
     * @type {string}
     * @memberof CodiOperationResponseDTO
     */
    transactionId: string;
}
/**
 *
 * @export
 * @interface CodiOperationsFiltersRequestDTO
 */
export interface CodiOperationsFiltersRequestDTO {
    /**
     * Monto minimo, dos decimales
     * @type {number}
     * @memberof CodiOperationsFiltersRequestDTO
     */
    amountFrom: number;
    /**
     * Monto máximo,dos decimales
     * @type {number}
     * @memberof CodiOperationsFiltersRequestDTO
     */
    amountTo: number;
    /**
     * Fecha de operación desde
     * @type {string}
     * @memberof CodiOperationsFiltersRequestDTO
     */
    operationDateFrom: string;
    /**
     * Fecha de operación hasta
     * @type {string}
     * @memberof CodiOperationsFiltersRequestDTO
     */
    operationDateTo: string;
    /**
     * Order id de la petición
     * @type {string}
     * @memberof CodiOperationsFiltersRequestDTO
     */
    orderId: string;
    /**
     * Fecha de petición desde
     * @type {string}
     * @memberof CodiOperationsFiltersRequestDTO
     */
    requestDateFrom: string;
    /**
     * Fecha de petición hasta
     * @type {string}
     * @memberof CodiOperationsFiltersRequestDTO
     */
    requestDateTo: string;
    /**
     * Estatus de petición
     * @type {string}
     * @memberof CodiOperationsFiltersRequestDTO
     */
    status: CodiOperationsFiltersRequestDTO.StatusEnum;
}
/**
 * @export
 * @namespace CodiOperationsFiltersRequestDTO
 */
export declare namespace CodiOperationsFiltersRequestDTO {
    /**
     * @export
     * @enum {string}
     */
    enum StatusEnum {
        RECEIVED,
        COMPLETED,
        CANCELLED
    }
}
/**
 * Contiene la información de una empresa registrada
 * @export
 * @interface CompanyRegistered
 */
export interface CompanyRegistered {
    /**
     * Nombre de la empresa registrada
     * @type {string}
     * @memberof CompanyRegistered
     */
    businessName: string;
    /**
     * La información del certificado
     * @type {string}
     * @memberof CompanyRegistered
     */
    certificate: string;
    /**
     * Nombre comercial de la empresa registrada
     * @type {string}
     * @memberof CompanyRegistered
     */
    comercialName: string;
    /**
     * Identificador de la empresa
     * @type {string}
     * @memberof CompanyRegistered
     */
    companyId: string;
    /**
     * RFC de la empresa registrada
     * @type {string}
     * @memberof CompanyRegistered
     */
    rfc: string;
    /**
     * El estado de la compañía
     * @type {string}
     * @memberof CompanyRegistered
     */
    status: string;
}
/**
 * Contiene la información de la empresa que se quiere registrar
 * @export
 * @interface CompanyRequested
 */
export interface CompanyRequested {
    /**
     * Nombre de la empresa que se va a registrar
     * @type {string}
     * @memberof CompanyRequested
     */
    businessName: string;
    /**
     *
     * @type {CertificateRequest}
     * @memberof CompanyRequested
     */
    certificate: CertificateRequest;
    /**
     * Nombre comercial de la empresa que se va a registrar
     * @type {string}
     * @memberof CompanyRequested
     */
    comercialName: string;
    /**
     * RFC de la empresa que se va a registrar
     * @type {string}
     * @memberof CompanyRequested
     */
    rfc: string;
}
/**
 * Objeto que contiene la información de la empresa
 * @export
 * @interface Compay
 */
export interface Compay {
    /**
     * Nombre comercial de la empresa
     * @type {string}
     * @memberof Compay
     */
    commercialName: string;
    /**
     * Identificador de la empresa
     * @type {string}
     * @memberof Compay
     */
    companyId: string;
    /**
     * Nombre de la empresa
     * @type {string}
     * @memberof Compay
     */
    name: string;
    /**
     * RFC de la empresa
     * @type {string}
     * @memberof Compay
     */
    rfc: string;
}
/**
 * Es la lista de configuraciones asociadas al contrato
 * @export
 * @interface ConfigurationsLimits
 */
export interface ConfigurationsLimits {
    /**
     * Nombre del grupo de configuraciones. Debe ser LIMIT_BY_TIME para especificar la configuración por límite por horario o LIMIT_BY_RANGE para especificar límite por periodo.
     * @type {string}
     * @memberof ConfigurationsLimits
     */
    group: string;
    /**
     * Lista de items configurados
     * @type {Array<Item>}
     * @memberof ConfigurationsLimits
     */
    items: Array<Item>;
}
/**
 * Objeto que contiene información básica de un posible cliente
 * @export
 * @interface ContactRequest
 */
export interface ContactRequest {
    /**
     * Dirección del contacto
     * @type {string}
     * @memberof ContactRequest
     */
    address: string;
    /**
     * Nombre de la empresa
     * @type {string}
     * @memberof ContactRequest
     */
    company: string;
    /**
     * Nombre de la persona quién será contactada
     * @type {string}
     * @memberof ContactRequest
     */
    contactPerson: string;
    /**
     * Email de la persona
     * @type {string}
     * @memberof ContactRequest
     */
    email: string;
    /**
     * Número de teléfono de la persona
     * @type {string}
     * @memberof ContactRequest
     */
    phoneNumber: string;
}
/**
 *
 * @export
 * @interface ContractDetailRequest
 */
export interface ContractDetailRequest {
    /**
     * El contrato a consultar la información
     * @type {string}
     * @memberof ContractDetailRequest
     */
    contract: string;
    /**
     * La contraseña del usuario
     * @type {string}
     * @memberof ContractDetailRequest
     */
    password: string;
    /**
     * La contraseña del usuario
     * @type {string}
     * @memberof ContractDetailRequest
     */
    tokenCode: string;
    /**
     * El nombre del usuario
     * @type {string}
     * @memberof ContractDetailRequest
     */
    userName: string;
}
/**
 *
 * @export
 * @interface ContractDetailResponse
 */
export interface ContractDetailResponse {
    /**
     *
     * @type {AccountDetail}
     * @memberof ContractDetailResponse
     */
    account: AccountDetail;
    /**
     *
     * @type {UserCompany}
     * @memberof ContractDetailResponse
     */
    user: UserCompany;
}
/**
 *
 * @export
 * @interface Deposit
 */
export interface Deposit {
    /**
     * Monto de la transferencia
     * @type {number}
     * @memberof Deposit
     */
    amount: number;
    /**
     * La cuenta del beneficiario
     * @type {string}
     * @memberof Deposit
     */
    beneficiaryAccount: string;
    /**
     * El nombre del beneficiario
     * @type {string}
     * @memberof Deposit
     */
    beneficiaryName: string;
    /**
     * El RFC del beneficiario
     * @type {string}
     * @memberof Deposit
     */
    beneficiaryRfc: string;
    /**
     *
     * @type {MessageCEP}
     * @memberof Deposit
     */
    cep: MessageCEP;
    /**
     * La clave de rastreo de la transferencia
     * @type {string}
     * @memberof Deposit
     */
    claveRastreo: string;
    /**
     * Fecha de confirmación del deposito
     * @type {Date}
     * @memberof Deposit
     */
    confirmDate: Date;
    /**
     * Código de moneda de la transferencia
     * @type {string}
     * @memberof Deposit
     */
    currencyCode: string;
    /**
     * Fecha del deposito
     * @type {Date}
     * @memberof Deposit
     */
    depositDate: Date;
    /**
     * Depositante
     * @type {string}
     * @memberof Deposit
     */
    depositant: string;
    /**
     * Cuenta CLABE interbancaria del depositante
     * @type {string}
     * @memberof Deposit
     */
    depositantClabe: string;
    /**
     * Email del depositante
     * @type {string}
     * @memberof Deposit
     */
    depositantEmail: string;
    /**
     * RFC del depositante
     * @type {string}
     * @memberof Deposit
     */
    depositantRfc: string;
    /**
     * Descripción del traspaso
     * @type {string}
     * @memberof Deposit
     */
    description: string;
    /**
     * Descripción directa de Monex
     * @type {string}
     * @memberof Deposit
     */
    monexDescription: string;
    /**
     * Identificador de la transferencia en Monex
     * @type {string}
     * @memberof Deposit
     */
    monexTransactionId: string;
    /**
     * La referencia del depósito
     * @type {string}
     * @memberof Deposit
     */
    reference: string;
    /**
     * La cuenta del ordenante
     * @type {string}
     * @memberof Deposit
     */
    senderAccount: string;
    /**
     *
     * @type {MessageInstitution}
     * @memberof Deposit
     */
    senderBank: MessageInstitution;
    /**
     * El nombre del ordenante
     * @type {string}
     * @memberof Deposit
     */
    senderName: string;
    /**
     * El RFC del ordenante
     * @type {string}
     * @memberof Deposit
     */
    senderRfc: string;
}
/**
 * Objeto que contiene los datos del depositante
 * @export
 * @interface Depositant
 */
export interface Depositant {
    /**
     * Alias del depositante
     * @type {string}
     * @memberof Depositant
     */
    alias: string;
    /**
     * Código de moneda con el que operará el depositante
     * @type {string}
     * @memberof Depositant
     */
    currencyCode: string;
    /**
     * Cuenta clabe del depositante
     * @type {string}
     * @memberof Depositant
     */
    depositantClabe: string;
    /**
     * Lista de emails del depositante
     * @type {Array<string>}
     * @memberof Depositant
     */
    email: Array<string>;
    /**
     * Nombre del depositante
     * @type {string}
     * @memberof Depositant
     */
    name: string;
}
/**
 *
 * @export
 * @interface DepositantsRegister
 */
export interface DepositantsRegister {
    /**
     * Alias del depositante
     * @type {string}
     * @memberof DepositantsRegister
     */
    alias: string;
    /**
     * Codigo de la moneda en que operará el depositante, los valores validos son MXP y USD
     * @type {string}
     * @memberof DepositantsRegister
     */
    currencyCode: string;
    /**
     * Lista de email del depositante
     * @type {Array<string>}
     * @memberof DepositantsRegister
     */
    email: Array<string>;
    /**
     * Nombre del depositante
     * @type {string}
     * @memberof DepositantsRegister
     */
    name: string;
}
/**
 *
 * @export
 * @interface DepositantsResponse
 */
export interface DepositantsResponse {
    /**
     * Cuenta clabe del depositante
     * @type {string}
     * @memberof DepositantsResponse
     */
    clabe: string;
}
/**
 *
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     *
     * @type {number}
     * @memberof ErrorResponse
     */
    httpStatus: number;
    /**
     *
     * @type {string}
     * @memberof ErrorResponse
     */
    message: string;
}
/**
 * Objeto que contiene una lista de depositantes
 * @export
 * @interface GetDepositants
 */
export interface GetDepositants {
    /**
     * Lista de depositantes que contiene cada depositante encontrado
     * @type {Array<Depositant>}
     * @memberof GetDepositants
     */
    depositants: Array<Depositant>;
}
/**
 * Objeto que contiene la información del banco
 * @export
 * @interface Institution
 */
export interface Institution {
    /**
     * Razón social de la institución
     * @type {string}
     * @memberof Institution
     */
    companyName: string;
    /**
     * La clabe BANXICO de la institución
     * @type {string}
     * @memberof Institution
     */
    key: string;
    /**
     * Nombre de la institución
     * @type {string}
     * @memberof Institution
     */
    name: string;
    /**
     * RFC de la institución
     * @type {string}
     * @memberof Institution
     */
    rfc: string;
}
/**
 *
 * @export
 * @interface InstitutionsList
 */
export interface InstitutionsList {
    /**
     * Lista de instituciones
     * @type {Array<Institution>}
     * @memberof InstitutionsList
     */
    institutions: Array<Institution>;
}
/**
 * Cada Item especifica el valor configurado para limite de monto permitido o número de operaciones permitidas. Debe especificar un item por cada configuración
 * @export
 * @interface Item
 */
export interface Item {
    /**
     * Debe ser BY_AMOUNT para indicar la configuración por monto o BY_OPERATION para indicar la configuración por número de operaciones
     * @type {string}
     * @memberof Item
     */
    key: string;
    /**
     * Valor configurado
     * @type {string}
     * @memberof Item
     */
    value: string;
}
/**
 * El mensaje que se envía mediante (webHook) con la información del registro de la cuenta del beneficiario
 * @export
 * @interface MessageAccountBeneficiary
 */
export interface MessageAccountBeneficiary {
    /**
     * Cuenta del beneficiario registrado
     * @type {string}
     * @memberof MessageAccountBeneficiary
     */
    account: string;
    /**
     * Mensaje de error en caso de existir, el valor de este atributo contiene el mensaje
     * @type {string}
     * @memberof MessageAccountBeneficiary
     */
    errorMessage: string;
    /**
     * El identificador en esta API, de la petición de registro de la cuenta del beneficiario
     * @type {string}
     * @memberof MessageAccountBeneficiary
     */
    requestId: string;
}
/**
 * El CEP emitido por Banxico de la transferencia. Solo cuando esté disponible, en otro caso se podrá usar la Consulta de CEP que esta misma API ofrece
 * @export
 * @interface MessageCEP
 */
export interface MessageCEP {
    /**
     * Cuenta del beneficiario
     * @type {string}
     * @memberof MessageCEP
     */
    accountBeneficiary: string;
    /**
     * Cuenta que envia la operación
     * @type {string}
     * @memberof MessageCEP
     */
    accountSender: string;
    /**
     * Monto de la operación
     * @type {number}
     * @memberof MessageCEP
     */
    amount: number;
    /**
     * Indica sí el CEP está disponible
     * @type {boolean}
     * @memberof MessageCEP
     */
    available: boolean;
    /**
     * Clave del banco beneficiario
     * @type {string}
     * @memberof MessageCEP
     */
    bankBeneficiary: string;
    /**
     * Clave del banco que envía la operación
     * @type {string}
     * @memberof MessageCEP
     */
    bankSender: string;
    /**
     * Nombre del beneficiario
     * @type {string}
     * @memberof MessageCEP
     */
    beneficiaryName: string;
    /**
     * RFC del beneficiario
     * @type {string}
     * @memberof MessageCEP
     */
    beneficiaryRfc: string;
    /**
     * Cadena original emita por el SAT
     * @type {string}
     * @memberof MessageCEP
     */
    cadenaOriginal: string;
    /**
     * Fecha de captura
     * @type {Date}
     * @memberof MessageCEP
     */
    captureDate: Date;
    /**
     * Número de serie emitido por el SAT
     * @type {string}
     * @memberof MessageCEP
     */
    certificateSerialNumber: string;
    /**
     * Clave de rastreo de la operación
     * @type {string}
     * @memberof MessageCEP
     */
    claveRastreo: string;
    /**
     * Descripción de la operación
     * @type {string}
     * @memberof MessageCEP
     */
    description: string;
    /**
     * IVA de la operación
     * @type {number}
     * @memberof MessageCEP
     */
    iva: number;
    /**
     * Fecha en la que se realizó la operación
     * @type {Date}
     * @memberof MessageCEP
     */
    operationDate: Date;
    /**
     * Fecha en la que genera el CEP
     * @type {Date}
     * @memberof MessageCEP
     */
    operationDateCep: Date;
    /**
     * Referencia de la operación
     * @type {string}
     * @memberof MessageCEP
     */
    reference: string;
    /**
     * Nombre de quién envía la operación
     * @type {string}
     * @memberof MessageCEP
     */
    senderName: string;
    /**
     * RFC de quién envía la operación
     * @type {string}
     * @memberof MessageCEP
     */
    senderRfc: string;
    /**
     * Firma del CEP
     * @type {string}
     * @memberof MessageCEP
     */
    signature: string;
    /**
     * Dirección URL de descarga del archivo ZIP que contiene el PDF y XML del CEP proporcionado por BANXICO
     * @type {string}
     * @memberof MessageCEP
     */
    urlZip: string;
}
/**
 * El mensaje que se envía con la informacion del punto de venta registrado
 * @export
 * @interface MessageCodiAction
 */
export interface MessageCodiAction {
    /**
     * Monto de la operación de pago
     * @type {number}
     * @memberof MessageCodiAction
     */
    amount: number;
    /**
     * Concepto
     * @type {string}
     * @memberof MessageCodiAction
     */
    concept: string;
    /**
     * Fecha de expiración de la operación
     * @type {Date}
     * @memberof MessageCodiAction
     */
    dueDate: Date;
    /**
     * Uuid de la operación
     * @type {string}
     * @memberof MessageCodiAction
     */
    id: string;
    /**
     * Metadata asociada a la petición de pago
     * @type {string}
     * @memberof MessageCodiAction
     */
    metadata: string;
    /**
     * Fecha de la operación
     * @type {Date}
     * @memberof MessageCodiAction
     */
    operationDate: Date;
    /**
     * Identificador de la petición
     * @type {string}
     * @memberof MessageCodiAction
     */
    orderId: string;
    /**
     * Tipo de pago
     * @type {string}
     * @memberof MessageCodiAction
     */
    paymentType: string;
    /**
     * Número de referencia
     * @type {string}
     * @memberof MessageCodiAction
     */
    reference: string;
    /**
     * Identidicador del punto de venta a la que pertenece la petición de pago
     * @type {string}
     * @memberof MessageCodiAction
     */
    salesPointId: string;
    /**
     * Estado de la operación de pago
     * @type {string}
     * @memberof MessageCodiAction
     */
    status: string;
    /**
     * Id de la transacción
     * @type {string}
     * @memberof MessageCodiAction
     */
    transactionId: string;
}
/**
 * Configuración de límites de montos
 * @export
 * @interface MessageConfigurationsLimits
 */
export interface MessageConfigurationsLimits {
    /**
     * Lista de configuraciones pertenecientes al contrato
     * @type {Array<ConfigurationsLimits>}
     * @memberof MessageConfigurationsLimits
     */
    configurations: Array<ConfigurationsLimits>;
}
/**
 * El mensaje que se envía mediante (webHook) con la información de una transferencia de entrada recibida
 * @export
 * @interface MessageDepositReceived
 */
export interface MessageDepositReceived {
    /**
     * Monto de la transferencia
     * @type {number}
     * @memberof MessageDepositReceived
     */
    amount: number;
    /**
     * Cuenta del beneficiario
     * @type {string}
     * @memberof MessageDepositReceived
     */
    beneficiaryAccount: string;
    /**
     * Nombre del beneficiario
     * @type {string}
     * @memberof MessageDepositReceived
     */
    beneficiaryName: string;
    /**
     * RFC del beneficiario
     * @type {string}
     * @memberof MessageDepositReceived
     */
    beneficiaryRfc: string;
    /**
     *
     * @type {MessageCEP}
     * @memberof MessageDepositReceived
     */
    cep: MessageCEP;
    /**
     * Clave de rastreo de la transferencia
     * @type {string}
     * @memberof MessageDepositReceived
     */
    claveRastreo: string;
    /**
     * Fecha de confirmación de la transferencia
     * @type {Date}
     * @memberof MessageDepositReceived
     */
    confirmDate: Date;
    /**
     * Código de moneda de la transferencia, puede ser MXP, USD
     * @type {string}
     * @memberof MessageDepositReceived
     */
    currencyCode: string;
    /**
     * Fecha de recepción de la transferencia
     * @type {Date}
     * @memberof MessageDepositReceived
     */
    depositDate: Date;
    /**
     * Nombre del depositante, en caso que la transferencia se reciba en una cuenta de depositante
     * @type {string}
     * @memberof MessageDepositReceived
     */
    depositant: string;
    /**
     * CLABE del depositante, en caso que la transferencia se reciba en una cuenta de depositante
     * @type {string}
     * @memberof MessageDepositReceived
     */
    depositantClabe: string;
    /**
     * Correo electrónico del depositante, en caso que la transferencia se reciba en una cuenta de depositante
     * @type {string}
     * @memberof MessageDepositReceived
     */
    depositantEmail: string;
    /**
     * RFC del depositante, en caso que la transferencia se reciba en una cuenta de depositante
     * @type {string}
     * @memberof MessageDepositReceived
     */
    depositantRfc: string;
    /**
     * Concepto de la transferencia
     * @type {string}
     * @memberof MessageDepositReceived
     */
    description: string;
    /**
     * Descripción de Monex para la transferencia
     * @type {string}
     * @memberof MessageDepositReceived
     */
    monexDescription: string;
    /**
     * Identificador asignado por Monex a la transferencia
     * @type {string}
     * @memberof MessageDepositReceived
     */
    monexTransactionId: string;
    /**
     * Referecia de la transferencia
     * @type {string}
     * @memberof MessageDepositReceived
     */
    reference: string;
    /**
     * Cuenta del ordenante, podría ser un número celular, TDD o Cuenta CLABE interbancaria
     * @type {string}
     * @memberof MessageDepositReceived
     */
    senderAccount: string;
    /**
     *
     * @type {MessageInstitution}
     * @memberof MessageDepositReceived
     */
    senderBank: MessageInstitution;
    /**
     * Nombre del ordenante
     * @type {string}
     * @memberof MessageDepositReceived
     */
    senderName: string;
    /**
     * RFC del ordenante
     * @type {string}
     * @memberof MessageDepositReceived
     */
    senderRfc: string;
}
/**
 * Objeto que contiene la información del banco
 * @export
 * @interface MessageInstitution
 */
export interface MessageInstitution {
    /**
     * Nombre de la institución registrada ante el SAT
     * @type {string}
     * @memberof MessageInstitution
     */
    companyName: string;
    /**
     * Clave de la institución
     * @type {string}
     * @memberof MessageInstitution
     */
    key: string;
    /**
     * Nombre de la institución
     * @type {string}
     * @memberof MessageInstitution
     */
    name: string;
    /**
     * RFC de la institución
     * @type {string}
     * @memberof MessageInstitution
     */
    rfc: string;
}
/**
 * El mensaje que se envía mediante (webHook) con la información de la transferencia de salida realizada
 * @export
 * @interface MessagePayment
 */
export interface MessagePayment {
    /**
     * Cuenta del ordenante
     * @type {string}
     * @memberof MessagePayment
     */
    account: string;
    /**
     * Monto de la transferencia
     * @type {number}
     * @memberof MessagePayment
     */
    amount: number;
    /**
     * Cuenta del beneficiario
     * @type {string}
     * @memberof MessagePayment
     */
    beneficiaryAccount: string;
    /**
     *
     * @type {MessageInstitution}
     * @memberof MessagePayment
     */
    beneficiaryBank: MessageInstitution;
    /**
     * Nombre del beneficiario
     * @type {string}
     * @memberof MessagePayment
     */
    beneficiaryName: string;
    /**
     *
     * @type {MessageCEP}
     * @memberof MessagePayment
     */
    cep: MessageCEP;
    /**
     * Clave de rastreo de la transferencia
     * @type {string}
     * @memberof MessagePayment
     */
    claveRastreo: string;
    /**
     * Concepto de la transferencia de salida
     * @type {string}
     * @memberof MessagePayment
     */
    concept: string;
    /**
     * Fecha de confirmación de la transferencia de salida
     * @type {Date}
     * @memberof MessagePayment
     */
    confirmDate: Date;
    /**
     * Código de la moneda de la transferencia de salida
     * @type {string}
     * @memberof MessagePayment
     */
    currencyCode: string;
    /**
     * Mensaje de detención de Monex de la transferencia de salida
     * @type {string}
     * @memberof MessagePayment
     */
    detentionMessage: string;
    /**
     * Mensaje de error
     * @type {string}
     * @memberof MessagePayment
     */
    errorMessage: string;
    /**
     * La descripción de Monex de la transferencia de salida
     * @type {string}
     * @memberof MessagePayment
     */
    monexDescription: string;
    /**
     * El identificador de la transferencia de salida
     * @type {string}
     * @memberof MessagePayment
     */
    orderId: string;
    /**
     * El identificador de la orden de pago de Monex de la transferencia de salida
     * @type {number}
     * @memberof MessagePayment
     */
    paymentOrderId: number;
    /**
     * Razón de porque está pendiente aún cuando se autorizó la transferencia
     * @type {string}
     * @memberof MessagePayment
     */
    pendingReason: string;
    /**
     * Referecia de la transferencia
     * @type {number}
     * @memberof MessagePayment
     */
    reference: number;
    /**
     * El identificador, en esta API, de la petición de envío de la transferencia de salida
     * @type {string}
     * @memberof MessagePayment
     */
    requestId: string;
    /**
     * El estado de la transferencia de salida
     * @type {string}
     * @memberof MessagePayment
     */
    statusCode: string;
    /**
     * El identificador de Monex de la transferencia de salida
     * @type {number}
     * @memberof MessagePayment
     */
    transactionId: number;
}
/**
 * El mensaje que se envía mediante (webHook) con la información de una transferencia que esta pendiente de ser completada
 * @export
 * @interface MessagePaymentStatePending
 */
export interface MessagePaymentStatePending {
    /**
     * Cuenta del ordenante
     * @type {string}
     * @memberof MessagePaymentStatePending
     */
    account: string;
    /**
     * Monto de la transferencia
     * @type {number}
     * @memberof MessagePaymentStatePending
     */
    amount: number;
    /**
     * Cuenta del beneficiario
     * @type {string}
     * @memberof MessagePaymentStatePending
     */
    beneficiaryAccount: string;
    /**
     *
     * @type {MessageInstitution}
     * @memberof MessagePaymentStatePending
     */
    beneficiaryBank: MessageInstitution;
    /**
     * Nombre del beneficiario
     * @type {string}
     * @memberof MessagePaymentStatePending
     */
    beneficiaryName: string;
    /**
     * Concepto de la transferencia de salida
     * @type {string}
     * @memberof MessagePaymentStatePending
     */
    concept: string;
    /**
     * Código de la moneda de la transferencia de salida
     * @type {string}
     * @memberof MessagePaymentStatePending
     */
    currencyCode: string;
    /**
     * Mensaje de detención de Monex, indica la causa por la cuál esta detenida la operación en Monex
     * @type {string}
     * @memberof MessagePaymentStatePending
     */
    detentionMessage: string;
    /**
     * Mensaje de error
     * @type {string}
     * @memberof MessagePaymentStatePending
     */
    errorMessage: string;
    /**
     * El identificador de la transferencia de salida
     * @type {string}
     * @memberof MessagePaymentStatePending
     */
    orderId: string;
    /**
     * El identificador de la orden de pago de Monex de la transferencia de salida
     * @type {number}
     * @memberof MessagePaymentStatePending
     */
    paymentOrderId: number;
    /**
     * Estatus que identifica la causa por la que la transferencia esta en pendiente, los posibles estatus son: FI=Fondos Insuficientes | FM=Firma mancomunada, en espera de ingreso de segundo token de autorización | DP=Se detecto una transferencia duplicada que esta en espera de confirmación o de eliminación
     * @type {string}
     * @memberof MessagePaymentStatePending
     */
    pendingReason: string;
    /**
     * Referecia de la transferencia
     * @type {number}
     * @memberof MessagePaymentStatePending
     */
    reference: number;
    /**
     * El identificador, en esta API, de la petición de envío de la transferencia de salida
     * @type {string}
     * @memberof MessagePaymentStatePending
     */
    requestId: string;
    /**
     * El estado de la transferencia de salida, deberá ser PENDING
     * @type {string}
     * @memberof MessagePaymentStatePending
     */
    statusCode: string;
    /**
     * El identificador de Monex de la transferencia de salida, podría no estar presente por lo que Usted debería hacer referencias mediate el paymentOrderID
     * @type {number}
     * @memberof MessagePaymentStatePending
     */
    transactionId: number;
}
/**
 * El mensaje que se envía mediante (WebHook) con la información acerca de algún cambio en el procesamiento o estado de la petición a esta a esta API
 * @export
 * @interface MessageRequestChanged
 */
export interface MessageRequestChanged {
    /**
     * Identificador de la petición realizada a esta API
     * @type {string}
     * @memberof MessageRequestChanged
     */
    requestId: string;
    /**
     * El cambio a informar en la procesamiento/estado de la petición
     * @type {string}
     * @memberof MessageRequestChanged
     */
    status: MessageRequestChanged.StatusEnum;
}
/**
 * @export
 * @namespace MessageRequestChanged
 */
export declare namespace MessageRequestChanged {
    /**
     * @export
     * @enum {string}
     */
    enum StatusEnum {
        AUTHORIZED
    }
}
/**
 * El mensaje que se envía con la informacion del punto de venta registrado
 * @export
 * @interface MessageSalesPoint
 */
export interface MessageSalesPoint {
    /**
     * Cuenta donde se realziaran los pagos
     * @type {string}
     * @memberof MessageSalesPoint
     */
    account: string;
    /**
     * Ip desde la cual se accedera al API
     * @type {string}
     * @memberof MessageSalesPoint
     */
    ip: string;
    /**
     * Nombre del punto de venta
     * @type {string}
     * @memberof MessageSalesPoint
     */
    name: string;
}
/**
 * El mensaje que se envía mediante (webHook) con la información de la suscripción a esta a esta API
 * @export
 * @interface MessageSubscription
 */
export interface MessageSubscription {
    /**
     * Contrato Monex, con el cuál se suscribió el cliente Monex en Wire4
     * @type {string}
     * @memberof MessageSubscription
     */
    contract: string;
    /**
     * Contrato enmascarado de Monex, con el cuál se suscribió el cliente Monex en Wire4
     * @type {string}
     * @memberof MessageSubscription
     */
    maskedContract: string;
    /**
     * Identificador de la suscripción, el cual se utilizará en las operaciones que solicitan una suscripción
     * @type {string}
     * @memberof MessageSubscription
     */
    subscription: string;
    /**
     * Usuario enmascardo, con el cuál se suscribió el cliente Monex en Wire4
     * @type {string}
     * @memberof MessageSubscription
     */
    user: string;
    /**
     * Usuario proporcionado por Wire4, el cuál se debe utilizar para autenticar a esta suscripción
     * @type {string}
     * @memberof MessageSubscription
     */
    userKey: string;
    /**
     * Contraseña proporcionada por Wire4, la cuál se debe utilizar para autenticar a esta suscripción
     * @type {string}
     * @memberof MessageSubscription
     */
    userSecret: string;
}
/**
 * El mensaje que se envía mediante (webHook) con la información del usuario que se le autorizó el uso del API de Monex.
 * @export
 * @interface MessageUserAuthorized
 */
export interface MessageUserAuthorized {
    /**
     * El contrato al cual se le brinda el acceso a la API
     * @type {string}
     * @memberof MessageUserAuthorized
     */
    account: string;
    /**
     * El contrato enmascarado al cual se le brinda el acceso a la API
     * @type {string}
     * @memberof MessageUserAuthorized
     */
    maskedAccount: string;
    /**
     * El usuario enmascarado que se autorizó
     * @type {string}
     * @memberof MessageUserAuthorized
     */
    maskedName: string;
    /**
     * El nombre enmascarado del usuario de acceso que se autorizó
     * @type {string}
     * @memberof MessageUserAuthorized
     */
    maskedUserName: string;
    /**
     * El usuario que se autorizó
     * @type {string}
     * @memberof MessageUserAuthorized
     */
    name: string;
    /**
     * El identificador de la petición cuando se solicitó la autorización
     * @type {string}
     * @memberof MessageUserAuthorized
     */
    requestId: string;
    /**
     * El nombre del usuario de acceso que se autorizó
     * @type {string}
     * @memberof MessageUserAuthorized
     */
    userName: string;
}
/**
 * El objeto que se envía mediante un mensaje WebHook
 * @export
 * @interface MessageWebHook
 */
export interface MessageWebHook {
    /**
     * La versión de esta API
     * @type {string}
     * @memberof MessageWebHook
     */
    apiVersion: string;
    /**
     * Fecha de creación del mensaje
     * @type {Date}
     * @memberof MessageWebHook
     */
    created: Date;
    /**
     * Objeto que contiene la información del evento
     * @type {any}
     * @memberof MessageWebHook
     */
    data: any;
    /**
     * El identificador del mensaje
     * @type {string}
     * @memberof MessageWebHook
     */
    id: string;
    /**
     * Indica si proviene de un entorno productivo
     * @type {boolean}
     * @memberof MessageWebHook
     */
    livemode: boolean;
    /**
     * Tipo de objeto  que contiene el mensaje en el atributo 'data' los posibles valores son: subscription, beneficiary, spei_outgoing, spei_incoming, spid_outgoing, request_outgoing
     * @type {string}
     * @memberof MessageWebHook
     */
    object: string;
    /**
     * Número de  mensajes pendientes de enviar
     * @type {number}
     * @memberof MessageWebHook
     */
    pendingWebhooks: number;
    /**
     * Identificador del recurso relacionado
     * @type {string}
     * @memberof MessageWebHook
     */
    request: string;
    /**
     * El tipo evento que se esta enviando en la notifiación
     * @type {string}
     * @memberof MessageWebHook
     */
    type: string;
}
/**
 * Objeto que contiene la información de las operaciones
 * @export
 * @interface Operations
 */
export interface Operations {
    /**
     * Monto de la petición
     * @type {number}
     * @memberof Operations
     */
    amount: number;
    /**
     *
     * @type {Compay}
     * @memberof Operations
     */
    company: Compay;
    /**
     * Descripción de la petición
     * @type {string}
     * @memberof Operations
     */
    description: string;
    /**
     * Fecha de vencimiento de la petición
     * @type {Date}
     * @memberof Operations
     */
    dueDate: Date;
    /**
     * Order id de la petición
     * @type {string}
     * @memberof Operations
     */
    orderId: string;
    /**
     *
     * @type {Payment}
     * @memberof Operations
     */
    payment: Payment;
    /**
     * Numero de telefono
     * @type {string}
     * @memberof Operations
     */
    phoneNumber: string;
    /**
     *
     * @type {SalesPoint}
     * @memberof Operations
     */
    salesPoint: SalesPoint;
    /**
     * Estatus de la petición
     * @type {string}
     * @memberof Operations
     */
    status: Operations.StatusEnum;
    /**
     * Tipo de petición de cobro
     * @type {string}
     * @memberof Operations
     */
    type: Operations.TypeEnum;
}
/**
 * @export
 * @namespace Operations
 */
export declare namespace Operations {
    /**
     * @export
     * @enum {string}
     */
    enum StatusEnum {
        RECEIVED,
        COMPLETED,
        CANCELLED
    }
    /**
     * @export
     * @enum {string}
     */
    enum TypeEnum {
        PUSHNOTIFICATION,
        QRCODE
    }
}
/**
 *
 * @export
 * @interface PagerResponseDto
 */
export interface PagerResponseDto {
    /**
     * Contenido de la respuesta paginada
     * @type {Array<Operations>}
     * @memberof PagerResponseDto
     */
    content: Array<Operations>;
    /**
     * Numero de elementos en la pagina
     * @type {number}
     * @memberof PagerResponseDto
     */
    numberOfElements: number;
    /**
     * Número de pagina
     * @type {number}
     * @memberof PagerResponseDto
     */
    page: number;
    /**
     * Tamaño de la pagina
     * @type {number}
     * @memberof PagerResponseDto
     */
    size: number;
    /**
     * Numero total de elementos de la consulta
     * @type {number}
     * @memberof PagerResponseDto
     */
    totalItems: number;
    /**
     * Numero total de paginas
     * @type {number}
     * @memberof PagerResponseDto
     */
    totalPages: number;
}
/**
 *
 * @export
 * @interface Payment
 */
export interface Payment {
    /**
     * Cuenta emisora
     * @type {string}
     * @memberof Payment
     */
    account: string;
    /**
     * Monto de la transferencia
     * @type {number}
     * @memberof Payment
     */
    amount: number;
    /**
     * Cuenta del beneficiario
     * @type {string}
     * @memberof Payment
     */
    beneficiaryAccount: string;
    /**
     *
     * @type {Institution}
     * @memberof Payment
     */
    beneficiaryBank: Institution;
    /**
     * Nombre del Beneficiario
     * @type {string}
     * @memberof Payment
     */
    beneficiaryName: string;
    /**
     *
     * @type {MessageCEP}
     * @memberof Payment
     */
    cep: MessageCEP;
    /**
     * Clave de rastreo de la transferencia
     * @type {string}
     * @memberof Payment
     */
    claveRastreo: string;
    /**
     * Concepto de pago
     * @type {string}
     * @memberof Payment
     */
    concept: string;
    /**
     * Fecha de aplicación de la transferencia
     * @type {Date}
     * @memberof Payment
     */
    confirmDate: Date;
    /**
     * Código de moneda de la transferencia
     * @type {string}
     * @memberof Payment
     */
    currencyCode: string;
    /**
     * Mensaje proporcionado por Monex para la transferencia
     * @type {string}
     * @memberof Payment
     */
    detentionMessage: string;
    /**
     * Mensaje de error, en caso de algún error se informará aquí
     * @type {string}
     * @memberof Payment
     */
    errorMessage: string;
    /**
     * Descripción
     * @type {string}
     * @memberof Payment
     */
    monexDescription: string;
    /**
     * Identificador asignado por la aplciación a la transferencia
     * @type {string}
     * @memberof Payment
     */
    orderId: string;
    /**
     * Identificador de la orden de pago en Monex
     * @type {number}
     * @memberof Payment
     */
    paymentOrderId: number;
    /**
     * Razón de porque esta pendiente aun cuando se autorizó la transferencia
     * @type {string}
     * @memberof Payment
     */
    pendingReason: string;
    /**
     * Referencia numérica
     * @type {number}
     * @memberof Payment
     */
    reference: number;
    /**
     * Estado de la transferencia de la transferencia, los posibles valores son: PENDING, COMPLETED, FAILED, CANCELLED
     * @type {string}
     * @memberof Payment
     */
    statusCode: string;
    /**
     * Identificador de la transferencia asignado por Monex
     * @type {number}
     * @memberof Payment
     */
    transactionId: number;
}
/**
 * Objeto que contiene la información de solicitud de pago por CODI®.
 * @export
 * @interface PaymentRequestCodiResponseDTO
 */
export interface PaymentRequestCodiResponseDTO {
    /**
     * Monto del pago.
     * @type {number}
     * @memberof PaymentRequestCodiResponseDTO
     */
    amount: number;
    /**
     * Imagen QR en formato Base64 para el CODI®.
     * @type {string}
     * @memberof PaymentRequestCodiResponseDTO
     */
    barcodeBase64: string;
    /**
     * URL de la imagen QR para el CODI®.
     * @type {string}
     * @memberof PaymentRequestCodiResponseDTO
     */
    barcodeUrl: string;
    /**
     * Concepto de pago.
     * @type {string}
     * @memberof PaymentRequestCodiResponseDTO
     */
    concept: string;
    /**
     * Fecha de creación.
     * @type {Date}
     * @memberof PaymentRequestCodiResponseDTO
     */
    creationDate: Date;
    /**
     * Fecha de vencimiento.
     * @type {Date}
     * @memberof PaymentRequestCodiResponseDTO
     */
    dueDate: Date;
    /**
     * Listado de pagos realizados sobre la petición.
     * @type {Array<CodiOperationResponseDTO>}
     * @memberof PaymentRequestCodiResponseDTO
     */
    operations: Array<CodiOperationResponseDTO>;
    /**
     * OrderId asignada a la solicitud.
     * @type {string}
     * @memberof PaymentRequestCodiResponseDTO
     */
    orderId: string;
    /**
     * Numero de teléfono.
     * @type {string}
     * @memberof PaymentRequestCodiResponseDTO
     */
    phoneNumber: string;
    /**
     * Estatus de la orden de pago.
     * @type {string}
     * @memberof PaymentRequestCodiResponseDTO
     */
    status: string;
    /**
     * Tipo de petición.
     * @type {string}
     * @memberof PaymentRequestCodiResponseDTO
     */
    type: string;
}
/**
 *
 * @export
 * @interface PaymentsRequestId
 */
export interface PaymentsRequestId {
    /**
     * Fecha en que el usuario propietario del token emitió la autorización
     * @type {Date}
     * @memberof PaymentsRequestId
     */
    authorizationDate: Date;
    /**
     * Fecha en que se realizó la petición de registro de transacciones
     * @type {Date}
     * @memberof PaymentsRequestId
     */
    requestDate: Date;
    /**
     * Identificador de la petición del registro de transacciones
     * @type {string}
     * @memberof PaymentsRequestId
     */
    requestId: string;
    /**
     * Monto total de las transacciones registradas
     * @type {number}
     * @memberof PaymentsRequestId
     */
    totalAmount: number;
    /**
     * Total de transacciones en la petición
     * @type {number}
     * @memberof PaymentsRequestId
     */
    totalTransactions: number;
    /**
     * Lista de las transacciones registradas
     * @type {Array<Payment>}
     * @memberof PaymentsRequestId
     */
    transactions: Array<Payment>;
}
/**
 * Objeto que contiene los datos de la persona propietaria de la cuenta
 * @export
 * @interface Person
 */
export interface Person {
    /**
     * Apellido Materno del propietario de la cuenta
     * @type {string}
     * @memberof Person
     */
    lastName: string;
    /**
     * Apellido Paterno del propietario de la cuenta
     * @type {string}
     * @memberof Person
     */
    middleName: string;
    /**
     * Nombre(s) del propietario de la cuenta
     * @type {string}
     * @memberof Person
     */
    name: string;
}
/**
 *
 * @export
 * @interface PreEnrollmentData
 */
export interface PreEnrollmentData {
    /**
     * Url a la que se redirigirá en caso de un error
     * @type {string}
     * @memberof PreEnrollmentData
     */
    cancelReturnUrl: string;
    /**
     * Url a la que se redirigirá en caso de exito
     * @type {string}
     * @memberof PreEnrollmentData
     */
    returnUrl: string;
}
/**
 *
 * @export
 * @interface PreEnrollmentResponse
 */
export interface PreEnrollmentResponse {
    /**
     * Identificador público generado
     * @type {string}
     * @memberof PreEnrollmentResponse
     */
    subscriptionId: string;
    /**
     * Url para confirmación de enrolamiento
     * @type {string}
     * @memberof PreEnrollmentResponse
     */
    url: string;
}
/**
 * Información para obtener la URL para la autorización
 * @export
 * @interface PreMonexAuthorization
 */
export interface PreMonexAuthorization {
    /**
     * Razón social de asociada al RFC a la que debe pertenecer el contrato que se solicita
     * @type {string}
     * @memberof PreMonexAuthorization
     */
    businessName: string;
    /**
     * Url a la que se redirigira en caso de que el cliente cancele el registro
     * @type {string}
     * @memberof PreMonexAuthorization
     */
    cancelReturnUrl: string;
    /**
     * Url a la que se redirigirá en caso de exito
     * @type {string}
     * @memberof PreMonexAuthorization
     */
    returnUrl: string;
    /**
     * RFC de la empresa a la que debe pertenecer el contrato solicitado, si no se especifica este valor no se realiza validación
     * @type {string}
     * @memberof PreMonexAuthorization
     */
    rfc: string;
}
/**
 *
 * @export
 * @interface Relationship
 */
export interface Relationship {
    /**
     * Tipo de relación
     * @type {string}
     * @memberof Relationship
     */
    kindOfRelationship: string;
    /**
     * Nombre de la  relación
     * @type {string}
     * @memberof Relationship
     */
    relationship: string;
}
/**
 *
 * @export
 * @interface RelationshipsResponse
 */
export interface RelationshipsResponse {
    /**
     * Lista de relaciones del beneficiario
     * @type {Array<Relationship>}
     * @memberof RelationshipsResponse
     */
    relationships: Array<Relationship>;
}
/**
 * Objeto que contiene la información del punto de venta
 * @export
 * @interface SalesPoint
 */
export interface SalesPoint {
    /**
     * Cuenta CLABE
     * @type {string}
     * @memberof SalesPoint
     */
    account: string;
    /**
     * Nombre del punto de venta
     * @type {string}
     * @memberof SalesPoint
     */
    name: string;
    /**
     * Identificador del punto de venta
     * @type {string}
     * @memberof SalesPoint
     */
    salesPointId: string;
}
/**
 * Objeto que contiene la información del punto de venta encontrada
 * @export
 * @interface SalesPointFound
 */
export interface SalesPointFound {
    /**
     * Ip desde la que accede el punto de venta a wire4 y a la que se devuelven las notificaciones
     * @type {string}
     * @memberof SalesPointFound
     */
    accessIp: string;
    /**
     * Cuenta registra para el punto de venta
     * @type {string}
     * @memberof SalesPointFound
     */
    account: string;
    /**
     *
     * @type {Timestamp}
     * @memberof SalesPointFound
     */
    createdAt: Timestamp;
    /**
     * Nombre del punto de venta
     * @type {string}
     * @memberof SalesPointFound
     */
    name: string;
    /**
     * Identificador del punto de venta
     * @type {string}
     * @memberof SalesPointFound
     */
    publicId: string;
    /**
     * Estatus ACTIVO/INACTIVO el punto de venta
     * @type {string}
     * @memberof SalesPointFound
     */
    status: SalesPointFound.StatusEnum;
    /**
     *
     * @type {Timestamp}
     * @memberof SalesPointFound
     */
    updatedAt: Timestamp;
}
/**
 * @export
 * @namespace SalesPointFound
 */
export declare namespace SalesPointFound {
    /**
     * @export
     * @enum {string}
     */
    enum StatusEnum {
        ACTIVE,
        INACTIVE
    }
}
/**
 * Información para registrar un punto de venta asociado una empresa
 * @export
 * @interface SalesPointRequest
 */
export interface SalesPointRequest {
    /**
     * IP desde donde se recibiran las peticiones de este punto de venta
     * @type {string}
     * @memberof SalesPointRequest
     */
    accessIp: string;
    /**
     * Número de cuenta CLABE donde se realizará el deposito del cobro CoDi
     * @type {string}
     * @memberof SalesPointRequest
     */
    account: string;
    /**
     * Nombre del punto de venta
     * @type {string}
     * @memberof SalesPointRequest
     */
    name: string;
    /**
     * URL para envíar notificaciones CoDi al punto de venta
     * @type {string}
     * @memberof SalesPointRequest
     */
    notificationsUrl: string;
}
/**
 * Objeto que contiene la información del punto de venta que se registro.
 * @export
 * @interface SalesPointRespose
 */
export interface SalesPointRespose {
    /**
     * Identificador del punto de venta
     * @type {string}
     * @memberof SalesPointRespose
     */
    salesPointId: string;
    /**
     * Llave de usuario para el API Wire4
     * @type {string}
     * @memberof SalesPointRespose
     */
    userKey: string;
    /**
     * Contraseña para el API Wire4
     * @type {string}
     * @memberof SalesPointRespose
     */
    userSecret: string;
    /**
     *
     * @type {Webhook}
     * @memberof SalesPointRespose
     */
    webhook: Webhook;
}
/**
 *
 * @export
 * @interface SpidBeneficiariesResponse
 */
export interface SpidBeneficiariesResponse {
    /**
     * Lista de beneficiarios obtenidos
     * @type {Array<SpidBeneficiaryResponse>}
     * @memberof SpidBeneficiariesResponse
     */
    beneficiaries: Array<SpidBeneficiaryResponse>;
}
/**
 * Objeto que contiene información de la cuenta de beneficiario SPID
 * @export
 * @interface SpidBeneficiaryResponse
 */
export interface SpidBeneficiaryResponse {
    /**
     * Monto límite permitido para la cuenta
     * @type {number}
     * @memberof SpidBeneficiaryResponse
     */
    amountLimit: number;
    /**
     *
     * @type {Institution}
     * @memberof SpidBeneficiaryResponse
     */
    bank: Institution;
    /**
     * Cuenta del beneficiario debe ser una cuenta CLABE
     * @type {string}
     * @memberof SpidBeneficiaryResponse
     */
    beneficiaryAccount: string;
    /**
     * Lista de email's, este dato es opcional
     * @type {Array<string>}
     * @memberof SpidBeneficiaryResponse
     */
    email: Array<string>;
    /**
     *
     * @type {BeneficiaryInstitution}
     * @memberof SpidBeneficiaryResponse
     */
    institution: BeneficiaryInstitution;
    /**
     * Tipo de relación de la cuenta, este valor debe ser igual a uno de los obtenidos del recurso de consulta de relationships
     * @type {string}
     * @memberof SpidBeneficiaryResponse
     */
    kindOfRelationship: string;
    /**
     * Referencia numérica
     * @type {string}
     * @memberof SpidBeneficiaryResponse
     */
    numericReferenceSpid: string;
    /**
     * Concepto de pago
     * @type {string}
     * @memberof SpidBeneficiaryResponse
     */
    paymentConceptSpid: string;
    /**
     * La fecha en la que se registro el beneficiario
     * @type {Date}
     * @memberof SpidBeneficiaryResponse
     */
    registerDate: Date;
    /**
     * Código de relación de la cuenta, este valor debe ser igual a uno de los obtenidos del recurso de consulta de  relationship
     * @type {string}
     * @memberof SpidBeneficiaryResponse
     */
    relationship: string;
    /**
     * Registro federal de contribuyentes
     * @type {string}
     * @memberof SpidBeneficiaryResponse
     */
    rfc: string;
    /**
     * El estado en el que se encuentra el registo del beneficiario
     * @type {string}
     * @memberof SpidBeneficiaryResponse
     */
    status: string;
}
/**
 * La información acerca de la clasificación de la operación.
 * @export
 * @interface SpidClassificationDTO
 */
export interface SpidClassificationDTO {
    /**
     * El identificador de la clasificación
     * @type {string}
     * @memberof SpidClassificationDTO
     */
    classificationId: string;
    /**
     * Las descripción de la clasificación de la operación
     * @type {string}
     * @memberof SpidClassificationDTO
     */
    description: string;
}
/**
 *
 * @export
 * @interface SpidClassificationsResponseDTO
 */
export interface SpidClassificationsResponseDTO {
    /**
     * Lista de clasificaciones para operaciones con dólares (SPID)
     * @type {Array<SpidClassificationDTO>}
     * @memberof SpidClassificationsResponseDTO
     */
    classifications: Array<SpidClassificationDTO>;
}
/**
 *
 * @export
 * @interface Timestamp
 */
export interface Timestamp {
    /**
     *
     * @type {number}
     * @memberof Timestamp
     */
    date: number;
    /**
     *
     * @type {number}
     * @memberof Timestamp
     */
    day: number;
    /**
     *
     * @type {number}
     * @memberof Timestamp
     */
    hours: number;
    /**
     *
     * @type {number}
     * @memberof Timestamp
     */
    minutes: number;
    /**
     *
     * @type {number}
     * @memberof Timestamp
     */
    month: number;
    /**
     *
     * @type {number}
     * @memberof Timestamp
     */
    nanos: number;
    /**
     *
     * @type {number}
     * @memberof Timestamp
     */
    seconds: number;
    /**
     *
     * @type {number}
     * @memberof Timestamp
     */
    time: number;
    /**
     *
     * @type {number}
     * @memberof Timestamp
     */
    timezoneOffset: number;
    /**
     *
     * @type {number}
     * @memberof Timestamp
     */
    year: number;
}
/**
 * Respuesta con una url que requiere que un token sea capturado
 * @export
 * @interface TokenRequiredResponse
 */
export interface TokenRequiredResponse {
    /**
     * Identificador público generado para la petición
     * @type {string}
     * @memberof TokenRequiredResponse
     */
    requestId: string;
    /**
     * La url generada para confirmación de la operación
     * @type {string}
     * @memberof TokenRequiredResponse
     */
    url: string;
}
/**
 * Objeto que contiene la información de una transferencias SPEI de salida
 * @export
 * @interface TransactionOutgoing
 */
export interface TransactionOutgoing {
    /**
     * Monto de la transferencia
     * @type {number}
     * @memberof TransactionOutgoing
     */
    amount: number;
    /**
     * Cuenta del beneficiario, podría ser un número celular, TDD o Cuenta CLABE interbancaria
     * @type {string}
     * @memberof TransactionOutgoing
     */
    beneficiaryAccount: string;
    /**
     * La clave del banco beneficiario, proprocionada por BANXICO, este campo solo es obligatario cuando la cuenta beneficiaria es un número celular (*).
     * @type {string}
     * @memberof TransactionOutgoing
     */
    beneficiaryBankKey: string;
    /**
     * Concepto de la transferencia
     * @type {string}
     * @memberof TransactionOutgoing
     */
    concept: string;
    /**
     * Código de moneda en la que opera la cuenta
     * @type {string}
     * @memberof TransactionOutgoing
     */
    currencyCode: string;
    /**
     * Lista de email del beneficiario,es opcional
     * @type {Array<string>}
     * @memberof TransactionOutgoing
     */
    email: Array<string>;
    /**
     * Referencia de la transferencia asignada por el cliente
     * @type {string}
     * @memberof TransactionOutgoing
     */
    orderId: string;
    /**
     * Referencia numérica de la transferencia
     * @type {number}
     * @memberof TransactionOutgoing
     */
    reference: number;
}
/**
 * Objeto que contiene la información de una transferencias SPID de salida
 * @export
 * @interface TransactionOutgoingSpid
 */
export interface TransactionOutgoingSpid {
    /**
     * Monto de la transferencia
     * @type {number}
     * @memberof TransactionOutgoingSpid
     */
    amount: number;
    /**
     * Cuenta del beneficiario, podría ser un numero celular, TDD o Cuenta CLABE interbancaria
     * @type {string}
     * @memberof TransactionOutgoingSpid
     */
    beneficiaryAccount: string;
    /**
     * Url a la que se redirigirá en caso de error
     * @type {string}
     * @memberof TransactionOutgoingSpid
     */
    cancelReturnUrl: string;
    /**
     * El identificador de la clasificación de la transferencia SPID
     * @type {string}
     * @memberof TransactionOutgoingSpid
     */
    classificationId: string;
    /**
     * Código de moneda en la que opera la cuenta
     * @type {string}
     * @memberof TransactionOutgoingSpid
     */
    currencyCode: string;
    /**
     * Lista de email del beneficiario,es opcional
     * @type {Array<string>}
     * @memberof TransactionOutgoingSpid
     */
    email: Array<string>;
    /**
     * Referencia numérica de la transferencia
     * @type {number}
     * @memberof TransactionOutgoingSpid
     */
    numericReferenceSpid: number;
    /**
     * Referencia de la transferencia asignada por el cliente
     * @type {string}
     * @memberof TransactionOutgoingSpid
     */
    orderId: string;
    /**
     * Concepto de la transferencia
     * @type {string}
     * @memberof TransactionOutgoingSpid
     */
    paymentConceptSpid: string;
    /**
     * Url a la que se redirigirá en caso de exito
     * @type {string}
     * @memberof TransactionOutgoingSpid
     */
    returnUrl: string;
}
/**
 * Objeto que contiene la información de las transferencias SPEI de salida
 * @export
 * @interface TransactionsOutgoingRegister
 */
export interface TransactionsOutgoingRegister {
    /**
     * Url a la que se redirigirá en caso de error
     * @type {string}
     * @memberof TransactionsOutgoingRegister
     */
    cancelReturnUrl: string;
    /**
     * Url a la que se redirigirá en caso de exito
     * @type {string}
     * @memberof TransactionsOutgoingRegister
     */
    returnUrl: string;
    /**
     * Lista de transferencias de salida que se enviarán a Monex
     * @type {Array<TransactionOutgoing>}
     * @memberof TransactionsOutgoingRegister
     */
    transactions: Array<TransactionOutgoing>;
}
/**
 * Contiene el listado de grupo de configuraciones para actualizar
 * @export
 * @interface UpdateConfigurationsRequestDTO
 */
export interface UpdateConfigurationsRequestDTO {
    /**
     * Listado de configuraciones para actualizar
     * @type {Array<ConfigurationsLimits>}
     * @memberof UpdateConfigurationsRequestDTO
     */
    configurations: Array<ConfigurationsLimits>;
}
/**
 * Recibe las urls para redirigir en caso de exito o de error
 * @export
 * @interface UrlsRedirect
 */
export interface UrlsRedirect {
    /**
     * Url a la que se redirigira en caso de que el cliente cancele el registro
     * @type {string}
     * @memberof UrlsRedirect
     */
    cancelReturnUrl: string;
    /**
     * Url a la que se redireccionara en caso exitoso
     * @type {string}
     * @memberof UrlsRedirect
     */
    returnUrl: string;
}
/**
 * El usuario que corresponde al contrato
 * @export
 * @interface UserCompany
 */
export interface UserCompany {
    /**
     * Una lista de los correos del usuario
     * @type {Array<string>}
     * @memberof UserCompany
     */
    emails: Array<string>;
    /**
     * Indica sí es representate legal
     * @type {boolean}
     * @memberof UserCompany
     */
    legalRepresentative: boolean;
    /**
     * El nombre del usuario enmascarado
     * @type {string}
     * @memberof UserCompany
     */
    maskedName: string;
    /**
     * El nombre del usuario de acceso enmascarado
     * @type {string}
     * @memberof UserCompany
     */
    maskedUserName: string;
    /**
     * El nombre del usuario
     * @type {string}
     * @memberof UserCompany
     */
    name: string;
    /**
     * Una lista de los teléfonos del usuario
     * @type {Array<string>}
     * @memberof UserCompany
     */
    phoneNumbers: Array<string>;
    /**
     * El apellido paterno del usuario
     * @type {string}
     * @memberof UserCompany
     */
    surnameFather: string;
    /**
     * El apellido materno del usuario
     * @type {string}
     * @memberof UserCompany
     */
    surnameMother: string;
    /**
     * El nombre del usuario de acceso
     * @type {string}
     * @memberof UserCompany
     */
    userName: string;
}
/**
 * Webhook creado para notificaciones CoDi.
 * @export
 * @interface Webhook
 */
export interface Webhook {
    /**
     * Tipo de evento manejado por el webhook, para mas referencia sobre los tipos de eventos soportados, revise la siguiente liga: https://developers.wire4.mx/#section/Eventos.
     * @type {Array<string>}
     * @memberof Webhook
     */
    events: Array<string>;
    /**
     * Nombre del webhook.
     * @type {string}
     * @memberof Webhook
     */
    name: string;
    /**
     * Llave con la cual se debe de identificar que el webhook fue enviado por Wire4, para mayor información revisar la guía de notificaciones (https://wire4.mx/#/guides/notificaciones), en la sección de  \"Comprobación de firmas de Webhook\".
     * @type {string}
     * @memberof Webhook
     */
    secret: string;
    /**
     * Estatus en el que se encuentra el webhook.
     * @type {string}
     * @memberof Webhook
     */
    status: Webhook.StatusEnum;
    /**
     * URL a la cual Wire4 enviará las notificaciones cuando un evento ocurra.
     * @type {string}
     * @memberof Webhook
     */
    url: string;
    /**
     * Identificador del webhook.
     * @type {string}
     * @memberof Webhook
     */
    whId: string;
}
/**
 * @export
 * @namespace Webhook
 */
export declare namespace Webhook {
    /**
     * @export
     * @enum {string}
     */
    enum StatusEnum {
        ACTIVE,
        INACTIVE,
        DELETED
    }
}
/**
 * Objeto que contiene la información de un webhook.
 * @export
 * @interface WebhookRequest
 */
export interface WebhookRequest {
    /**
     * Tipos de eventos de los cuales Wire4 te enviará información, para mas referencia sobre los tipos de eventos soportados, revise la siguiente liga: https://developers.wire4.mx/#section/Eventos .
     * @type {Array<string>}
     * @memberof WebhookRequest
     */
    events: Array<string>;
    /**
     * Nombre del webhook.
     * @type {string}
     * @memberof WebhookRequest
     */
    name: string;
    /**
     * URL a la cual Wire4 enviará las notificaciones cuando un evento ocurra.
     * @type {string}
     * @memberof WebhookRequest
     */
    url: string;
}
/**
 * Objeto que contiene la información de un webhook.
 * @export
 * @interface WebhookResponse
 */
export interface WebhookResponse {
    /**
     * Tipos de eventos de los cuales Wire4 te enviará información.
     * @type {Array<string>}
     * @memberof WebhookResponse
     */
    events: Array<string>;
    /**
     * Nombre del webhook.
     * @type {string}
     * @memberof WebhookResponse
     */
    name: string;
    /**
     * Llave con la cual se debe de identificar que el webhook fue enviado por Wire4, para mayor información revisar la guía de notificaciones (https://wire4.mx/#/guides/notificaciones), en la sección de  \"Comprobación de firmas de Webhook\".
     * @type {string}
     * @memberof WebhookResponse
     */
    secret: string;
    /**
     * Estatus en el que se encuentra el webhook
     * @type {string}
     * @memberof WebhookResponse
     */
    status: WebhookResponse.StatusEnum;
    /**
     * URL a la cual Wire4 enviará las notificaciones cuando un evento ocurra.
     * @type {string}
     * @memberof WebhookResponse
     */
    url: string;
    /**
     * Identificador del webhook.
     * @type {string}
     * @memberof WebhookResponse
     */
    whUuid: string;
}
/**
 * @export
 * @namespace WebhookResponse
 */
export declare namespace WebhookResponse {
    /**
     * @export
     * @enum {string}
     */
    enum StatusEnum {
        ACTIVE,
        INACTIVE,
        DELETED
    }
}
/**
 *
 * @export
 * @interface WebhooksList
 */
export interface WebhooksList {
    /**
     * Lista de webhooks que se encuentran en estado 'ACTIVE' e 'INACTIVE'.
     * @type {Array<WebhookResponse>}
     * @memberof WebhooksList
     */
    webhooks: Array<WebhookResponse>;
}
/**
 * ComprobanteElectrnicoDePagoCEPApi - fetch parameter creator
 * @export
 */
export declare const ComprobanteElectrnicoDePagoCEPApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Consulta el CEP de un pago realizado a través del SPEI, si es que este se encuentra disponible en BANXICO.
     * @summary Consulta de CEP
     * @param {CepSearchBanxico} body Información para buscar un CEP
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainTransactionCepUsingPOST(body: CepSearchBanxico, authorization: string, options?: any): FetchArgs;
};
/**
 * ComprobanteElectrnicoDePagoCEPApi - functional programming interface
 * @export
 */
export declare const ComprobanteElectrnicoDePagoCEPApiFp: (configuration: Configuration) => {
    /**
     * Consulta el CEP de un pago realizado a través del SPEI, si es que este se encuentra disponible en BANXICO.
     * @summary Consulta de CEP
     * @param {CepSearchBanxico} body Información para buscar un CEP
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainTransactionCepUsingPOST(body: CepSearchBanxico, authorization: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<CepResponse>;
};
/**
 * ComprobanteElectrnicoDePagoCEPApi - factory interface
 * @export
 */
export declare const ComprobanteElectrnicoDePagoCEPApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Consulta el CEP de un pago realizado a través del SPEI, si es que este se encuentra disponible en BANXICO.
     * @summary Consulta de CEP
     * @param {CepSearchBanxico} body Información para buscar un CEP
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainTransactionCepUsingPOST(body: CepSearchBanxico, authorization: string, options: any): Promise<CepResponse>;
};
/**
 * ComprobanteElectrnicoDePagoCEPApi - interface
 * @export
 * @interface ComprobanteElectrnicoDePagoCEPApi
 */
export interface ComprobanteElectrnicoDePagoCEPApiInterface {
    /**
     * Consulta el CEP de un pago realizado a través del SPEI, si es que este se encuentra disponible en BANXICO.
     * @summary Consulta de CEP
     * @param {CepSearchBanxico} body Información para buscar un CEP
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ComprobanteElectrnicoDePagoCEPApiInterface
     */
    obtainTransactionCepUsingPOST(body: CepSearchBanxico, authorization: string, options: any): Promise<CepResponse>;
}
/**
 * ComprobanteElectrnicoDePagoCEPApi - object-oriented interface
 * @export
 * @class ComprobanteElectrnicoDePagoCEPApi
 * @extends {BaseAPI}
 */
export declare class ComprobanteElectrnicoDePagoCEPApi extends BaseAPI implements ComprobanteElectrnicoDePagoCEPApiInterface {
    /**
     * Consulta el CEP de un pago realizado a través del SPEI, si es que este se encuentra disponible en BANXICO.
     * @summary Consulta de CEP
     * @param {CepSearchBanxico} body Información para buscar un CEP
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ComprobanteElectrnicoDePagoCEPApi
     */
    obtainTransactionCepUsingPOST(body: CepSearchBanxico, authorization: string, options: any): Promise<CepResponse>;
}
/**
 * ContactoApi - fetch parameter creator
 * @export
 */
export declare const ContactoApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Notifica a un asesor Monex para que se ponga en contacto con un posible cliente.
     * @summary Solicitud de contacto
     * @param {ContactRequest} body Información del contacto
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sendContactUsingPOST(body: ContactRequest, authorization: string, options?: any): FetchArgs;
};
/**
 * ContactoApi - functional programming interface
 * @export
 */
export declare const ContactoApiFp: (configuration: Configuration) => {
    /**
     * Notifica a un asesor Monex para que se ponga en contacto con un posible cliente.
     * @summary Solicitud de contacto
     * @param {ContactRequest} body Información del contacto
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sendContactUsingPOST(body: ContactRequest, authorization: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Response>;
};
/**
 * ContactoApi - factory interface
 * @export
 */
export declare const ContactoApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Notifica a un asesor Monex para que se ponga en contacto con un posible cliente.
     * @summary Solicitud de contacto
     * @param {ContactRequest} body Información del contacto
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    sendContactUsingPOST(body: ContactRequest, authorization: string, options: any): Promise<Response>;
};
/**
 * ContactoApi - interface
 * @export
 * @interface ContactoApi
 */
export interface ContactoApiInterface {
    /**
     * Notifica a un asesor Monex para que se ponga en contacto con un posible cliente.
     * @summary Solicitud de contacto
     * @param {ContactRequest} body Información del contacto
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContactoApiInterface
     */
    sendContactUsingPOST(body: ContactRequest, authorization: string, options: any): Promise<{}>;
}
/**
 * ContactoApi - object-oriented interface
 * @export
 * @class ContactoApi
 * @extends {BaseAPI}
 */
export declare class ContactoApi extends BaseAPI implements ContactoApiInterface {
    /**
     * Notifica a un asesor Monex para que se ponga en contacto con un posible cliente.
     * @summary Solicitud de contacto
     * @param {ContactRequest} body Información del contacto
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContactoApi
     */
    sendContactUsingPOST(body: ContactRequest, authorization: string, options: any): Promise<Response>;
}
/**
 * ContractsDetailsApi - fetch parameter creator
 * @export
 */
export declare const ContractsDetailsApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Se obtiene la URL para la autorización del usuario Monex.
     * @summary Devuelve la URL para autorización del usuario Monex
     * @param {PreMonexAuthorization} body Información para la autorización
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createAuthorization(body: PreMonexAuthorization, authorization: string, options?: any): FetchArgs;
    /**
     * Obtienen los detalles de los usuarios autorizados de Monex.
     * @summary Obtiene los usuarios autorizados
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {string} requestId El identificador de la petición a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainAuthorizedUsers(authorization: string, X_ACCESS_KEY: string, requestId: string, options?: any): FetchArgs;
    /**
     * Obtienen los detalles de los usuarios autorizados por contrato Monex.
     * @summary Obtiene los usuarios autorizados por contrato
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {string} [contract] El contrato Monex
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainAuthorizedUsersByContract(authorization: string, X_ACCESS_KEY: string, contract: string, options?: any): FetchArgs;
    /**
     * Detalles de la compañía relacionada con el contrato de Monex.
     * @summary Obtiene los detalles de la empresa del contrato
     * @param {ContractDetailRequest} body Información para obtener los detalles de la companía
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainContractDetails(body: ContractDetailRequest, authorization: string, X_ACCESS_KEY: string, options?: any): FetchArgs;
};
/**
 * ContractsDetailsApi - functional programming interface
 * @export
 */
export declare const ContractsDetailsApiFp: (configuration: Configuration) => {
    /**
     * Se obtiene la URL para la autorización del usuario Monex.
     * @summary Devuelve la URL para autorización del usuario Monex
     * @param {PreMonexAuthorization} body Información para la autorización
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createAuthorization(body: PreMonexAuthorization, authorization: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<TokenRequiredResponse>;
    /**
     * Obtienen los detalles de los usuarios autorizados de Monex.
     * @summary Obtiene los usuarios autorizados
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {string} requestId El identificador de la petición a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainAuthorizedUsers(authorization: string, X_ACCESS_KEY: string, requestId: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Array<AuthorizedUsers>>;
    /**
     * Obtienen los detalles de los usuarios autorizados por contrato Monex.
     * @summary Obtiene los usuarios autorizados por contrato
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {string} [contract] El contrato Monex
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainAuthorizedUsersByContract(authorization: string, X_ACCESS_KEY: string, contract: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Array<AuthorizedUsers>>;
    /**
     * Detalles de la compañía relacionada con el contrato de Monex.
     * @summary Obtiene los detalles de la empresa del contrato
     * @param {ContractDetailRequest} body Información para obtener los detalles de la companía
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainContractDetails(body: ContractDetailRequest, authorization: string, X_ACCESS_KEY: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<ContractDetailResponse>;
};
/**
 * ContractsDetailsApi - factory interface
 * @export
 */
export declare const ContractsDetailsApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Se obtiene la URL para la autorización del usuario Monex.
     * @summary Devuelve la URL para autorización del usuario Monex
     * @param {PreMonexAuthorization} body Información para la autorización
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createAuthorization(body: PreMonexAuthorization, authorization: string, options: any): Promise<TokenRequiredResponse>;
    /**
     * Obtienen los detalles de los usuarios autorizados de Monex.
     * @summary Obtiene los usuarios autorizados
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {string} requestId El identificador de la petición a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainAuthorizedUsers(authorization: string, X_ACCESS_KEY: string, requestId: string, options: any): Promise<AuthorizedUsers[]>;
    /**
     * Obtienen los detalles de los usuarios autorizados por contrato Monex.
     * @summary Obtiene los usuarios autorizados por contrato
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {string} [contract] El contrato Monex
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainAuthorizedUsersByContract(authorization: string, X_ACCESS_KEY: string, contract: string, options: any): Promise<AuthorizedUsers[]>;
    /**
     * Detalles de la compañía relacionada con el contrato de Monex.
     * @summary Obtiene los detalles de la empresa del contrato
     * @param {ContractDetailRequest} body Información para obtener los detalles de la companía
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainContractDetails(body: ContractDetailRequest, authorization: string, X_ACCESS_KEY: string, options: any): Promise<ContractDetailResponse>;
};
/**
 * ContractsDetailsApi - interface
 * @export
 * @interface ContractsDetailsApi
 */
export interface ContractsDetailsApiInterface {
    /**
     * Se obtiene la URL para la autorización del usuario Monex.
     * @summary Devuelve la URL para autorización del usuario Monex
     * @param {PreMonexAuthorization} body Información para la autorización
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContractsDetailsApiInterface
     */
    createAuthorization(body: PreMonexAuthorization, authorization: string, options: any): Promise<TokenRequiredResponse>;
    /**
     * Obtienen los detalles de los usuarios autorizados de Monex.
     * @summary Obtiene los usuarios autorizados
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {string} requestId El identificador de la petición a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContractsDetailsApiInterface
     */
    obtainAuthorizedUsers(authorization: string, X_ACCESS_KEY: string, requestId: string, options: any): Promise<Array<AuthorizedUsers>>;
    /**
     * Obtienen los detalles de los usuarios autorizados por contrato Monex.
     * @summary Obtiene los usuarios autorizados por contrato
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {string} [contract] El contrato Monex
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContractsDetailsApiInterface
     */
    obtainAuthorizedUsersByContract(authorization: string, X_ACCESS_KEY: string, contract: string, options: any): Promise<Array<AuthorizedUsers>>;
    /**
     * Detalles de la compañía relacionada con el contrato de Monex.
     * @summary Obtiene los detalles de la empresa del contrato
     * @param {ContractDetailRequest} body Información para obtener los detalles de la companía
     * @param {string} authorization Header para token
     * @param {string} X_ACCESS_KEY La llave de acceso de la aplicación
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContractsDetailsApiInterface
     */
    obtainContractDetails(body: ContractDetailRequest, authorization: string, X_ACCESS_KEY: string, options: any): Promise<ContractDetailResponse>;
}
/**
 * ContractsDetailsApi - object-oriented interface
 * @export
 * @class ContractsDetailsApi
 * @extends {BaseAPI}
 */
export declare class ContractsDetailsApi extends BaseAPI implements ContractsDetailsApiInterface {
    /**
     * Se obtiene la URL para la autorización del usuario Monex.
     * @summary Devuelve la URL para autorización del usuario Monex
     * @param {PreMonexAuthorization} body Información para la autorización
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContractsDetailsApi
     */
    createAuthorization(body: PreMonexAuthorization, authorization: string, options: any): Promise<TokenRequiredResponse>;
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
    obtainAuthorizedUsers(authorization: string, X_ACCESS_KEY: string, requestId: string, options: any): Promise<AuthorizedUsers[]>;
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
    obtainAuthorizedUsersByContract(authorization: string, X_ACCESS_KEY: string, contract: string, options: any): Promise<AuthorizedUsers[]>;
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
    obtainContractDetails(body: ContractDetailRequest, authorization: string, X_ACCESS_KEY: string, options: any): Promise<ContractDetailResponse>;
}
/**
 * CuentasDeBeneficiariosSPEIApi - fetch parameter creator
 * @export
 */
export declare const CuentasDeBeneficiariosSPEIApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Solicta autorizar las cuentas de beneficiarios en estado pendiente agrupandolas en un set de cuentas que pueden incluir tanto cuentas de SPI como de SPID, debe indicar las urls de redireccion en caso de error y en caso de exito<br/>
     * @summary Recibe la solicitud para agrupar las cuentas SPEI/SPID de beneficiarios en estado pendiente que deben ser autorizadas
     * @param {UrlsRedirect} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    authorizeAccountsPendingPUT(body: UrlsRedirect, authorization: string, subscription: string, options?: any): FetchArgs;
    /**
     * Borra la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción. La cuenta a borrar debe ser una cuenta que opere con SPEI.
     * @summary Elimina la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} account La cuenta del beneciario que será eliminada
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteAccountUsingDELETE(authorization: string, account: string, subscription: string, options?: any): FetchArgs;
    /**
     * Obtiene las posibles relaciones existentes para registrar beneficiarios en Monex. Se debe invocar este recurso antes de pre-registrar una cuenta de beneficiario.
     * @summary Consulta de relaciones
     * @param {string} authorization Header para token
     * @param {string} subscription Identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAvailableRelationshipsMonexUsingGET(authorization: string, subscription: string, options?: any): FetchArgs;
    /**
     * Obtiene los beneficiarios enviados para registro en una petición al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex, que pertenezcan a la petición que se solicita.
     * @summary Consulta los beneficiarios por el identificador de la petición de registro
     * @param {string} authorization Header para token
     * @param {string} requestId El identificador de la petición del registro de beneficiarios a esta API
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBeneficiariesByRequestId(authorization: string, requestId: string, subscription: string, options?: any): FetchArgs;
    /**
     * Obtiene los beneficiarios registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
     * @summary Consulta los beneficiarios registrados
     * @param {string} authorization Header para token
     * @param {string} [account] Cuenta del beneficiario, puede ser Clabe, TDD o Celular
     * @param {string} [beneficiaryBank] Clave del banco beneficiario
     * @param {string} [beneficiaryName] Nombre del beneficiario
     * @param {string} [endDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [initDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [rfc] RFC del beneficiario
     * @param {string} [status] Estatus de la cuenta
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBeneficiariesForAccountUsingGET(authorization: string, account: string, beneficiaryBank: string, beneficiaryName: string, endDate: string, initDate: string, rfc: string, status: string, subscription: string, options?: any): FetchArgs;
    /**
     * Pre-registra una o más cuentas de beneficiario en la plataforma, proporcionando una URL donde el cuentahabiente Monex debe ingresar un valor de su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/>Los posibles valores de <i>relationship</i> y <i>kind_of_relationship</i> se deben  obtener de /subscriptions/{subscription}/beneficiaries/relationships.<br/><br/>La confirmación de registro en Monex se realiza a través de una llamada a los webhooks registrados con el evento ACCOUNT.CREATED.
     * @summary Pre-registro de cuentas de beneficiarios.
     * @param {AccountRequest} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    preRegisterAccountsUsingPOST(body: AccountRequest, authorization: string, subscription: string, options?: any): FetchArgs;
    /**
     * Elimina un conjunto de beneficiarios a registrar en la cuenta del cliente Monex relacionada a la suscripción, los beneficiarios no deben haber sido confirmados por el cliente.
     * @summary Eliminación de beneficiarios SPEI® sin confirmar
     * @param {string} authorization Header para token
     * @param {string} requestId Identificador de los beneficiarios a eliminar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    removeBeneficiariesPendingUsingDELETE(authorization: string, requestId: string, subscription: string, options?: any): FetchArgs;
    /**
     * Inicia una solicitud para actualizar el monto límite a la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción.
     * @summary Solicitud para actualizar el monto límite
     * @param {AmountRequest} body Información de la cuenta y el monto límite a actualizar
     * @param {string} authorization Header para token
     * @param {string} account Cuenta a actualizar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateAmountLimitAccountUsingPUT(body: AmountRequest, authorization: string, account: string, subscription: string, options?: any): FetchArgs;
};
/**
 * CuentasDeBeneficiariosSPEIApi - functional programming interface
 * @export
 */
export declare const CuentasDeBeneficiariosSPEIApiFp: (configuration: Configuration) => {
    /**
     * Solicta autorizar las cuentas de beneficiarios en estado pendiente agrupandolas en un set de cuentas que pueden incluir tanto cuentas de SPI como de SPID, debe indicar las urls de redireccion en caso de error y en caso de exito<br/>
     * @summary Recibe la solicitud para agrupar las cuentas SPEI/SPID de beneficiarios en estado pendiente que deben ser autorizadas
     * @param {UrlsRedirect} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    authorizeAccountsPendingPUT(body: UrlsRedirect, authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<AuthorizedBeneficiariesResponse>;
    /**
     * Borra la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción. La cuenta a borrar debe ser una cuenta que opere con SPEI.
     * @summary Elimina la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} account La cuenta del beneciario que será eliminada
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteAccountUsingDELETE(authorization: string, account: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Response>;
    /**
     * Obtiene las posibles relaciones existentes para registrar beneficiarios en Monex. Se debe invocar este recurso antes de pre-registrar una cuenta de beneficiario.
     * @summary Consulta de relaciones
     * @param {string} authorization Header para token
     * @param {string} subscription Identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAvailableRelationshipsMonexUsingGET(authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<RelationshipsResponse>;
    /**
     * Obtiene los beneficiarios enviados para registro en una petición al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex, que pertenezcan a la petición que se solicita.
     * @summary Consulta los beneficiarios por el identificador de la petición de registro
     * @param {string} authorization Header para token
     * @param {string} requestId El identificador de la petición del registro de beneficiarios a esta API
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBeneficiariesByRequestId(authorization: string, requestId: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<BeneficiariesResponse>;
    /**
     * Obtiene los beneficiarios registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
     * @summary Consulta los beneficiarios registrados
     * @param {string} authorization Header para token
     * @param {string} [account] Cuenta del beneficiario, puede ser Clabe, TDD o Celular
     * @param {string} [beneficiaryBank] Clave del banco beneficiario
     * @param {string} [beneficiaryName] Nombre del beneficiario
     * @param {string} [endDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [initDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [rfc] RFC del beneficiario
     * @param {string} [status] Estatus de la cuenta
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBeneficiariesForAccountUsingGET(authorization: string, account: string, beneficiaryBank: string, beneficiaryName: string, endDate: string, initDate: string, rfc: string, status: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<BeneficiariesResponse>;
    /**
     * Pre-registra una o más cuentas de beneficiario en la plataforma, proporcionando una URL donde el cuentahabiente Monex debe ingresar un valor de su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/>Los posibles valores de <i>relationship</i> y <i>kind_of_relationship</i> se deben  obtener de /subscriptions/{subscription}/beneficiaries/relationships.<br/><br/>La confirmación de registro en Monex se realiza a través de una llamada a los webhooks registrados con el evento ACCOUNT.CREATED.
     * @summary Pre-registro de cuentas de beneficiarios.
     * @param {AccountRequest} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    preRegisterAccountsUsingPOST(body: AccountRequest, authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<TokenRequiredResponse>;
    /**
     * Elimina un conjunto de beneficiarios a registrar en la cuenta del cliente Monex relacionada a la suscripción, los beneficiarios no deben haber sido confirmados por el cliente.
     * @summary Eliminación de beneficiarios SPEI® sin confirmar
     * @param {string} authorization Header para token
     * @param {string} requestId Identificador de los beneficiarios a eliminar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    removeBeneficiariesPendingUsingDELETE(authorization: string, requestId: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Response>;
    /**
     * Inicia una solicitud para actualizar el monto límite a la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción.
     * @summary Solicitud para actualizar el monto límite
     * @param {AmountRequest} body Información de la cuenta y el monto límite a actualizar
     * @param {string} authorization Header para token
     * @param {string} account Cuenta a actualizar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateAmountLimitAccountUsingPUT(body: AmountRequest, authorization: string, account: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<TokenRequiredResponse>;
};
/**
 * CuentasDeBeneficiariosSPEIApi - factory interface
 * @export
 */
export declare const CuentasDeBeneficiariosSPEIApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Solicta autorizar las cuentas de beneficiarios en estado pendiente agrupandolas en un set de cuentas que pueden incluir tanto cuentas de SPI como de SPID, debe indicar las urls de redireccion en caso de error y en caso de exito<br/>
     * @summary Recibe la solicitud para agrupar las cuentas SPEI/SPID de beneficiarios en estado pendiente que deben ser autorizadas
     * @param {UrlsRedirect} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    authorizeAccountsPendingPUT(body: UrlsRedirect, authorization: string, subscription: string, options: any): Promise<AuthorizedBeneficiariesResponse>;
    /**
     * Borra la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción. La cuenta a borrar debe ser una cuenta que opere con SPEI.
     * @summary Elimina la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} account La cuenta del beneciario que será eliminada
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteAccountUsingDELETE(authorization: string, account: string, subscription: string, options: any): Promise<Response>;
    /**
     * Obtiene las posibles relaciones existentes para registrar beneficiarios en Monex. Se debe invocar este recurso antes de pre-registrar una cuenta de beneficiario.
     * @summary Consulta de relaciones
     * @param {string} authorization Header para token
     * @param {string} subscription Identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAvailableRelationshipsMonexUsingGET(authorization: string, subscription: string, options: any): Promise<RelationshipsResponse>;
    /**
     * Obtiene los beneficiarios enviados para registro en una petición al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex, que pertenezcan a la petición que se solicita.
     * @summary Consulta los beneficiarios por el identificador de la petición de registro
     * @param {string} authorization Header para token
     * @param {string} requestId El identificador de la petición del registro de beneficiarios a esta API
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBeneficiariesByRequestId(authorization: string, requestId: string, subscription: string, options: any): Promise<BeneficiariesResponse>;
    /**
     * Obtiene los beneficiarios registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
     * @summary Consulta los beneficiarios registrados
     * @param {string} authorization Header para token
     * @param {string} [account] Cuenta del beneficiario, puede ser Clabe, TDD o Celular
     * @param {string} [beneficiaryBank] Clave del banco beneficiario
     * @param {string} [beneficiaryName] Nombre del beneficiario
     * @param {string} [endDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [initDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [rfc] RFC del beneficiario
     * @param {string} [status] Estatus de la cuenta
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBeneficiariesForAccountUsingGET(authorization: string, account: string, beneficiaryBank: string, beneficiaryName: string, endDate: string, initDate: string, rfc: string, status: string, subscription: string, options: any): Promise<BeneficiariesResponse>;
    /**
     * Pre-registra una o más cuentas de beneficiario en la plataforma, proporcionando una URL donde el cuentahabiente Monex debe ingresar un valor de su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/>Los posibles valores de <i>relationship</i> y <i>kind_of_relationship</i> se deben  obtener de /subscriptions/{subscription}/beneficiaries/relationships.<br/><br/>La confirmación de registro en Monex se realiza a través de una llamada a los webhooks registrados con el evento ACCOUNT.CREATED.
     * @summary Pre-registro de cuentas de beneficiarios.
     * @param {AccountRequest} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    preRegisterAccountsUsingPOST(body: AccountRequest, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
    /**
     * Elimina un conjunto de beneficiarios a registrar en la cuenta del cliente Monex relacionada a la suscripción, los beneficiarios no deben haber sido confirmados por el cliente.
     * @summary Eliminación de beneficiarios SPEI® sin confirmar
     * @param {string} authorization Header para token
     * @param {string} requestId Identificador de los beneficiarios a eliminar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    removeBeneficiariesPendingUsingDELETE(authorization: string, requestId: string, subscription: string, options: any): Promise<Response>;
    /**
     * Inicia una solicitud para actualizar el monto límite a la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción.
     * @summary Solicitud para actualizar el monto límite
     * @param {AmountRequest} body Información de la cuenta y el monto límite a actualizar
     * @param {string} authorization Header para token
     * @param {string} account Cuenta a actualizar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateAmountLimitAccountUsingPUT(body: AmountRequest, authorization: string, account: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
};
/**
 * CuentasDeBeneficiariosSPEIApi - interface
 * @export
 * @interface CuentasDeBeneficiariosSPEIApi
 */
export interface CuentasDeBeneficiariosSPEIApiInterface {
    /**
     * Solicta autorizar las cuentas de beneficiarios en estado pendiente agrupandolas en un set de cuentas que pueden incluir tanto cuentas de SPI como de SPID, debe indicar las urls de redireccion en caso de error y en caso de exito<br/>
     * @summary Recibe la solicitud para agrupar las cuentas SPEI/SPID de beneficiarios en estado pendiente que deben ser autorizadas
     * @param {UrlsRedirect} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApiInterface
     */
    authorizeAccountsPendingPUT(body: UrlsRedirect, authorization: string, subscription: string, options: any): Promise<AuthorizedBeneficiariesResponse>;
    /**
     * Borra la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción. La cuenta a borrar debe ser una cuenta que opere con SPEI.
     * @summary Elimina la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} account La cuenta del beneciario que será eliminada
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApiInterface
     */
    deleteAccountUsingDELETE(authorization: string, account: string, subscription: string, options: any): Promise<{}>;
    /**
     * Obtiene las posibles relaciones existentes para registrar beneficiarios en Monex. Se debe invocar este recurso antes de pre-registrar una cuenta de beneficiario.
     * @summary Consulta de relaciones
     * @param {string} authorization Header para token
     * @param {string} subscription Identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApiInterface
     */
    getAvailableRelationshipsMonexUsingGET(authorization: string, subscription: string, options: any): Promise<RelationshipsResponse>;
    /**
     * Obtiene los beneficiarios enviados para registro en una petición al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex, que pertenezcan a la petición que se solicita.
     * @summary Consulta los beneficiarios por el identificador de la petición de registro
     * @param {string} authorization Header para token
     * @param {string} requestId El identificador de la petición del registro de beneficiarios a esta API
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApiInterface
     */
    getBeneficiariesByRequestId(authorization: string, requestId: string, subscription: string, options: any): Promise<BeneficiariesResponse>;
    /**
     * Obtiene los beneficiarios registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
     * @summary Consulta los beneficiarios registrados
     * @param {string} authorization Header para token
     * @param {string} [account] Cuenta del beneficiario, puede ser Clabe, TDD o Celular
     * @param {string} [beneficiaryBank] Clave del banco beneficiario
     * @param {string} [beneficiaryName] Nombre del beneficiario
     * @param {string} [endDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [initDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [rfc] RFC del beneficiario
     * @param {string} [status] Estatus de la cuenta
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApiInterface
     */
    getBeneficiariesForAccountUsingGET(authorization: string, account: string, beneficiaryBank: string, beneficiaryName: string, endDate: string, initDate: string, rfc: string, status: string, subscription: string, options: any): Promise<BeneficiariesResponse>;
    /**
     * Pre-registra una o más cuentas de beneficiario en la plataforma, proporcionando una URL donde el cuentahabiente Monex debe ingresar un valor de su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/>Los posibles valores de <i>relationship</i> y <i>kind_of_relationship</i> se deben  obtener de /subscriptions/{subscription}/beneficiaries/relationships.<br/><br/>La confirmación de registro en Monex se realiza a través de una llamada a los webhooks registrados con el evento ACCOUNT.CREATED.
     * @summary Pre-registro de cuentas de beneficiarios.
     * @param {AccountRequest} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApiInterface
     */
    preRegisterAccountsUsingPOST(body: AccountRequest, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
    /**
     * Elimina un conjunto de beneficiarios a registrar en la cuenta del cliente Monex relacionada a la suscripción, los beneficiarios no deben haber sido confirmados por el cliente.
     * @summary Eliminación de beneficiarios SPEI® sin confirmar
     * @param {string} authorization Header para token
     * @param {string} requestId Identificador de los beneficiarios a eliminar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApiInterface
     */
    removeBeneficiariesPendingUsingDELETE(authorization: string, requestId: string, subscription: string, options: any): Promise<{}>;
    /**
     * Inicia una solicitud para actualizar el monto límite a la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción.
     * @summary Solicitud para actualizar el monto límite
     * @param {AmountRequest} body Información de la cuenta y el monto límite a actualizar
     * @param {string} authorization Header para token
     * @param {string} account Cuenta a actualizar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApiInterface
     */
    updateAmountLimitAccountUsingPUT(body: AmountRequest, authorization: string, account: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
}
/**
 * CuentasDeBeneficiariosSPEIApi - object-oriented interface
 * @export
 * @class CuentasDeBeneficiariosSPEIApi
 * @extends {BaseAPI}
 */
export declare class CuentasDeBeneficiariosSPEIApi extends BaseAPI implements CuentasDeBeneficiariosSPEIApiInterface {
    /**
     * Solicta autorizar las cuentas de beneficiarios en estado pendiente agrupandolas en un set de cuentas que pueden incluir tanto cuentas de SPI como de SPID, debe indicar las urls de redireccion en caso de error y en caso de exito<br/>
     * @summary Recibe la solicitud para agrupar las cuentas SPEI/SPID de beneficiarios en estado pendiente que deben ser autorizadas
     * @param {UrlsRedirect} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    authorizeAccountsPendingPUT(body: UrlsRedirect, authorization: string, subscription: string, options: any): Promise<AuthorizedBeneficiariesResponse>;
    /**
     * Borra la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción. La cuenta a borrar debe ser una cuenta que opere con SPEI.
     * @summary Elimina la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} account La cuenta del beneciario que será eliminada
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    deleteAccountUsingDELETE(authorization: string, account: string, subscription: string, options: any): Promise<Response>;
    /**
     * Obtiene las posibles relaciones existentes para registrar beneficiarios en Monex. Se debe invocar este recurso antes de pre-registrar una cuenta de beneficiario.
     * @summary Consulta de relaciones
     * @param {string} authorization Header para token
     * @param {string} subscription Identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    getAvailableRelationshipsMonexUsingGET(authorization: string, subscription: string, options: any): Promise<RelationshipsResponse>;
    /**
     * Obtiene los beneficiarios enviados para registro en una petición al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex, que pertenezcan a la petición que se solicita.
     * @summary Consulta los beneficiarios por el identificador de la petición de registro
     * @param {string} authorization Header para token
     * @param {string} requestId El identificador de la petición del registro de beneficiarios a esta API
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    getBeneficiariesByRequestId(authorization: string, requestId: string, subscription: string, options: any): Promise<BeneficiariesResponse>;
    /**
     * Obtiene los beneficiarios registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
     * @summary Consulta los beneficiarios registrados
     * @param {string} authorization Header para token
     * @param {string} [account] Cuenta del beneficiario, puede ser Clabe, TDD o Celular
     * @param {string} [beneficiaryBank] Clave del banco beneficiario
     * @param {string} [beneficiaryName] Nombre del beneficiario
     * @param {string} [endDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [initDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [rfc] RFC del beneficiario
     * @param {string} [status] Estatus de la cuenta
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    getBeneficiariesForAccountUsingGET(authorization: string, account: string, beneficiaryBank: string, beneficiaryName: string, endDate: string, initDate: string, rfc: string, status: string, subscription: string, options: any): Promise<BeneficiariesResponse>;
    /**
     * Pre-registra una o más cuentas de beneficiario en la plataforma, proporcionando una URL donde el cuentahabiente Monex debe ingresar un valor de su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/>Los posibles valores de <i>relationship</i> y <i>kind_of_relationship</i> se deben  obtener de /subscriptions/{subscription}/beneficiaries/relationships.<br/><br/>La confirmación de registro en Monex se realiza a través de una llamada a los webhooks registrados con el evento ACCOUNT.CREATED.
     * @summary Pre-registro de cuentas de beneficiarios.
     * @param {AccountRequest} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    preRegisterAccountsUsingPOST(body: AccountRequest, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
    /**
     * Elimina un conjunto de beneficiarios a registrar en la cuenta del cliente Monex relacionada a la suscripción, los beneficiarios no deben haber sido confirmados por el cliente.
     * @summary Eliminación de beneficiarios SPEI® sin confirmar
     * @param {string} authorization Header para token
     * @param {string} requestId Identificador de los beneficiarios a eliminar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    removeBeneficiariesPendingUsingDELETE(authorization: string, requestId: string, subscription: string, options: any): Promise<Response>;
    /**
     * Inicia una solicitud para actualizar el monto límite a la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción.
     * @summary Solicitud para actualizar el monto límite
     * @param {AmountRequest} body Información de la cuenta y el monto límite a actualizar
     * @param {string} authorization Header para token
     * @param {string} account Cuenta a actualizar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPEIApi
     */
    updateAmountLimitAccountUsingPUT(body: AmountRequest, authorization: string, account: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
}
/**
 * CuentasDeBeneficiariosSPIDApi - fetch parameter creator
 * @export
 */
export declare const CuentasDeBeneficiariosSPIDApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Obtiene los beneficiarios SPID registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
     * @summary Consulta los beneficiarios SPID registrados
     * @param {string} authorization Header para token
     * @param {string} [account] Cuenta del beneficiario, puede ser Clabe, TDD o Celular
     * @param {string} [beneficiaryBank] Clave del banco beneficiario
     * @param {string} [beneficiaryName] Nombre del beneficiario
     * @param {string} [endDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [initDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [rfc] RFC del beneficiario
     * @param {string} [status] Estatus de la cuenta
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getSpidBeneficiariesForAccount(authorization: string, account: string, beneficiaryBank: string, beneficiaryName: string, endDate: string, initDate: string, rfc: string, status: string, subscription: string, options?: any): FetchArgs;
    /**
     *
     * @summary Pre-registro de cuentas de beneficiarios SPID
     * @param {AccountSpid} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    preRegisterAccountsUsingPOST1(body: AccountSpid, authorization: string, subscription: string, options?: any): FetchArgs;
};
/**
 * CuentasDeBeneficiariosSPIDApi - functional programming interface
 * @export
 */
export declare const CuentasDeBeneficiariosSPIDApiFp: (configuration: Configuration) => {
    /**
     * Obtiene los beneficiarios SPID registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
     * @summary Consulta los beneficiarios SPID registrados
     * @param {string} authorization Header para token
     * @param {string} [account] Cuenta del beneficiario, puede ser Clabe, TDD o Celular
     * @param {string} [beneficiaryBank] Clave del banco beneficiario
     * @param {string} [beneficiaryName] Nombre del beneficiario
     * @param {string} [endDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [initDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [rfc] RFC del beneficiario
     * @param {string} [status] Estatus de la cuenta
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getSpidBeneficiariesForAccount(authorization: string, account: string, beneficiaryBank: string, beneficiaryName: string, endDate: string, initDate: string, rfc: string, status: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<SpidBeneficiariesResponse>;
    /**
     *
     * @summary Pre-registro de cuentas de beneficiarios SPID
     * @param {AccountSpid} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    preRegisterAccountsUsingPOST1(body: AccountSpid, authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<TokenRequiredResponse>;
};
/**
 * CuentasDeBeneficiariosSPIDApi - factory interface
 * @export
 */
export declare const CuentasDeBeneficiariosSPIDApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Obtiene los beneficiarios SPID registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
     * @summary Consulta los beneficiarios SPID registrados
     * @param {string} authorization Header para token
     * @param {string} [account] Cuenta del beneficiario, puede ser Clabe, TDD o Celular
     * @param {string} [beneficiaryBank] Clave del banco beneficiario
     * @param {string} [beneficiaryName] Nombre del beneficiario
     * @param {string} [endDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [initDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [rfc] RFC del beneficiario
     * @param {string} [status] Estatus de la cuenta
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getSpidBeneficiariesForAccount(authorization: string, account: string, beneficiaryBank: string, beneficiaryName: string, endDate: string, initDate: string, rfc: string, status: string, subscription: string, options: any): Promise<SpidBeneficiariesResponse>;
    /**
     *
     * @summary Pre-registro de cuentas de beneficiarios SPID
     * @param {AccountSpid} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    preRegisterAccountsUsingPOST1(body: AccountSpid, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
};
/**
 * CuentasDeBeneficiariosSPIDApi - interface
 * @export
 * @interface CuentasDeBeneficiariosSPIDApi
 */
export interface CuentasDeBeneficiariosSPIDApiInterface {
    /**
     * Obtiene los beneficiarios SPID registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
     * @summary Consulta los beneficiarios SPID registrados
     * @param {string} authorization Header para token
     * @param {string} [account] Cuenta del beneficiario, puede ser Clabe, TDD o Celular
     * @param {string} [beneficiaryBank] Clave del banco beneficiario
     * @param {string} [beneficiaryName] Nombre del beneficiario
     * @param {string} [endDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [initDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [rfc] RFC del beneficiario
     * @param {string} [status] Estatus de la cuenta
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPIDApiInterface
     */
    getSpidBeneficiariesForAccount(authorization: string, account: string, beneficiaryBank: string, beneficiaryName: string, endDate: string, initDate: string, rfc: string, status: string, subscription: string, options: any): Promise<SpidBeneficiariesResponse>;
    /**
     *
     * @summary Pre-registro de cuentas de beneficiarios SPID
     * @param {AccountSpid} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPIDApiInterface
     */
    preRegisterAccountsUsingPOST1(body: AccountSpid, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
}
/**
 * CuentasDeBeneficiariosSPIDApi - object-oriented interface
 * @export
 * @class CuentasDeBeneficiariosSPIDApi
 * @extends {BaseAPI}
 */
export declare class CuentasDeBeneficiariosSPIDApi extends BaseAPI implements CuentasDeBeneficiariosSPIDApiInterface {
    /**
     * Obtiene los beneficiarios SPID registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.
     * @summary Consulta los beneficiarios SPID registrados
     * @param {string} authorization Header para token
     * @param {string} [account] Cuenta del beneficiario, puede ser Clabe, TDD o Celular
     * @param {string} [beneficiaryBank] Clave del banco beneficiario
     * @param {string} [beneficiaryName] Nombre del beneficiario
     * @param {string} [endDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [initDate] Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
     * @param {string} [rfc] RFC del beneficiario
     * @param {string} [status] Estatus de la cuenta
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPIDApi
     */
    getSpidBeneficiariesForAccount(authorization: string, account: string, beneficiaryBank: string, beneficiaryName: string, endDate: string, initDate: string, rfc: string, status: string, subscription: string, options: any): Promise<SpidBeneficiariesResponse>;
    /**
     *
     * @summary Pre-registro de cuentas de beneficiarios SPID
     * @param {AccountSpid} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CuentasDeBeneficiariosSPIDApi
     */
    preRegisterAccountsUsingPOST1(body: AccountSpid, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
}
/**
 * DepositantesApi - fetch parameter creator
 * @export
 */
export declare const DepositantesApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Obtiene una lista de depositantes asociados al contrato relacionado a la subscripción.
     * @summary Consulta de cuentas de depositantes
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDepositantsUsingGET(authorization: string, subscription: string, options?: any): FetchArgs;
    /**
     * Registra un nuevo depositante en el contrato asociado a la subscripción.
     * @summary Registra un nuevo depositante
     * @param {DepositantsRegister} body Depositant info
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerDepositantsUsingPOST(body: DepositantsRegister, authorization: string, subscription: string, options?: any): FetchArgs;
};
/**
 * DepositantesApi - functional programming interface
 * @export
 */
export declare const DepositantesApiFp: (configuration: Configuration) => {
    /**
     * Obtiene una lista de depositantes asociados al contrato relacionado a la subscripción.
     * @summary Consulta de cuentas de depositantes
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDepositantsUsingGET(authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<GetDepositants>;
    /**
     * Registra un nuevo depositante en el contrato asociado a la subscripción.
     * @summary Registra un nuevo depositante
     * @param {DepositantsRegister} body Depositant info
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerDepositantsUsingPOST(body: DepositantsRegister, authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<DepositantsResponse>;
};
/**
 * DepositantesApi - factory interface
 * @export
 */
export declare const DepositantesApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Obtiene una lista de depositantes asociados al contrato relacionado a la subscripción.
     * @summary Consulta de cuentas de depositantes
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getDepositantsUsingGET(authorization: string, subscription: string, options: any): Promise<GetDepositants>;
    /**
     * Registra un nuevo depositante en el contrato asociado a la subscripción.
     * @summary Registra un nuevo depositante
     * @param {DepositantsRegister} body Depositant info
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerDepositantsUsingPOST(body: DepositantsRegister, authorization: string, subscription: string, options: any): Promise<DepositantsResponse>;
};
/**
 * DepositantesApi - interface
 * @export
 * @interface DepositantesApi
 */
export interface DepositantesApiInterface {
    /**
     * Obtiene una lista de depositantes asociados al contrato relacionado a la subscripción.
     * @summary Consulta de cuentas de depositantes
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DepositantesApiInterface
     */
    getDepositantsUsingGET(authorization: string, subscription: string, options: any): Promise<GetDepositants>;
    /**
     * Registra un nuevo depositante en el contrato asociado a la subscripción.
     * @summary Registra un nuevo depositante
     * @param {DepositantsRegister} body Depositant info
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DepositantesApiInterface
     */
    registerDepositantsUsingPOST(body: DepositantsRegister, authorization: string, subscription: string, options: any): Promise<DepositantsResponse>;
}
/**
 * DepositantesApi - object-oriented interface
 * @export
 * @class DepositantesApi
 * @extends {BaseAPI}
 */
export declare class DepositantesApi extends BaseAPI implements DepositantesApiInterface {
    /**
     * Obtiene una lista de depositantes asociados al contrato relacionado a la subscripción.
     * @summary Consulta de cuentas de depositantes
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DepositantesApi
     */
    getDepositantsUsingGET(authorization: string, subscription: string, options: any): Promise<GetDepositants>;
    /**
     * Registra un nuevo depositante en el contrato asociado a la subscripción.
     * @summary Registra un nuevo depositante
     * @param {DepositantsRegister} body Depositant info
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DepositantesApi
     */
    registerDepositantsUsingPOST(body: DepositantsRegister, authorization: string, subscription: string, options: any): Promise<DepositantsResponse>;
}
/**
 * EmpresasCoDiApi - fetch parameter creator
 * @export
 */
export declare const EmpresasCoDiApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Consulta de empresas CODI registradas para la aplicación.
     * @summary Consulta de empresas CODI
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainCompanies(authorization: string, options?: any): FetchArgs;
    /**
     * Registra una empresa para hacer uso de operaciones CODI. Es requerido tener el certificado emitido por BANXICO® asi como el Nombre de la empresa, Nombre comercial y RFC de la empresa.<br/>
     * @summary Registro de empresas CODI
     * @param {CompanyRequested} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerCompanyUsingPOST(body: CompanyRequested, authorization: string, options?: any): FetchArgs;
};
/**
 * EmpresasCoDiApi - functional programming interface
 * @export
 */
export declare const EmpresasCoDiApiFp: (configuration: Configuration) => {
    /**
     * Consulta de empresas CODI registradas para la aplicación.
     * @summary Consulta de empresas CODI
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainCompanies(authorization: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Array<CompanyRegistered>>;
    /**
     * Registra una empresa para hacer uso de operaciones CODI. Es requerido tener el certificado emitido por BANXICO® asi como el Nombre de la empresa, Nombre comercial y RFC de la empresa.<br/>
     * @summary Registro de empresas CODI
     * @param {CompanyRequested} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerCompanyUsingPOST(body: CompanyRequested, authorization: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<CompanyRegistered>;
};
/**
 * EmpresasCoDiApi - factory interface
 * @export
 */
export declare const EmpresasCoDiApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Consulta de empresas CODI registradas para la aplicación.
     * @summary Consulta de empresas CODI
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainCompanies(authorization: string, options: any): Promise<CompanyRegistered[]>;
    /**
     * Registra una empresa para hacer uso de operaciones CODI. Es requerido tener el certificado emitido por BANXICO® asi como el Nombre de la empresa, Nombre comercial y RFC de la empresa.<br/>
     * @summary Registro de empresas CODI
     * @param {CompanyRequested} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerCompanyUsingPOST(body: CompanyRequested, authorization: string, options: any): Promise<CompanyRegistered>;
};
/**
 * EmpresasCoDiApi - interface
 * @export
 * @interface EmpresasCoDiApi
 */
export interface EmpresasCoDiApiInterface {
    /**
     * Consulta de empresas CODI registradas para la aplicación.
     * @summary Consulta de empresas CODI
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmpresasCoDiApiInterface
     */
    obtainCompanies(authorization: string, options: any): Promise<Array<CompanyRegistered>>;
    /**
     * Registra una empresa para hacer uso de operaciones CODI. Es requerido tener el certificado emitido por BANXICO® asi como el Nombre de la empresa, Nombre comercial y RFC de la empresa.<br/>
     * @summary Registro de empresas CODI
     * @param {CompanyRequested} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmpresasCoDiApiInterface
     */
    registerCompanyUsingPOST(body: CompanyRequested, authorization: string, options: any): Promise<CompanyRegistered>;
}
/**
 * EmpresasCoDiApi - object-oriented interface
 * @export
 * @class EmpresasCoDiApi
 * @extends {BaseAPI}
 */
export declare class EmpresasCoDiApi extends BaseAPI implements EmpresasCoDiApiInterface {
    /**
     * Consulta de empresas CODI registradas para la aplicación.
     * @summary Consulta de empresas CODI
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmpresasCoDiApi
     */
    obtainCompanies(authorization: string, options: any): Promise<CompanyRegistered[]>;
    /**
     * Registra una empresa para hacer uso de operaciones CODI. Es requerido tener el certificado emitido por BANXICO® asi como el Nombre de la empresa, Nombre comercial y RFC de la empresa.<br/>
     * @summary Registro de empresas CODI
     * @param {CompanyRequested} body Información de la cuenta del beneficiario
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof EmpresasCoDiApi
     */
    registerCompanyUsingPOST(body: CompanyRequested, authorization: string, options: any): Promise<CompanyRegistered>;
}
/**
 * FacturasApi - fetch parameter creator
 * @export
 */
export declare const FacturasApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Se debe especificar el identificador de la factura
     * @summary Consulta de facturas por identificador
     * @param {string} authorization Header para token
     * @param {string} id Identificador de la factura
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    billingsReportByIdUsingGET(authorization: string, id: string, options?: any): FetchArgs;
    /**
     * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Es posible filtrar por periodo de fecha yyyy-MM, por ejemplo 2019-11
     * @summary Consulta de facturas
     * @param {string} authorization Header para token
     * @param {string} [period] Filtro de fecha yyyy-MM
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    billingsReportUsingGET(authorization: string, period: string, options?: any): FetchArgs;
};
/**
 * FacturasApi - functional programming interface
 * @export
 */
export declare const FacturasApiFp: (configuration: Configuration) => {
    /**
     * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Se debe especificar el identificador de la factura
     * @summary Consulta de facturas por identificador
     * @param {string} authorization Header para token
     * @param {string} id Identificador de la factura
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    billingsReportByIdUsingGET(authorization: string, id: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Billing>;
    /**
     * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Es posible filtrar por periodo de fecha yyyy-MM, por ejemplo 2019-11
     * @summary Consulta de facturas
     * @param {string} authorization Header para token
     * @param {string} [period] Filtro de fecha yyyy-MM
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    billingsReportUsingGET(authorization: string, period: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Array<Billing>>;
};
/**
 * FacturasApi - factory interface
 * @export
 */
export declare const FacturasApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Se debe especificar el identificador de la factura
     * @summary Consulta de facturas por identificador
     * @param {string} authorization Header para token
     * @param {string} id Identificador de la factura
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    billingsReportByIdUsingGET(authorization: string, id: string, options: any): Promise<Billing>;
    /**
     * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Es posible filtrar por periodo de fecha yyyy-MM, por ejemplo 2019-11
     * @summary Consulta de facturas
     * @param {string} authorization Header para token
     * @param {string} [period] Filtro de fecha yyyy-MM
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    billingsReportUsingGET(authorization: string, period: string, options: any): Promise<Billing[]>;
};
/**
 * FacturasApi - interface
 * @export
 * @interface FacturasApi
 */
export interface FacturasApiInterface {
    /**
     * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Se debe especificar el identificador de la factura
     * @summary Consulta de facturas por identificador
     * @param {string} authorization Header para token
     * @param {string} id Identificador de la factura
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FacturasApiInterface
     */
    billingsReportByIdUsingGET(authorization: string, id: string, options: any): Promise<Billing>;
    /**
     * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Es posible filtrar por periodo de fecha yyyy-MM, por ejemplo 2019-11
     * @summary Consulta de facturas
     * @param {string} authorization Header para token
     * @param {string} [period] Filtro de fecha yyyy-MM
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FacturasApiInterface
     */
    billingsReportUsingGET(authorization: string, period: string, options: any): Promise<Array<Billing>>;
}
/**
 * FacturasApi - object-oriented interface
 * @export
 * @class FacturasApi
 * @extends {BaseAPI}
 */
export declare class FacturasApi extends BaseAPI implements FacturasApiInterface {
    /**
     * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Se debe especificar el identificador de la factura
     * @summary Consulta de facturas por identificador
     * @param {string} authorization Header para token
     * @param {string} id Identificador de la factura
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FacturasApi
     */
    billingsReportByIdUsingGET(authorization: string, id: string, options: any): Promise<Billing>;
    /**
     * Consulta las facturas emitidas por conceptos de uso de la plataforma y operaciones realizadas tanto de entrada como de salida. Es posible filtrar por periodo de fecha yyyy-MM, por ejemplo 2019-11
     * @summary Consulta de facturas
     * @param {string} authorization Header para token
     * @param {string} [period] Filtro de fecha yyyy-MM
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof FacturasApi
     */
    billingsReportUsingGET(authorization: string, period: string, options: any): Promise<Billing[]>;
}
/**
 * InstitucionesApi - fetch parameter creator
 * @export
 */
export declare const InstitucionesApiFetchParamCreator: (configuration: Configuration) => {
    /**
     *
     * @summary Información de instituciones bancarias.
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAllInstitutionsUsingGET(authorization: string, options?: any): FetchArgs;
};
/**
 * InstitucionesApi - functional programming interface
 * @export
 */
export declare const InstitucionesApiFp: (configuration: Configuration) => {
    /**
     *
     * @summary Información de instituciones bancarias.
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAllInstitutionsUsingGET(authorization: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<InstitutionsList>;
};
/**
 * InstitucionesApi - factory interface
 * @export
 */
export declare const InstitucionesApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     *
     * @summary Información de instituciones bancarias.
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAllInstitutionsUsingGET(authorization: string, options: any): Promise<InstitutionsList>;
};
/**
 * InstitucionesApi - interface
 * @export
 * @interface InstitucionesApi
 */
export interface InstitucionesApiInterface {
    /**
     *
     * @summary Información de instituciones bancarias.
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InstitucionesApiInterface
     */
    getAllInstitutionsUsingGET(authorization: string, options: any): Promise<InstitutionsList>;
}
/**
 * InstitucionesApi - object-oriented interface
 * @export
 * @class InstitucionesApi
 * @extends {BaseAPI}
 */
export declare class InstitucionesApi extends BaseAPI implements InstitucionesApiInterface {
    /**
     *
     * @summary Información de instituciones bancarias.
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InstitucionesApi
     */
    getAllInstitutionsUsingGET(authorization: string, options: any): Promise<InstitutionsList>;
}
/**
 * LmitesDeMontosApi - fetch parameter creator
 * @export
 */
export declare const LmitesDeMontosApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación.
     * @summary Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación
     * @param {string} authorization Header para token
     * @param {string} suscription Identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainConfigurationsLimits(authorization: string, suscription: string, options?: any): FetchArgs;
    /**
     * Actualiza las configuraciones de un contrato asociado a una subscripción
     * @summary Actualiza las configuraciones por subscripción
     * @param {UpdateConfigurationsRequestDTO} body updateConfigurationsResquestDTO
     * @param {string} authorization Header para token
     * @param {string} suscription suscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateConfigurations(body: UpdateConfigurationsRequestDTO, authorization: string, suscription: string, options?: any): FetchArgs;
};
/**
 * LmitesDeMontosApi - functional programming interface
 * @export
 */
export declare const LmitesDeMontosApiFp: (configuration: Configuration) => {
    /**
     * Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación.
     * @summary Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación
     * @param {string} authorization Header para token
     * @param {string} suscription Identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainConfigurationsLimits(authorization: string, suscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<MessageConfigurationsLimits>;
    /**
     * Actualiza las configuraciones de un contrato asociado a una subscripción
     * @summary Actualiza las configuraciones por subscripción
     * @param {UpdateConfigurationsRequestDTO} body updateConfigurationsResquestDTO
     * @param {string} authorization Header para token
     * @param {string} suscription suscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateConfigurations(body: UpdateConfigurationsRequestDTO, authorization: string, suscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Response>;
};
/**
 * LmitesDeMontosApi - factory interface
 * @export
 */
export declare const LmitesDeMontosApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación.
     * @summary Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación
     * @param {string} authorization Header para token
     * @param {string} suscription Identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainConfigurationsLimits(authorization: string, suscription: string, options: any): Promise<MessageConfigurationsLimits>;
    /**
     * Actualiza las configuraciones de un contrato asociado a una subscripción
     * @summary Actualiza las configuraciones por subscripción
     * @param {UpdateConfigurationsRequestDTO} body updateConfigurationsResquestDTO
     * @param {string} authorization Header para token
     * @param {string} suscription suscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateConfigurations(body: UpdateConfigurationsRequestDTO, authorization: string, suscription: string, options: any): Promise<Response>;
};
/**
 * LmitesDeMontosApi - interface
 * @export
 * @interface LmitesDeMontosApi
 */
export interface LmitesDeMontosApiInterface {
    /**
     * Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación.
     * @summary Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación
     * @param {string} authorization Header para token
     * @param {string} suscription Identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LmitesDeMontosApiInterface
     */
    obtainConfigurationsLimits(authorization: string, suscription: string, options: any): Promise<MessageConfigurationsLimits>;
    /**
     * Actualiza las configuraciones de un contrato asociado a una subscripción
     * @summary Actualiza las configuraciones por subscripción
     * @param {UpdateConfigurationsRequestDTO} body updateConfigurationsResquestDTO
     * @param {string} authorization Header para token
     * @param {string} suscription suscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LmitesDeMontosApiInterface
     */
    updateConfigurations(body: UpdateConfigurationsRequestDTO, authorization: string, suscription: string, options: any): Promise<{}>;
}
/**
 * LmitesDeMontosApi - object-oriented interface
 * @export
 * @class LmitesDeMontosApi
 * @extends {BaseAPI}
 */
export declare class LmitesDeMontosApi extends BaseAPI implements LmitesDeMontosApiInterface {
    /**
     * Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación.
     * @summary Consulta las configuraciones para el contrato asocaido al enrolamiento en la aplicación
     * @param {string} authorization Header para token
     * @param {string} suscription Identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LmitesDeMontosApi
     */
    obtainConfigurationsLimits(authorization: string, suscription: string, options: any): Promise<MessageConfigurationsLimits>;
    /**
     * Actualiza las configuraciones de un contrato asociado a una subscripción
     * @summary Actualiza las configuraciones por subscripción
     * @param {UpdateConfigurationsRequestDTO} body updateConfigurationsResquestDTO
     * @param {string} authorization Header para token
     * @param {string} suscription suscription
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LmitesDeMontosApi
     */
    updateConfigurations(body: UpdateConfigurationsRequestDTO, authorization: string, suscription: string, options: any): Promise<Response>;
}
/**
 * OperacionesCoDiApi - fetch parameter creator
 * @export
 */
export declare const OperacionesCoDiApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Obtiene las operaciones generadas a partir de peticiones de pago CoDi® de forma paginada, pudiendo aplicar filtros
     * @summary Obtiene las operaciones generadas a partir de peticiones de pago CoDi® de forma paginada, pudiendo aplicar filtros
     * @param {CodiOperationsFiltersRequestDTO} [body] Filtros de busqueda
     * @param {string} authorization Header para token
     * @param {string} [companyId] Identificador de empresa CoDi
     * @param {string} [page] Número de pago
     * @param {string} [salesPointId] Identificador del punto de venta
     * @param {string} [size] Tamaño de pagina
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    consultCodiOperations(body: CodiOperationsFiltersRequestDTO, authorization: string, companyId: string, page: string, salesPointId: string, size: string, options?: any): FetchArgs;
};
/**
 * OperacionesCoDiApi - functional programming interface
 * @export
 */
export declare const OperacionesCoDiApiFp: (configuration: Configuration) => {
    /**
     * Obtiene las operaciones generadas a partir de peticiones de pago CoDi® de forma paginada, pudiendo aplicar filtros
     * @summary Obtiene las operaciones generadas a partir de peticiones de pago CoDi® de forma paginada, pudiendo aplicar filtros
     * @param {CodiOperationsFiltersRequestDTO} [body] Filtros de busqueda
     * @param {string} authorization Header para token
     * @param {string} [companyId] Identificador de empresa CoDi
     * @param {string} [page] Número de pago
     * @param {string} [salesPointId] Identificador del punto de venta
     * @param {string} [size] Tamaño de pagina
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    consultCodiOperations(body: CodiOperationsFiltersRequestDTO, authorization: string, companyId: string, page: string, salesPointId: string, size: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<PagerResponseDto>;
};
/**
 * OperacionesCoDiApi - factory interface
 * @export
 */
export declare const OperacionesCoDiApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Obtiene las operaciones generadas a partir de peticiones de pago CoDi® de forma paginada, pudiendo aplicar filtros
     * @summary Obtiene las operaciones generadas a partir de peticiones de pago CoDi® de forma paginada, pudiendo aplicar filtros
     * @param {CodiOperationsFiltersRequestDTO} [body] Filtros de busqueda
     * @param {string} authorization Header para token
     * @param {string} [companyId] Identificador de empresa CoDi
     * @param {string} [page] Número de pago
     * @param {string} [salesPointId] Identificador del punto de venta
     * @param {string} [size] Tamaño de pagina
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    consultCodiOperations(body: CodiOperationsFiltersRequestDTO, authorization: string, companyId: string, page: string, salesPointId: string, size: string, options: any): Promise<PagerResponseDto>;
};
/**
 * OperacionesCoDiApi - interface
 * @export
 * @interface OperacionesCoDiApi
 */
export interface OperacionesCoDiApiInterface {
    /**
     * Obtiene las operaciones generadas a partir de peticiones de pago CoDi® de forma paginada, pudiendo aplicar filtros
     * @summary Obtiene las operaciones generadas a partir de peticiones de pago CoDi® de forma paginada, pudiendo aplicar filtros
     * @param {CodiOperationsFiltersRequestDTO} [body] Filtros de busqueda
     * @param {string} authorization Header para token
     * @param {string} [companyId] Identificador de empresa CoDi
     * @param {string} [page] Número de pago
     * @param {string} [salesPointId] Identificador del punto de venta
     * @param {string} [size] Tamaño de pagina
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OperacionesCoDiApiInterface
     */
    consultCodiOperations(body: CodiOperationsFiltersRequestDTO, authorization: string, companyId: string, page: string, salesPointId: string, size: string, options: any): Promise<PagerResponseDto>;
}
/**
 * OperacionesCoDiApi - object-oriented interface
 * @export
 * @class OperacionesCoDiApi
 * @extends {BaseAPI}
 */
export declare class OperacionesCoDiApi extends BaseAPI implements OperacionesCoDiApiInterface {
    /**
     * Obtiene las operaciones generadas a partir de peticiones de pago CoDi® de forma paginada, pudiendo aplicar filtros
     * @summary Obtiene las operaciones generadas a partir de peticiones de pago CoDi® de forma paginada, pudiendo aplicar filtros
     * @param {CodiOperationsFiltersRequestDTO} [body] Filtros de busqueda
     * @param {string} authorization Header para token
     * @param {string} [companyId] Identificador de empresa CoDi
     * @param {string} [page] Número de pago
     * @param {string} [salesPointId] Identificador del punto de venta
     * @param {string} [size] Tamaño de pagina
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof OperacionesCoDiApi
     */
    consultCodiOperations(body: CodiOperationsFiltersRequestDTO, authorization: string, companyId: string, page: string, salesPointId: string, size: string, options: any): Promise<PagerResponseDto>;
}
/**
 * PeticionesDePagoPorCoDiApi - fetch parameter creator
 * @export
 */
export declare const PeticionesDePagoPorCoDiApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Obtiene la información de una petición de pago CODI® por orderId para un punto de venta
     * @summary Obtiene la información de una petición de pago CODI® por orderId para un punto de venta
     * @param {string} authorization Header para token
     * @param {string} orderId Identificador del pago CODI®
     * @param {string} salesPointId Identificador del punto de venta
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    consultCodiRequestByOrderId(authorization: string, orderId: string, salesPointId: string, options?: any): FetchArgs;
    /**
     * Genera un código QR solicitado por un punto de venta para un pago mediante CODI®
     * @summary Genera un código QR para un pago mediante CODI®
     * @param {CodiCodeRequestDTO} body Información del pago CODI®
     * @param {string} authorization Header para token
     * @param {string} salesPointId Identificador del punto de venta
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    generateCodiCodeQR(body: CodiCodeRequestDTO, authorization: string, salesPointId: string, options?: any): FetchArgs;
};
/**
 * PeticionesDePagoPorCoDiApi - functional programming interface
 * @export
 */
export declare const PeticionesDePagoPorCoDiApiFp: (configuration: Configuration) => {
    /**
     * Obtiene la información de una petición de pago CODI® por orderId para un punto de venta
     * @summary Obtiene la información de una petición de pago CODI® por orderId para un punto de venta
     * @param {string} authorization Header para token
     * @param {string} orderId Identificador del pago CODI®
     * @param {string} salesPointId Identificador del punto de venta
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    consultCodiRequestByOrderId(authorization: string, orderId: string, salesPointId: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<PaymentRequestCodiResponseDTO>;
    /**
     * Genera un código QR solicitado por un punto de venta para un pago mediante CODI®
     * @summary Genera un código QR para un pago mediante CODI®
     * @param {CodiCodeRequestDTO} body Información del pago CODI®
     * @param {string} authorization Header para token
     * @param {string} salesPointId Identificador del punto de venta
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    generateCodiCodeQR(body: CodiCodeRequestDTO, authorization: string, salesPointId: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<CodiCodeQrResponseDTO>;
};
/**
 * PeticionesDePagoPorCoDiApi - factory interface
 * @export
 */
export declare const PeticionesDePagoPorCoDiApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Obtiene la información de una petición de pago CODI® por orderId para un punto de venta
     * @summary Obtiene la información de una petición de pago CODI® por orderId para un punto de venta
     * @param {string} authorization Header para token
     * @param {string} orderId Identificador del pago CODI®
     * @param {string} salesPointId Identificador del punto de venta
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    consultCodiRequestByOrderId(authorization: string, orderId: string, salesPointId: string, options: any): Promise<PaymentRequestCodiResponseDTO>;
    /**
     * Genera un código QR solicitado por un punto de venta para un pago mediante CODI®
     * @summary Genera un código QR para un pago mediante CODI®
     * @param {CodiCodeRequestDTO} body Información del pago CODI®
     * @param {string} authorization Header para token
     * @param {string} salesPointId Identificador del punto de venta
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    generateCodiCodeQR(body: CodiCodeRequestDTO, authorization: string, salesPointId: string, options: any): Promise<CodiCodeQrResponseDTO>;
};
/**
 * PeticionesDePagoPorCoDiApi - interface
 * @export
 * @interface PeticionesDePagoPorCoDiApi
 */
export interface PeticionesDePagoPorCoDiApiInterface {
    /**
     * Obtiene la información de una petición de pago CODI® por orderId para un punto de venta
     * @summary Obtiene la información de una petición de pago CODI® por orderId para un punto de venta
     * @param {string} authorization Header para token
     * @param {string} orderId Identificador del pago CODI®
     * @param {string} salesPointId Identificador del punto de venta
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PeticionesDePagoPorCoDiApiInterface
     */
    consultCodiRequestByOrderId(authorization: string, orderId: string, salesPointId: string, options: any): Promise<PaymentRequestCodiResponseDTO>;
    /**
     * Genera un código QR solicitado por un punto de venta para un pago mediante CODI®
     * @summary Genera un código QR para un pago mediante CODI®
     * @param {CodiCodeRequestDTO} body Información del pago CODI®
     * @param {string} authorization Header para token
     * @param {string} salesPointId Identificador del punto de venta
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PeticionesDePagoPorCoDiApiInterface
     */
    generateCodiCodeQR(body: CodiCodeRequestDTO, authorization: string, salesPointId: string, options: any): Promise<CodiCodeQrResponseDTO>;
}
/**
 * PeticionesDePagoPorCoDiApi - object-oriented interface
 * @export
 * @class PeticionesDePagoPorCoDiApi
 * @extends {BaseAPI}
 */
export declare class PeticionesDePagoPorCoDiApi extends BaseAPI implements PeticionesDePagoPorCoDiApiInterface {
    /**
     * Obtiene la información de una petición de pago CODI® por orderId para un punto de venta
     * @summary Obtiene la información de una petición de pago CODI® por orderId para un punto de venta
     * @param {string} authorization Header para token
     * @param {string} orderId Identificador del pago CODI®
     * @param {string} salesPointId Identificador del punto de venta
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PeticionesDePagoPorCoDiApi
     */
    consultCodiRequestByOrderId(authorization: string, orderId: string, salesPointId: string, options: any): Promise<PaymentRequestCodiResponseDTO>;
    /**
     * Genera un código QR solicitado por un punto de venta para un pago mediante CODI®
     * @summary Genera un código QR para un pago mediante CODI®
     * @param {CodiCodeRequestDTO} body Información del pago CODI®
     * @param {string} authorization Header para token
     * @param {string} salesPointId Identificador del punto de venta
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PeticionesDePagoPorCoDiApi
     */
    generateCodiCodeQR(body: CodiCodeRequestDTO, authorization: string, salesPointId: string, options: any): Promise<CodiCodeQrResponseDTO>;
}
/**
 * PuntosDeVentaCoDiApi - fetch parameter creator
 * @export
 */
export declare const PuntosDeVentaCoDiApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Registra un punto de venta desde donde se emitaran los cobros CODI®, el punto de venta se debe asociar a un cuenta cableregistrada previamente ante Banxico para realizar cobros con CODI®
     * @summary Registra un punto de venta asociado a una empresa
     * @param {SalesPointRequest} body Información del punto de venta CODI®
     * @param {string} authorization Header para token
     * @param {string} companyId El identificador de la empresa
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createSalesPoint(body: SalesPointRequest, authorization: string, companyId: string, options?: any): FetchArgs;
    /**
     * Obtiene los puntos de venta asociados a una empresa en las cuales se hacen operaciones CODI®
     * @summary Obtiene los puntos de venta asociados a una empresa
     * @param {string} authorization Header para token
     * @param {string} companyId El identificador de la empresa
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainSalePoints(authorization: string, companyId: string, options?: any): FetchArgs;
};
/**
 * PuntosDeVentaCoDiApi - functional programming interface
 * @export
 */
export declare const PuntosDeVentaCoDiApiFp: (configuration: Configuration) => {
    /**
     * Registra un punto de venta desde donde se emitaran los cobros CODI®, el punto de venta se debe asociar a un cuenta cableregistrada previamente ante Banxico para realizar cobros con CODI®
     * @summary Registra un punto de venta asociado a una empresa
     * @param {SalesPointRequest} body Información del punto de venta CODI®
     * @param {string} authorization Header para token
     * @param {string} companyId El identificador de la empresa
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createSalesPoint(body: SalesPointRequest, authorization: string, companyId: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<SalesPointRespose>;
    /**
     * Obtiene los puntos de venta asociados a una empresa en las cuales se hacen operaciones CODI®
     * @summary Obtiene los puntos de venta asociados a una empresa
     * @param {string} authorization Header para token
     * @param {string} companyId El identificador de la empresa
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainSalePoints(authorization: string, companyId: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Array<SalesPointFound>>;
};
/**
 * PuntosDeVentaCoDiApi - factory interface
 * @export
 */
export declare const PuntosDeVentaCoDiApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Registra un punto de venta desde donde se emitaran los cobros CODI®, el punto de venta se debe asociar a un cuenta cableregistrada previamente ante Banxico para realizar cobros con CODI®
     * @summary Registra un punto de venta asociado a una empresa
     * @param {SalesPointRequest} body Información del punto de venta CODI®
     * @param {string} authorization Header para token
     * @param {string} companyId El identificador de la empresa
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createSalesPoint(body: SalesPointRequest, authorization: string, companyId: string, options: any): Promise<SalesPointRespose>;
    /**
     * Obtiene los puntos de venta asociados a una empresa en las cuales se hacen operaciones CODI®
     * @summary Obtiene los puntos de venta asociados a una empresa
     * @param {string} authorization Header para token
     * @param {string} companyId El identificador de la empresa
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    obtainSalePoints(authorization: string, companyId: string, options: any): Promise<SalesPointFound[]>;
};
/**
 * PuntosDeVentaCoDiApi - interface
 * @export
 * @interface PuntosDeVentaCoDiApi
 */
export interface PuntosDeVentaCoDiApiInterface {
    /**
     * Registra un punto de venta desde donde se emitaran los cobros CODI®, el punto de venta se debe asociar a un cuenta cableregistrada previamente ante Banxico para realizar cobros con CODI®
     * @summary Registra un punto de venta asociado a una empresa
     * @param {SalesPointRequest} body Información del punto de venta CODI®
     * @param {string} authorization Header para token
     * @param {string} companyId El identificador de la empresa
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PuntosDeVentaCoDiApiInterface
     */
    createSalesPoint(body: SalesPointRequest, authorization: string, companyId: string, options: any): Promise<SalesPointRespose>;
    /**
     * Obtiene los puntos de venta asociados a una empresa en las cuales se hacen operaciones CODI®
     * @summary Obtiene los puntos de venta asociados a una empresa
     * @param {string} authorization Header para token
     * @param {string} companyId El identificador de la empresa
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PuntosDeVentaCoDiApiInterface
     */
    obtainSalePoints(authorization: string, companyId: string, options: any): Promise<Array<SalesPointFound>>;
}
/**
 * PuntosDeVentaCoDiApi - object-oriented interface
 * @export
 * @class PuntosDeVentaCoDiApi
 * @extends {BaseAPI}
 */
export declare class PuntosDeVentaCoDiApi extends BaseAPI implements PuntosDeVentaCoDiApiInterface {
    /**
     * Registra un punto de venta desde donde se emitaran los cobros CODI®, el punto de venta se debe asociar a un cuenta cableregistrada previamente ante Banxico para realizar cobros con CODI®
     * @summary Registra un punto de venta asociado a una empresa
     * @param {SalesPointRequest} body Información del punto de venta CODI®
     * @param {string} authorization Header para token
     * @param {string} companyId El identificador de la empresa
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PuntosDeVentaCoDiApi
     */
    createSalesPoint(body: SalesPointRequest, authorization: string, companyId: string, options: any): Promise<SalesPointRespose>;
    /**
     * Obtiene los puntos de venta asociados a una empresa en las cuales se hacen operaciones CODI®
     * @summary Obtiene los puntos de venta asociados a una empresa
     * @param {string} authorization Header para token
     * @param {string} companyId El identificador de la empresa
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PuntosDeVentaCoDiApi
     */
    obtainSalePoints(authorization: string, companyId: string, options: any): Promise<SalesPointFound[]>;
}
/**
 * SaldoApi - fetch parameter creator
 * @export
 */
export declare const SaldoApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Obtiene el de las divisas que se manejen en el contrato.
     * @summary Consulta los saldo de una cuenta
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBalanceUsingGET(authorization: string, subscription: string, options?: any): FetchArgs;
};
/**
 * SaldoApi - functional programming interface
 * @export
 */
export declare const SaldoApiFp: (configuration: Configuration) => {
    /**
     * Obtiene el de las divisas que se manejen en el contrato.
     * @summary Consulta los saldo de una cuenta
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBalanceUsingGET(authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<BalanceListResponse>;
};
/**
 * SaldoApi - factory interface
 * @export
 */
export declare const SaldoApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Obtiene el de las divisas que se manejen en el contrato.
     * @summary Consulta los saldo de una cuenta
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getBalanceUsingGET(authorization: string, subscription: string, options: any): Promise<BalanceListResponse>;
};
/**
 * SaldoApi - interface
 * @export
 * @interface SaldoApi
 */
export interface SaldoApiInterface {
    /**
     * Obtiene el de las divisas que se manejen en el contrato.
     * @summary Consulta los saldo de una cuenta
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SaldoApiInterface
     */
    getBalanceUsingGET(authorization: string, subscription: string, options: any): Promise<BalanceListResponse>;
}
/**
 * SaldoApi - object-oriented interface
 * @export
 * @class SaldoApi
 * @extends {BaseAPI}
 */
export declare class SaldoApi extends BaseAPI implements SaldoApiInterface {
    /**
     * Obtiene el de las divisas que se manejen en el contrato.
     * @summary Consulta los saldo de una cuenta
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SaldoApi
     */
    getBalanceUsingGET(authorization: string, subscription: string, options: any): Promise<BalanceListResponse>;
}
/**
 * SuscripcionesApi - fetch parameter creator
 * @export
 */
export declare const SuscripcionesApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Registra una pre-suscripción para operar un contrato a través de un aplicación socio de la plataforma, proporcionando una URL donde el cliente Monex debe autorizar el acceso a los datos de su cuenta a el socio.<br/>Una vez que el cuentahabiente autorice el acceso, se envía un mensaje webhook con el evento 'ENROLLMENT.CREATED', el cuál contiene los datos de acceso a esta API.
     * @summary Registra una pre-suscripción
     * @param {PreEnrollmentData} body Información para la pre-suscripción
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    preEnrollmentMonexUserUsingPOST(body: PreEnrollmentData, authorization: string, options?: any): FetchArgs;
    /**
     * Elimina una suscripción, una vez eliminada ya no se podrán realizar operacions en el API utilizando esta suscripción
     * @summary Elimina una suscripción por el identificador de la suscripción
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    removeEnrollmentUserUsingDELETE(authorization: string, subscription: string, options?: any): FetchArgs;
    /**
     * Se elimina una pre-suscripción, sólo se elimina en caso de que el cliente Monex no haya concedido su autorización de acceso (token), es decir que la pre-suscripcion este pendiente.
     * @summary Elimina una pre-suscripción
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    removeSubscriptionPendingStatusUsingDELETE(authorization: string, subscription: string, options?: any): FetchArgs;
};
/**
 * SuscripcionesApi - functional programming interface
 * @export
 */
export declare const SuscripcionesApiFp: (configuration: Configuration) => {
    /**
     * Registra una pre-suscripción para operar un contrato a través de un aplicación socio de la plataforma, proporcionando una URL donde el cliente Monex debe autorizar el acceso a los datos de su cuenta a el socio.<br/>Una vez que el cuentahabiente autorice el acceso, se envía un mensaje webhook con el evento 'ENROLLMENT.CREATED', el cuál contiene los datos de acceso a esta API.
     * @summary Registra una pre-suscripción
     * @param {PreEnrollmentData} body Información para la pre-suscripción
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    preEnrollmentMonexUserUsingPOST(body: PreEnrollmentData, authorization: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<PreEnrollmentResponse>;
    /**
     * Elimina una suscripción, una vez eliminada ya no se podrán realizar operacions en el API utilizando esta suscripción
     * @summary Elimina una suscripción por el identificador de la suscripción
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    removeEnrollmentUserUsingDELETE(authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Response>;
    /**
     * Se elimina una pre-suscripción, sólo se elimina en caso de que el cliente Monex no haya concedido su autorización de acceso (token), es decir que la pre-suscripcion este pendiente.
     * @summary Elimina una pre-suscripción
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    removeSubscriptionPendingStatusUsingDELETE(authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Response>;
};
/**
 * SuscripcionesApi - factory interface
 * @export
 */
export declare const SuscripcionesApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Registra una pre-suscripción para operar un contrato a través de un aplicación socio de la plataforma, proporcionando una URL donde el cliente Monex debe autorizar el acceso a los datos de su cuenta a el socio.<br/>Una vez que el cuentahabiente autorice el acceso, se envía un mensaje webhook con el evento 'ENROLLMENT.CREATED', el cuál contiene los datos de acceso a esta API.
     * @summary Registra una pre-suscripción
     * @param {PreEnrollmentData} body Información para la pre-suscripción
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    preEnrollmentMonexUserUsingPOST(body: PreEnrollmentData, authorization: string, options: any): Promise<PreEnrollmentResponse>;
    /**
     * Elimina una suscripción, una vez eliminada ya no se podrán realizar operacions en el API utilizando esta suscripción
     * @summary Elimina una suscripción por el identificador de la suscripción
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    removeEnrollmentUserUsingDELETE(authorization: string, subscription: string, options: any): Promise<Response>;
    /**
     * Se elimina una pre-suscripción, sólo se elimina en caso de que el cliente Monex no haya concedido su autorización de acceso (token), es decir que la pre-suscripcion este pendiente.
     * @summary Elimina una pre-suscripción
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    removeSubscriptionPendingStatusUsingDELETE(authorization: string, subscription: string, options: any): Promise<Response>;
};
/**
 * SuscripcionesApi - interface
 * @export
 * @interface SuscripcionesApi
 */
export interface SuscripcionesApiInterface {
    /**
     * Registra una pre-suscripción para operar un contrato a través de un aplicación socio de la plataforma, proporcionando una URL donde el cliente Monex debe autorizar el acceso a los datos de su cuenta a el socio.<br/>Una vez que el cuentahabiente autorice el acceso, se envía un mensaje webhook con el evento 'ENROLLMENT.CREATED', el cuál contiene los datos de acceso a esta API.
     * @summary Registra una pre-suscripción
     * @param {PreEnrollmentData} body Información para la pre-suscripción
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuscripcionesApiInterface
     */
    preEnrollmentMonexUserUsingPOST(body: PreEnrollmentData, authorization: string, options: any): Promise<PreEnrollmentResponse>;
    /**
     * Elimina una suscripción, una vez eliminada ya no se podrán realizar operacions en el API utilizando esta suscripción
     * @summary Elimina una suscripción por el identificador de la suscripción
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuscripcionesApiInterface
     */
    removeEnrollmentUserUsingDELETE(authorization: string, subscription: string, options: any): Promise<{}>;
    /**
     * Se elimina una pre-suscripción, sólo se elimina en caso de que el cliente Monex no haya concedido su autorización de acceso (token), es decir que la pre-suscripcion este pendiente.
     * @summary Elimina una pre-suscripción
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuscripcionesApiInterface
     */
    removeSubscriptionPendingStatusUsingDELETE(authorization: string, subscription: string, options: any): Promise<{}>;
}
/**
 * SuscripcionesApi - object-oriented interface
 * @export
 * @class SuscripcionesApi
 * @extends {BaseAPI}
 */
export declare class SuscripcionesApi extends BaseAPI implements SuscripcionesApiInterface {
    /**
     * Registra una pre-suscripción para operar un contrato a través de un aplicación socio de la plataforma, proporcionando una URL donde el cliente Monex debe autorizar el acceso a los datos de su cuenta a el socio.<br/>Una vez que el cuentahabiente autorice el acceso, se envía un mensaje webhook con el evento 'ENROLLMENT.CREATED', el cuál contiene los datos de acceso a esta API.
     * @summary Registra una pre-suscripción
     * @param {PreEnrollmentData} body Información para la pre-suscripción
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuscripcionesApi
     */
    preEnrollmentMonexUserUsingPOST(body: PreEnrollmentData, authorization: string, options: any): Promise<PreEnrollmentResponse>;
    /**
     * Elimina una suscripción, una vez eliminada ya no se podrán realizar operacions en el API utilizando esta suscripción
     * @summary Elimina una suscripción por el identificador de la suscripción
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuscripcionesApi
     */
    removeEnrollmentUserUsingDELETE(authorization: string, subscription: string, options: any): Promise<Response>;
    /**
     * Se elimina una pre-suscripción, sólo se elimina en caso de que el cliente Monex no haya concedido su autorización de acceso (token), es decir que la pre-suscripcion este pendiente.
     * @summary Elimina una pre-suscripción
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SuscripcionesApi
     */
    removeSubscriptionPendingStatusUsingDELETE(authorization: string, subscription: string, options: any): Promise<Response>;
}
/**
 * TransferenciasSPEIApi - fetch parameter creator
 * @export
 */
export declare const TransferenciasSPEIApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Agrupa transacciones SPEI/SPID en un transaction_id, generando la URL para su autorización. Las transacciones deben estar en estatus PENDING y pertenecer a un mmismo contrato
     * @summary Agrupa un conjunto de transacciones bajo un mismo request_id para autorizar
     * @param {AuthorizationTransactionGroup} body authorizationTransactionsGroupRequestDTO
     * @param {string} authorization Header para token
     * @param {string} subscription Identificador de la suscripcion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createAuthorizationTransactionsGroup(body: AuthorizationTransactionGroup, authorization: string, subscription: string, options?: any): FetchArgs;
    /**
     * Elimina un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias no deben haber sido confirmadas por el cliente.
     * @summary Eliminación de transferencias SPEI® pendientes
     * @param {string} authorization Header para token
     * @param {string} [orderId] Listado de identificadores dentro del request_id para eliminar
     * @param {string} requestId Identificador de las transferencias a eliminar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dropTransactionsPendingUsingDELETE(authorization: string, orderId: string, requestId: string, subscription: string, options?: any): FetchArgs;
    /**
     * Realiza una consulta de las transferencias recibidas (depósitos) en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias  recibidas durante el día en el que se realiza la consulta.
     * @summary Consulta de transferencias recibidas
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    incomingSpeiTransactionsReportUsingGET(authorization: string, subscription: string, options?: any): FetchArgs;
    /**
     * Consulta las transferencias de salida registradas en una petición, las transferencias que regresa este recuso son únicamente las transferencias de salida agrupadas al identificador de la petición que se generó al hacer el registro de las transacciones el cual se debe especificar como parte del path de este endpoint.
     * @summary Consulta de transferencias de salida por identificador de petición
     * @param {string} authorization Header para token
     * @param {string} requestId Identificador de la petición a buscar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    outCommingSpeiRequestIdTransactionsReportUsingGET(authorization: string, requestId: string, subscription: string, options?: any): FetchArgs;
    /**
     * Consulta las transferencias realizadas en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias recibidas en el día en el que se realiza la consulta.<br>Se pueden realizar consultas por <strong>order_id</strong> al realizar este tipo de consultas no importa el día en el que se realizó la transferencia
     * @summary Consulta de transferencias realizadas
     * @param {string} authorization Header para token
     * @param {string} [orderId] Identificador de la orden a buscar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    outgoingSpeiTransactionsReportUsingGET(authorization: string, orderId: string, subscription: string, options?: any): FetchArgs;
    /**
     * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias deben ser confirmadas por el cliente para que se efectuen.
     * @summary Registro de transferencias
     * @param {TransactionsOutgoingRegister} body Información de las transferencias SPEI de salida
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerOutgoingSpeiTransactionUsingPOST(body: TransactionsOutgoingRegister, authorization: string, subscription: string, options?: any): FetchArgs;
};
/**
 * TransferenciasSPEIApi - functional programming interface
 * @export
 */
export declare const TransferenciasSPEIApiFp: (configuration: Configuration) => {
    /**
     * Agrupa transacciones SPEI/SPID en un transaction_id, generando la URL para su autorización. Las transacciones deben estar en estatus PENDING y pertenecer a un mmismo contrato
     * @summary Agrupa un conjunto de transacciones bajo un mismo request_id para autorizar
     * @param {AuthorizationTransactionGroup} body authorizationTransactionsGroupRequestDTO
     * @param {string} authorization Header para token
     * @param {string} subscription Identificador de la suscripcion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createAuthorizationTransactionsGroup(body: AuthorizationTransactionGroup, authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<TokenRequiredResponse>;
    /**
     * Elimina un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias no deben haber sido confirmadas por el cliente.
     * @summary Eliminación de transferencias SPEI® pendientes
     * @param {string} authorization Header para token
     * @param {string} [orderId] Listado de identificadores dentro del request_id para eliminar
     * @param {string} requestId Identificador de las transferencias a eliminar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dropTransactionsPendingUsingDELETE(authorization: string, orderId: string, requestId: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Response>;
    /**
     * Realiza una consulta de las transferencias recibidas (depósitos) en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias  recibidas durante el día en el que se realiza la consulta.
     * @summary Consulta de transferencias recibidas
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    incomingSpeiTransactionsReportUsingGET(authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Array<Deposit>>;
    /**
     * Consulta las transferencias de salida registradas en una petición, las transferencias que regresa este recuso son únicamente las transferencias de salida agrupadas al identificador de la petición que se generó al hacer el registro de las transacciones el cual se debe especificar como parte del path de este endpoint.
     * @summary Consulta de transferencias de salida por identificador de petición
     * @param {string} authorization Header para token
     * @param {string} requestId Identificador de la petición a buscar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    outCommingSpeiRequestIdTransactionsReportUsingGET(authorization: string, requestId: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<PaymentsRequestId>;
    /**
     * Consulta las transferencias realizadas en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias recibidas en el día en el que se realiza la consulta.<br>Se pueden realizar consultas por <strong>order_id</strong> al realizar este tipo de consultas no importa el día en el que se realizó la transferencia
     * @summary Consulta de transferencias realizadas
     * @param {string} authorization Header para token
     * @param {string} [orderId] Identificador de la orden a buscar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    outgoingSpeiTransactionsReportUsingGET(authorization: string, orderId: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<Array<Payment>>;
    /**
     * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias deben ser confirmadas por el cliente para que se efectuen.
     * @summary Registro de transferencias
     * @param {TransactionsOutgoingRegister} body Información de las transferencias SPEI de salida
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerOutgoingSpeiTransactionUsingPOST(body: TransactionsOutgoingRegister, authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<TokenRequiredResponse>;
};
/**
 * TransferenciasSPEIApi - factory interface
 * @export
 */
export declare const TransferenciasSPEIApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Agrupa transacciones SPEI/SPID en un transaction_id, generando la URL para su autorización. Las transacciones deben estar en estatus PENDING y pertenecer a un mmismo contrato
     * @summary Agrupa un conjunto de transacciones bajo un mismo request_id para autorizar
     * @param {AuthorizationTransactionGroup} body authorizationTransactionsGroupRequestDTO
     * @param {string} authorization Header para token
     * @param {string} subscription Identificador de la suscripcion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createAuthorizationTransactionsGroup(body: AuthorizationTransactionGroup, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
    /**
     * Elimina un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias no deben haber sido confirmadas por el cliente.
     * @summary Eliminación de transferencias SPEI® pendientes
     * @param {string} authorization Header para token
     * @param {string} [orderId] Listado de identificadores dentro del request_id para eliminar
     * @param {string} requestId Identificador de las transferencias a eliminar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    dropTransactionsPendingUsingDELETE(authorization: string, orderId: string, requestId: string, subscription: string, options: any): Promise<Response>;
    /**
     * Realiza una consulta de las transferencias recibidas (depósitos) en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias  recibidas durante el día en el que se realiza la consulta.
     * @summary Consulta de transferencias recibidas
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    incomingSpeiTransactionsReportUsingGET(authorization: string, subscription: string, options: any): Promise<Deposit[]>;
    /**
     * Consulta las transferencias de salida registradas en una petición, las transferencias que regresa este recuso son únicamente las transferencias de salida agrupadas al identificador de la petición que se generó al hacer el registro de las transacciones el cual se debe especificar como parte del path de este endpoint.
     * @summary Consulta de transferencias de salida por identificador de petición
     * @param {string} authorization Header para token
     * @param {string} requestId Identificador de la petición a buscar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    outCommingSpeiRequestIdTransactionsReportUsingGET(authorization: string, requestId: string, subscription: string, options: any): Promise<PaymentsRequestId>;
    /**
     * Consulta las transferencias realizadas en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias recibidas en el día en el que se realiza la consulta.<br>Se pueden realizar consultas por <strong>order_id</strong> al realizar este tipo de consultas no importa el día en el que se realizó la transferencia
     * @summary Consulta de transferencias realizadas
     * @param {string} authorization Header para token
     * @param {string} [orderId] Identificador de la orden a buscar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    outgoingSpeiTransactionsReportUsingGET(authorization: string, orderId: string, subscription: string, options: any): Promise<Payment[]>;
    /**
     * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias deben ser confirmadas por el cliente para que se efectuen.
     * @summary Registro de transferencias
     * @param {TransactionsOutgoingRegister} body Información de las transferencias SPEI de salida
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerOutgoingSpeiTransactionUsingPOST(body: TransactionsOutgoingRegister, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
};
/**
 * TransferenciasSPEIApi - interface
 * @export
 * @interface TransferenciasSPEIApi
 */
export interface TransferenciasSPEIApiInterface {
    /**
     * Agrupa transacciones SPEI/SPID en un transaction_id, generando la URL para su autorización. Las transacciones deben estar en estatus PENDING y pertenecer a un mmismo contrato
     * @summary Agrupa un conjunto de transacciones bajo un mismo request_id para autorizar
     * @param {AuthorizationTransactionGroup} body authorizationTransactionsGroupRequestDTO
     * @param {string} authorization Header para token
     * @param {string} subscription Identificador de la suscripcion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApiInterface
     */
    createAuthorizationTransactionsGroup(body: AuthorizationTransactionGroup, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
    /**
     * Elimina un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias no deben haber sido confirmadas por el cliente.
     * @summary Eliminación de transferencias SPEI® pendientes
     * @param {string} authorization Header para token
     * @param {string} [orderId] Listado de identificadores dentro del request_id para eliminar
     * @param {string} requestId Identificador de las transferencias a eliminar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApiInterface
     */
    dropTransactionsPendingUsingDELETE(authorization: string, orderId: string, requestId: string, subscription: string, options: any): Promise<{}>;
    /**
     * Realiza una consulta de las transferencias recibidas (depósitos) en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias  recibidas durante el día en el que se realiza la consulta.
     * @summary Consulta de transferencias recibidas
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApiInterface
     */
    incomingSpeiTransactionsReportUsingGET(authorization: string, subscription: string, options: any): Promise<Array<Deposit>>;
    /**
     * Consulta las transferencias de salida registradas en una petición, las transferencias que regresa este recuso son únicamente las transferencias de salida agrupadas al identificador de la petición que se generó al hacer el registro de las transacciones el cual se debe especificar como parte del path de este endpoint.
     * @summary Consulta de transferencias de salida por identificador de petición
     * @param {string} authorization Header para token
     * @param {string} requestId Identificador de la petición a buscar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApiInterface
     */
    outCommingSpeiRequestIdTransactionsReportUsingGET(authorization: string, requestId: string, subscription: string, options: any): Promise<PaymentsRequestId>;
    /**
     * Consulta las transferencias realizadas en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias recibidas en el día en el que se realiza la consulta.<br>Se pueden realizar consultas por <strong>order_id</strong> al realizar este tipo de consultas no importa el día en el que se realizó la transferencia
     * @summary Consulta de transferencias realizadas
     * @param {string} authorization Header para token
     * @param {string} [orderId] Identificador de la orden a buscar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApiInterface
     */
    outgoingSpeiTransactionsReportUsingGET(authorization: string, orderId: string, subscription: string, options: any): Promise<Array<Payment>>;
    /**
     * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias deben ser confirmadas por el cliente para que se efectuen.
     * @summary Registro de transferencias
     * @param {TransactionsOutgoingRegister} body Información de las transferencias SPEI de salida
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApiInterface
     */
    registerOutgoingSpeiTransactionUsingPOST(body: TransactionsOutgoingRegister, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
}
/**
 * TransferenciasSPEIApi - object-oriented interface
 * @export
 * @class TransferenciasSPEIApi
 * @extends {BaseAPI}
 */
export declare class TransferenciasSPEIApi extends BaseAPI implements TransferenciasSPEIApiInterface {
    /**
     * Agrupa transacciones SPEI/SPID en un transaction_id, generando la URL para su autorización. Las transacciones deben estar en estatus PENDING y pertenecer a un mmismo contrato
     * @summary Agrupa un conjunto de transacciones bajo un mismo request_id para autorizar
     * @param {AuthorizationTransactionGroup} body authorizationTransactionsGroupRequestDTO
     * @param {string} authorization Header para token
     * @param {string} subscription Identificador de la suscripcion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApi
     */
    createAuthorizationTransactionsGroup(body: AuthorizationTransactionGroup, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
    /**
     * Elimina un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias no deben haber sido confirmadas por el cliente.
     * @summary Eliminación de transferencias SPEI® pendientes
     * @param {string} authorization Header para token
     * @param {string} [orderId] Listado de identificadores dentro del request_id para eliminar
     * @param {string} requestId Identificador de las transferencias a eliminar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApi
     */
    dropTransactionsPendingUsingDELETE(authorization: string, orderId: string, requestId: string, subscription: string, options: any): Promise<Response>;
    /**
     * Realiza una consulta de las transferencias recibidas (depósitos) en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias  recibidas durante el día en el que se realiza la consulta.
     * @summary Consulta de transferencias recibidas
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApi
     */
    incomingSpeiTransactionsReportUsingGET(authorization: string, subscription: string, options: any): Promise<Deposit[]>;
    /**
     * Consulta las transferencias de salida registradas en una petición, las transferencias que regresa este recuso son únicamente las transferencias de salida agrupadas al identificador de la petición que se generó al hacer el registro de las transacciones el cual se debe especificar como parte del path de este endpoint.
     * @summary Consulta de transferencias de salida por identificador de petición
     * @param {string} authorization Header para token
     * @param {string} requestId Identificador de la petición a buscar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApi
     */
    outCommingSpeiRequestIdTransactionsReportUsingGET(authorization: string, requestId: string, subscription: string, options: any): Promise<PaymentsRequestId>;
    /**
     * Consulta las transferencias realizadas en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias recibidas en el día en el que se realiza la consulta.<br>Se pueden realizar consultas por <strong>order_id</strong> al realizar este tipo de consultas no importa el día en el que se realizó la transferencia
     * @summary Consulta de transferencias realizadas
     * @param {string} authorization Header para token
     * @param {string} [orderId] Identificador de la orden a buscar
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApi
     */
    outgoingSpeiTransactionsReportUsingGET(authorization: string, orderId: string, subscription: string, options: any): Promise<Payment[]>;
    /**
     * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias deben ser confirmadas por el cliente para que se efectuen.
     * @summary Registro de transferencias
     * @param {TransactionsOutgoingRegister} body Información de las transferencias SPEI de salida
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPEIApi
     */
    registerOutgoingSpeiTransactionUsingPOST(body: TransactionsOutgoingRegister, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
}
/**
 * TransferenciasSPIDApi - fetch parameter creator
 * @export
 */
export declare const TransferenciasSPIDApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Obtiene las clasificaciones para operaciones con dólares (SPID) de Monex.<br/>Este recurso se debe invocar previo al realizar una operación SPID.<br/>Se requiere que el token de autenticación se genere con scope spid_admin.
     * @summary Consulta las clasificaciones para operaciones con SPID
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getSpidClassificationsUsingGET(authorization: string, subscription: string, options?: any): FetchArgs;
    /**
     * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias deben ser confirmadas por el cliente para que se efectuen.
     * @summary Registro de transferencias SPID
     * @param {TransactionOutgoingSpid} body Información de las transferencias SPID de salida
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerOutgoingSpidTransactionUsingPOST(body: TransactionOutgoingSpid, authorization: string, subscription: string, options?: any): FetchArgs;
};
/**
 * TransferenciasSPIDApi - functional programming interface
 * @export
 */
export declare const TransferenciasSPIDApiFp: (configuration: Configuration) => {
    /**
     * Obtiene las clasificaciones para operaciones con dólares (SPID) de Monex.<br/>Este recurso se debe invocar previo al realizar una operación SPID.<br/>Se requiere que el token de autenticación se genere con scope spid_admin.
     * @summary Consulta las clasificaciones para operaciones con SPID
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getSpidClassificationsUsingGET(authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<SpidClassificationsResponseDTO>;
    /**
     * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias deben ser confirmadas por el cliente para que se efectuen.
     * @summary Registro de transferencias SPID
     * @param {TransactionOutgoingSpid} body Información de las transferencias SPID de salida
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerOutgoingSpidTransactionUsingPOST(body: TransactionOutgoingSpid, authorization: string, subscription: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<TokenRequiredResponse>;
};
/**
 * TransferenciasSPIDApi - factory interface
 * @export
 */
export declare const TransferenciasSPIDApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Obtiene las clasificaciones para operaciones con dólares (SPID) de Monex.<br/>Este recurso se debe invocar previo al realizar una operación SPID.<br/>Se requiere que el token de autenticación se genere con scope spid_admin.
     * @summary Consulta las clasificaciones para operaciones con SPID
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getSpidClassificationsUsingGET(authorization: string, subscription: string, options: any): Promise<SpidClassificationsResponseDTO>;
    /**
     * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias deben ser confirmadas por el cliente para que se efectuen.
     * @summary Registro de transferencias SPID
     * @param {TransactionOutgoingSpid} body Información de las transferencias SPID de salida
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerOutgoingSpidTransactionUsingPOST(body: TransactionOutgoingSpid, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
};
/**
 * TransferenciasSPIDApi - interface
 * @export
 * @interface TransferenciasSPIDApi
 */
export interface TransferenciasSPIDApiInterface {
    /**
     * Obtiene las clasificaciones para operaciones con dólares (SPID) de Monex.<br/>Este recurso se debe invocar previo al realizar una operación SPID.<br/>Se requiere que el token de autenticación se genere con scope spid_admin.
     * @summary Consulta las clasificaciones para operaciones con SPID
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPIDApiInterface
     */
    getSpidClassificationsUsingGET(authorization: string, subscription: string, options: any): Promise<SpidClassificationsResponseDTO>;
    /**
     * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias deben ser confirmadas por el cliente para que se efectuen.
     * @summary Registro de transferencias SPID
     * @param {TransactionOutgoingSpid} body Información de las transferencias SPID de salida
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPIDApiInterface
     */
    registerOutgoingSpidTransactionUsingPOST(body: TransactionOutgoingSpid, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
}
/**
 * TransferenciasSPIDApi - object-oriented interface
 * @export
 * @class TransferenciasSPIDApi
 * @extends {BaseAPI}
 */
export declare class TransferenciasSPIDApi extends BaseAPI implements TransferenciasSPIDApiInterface {
    /**
     * Obtiene las clasificaciones para operaciones con dólares (SPID) de Monex.<br/>Este recurso se debe invocar previo al realizar una operación SPID.<br/>Se requiere que el token de autenticación se genere con scope spid_admin.
     * @summary Consulta las clasificaciones para operaciones con SPID
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPIDApi
     */
    getSpidClassificationsUsingGET(authorization: string, subscription: string, options: any): Promise<SpidClassificationsResponseDTO>;
    /**
     * Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias deben ser confirmadas por el cliente para que se efectuen.
     * @summary Registro de transferencias SPID
     * @param {TransactionOutgoingSpid} body Información de las transferencias SPID de salida
     * @param {string} authorization Header para token
     * @param {string} subscription El identificador de la suscripción a esta API
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TransferenciasSPIDApi
     */
    registerOutgoingSpidTransactionUsingPOST(body: TransactionOutgoingSpid, authorization: string, subscription: string, options: any): Promise<TokenRequiredResponse>;
}
/**
 * WebhooksApi - fetch parameter creator
 * @export
 */
export declare const WebhooksApiFetchParamCreator: (configuration: Configuration) => {
    /**
     * Obtiene un webhook registrado en la plataforma mediante su identificador.
     * @summary Consulta de Webhook
     * @param {string} authorization Header para token
     * @param {string} id Identificador del webhook
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getWebhook(authorization: string, id: string, options?: any): FetchArgs;
    /**
     * Obtiene los webhooks registrados en la plataforma que tengan estatus 'ACTIVE' e 'INACTIVE'.
     * @summary Consulta de Webhooks
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getWebhooks(authorization: string, options?: any): FetchArgs;
    /**
     * Registra un webhook en la plataforma para su uso como notificador de eventos cuando estos ocurran.
     * @summary Alta de Webhook
     * @param {WebhookRequest} body Información para registrar un Webhook
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerWebhook(body: WebhookRequest, authorization: string, options?: any): FetchArgs;
};
/**
 * WebhooksApi - functional programming interface
 * @export
 */
export declare const WebhooksApiFp: (configuration: Configuration) => {
    /**
     * Obtiene un webhook registrado en la plataforma mediante su identificador.
     * @summary Consulta de Webhook
     * @param {string} authorization Header para token
     * @param {string} id Identificador del webhook
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getWebhook(authorization: string, id: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<WebhookResponse>;
    /**
     * Obtiene los webhooks registrados en la plataforma que tengan estatus 'ACTIVE' e 'INACTIVE'.
     * @summary Consulta de Webhooks
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getWebhooks(authorization: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<WebhooksList>;
    /**
     * Registra un webhook en la plataforma para su uso como notificador de eventos cuando estos ocurran.
     * @summary Alta de Webhook
     * @param {WebhookRequest} body Información para registrar un Webhook
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerWebhook(body: WebhookRequest, authorization: string, options: any): (fetch: FetchAPI, basePath: string) => Promise<WebhookResponse>;
};
/**
 * WebhooksApi - factory interface
 * @export
 */
export declare const WebhooksApiFactory: (configuration: Configuration, fetch: FetchAPI, basePath: string) => {
    /**
     * Obtiene un webhook registrado en la plataforma mediante su identificador.
     * @summary Consulta de Webhook
     * @param {string} authorization Header para token
     * @param {string} id Identificador del webhook
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getWebhook(authorization: string, id: string, options: any): Promise<WebhookResponse>;
    /**
     * Obtiene los webhooks registrados en la plataforma que tengan estatus 'ACTIVE' e 'INACTIVE'.
     * @summary Consulta de Webhooks
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getWebhooks(authorization: string, options: any): Promise<WebhooksList>;
    /**
     * Registra un webhook en la plataforma para su uso como notificador de eventos cuando estos ocurran.
     * @summary Alta de Webhook
     * @param {WebhookRequest} body Información para registrar un Webhook
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    registerWebhook(body: WebhookRequest, authorization: string, options: any): Promise<WebhookResponse>;
};
/**
 * WebhooksApi - interface
 * @export
 * @interface WebhooksApi
 */
export interface WebhooksApiInterface {
    /**
     * Obtiene un webhook registrado en la plataforma mediante su identificador.
     * @summary Consulta de Webhook
     * @param {string} authorization Header para token
     * @param {string} id Identificador del webhook
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApiInterface
     */
    getWebhook(authorization: string, id: string, options: any): Promise<WebhookResponse>;
    /**
     * Obtiene los webhooks registrados en la plataforma que tengan estatus 'ACTIVE' e 'INACTIVE'.
     * @summary Consulta de Webhooks
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApiInterface
     */
    getWebhooks(authorization: string, options: any): Promise<WebhooksList>;
    /**
     * Registra un webhook en la plataforma para su uso como notificador de eventos cuando estos ocurran.
     * @summary Alta de Webhook
     * @param {WebhookRequest} body Información para registrar un Webhook
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApiInterface
     */
    registerWebhook(body: WebhookRequest, authorization: string, options: any): Promise<WebhookResponse>;
}
/**
 * WebhooksApi - object-oriented interface
 * @export
 * @class WebhooksApi
 * @extends {BaseAPI}
 */
export declare class WebhooksApi extends BaseAPI implements WebhooksApiInterface {
    /**
     * Obtiene un webhook registrado en la plataforma mediante su identificador.
     * @summary Consulta de Webhook
     * @param {string} authorization Header para token
     * @param {string} id Identificador del webhook
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApi
     */
    getWebhook(authorization: string, id: string, options: any): Promise<WebhookResponse>;
    /**
     * Obtiene los webhooks registrados en la plataforma que tengan estatus 'ACTIVE' e 'INACTIVE'.
     * @summary Consulta de Webhooks
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApi
     */
    getWebhooks(authorization: string, options: any): Promise<WebhooksList>;
    /**
     * Registra un webhook en la plataforma para su uso como notificador de eventos cuando estos ocurran.
     * @summary Alta de Webhook
     * @param {WebhookRequest} body Información para registrar un Webhook
     * @param {string} authorization Header para token
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebhooksApi
     */
    registerWebhook(body: WebhookRequest, authorization: string, options: any): Promise<WebhookResponse>;
}
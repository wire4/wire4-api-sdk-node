# coding: utf-8

"""
    Wire4RestAPI

     # Referencia de API La API de Wire4 está organizada en torno a REST. Nuestra API tiene URLs predecibles orientadas a los recursos, acepta peticiones en formato JSON, y las respuestas devueltas son formato JSON y utiliza códigos de respuesta HTTP, autenticación y verbos estándares.  Puede usar la API de Wire4 en nuestro entorno de prueba, que no afecta sus productivos ni interactúa con la red bancaria. La URL de conexión que se usa para invocar los servicios determina si la solicitud es en modo en de prueba o en modo producción.    # Autenticación La API de Wire4 utiliza el protocolo OAuth 2.0 para autenticación y autorización.   Para comenzar, es necesario que registre una cuenta en nuestro ambiente de pruebas en [registro](https://app-sndbx.wire4.mx/#/register) y obtenga las credenciales de cliente OAuth 2.0 desde la [consola de administración](https://app-sndbx.wire4.mx/#/dashboard/api-keys).   Esta página ofrece una descripción general de los escenarios de autorización de OAuth 2.0 que admite Wire4.   Después de crear su aplicación con Wire4, asegúrese de tener a la mano su `client_id` y `client_secret`. El siguiente paso es descubrir qué flujo de OAuth2 es el adecuado para sus propósitos.   ## URLS La siguiente tabla muestra las urls de los recursos de autenticación para el ambiente de pruebas.  URL                  | Descripción ------------------------------------ | ------------- https://sandbox-api.wire4.mx/token   | Obtener token de autorización llaves de API (*client_id*, *client_secret*), datos de suscripción (*client_id*, *client_secret*, *user_key*, *user_secret*) o (*refresh_token*) https://sandbox-api.wire4.mx/revoke  | Revocación de token  **Nota:** De acuerdo con el RFC 6749, la URL del token sólo acepta el tipo de contenido x-www-form-urlencoded. El contenido JSON no está permitido y devolverá un error.  ## Scopes Los `scopes` limitan el acceso de una aplicación a los recursos de Wire4. Se ofrecen los siguientes scopes:   Scope                    | Descripción ------------------------------------ | ------------- general                              | Permite llamar a operaciones que no requieren a un cliente Monex suscrito en Wire4, los recursos que se pueden consumir con este scope son: consulta de Instituciones, CEP y generación de una presuscripción. spei_admin                           | Permite llamar a operaciones que requieren de un cliente Monex suscrito en Wire4, ya que se proporciona información de saldos, administración de transacciones, cuentas de beneficiarios y cuentas de depositantes. spid_admin                           | Permite llamar sólo a operaciones SPID, se requiere de un cliente Monex suscrito en Wire4. codi_admin                           | Permite llamar sólo a operaciones CoDi. codi_report                          | Permite generar reportes de operaciones CoDi.  ## Tipos de autenticación   Wire4 cuenta con dos tipos de autenticación: Autenticación de Aplicación (OAuth 2.0  Client Credentials Grant)  y Autenticación de Usuario de Aplicación (OAuth 2.0 Password Grant).  ### Autenticación de Aplicación  Esta autenticación se obtiene proporcionando únicamente las llaves de API las cuales se pueden consultar en [Llaves de API](https://app-sndbx.wire4.mx/#/dashboard/api-keys) de la consola de administración.  La autenticación de aplicación sólo permite acceso a los recursos que no requieren una suscripción activa de un cliente Monex en Wire4.  Para este tipo de autenticación se sigue el flujo OAuth 2.0 Client Credentials Grant, que se describe más adelante en **Obtener el token de acceso de aplicación**, con este token se tiene acceso a los siguientes recursos:   * [/subscriptions/pre-subscription](link) * [/institutions](link>) * [/ceps](<link>)   ### Autenticación de Usuario de Aplicación  Esta autenticación se obtiene proporcionando las llaves de API las cuales se pueden consultar en [Llaves de API](https://app-sndbx.wire4.mx/#/dashboard/api-keys) más el ***user_key*** y ***user_secret*** que se proporcionan al momento de crear una suscripción, para más información puedes consultar la guía [creación de suscripción](https://www.wire4.mx/#/guides/subscriptions).  Con este tipo de autenticación se puede acceder a los recursos que proporcionan información de una cuenta Monex como saldos y administración de transacciones, cuentas de beneficiarios y cuentas de depositantes.    ## Obtener token de acceso Antes de que su aplicación pueda acceder a los datos mediante la API de Wire4, debe obtener un token de acceso ***(access_token)*** que le otorgue acceso a la API. En las siguientes secciones se muestra como obtener un token para cada una de las autenticaciones.     ### Obtener el token de acceso para autenticación de aplicación  El primer paso es crear la solicitud de token de acceso (*access_token*), con los parámetros que identifican su aplicación, el siguiente código muestra cómo obtener un `token`.  ``` curl -k -d \"grant_type= client_credentials&scope=general\"  -u \"<client id>:<client secret>\" https://sandbox-api.wire4.mx/token ``` **Ejemplo:**   ``` curl -k -d \"grant_type=client_credentials&scope=general\"  -u \"8e59YqaFW_Yo5dwWNxEY8Lid0u0a:AXahn79hfKWBXKzQfj011x8cvcQa\"  https://sandbox-api.wire4.mx /token ``` Obtendrá una respuesta como la que se muestra  a continuación, donde se debe obtener el *access_token* para realizar llamadas posteriores a la API.   ``` {     \"access_token\":\"eyJ4NXQiOiJZak5sWVdWa05tWmlNR1ZoTldSaU1EUXpaREJpWlRJNU1qYzFZV1ZoWWpneU5UYzJPV05sWVEiLCJraWQiOiJZak5sWVdWa05tWmlNR1ZoTldSaU1EUXpaREJpWlRJNU1qYzFZV1ZoWWpneU5UYzJPV05sWVEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpc21hZWwuZXNjYW1pbGxhQHRjcGlwLnRlY2hAc2FuZGJveC5zcGVpb2suY29tIiwiYXVkIjoiOGU1OVlxYUZXX1lvNWR3V054RVk4TGlkMHUwYSIsIm5iZiI6MTU3MTMyMDg3NywiYXpwIjoiOGU1OVlxYUZXX1lvNWR3V054RVk4TGlkMHUwYSIsInNjb3BlIjoiYW1fYXBwbGljYXRpb25fc2NvcGUgZ2VuZXJhbCIsImlzcyI6ImFwaW0taWRwIiwiZXhwIjoxNTcxMzI0NDc3LCJpYXQiOjE1NzEzMjA4NzcsImp0aSI6ImJkMTdjMjcyLTg4MGQtNDk0ZS1iMTMwLTBiYTkwMjYyN2M4NCJ9.AjngGylkd_Chs5zlIjyLRPu9xPGyz4dfCd_aax2_ts653xrnNMoLpVHUDmaxIDFF2XyBJKH2IAbKxjo6VsFM07QkoPhlysO1PLoAF-Vkt4xYkh-f7nJRl0oOe2utDWFlUdgiAOmx5tPcStrdCEftgNNrjwJ50LXysFjXVshpoST-zIJPLgXknM3esGrkAsLcZRM7XUB187jxLHbtefVYPMvSO31T9pd5_Co9UXdeHpuA98sk_wZknASM1phxXQZAMLRLHz3LYvjCWCr_v80oVCM9SWTzf0vrMI6xphoIfirfWloADKPTTSUpIGBw9ePF_WbEPvbMm_BZaApJcEH2w\",    \"scope\":\"am_application_scope general\",    \"token_type\":\"Bearer\",    \"expires_in\":3600 }  ```  Es posible generar tokens con mas de un scope, en caso que sea necesario utilizar dicho token para hacer mas de una operación. Para generarlo basta con agregarlo a la petición separado por un espacio.     ``` curl -k -d \"grant_type=client_credentials&scope=codi_general codi_report\"  -u \"8e59YqaFW_Yo5dwWNxEY8Lid0u0a:AXahn79hfKWBXKzQfj011x8cvcQa\"  https://sandbox-api.wire4.mx /token ```  ### Obtener el token de acceso para autenticación usuario de aplicación   Antes de que su aplicación pueda acceder a los datos de una cuenta Monex mediante la API de Wire4, debe obtener un token de acceso  (*access_token*) que le otorgue acceso a la API y contar con el  *user_key* y *user_secret* que se proporcionan al momento de crear  una suscripción para más información puedes consultar [creación de suscripción](https://wire4.mx/#/guides/subscriptions) .   El primer paso es crear la solicitud de token de acceso con los parámetros que identifican su aplicación y la suscripción y con `scope` `spei_admin`  ```   curl -k -d \"grant_type=password&scope=spei_admin&username=<user_key>&password=<user_secret>\"  -u \"<client_id>:<client_secret>\" https://sandbox-api.wire4.mx/token ``` **Ejemplo**  ``` curl -k -d \"grant_type=password&scope=spei_admin&username=6 nbC5e99tTO@sandbox.wire4com&password= Nz7IqJGe9h\" -u \" zgMlQbqmOr:plkMJoPXCI\" https://sandbox-api.wire4.mx /token  ```  ``` {     \"access_token\":\"eyJ4NXQiOiJPR1EyTURFM00yTmpObVZoTnpFeE5EWXlObUV4TURKa01qUTJaVEU0TWpGaE1tVmlZakV5TkEiLCJraWQiOiJPR1EyTURFM00yTmpObVZoTnpFeE5EWXlObUV4TURKa01qUTJaVEU0TWpGaE1tVmlZakV5TkEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIzMzE0ODRlZTdjZDRkYWU5MzRmMjY2Zjc5YmY1YWFAZGV2LWllc2NhbWlsbGEuc3BlaW9rLmNvbSIsImF1ZCI6IkJVR0xjNWw1bW5CZXlPeGxtamNUZ0JoS19WTWEiLCJuYmYiOjE1NzEzNDk4ODMsImF6cCI6IkJVR0xjNWw1bW5CZXlPeGxtamNUZ0JoS19WTWEiLCJzY29wZSI6InNwZWlfYWRtaW4iLCJpc3MiOiJhcGltLWlkcCIsImV4cCI6MTU3MTM1MzQ4MywiaWF0IjoxNTcxMzQ5ODgzLCJqdGkiOiJiOWQ1M2Q0MC0xN2MwLTQxOTItYjUwNy0wZWFhN2ZkNDA1MGYifQ.hLTk8AFoIce1GpLcgch-U5aLLgiiFTo49wfBErD8D6VF-H9sG13ZyfAx9T-vQkk2m1zPapYVQjwibz3GRAJMN0Vczs6flV1mUJwFDQbEE-AELPdRcaRFOMBCfF6H9TVLfhFsGb9U2pVR9TLJcKqR57DyO_dIcc9I6d0tIkxqn2VcqypLVi5YQf36WzBbPeG-iPHYpMA-bhr4rwfjKA-O6jm1NSSxNHF4sHS0YHDPoO_x6cCc677MQEe0_CozfnQhoEWNfG8tcWUqhPtmcfjqon1p7PdQoXxriq_R85d06pVO9Se7Q6ok0V8Qgz0MOJ6z3ku6mtZSuba7niMAOt2TyA\",    \"refresh_token\":\"f962d5c6-0d99-3809-8275-11c7aa0aa020\",    \"scope\":\"spei_admin\",    \"token_type\":\"Bearer\",    \"expires_in\":3600 } ```  **Nota:** Los ejemplos anteriores se presentan considerando que se realiza una implementación desde cero,  esto se puede simplificar a sólo configurar sus llaves (*client_id*, *client_secret*),  datos de suscripción (*client_id*, *client_secret*, *user_key*, *user_secret*) si utiliza nuestros sdks.      ## Caducidad del token El token de acceso es válido durante 60 minutos (una hora), después de transcurrido este tiempo se debe solicitar un nuevo token,  cuando el token caduca se obtendrá un error ***401 Unauthorized*** con mensaje ***“Invalid Credentials”.***   El nuevo token se puede solicitar  utilizando el último token de actualización (***refresh_token***) que se devolvió en la solicitud del token,   esto sólo aplica para el token de tipo password (Autenticación de Usuario de Aplicación). El siguiente ejemplo muestra cómo obtener un toke con el token de actualización.  ``` curl -k -d \"grant_type=refresh_token&refresh_token=<refresh_token>\" -u \" Client_Id:Client_Secret\" -H \"Content-Type: application/x-www-form-urlencoded\" https://sandbox-api.wire4.mx/oauth2/token ```  **Ejemplo:**  ``` curl -k -d \"grant_type=refresh_token&refresh_token=f932d5c6-0d39-3809-8275-11c7ax0aa020\" -u \"zgMlQbqmOr:plkMJoPXCI\" -H \"Content-Type: application/x-www-form-urlencoded\" https://sandbox-api.wire4.mx/token ```  El token de actualización (***refresh_token***) tiene una duración de hasta 23 horas. Si en este periodo no se utiliza, se tienen que solicitar un nuevo token.  Un token de acceso podría dejar de funcionar por uno de estos motivos:  * El usuario ha revocado el acceso a su aplicación, si un usuario ha solicitado la baja de su aplicación de WIre4. * El token de acceso ha caducado: si el token de acceso ha pasado de una hora, recibirá un error ***401 Unauthorized*** mientras realiza una llamada a la API de Wire4. Cuando esto sucede, debe solicitar un nuevo token utilizando el token de actualización que recibió por última al solicitar un token, sólo aplica si el token en cuestión es de autenticación de usuario de aplicación, en caso contrario solicitar un nuevo token.   ## Revocar token Su aplicación puede revocar mediante programación el token de acceso, una vez revocado el token no podrá hacer uso de él para acceder a la API. El siguiente código muestra un ejemplo de cómo revocar el token:    ```  curl -X POST --basic -u \"<client id>:<client secret>\" -H \"Content-Type: application/x-www-form-urlencoded;charset=UTF-8\" -k -d \"token=<token to revoke>&token_type_hint=access_token\" https://sandbox-api.wire4.mx/revoke ```      **Ejemplo:**  ```   curl -X POST --basic -u \"8e59YqaFW_Yo5dwWNxEY8Lid0u0a:AXahn79hfKWBXKzQfj011x8cvcQa\" -H \"Content-Type: application/x-www-form-urlencoded;charset=UTF-8\" -k -d \"token=eyJ4NXQiOiJZak5sWVdWa05tWmlNR1ZoTldSaU1EUXpaREJpWlRJNU1qYzFZV1ZoWWpneU5UYzJPV05sWVEiLCJraWQiOiJZak5sWVdWa05tWmlNR1ZoTldSaU1EUXpaREJpWlRJNU1qYzFZV1ZoWWpneU5UYzJPV05sWVEiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJpc21hZWwuZXNjYW1pbGxhQHRjcGlwLnRlY2hAc2FuZGJveC5zcGVpb2suY29tIiwiYXVkIjoiOGU1OVlxYUZXX1lvNWR3V054RVk4TGlkMHUwYSIsIm5iZiI6MTU3MTMyMDg3NywiYXpwIjoiOGU1OVlxYUZXX1lvNWR3V054RVk4TGlkMHUwYSIsInNjb3BlIjoiYW1fYXBwbGljYXRpb25fc2NvcGUgZ2VuZXJhbCIsImlzcyI6ImFwaW0taWRwIiwiZXhwIjoxNTcxMzI0NDc3LCJpYXQiOjE1NzEzMjA4NzcsImp0aSI6ImJkMTdjMjcyLTg4MGQtNDk0ZS1iMTMwLTBiYTkwMjYyN2M4NCJ9.AjngGylkd_Chs5zlIjyLRPu9xPGyz4dfCd_aax2_ts653xrnNMoLpVHUDmaxIDFF2XyBJKH2IAbKxjo6VsFM07QkoPhlysO1PLoAF-Vkt4xYkh-f7nJRl0oOe2utDWFlUdgiAOmx5tPcStrdCEftgNNrjwJ50LXysFjXVshpoST-zIJPLgXknM3esGrkAsLcZRM7XUB187jxLHbtefVYPMvSO31T9pd5_Co9UXdeHpuA98sk_wZknASM1phxXQZAMLRLHz3LYvjCWCr_v80oVCM9SWTzf0vrMI6xphoIfirfWloADKPTTSUpIGBw9ePF_WbEPvbMm_BZaApJcEH2w&token_type_hint=access_token\"  https://sandbox-api.wire4.mx/revoke ```  # Ambientes  Wire4 cuentas con dos ambientes Pruebas (Sandbox) y Producción, son dos ambientes separados los cuales se pueden utilizar simultáneamente. Los usuarios que han sido creados en cada uno de los ambientes no son intercambiables.   Las ligas de acceso a la `api` para cada uno de los ambientes son:  * Pruebas  https://sandbox-api.wire4.mx * Producción https://api.wire4.mx     # Eventos  Los eventos son nuestra forma de informarle cuando algo  sucede en su cuenta. Cuando ocurre un evento se crea un objeto  [Evento](#tag/Webhook-Message). Por ejemplo, cuando se recibe un depósito, se crea un evento TRANSACTION.INCOMING.UPDATED.   Los eventos ocurren cuando cambia el estado de un recurso. El recurso se encuentra dentro del objeto [Evento](#tag/Webhook-Message) en el campo data.  Por ejemplo, un evento TRANSACTION.INCOMING.UPDATED contendrá un depósito y un evento ACCOUNT.CREATED contendrá una cuenta.   Wire4 puede agregar más campos en un futuro, o agregar nuevos valores a campos existentes, por lo que es recomendado que tu endpoint pueda manejar datos adicionales desconocidos. En esta [liga](#tag/Webhook-Message) se encuentra  la definición del objeto [Evento](#tag/Webhook-Message).  ## Tipos de Eventos  Wire4 cuenta con los siguientes tipos de eventos*   | Evento                     | Tipo                               | Objeto                                        | | -------------------------- |----------------------------------- | --------------------------------------------- | | Suscripción                | ENROLLMENT.CREATED                 | [suscription](#tag/subscription)              | | Cuenta de beneficiario     | ACCOUNT.CREATED                    | [beneficiary](#tag/BeneficiaryAccount)        | | Depósito recibido          | TRANSACTION.INCOMING.UPDATED       | [spei_incoming](#tag/deposit)                 | | Transferencia realizada    | TRANSACTION.OUTGOING.RECEIVED      | [spei_outgoing](#tag/transfer)                | | Transferencia SPID enviada | TRANSACTION.OUTGOING.SPID.RECEIVED | [spid_outgoing](#tag/transfer)                | | Transferencias Autorizadas | REQUEST.OUTGOING.CHANGED           | [request_outgoing](#tag/requestOutMsg)        | | Punto de venta CoDi        | SALE.POINT.CREATED                 |  # noqa: E501

    OpenAPI spec version: 1.0.0
    
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

from __future__ import absolute_import

import re  # noqa: F401

# python 2 and python 3 compatibility library
import six

from wire4_client.api_client import ApiClient


class CuentasDeBeneficiariosSPEIApi(object):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    Ref: https://github.com/swagger-api/swagger-codegen
    """

    def __init__(self, api_client=None):
        if api_client is None:
            api_client = ApiClient()
        self.api_client = api_client

    def authorize_accounts_pending_put(self, body, authorization, subscription, **kwargs):  # noqa: E501
        """Recibe la solicitud para agrupar las cuentas SPEI/SPID de beneficiarios en estado pendiente que deben ser autorizadas  # noqa: E501

        Solicta autorizar las cuentas de beneficiarios en estado pendiente agrupandolas en un set de cuentas que pueden incluir tanto cuentas de SPI como de SPID, debe indicar las urls de redireccion en caso de error y en caso de exito<br/>  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.authorize_accounts_pending_put(body, authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param UrlsRedirect body: Información de la cuenta del beneficiario (required)
        :param str authorization: Header para token (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: AuthorizedBeneficiariesResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.authorize_accounts_pending_put_with_http_info(body, authorization, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.authorize_accounts_pending_put_with_http_info(body, authorization, subscription, **kwargs)  # noqa: E501
            return data

    def authorize_accounts_pending_put_with_http_info(self, body, authorization, subscription, **kwargs):  # noqa: E501
        """Recibe la solicitud para agrupar las cuentas SPEI/SPID de beneficiarios en estado pendiente que deben ser autorizadas  # noqa: E501

        Solicta autorizar las cuentas de beneficiarios en estado pendiente agrupandolas en un set de cuentas que pueden incluir tanto cuentas de SPI como de SPID, debe indicar las urls de redireccion en caso de error y en caso de exito<br/>  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.authorize_accounts_pending_put_with_http_info(body, authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param UrlsRedirect body: Información de la cuenta del beneficiario (required)
        :param str authorization: Header para token (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: AuthorizedBeneficiariesResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['body', 'authorization', 'subscription']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method authorize_accounts_pending_put" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'body' is set
        if ('body' not in params or
                params['body'] is None):
            raise ValueError("Missing the required parameter `body` when calling `authorize_accounts_pending_put`")  # noqa: E501
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `authorize_accounts_pending_put`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `authorize_accounts_pending_put`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'subscription' in params:
            path_params['subscription'] = params['subscription']  # noqa: E501

        query_params = []

        header_params = {}
        if 'authorization' in params:
            header_params['Authorization'] = params['authorization']  # noqa: E501

        form_params = []
        local_var_files = {}

        body_params = None
        if 'body' in params:
            body_params = params['body']
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # HTTP header `Content-Type`
        header_params['Content-Type'] = self.api_client.select_header_content_type(  # noqa: E501
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = []  # noqa: E501

        return self.api_client.call_api(
            '/subscriptions/{subscription}/beneficiaries/pending', 'PUT',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='AuthorizedBeneficiariesResponse',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def delete_account_using_delete(self, authorization, account, subscription, **kwargs):  # noqa: E501
        """Elimina la cuenta del beneficiario  # noqa: E501

        Borra la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción. La cuenta a borrar debe ser una cuenta que opere con SPEI.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.delete_account_using_delete(authorization, account, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str account: La cuenta del beneciario que será eliminada (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.delete_account_using_delete_with_http_info(authorization, account, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.delete_account_using_delete_with_http_info(authorization, account, subscription, **kwargs)  # noqa: E501
            return data

    def delete_account_using_delete_with_http_info(self, authorization, account, subscription, **kwargs):  # noqa: E501
        """Elimina la cuenta del beneficiario  # noqa: E501

        Borra la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción. La cuenta a borrar debe ser una cuenta que opere con SPEI.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.delete_account_using_delete_with_http_info(authorization, account, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str account: La cuenta del beneciario que será eliminada (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['authorization', 'account', 'subscription']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method delete_account_using_delete" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `delete_account_using_delete`")  # noqa: E501
        # verify the required parameter 'account' is set
        if ('account' not in params or
                params['account'] is None):
            raise ValueError("Missing the required parameter `account` when calling `delete_account_using_delete`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `delete_account_using_delete`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account' in params:
            path_params['account'] = params['account']  # noqa: E501
        if 'subscription' in params:
            path_params['subscription'] = params['subscription']  # noqa: E501

        query_params = []

        header_params = {}
        if 'authorization' in params:
            header_params['Authorization'] = params['authorization']  # noqa: E501

        form_params = []
        local_var_files = {}

        body_params = None
        # Authentication setting
        auth_settings = []  # noqa: E501

        return self.api_client.call_api(
            '/subscriptions/{subscription}/beneficiaries/spei/{account}', 'DELETE',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type=None,  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def get_available_relationships_monex_using_get(self, authorization, subscription, **kwargs):  # noqa: E501
        """Consulta de relaciones  # noqa: E501

        Obtiene las posibles relaciones existentes para registrar beneficiarios en Monex. Se debe invocar este recurso antes de pre-registrar una cuenta de beneficiario.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_available_relationships_monex_using_get(authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str subscription: Identificador de la suscripción a esta API (required)
        :return: RelationshipsResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.get_available_relationships_monex_using_get_with_http_info(authorization, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.get_available_relationships_monex_using_get_with_http_info(authorization, subscription, **kwargs)  # noqa: E501
            return data

    def get_available_relationships_monex_using_get_with_http_info(self, authorization, subscription, **kwargs):  # noqa: E501
        """Consulta de relaciones  # noqa: E501

        Obtiene las posibles relaciones existentes para registrar beneficiarios en Monex. Se debe invocar este recurso antes de pre-registrar una cuenta de beneficiario.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_available_relationships_monex_using_get_with_http_info(authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str subscription: Identificador de la suscripción a esta API (required)
        :return: RelationshipsResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['authorization', 'subscription']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method get_available_relationships_monex_using_get" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `get_available_relationships_monex_using_get`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `get_available_relationships_monex_using_get`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'subscription' in params:
            path_params['subscription'] = params['subscription']  # noqa: E501

        query_params = []

        header_params = {}
        if 'authorization' in params:
            header_params['Authorization'] = params['authorization']  # noqa: E501

        form_params = []
        local_var_files = {}

        body_params = None
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = []  # noqa: E501

        return self.api_client.call_api(
            '/subscriptions/{subscription}/beneficiaries/relationships', 'GET',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='RelationshipsResponse',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def get_beneficiaries_by_request_id(self, authorization, request_id, subscription, **kwargs):  # noqa: E501
        """Consulta los beneficiarios por el identificador de la petición de registro  # noqa: E501

        Obtiene los beneficiarios enviados para registro en una petición al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex, que pertenezcan a la petición que se solicita.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_beneficiaries_by_request_id(authorization, request_id, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str request_id: El identificador de la petición del registro de beneficiarios a esta API (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: BeneficiariesResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.get_beneficiaries_by_request_id_with_http_info(authorization, request_id, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.get_beneficiaries_by_request_id_with_http_info(authorization, request_id, subscription, **kwargs)  # noqa: E501
            return data

    def get_beneficiaries_by_request_id_with_http_info(self, authorization, request_id, subscription, **kwargs):  # noqa: E501
        """Consulta los beneficiarios por el identificador de la petición de registro  # noqa: E501

        Obtiene los beneficiarios enviados para registro en una petición al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex, que pertenezcan a la petición que se solicita.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_beneficiaries_by_request_id_with_http_info(authorization, request_id, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str request_id: El identificador de la petición del registro de beneficiarios a esta API (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: BeneficiariesResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['authorization', 'request_id', 'subscription']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method get_beneficiaries_by_request_id" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `get_beneficiaries_by_request_id`")  # noqa: E501
        # verify the required parameter 'request_id' is set
        if ('request_id' not in params or
                params['request_id'] is None):
            raise ValueError("Missing the required parameter `request_id` when calling `get_beneficiaries_by_request_id`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `get_beneficiaries_by_request_id`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'request_id' in params:
            path_params['requestId'] = params['request_id']  # noqa: E501
        if 'subscription' in params:
            path_params['subscription'] = params['subscription']  # noqa: E501

        query_params = []

        header_params = {}
        if 'authorization' in params:
            header_params['Authorization'] = params['authorization']  # noqa: E501

        form_params = []
        local_var_files = {}

        body_params = None
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = []  # noqa: E501

        return self.api_client.call_api(
            '/subscriptions/{subscription}/beneficiaries/spei/{requestId}', 'GET',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='BeneficiariesResponse',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def get_beneficiaries_for_account_using_get(self, authorization, subscription, **kwargs):  # noqa: E501
        """Consulta los beneficiarios registrados  # noqa: E501

        Obtiene los beneficiarios registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_beneficiaries_for_account_using_get(authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :param str account: Cuenta del beneficiario, puede ser Clabe, TDD o Celular
        :param str beneficiary_bank: Clave del banco beneficiario
        :param str beneficiary_name: Nombre del beneficiario
        :param str end_date: Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
        :param str init_date: Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
        :param str rfc: RFC del beneficiario
        :param str status: Estatus de la cuenta
        :return: BeneficiariesResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.get_beneficiaries_for_account_using_get_with_http_info(authorization, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.get_beneficiaries_for_account_using_get_with_http_info(authorization, subscription, **kwargs)  # noqa: E501
            return data

    def get_beneficiaries_for_account_using_get_with_http_info(self, authorization, subscription, **kwargs):  # noqa: E501
        """Consulta los beneficiarios registrados  # noqa: E501

        Obtiene los beneficiarios registrados al contrato relacionado con la suscripción, Los beneficiarios son los que actualmente se encuentran registrados en banca Monex.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_beneficiaries_for_account_using_get_with_http_info(authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :param str account: Cuenta del beneficiario, puede ser Clabe, TDD o Celular
        :param str beneficiary_bank: Clave del banco beneficiario
        :param str beneficiary_name: Nombre del beneficiario
        :param str end_date: Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
        :param str init_date: Fecha de inicio del perido a filtrar en formato dd-mm-yyyy
        :param str rfc: RFC del beneficiario
        :param str status: Estatus de la cuenta
        :return: BeneficiariesResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['authorization', 'subscription', 'account', 'beneficiary_bank', 'beneficiary_name', 'end_date', 'init_date', 'rfc', 'status']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method get_beneficiaries_for_account_using_get" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `get_beneficiaries_for_account_using_get`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `get_beneficiaries_for_account_using_get`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'subscription' in params:
            path_params['subscription'] = params['subscription']  # noqa: E501

        query_params = []
        if 'account' in params:
            query_params.append(('account', params['account']))  # noqa: E501
        if 'beneficiary_bank' in params:
            query_params.append(('beneficiary_bank', params['beneficiary_bank']))  # noqa: E501
        if 'beneficiary_name' in params:
            query_params.append(('beneficiary_name', params['beneficiary_name']))  # noqa: E501
        if 'end_date' in params:
            query_params.append(('end_date', params['end_date']))  # noqa: E501
        if 'init_date' in params:
            query_params.append(('init_date', params['init_date']))  # noqa: E501
        if 'rfc' in params:
            query_params.append(('rfc', params['rfc']))  # noqa: E501
        if 'status' in params:
            query_params.append(('status', params['status']))  # noqa: E501

        header_params = {}
        if 'authorization' in params:
            header_params['Authorization'] = params['authorization']  # noqa: E501

        form_params = []
        local_var_files = {}

        body_params = None
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = []  # noqa: E501

        return self.api_client.call_api(
            '/subscriptions/{subscription}/beneficiaries/spei', 'GET',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='BeneficiariesResponse',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def pre_register_accounts_using_post(self, body, authorization, subscription, **kwargs):  # noqa: E501
        """Pre-registro de cuentas de beneficiarios.  # noqa: E501

        Pre-registra una o más cuentas de beneficiario en la plataforma, proporcionando una URL donde el cuentahabiente Monex debe ingresar un valor de su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/>Los posibles valores de <i>relationship</i> y <i>kind_of_relationship</i> se deben  obtener de /subscriptions/{subscription}/beneficiaries/relationships.<br/><br/>La confirmación de registro en Monex se realiza a través de una llamada a los webhooks registrados con el evento ACCOUNT.CREATED.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.pre_register_accounts_using_post(body, authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param AccountRequest body: Información de la cuenta del beneficiario (required)
        :param str authorization: Header para token (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: TokenRequiredResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.pre_register_accounts_using_post_with_http_info(body, authorization, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.pre_register_accounts_using_post_with_http_info(body, authorization, subscription, **kwargs)  # noqa: E501
            return data

    def pre_register_accounts_using_post_with_http_info(self, body, authorization, subscription, **kwargs):  # noqa: E501
        """Pre-registro de cuentas de beneficiarios.  # noqa: E501

        Pre-registra una o más cuentas de beneficiario en la plataforma, proporcionando una URL donde el cuentahabiente Monex debe ingresar un valor de su llave digital para confirmar el alta de las cuentas de beneficiarios.<br/>Los posibles valores de <i>relationship</i> y <i>kind_of_relationship</i> se deben  obtener de /subscriptions/{subscription}/beneficiaries/relationships.<br/><br/>La confirmación de registro en Monex se realiza a través de una llamada a los webhooks registrados con el evento ACCOUNT.CREATED.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.pre_register_accounts_using_post_with_http_info(body, authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param AccountRequest body: Información de la cuenta del beneficiario (required)
        :param str authorization: Header para token (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: TokenRequiredResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['body', 'authorization', 'subscription']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method pre_register_accounts_using_post" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'body' is set
        if ('body' not in params or
                params['body'] is None):
            raise ValueError("Missing the required parameter `body` when calling `pre_register_accounts_using_post`")  # noqa: E501
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `pre_register_accounts_using_post`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `pre_register_accounts_using_post`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'subscription' in params:
            path_params['subscription'] = params['subscription']  # noqa: E501

        query_params = []

        header_params = {}
        if 'authorization' in params:
            header_params['Authorization'] = params['authorization']  # noqa: E501

        form_params = []
        local_var_files = {}

        body_params = None
        if 'body' in params:
            body_params = params['body']
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # HTTP header `Content-Type`
        header_params['Content-Type'] = self.api_client.select_header_content_type(  # noqa: E501
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = []  # noqa: E501

        return self.api_client.call_api(
            '/subscriptions/{subscription}/beneficiaries/spei', 'POST',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='TokenRequiredResponse',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def remove_beneficiaries_pending_using_delete(self, authorization, request_id, subscription, **kwargs):  # noqa: E501
        """Eliminación de beneficiarios SPEI® sin confirmar  # noqa: E501

        Elimina un conjunto de beneficiarios a registrar en la cuenta del cliente Monex relacionada a la suscripción, los beneficiarios no deben haber sido confirmados por el cliente.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.remove_beneficiaries_pending_using_delete(authorization, request_id, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str request_id: Identificador de los beneficiarios a eliminar (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.remove_beneficiaries_pending_using_delete_with_http_info(authorization, request_id, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.remove_beneficiaries_pending_using_delete_with_http_info(authorization, request_id, subscription, **kwargs)  # noqa: E501
            return data

    def remove_beneficiaries_pending_using_delete_with_http_info(self, authorization, request_id, subscription, **kwargs):  # noqa: E501
        """Eliminación de beneficiarios SPEI® sin confirmar  # noqa: E501

        Elimina un conjunto de beneficiarios a registrar en la cuenta del cliente Monex relacionada a la suscripción, los beneficiarios no deben haber sido confirmados por el cliente.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.remove_beneficiaries_pending_using_delete_with_http_info(authorization, request_id, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str request_id: Identificador de los beneficiarios a eliminar (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['authorization', 'request_id', 'subscription']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method remove_beneficiaries_pending_using_delete" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `remove_beneficiaries_pending_using_delete`")  # noqa: E501
        # verify the required parameter 'request_id' is set
        if ('request_id' not in params or
                params['request_id'] is None):
            raise ValueError("Missing the required parameter `request_id` when calling `remove_beneficiaries_pending_using_delete`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `remove_beneficiaries_pending_using_delete`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'request_id' in params:
            path_params['requestId'] = params['request_id']  # noqa: E501
        if 'subscription' in params:
            path_params['subscription'] = params['subscription']  # noqa: E501

        query_params = []

        header_params = {}
        if 'authorization' in params:
            header_params['Authorization'] = params['authorization']  # noqa: E501

        form_params = []
        local_var_files = {}

        body_params = None
        # Authentication setting
        auth_settings = []  # noqa: E501

        return self.api_client.call_api(
            '/subscriptions/{subscription}/beneficiaries/spei/request/{requestId}', 'DELETE',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type=None,  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def update_amount_limit_account_using_put(self, body, authorization, account, subscription, **kwargs):  # noqa: E501
        """Actualiza el monto límite  # noqa: E501

        Actualiza el monto límite a la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.update_amount_limit_account_using_put(body, authorization, account, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param AmountRequest body: Información de la cuenta y el monto límite a actualizar (required)
        :param str authorization: Header para token (required)
        :param str account: Cuenta a actualizar (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.update_amount_limit_account_using_put_with_http_info(body, authorization, account, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.update_amount_limit_account_using_put_with_http_info(body, authorization, account, subscription, **kwargs)  # noqa: E501
            return data

    def update_amount_limit_account_using_put_with_http_info(self, body, authorization, account, subscription, **kwargs):  # noqa: E501
        """Actualiza el monto límite  # noqa: E501

        Actualiza el monto límite a la cuenta de beneficiario proporcionada relacionada al contrato perteneciente a la subscripción.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.update_amount_limit_account_using_put_with_http_info(body, authorization, account, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param AmountRequest body: Información de la cuenta y el monto límite a actualizar (required)
        :param str authorization: Header para token (required)
        :param str account: Cuenta a actualizar (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['body', 'authorization', 'account', 'subscription']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method update_amount_limit_account_using_put" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'body' is set
        if ('body' not in params or
                params['body'] is None):
            raise ValueError("Missing the required parameter `body` when calling `update_amount_limit_account_using_put`")  # noqa: E501
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `update_amount_limit_account_using_put`")  # noqa: E501
        # verify the required parameter 'account' is set
        if ('account' not in params or
                params['account'] is None):
            raise ValueError("Missing the required parameter `account` when calling `update_amount_limit_account_using_put`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `update_amount_limit_account_using_put`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'account' in params:
            path_params['account'] = params['account']  # noqa: E501
        if 'subscription' in params:
            path_params['subscription'] = params['subscription']  # noqa: E501

        query_params = []

        header_params = {}
        if 'authorization' in params:
            header_params['Authorization'] = params['authorization']  # noqa: E501

        form_params = []
        local_var_files = {}

        body_params = None
        if 'body' in params:
            body_params = params['body']
        # HTTP header `Content-Type`
        header_params['Content-Type'] = self.api_client.select_header_content_type(  # noqa: E501
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = []  # noqa: E501

        return self.api_client.call_api(
            '/subscriptions/{subscription}/beneficiaries/spei/{account}', 'PUT',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type=None,  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

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


class TransferenciasSPEIApi(object):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    Ref: https://github.com/swagger-api/swagger-codegen
    """

    def __init__(self, api_client=None):
        if api_client is None:
            api_client = ApiClient()
        self.api_client = api_client

    def create_authorization_transactions_group(self, body, authorization, subscription, **kwargs):  # noqa: E501
        """Agrupa un conjunto de transacciones bajo un mismo request_id para autorizar  # noqa: E501

        Agrupa transacciones SPEI/SPID en un transaction_id, generando la URL para su autorización. Las transacciones deben estar en estatus PENDING y pertenecer a un mmismo contrato  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.create_authorization_transactions_group(body, authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param AuthorizationTransactionGroup body: authorizationTransactionsGroupRequestDTO (required)
        :param str authorization: Header para token (required)
        :param str subscription: Identificador de la suscripcion (required)
        :return: TokenRequiredResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.create_authorization_transactions_group_with_http_info(body, authorization, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.create_authorization_transactions_group_with_http_info(body, authorization, subscription, **kwargs)  # noqa: E501
            return data

    def create_authorization_transactions_group_with_http_info(self, body, authorization, subscription, **kwargs):  # noqa: E501
        """Agrupa un conjunto de transacciones bajo un mismo request_id para autorizar  # noqa: E501

        Agrupa transacciones SPEI/SPID en un transaction_id, generando la URL para su autorización. Las transacciones deben estar en estatus PENDING y pertenecer a un mmismo contrato  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.create_authorization_transactions_group_with_http_info(body, authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param AuthorizationTransactionGroup body: authorizationTransactionsGroupRequestDTO (required)
        :param str authorization: Header para token (required)
        :param str subscription: Identificador de la suscripcion (required)
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
                    " to method create_authorization_transactions_group" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'body' is set
        if ('body' not in params or
                params['body'] is None):
            raise ValueError("Missing the required parameter `body` when calling `create_authorization_transactions_group`")  # noqa: E501
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `create_authorization_transactions_group`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `create_authorization_transactions_group`")  # noqa: E501

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
            ['*/*'])  # noqa: E501

        # HTTP header `Content-Type`
        header_params['Content-Type'] = self.api_client.select_header_content_type(  # noqa: E501
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = []  # noqa: E501

        return self.api_client.call_api(
            '/subscriptions/{subscription}/transactions/group', 'POST',
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

    def drop_transactions_pending_using_delete(self, authorization, request_id, subscription, **kwargs):  # noqa: E501
        """Eliminación de transferencias SPEI® pendientes  # noqa: E501

        Elimina un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias no deben haber sido confirmadas por el cliente.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.drop_transactions_pending_using_delete(authorization, request_id, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str request_id: Identificador de las transferencias a eliminar (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :param str order_id: Listado de identificadores dentro del request_id para eliminar
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.drop_transactions_pending_using_delete_with_http_info(authorization, request_id, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.drop_transactions_pending_using_delete_with_http_info(authorization, request_id, subscription, **kwargs)  # noqa: E501
            return data

    def drop_transactions_pending_using_delete_with_http_info(self, authorization, request_id, subscription, **kwargs):  # noqa: E501
        """Eliminación de transferencias SPEI® pendientes  # noqa: E501

        Elimina un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias no deben haber sido confirmadas por el cliente.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.drop_transactions_pending_using_delete_with_http_info(authorization, request_id, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str request_id: Identificador de las transferencias a eliminar (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :param str order_id: Listado de identificadores dentro del request_id para eliminar
        :return: None
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['authorization', 'request_id', 'subscription', 'order_id']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method drop_transactions_pending_using_delete" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `drop_transactions_pending_using_delete`")  # noqa: E501
        # verify the required parameter 'request_id' is set
        if ('request_id' not in params or
                params['request_id'] is None):
            raise ValueError("Missing the required parameter `request_id` when calling `drop_transactions_pending_using_delete`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `drop_transactions_pending_using_delete`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'request_id' in params:
            path_params['requestId'] = params['request_id']  # noqa: E501
        if 'subscription' in params:
            path_params['subscription'] = params['subscription']  # noqa: E501

        query_params = []
        if 'order_id' in params:
            query_params.append(('order_id', params['order_id']))  # noqa: E501

        header_params = {}
        if 'authorization' in params:
            header_params['Authorization'] = params['authorization']  # noqa: E501

        form_params = []
        local_var_files = {}

        body_params = None
        # Authentication setting
        auth_settings = []  # noqa: E501

        return self.api_client.call_api(
            '/subscriptions/{subscription}/transactions/outcoming/spei/request/{requestId}', 'DELETE',
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

    def incoming_spei_transactions_report_using_get(self, authorization, subscription, **kwargs):  # noqa: E501
        """Consulta de transferencias recibidas  # noqa: E501

        Realiza una consulta de las transferencias recibidas (depósitos) en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias  recibidas durante el día en el que se realiza la consulta.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.incoming_spei_transactions_report_using_get(authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: list[Deposit]
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.incoming_spei_transactions_report_using_get_with_http_info(authorization, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.incoming_spei_transactions_report_using_get_with_http_info(authorization, subscription, **kwargs)  # noqa: E501
            return data

    def incoming_spei_transactions_report_using_get_with_http_info(self, authorization, subscription, **kwargs):  # noqa: E501
        """Consulta de transferencias recibidas  # noqa: E501

        Realiza una consulta de las transferencias recibidas (depósitos) en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias  recibidas durante el día en el que se realiza la consulta.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.incoming_spei_transactions_report_using_get_with_http_info(authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: list[Deposit]
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
                    " to method incoming_spei_transactions_report_using_get" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `incoming_spei_transactions_report_using_get`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `incoming_spei_transactions_report_using_get`")  # noqa: E501

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
            '/subscriptions/{subscription}/transactions/incoming/spei', 'GET',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='list[Deposit]',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def out_comming_spei_request_id_transactions_report_using_get(self, authorization, request_id, subscription, **kwargs):  # noqa: E501
        """Consulta de transferencias de salida por identificador de petición  # noqa: E501

        Consulta las transferencias de salida registradas en una petición, las transferencias que regresa este recuso son únicamente las transferencias de salida agrupadas al identificador de la petición que se generó al hacer el registro de las transacciones el cual se debe especificar como parte del path de este endpoint.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.out_comming_spei_request_id_transactions_report_using_get(authorization, request_id, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str request_id: Identificador de la petición a buscar (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: PaymentsRequestId
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.out_comming_spei_request_id_transactions_report_using_get_with_http_info(authorization, request_id, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.out_comming_spei_request_id_transactions_report_using_get_with_http_info(authorization, request_id, subscription, **kwargs)  # noqa: E501
            return data

    def out_comming_spei_request_id_transactions_report_using_get_with_http_info(self, authorization, request_id, subscription, **kwargs):  # noqa: E501
        """Consulta de transferencias de salida por identificador de petición  # noqa: E501

        Consulta las transferencias de salida registradas en una petición, las transferencias que regresa este recuso son únicamente las transferencias de salida agrupadas al identificador de la petición que se generó al hacer el registro de las transacciones el cual se debe especificar como parte del path de este endpoint.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.out_comming_spei_request_id_transactions_report_using_get_with_http_info(authorization, request_id, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str request_id: Identificador de la petición a buscar (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: PaymentsRequestId
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
                    " to method out_comming_spei_request_id_transactions_report_using_get" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `out_comming_spei_request_id_transactions_report_using_get`")  # noqa: E501
        # verify the required parameter 'request_id' is set
        if ('request_id' not in params or
                params['request_id'] is None):
            raise ValueError("Missing the required parameter `request_id` when calling `out_comming_spei_request_id_transactions_report_using_get`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `out_comming_spei_request_id_transactions_report_using_get`")  # noqa: E501

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
            '/subscriptions/{subscription}/transactions/outcoming/spei/{requestId}', 'GET',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='PaymentsRequestId',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def outgoing_spei_transactions_report_using_get(self, authorization, subscription, **kwargs):  # noqa: E501
        """Consulta de transferencias realizadas  # noqa: E501

        Consulta las transferencias realizadas en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias recibidas en el día en el que se realiza la consulta.<br>Se pueden realizar consultas por <strong>order_id</strong> al realizar este tipo de consultas no importa el día en el que se realizó la transferencia  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.outgoing_spei_transactions_report_using_get(authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :param str order_id: Identificador de la orden a buscar
        :return: list[Payment]
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.outgoing_spei_transactions_report_using_get_with_http_info(authorization, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.outgoing_spei_transactions_report_using_get_with_http_info(authorization, subscription, **kwargs)  # noqa: E501
            return data

    def outgoing_spei_transactions_report_using_get_with_http_info(self, authorization, subscription, **kwargs):  # noqa: E501
        """Consulta de transferencias realizadas  # noqa: E501

        Consulta las transferencias realizadas en la cuenta del cliente Monex relacionada a la suscripción, las transferencias que regresa este recuso son únicamente las transferencias recibidas en el día en el que se realiza la consulta.<br>Se pueden realizar consultas por <strong>order_id</strong> al realizar este tipo de consultas no importa el día en el que se realizó la transferencia  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.outgoing_spei_transactions_report_using_get_with_http_info(authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :param str order_id: Identificador de la orden a buscar
        :return: list[Payment]
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['authorization', 'subscription', 'order_id']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method outgoing_spei_transactions_report_using_get" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `outgoing_spei_transactions_report_using_get`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `outgoing_spei_transactions_report_using_get`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'subscription' in params:
            path_params['subscription'] = params['subscription']  # noqa: E501

        query_params = []
        if 'order_id' in params:
            query_params.append(('order_id', params['order_id']))  # noqa: E501

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
            '/subscriptions/{subscription}/transactions/outcoming/spei', 'GET',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='list[Payment]',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def register_outgoing_spei_transaction_using_post(self, body, authorization, subscription, **kwargs):  # noqa: E501
        """Registro de transferencias  # noqa: E501

        Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias deben ser confirmadas por el cliente para que se efectuen.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.register_outgoing_spei_transaction_using_post(body, authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param TransactionsOutgoingRegister body: Información de las transferencias SPEI de salida (required)
        :param str authorization: Header para token (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: TokenRequiredResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.register_outgoing_spei_transaction_using_post_with_http_info(body, authorization, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.register_outgoing_spei_transaction_using_post_with_http_info(body, authorization, subscription, **kwargs)  # noqa: E501
            return data

    def register_outgoing_spei_transaction_using_post_with_http_info(self, body, authorization, subscription, **kwargs):  # noqa: E501
        """Registro de transferencias  # noqa: E501

        Registra un conjunto de transferencias a realizar en la cuenta del cliente Monex relacionada a la suscripción, las transferencias deben ser confirmadas por el cliente para que se efectuen.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.register_outgoing_spei_transaction_using_post_with_http_info(body, authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param TransactionsOutgoingRegister body: Información de las transferencias SPEI de salida (required)
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
                    " to method register_outgoing_spei_transaction_using_post" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'body' is set
        if ('body' not in params or
                params['body'] is None):
            raise ValueError("Missing the required parameter `body` when calling `register_outgoing_spei_transaction_using_post`")  # noqa: E501
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `register_outgoing_spei_transaction_using_post`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `register_outgoing_spei_transaction_using_post`")  # noqa: E501

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
            '/subscriptions/{subscription}/transactions/outcoming/spei', 'POST',
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

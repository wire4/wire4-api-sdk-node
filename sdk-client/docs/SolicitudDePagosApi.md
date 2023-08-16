# wire4_client.SolicitudDePagosApi

All URIs are relative to *https://sandbox-api.wire4.mx/wire4/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**register_payment_request_using_post**](SolicitudDePagosApi.md#register_payment_request_using_post) | **POST** /payment-request | Registro de solicitud de pagos

# **register_payment_request_using_post**
> PaymentRequestResponse register_payment_request_using_post(body, authorization)

Registro de solicitud de pagos

 Se registra una solicitud de pagos. En la respuesta se proporcionará una dirección URL que lo llevará al sitio donde se le solicitará ingresar los datos de tarjeta a la que se aplicarán los cargos.

### Example
```python
from __future__ import print_function
import time
import wire4_client
from wire4_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = wire4_client.SolicitudDePagosApi()
body = wire4_client.PaymentRequestReq() # PaymentRequestReq | Información de la solicitud de pagos
authorization = 'authorization_example' # str | Header para token

try:
    # Registro de solicitud de pagos
    api_response = api_instance.register_payment_request_using_post(body, authorization)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling SolicitudDePagosApi->register_payment_request_using_post: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**PaymentRequestReq**](PaymentRequestReq.md)| Información de la solicitud de pagos | 
 **authorization** | **str**| Header para token | 

### Return type

[**PaymentRequestResponse**](PaymentRequestResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


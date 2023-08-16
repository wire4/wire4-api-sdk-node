# wire4_client.ReporteDeSolicitudesDePagosApi

All URIs are relative to *https://sandbox-api.wire4.mx/wire4/1.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**payment_request_id_report_by_order_id_using_get**](ReporteDeSolicitudesDePagosApi.md#payment_request_id_report_by_order_id_using_get) | **GET** /payment-request | Consulta de solicitudes de pago por numero de orden.
[**payment_request_id_report_using_get**](ReporteDeSolicitudesDePagosApi.md#payment_request_id_report_using_get) | **GET** /payment-request/{requestId} | Consulta de solicitudes de pago por identificador de petición

# **payment_request_id_report_by_order_id_using_get**
> PaymentRequestReportDTO payment_request_id_report_by_order_id_using_get(authorization, order_id=order_id)

Consulta de solicitudes de pago por numero de orden.

### Example
```python
from __future__ import print_function
import time
import wire4_client
from wire4_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = wire4_client.ReporteDeSolicitudesDePagosApi()
authorization = 'authorization_example' # str | Header para token
order_id = 'order_id_example' # str | Es el identificador de la orden a buscar. (optional)

try:
    # Consulta de solicitudes de pago por numero de orden.
    api_response = api_instance.payment_request_id_report_by_order_id_using_get(authorization, order_id=order_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling ReporteDeSolicitudesDePagosApi->payment_request_id_report_by_order_id_using_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **str**| Header para token | 
 **order_id** | **str**| Es el identificador de la orden a buscar. | [optional] 

### Return type

[**PaymentRequestReportDTO**](PaymentRequestReportDTO.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **payment_request_id_report_using_get**
> PaymentRequestReportDTO payment_request_id_report_using_get(authorization, request_id)

Consulta de solicitudes de pago por identificador de petición

### Example
```python
from __future__ import print_function
import time
import wire4_client
from wire4_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = wire4_client.ReporteDeSolicitudesDePagosApi()
authorization = 'authorization_example' # str | Header para token
request_id = 'request_id_example' # str | Identificador de la petición a buscar.

try:
    # Consulta de solicitudes de pago por identificador de petición
    api_response = api_instance.payment_request_id_report_using_get(authorization, request_id)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling ReporteDeSolicitudesDePagosApi->payment_request_id_report_using_get: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **authorization** | **str**| Header para token | 
 **request_id** | **str**| Identificador de la petición a buscar. | 

### Return type

[**PaymentRequestReportDTO**](PaymentRequestReportDTO.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


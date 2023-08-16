# PaymentRequestReq

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**amount** | **float** | Es el monto de la solicitud de pago | 
**cancel_return_url** | **str** | Es la dirección URL a la que se redirigirá en caso de que el usuario cancele. | [optional] 
**customer** | [**Customer**](Customer.md) |  | [optional] 
**description** | **str** | Es la descripción de la solicitud de pago. | [optional] 
**due_date** | **date** | Es la fecha de operación de la solicitud de pago. | [optional] 
**method** | **str** |  | 
**order_id** | **str** | Número de orden asignado por el cliente de Wire4 | 
**return_url** | **str** | Es la dirección URL a la que se redirigirá en caso de éxito. | [optional] 
**type** | **str** | Tipo de pago por paycash | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


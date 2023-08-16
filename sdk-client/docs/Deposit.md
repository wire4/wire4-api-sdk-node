# Deposit

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**amount** | **float** | Es el monto de la transferencia. | [optional] 
**beneficiary_account** | **str** | Es la cuenta del beneficiario. | [optional] 
**beneficiary_name** | **str** | Es el nombre del beneficiario. | [optional] 
**beneficiary_rfc** | **str** | Es el Registro Federal de Contribuyentes (RFC) del beneficiario. | [optional] 
**cep** | [**MessageCEP**](MessageCEP.md) |  | [optional] 
**clave_rastreo** | **str** | Es la clave de rastreo de la transferencia. | [optional] 
**confirm_date** | **datetime** | Es la fecha de confirmación del deposito. Ésta fecha viene en formato ISO 8601 con zona horaria, ejemplo: &lt;strong&gt;2020-10-27T11:03:15.000-06:00&lt;/strong&gt;. | [optional] 
**currency_code** | **str** | Es el código de divisa de la transferencia. Es en el formato estándar de 3 dígitos, por ejemplo para el peso mexicano: &lt;b&gt;MXP&lt;/b&gt;, para el dólar estadounidense: &lt;b&gt;USD&lt;/b&gt;. | [optional] 
**deposit_date** | **datetime** | Es la fecha del deposito.  Ésta fecha viene en formato ISO 8601 con zona horaria, ejemplo: &lt;strong&gt;2020-10-27T11:03:15.000-06:00&lt;/strong&gt;. | [optional] 
**depositant** | **str** | Es el depositante. | [optional] 
**depositant_alias** | **str** | Es el alias asignado a la cuenta CABLE del depositante. | [optional] 
**depositant_clabe** | **str** | Es la Cuenta CLABE interbancaria (de 18 dígitos) del depositante. | [optional] 
**depositant_email** | **str** | Es el correo electrónico (email) del depositante. | [optional] 
**depositant_rfc** | **str** | Es el Registro Federal de Contribuyentes (RFC) del depositante. | [optional] 
**description** | **str** | Es la descripción del traspaso. | [optional] 
**monex_description** | **str** | Es la descripción directa de Monex. | [optional] 
**monex_transaction_id** | **str** | es el identificador de la transferencia en Monex. | [optional] 
**reference** | **str** | Es la referencia del depósito. | [optional] 
**sender_account** | **str** | Es la cuenta del ordenante. | [optional] 
**sender_bank** | [**MessageInstitution**](MessageInstitution.md) |  | [optional] 
**sender_name** | **str** | Es el nombre del ordenante. | [optional] 
**sender_rfc** | **str** | Es el Registro Federal de Contribuyentes (RFC) de la cuenta ordenante. | [optional] 
**status** | **str** | Es el estatus del depósito (COMPLETED/RETURNED). | [optional] 

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


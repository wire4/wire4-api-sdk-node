# coding: utf-8

"""
    Wire4RestAPI

    Referencia de API. La API de Wire4 está organizada en torno a REST  # noqa: E501

    OpenAPI spec version: 1.0.0
    
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

import pprint
import re  # noqa: F401

import six


class CepSearchBanxico(object):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    """
    """
    Attributes:
      swagger_types (dict): The key is attribute name
                            and the value is attribute type.
      attribute_map (dict): The key is attribute name
                            and the value is json key in definition.
    """
    swagger_types = {
        'amount': 'float',
        'beneficiary_account': 'str',
        'beneficiary_bank_key': 'str',
        'clave_rastreo': 'str',
        'operation_date': 'str',
        'reference': 'str',
        'sender_account': 'str',
        'sender_bank_key': 'str'
    }

    attribute_map = {
        'amount': 'amount',
        'beneficiary_account': 'beneficiary_account',
        'beneficiary_bank_key': 'beneficiary_bank_key',
        'clave_rastreo': 'clave_rastreo',
        'operation_date': 'operation_date',
        'reference': 'reference',
        'sender_account': 'sender_account',
        'sender_bank_key': 'sender_bank_key'
    }

    def __init__(self, amount=None, beneficiary_account=None, beneficiary_bank_key=None, clave_rastreo=None, operation_date=None, reference=None, sender_account=None, sender_bank_key=None):  # noqa: E501
        """CepSearchBanxico - a model defined in Swagger"""  # noqa: E501
        self._amount = None
        self._beneficiary_account = None
        self._beneficiary_bank_key = None
        self._clave_rastreo = None
        self._operation_date = None
        self._reference = None
        self._sender_account = None
        self._sender_bank_key = None
        self.discriminator = None
        self.amount = amount
        self.beneficiary_account = beneficiary_account
        if beneficiary_bank_key is not None:
            self.beneficiary_bank_key = beneficiary_bank_key
        self.clave_rastreo = clave_rastreo
        self.operation_date = operation_date
        if reference is not None:
            self.reference = reference
        if sender_account is not None:
            self.sender_account = sender_account
        if sender_bank_key is not None:
            self.sender_bank_key = sender_bank_key

    @property
    def amount(self):
        """Gets the amount of this CepSearchBanxico.  # noqa: E501

        Es el monto de la transferencia. Ejemplo 1000.00  # noqa: E501

        :return: The amount of this CepSearchBanxico.  # noqa: E501
        :rtype: float
        """
        return self._amount

    @amount.setter
    def amount(self, amount):
        """Sets the amount of this CepSearchBanxico.

        Es el monto de la transferencia. Ejemplo 1000.00  # noqa: E501

        :param amount: The amount of this CepSearchBanxico.  # noqa: E501
        :type: float
        """
        if amount is None:
            raise ValueError("Invalid value for `amount`, must not be `None`")  # noqa: E501

        self._amount = amount

    @property
    def beneficiary_account(self):
        """Gets the beneficiary_account of this CepSearchBanxico.  # noqa: E501

        Es la cuenta de beneficiario.  # noqa: E501

        :return: The beneficiary_account of this CepSearchBanxico.  # noqa: E501
        :rtype: str
        """
        return self._beneficiary_account

    @beneficiary_account.setter
    def beneficiary_account(self, beneficiary_account):
        """Sets the beneficiary_account of this CepSearchBanxico.

        Es la cuenta de beneficiario.  # noqa: E501

        :param beneficiary_account: The beneficiary_account of this CepSearchBanxico.  # noqa: E501
        :type: str
        """
        if beneficiary_account is None:
            raise ValueError("Invalid value for `beneficiary_account`, must not be `None`")  # noqa: E501

        self._beneficiary_account = beneficiary_account

    @property
    def beneficiary_bank_key(self):
        """Gets the beneficiary_bank_key of this CepSearchBanxico.  # noqa: E501

        Clave del banco beneficiario. Éste valor no esta presente si obtiene de la cuenta del beneficiario, en caso de que sea un número celular éste campo es requerido. se puede obtener del recurso de las <a href=\"#operation/getAllInstitutionsUsingGET\">instituciones.</a>  # noqa: E501

        :return: The beneficiary_bank_key of this CepSearchBanxico.  # noqa: E501
        :rtype: str
        """
        return self._beneficiary_bank_key

    @beneficiary_bank_key.setter
    def beneficiary_bank_key(self, beneficiary_bank_key):
        """Sets the beneficiary_bank_key of this CepSearchBanxico.

        Clave del banco beneficiario. Éste valor no esta presente si obtiene de la cuenta del beneficiario, en caso de que sea un número celular éste campo es requerido. se puede obtener del recurso de las <a href=\"#operation/getAllInstitutionsUsingGET\">instituciones.</a>  # noqa: E501

        :param beneficiary_bank_key: The beneficiary_bank_key of this CepSearchBanxico.  # noqa: E501
        :type: str
        """

        self._beneficiary_bank_key = beneficiary_bank_key

    @property
    def clave_rastreo(self):
        """Gets the clave_rastreo of this CepSearchBanxico.  # noqa: E501

        Es la clave de rastreo de la transferencia.  # noqa: E501

        :return: The clave_rastreo of this CepSearchBanxico.  # noqa: E501
        :rtype: str
        """
        return self._clave_rastreo

    @clave_rastreo.setter
    def clave_rastreo(self, clave_rastreo):
        """Sets the clave_rastreo of this CepSearchBanxico.

        Es la clave de rastreo de la transferencia.  # noqa: E501

        :param clave_rastreo: The clave_rastreo of this CepSearchBanxico.  # noqa: E501
        :type: str
        """
        if clave_rastreo is None:
            raise ValueError("Invalid value for `clave_rastreo`, must not be `None`")  # noqa: E501

        self._clave_rastreo = clave_rastreo

    @property
    def operation_date(self):
        """Gets the operation_date of this CepSearchBanxico.  # noqa: E501

        Es la fecha de operación de la transferencia, formato: dd-MM-yyyy.  # noqa: E501

        :return: The operation_date of this CepSearchBanxico.  # noqa: E501
        :rtype: str
        """
        return self._operation_date

    @operation_date.setter
    def operation_date(self, operation_date):
        """Sets the operation_date of this CepSearchBanxico.

        Es la fecha de operación de la transferencia, formato: dd-MM-yyyy.  # noqa: E501

        :param operation_date: The operation_date of this CepSearchBanxico.  # noqa: E501
        :type: str
        """
        if operation_date is None:
            raise ValueError("Invalid value for `operation_date`, must not be `None`")  # noqa: E501

        self._operation_date = operation_date

    @property
    def reference(self):
        """Gets the reference of this CepSearchBanxico.  # noqa: E501

        Es la referencia numérica de la transferencia. Se valida hasta 7 dígitos.  # noqa: E501

        :return: The reference of this CepSearchBanxico.  # noqa: E501
        :rtype: str
        """
        return self._reference

    @reference.setter
    def reference(self, reference):
        """Sets the reference of this CepSearchBanxico.

        Es la referencia numérica de la transferencia. Se valida hasta 7 dígitos.  # noqa: E501

        :param reference: The reference of this CepSearchBanxico.  # noqa: E501
        :type: str
        """

        self._reference = reference

    @property
    def sender_account(self):
        """Gets the sender_account of this CepSearchBanxico.  # noqa: E501

        Es la cuenta ordenante, es requerida cuando se no se envía la clave del banco ordenante.  # noqa: E501

        :return: The sender_account of this CepSearchBanxico.  # noqa: E501
        :rtype: str
        """
        return self._sender_account

    @sender_account.setter
    def sender_account(self, sender_account):
        """Sets the sender_account of this CepSearchBanxico.

        Es la cuenta ordenante, es requerida cuando se no se envía la clave del banco ordenante.  # noqa: E501

        :param sender_account: The sender_account of this CepSearchBanxico.  # noqa: E501
        :type: str
        """

        self._sender_account = sender_account

    @property
    def sender_bank_key(self):
        """Gets the sender_bank_key of this CepSearchBanxico.  # noqa: E501

        Es la clave del banco ordenante, es requerida cuando no se envía la cuenta ordenante.  Se puede obtener del recurso de las <a href=\"#operation/getAllInstitutionsUsingGET\">instituciones.</a>  # noqa: E501

        :return: The sender_bank_key of this CepSearchBanxico.  # noqa: E501
        :rtype: str
        """
        return self._sender_bank_key

    @sender_bank_key.setter
    def sender_bank_key(self, sender_bank_key):
        """Sets the sender_bank_key of this CepSearchBanxico.

        Es la clave del banco ordenante, es requerida cuando no se envía la cuenta ordenante.  Se puede obtener del recurso de las <a href=\"#operation/getAllInstitutionsUsingGET\">instituciones.</a>  # noqa: E501

        :param sender_bank_key: The sender_bank_key of this CepSearchBanxico.  # noqa: E501
        :type: str
        """

        self._sender_bank_key = sender_bank_key

    def to_dict(self):
        """Returns the model properties as a dict"""
        result = {}

        for attr, _ in six.iteritems(self.swagger_types):
            value = getattr(self, attr)
            if isinstance(value, list):
                result[attr] = list(map(
                    lambda x: x.to_dict() if hasattr(x, "to_dict") else x,
                    value
                ))
            elif hasattr(value, "to_dict"):
                result[attr] = value.to_dict()
            elif isinstance(value, dict):
                result[attr] = dict(map(
                    lambda item: (item[0], item[1].to_dict())
                    if hasattr(item[1], "to_dict") else item,
                    value.items()
                ))
            else:
                result[attr] = value
        if issubclass(CepSearchBanxico, dict):
            for key, value in self.items():
                result[key] = value

        return result

    def to_str(self):
        """Returns the string representation of the model"""
        return pprint.pformat(self.to_dict())

    def __repr__(self):
        """For `print` and `pprint`"""
        return self.to_str()

    def __eq__(self, other):
        """Returns true if both objects are equal"""
        if not isinstance(other, CepSearchBanxico):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other

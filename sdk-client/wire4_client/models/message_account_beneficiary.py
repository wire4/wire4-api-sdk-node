# coding: utf-8

"""
    Wire4RestAPI

    Referencia de la API de Wire4  # noqa: E501

    OpenAPI spec version: 1.0.0
    
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

import pprint
import re  # noqa: F401

import six


class MessageAccountBeneficiary(object):
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
        'account': 'str',
        'error_message': 'str',
        'request_id': 'str'
    }

    attribute_map = {
        'account': 'account',
        'error_message': 'error_message',
        'request_id': 'request_id'
    }

    def __init__(self, account=None, error_message=None, request_id=None):  # noqa: E501
        """MessageAccountBeneficiary - a model defined in Swagger"""  # noqa: E501
        self._account = None
        self._error_message = None
        self._request_id = None
        self.discriminator = None
        if account is not None:
            self.account = account
        if error_message is not None:
            self.error_message = error_message
        if request_id is not None:
            self.request_id = request_id

    @property
    def account(self):
        """Gets the account of this MessageAccountBeneficiary.  # noqa: E501

        Cuenta del beneficiario  # noqa: E501

        :return: The account of this MessageAccountBeneficiary.  # noqa: E501
        :rtype: str
        """
        return self._account

    @account.setter
    def account(self, account):
        """Sets the account of this MessageAccountBeneficiary.

        Cuenta del beneficiario  # noqa: E501

        :param account: The account of this MessageAccountBeneficiary.  # noqa: E501
        :type: str
        """

        self._account = account

    @property
    def error_message(self):
        """Gets the error_message of this MessageAccountBeneficiary.  # noqa: E501

        Mensaje de error en caso de existir, el valor de este atributo contiene el mensaje  # noqa: E501

        :return: The error_message of this MessageAccountBeneficiary.  # noqa: E501
        :rtype: str
        """
        return self._error_message

    @error_message.setter
    def error_message(self, error_message):
        """Sets the error_message of this MessageAccountBeneficiary.

        Mensaje de error en caso de existir, el valor de este atributo contiene el mensaje  # noqa: E501

        :param error_message: The error_message of this MessageAccountBeneficiary.  # noqa: E501
        :type: str
        """

        self._error_message = error_message

    @property
    def request_id(self):
        """Gets the request_id of this MessageAccountBeneficiary.  # noqa: E501

        El identificador, en esta API, de la petición de registro de la cuenta del beneficiario  # noqa: E501

        :return: The request_id of this MessageAccountBeneficiary.  # noqa: E501
        :rtype: str
        """
        return self._request_id

    @request_id.setter
    def request_id(self, request_id):
        """Sets the request_id of this MessageAccountBeneficiary.

        El identificador, en esta API, de la petición de registro de la cuenta del beneficiario  # noqa: E501

        :param request_id: The request_id of this MessageAccountBeneficiary.  # noqa: E501
        :type: str
        """

        self._request_id = request_id

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
        if issubclass(MessageAccountBeneficiary, dict):
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
        if not isinstance(other, MessageAccountBeneficiary):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other

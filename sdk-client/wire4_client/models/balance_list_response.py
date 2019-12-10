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
from wire4_client.models.balance import Balance  # noqa: F401,E501


class BalanceListResponse(object):
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
        'balances': 'list[Balance]'
    }

    attribute_map = {
        'balances': 'balances'
    }

    def __init__(self, balances=None):  # noqa: E501
        """BalanceListResponse - a model defined in Swagger"""  # noqa: E501
        self._balances = None
        self.discriminator = None
        if balances is not None:
            self.balances = balances

    @property
    def balances(self):
        """Gets the balances of this BalanceListResponse.  # noqa: E501

        Lista de movimientos  # noqa: E501

        :return: The balances of this BalanceListResponse.  # noqa: E501
        :rtype: list[Balance]
        """
        return self._balances

    @balances.setter
    def balances(self, balances):
        """Sets the balances of this BalanceListResponse.

        Lista de movimientos  # noqa: E501

        :param balances: The balances of this BalanceListResponse.  # noqa: E501
        :type: list[Balance]
        """

        self._balances = balances

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
        if issubclass(BalanceListResponse, dict):
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
        if not isinstance(other, BalanceListResponse):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other

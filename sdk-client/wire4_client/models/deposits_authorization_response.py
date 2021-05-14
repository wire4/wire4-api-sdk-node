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
from wire4_client.models.web_hook_deposit_authorization_response import WebHookDepositAuthorizationResponse  # noqa: F401,E501


class DepositsAuthorizationResponse(object):
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
        'enabled': 'bool',
        'read_only': 'bool',
        'webhook': 'WebHookDepositAuthorizationResponse'
    }

    attribute_map = {
        'enabled': 'enabled',
        'read_only': 'read_only',
        'webhook': 'webhook'
    }

    def __init__(self, enabled=None, read_only=None, webhook=None):  # noqa: E501
        """DepositsAuthorizationResponse - a model defined in Swagger"""  # noqa: E501
        self._enabled = None
        self._read_only = None
        self._webhook = None
        self.discriminator = None
        if enabled is not None:
            self.enabled = enabled
        if read_only is not None:
            self.read_only = read_only
        if webhook is not None:
            self.webhook = webhook

    @property
    def enabled(self):
        """Gets the enabled of this DepositsAuthorizationResponse.  # noqa: E501

        Indica sí se aplica autorización de depósitos.  # noqa: E501

        :return: The enabled of this DepositsAuthorizationResponse.  # noqa: E501
        :rtype: bool
        """
        return self._enabled

    @enabled.setter
    def enabled(self, enabled):
        """Sets the enabled of this DepositsAuthorizationResponse.

        Indica sí se aplica autorización de depósitos.  # noqa: E501

        :param enabled: The enabled of this DepositsAuthorizationResponse.  # noqa: E501
        :type: bool
        """

        self._enabled = enabled

    @property
    def read_only(self):
        """Gets the read_only of this DepositsAuthorizationResponse.  # noqa: E501

        Indica sí es posible modificar o no la autorización, ésto depende si otra aplicación tiene el control sobre la autorización de depósitos.  # noqa: E501

        :return: The read_only of this DepositsAuthorizationResponse.  # noqa: E501
        :rtype: bool
        """
        return self._read_only

    @read_only.setter
    def read_only(self, read_only):
        """Sets the read_only of this DepositsAuthorizationResponse.

        Indica sí es posible modificar o no la autorización, ésto depende si otra aplicación tiene el control sobre la autorización de depósitos.  # noqa: E501

        :param read_only: The read_only of this DepositsAuthorizationResponse.  # noqa: E501
        :type: bool
        """

        self._read_only = read_only

    @property
    def webhook(self):
        """Gets the webhook of this DepositsAuthorizationResponse.  # noqa: E501


        :return: The webhook of this DepositsAuthorizationResponse.  # noqa: E501
        :rtype: WebHookDepositAuthorizationResponse
        """
        return self._webhook

    @webhook.setter
    def webhook(self, webhook):
        """Sets the webhook of this DepositsAuthorizationResponse.


        :param webhook: The webhook of this DepositsAuthorizationResponse.  # noqa: E501
        :type: WebHookDepositAuthorizationResponse
        """

        self._webhook = webhook

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
        if issubclass(DepositsAuthorizationResponse, dict):
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
        if not isinstance(other, DepositsAuthorizationResponse):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        """Returns true if both objects are not equal"""
        return not self == other

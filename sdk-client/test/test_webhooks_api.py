# coding: utf-8

"""
    Wire4RestAPI

    Referencia de la API de Wire4  # noqa: E501

    OpenAPI spec version: 1.0.0
    
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

from __future__ import absolute_import

import unittest

import wire4_client
from api.webhooks_api import WebhooksApi  # noqa: E501
from wire4_client.rest import ApiException


class TestWebhooksApi(unittest.TestCase):
    """WebhooksApi unit test stubs"""

    def setUp(self):
        self.api = api.webhooks_api.WebhooksApi()  # noqa: E501

    def tearDown(self):
        pass

    def test_get_webhook(self):
        """Test case for get_webhook

        Consulta de Webhook  # noqa: E501
        """
        pass

    def test_get_webhooks(self):
        """Test case for get_webhooks

        Consulta de Webhooks  # noqa: E501
        """
        pass

    def test_register_webhook(self):
        """Test case for register_webhook

        Alta de Webhook  # noqa: E501
        """
        pass


if __name__ == '__main__':
    unittest.main()

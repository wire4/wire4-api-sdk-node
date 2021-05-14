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
from api.transferencias_spid_api import TransferenciasSPIDApi  # noqa: E501
from wire4_client.rest import ApiException


class TestTransferenciasSPIDApi(unittest.TestCase):
    """TransferenciasSPIDApi unit test stubs"""

    def setUp(self):
        self.api = api.transferencias_spid_api.TransferenciasSPIDApi()  # noqa: E501

    def tearDown(self):
        pass

    def test_get_spid_classifications_using_get(self):
        """Test case for get_spid_classifications_using_get

        Consulta de clasificaciones para operaciones SPID®  # noqa: E501
        """
        pass

    def test_register_outgoing_spid_transaction_using_post(self):
        """Test case for register_outgoing_spid_transaction_using_post

        Registro de transferencias SPID®  # noqa: E501
        """
        pass


if __name__ == '__main__':
    unittest.main()

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
from api.peticiones_de_pago_por_co_di_api import PeticionesDePagoPorCoDiApi  # noqa: E501
from wire4_client.rest import ApiException


class TestPeticionesDePagoPorCoDiApi(unittest.TestCase):
    """PeticionesDePagoPorCoDiApi unit test stubs"""

    def setUp(self):
        self.api = api.peticiones_de_pago_por_co_di_api.PeticionesDePagoPorCoDiApi()  # noqa: E501

    def tearDown(self):
        pass

    def test_consult_codi_request_by_order_id(self):
        """Test case for consult_codi_request_by_order_id

        Consulta información de petición por orderId  # noqa: E501
        """
        pass

    def test_generate_codi_code_qr(self):
        """Test case for generate_codi_code_qr

        Genera código QR  # noqa: E501
        """
        pass


if __name__ == '__main__':
    unittest.main()

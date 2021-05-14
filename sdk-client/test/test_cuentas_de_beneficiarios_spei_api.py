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
from api.cuentas_de_beneficiarios_spei_api import CuentasDeBeneficiariosSPEIApi  # noqa: E501
from wire4_client.rest import ApiException


class TestCuentasDeBeneficiariosSPEIApi(unittest.TestCase):
    """CuentasDeBeneficiariosSPEIApi unit test stubs"""

    def setUp(self):
        self.api = api.cuentas_de_beneficiarios_spei_api.CuentasDeBeneficiariosSPEIApi()  # noqa: E501

    def tearDown(self):
        pass

    def test_authorize_accounts_pending_put(self):
        """Test case for authorize_accounts_pending_put

        Solicitud para agrupar cuentas de beneficiarios SPEI/SPID en estado pendiente.  # noqa: E501
        """
        pass

    def test_delete_account_using_delete(self):
        """Test case for delete_account_using_delete

        Elimina la cuenta del beneficiario  # noqa: E501
        """
        pass

    def test_get_available_relationships_monex_using_get(self):
        """Test case for get_available_relationships_monex_using_get

        Consulta de relaciones  # noqa: E501
        """
        pass

    def test_get_beneficiaries_by_request_id(self):
        """Test case for get_beneficiaries_by_request_id

        Consulta los beneficiarios por el identificador de la petición de registro  # noqa: E501
        """
        pass

    def test_get_beneficiaries_for_account_using_get(self):
        """Test case for get_beneficiaries_for_account_using_get

        Consulta los beneficiarios registrados  # noqa: E501
        """
        pass

    def test_pre_register_accounts_using_post(self):
        """Test case for pre_register_accounts_using_post

        Pre-registro de cuentas de beneficiarios SPEI®.  # noqa: E501
        """
        pass

    def test_remove_beneficiaries_pending_using_delete(self):
        """Test case for remove_beneficiaries_pending_using_delete

        Eliminación de beneficiarios SPEI® sin confirmar  # noqa: E501
        """
        pass

    def test_update_amount_limit_account_using_put(self):
        """Test case for update_amount_limit_account_using_put

        Solicitud para actualizar el monto límite de una cuenta  # noqa: E501
        """
        pass


if __name__ == '__main__':
    unittest.main()

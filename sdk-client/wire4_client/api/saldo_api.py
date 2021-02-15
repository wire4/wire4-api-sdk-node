# coding: utf-8

"""
    Wire4RestAPI

    Referencia de API. La API de Wire4 está organizada en torno a REST  # noqa: E501

    OpenAPI spec version: 1.0.0
    
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

from __future__ import absolute_import

import re  # noqa: F401

# python 2 and python 3 compatibility library
import six

from wire4_client.api_client import ApiClient


class SaldoApi(object):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    Ref: https://github.com/swagger-api/swagger-codegen
    """

    def __init__(self, api_client=None):
        if api_client is None:
            api_client = ApiClient()
        self.api_client = api_client

    def get_balance_using_get(self, authorization, subscription, **kwargs):  # noqa: E501
        """Consulta los saldo de una cuenta  # noqa: E501

        Obtiene el saldo de un contrato, según las divisas que se manejen en dicho contrato, ya sea peso mexicano (MXP) o dólar estadounidense (USD).  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_balance_using_get(authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str subscription: Es el identificador de la suscripción a esta API. (required)
        :return: BalanceListResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.get_balance_using_get_with_http_info(authorization, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.get_balance_using_get_with_http_info(authorization, subscription, **kwargs)  # noqa: E501
            return data

    def get_balance_using_get_with_http_info(self, authorization, subscription, **kwargs):  # noqa: E501
        """Consulta los saldo de una cuenta  # noqa: E501

        Obtiene el saldo de un contrato, según las divisas que se manejen en dicho contrato, ya sea peso mexicano (MXP) o dólar estadounidense (USD).  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_balance_using_get_with_http_info(authorization, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str authorization: Header para token (required)
        :param str subscription: Es el identificador de la suscripción a esta API. (required)
        :return: BalanceListResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['authorization', 'subscription']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method get_balance_using_get" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'authorization' is set
        if ('authorization' not in params or
                params['authorization'] is None):
            raise ValueError("Missing the required parameter `authorization` when calling `get_balance_using_get`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `get_balance_using_get`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'subscription' in params:
            path_params['subscription'] = params['subscription']  # noqa: E501

        query_params = []

        header_params = {}
        if 'authorization' in params:
            header_params['Authorization'] = params['authorization']  # noqa: E501

        form_params = []
        local_var_files = {}

        body_params = None
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = []  # noqa: E501

        return self.api_client.call_api(
            '/subscriptions/{subscription}/balance', 'GET',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='BalanceListResponse',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

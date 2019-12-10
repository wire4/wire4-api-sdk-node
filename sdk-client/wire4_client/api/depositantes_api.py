# coding: utf-8

"""
    Wire4RestAPI

    Referencia de la API de Wire4  # noqa: E501

    OpenAPI spec version: 1.0.0
    
    Generated by: https://github.com/swagger-api/swagger-codegen.git
"""

from __future__ import absolute_import

import re  # noqa: F401

# python 2 and python 3 compatibility library
import six

from wire4_client.api_client import ApiClient


class DepositantesApi(object):
    """NOTE: This class is auto generated by the swagger code generator program.

    Do not edit the class manually.
    Ref: https://github.com/swagger-api/swagger-codegen
    """

    def __init__(self, api_client=None):
        if api_client is None:
            api_client = ApiClient()
        self.api_client = api_client

    def get_depositants_using_get(self, subscription, **kwargs):  # noqa: E501
        """Consulta de cuentas de depositantes  # noqa: E501

        Obtiene una lista de depositantes asociados al contrato relacionado a la subscripción.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_depositants_using_get(subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: GetDepositants
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.get_depositants_using_get_with_http_info(subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.get_depositants_using_get_with_http_info(subscription, **kwargs)  # noqa: E501
            return data

    def get_depositants_using_get_with_http_info(self, subscription, **kwargs):  # noqa: E501
        """Consulta de cuentas de depositantes  # noqa: E501

        Obtiene una lista de depositantes asociados al contrato relacionado a la subscripción.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.get_depositants_using_get_with_http_info(subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: GetDepositants
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['subscription']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method get_depositants_using_get" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `get_depositants_using_get`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'subscription' in params:
            path_params['subscription'] = params['subscription']  # noqa: E501

        query_params = []

        header_params = {}

        form_params = []
        local_var_files = {}

        body_params = None
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = ['wire4_aut_app_user_spei']  # noqa: E501

        return self.api_client.call_api(
            '/subscriptions/{subscription}/depositants', 'GET',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='GetDepositants',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

    def register_depositants_using_post(self, body, subscription, **kwargs):  # noqa: E501
        """Registra un nuevo depositante  # noqa: E501

        Registra un nuevo depositante en el contrato asociado a la subscripción.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.register_depositants_using_post(body, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param DepositantsRegister body: Depositant info (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: DepositantsResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """
        kwargs['_return_http_data_only'] = True
        if kwargs.get('async_req'):
            return self.register_depositants_using_post_with_http_info(body, subscription, **kwargs)  # noqa: E501
        else:
            (data) = self.register_depositants_using_post_with_http_info(body, subscription, **kwargs)  # noqa: E501
            return data

    def register_depositants_using_post_with_http_info(self, body, subscription, **kwargs):  # noqa: E501
        """Registra un nuevo depositante  # noqa: E501

        Registra un nuevo depositante en el contrato asociado a la subscripción.  # noqa: E501
        This method makes a synchronous HTTP request by default. To make an
        asynchronous HTTP request, please pass async_req=True
        >>> thread = api.register_depositants_using_post_with_http_info(body, subscription, async_req=True)
        >>> result = thread.get()

        :param async_req bool
        :param DepositantsRegister body: Depositant info (required)
        :param str subscription: El identificador de la suscripción a esta API (required)
        :return: DepositantsResponse
                 If the method is called asynchronously,
                 returns the request thread.
        """

        all_params = ['body', 'subscription']  # noqa: E501
        all_params.append('async_req')
        all_params.append('_return_http_data_only')
        all_params.append('_preload_content')
        all_params.append('_request_timeout')

        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            if key not in all_params:
                raise TypeError(
                    "Got an unexpected keyword argument '%s'"
                    " to method register_depositants_using_post" % key
                )
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'body' is set
        if ('body' not in params or
                params['body'] is None):
            raise ValueError("Missing the required parameter `body` when calling `register_depositants_using_post`")  # noqa: E501
        # verify the required parameter 'subscription' is set
        if ('subscription' not in params or
                params['subscription'] is None):
            raise ValueError("Missing the required parameter `subscription` when calling `register_depositants_using_post`")  # noqa: E501

        collection_formats = {}

        path_params = {}
        if 'subscription' in params:
            path_params['subscription'] = params['subscription']  # noqa: E501

        query_params = []

        header_params = {}

        form_params = []
        local_var_files = {}

        body_params = None
        if 'body' in params:
            body_params = params['body']
        # HTTP header `Accept`
        header_params['Accept'] = self.api_client.select_header_accept(
            ['application/json'])  # noqa: E501

        # HTTP header `Content-Type`
        header_params['Content-Type'] = self.api_client.select_header_content_type(  # noqa: E501
            ['application/json'])  # noqa: E501

        # Authentication setting
        auth_settings = ['wire4_aut_app_user_spei']  # noqa: E501

        return self.api_client.call_api(
            '/subscriptions/{subscription}/depositants', 'POST',
            path_params,
            query_params,
            header_params,
            body=body_params,
            post_params=form_params,
            files=local_var_files,
            response_type='DepositantsResponse',  # noqa: E501
            auth_settings=auth_settings,
            async_req=params.get('async_req'),
            _return_http_data_only=params.get('_return_http_data_only'),
            _preload_content=params.get('_preload_content', True),
            _request_timeout=params.get('_request_timeout'),
            collection_formats=collection_formats)

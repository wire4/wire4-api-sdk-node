/**
 * ESTE ES UN EJEMPLO DE IMPLEMENTACION DEL API DE WIRE4 QUE MUESTRA EL USO DEL SDK PARA NODE Y REPRESENTA COMO TAL UN EJEMPLO
 * PERO NO RESTRINGE A QUE USTED PUEDA REALIZAR SU IMPLEMENTACION COMO DECIDA SIEMPRE QUE RESPETE EL USO DEL SDK.
 */

/** Libreria de express, no pertenece a wire4 **/
const express = require('express');
const apiRoutes = express();


/** Implementacion wire4 **/
const OAuthWire4 = require('oauthwire4').default;
const api = require('wire4-api-sdk');
const Environment = require('oauthwire4/dist/src/environmentEnum').EnvironmentEnum;

const OAUTH_CONSUMER_KEY = ""; // ESCRIBE TU USUARIO DE API
const OAUTH_CONSUMER_SECRET = ""; // ESCRIBE TU CONTRASEÑA DE API
const USER_KEY = ""; // ESCRIBE EL KEY DE UN USUARIO ENROLADO
const SECRET_KEY = ""; // ESCRIBE LA CONSTRASEÑA DE UN USUARIO ENROLADO
const SUBSCRIPTION = ""; // ESCRIBE EL IDENTIFICADOR DE SUSBSCRIPCIÓN
const CODI_KEY = ""; // ESCRIBE TU USUARIO DE ACCESO A CODI
const CODI_SECRET_KEY = ""; // ESCRIBE TU CONTRASEÑA DE ACCESO A CODI

apiRoutes.listen('4500',() =>{
    console.log('Server started on port 4500...');
    console.log('indique en el navegador la url del endpoint que quiera probar por ejemplo: "/institutions", no olvide sustituir sus credenciales para que pueda operar con el api');
});

apiRoutes.get('/', (req, resp) => {

    resp.writeHead(200, {'content-type': 'text/plain'});
    resp.write('Funcionando...indique la url del endpoint que quiera probar por ejemplo: "/institutions", no olvide sustituir sus credenciales para que pueda operar con el api');
    resp.end();
});

apiRoutes.get('/webhooks', async (req, resp) => {

    try {

        var instance = new api.WebhooksApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization  = await outhWire4.obtainAccessTokenApp("general");
        const response = await instance.getWebhooks(authorization, {});
        console.log('Response:'+JSON.stringify(response));
        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }
    }


});

apiRoutes.get('/webhooks/:id', async (req, resp) => {

    try {

        var instance = new api.WebhooksApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenApp("general");
        const id = "wh_80ff41298dc544f08e3fdb6c4bd1d13c";  //REPLACE THIS WITH YOUR DATA
        const response = await instance.getWebhook(authorization, id, {});
        console.log("Response:" + JSON.stringify(response));
        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }
});

apiRoutes.post('/webhooks', async (req, resp) => {

    try {

        var instance = new api.WebhooksApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = {
            name:"TEST-SDK-WEBHOOK-REGISTER SDK node",
            url:"https://en0fpu357pjff.x.pipedream.net",
            events:["ACCOUNT.CREATED",
                "TRANSACTION.OUTGOING.RECEIVED",
                "ENROLLMENT.CREATED"]
        };
        const authorization = await outhWire4.obtainAccessTokenApp("general");
        const response = await instance.registerWebhook(body, authorization, {})
        console.log("Response:" + JSON.stringify(response));
        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }
});

apiRoutes.get('/obtainConfigurationsLimits', async (req, resp) => {

    try {

        var instance = new api.LmitesDeMontosApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.obtainConfigurationsLimits(authorization, subscription, {});
        console.log("Response:"+JSON.stringify(response));
        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.put('/updateConfigurations', async (req, resp) => {

    try {

        var instance = new api.LmitesDeMontosApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = {
            "configurations": [
                {
                    "group":"LIMIT_BY_RANGE",
                    "items":[
                        {
                            "key":"BY_AMOUNT",
                            "value":"3000000"
                        },
                        {
                            "key":"BY_OPERATION",
                            "value":"88"
                        }
                    ]
                },
                {
                    "group":"LIMIT_BY_TIME",
                    "items":[
                        {
                            "key":"BY_AMOUNT",
                            "value":"7700000"
                        },
                        {
                            "key":"BY_OPERATION",
                            "value":"99"
                        }
                    ]
                }
            ]

        };
        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.updateConfigurations(body, authorization, subscription, {});
        console.log("Response:" + JSON.stringify(response));
        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.post('/ceps', async (req, resp) => {

    try {
        var instance = new api.ComprobanteElectrnicoDePagoCEPApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
        var body = api.CepSearchBanxico = {

            amount: 8963.25,
            beneficiaryAccount: '072680004657656853',
            beneficiaryBankKey: '40072',
            claveRastreo: '58735618',
            operationDate: '05-12-2018',
            reference: '1122334',
            senderAccount: '112680000156896531',
            senderBankKey: '40112'
        };



        const authorization = await outhWire4.obtainAccessTokenApp('general');
        var response = null;

        response = await instance.obtainTransactionCepUsingPOST(body, authorization, {});
        console.log('Respuesta:' + JSON.stringify(response));
        resp.json(response);
        resp.end();
    }catch (error) {
        console.log('Error:' + error.status, ', mensaje:' + error.statusText);
    }

});

apiRoutes.post('/contact', async (req, resp) => {

    try{

        var instance = new api.ContactoApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = api.ContactRequest = {
            address:"Calle Falsa 123, Col Fantasía" ,
            company:"Compu Mundo Hiper Mega Red",
            contactPerson:"Homer J Simpson",
            email:"homer.simpson@compumundohipermegared.com",
            phoneNumber:"4422102030"
        };

        const authorization  = await outhWire4.obtainAccessTokenApp('general');
        var response = await instance.sendContactUsingPOST(body, authorization, {});
        resp.json(response);
        resp.end();

    }catch (error) {
        console.log('Error:' + error.status, ', mensaje:' + error.statusText);
    }

});

apiRoutes.get('/relationships', async (req, resp) => {

    try {

        var instance = new api.CuentasDeBeneficiariosSPEIApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY,SECRET_KEY,'spei_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.getAvailableRelationshipsMonexUsingGET(authorization, subscription, {});
        console.log('Respuesta:'+JSON.stringify(response));
        resp.json(response);
        resp.end();

    } catch (error) {
        console.log('Error:' + error.status, ', mensaje:' + error.statusText);
    }

});


apiRoutes.get('/getBeneficiariesForAccountUsingGET', async (req, resp) => {

    try {

        var instance = new api.CuentasDeBeneficiariosSPEIApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY,SECRET_KEY,'spei_admin');
        const account = undefined;
        const beneficiaryBank = undefined;
        const beneficiaryName = undefined;
        const endDate = undefined;
        const initDate = undefined;
        const rfc = undefined;
        const status = undefined;
        const subscription = SUBSCRIPTION;
        const response = await instance.getBeneficiariesForAccountUsingGET(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, {});
        console.log('Respuesta:'+JSON.stringify(response));
        resp.json(response);
        resp.end();
    } catch (error) {
        console.log('Error:',error.toString());
    }
});


apiRoutes.post('/preRegisterAccountsUsingPOST', async (req, resp) => {

    try {

        var instance = new api.CuentasDeBeneficiariosSPEIApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = {
            accounts: [{
                amount_limit: 900000.00,
                bank_key:undefined,
                beneficiary_account:"112680000156896531",
                email:["beneficiary@tcpip.tech"],
                institution:undefined,
                kind_of_relationship:"RECURRENTE",
                numeric_reference_spei: undefined,
                payment_concept_spei:undefined,
                person:{
                    last_name: "Santander",
                    middle_name: "Santander",
                    name: "Banco"
                },
                relationship:"ACREEDOR",
                rfc:"VECJ880326HI1"
            }] ,
            cancel_return_url:"https://pro.cuentasok.com",
            return_url:"https://pro.cuentasok.com"
        };
        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY,SECRET_KEY,'spei_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.preRegisterAccountsUsingPOST(body, authorization, subscription, {});
        console.log('Respuesta:'+JSON.stringify(response));
        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined  ) {
            console.log('Error:' + error.status, ', mensaje:' + error.statusText);
        }

    }

});

apiRoutes.delete('/removeBeneficiariesPendingUsingDELETE', async (req, resp) => {

    try {

        var instance = new api.CuentasDeBeneficiariosSPEIApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY,SECRET_KEY,'spei_admin');
        const requestId = "3d256faa-28ed-4c59-8638-05390339589e";
        const subscription = SUBSCRIPTION;
        const response = await instance.removeBeneficiariesPendingUsingDELETE(authorization, requestId, subscription, {});
        console.log("Response:" + JSON.stringify(response));
        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }
});

apiRoutes.get('/getBeneficiariesByRequestId', async (req, resp) => {

    try {
        var instance = new api.CuentasDeBeneficiariosSPEIApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const requestId = "f49c3f45-6c63-4f36-8fdc-c5e93db9e343";
        const subscription = SUBSCRIPTION;
        const response = await instance.getBeneficiariesByRequestId(authorization, requestId, subscription, {});
        if (response.beneficiaries !== undefined) {
            console.log('Respuesta:' + JSON.stringify(response));
        } else {
            console.log('No se encontraron cuentas para este request_id');
        }

        resp.json(response);
        resp.end();

    } catch (error) {
        console.log('Error:',error.toString());
    }

});

apiRoutes.put('/updateAmountLimitAccountUsingPUT', async (req, resp) => {

    try {

        var instance = new api.CuentasDeBeneficiariosSPEIApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = api.AmountRequest = {
            amount_limit: 705000.00,
            currency_code: "MXP",
            previous_amount_limit: 900000.00,
            cancel_return_url: "https://pro.cuentasok.com",
            return_url: "https://pro.cuentasok.com",
        };
        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const account = "072180003002268902";
        const subscription = SUBSCRIPTION;
        const response = await instance.updateAmountLimitAccountUsingPUT(body, authorization, account, subscription, {});
        console.log('Respuesta:'+JSON.stringify(response));
        resp.json(response);
        resp.end();
    } catch (error) {

        if (error.status !== undefined) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.delete('/deleteAccountUsingDELETE', async (req, resp) => {

    try{

        var instance = new api.CuentasDeBeneficiariosSPEIApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY,SECRET_KEY,'spei_admin');
        const account = "072180003002268902";
        const subscription = SUBSCRIPTION;
        const response = await instance.deleteAccountUsingDELETE(authorization, account, subscription, {});

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined  ) {
            console.log('Error:' + error.status, ', mensaje:' + error.statusText);
        }

    }

});

apiRoutes.put('/groupingauthorizeAccountsPendingPUT', async (req, resp) => {

    try {

        var instance = new api.CuentasDeBeneficiariosSPEIApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = api.UrlsRedirect = {
            cancel_return_rl:"https://pro.cuentasok.com",
            return_url:"https://pro.cuentasok.com",
        };
        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY,SECRET_KEY,'spei_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.authorizeAccountsPendingPUT(body , authorization, subscription, {});
        console.log('Resuesta:' + JSON.stringify(response));
        resp.json(response);
        resp.end();
    }catch (error) {

        if(error.status !== undefined  ) {
            console.log('Error:' + error.status, ', mensaje:' + error.statusText);
        }

    }

});

apiRoutes.get('/getSpidBeneficiariesForAccount', async (req, resp) => {

    try {

        var instance = new api.CuentasDeBeneficiariosSPIDApi();
        var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spid_admin');
        const subscription = SUBSCRIPTION;
        const account = undefined;
        const beneficiaryBank = undefined;
        const beneficiaryName = undefined;
        const endDate = undefined;
        const initDate = undefined;
        const rfc = undefined;
        const status = undefined;
        const response = await instance.getSpidBeneficiariesForAccount(authorization, account, beneficiaryBank, beneficiaryName, endDate, initDate, rfc, status, subscription, {});
        console.log('Response:'+JSON.stringify(response));
        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.post('/preRegisterAccountsUsingPOST1', async (req, resp) => {

    try {

        var instance = new api.CuentasDeBeneficiariosSPIDApi();
        var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = {

            amount_limit:500000,
            bank_code_banxico:"90646",
            beneficiary_account:"012180011397980646",
            email:["beneficiary.spid@wire4.mx"],
            institution:{
                name: "Benito Juarez Garcia AC"
            },
            kind_of_relationship:"RECURRENTE",
            relationship:"ACREEDOR",
            numeric_reference:undefined,
            payment_concept:"PRUEBA DESDE NODE SDK",
            rfc:"VECJ880326HI1",
            return_url:"https://pro.cuentasok.com",
            cancel_return_url:"https://pro.cuentasok.com"
        };
        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spid_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.preRegisterAccountsUsingPOST1(body, authorization, subscription, {});
        console.log('Respuesta:'+JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }
});
apiRoutes.get('/getDepositantsTotalsUsingGET', async (req, resp) => {

    try {
        var instance = new api.DepositantesApi();
        var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.getDepositantsTotalsUsingGET(authorization, subscription, {});
        console.log("Response:"+JSON.stringify(response));

        resp.json(response);
        resp.end();

    }catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});
apiRoutes.get('/getDepositantsUsingGET', async (req, resp) => {

    try {
        var instance = new api.DepositantesApi();
        var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.getDepositantsUsingGET(authorization, subscription, {});
        console.log("Response:"+JSON.stringify(response));

        resp.json(response);
        resp.end();

    }catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.post('/registerDepositantsUsingPOST', async (req, resp) => {

    try {

        var instance = new api.DepositantesApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = {
            alias:"Depositant 0292920",
            currency_code:"MXP",
            email:["beneficiary.spid@wire4.mx"],
            name:"Marge Bouvier"
        };
        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.registerDepositantsUsingPOST(body, authorization, subscription, {});
        console.log("Response:" + JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }
});

apiRoutes.get('/institutions', async (req, resp) => {

    try {
        var instance = new api.InstitucionesApi();
        var oauthWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await oauthWire4.obtainAccessTokenApp('general');
        const response = await instance.getAllInstitutionsUsingGET(authorization, {});
        console.log(JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }
});

apiRoutes.get('/getBalanceUsingGET', async (req, resp) => {

    try {
        var instance = new api.SaldoApi();
        var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.getBalanceUsingGET(authorization, subscription, {});
        console.log("Response:" + JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.post('/preEnrollmentMonexUserUsingPOST', async (req, resp) => {

    try {
        var instance = new api.SuscripcionesApi();
        var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = {
            return_url:"https://pro.cuentasok.com",
            cancel_return_url:"https://pro.cuentasok.com"
        };
        const authorization = await outhWire4.obtainAccessTokenApp("general");
        const response = await instance.preEnrollmentMonexUserUsingPOST(body, authorization, {});
        console.log('Response:'+JSON.stringify(response));

        resp.json(response);
        resp.end();

    }catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.delete('/removeSubscriptionPendingStatusUsingDELETE', async (req, resp) => {

    try {

        var instance = new api.SuscripcionesApi();
        var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenApp("general");
        const subscription = "bda9545f-eae7-45d0-94b7-af0a4364442b";
        const response = await instance.removeSubscriptionPendingStatusUsingDELETE(authorization, subscription, {});
        console.log('Response:'+JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.patch('/changeSubscriptionUseUsingPATCH', async (req, resp) => {

    var instance = new api.SuscripcionesApi();
    var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    try{
        const authorization = await outhWire4.obtainAccessTokenApp("general");
        const subscription_id = "c44cea11-5574-4ff4-91f0-c172c54cc33c";
        const body = {
            spei:{
                status:"ACTIVE",
                use:"WITHDRAWAL"
            },
            spid:{
                status:"INACTIVE",
                use:"WITHDRAWAL_DEPOSIT"
            }
        }

        const response = await instance.changeSubscriptionUseUsingPATCH(body,authorization,subscription_id,{})
        console.log("Response:"+JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch(error){
        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }
    }
});


apiRoutes.put('/changeSubscriptionStatusUsingPUT', async (req, resp) => {

    try {

        var instance = new api.SuscripcionesApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = api.SubscriptionChangeStatusRequest = {
            status : api.SubscriptionChangeStatusRequest.StatusEnum.INACTIVE
        };
        const authorization = await outhWire4.obtainAccessTokenAppUser(
            '7ba5045b772431688191b2da9a019e@sandbox.wire4.mx', //REPLACE THIS WITH YOUR DATA
            '2e874c918da443a894c48109cb9c47', //REPLACE THIS WITH YOUR DATA
            'spei_admin');
        const subscription = "c44cea11-5574-4ff4-91f0-c172c54cc33c"; //REPLACE THIS WITH YOUR DATA
        const response = await instance.changeSubscriptionStatusUsingPUT(body, authorization, subscription, {});
        console.log("Response:"+JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.delete('/removeEnrollmentUserUsingDELETE', async (req, resp) => {

    try {

        var instance = new api.SuscripcionesApi();
        var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(
            '7ba5045b772431688191b2da9a019e@sandbox.wire4.mx', //REPLACE THIS WITH YOUR DATA
            '2e874c918da443a894c48109cb9c47', //REPLACE THIS WITH YOUR DATA
            'spei_admin');
        const subscription = "c44cea11-5574-4ff4-91f0-c172c54cc33c";
        const response = await instance.removeEnrollmentUserUsingDELETE(authorization, subscription, {});
        console.log('Reponse:'+JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.get('/incomingSpeiTransactionsReportUsingGET', async (req, resp) => {

    try {

        var instance = new api.TransferenciasSPEIApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const beginDate = undefined;
        const endDate = undefined;
        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.incomingSpeiTransactionsReportUsingGET(authorization, beginDate, endDate, subscription, {});
        console.log("Response:"+JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }
});
apiRoutes.get('/outgoingSpeiTransactionsReportUsingGET', async (req, resp) => {

    try {

        var instance = new api.TransferenciasSPEIApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const orderId = "0887089B-5461-4868-A67E-5F40D4EC73CE";
        const subscription = SUBSCRIPTION;
        const response = await instance.outgoingSpeiTransactionsReportUsingGET(authorization, orderId, subscription, {});
        console.log("Response:"+JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});


apiRoutes.post('/registerOutgoingSpeiTransactionUsingPOST', async (req, resp) => {

    try {

        var instance = new api.TransferenciasSPEIApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = {
            return_url:"https://pro.cuentasok.com",
            cancel_return_url:"https://pro.cuentasok.com",
            "transactions": [
                {
                    "amount": "2000.00",
                    "beneficiary_account": "112680000156896531",
                    "beneficiary_bank_key":"40012",
                    "concept": "Para Eliminar contrato 1111111 - subscription 14e2e4b9-8e84-4fb4-8c53-1d1038c4d220",
                    "currency_code": "MXP",
                    "email": [
                        "arturo.zuniga@tcpip.tech"
                    ],
                    "order_id": "FCD4BAED-D706-6736-D495-2CB0401D2FEC",
                    "reference": 2004287
                },
                {
                    "amount": "2000.00",
                    "beneficiary_account": "112680000156896531",
                    "beneficiary_bank_key":"40012",
                    "concept": "Para Eliminar contrato 1111111 - subscription 14e2e4b9-8e84-4fb4-8c53-1d1038c4d220",
                    "currency_code": "MXP",
                    "email": [
                        "arturo.zuniga@tcpip.tech"
                    ],
                    "order_id": "FCB0BAEF-G606-6847-B265-1AC0402D5FFB",
                    "reference": 2004287
                }
            ]

        };
        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.registerOutgoingSpeiTransactionUsingPOST(body, authorization, subscription, {});
        console.log("Response:" + JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }
});

apiRoutes.delete('/dropTransactionsPendingUsingDELETE', async (req, resp) => {

    try {

        var instance = new api.TransferenciasSPEIApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const orderId = undefined;
        const requestId = "f097ef10-033a-4133-aa02-68ec720d0ebd";
        const subscription = SUBSCRIPTION;
        const response = await instance.dropTransactionsPendingUsingDELETE(authorization, orderId, requestId, subscription, {});
        console.log("Response:" + JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.post('/createAuthorizationTransactionsGroup', async (req, resp) => {

    try {

        var instance = new api.TransferenciasSPEIApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body ={
            redirect_urls:{
                return_url:"https://pro.cuentasok.com",
                cancel_return_url:"https://pro.cuentasok.com"
            },
            transactions:["FCD4BAED-D606-6736-D495-2CB0401D2FEC","FCB0BAEF-G606-6747-B265-1AC0402D5FFB","FCD4BAED-D706-6736-D495-2CB0401D2FEC","FCB0BAEF-G606-6847-B265-1AC0402D5FFB"]
        };
        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.createAuthorizationTransactionsGroup(body, authorization, subscription, {});
        console.log("Response:"+JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.get('/outCommingSpeiRequestIdTransactionsReportUsingGET', async (req, resp) => {

    try {

        var instance = new api.TransferenciasSPEIApi();
        var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
        const requestId = "9b5f96e4-0061-4886-932e-27c659209fd6";
        const subscription = SUBSCRIPTION;
        const response = await instance.outCommingSpeiRequestIdTransactionsReportUsingGET(authorization, requestId, subscription, {});
        console.log("Response:"+JSON.stringify(response));

        resp.json(response);
        resp.end();

    }catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.get('/getSpidClassificationsUsingGET', async (req, resp) => {

    try {
        var instance = new api.TransferenciasSPIDApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spid_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.getSpidClassificationsUsingGET(authorization, subscription, {});
        console.log("Response:" + JSON.stringify(response));
        resp.json(response);
        resp.end();

    }catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }
    }

});

apiRoutes.post('/registerOutgoingSpidTransactionUsingPOST', async (req, resp) => {

    try {

        var instance = new api.TransferenciasSPIDApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = {
            cancel_return_url: "https://your-app-url.mx/return",
            return_url: "https://your-app-url.mx/return",
            amount: 7000.00,
            beneficiary_account: "072180003002268902",
            classification_id:"01",
            currency_code:"USD",
            email:["notificar@wire4.mx"],
            numeric_reference_spid:1234567,
            order_id:"8A736A1D-ECA6-4959-93FE-794365F53E43",
            payment_concept_spid:"Transfer out test 1",

        };
        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spid_admin');
        const subscription = SUBSCRIPTION;
        const response = await instance.registerOutgoingSpidTransactionUsingPOST(body, authorization, subscription, {});
        console.log("Response:" + JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }
});

apiRoutes.get('/obtainCompanies', async (req, resp) => {

    try {

        var instance = new api.EmpresasCoDiApi();
        var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
        const authorization = await outhWire4.obtainAccessTokenApp("codi_general");
        const response = await instance.obtainCompanies(authorization, {});
        console.log("Response:" + JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }

    }

});

apiRoutes.post('/registerCompanyUsingPOST', async (req, resp) => {

    try {

        var instance = new api.EmpresasCoDiApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = {
            business_name: "Technologies node Inc",
            comercial_name: "Empresa proveedora de tecnología telefonica y computacional del centro y norte de pais S.A de C.V ",
            rfc: "TECI201002BB1",
            certificate:{
                certificate_number:"0000010000100002799",
                alias:"00000100001004030999",
                check_digit:"1",
                cipher_data:"fsjIsaa/ypeS/5Il5WN1iFxwNE6PQhdC5IZoyFCNOh6MVQcx+g9nri+SHbedQXSIAU3HHk9d5CJJuVSGPvOZyoasasafeecwaXJmg9LjO3Uu7RGNqharVrsj70vcJvvdy3SVoOWd6BsEFe4eiiPzC3nhvCKcMX1GaKkwUO6STuN9QqRrxGv+7tkcGZbXZMA07iO0eZo0LBHPgxY6wsRQP4scvwwLzMqZ4Orzn+ehmpWF/hx63XmgYpASy4qjcKxLkrwgPEJb3nIKRmMOodfSLF7idAchm4SKeEoYvjE2yF//7IuXh/CR15QoIyYlBggbdQbURFqKC1c1PfxMnUlSJzPCKUg=="
            }
        };
        const authorization = await outhWire4.obtainAccessTokenApp("codi_general");
        const response = await instance.registerCompanyUsingPOST(body, authorization, {});
        console.log("Response:" + JSON.stringify(response));

        resp.json(response);
        resp.end();


    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }
    }

});

apiRoutes.post('/createSalesPoint', async (req, resp) => {

    try {

        var instance = new api.PuntosDeVentaCoDiApi();
        var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = {
            name : "Sucursal1",
            access_ip: "192.168.0.2",
            notifications_url: "https://test-enrollment.requestcatcher.com/",
            account: "030843123456789131"
        };
        const authorization  = await outhWire4.obtainAccessTokenApp("codi_general");
        const companyId = "536e3a71-b7b8-4495-bf5f-a6615c951ce8";
        const response = await instance.createSalesPoint(body, authorization, companyId, {});
        console.log("Response:" + JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }
    }

});

apiRoutes.get('/obtainSalePoints', async (req, resp) => {

    try {

        var instance = new api.PuntosDeVentaCoDiApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenApp("codi_general");
        const companyId = "536e3a71-b7b8-4495-bf5f-a6615c951ce8";
        const response = await instance.obtainSalePoints(authorization, companyId, {});
        console.log("Response:" + JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }
    }

});

apiRoutes.get('/consultCodiRequestByOrderId', async (req, resp) => {

    try {

        var instance = new api.PeticionesDePagoPorCoDiApi();
        var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser("847b6a9435c4adfbea027ad8247d32@sandbox.wire4.mx", "92d42d756104f1bbfe27a0ccad05d0", "codi_admin");
        const orderId = "564DB08E-C47F-44DA-9C32-394F2240F2EB";
        const salesPointId = "10dbc365-fafa-4cef-832c-f2426047ae9b";
        const response = await instance.consultCodiRequestByOrderId(authorization, orderId, salesPointId, {});
        console.log("Response:" + JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }
    }
});

apiRoutes.post('/generateCodiCodeQR', async (req, resp) => {

    try {

        var instance = new api.PeticionesDePagoPorCoDiApi();
        var outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const body = {
            amount: 999.00,
            concept: "Prueba de validacion de longitud de metadata",
            due_date: "2021-12-31T18:26:00",
            order_id: "564DB08E-C47F-44DA-9C32-394F2240F2EB",
            phone_number: 5532302648,
            type: "QR_CODE"
        };
        const authorization = await outhWire4.obtainAccessTokenAppUser("847b6a9435c4adfbea027ad8247d32@sandbox.wire4.mx", "92d42d756104f1bbfe27a0ccad05d0", "codi_admin");
        const salesPointId = "10dbc365-fafa-4cef-832c-f2426047ae9b";
        const response = await instance.generateCodiCodeQR(body, authorization, salesPointId, {});
        console.log("Response:" + JSON.stringify(response));

        resp.json(response);
        resp.end();

    } catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }
    }

});

apiRoutes.post('/consultCodiOperations', async (req, resp) => {

    try {

        var instance = new api.OperacionesCoDiApi();
        var outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);

        const authorization = await outhWire4.obtainAccessTokenAppUser("847b6a9435c4adfbea027ad8247d32@sandbox.wire4.mx", "92d42d756104f1bbfe27a0ccad05d0","codi_report");
        const body = {};
        const companyId = "536e3a71-b7b8-4495-bf5f-a6615c951ce8";
        const page = "0";
        const salesPointId = "10dbc365-fafa-4cef-832c-f2426047ae9b";
        const size = "50";
        const response = await instance.consultCodiOperations(authorization, body, companyId, page, salesPointId, size, {});
        console.log("Response:" + JSON.stringify(response));

        resp.json(response);
        resp.end();

    }catch (error) {

        if(error.status !== undefined ) {
            console.log('Error:' + error.status, ' mensaje:' + error.statusText);
        } else {
            console.log('Error:' + error);
        }
    }
});

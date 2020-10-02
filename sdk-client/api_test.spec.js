
const OAUTH_CONSUMER_KEY = "vfRyDiLwEmVjweHrZt9dLmqfov0a";
const OAUTH_CONSUMER_SECRET = "IBPnjfZsuzJYKZRGRBDaFk7PaFca";
const USER_KEY = "12ce7e19e434fed95d0c0858f21632@develop.wire4.mx";
const SECRET_KEY = "506285a31cb43a1bfd105dcbb8640e";
const SUBSCRIPTION = "19b341dd-88b0-49a2-9997-117f553d15cd";

const OAuthWire4 = require('oauthwire4').default;
const api = require('wire4-api-sdk');
const Environment = require('oauthwire4/build/src/environmentEnum').EnvironmentEnum;

describe("InstitucionesApi", () => {
    var instance  = null;
    var oauthWire4 = null;
    beforeEach(function() {
        instance = new api.InstitucionesApi();
        oauthWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("getAllInstitutionsUsingGET", async () => {
        const authorization = await oauthWire4.obtainAccessTokenApp('general');
        const response = await instance.getAllInstitutionsUsingGET(authorization, {});
        console.log(JSON.stringify(response));
        expect(response).not.toBe(null);

    });
});

describe("ComprobanteElectrnicoDePagoCEPApi", () => {
    var instance = null;
    var outhWire4 = null;
    beforeEach(function() {
        instance = new api.ComprobanteElectrnicoDePagoCEPApi();
        outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("obtainTransactionCepUsingPOST", async () => {

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
        try {
            response = await instance.obtainTransactionCepUsingPOST(body, authorization, {});
            console.log('Respuesta:' + JSON.stringify(response));
            expect(response).not.toBe(null)
        }catch (error) {
            console.log('Error:' + error.status, ', mensaje:' + error.statusText);
        }


    });
});

describe("ContactoApi", () => {
    let instance = null;
    let outhWire4 = null;
    beforeEach(function() {
        instance = new api.ContactoApi();
        outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("sendContactUsingPOST", async () => {
        const body = api.ContactRequest = {
            address:"Calle Falsa 123, Col Fantasía" ,
            company:"Compu Mundo Hiper Mega Red",
            contactPerson:"Homer J Simpson",
            email:"homer.simpson@compumundohipermegared.com",
            phoneNumber:"4422102030"
        };
        try{
            const authorization  = await outhWire4.obtainAccessTokenApp('general');
            expect(await instance.sendContactUsingPOST(body, authorization, {})).not.toBe(null)
        }catch (error) {
            console.log('Error:' + error.status, ', mensaje:' + error.statusText);
        }

    })
});

describe("ContractsDetailsApi", () => {
    let instance = null;
    let outhWire4 = null;
    beforeEach(function() {
        instance = new api.ContractsDetailsApi();
        outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("createAuthorization", async () => {
        const body = api.PreMonexAuthorization = {
            businessName:"Ejemplo de Empresa CODI  S.A de C.V",
            cancelReturnUrl:"https://webhook.site/10761622-8035-45cd-be01-48ee4cf6cdf9",
            returnUrl:"https://webhook.site/10761622-8035-45cd-be01-48ee4cf6cdf9",
            rfc:"ONBI201002AA2"
        };
        try {
            const authorization = await outhWire4.obtainAccessTokenApp('general');
            const response = await instance.createAuthorization(body, authorization, {});
            expect(response).not.toBe(null);
        }catch (error){
            console.log('Error:' + error.status, ', mensaje:' + error.statusText);
        }

    });
    test("obtainAuthorizedUsers", async () => {
        try {
            const authorization = await outhWire4.obtainAccessTokenApp('general');
            const X_ACCESS_KEY = "YcJRdmXIt2SiZHxkCM+G3fK+EeRCIC1W";
            const requestId = "91991D97-F884-4C25-8C12-CEEF7A82BBBF";
            const response = await instance.obtainAuthorizedUsers(authorization, X_ACCESS_KEY, requestId, {});
            expect(response).not.toBe(null);
        }catch(error){
            console.log('Error:' + error.status, ', mensaje:' + error.statusText);
        }
    });
    test("obtainContractDetails", async () => {
        const body = {
            contract:"1234567",
            password:"prueba12",
            tokenCode:"12345678",
            userName:"amolina"

        };
        try {
            const authorization = await outhWire4.obtainAccessTokenApp('general');
            const X_ACCESS_KEY = "YcJRdmXIt2SiZHxkCM+G3fK+EeRCIC1W";
            const response = await instance.obtainContractDetails(body, authorization, X_ACCESS_KEY, {});
            expect(response).not.toBe(null);
        }catch(error){
            console.log('Error:' + error.status, ', mensaje:' + error.statusText);
        }
    });
});

describe("CuentasDeBeneficiariosSPEIApi", () => {
    var instance = null;
    var outhWire4= null;
    beforeEach(function() {
        instance = new api.CuentasDeBeneficiariosSPEIApi();
        outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("authorizeAccountsPendingPUT", async() => {
        try {

            const body = api.UrlsRedirect = {
                cancel_return_rl:"https://pro.cuentasok.com",
                return_url:"https://pro.cuentasok.com",
            };
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY,SECRET_KEY,'spei_admin');
            const subscription = SUBSCRIPTION;
            expect(await instance.authorizeAccountsPendingPUT(body , authorization, subscription, {})).not.toBe(null);
        }catch (error) {

            if(error.status !== undefined  ) {
                console.log('Error:' + error.status, ', mensaje:' + error.statusText);
            }

        }
    });
    test("deleteAccountUsingDELETE", async () => {

        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY,SECRET_KEY,'spei_admin');
            const account = "112680000156896531";
            const subscription = SUBSCRIPTION;
            expect(await instance.deleteAccountUsingDELETE(authorization, account, subscription, {})).not.toBe(null);
        } catch (error) {

            if(error.status !== undefined  ) {
                console.log('Error:' + error.status, ', mensaje:' + error.statusText);
            }

        }
    });
    test("getAvailableRelationshipsMonexUsingGET", async () => {
        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY,SECRET_KEY,'spei_admin');
            const subscription = SUBSCRIPTION;
            const response = await instance.getAvailableRelationshipsMonexUsingGET(authorization, subscription, {});
            console.log('Respuesta:'+JSON.stringify(response));
            expect(response).not.toBe(null);
        } catch (error) {
            console.log('Error:' + error.status, ', mensaje:' + error.statusText);
        }
    });
    test("getBeneficiariesByRequestId", async () => {

        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
            const requestId = "0e2a9dc0-1ea1-4a2c-9b71-d63d17fe6fa8";
            const subscription = SUBSCRIPTION;
            const response = await instance.getBeneficiariesByRequestId(authorization, requestId, subscription, {});
            if (response.beneficiaries !== undefined) {
                console.log('Resuesta:' + JSON.stringify(response));
            } else {
                console.log('No se encontraron cuentas para este request_id');
            }
            expect(response).not.toBe(null)
        } catch (error) {
            console.log('Error:',error.toString());
        }
    });
    test("getBeneficiariesForAccountUsingGET", async () => {

        try {
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
            expect(response).not.toBe(null);
        } catch (error) {
            console.log('Error:',error.toString());
        }
    });
    test("preRegisterAccountsUsingPOST",async () => {

        try {
            const body = {
                accounts: [{
                    amount_limit: 900000.00,
                    bank_key:undefined,
                    beneficiary_account:"072180003002268902",
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
            expect(response).not.toBe(null);
        } catch (error) {

            if(error.status !== undefined  ) {
                console.log('Error:' + error.status, ', mensaje:' + error.statusText);
            }

        }
    });
    test("removeBeneficiariesPendingUsingDELETE", async () => {

        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY,SECRET_KEY,'spei_admin');
            const requestId = "3b431cd6-8637-41d3-840e-489da0aac24a";
            const subscription = SUBSCRIPTION;
            const response = await instance.removeBeneficiariesPendingUsingDELETE(authorization, requestId, subscription, {});
            expect(response).not.toBe(null);
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });
    test("updateAmountLimitAccountUsingPUT", async () => {
        try {
            const body = api.AmountRequest = {
                amount_limit:705000.00,
                currency_code:"MXP",
                previous_amount_limit:900000.00,
                cancel_return_url: "https://pro.cuentasok.com",
                return_url: "https://pro.cuentasok.com",
            };
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY,SECRET_KEY,'spei_admin');
            const account = "072180003002268902";
            const subscription = SUBSCRIPTION;
            const response = await instance.updateAmountLimitAccountUsingPUT(body, authorization, account, subscription, {});
            expect(response).not.toBe(null);
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });
});


describe("CuentasDeBeneficiariosSPIDApi", () => {
    var instance = null;
    var outhWire4= null;
    beforeEach(function() {
        instance = new api.CuentasDeBeneficiariosSPIDApi();
        outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("getSpidBeneficiariesForAccount", async () => {

        try {
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
            expect(response).not.toBe(null);
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });
    test("preRegisterAccountsUsingPOST1", async() => {
        try {
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
            expect(response).not.toBe(null);
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });
});

describe("DepositantesApi", () => {
    var instance = null;
    var outhWire4= null;
    beforeEach(function() {
        instance = new api.DepositantesApi();
        outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("getDepositantsUsingGET", async() => {
        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
            const subscription = SUBSCRIPTION;
            const response = await instance.getDepositantsUsingGET(authorization, subscription, {});
            console.log("Response:"+JSON.stringify(response));
            expect(response).not.toBe(null)
        }catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });
    test("registerDepositantsUsingPOST", async () => { //DepositantsRegister

        try {
            const body = {
                alias:"Depositant 0292920",
                currency_code:"MXP",
                email:["beneficiary.spid@wire4.mx"],
                name:"Marge Bouvier"
            };
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
            const subscription = SUBSCRIPTION;
            const response = await instance.registerDepositantsUsingPOST(body, authorization, subscription, {});
            expect(response).not.toBe(null);
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });
});

describe("SaldoApi", () => {
    var instance = null;
    var outhWire4= null;

    beforeEach(function() {
        instance = new api.SaldoApi();
        outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("getBalanceUsingGET", async () => {

        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
            const subscription = SUBSCRIPTION;
            const response = await instance.getBalanceUsingGET(authorization, subscription, {});
            console.log("Response:" + JSON.stringify(response));
            expect(response).not.toBe(null)
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });
});

describe("SuscripcionesApi", () => {
    var instance = null;
    var outhWire4= null;
    beforeEach(function() {
        instance = new api.SuscripcionesApi();
        outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("preEnrollmentMonexUserUsingPOST", async () => {

        try {
            const body = {
                return_url:"https://pro.cuentasok.com",
                cancel_return_url:"https://pro.cuentasok.com"
            };
            const authorization = await outhWire4.obtainAccessTokenApp("general");
            const response = await instance.preEnrollmentMonexUserUsingPOST(body, authorization, {});
            console.log('Reponse:'+JSON.stringify(response));
            expect(response).not.toBe(null);
        }catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });

    test("removeSubscriptionPendingStatusUsingDELETE", async () => {
        try {
            const authorization = await outhWire4.obtainAccessTokenApp("general");
            const subscription = "e9efa676-9ea2-47e0-92cc-f2008e5c853d";
            const response = await instance.removeSubscriptionPendingStatusUsingDELETE(authorization, subscription, {});
            console.log('Reponse:'+JSON.stringify(response));
            expect(response).not.toBe(null);
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });

    test("removeEnrollmentUserUsingDELETE", async() => {
        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser("bec07aa17de4d25b92d3222be26b04@sandbox.wire4.mx", "1fa324528c24b2380a6de0c5648a69", 'spei_admin');
            const subscription = "313b3071-128b-476e-a528-39ce3acb7086";
            const response = await instance.removeEnrollmentUserUsingDELETE(authorization, subscription, {});
            console.log('Reponse:'+JSON.stringify(response));
            expect(response).not.toBe(null);

        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });

});

describe("TransferenciasSPEIApi", () => {
    var instance = null;
    var outhWire4= null;
    beforeEach(function() {
        instance = new api.TransferenciasSPEIApi();
        outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });


    test("outCommingSpeiRequestIdTransactionsReportUsingGET", async() => {
        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
            const requestId = "4d633b1d-1b36-425a-8758-2bebcb657e98";
            const subscription = SUBSCRIPTION;
            const response = await instance.outCommingSpeiRequestIdTransactionsReportUsingGET(authorization, requestId, subscription, {});
            console.log("Response:"+JSON.stringify(response));
            expect(response).not.toBe(null);
        }catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });
    test("outgoingSpeiTransactionsReportUsingGET", async () => {

        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
            const orderId = "0887089B-5461-4868-A67E-5F40D4EC73CE";
            const subscription = SUBSCRIPTION;
            const response = await instance.outgoingSpeiTransactionsReportUsingGET(authorization, orderId, subscription, {});
            console.log("Response:"+JSON.stringify(response));
            expect(response).not.toBe(null)
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });

    test("incomingSpeiTransactionsReportUsingGET", async () => {

        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
            const subscription = SUBSCRIPTION;
            const response = await instance.incomingSpeiTransactionsReportUsingGET(authorization, subscription, {});
            console.log("Response:"+JSON.stringify(response));
            expect(response).not.toBe(null);
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });

    test("createAuthorizationTransactionsGroup", async () => {

        try {
            const body ={
                redirect_urls:{
                    return_url:"https://pro.cuentasok.com",
                    cancel_return_url:"https://pro.cuentasok.com"
                },
                transactions:["FCD4BAED-D606-6736-D495-1CB0401D5FEC","FCB4BAED-D606-6736-D495-1CB0401D5FEC","FCB0BAEF-F606-5747-B265-1BC0402D5FFB","FCB0BAEF-G606-5747-B265-1BC0402D5FFB"]
            };
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
            const subscription = SUBSCRIPTION;
            const response = await instance.createAuthorizationTransactionsGroup(body, authorization, subscription, {});
            console.log("Response:"+JSON.stringify(response));
            expect(response).not.toBe(null);

        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });

    test("registerOutgoingSpeiTransactionUsingPOST", async() => {

        try {
            const body = {
                return_url:"https://pro.cuentasok.com",
                cancel_return_url:"https://pro.cuentasok.com",
                "transactions": [
                    {
                        "amount": "2000.00",
                        "beneficiary_account": "137180101805319345",
                        "beneficiary_bank_key":"40012",
                        "concept": "Para Eliminar contrato 1111111 - subscription 14e2e4b9-8e84-4fb4-8c53-1d1038c4d220",
                        "currency_code": "MXP",
                        "email": [
                            "arturo.zuniga@tcpip.tech"
                        ],
                        "order_id": "FCD4BAED-D606-6736-D495-1CB0401D5FEC",
                        "reference": 2004287
                    },
                    {
                        "amount": "2000.00",
                        "beneficiary_account": "137180101805319345",
                        "beneficiary_bank_key":"40012",
                        "concept": "Para Eliminar contrato 1111111 - subscription 14e2e4b9-8e84-4fb4-8c53-1d1038c4d220",
                        "currency_code": "MXP",
                        "email": [
                            "arturo.zuniga@tcpip.tech"
                        ],
                        "order_id": "FCB0BAEF-G606-5747-B265-1BC0402D5FFB",
                        "reference": 2004287
                    }
                ]

            };
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
            const subscription = SUBSCRIPTION;
            const response = await instance.registerOutgoingSpeiTransactionUsingPOST(body, authorization, subscription, {});
            console.log("Response:" + JSON.stringify(response));
            expect(response).not.toBe(null);
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });

    test("dropTransactionsPendingUsingDELETE", async () => {
        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spei_admin');
            const orderId = "19943732-7489-4ED0-B826-8F40CF4625F8";
            const requestId = "4d633b1d-1b36-425a-8758-2bebcb657e98";
            const subscription = SUBSCRIPTION;
            const response = await instance.dropTransactionsPendingUsingDELETE(authorization, orderId, requestId, subscription, {});
            console.log("Response:" + JSON.stringify(response));
            expect(response).not.toBe(null);

        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });
});

describe("TransferenciasSPIDApi", () => {
    var instance = null;
    var outhWire4 = null;
    beforeEach(function () {
        instance = new api.TransferenciasSPIDApi();
        outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("getSpidClassificationsUsingGET", async () => {

        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spid_admin');
            const subscription = SUBSCRIPTION;
            const response = await instance.getSpidClassificationsUsingGET(authorization, subscription, {});
            console.log("Response:" + JSON.stringify(response));
            expect(response).not.toBe(null);

        }catch (error) {

                if(error.status !== undefined ) {
                    console.log('Error:' + error.status, ' mensaje:' + error.statusText);
                } else {
                    console.log('Error:' + error);
                }

            }
    });
    test("registerOutgoingSpidTransactionUsingPOST", async  () => {

        try {
            const body = {
                cancel_return_url: "https://your-app-url.mx/return",
                return_url: "https://your-app-url.mx/return",
                amount: 7000.00,
                beneficiary_account: "072180003002268902",
                classification_id:"01",
                currency_code:"USD",
                email:["notificar@wire4.mx"],
                numeric_reference_spid:1234567,
                order_id:"8A736A1D-ECA6-4959-93FE-794365F53E33",
                payment_concept_spid:"Transfer out test 1",

            };
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY, 'spid_admin');
            const subscription = SUBSCRIPTION;
            const response = await instance.registerOutgoingSpidTransactionUsingPOST(body, authorization, subscription, {});
            console.log("Response:" + JSON.stringify(response));
            expect(response).not.toBe(null);

        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });
});

describe("WebhooksApi", () => {

    var instance = null;
    var outhWire4 = null;
    beforeEach(function () {
        instance = new api.WebhooksApi();
        outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("getWebhooks", async() => {
        try {
            const authorization  = await outhWire4.obtainAccessTokenApp("general");
            const response = await instance.getWebhooks(authorization, {});
            console.log('Response:'+JSON.stringify(response));
            expect(response).not.toBe(null)
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });
    test("getWebhook", async () => {

            try {
                const authorization = await outhWire4.obtainAccessTokenApp("general");
                const id = "wh_a3e4447fc8d64d6d8b1d25d61a2e5c5f";
                const response = await instance.getWebhook(authorization, id, {});
                console.log("Response:" + JSON.stringify(response));
                expect(response).not.toBe(null);
            } catch (error) {

                if(error.status !== undefined ) {
                    console.log('Error:' + error.status, ' mensaje:' + error.statusText);
                } else {
                    console.log('Error:' + error);
                }

            }
        });

        test("registerWebhook", async () => {
            try {
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
                expect(response).not.toBe(null);

            } catch (error) {

                if(error.status !== undefined ) {
                    console.log('Error:' + error.status, ' mensaje:' + error.statusText);
                } else {
                    console.log('Error:' + error);
                }

            }
        });
});

describe("FacturasApi", () => {
    var instance = null;
    var outhWire4= null;

    beforeEach(function() {
        instance = new api.FacturasApi();
        outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("billingsReportByIdUsingGET", async() => {
        try {
            const authorization = await outhWire4.obtainAccessTokenApp("general");
            const id = "65203279-9A2F-43D6-87A5-81BBCC481D80";
            const response = await instance.billingsReportByIdUsingGET(authorization, id, {});
            console.log('Response:'+JSON.stringify( response));
            expect(response).not.toBe(null);
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });

    test("billingsReportUsingGET", async () => {

        try {
            const authorization = await outhWire4.obtainAccessTokenApp("general");
            const period = '2019-10';
            const response = await instance.billingsReportUsingGET(authorization, period, {});
            console.log('Response:'+JSON.stringify(response));
            expect(response).not.toBe(null);

        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });
});

describe("EmpresasCoDiApi", () => {
    var instance = null;
    var outhWire4= null;

    beforeEach(function() {
        instance = new api.EmpresasCoDiApi();
        outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.DEVELOPMENT);
    });

    test("obtainCompanies", async () => {
        try {
            const authorization = await outhWire4.obtainAccessTokenApp("codi_general");
            const response = await instance.obtainCompanies(authorization, {});
            console.log("Response:" + JSON.stringify(response));
            expect(response).not.toBe(null)
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }

        }
    });

    test("registerCompanyUsingPOST", async  () => {

        try {

            const body = {
                business_name: "Technologies Inc",
                comercial_name: "Empresa proveedora de tecnología telefonica y computacional del centro y norte de pais S.A de C.V ",
                rfc: "TECI201002BB1",
                certificate:{
                    certificate_number:"0000010000100002799",
                    alias:"00000100001004030999",
                    check_digit:"1",
                    cipher_data:"fsjIsaa/ypeS/5Il5WN1iFxwNE6PQhdC5IZoyFCNOh6MVQcx+g9nri+SHbedQXSIAU3HHk9d5CJJuVSGPvOZyoMK3wwaXJmg9LjO3Uu7RGNqharVrsj70vcJvvdy3SVoOWd6BsEFe4eiiPzC3nhvCKcMX1GaKkwUO6STuN9QqRrxGv+7tkcGZbXZMA07iO0eZo0LBHPgxY6wsRQP4scvwwLzMqZ4Orzn+ehmpWF/hx63XmgYpASy4qjcKxLkrwgPEJb3nIKRmMOodfSLF7idAchm4SKeEoYvjE2yF//7IuXh/CR15QoIyYlBggbdQbURFqKC1c1PfxMnUlSJzPCKUg=="
                }
            };
            const authorization = await outhWire4.obtainAccessTokenApp("codi_general");
            const response = await instance.registerCompanyUsingPOST(body, authorization, {});
            console.log("Response:" + JSON.stringify(response));
            expect(response).not.toBe(null)

        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }
        }
    });
});

describe("PuntosDeVentaCoDiApi", () => {
    var instance = null;
    var outhWire4= null;
    beforeEach(function() {
        instance = new api.PuntosDeVentaCoDiApi();
        outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.DEVELOPMENT);
    });

    test("createSalesPoint", async () => {
        try {
            const body = {
                name : "Matriz1",
                access_ip: "192.168.0.2",
                notifications_url: "https://test-enrollment.requestcatcher.com/",
                account: "030843123456789131"
            };
            const authorization  = await outhWire4.obtainAccessTokenApp("codi_general");
            const companyId = "ac4e06ef-2b07-4240-9a9c-fcdc17803cd9";
            const response = await instance.createSalesPoint(body, authorization, companyId, {});
            console.log("Response:" + JSON.stringify(response));
            expect(response).not.toBe(null)

        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }
        }
    });
    test("obtainSalePoints", async () => {

        try {

            const authorization = await outhWire4.obtainAccessTokenApp("codi_general");
            const companyId = "ece66431-48af-4dc9-bd7d-4c26bab3080c";
            const response = await instance.obtainSalePoints(authorization, companyId, {});
            console.log("Response:" + JSON.stringify(response));
            expect(response).not.toBe(null)

        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }
        }
    });
});

describe("OperacionesCoDiApi", () => {

    var instance = null;
    var outhWire4= null;

    beforeEach(function() {
        instance = new api.OperacionesCoDiApi();
        outhWire4= new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.DEVELOPMENT);
    });

    test("consultCodiOperations", async () => {

        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY,"codi_admin");
            const body = {};
            const companyId = "ece66431-48af-4dc9-bd7d-4c26bab3080c";
            const page = "0";
            const salesPointId = "08c17691-af35-4b5f-a748-cdf65d60c2d6";
            const size = "50";
            const response = await instance.consultCodiOperations(authorization, body, companyId, page, salesPointId, size, {});
            console.log("Response:" + JSON.stringify(response));
            expect(response).not.toBe(null);

        }catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }
        }
    });
});

describe("PeticionesDePagoPorCoDiApi", () => {
    var instance = null;
    var outhWire4= null;

    beforeEach(function() {
        instance = new api.PeticionesDePagoPorCoDiApi();
        outhWire4= new OAuthWire4("vfRyDiLwEmVjweHrZt9dLmqfov0a", "IBPnjfZsuzJYKZRGRBDaFk7PaFca", Environment.DEVELOPMENT);
    });

    test("consultCodiRequestByOrderId", async () => {

        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser("280efb498cb4bed93d7526ea594158@develop.wire4.mx", "832e7424344494593c4501f3c9e70a", "codi_admin");
            const orderId = "324DB08E-C47F-44DA-9C32-394F2230F2EA";
            const salesPointId = "d777dd6c-322d-41a9-9b37-337374bfb156";
            const response = await instance.consultCodiRequestByOrderId(authorization, orderId, salesPointId, {});
            console.log("Response:" + JSON.stringify(response));
            expect(response).not.toBe(null);

        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }
        }
    });
    test("generateCodiCodeQR", async () => {

        try {
            const body = {
                amount: 999.00,
                concept: "Prueba de validacion de longitud de metadata",
                due_date: "2020-09-30T18:26:00",
                order_id: "564DB08E-C47F-44DA-9C32-394F2230F2EB",
                phone_number: 5532302648,
                type: "QR_CODE"
            };
            const authorization = await outhWire4.obtainAccessTokenAppUser("280efb498cb4bed93d7526ea594158@develop.wire4.mx", "832e7424344494593c4501f3c9e70a", "codi_admin");
            const salesPointId = "d777dd6c-322d-41a9-9b37-337374bfb156";
            const response = await instance.generateCodiCodeQR(body, authorization, salesPointId, {});
            console.log("Response:" + JSON.stringify(response));
            expect(response).not.toBe(null);
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }
        }
    });
});

describe("LmitesDeMontosApi", () => {

    var instance = null;
    var outhWire4= null;


    beforeEach(function() {
        instance = new api.LmitesDeMontosApi()
        outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("obtainConfigurationsLimits", async() => {

        try{
        const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY, SECRET_KEY,"spei_admin");
        const suscription = SUBSCRIPTION
            const response = instance.obtainConfigurationsLimits(authorization, suscription, {});
            expect(response).not.toBe(null)
        } catch (error) {

            if(error.status !== undefined ) {
                console.log('Error:' + error.status, ' mensaje:' + error.statusText);
            } else {
                console.log('Error:' + error);
            }
        }
    })
})
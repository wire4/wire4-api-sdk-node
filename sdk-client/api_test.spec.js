
const OAUTH_CONSUMER_KEY = "wEw7JCxjgNbrWjb2yz74XuLCc7sa";
const OAUTH_CONSUMER_SECRET = "qiPoEGpWNHTWpqUKfWCNJRuCNUsa";
const USER_KEY = "bb5207b74dd408c8f0735e942c1d64@sandbox.wire4.mx";
const SECRET_KEY = "0929ae15f964c98bb0be8240f7df68";
const SUBSCRIPTION = "19b341dd-88b0-49a2-9997-117f553d15cd";

const OAuthWire4 = require('oauthwire4').default;
const api = require('wire4-api-sdk');
const Environment = require('oauthwire4/build/src/environmentEnum').EnvironmentEnum;

/*describe("InstitucionesApi", () => {
    var instance  = null;
    var oauthWire4 = null;
    beforeEach(function() {
        instance = new api.InstitucionesApi();
        oauthWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    test("getAllInstitutionsUsingGET", async () => {
        const authorization = await oauthWire4.obtainAccessTokenApp('general');
        //console.log("TOKEN AUTORIZACION:"+authorization);
        //console.log('Lista de insttituciones:'+ JSON.stringify(await instance.getAllInstitutionsUsingGET(authorization, {})));
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
});*/

describe("CuentasDeBeneficiariosSPEIApi", () => {
    let instance = null;
    let outhWire4= null;
    beforeEach(function() {
        instance = new api.CuentasDeBeneficiariosSPEIApi();
        outhWire4 = new OAuthWire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, Environment.SANDBOX);
    });

    /*test("authorizeAccountsPendingPUT", async() => {
        try {
            //changeCase.snakeCase(JSON.stringify(body))
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
    });*/
    /*test("deleteAccountUsingDELETE", async () => {

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
    });*/
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
    /*test("removeBeneficiariesPendingUsingDELETE", async () => {

        try {
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY,SECRET_KEY,'spei_admin');
            const requestId = "89670500-1eab-4c08-8a21-7896d17f6110";
            const subscription = SUBSCRIPTION;
            expect(await instance.removeBeneficiariesPendingUsingDELETE(authorization, requestId, subscription, {})).not.toBe(null);
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
                amountLimit:700000.00,
                currencyCode:"MXP",
                previousAmountLimit:900000,
                cancelReturnUrl: "https://pro.cuentasok.com",
                returnUrl: "https://pro.cuentasok.com",
            };
            const authorization = await outhWire4.obtainAccessTokenAppUser(USER_KEY,SECRET_KEY,'spei_admin');
            const account = "137180101805319345";
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
    }); */
});
const OAUTH_CONSUMER_KEY = "UJzaxHWfVA4I_xrIYQCy07fUFHwa";
const OAUTH_CONSUMER_SECRET = "rGXsL19OryOofeLgirRYRAetYZsa";
// var CLIENT_KEY = '83c913441334eefbff0634e868a78c@sandbox.wire4.mx';
// var CLIENT_SECRET = '692e99eece3441a86cf6cc2e10e694';
var Oauthwire4 = require('oauthwire4').default;
var institutions = require('wire4-api-sdk').InstitucionesApi;
var environment = require('oauthwire4/build/src/environmentEnum').EnvironmentEnum;

/*async function getInstituciones() {
    var authorization = await outhWire4.obtainAccessTokenApp('general');
    var institutionsService = new institutions();

}
getInstituciones(); */

describe("Consulta de Instituciones", ()=>{

    var outhWire4 = null;
    var institutionsService = null;
    beforeEach(()=>{
        outhWire4 = new Oauthwire4(OAUTH_CONSUMER_KEY, OAUTH_CONSUMER_SECRET, environment.SANDBOX);
        institutionsService = new institutions();
    });

    test("getAllInstitutionsUsingGET", async () => {
        var authorization = await outhWire4.obtainAccessTokenApp('general');
        var list = await institutionsService.getAllInstitutionsUsingGET(authorization, {});
        console.log(list);
        expect(list).not.toBe(null);
    })
});
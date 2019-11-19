import "mocha";
import { expect } from "chai";
import { ResponseUtils } from "../../src/utils/ResponseUtils";
import { AuthResponse } from "../../src/AuthResponse";
import { IdToken } from "../../src/IdToken";
import { TEST_TOKENS } from "../TestConstants";

describe("ResponseUtils.ts class", () => {

    const EMPTY_RESPONSE : AuthResponse = {
        uniqueId: "",
        tenantId: "",
        tokenType: "",
        idToken: null,
        idTokenClaims: null,
        accessToken: null,
        scopes: [],
        expiresOn: null,
        account: null,
        accountState: "",
        fromCache: false
    };

    let idTokenObj: IdToken;
    beforeEach(() => {
        idTokenObj = new IdToken(TEST_TOKENS.IDTOKEN_V2);
    });

    it("setResponseIdToken sets authResponse idToken value", () => {
        const newAuthResponse = ResponseUtils.setResponseIdToken(EMPTY_RESPONSE, idTokenObj);
        expect(newAuthResponse.idToken).to.be.equal(idTokenObj);
        expect(newAuthResponse.idTokenClaims).to.be.equal(idTokenObj.claims);
        expect(newAuthResponse.uniqueId).to.be.equal(idTokenObj.objectId || idTokenObj.subject);
        expect(newAuthResponse.tenantId).to.be.equal(idTokenObj.tenantId);
    });

    it("setResponseIdToken returns null if given a null original request.", () => {
        const newAuthResponse = ResponseUtils.setResponseIdToken(null, idTokenObj);
        expect(newAuthResponse).to.be.null;
    });

    it("setResponseIdToken returns original response if given a null idTokenObj", () => {
        const newAuthResponse = ResponseUtils.setResponseIdToken(EMPTY_RESPONSE, null);
        expect(newAuthResponse).to.be.equal(EMPTY_RESPONSE);
    });
});

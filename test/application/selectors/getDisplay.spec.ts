import { getCertificateDefinition, getDisplay } from '../../../src/selectors/certificate';
import updateCertificateDefinition from '../../../src/actions/updateCertificateDefinition';
import v2Fixture from '../../fixtures/valid-certificate-example.json';
import v3Fixture from '../../fixtures/testnet-v3.0-beta.json';
import { configureStore } from '../../../src/store';
import getInitialState from '../../../src/store/getInitialState';
import stubCertificateVerify from '../__helpers/stubCertificateVerify';

describe('getDisplay selector', function () {
  let store;

  beforeEach(function () {
    const initialState = getInitialState({ disableVerify: true });
    store = configureStore(initialState);
  });

  afterEach(function () {
    store = null;
  });

  describe('given there is no certificate definition in the state', function () {
    it('should return an empty string', function () {
      const state = store.getState();
      expect(getDisplay(state)).toBe('');
    });
  });

  describe('given the certificate is a certificate with a displayHTML property', function () {
    stubCertificateVerify(v2Fixture);

    beforeEach(async function () {
      await store.dispatch(updateCertificateDefinition(v2Fixture));
    });

    it('should return the displayHTML property', function () {
      const state = store.getState();
      expect(getDisplay(state)).toBe('<section class="text" style="margin-top:12px;width:100%;display:inline-block;"><span style="display:block;font-family:Georgia, serif;font-weight:normal;font-size:1.25em;text-align:center;text-transform:none;margin:0 auto;width:100%;">YO!</span></section>');
    });
  });

  describe('given the certificate is a certificate with a display property', function () {
    stubCertificateVerify(v3Fixture);

    describe('and the type is text/html', function () {
      beforeEach(async function () {
        await store.dispatch(updateCertificateDefinition(v3Fixture));
      });

      it('should return the display HTML as coded into the document', function () {
        const state = store.getState();
        expect(getDisplay(state)).toBe('<b>hello world</b>');
      });
    });
  });
});

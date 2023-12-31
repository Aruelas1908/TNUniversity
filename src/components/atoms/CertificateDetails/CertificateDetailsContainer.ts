import connector from '../../../store/connector';
import type { ICertificateDetailsApi } from './CertificateDetails';
import CertificateDetails from './CertificateDetails';
import {
  getChain,
  getIssueDate,
  getIssuedOn,
  getIssuerName, getIssuerProfileDomain, getIssuerProfileUrl,
  getIssuerPublicKey,
  getRecipientName, getSignatureSuiteType,
  getTransactionId
} from '../../../selectors/certificate';
import type { BlockcertsVerifierState } from '../../../store/getInitialState';

export const mapStateToProps = (state: BlockcertsVerifierState): ICertificateDetailsApi => ({
  recipientName: getRecipientName(state),
  issueDate: getIssueDate(state),
  issuedOn: getIssuedOn(state),
  issuerName: getIssuerName(state),
  transactionId: getTransactionId(state),
  issuerPublicKey: getIssuerPublicKey(state),
  issuerProfileDomain: getIssuerProfileDomain(state),
  issuerProfileUrl: getIssuerProfileUrl(state),
  signatureSuiteType: getSignatureSuiteType(state),
  chain: getChain(state)
});

const ownProps: Partial<ICertificateDetailsApi> = {
  display: String as any,
  hideRecipientName: Boolean as any
};

const CertificateDetailsContainer = connector(CertificateDetails, { mapStateToProps, ownProps });
export default CertificateDetailsContainer;

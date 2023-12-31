import { VERIFICATION_STATUSES } from '../../../constants/verificationStatuses';
import type { Certificate, IVerificationMapItem } from '@blockcerts/cert-verifier-js';

export default function initializeVerificationSteps (definition: Certificate): IVerificationMapItem {
  const steps = JSON.parse(JSON.stringify(definition.verificationSteps));
  return steps.map((step, i) => ({
    ...step,
    isLast: i === steps.length - 1,
    status: VERIFICATION_STATUSES.DEFAULT
  }));
}

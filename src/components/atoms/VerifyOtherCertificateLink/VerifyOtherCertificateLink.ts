import { html } from '@polymer/lit-element';
import CSS from './_components.verify-other-certificate-css';
import getText from '../../../i18n/getText';
import type { TemplateResult } from 'lit-html';

export interface VerifyOtherCertificateLinkProps {
  onClick?: (e?: Event) => any;
  isVisible?: boolean;
}
export default function VerifyOtherCertificateLink ({ onClick = (): any => {}, isVisible = false }: VerifyOtherCertificateLinkProps = {}): TemplateResult {
  if (!isVisible) {
    return null;
  }

  return html`
    ${CSS}
    <a onclick='${onClick}' class='buv-o-text-12  buv-o-link  buv-c-verify-other-certificate  buv-qa-verify-other-certificate'>
      <span class='buv-o-link__text--underline'>${getText('text.verifyOther')}</span>
    </a>
  `;
}

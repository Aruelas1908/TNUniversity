import { html, LitElement } from '@polymer/lit-element';
import CSS from './_components.substeps-list-css';
import VerificationStep from '../../molecules/VerificationStep';
import getText from '../../../i18n/getText';

class SubstepsList extends LitElement {
  constructor () {
    super();
    this.isOpen = false;

    // 2 properties below are a trick to manage the force opening without triggering contempt from LitElement
    // one allows us to know we have forced an opening
    // the second one allows us to make sure isOpen is at the correct state.
    // We can't modify isOpen directly otherwise we get console poluted with warnings.
    this.wasForcedOpen = false;
    this.resetOpen = false;
    this.toggleOpen = this.toggleOpen.bind(this);
    // when we force open, we don't have access to the initial height, so we are forcing it onto the list after
    // its first render. We only want to do this once in the lifecycle. See ADR-005.
    this.totalHeight = 0;
    this.heightWasReset = false;
  }

  static get properties () {
    return {
      subSteps: [],
      suites: [],
      isOpen: Boolean,
      hasError: Boolean
    };
  }

  toggleOpen () {
    if (this.wasForcedOpen && !this.resetOpen) {
      this.isOpen = true;
      this.resetOpen = true;
    }
    this.isOpen = !this.isOpen;
  }

  _didRender () {
    if (!this.totalHeight) {
      const listParent = this.shadowRoot.querySelectorAll('.buv-js-substeps-list__list')[0];
      const listElements = listParent ? Array.from(listParent.childNodes) : [];
      this.totalHeight = listElements.reduce((acc, element) => {
        if (element.getBoundingClientRect) {
          return acc + element.getBoundingClientRect().height;
        }
        return acc;
      }, 0);

      if (this.wasForcedOpen && !this.heightWasReset) {
        // only do it once.
        listParent.style.maxHeight = this.totalHeight + 'px';
        this.heightWasReset = true;
      }
    }
  }

  renderSuites (suites) {
    if (suites.length <= 1) {
      return;
    }

    console.log('suites', suites);
    return suites.map(suite => {
      return html`
          <h3>Proof type: ${suite.proofType}</h3>
          <buv-substeps-list subSteps='${suite.subSteps}'></buv-substeps-list>`;
    });
  }

  _render ({ subSteps = [], suites = [], hasError }) {
    if (!subSteps) {
      return null;
    }

    if (!subSteps.length && suites.length === 1) {
      subSteps = suites[0].subSteps;
    }

    let isOpen = this.isOpen;

    if (!this.wasForcedOpen && hasError) {
      isOpen = true;
      this.wasForcedOpen = true;
    }

    const renderedSubSteps = subSteps.filter(subStep => subStep.status);
    const itemsLength = renderedSubSteps.length;
    // TODO: translate with plural Item
    const itemString = `${itemsLength} ${getText('text', 'item', true, itemsLength)}`;
    // we are setting the closing height to 1px so that we can trigger a closing action on the first click on hide button.
    const maxHeight = isOpen ? this.totalHeight : 1;

    // TODO: better handle this dynamic class (cf npm classnames)
    const linkClasses = [
      'buv-o-text-12',
      'buv-o-link',
      'buv-c-substeps-list__link',
      isOpen ? 'is-open' : ''
    ].join(' ');

    const listClasses = [
      'buv-c-substeps-list__list',
      'buv-js-substeps-list__list',
      isOpen ? 'is-open' : ''
    ].join(' ');

    return html`
    ${CSS}
    <a title='${getText('text.substepsListHint')}' onclick='${this.toggleOpen}' class$='${linkClasses}'>
      <span class='buv-o-link__text--underline'>${isOpen ? getText('text.substepsListClose') : itemString}</span>
    </a>
    <div class$='${listClasses}' style$='max-height: ${maxHeight}px'>
      ${renderedSubSteps.map(subStep => html`${VerificationStep(subStep)}`)} 
      ${this.renderSuites(suites)}
    </div>
    `;
  }
}

export default SubstepsList;

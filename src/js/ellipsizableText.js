const template = Object.assign(document.createElement('template'), {
  innerHTML: `
      <style>
        .text {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: block;
        }

        .text--overflown {
          cursor: pointer;
        }

        .tooltip {
          outline: 0;
          position: absolute;
          top: calc(100% + 8px);
          display: block;
          z-index: 1;
          background: rgba(228, 228, 228);
          border-radius: 8px;
          width: 100%;
          box-sizing: content-box;
          left: -12px;
          opacity: 0;
          clip: rect(0, 0, 0, 0);
          word-break: break-all;
        }

        .tooltip::before {
          content: '';
          height: 0;
          width: 0;
          border: 8px solid transparent;
          border-bottom-color: rgba(228, 228, 228);
          position: absolute;
          top: -16px;
          right: 16px;
        }

        .tooltip::after {
          content: '';
          height: 8px;
          width: 100%;
          position: absolute;
          top: -8px;
          right: 0;
          background: transparent;
        }

        .tooltip:focus,
        .text--overflown:focus + .tooltip,
        .text--overflown:hover + .tooltip {
          opacity: 1;
          width: 100%;
          padding: 8px 16px;
          clip: auto;
        }
      </style>
      <span class="text"></span>
    `,
});

const runDelayed = window.requestIdleCallback || window.requestAnimationFrame;

const TEXT_ATTRIBUTE = 'text';

class EllipsizableText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() { return [TEXT_ATTRIBUTE]; }

  connectedCallback() {
    const textContent = this.getAttribute(TEXT_ATTRIBUTE);
    this.textNode = this.shadowRoot.querySelector('.text');

    this.textNode.textContent = textContent;

    runDelayed(this.updateTooltip.bind(this));
  }

  updateTooltip () {
    const isOverflowing = this.textNode.offsetWidth < this.textNode.scrollWidth;
    const existingTooltip = this.getExistingTooltip();

    if (existingTooltip && !isOverflowing) {
      this.shadowRoot.removeChild(existingTooltip);
      this.textNode.removeAttribute('tabIndex');
      this.textNode.classList.remove('text--overflown');
    }

    if (!existingTooltip && isOverflowing) {
      this.textNode.setAttribute('tabIndex', 0);
      this.textNode.classList.add('text--overflown');

      const tooltip = this.textNode.cloneNode(true);

      tooltip.setAttribute('tabIndex', 0);

      tooltip.className = 'tooltip';
      this.shadowRoot.appendChild(tooltip);
    }
  }

  getExistingTooltip () {
    return this.shadowRoot.querySelector('.tooltip');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (attrName === TEXT_ATTRIBUTE && oldVal !== null) {
      this.textNode.textContent = newVal;
      this.updateTooltip();
    }
  }
}

window.customElements.define('ellipsizable-text', EllipsizableText);

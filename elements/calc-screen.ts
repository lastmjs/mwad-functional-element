import { html, customElement } from 'functional-element';

customElement('calc-screen', ({ props, constructing }) => {
    if (constructing) {
        return {
            screenValue: ''
        };
    }

    return html`
        <style>
            .screen {
                border: solid 1px black;
                text-align: right;
                font-size: calc(25px + 1vmin);
                height: 100%;
            }
        </style>

        <div class="screen">${props.screenValue}</div>
    `;
});
import { html } from 'lit-html';
import { customElement } from 'functional-element';

customElement('calc-button', calcButton);

function calcButton({ props, constructing }) {
    if (constructing) {
        return {
            props: {
                text: ''
            }
        };
    }

    return {
        template: html`
            <style>
                .number-button {
                    display: flex;
                    align-items: center;
                    text-align: center;
                    justify-content: center;
                    border: solid 1px black;
                    cursor: pointer;
                    font-size: calc(20px + 1vmin);
                    height: 100%;
                }
            </style>

            <div class="number-button">${props.text}</div>
        `
    };
}
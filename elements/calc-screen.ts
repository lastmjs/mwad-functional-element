import { html } from 'lit-html';
import { customElement } from 'functional-element';

customElement('calc-screen', calcScreen);

function calcScreen({ props, constructing }) {
    if (constructing) {
        return {
            props: {
                screenValue: ''
            }
        };
    }

    return {
        template: html`
            <style>
                .screen {
                    border: solid 1px black;
                    text-align: right;
                    font-size: calc(25px + 1vmin);
                    height: 100%;
                }
            </style>

            <div class="screen">${props.screenValue}</div>
        `
    };
}
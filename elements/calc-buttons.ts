import { html } from 'lit-html';
import { customElement } from 'functional-element';
import './calc-button';

customElement('calc-buttons', calcButtons);

function calcButtons({ props, element }) {
    return {
        template: html`
            <style>
                .button-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr;
                    height: 100%;
                }

                .button-column {
                    display: flex;
                    flex-direction: column;
                }

                calc-button {
                    flex: 1;
                }
            </style>

            <div class="button-grid">
                <div class="button-column">
                    <calc-button
                        @click=${() => addCharacter('7', element)}
                        .text=${'7'}
                    ></calc-button>
                    <calc-button
                        @click=${() => addCharacter('4', element)}
                        .text=${'4'}
                    ></calc-button>
                    <calc-button
                        @click=${() => addCharacter('1', element)}
                        .text=${'1'}
                    ></calc-button>
                    <calc-button
                        @click=${() => addCharacter('0', element)}
                        .text=${'0'}
                    ></calc-button>
                </div>

                <div class="button-column">
                    <calc-button
                        @click=${() => addCharacter('8', element)}
                        .text=${'8'}
                    ></calc-button>
                    <calc-button
                        @click=${() => addCharacter('5', element)}
                        .text=${'5'}
                    ></calc-button>
                    <calc-button
                        @click=${() => addCharacter('2', element)}
                        .text=${'2'}
                    ></calc-button>
                    <calc-button
                        @click=${() => addCharacter('.', element)}
                        .text=${'.'}
                    ></calc-button>
                </div>

                <div class="button-column">
                    <calc-button
                        @click=${() => addCharacter('9', element)}
                        .text=${'9'}
                    ></calc-button>
                    <calc-button
                        @click=${() => addCharacter('6', element)}
                        .text=${'6'}
                    ></calc-button>
                    <calc-button
                        @click=${() => addCharacter('3', element)}
                        .text=${'3'}
                    ></calc-button>
                    <calc-button
                        @click=${() => calculate(element)}
                        .text=${'='}
                    ></calc-button>
                </div>

                <div class="button-column">
                    <calc-button
                        @click=${() => clear(element)}
                        .text=${'clear'}
                    ></calc-button>
                    <calc-button
                        @click=${() => addCharacter('*', element)}
                        .text=${'*'}
                    ></calc-button>
                    <calc-button
                        @click=${() => addCharacter('/', element)}
                        .text=${'/'}
                    ></calc-button>
                    <calc-button
                        @click=${() => addCharacter('+', element)}
                        .text=${'+'}
                    ></calc-button>
                    <calc-button
                        @click=${() => addCharacter('-', element)}
                        .text=${'-'}
                    ></calc-button>
                </div>

            </div>
        `
    };
}

function addCharacter(character, element) {
    element.dispatchEvent(new CustomEvent('character', {
        detail: {
            character
        }
    }));
}

function calculate(element) {
    element.dispatchEvent(new CustomEvent('calculate'));
}

function clear(element) {
    element.dispatchEvent(new CustomEvent('clear'));
}
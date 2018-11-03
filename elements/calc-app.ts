import { html } from 'lit-html';
import { customElement } from 'functional-element';
import './calc-screen';
import './calc-buttons';

customElement('calc-app', calcApp);

function calcApp({ props, update, constructing, connecting }) {
    if (!props.resizeListenerSet) {
        window.addEventListener('resize', () => {
            update();
        });
    }

    if (constructing) {
        return {
            props: {
                screenValue: '',
                resizeListenerSet: true
            }
        };
    }

    const desktopScreen = window.matchMedia('(min-width: 1024px)').matches;

    return {
        template: html`
            <style>
                .main-grid-container {
                    display: grid;
                    grid-template-rows: 10% 90%;
                    width: ${desktopScreen ? '80%' : '100%'};
                    height: ${desktopScreen ? '80%' : '100%'};
                    padding-right: ${desktopScreen ? '10%' : '0'};
                    padding-left: ${desktopScreen ? '10%' : '0'};
                }
            </style>

            <div class="main-grid-container">
                <calc-screen .screenValue=${props.screenValue}></calc-screen>
                <calc-buttons
                    @character=${(e) => update(addToScreen(props, e.detail.character))}
                    @calculate=${() => update(calculate(props))}
                    @clear=${() => update({ props: {...props, screenValue: ''} })}
                >
                </calc-buttons>
            </div>
        `
    };
}

function addToScreen(props, newValue) {
    return {
        props: {
            ...props,
            screenValue: props.screenValue === 'Syntax error' ? newValue : `${props.screenValue}${newValue}`
        }
    };
}

function calculate(props) {
    try {
        const result = eval(props.screenValue);
        return {
            props: {
                ...props,
                screenValue: result
            }
        };
    }
    catch(error) {
        return {
            props: {
                ...props,
                screenValue: 'Syntax error'
            }
        };
    }
}
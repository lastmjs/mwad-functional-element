import { html, customElement } from 'functional-element';
import './calc-screen';
import './calc-buttons';

customElement('calc-app', ({ props, update, constructing }) => {
    if (!props.resizeListenerSet) {
        window.addEventListener('resize', () => {
            update();
        });
    }

    if (constructing) {
        return {
            screenValue: '',
            resizeListenerSet: true
        };
    }

    const desktopScreen = window.matchMedia('(min-width: 1024px)').matches;

    return html`
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
                @clear=${() => update({...props, screenValue: '' })}
            >
            </calc-buttons>
        </div>
    `;
});

function addToScreen(props, newValue) {
    return {
        ...props,
        screenValue: props.screenValue === 'Syntax error' ? newValue : `${props.screenValue}${newValue}`
    };
}

function calculate(props) {
    try {
        const result = eval(props.screenValue);
        return {
            ...props,
            screenValue: result
        };
    }
    catch(error) {
        return {
            ...props,
            screenValue: 'Syntax error'
        };
    }
}
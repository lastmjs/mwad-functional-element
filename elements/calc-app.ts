import { html, customElement } from 'functional-element';
import './calc-screen';
import './calc-buttons';

customElement('calc-app', ({ constructing, update, screenValue, resizeListenerSet }) => {
    if (!resizeListenerSet) {
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
            <calc-screen .screenValue=${screenValue}></calc-screen>
            <calc-buttons
                @character=${(e) => update(addToScreen(screenValue, e.detail.character))}
                @calculate=${() => update(calculate(screenValue))}
                @clear=${() => update({ screenValue: '' })}
            >
            </calc-buttons>
        </div>
    `;
});

function addToScreen(screenValue, newValue) {
    return {
        screenValue: screenValue === 'Syntax error' ? newValue : `${screenValue}${newValue}`
    };
}

function calculate(screenValue) {
    try {
        const result = eval(screenValue);
        return {
            screenValue: result
        };
    }
    catch(error) {
        return {
            screenValue: 'Syntax error'
        };
    }
}
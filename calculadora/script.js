let expression = '';

function updateDisplay() {
    document.getElementById('expression').textContent = expression;
}

function appendChar(char) {
    const ops = ['+', '-', '×', '÷', '%'];
    const last = expression.slice(-1);

    if (ops.includes(char) && ops.includes(last)) {
        expression = expression.slice(0, -1);
    }

    if (expression === '' && ops.includes(char) && char !== '-') return;

    expression += char;
    updateDisplay();
}

function clearAll() {
    expression = '';
    document.getElementById('result').textContent = '0';
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function calculate() {
    if (!expression) return;

    try {
        let formula = expression
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/%/g, '/100');

        const value = Function('"use strict"; return (' + formula + ')')();

        document.getElementById('expression').textContent = expression + ' =';
        document.getElementById('result').textContent =
            Number.isFinite(value) ? +value.toFixed(10) : 'Erro';

        expression = String(Number.isFinite(value) ? +value.toFixed(10) : '');
    } catch {
        document.getElementById('result').textContent = 'Erro';
        expression = '';
    }
}

document.addEventListener('keydown', (e) => {
    const map = {
        'Enter': calculate,
        'Backspace': deleteLast,
        'Escape': clearAll,
        '*': () => appendChar('×'),
        '/': () => appendChar('÷'),
    };

    if (map[e.key]) {
        map[e.key]();
    } else if ('0123456789.+-% '.includes(e.key)) {
        appendChar(e.key.trim());
    }
});
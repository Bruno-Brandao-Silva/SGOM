import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FormCadCliente from './components/formCadCliente';

function render() {
    ReactDOM.render(<FormCadCliente></FormCadCliente>, document.getElementById('root'));
}

render();
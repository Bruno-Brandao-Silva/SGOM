import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import FormCadCliente from './components/formCadCliente';

function render() {
    ReactDOM.render(<>
        <HashRouter>
            <Routes>
                <Route path="/" element={<FormCadCliente />} />
                {/* <Route path="/firstPage" component={FirstPage} /> */}
                {/* <Route path="/secondPage" component={SecondPage} /> */}
            </Routes>
        </HashRouter>
    </>, document.getElementById('root'));
}

render();
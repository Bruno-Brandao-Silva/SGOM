import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Index from './components';
import FormCadCliente from './components/formCadCliente';
import FormCadEndereco from './components/formCadEndereco';

function render() {
    ReactDOM.render(<>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/FormCadCliente/" element={<FormCadCliente />}>
                    <Route path="/FormCadCliente/:id" element={<FormCadCliente />} />
                </Route>
                <Route path="/FormCadEndereco/:id_cliente" element={<FormCadEndereco />}>
                    <Route path="/FormCadEndereco/:id_cliente/:id" element={<FormCadEndereco />} />
                </Route>
                {/* <Route path="/secondPage" component={SecondPage} /> */}
            </Routes>
        </HashRouter>
    </>, document.getElementById('root'));
}

render();
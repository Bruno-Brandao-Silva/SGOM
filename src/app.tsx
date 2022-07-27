import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Index from './components';
import FormCadCliente from './components/formCadCliente';
import FormCadEndereco from './components/formCadEndereco';
import FormCadServiço from './components/formCadServico';
import UnitCliente from './components/unitCliente';

function render() {
    ReactDOM.render(<>
        <HashRouter>
            <Routes>
                <Route path="/" element={<FormCadServiço />} />
                {/* <Route path="/" element={<UnitCliente id={'1'}/>} /> */}
                {/* <Route path="/" element={<Index />} /> */}
                <Route path="/FormCadCliente/" element={<FormCadCliente />}>
                    <Route path="/FormCadCliente/:id" element={<FormCadCliente />} />
                </Route>
                <Route path="/FormCadEndereco/:id_cliente" element={<FormCadEndereco />}>
                    <Route path="/FormCadEndereco/:id_cliente/:id" element={<FormCadEndereco />} />
                </Route>
            </Routes>
        </HashRouter>
    </>, document.getElementById('root'));
}

render();
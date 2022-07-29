import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Index from './components';
import FormCadCliente from './components/formCadCliente';
import FormCadEndereco from './components/formCadEndereco';
import FormCadServico from './components/formCadServico';
import TodosClientes from './components/todosClientes';
import Cliente from './components/cliente';

function render() {
    ReactDOM.render(<>
        <HashRouter>
            <Routes>
                {/* <Route path="/" element={<FormCadServico />} /> */}
                <Route path="/" element={<Index />} />
                <Route path="/FormCadCliente/" element={<FormCadCliente />}>
                    <Route path="/FormCadCliente/:id" element={<FormCadCliente />} />
                </Route>
                <Route path="/FormCadEndereco/:id_cliente" element={<FormCadEndereco />}>
                    <Route path="/FormCadEndereco/:id_cliente/:id" element={<FormCadEndereco />} />
                </Route>
                <Route path="/FormCadServico/:id_cliente" element={<FormCadServico />} >
                    <Route path="/FormCadServico/:id_cliente/:id_veiculo" element={<FormCadServico />} />
                </Route>
                <Route path='/TodosClientes' element={<TodosClientes />} />
                <Route path='/Cliente/:id' element={<Cliente />} />
            </Routes>
        </HashRouter>
    </>, document.getElementById('root'));
}

render();
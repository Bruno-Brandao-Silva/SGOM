import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Index from './components';
import FormCadCliente from './components/formCadCliente';
import FormCadEndereco from './components/formCadEndereco';
import FormCadServico from './components/formCadServico';
import TodosClientes from './components/todosClientes';
import Cliente from './components/cliente';
import FormCadVeiculo from './components/formCadVeiculo';
import TodosVeiculos from './components/todosVeiculos';
import TodosServicos from './components/todosServicos';

export default function App(): React.ReactNode {
    return (<React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/FormCadCliente/" element={<FormCadCliente />}>
                    <Route path="/FormCadCliente/:cpf_cnpj" element={<FormCadCliente />} />
                </Route>
                <Route path="/FormCadEndereco/:cpf_cnpj" element={<FormCadEndereco />}>
                    <Route path="/FormCadEndereco/:cpf_cnpj/:id" element={<FormCadEndereco />} />
                </Route>
                <Route path="/FormCadServico/:cpf_cnpj" element={<FormCadServico />} >
                    <Route path="/FormCadServico/:cpf_cnpj/:id_veiculo" element={<FormCadServico />} />
                </Route>
                <Route path="/EditServico/:id" element={<FormCadServico />} />
                <Route path='/TodosClientes' element={<TodosClientes />} />
                <Route path='/Cliente/:cpf_cnpj' element={<Cliente />} />
                <Route path='/FormCadVeiculo/:cpf_cnpj' element={<FormCadVeiculo />} >
                    <Route path='/FormCadVeiculo/:cpf_cnpj/:id_plate' element={<FormCadVeiculo />} />
                </Route>
                <Route path='/TodosVeiculos' element={<TodosVeiculos />} />
                <Route path='/TodosServicos' element={<TodosServicos />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
    );
}
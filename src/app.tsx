import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import ClientRegForm from './components/ClientRegForm';
import AddressRegForm from './components/AddressRegForm';
import ServiceRegForm from './components/ServiceRegForm';
import TodosClientes from './components/todosClientes';
import Client from './components/Client';
import VehicleRegForm from './components/VehicleRegForm';
import TodosVeiculos from './components/todosVeiculos';
import TodosServicos from './components/todosServicos';

export default function App(): React.ReactNode {
    return (<React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/FormCadCliente/" element={<ClientRegForm />}>
                    <Route path="/FormCadCliente/:cpf_cnpj" element={<ClientRegForm />} />
                </Route>
                <Route path="/FormCadEndereco/:cpf_cnpj" element={<AddressRegForm />}>
                    <Route path="/FormCadEndereco/:cpf_cnpj/:id" element={<AddressRegForm />} />
                </Route>
                <Route path="/FormCadServico/:cpf_cnpj" element={<ServiceRegForm />} >
                    <Route path="/FormCadServico/:cpf_cnpj/:id_veiculo" element={<ServiceRegForm />} />
                </Route>
                <Route path="/EditServico/:id" element={<ServiceRegForm />} />
                <Route path='/TodosClientes' element={<TodosClientes />} />
                <Route path='/Cliente/:cpf_cnpj' element={<Client />} />
                <Route path='/FormCadVeiculo/:cpf_cnpj' element={<VehicleRegForm />} >
                    <Route path='/FormCadVeiculo/:cpf_cnpj/:id_plate' element={<VehicleRegForm />} />
                </Route>
                <Route path='/TodosVeiculos' element={<TodosVeiculos />} />
                <Route path='/TodosServicos' element={<TodosServicos />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
    );
}
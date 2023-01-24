import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import ClientRegForm from './components/ClientRegForm';
import AddressRegForm from './components/AddressRegForm';
import ServiceRegForm from './components/ServiceRegForm';
import AllClients from './components/todosClientes';
import Client from './components/Client';
import VehicleRegForm from './components/VehicleRegForm';
import AllVehicles from './components/todosVeiculos';
import AllServices from './components/todosServicos';

export default function App(): React.ReactNode {
    return (<React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/ClientRegForm/" element={<ClientRegForm />}>
                    <Route path="/ClientRegForm/:cpf_cnpj" element={<ClientRegForm />} />
                </Route>
                <Route path="/AddressRegForm/:cpf_cnpj" element={<AddressRegForm />}>
                    <Route path="/AddressRegForm/:cpf_cnpj/:id" element={<AddressRegForm />} />
                </Route>
                <Route path="/ServiceRegForm/:cpf_cnpj" element={<ServiceRegForm />} >
                    <Route path="/ServiceRegForm/:cpf_cnpj/:id_plate" element={<ServiceRegForm />} />
                </Route>
                <Route path="/ServiceEditForm/:id" element={<ServiceRegForm />} />
                <Route path='/AllClients' element={<AllClients />} />
                <Route path='/Client/:cpf_cnpj' element={<Client />} />
                <Route path='/VehicleRegForm/:cpf_cnpj' element={<VehicleRegForm />} >
                    <Route path='/VehicleRegForm/:cpf_cnpj/:id_plate' element={<VehicleRegForm />} />
                </Route>
                <Route path='/AllVehicles' element={<AllVehicles />} />
                <Route path='/AllServices' element={<AllServices />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
    );
}
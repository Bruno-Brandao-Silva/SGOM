import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import ClientRegForm from './components/ClientRegForm';
import AddressRegForm from './components/AddressRegForm';
import ServiceRegForm from './components/ServiceRegForm';
import ProductRegForm from './components/ProductRegForm';
import AllClients from './components/ClientsAll';
import Client from './components/Client';
import VehicleRegForm from './components/VehicleRegForm';
import AllVehicles from './components/VehiclesAll';
import AllServices from './components/ServicesAll';
import AllProducts from './components/ProductsAll';

export default function App(): React.ReactNode {
    return (
        <React.StrictMode>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/ClientRegForm/" element={<ClientRegForm />} />
                    <Route path="/ClientEditForm/:cpf_cnpj" element={<ClientRegForm />} />
                    <Route path="/AddressRegForm/:cpf_cnpj" element={<AddressRegForm />} />
                    <Route path="/AddressEditForm/:cpf_cnpj/:id" element={<AddressRegForm />} />
                    <Route path="/ServiceRegForm/" element={<ServiceRegForm />} >
                        <Route path="/ServiceRegForm/:cpf_cnpj" element={<ServiceRegForm />} >
                            <Route path="/ServiceRegForm/:cpf_cnpj/:id_plate" element={<ServiceRegForm />} />
                        </Route>
                    </Route>
                    <Route path="/ServiceEditForm/:id" element={<ServiceRegForm />} />
                    <Route path="/ProductRegForm/" element={<ProductRegForm />} />
                    <Route path="/ProductEditForm/:id" element={<ProductRegForm />} />
                    <Route path='/AllClients' element={<AllClients />} />
                    <Route path='/Client/:cpf_cnpj' element={<Client />} />
                    <Route path='/VehicleRegForm/:cpf_cnpj' element={<VehicleRegForm />} />
                    <Route path='/VehicleEditForm/:cpf_cnpj/:id_plate' element={<VehicleRegForm />} />
                    <Route path='/AllVehicles' element={<AllVehicles />} />
                    <Route path='/AllServices' element={<AllServices />} />
                    <Route path='/AllProducts' element={<AllProducts />} />
                </Routes>
            </HashRouter>
        </React.StrictMode>
    );
}
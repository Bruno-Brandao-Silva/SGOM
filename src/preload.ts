import { contextBridge } from "electron";
import Address from "./models/Address";
import Client from "./models/Client";
import Contact from "./models/Contact";
import Product from "./models/Product";
import Purchase from "./models/Purchase";
import PurchaseList from "./models/PurchaseList";
import RequireList from "./models/RequireList";
import Service from "./models/Service";
import Vehicle from "./models/Vehicle";

contextBridge.exposeInMainWorld('api', {
    Client: () => new Client(),
    Address: () => new Address(),
    Contact: () => new Contact(),
    Product: () => new Product(),
    Purchase: () => new Purchase(),
    PurchaseList: () => new PurchaseList(),
    RequireList: () => new RequireList(),
    Service: () => new Service(),
    Vehicle: () => new Vehicle(),
})

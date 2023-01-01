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
    Client: (props: Client) => new Client(props),
    Address: (props: Address) => new Address(props),
    Contact: (props: Contact) => new Contact(props),
    Product: (props: Product) => new Product(props),
    Purchase: (props: Purchase) => new Purchase(props),
    PurchaseList: (props: PurchaseList) => new PurchaseList(props),
    RequireList: (props: RequireList) => new RequireList(props),
    Service: (props: Service) => new Service(props),
    Vehicle: (props: Vehicle) => new Vehicle(props),
})

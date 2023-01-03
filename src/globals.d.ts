import Address from "./models/Address";
import Client from "./models/Client";
import Contact from "./models/Contact";
import Product from "./models/Product";
import Purchase from "./models/Purchase";
import PurchaseList from "./models/PurchaseList";
import RequireList from "./models/RequireList";
import Service from "./models/Service";
import Vehicle from "./models/Vehicle";

declare global {
  interface Window {
    api: {
      Client: () => Client;
      Address: () => Address;
      Contact: () => Contact;
      Product: () => Product;
      Purchase: () => Purchase;
      PurchaseList: () => PurchaseList;
      RequireList: () => RequireList;
      Service: () => Service;
      Vehicle: () => Vehicle;
    }
  }
}

export { }
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
      Client: (props: Client) => Client;
      Address: (props: Address) => Address;
      Contact: (props: Contact) => Contact;
      Product: (props: Product) => Product;
      Purchase: (props: Purchase) => Purchase;
      PurchaseList: (props: PurchaseList) => PurchaseList;
      RequireList: (props: RequireList) => RequireList;
      Service: (props: Service) => Service;
      Vehicle: (props: Vehicle) => Vehicle;
    }
  }
}

export { }
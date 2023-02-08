import AddressClass from "./models/Address";
import ClientClass from "./models/Client";
import ContactClass from "./models/Contact";
import ProductClass from "./models/Product";
import PurchaseClass from "./models/Purchase";
import PurchaseListClass from "./models/PurchaseList";
import RequireListClass from "./models/RequireList";
import ServiceClass from "./models/Service";
import VehicleClass from "./models/Vehicle";
import sqlite3 from "better-sqlite3";
import pdfmakeInterfaces from 'pdfmake/interfaces';

declare global {
  type BufferOptions = pdfmakeInterfaces.BufferOptions;
  type TDocumentDefinitions = pdfmakeInterfaces.TDocumentDefinitions;
  type RunResult = sqlite3.RunResult;
  type Address = AddressClass;
  type Client = ClientClass;
  type Contact = ContactClass;
  type Product = ProductClass;
  type Purchase = PurchaseClass;
  type PurchaseList = PurchaseListClass;
  type RequireList = RequireListClass;
  type Service = ServiceClass;
  type Vehicle = VehicleClass;

  interface Window {
    api: {
      Client: () => ClientClass;
      Address: () => AddressClass;
      Contact: () => ContactClass;
      Product: () => ProductClass;
      Purchase: () => PurchaseClass;
      PurchaseList: () => PurchaseListClass;
      RequireList: () => RequireListClass;
      Service: () => ServiceClass;
      Vehicle: () => VehicleClass;
      chooseFile: () => Promise<string[]>;
      pdfCreator: (docDefinition: TDocumentDefinitions, docName: string, dir: string, options?: BufferOptions) => Promise<any>;
    }
  }
}

export { }
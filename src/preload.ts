import { contextBridge } from "electron";
import { ipcRenderer } from "electron";
import Client from "./models/Client";

contextBridge.exposeInMainWorld('api', {
    Client: (props: any) => new Client(props),
    database: (arg: { method: 'all' | 'run' | 'get', query: string, params: any[] }) => ipcRenderer.invoke('database', arg),
})

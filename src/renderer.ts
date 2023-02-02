import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
function importAll(r: any) {
    return r.keys().map(r);
}
importAll(require.context('./public/images/', false, /\.(png|jpe?g|svg)$/));
try {
    importAll(require.context('./public/images/products', false, /\.(png|jpe?g|svg)$/));

} catch (e) { console.log(e) }
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(App());

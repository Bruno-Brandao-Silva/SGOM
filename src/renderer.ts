import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
function importAll(r: any) {
    return r.keys().map(r);
}
const images = importAll(require.context('./public/images/', false, /\.(png|jpe?g|svg)$/));
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(App());

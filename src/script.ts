function importAll(r: any) {
    return r.keys().map(r);
}
const images = importAll(require.context('./public/images/', false, /\.(png|jpe?g|svg)$/));
import './index.css';
import './app'
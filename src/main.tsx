import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import pricesStore from './store/store.ts';
import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={pricesStore}>
        <App />
    </Provider>
);
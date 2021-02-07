import React from 'react';
import ReactDOM from 'react-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import App from './App';

const store = configureStore();
const persitor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate 
        loading={<div>Loading...</div>}
        persistor={persitor} >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
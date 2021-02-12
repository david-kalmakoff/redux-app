import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// Internal Dependencies
import { todos, isLoading } from './todos/reducers';

// reducers
const reducers = { todos, isLoading };

// Setup persistent states
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}

// Configure store
const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configureStore = () => createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);
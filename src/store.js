import {
    createStore,
    combineReducers
} from 'redux';
import {
    persistReducer
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// Internal Dependencies
import {
    todos
} from './todos/reducers';

// reducers
const reducers = {
    todos
};

// Setup persistent states
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}

// Configure store
const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const configureStore = () => createStore(persistedReducer);
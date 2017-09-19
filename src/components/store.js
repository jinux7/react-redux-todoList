import {createStore, combineReducers} from 'redux';
import { listReducer } from './reducer.js'

const store = createStore(listReducer);
export { store };
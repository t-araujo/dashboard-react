import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ProductReducer from './reducer_product';
import BatchesReducer from './reducer_batches';

const rootReducer = combineReducers({
  products: ProductReducer,
  batches: BatchesReducer,
  form: formReducer
});

export default rootReducer;

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ProductReducer from './reducer_product';
import BatchesReducer from './reducer_batches';
import FirmwareReducer from './reducer_firmware';

const rootReducer = combineReducers({
  products: ProductReducer,
  batches: BatchesReducer,
  firmwares: FirmwareReducer,
  form: formReducer
});

export default rootReducer;

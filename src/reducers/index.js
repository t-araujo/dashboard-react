import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ProductReducer from './reducer_product';
import BatchesReducer from './reducer_batches';
import FirmwareReducer from './reducer_firmware';
import SoftwareReducer from './reducer_software';
import DevicesReducer from './reducer_device';

const rootReducer = combineReducers({
  products: ProductReducer,
  batches: BatchesReducer,
  firmwares: FirmwareReducer,
  software: SoftwareReducer,
  devices: DevicesReducer,
  form: formReducer
});

export default rootReducer;

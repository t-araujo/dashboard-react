import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import BatchesReducer from './reducer_batches';
import DevicesReducer from './reducer_device';
import FirmwareReducer from './reducer_firmware';
import HardwareReducer from './reducer_hardware';
import SoftwareReducer from './reducer_software';

const rootReducer = combineReducers({
  batches: BatchesReducer,
  devices: DevicesReducer,
  firmwares: FirmwareReducer,
  form: formReducer,
  hardware: HardwareReducer,
  softwares: SoftwareReducer
});

export default rootReducer;

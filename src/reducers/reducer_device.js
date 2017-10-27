import { FETCH_DEVICES, FETCH_DEVICE, EDIT_DEVICE } from '../actions';
import { mapKeys } from 'lodash';

export default function(state = {}, action) {
 switch (action.type) {
    case FETCH_DEVICES:
      return mapKeys(action.payload.data, 'id');
    
    case FETCH_DEVICE:
      return { ...state, [action.payload.data.id]: action.payload.data };

    case EDIT_DEVICE:
      return { ...state, [action.payload.data.id]: action.payload.data };
      
    default:
      return state;
  }
}

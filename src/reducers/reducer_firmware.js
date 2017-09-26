// import the const we define in our actions
import { FETCH_FIRMWARES, FETCH_FIRMWARE, CREATE_FIRMWARE, EDIT_FIRMWARE } from '../actions';
import { mapKeys } from 'lodash';

export default function(state = {}, action) {
 switch (action.type) {
    case FETCH_FIRMWARES:
      return mapKeys(action.payload.data, 'id');

    case CREATE_FIRMWARE:
      return { ...state, [action.payload.data.id]: action.payload.data };

    case EDIT_FIRMWARE:
      return { ...state, [action.payload.data.id]: action.payload.data };

    default:
      return state;
  }
}

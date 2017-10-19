// import the const we define in our actions
import { FETCH_FIRMWARES, FETCH_FIRMWARE, CREATE_FIRMWARE, EDIT_FIRMWARE } from '../actions';
import { mapKeys } from 'lodash';

export default function(state = {}, action) {
 switch (action.type) {
    case FETCH_FIRMWARES:
    if (action.payload.data){
      const firmwares = action.payload.data.map(item => {
        item.settings = `${item.settings.major}.${item.settings.minor}`;
        return item;
      });
        return mapKeys(firmwares, 'id');
    } else {
      return { ...state }
    }

    case CREATE_FIRMWARE:
      return { ...state, [action.payload.data.id]: action.payload.data };

    case EDIT_FIRMWARE:
      return { ...state, [action.payload.data.id]: action.payload.data };

    default:
      return state;
  }
}

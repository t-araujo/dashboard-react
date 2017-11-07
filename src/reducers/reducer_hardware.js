// Import the const we define in our actions
import { CREATE_HARDWARE, EDIT_HARDWARE, FETCH_ALL_HARDWARE } from '../actions';
import { mapKeys } from 'lodash';

// Put the default state as an object
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_HARDWARE:
      return mapKeys(action.payload.data, 'id');
    case CREATE_HARDWARE:
      // Key interpolation
      return { ...state };
    case EDIT_HARDWARE:
    // Key interpolation
      return { ...state }; //, [action.payload.data.id]: action.payload.data

    // case DELETE_POST:
    // // key interpolation
    //   return omit(state, action.payload);

    default:
      return state;
  }
}

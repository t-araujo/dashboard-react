// import the const we define in our actions
import { FETCH_BATCHES, FETCH_BATCH, CREATE_BATCH, EDIT_BATCH } from '../actions';
import { mapKeys } from 'lodash';

export default function(state = {}, action) {
 switch (action.type) {
    case FETCH_BATCHES:
      return mapKeys(action.payload.data, 'id');

    case CREATE_BATCH:
      return { ...state, [action.payload.data.id]: action.payload.data };

    case FETCH_BATCH:
      return { ...state, [action.payload.data.id]: action.payload.data };

    case EDIT_BATCH:
      return { ...state, [action.payload.data.id]: action.payload.data };

    default:
      return state;
  }
}

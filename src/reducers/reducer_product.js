// import the const we define in our actions
import { FETCH_PRODUCTS, CREATE_PRODUCT } from '../actions';
import { mapKeys } from 'lodash';

// put the default state as an object
export default function(state = {}, action) {
  console.log(action)
 switch (action.type) {
    case FETCH_PRODUCTS:
      return mapKeys(action.payload.data, 'id');
    case CREATE_PRODUCT:
    // key interpolation
      return { ...state, [action.payload.data.id]: action.payload.data };
    // case DELETE_POST:
    // // key interpolation
    //   return omit(state, action.payload);

    default:
      return state;
  }
}

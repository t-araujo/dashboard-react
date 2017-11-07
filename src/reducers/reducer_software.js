import { EDIT_SOFTWARE, FETCH_ALL_SOFTWARE, FETCH_SOFTWARE } from '../actions';
import { mapKeys } from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_SOFTWARE:
      if (action.payload.data) {
        const software = action.payload.data.map(item => {
          return item;
        });

        return mapKeys(software, 'id');
      } else {
        return { ...state };
      }

    case FETCH_SOFTWARE:
      return { ...state, [action.payload.data.id]: action.payload.data };

    case EDIT_SOFTWARE:
      return { ...state, [action.payload.data.id]: action.payload.data };

    default:
      return state;
  }
}

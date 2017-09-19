import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';
export const CREATE_PRODUCT = 'create_product';
export const EDIT_PRODUCT = 'edit_product';

const ROOT_URL = `http://localhost:4000`;

export function fetchProducts() {
  const request = axios.get(`${ROOT_URL}/products`);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function createProduct(values, callback) {
  const request = axios.post(`${ROOT_URL}/products`, values)
    .then(() => callback());

  return dispatch => {
    request.then(data => {
      dispatch({ type: CREATE_PRODUCT, payload: request });
    });
  }
}

export function editProduct(values, callback) {
  const request = axios.patch(`${ROOT_URL}/products`, values)
    .then(() => callback());

  return {
    type: EDIT_PRODUCT,
    payload: request
  };
}

export function fetchProduct(id) {
  const request = axios.get(`${ROOT_URL}/products/${id}`);

  return {
    type: CREATE_PRODUCT,
    payload: request
  };
}

// export function deletePost(id, callback) {
//   const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
//     .then(() => callback());

//   // With react-thunk we can dispatch one action after that action is completed
//   return dispatch => {
//     request.then(data => {
//       dispatch({ type: DELETE_POST, payload: id });
//     });
//   };
//   // return {
//   //   type: DELETE_POST,
//   //   payload: id
//   // };
// };

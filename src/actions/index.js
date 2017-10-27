import axios from 'axios';

export const FETCH_PRODUCTS = 'fetch_products';
export const FETCH_PRODUCT = 'fetch_product';
export const CREATE_PRODUCT = 'create_product';
export const EDIT_PRODUCT = 'edit_product';
export const FETCH_BATCHES = 'fetch_batches';
export const FETCH_BATCH = 'fetch_batche';
export const CREATE_BATCH = 'create_batch';
export const EDIT_BATCH = 'edit_batch';
export const FETCH_FIRMWARES = 'fetch_firmwares';
export const FETCH_FIRMWARE = 'fetch_firmware';
export const CREATE_FIRMWARE = 'create_firmware';
export const EDIT_FIRMWARE = 'edit_firmware';
export const FETCH_ALL_SOFTWARE = 'fetch_all_software';
export const FETCH_SOFTWARE = 'fetch_software';
export const EDIT_SOFTWARE = 'edit_software';
export const EDIT_DEVICE = 'edit_device';
export const FETCH_DEVICE = 'fetch_device';
export const FETCH_DEVICES = 'fetch_devices';

// const ROOT_URL = `http://localhost:4000`;
const ROOT_URL = `http://192.168.3.89:4000`;

/**
 * 
 * Products
 * 
 */

export function fetchProducts() {
  const request = axios.get(`${ROOT_URL}/hardwares`);

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function createProduct(values, callback) {
  const request = axios.post(`${ROOT_URL}/hardwares`, values)
    .then(() => callback());

  return dispatch => {
    request.then(data => {
      dispatch({ type: CREATE_PRODUCT, payload: data });
    });
  }
}

export function editProduct(values, callback) {
  const request = axios.patch(`${ROOT_URL}/hardwares/${values.id}`, values)
    .then(() => callback());

  return {
    type: EDIT_PRODUCT,
    payload: request
  };
}

export function fetchProduct(id) {
  const request = axios.get(`${ROOT_URL}/hardwares/${id}`);

  return {
    type: FETCH_PRODUCT,
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


/**
 * 
 * Batches
 * 
 */

export function fetchBatches() {
  const request = axios.get(`${ROOT_URL}/batches`);

  return {
    type: FETCH_BATCHES,
    payload: request
  };
}

export function createBatch(values, callback) {
  const request = axios.post(`${ROOT_URL}/batches`, values)
    .then(() => callback());

  return dispatch => {
    request.then(data => {
      dispatch({ type: CREATE_BATCH, payload: data });
    });
  }
}

export function editBatch(values, callback) {
  const request = axios.patch(`${ROOT_URL}/batches/${values.id}`, values)
    .then(() => callback());

  return {
    type: EDIT_BATCH,
    payload: request
  };
}

export function fetchBatch(id) {
  const request = axios.get(`${ROOT_URL}/batches/${id}`);

  return {
    type: FETCH_BATCH,
    payload: request
  };
}

/**
 * 
 * Firmwares
 * 
 */

export function fetchFirmwares(id) {
  const request = axios.get(`${ROOT_URL}/firmwares`);

  return {
    type: FETCH_FIRMWARES,
    payload: request
  };
}

export function editFirmware(values, callback) {
  const request = axios.patch(`${ROOT_URL}/firmwares/${values.id}`, values)
    .then(() => callback());

  return {
    type: EDIT_BATCH,
    payload: request
  };
}

export function fetchFirmware(id) {
  const request = axios.get(`${ROOT_URL}/firmwares/${id}`);

  return {
    type: FETCH_BATCH,
    payload: request
  };
}

/**
 * 
 * Software
 * 
 */

export function fetchAllSoftware(id) {
  const request = axios.get(`${ROOT_URL}/software`);

  return {
    type: FETCH_ALL_SOFTWARE,
    payload: request
  };
}

export function editSoftware(values, callback) {
  const request = axios.patch(`${ROOT_URL}/software/${values.id}`, values)
    .then(() => callback());

  return {
    type: EDIT_SOFTWARE,
    payload: request
  };
}

export function fetchSoftware(id) {
  const request = axios.get(`${ROOT_URL}/software/${id}`);

  return {
    type: FETCH_SOFTWARE,
    payload: request
  };
}

export function fetchDevices(id) {
  const request = axios.get(`${ROOT_URL}/devices`);

  return {
    type: FETCH_DEVICES,
    payload: request
  };
}

export function editDevice(values, callback) {
  const request = axios.patch(`${ROOT_URL}/devices/${values.id}`, values)
    .then(() => callback());

  return {
    type: EDIT_DEVICE,
    payload: request
  };
}

export function fetchDevice(id) {
  const request = axios.get(`${ROOT_URL}/devices/${id}`);

  return {
    type: FETCH_DEVICE,
    payload: request
  };
}

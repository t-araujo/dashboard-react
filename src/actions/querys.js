// import fetch from 'isomorphic-fetch';
// import axios from 'axios';

// const ROOT_URL = `http://api.testing.displax.com:4000`;

// export function getFirmwareByParameters(graphQLParams) {
//   return fetch(`${ROOT_URL}/graphql`, {
//     body: JSON.stringify(graphQLParams),
//     headers: { 'Content-Type': 'application/json' },
//     method: 'post'
//   }).then(response => response.json());
// }

// export function getHardware(graphQLParams) {
//   return axios.post(`${ROOT_URL}/graphql`, JSON.stringify({"query": "{ allHardwares { edges { node { id, product, revision} }}}"  }));

//   return fetch(`${ROOT_URL}/graphql`, {
//     body: JSON.stringify(graphQLParams),
//     headers: { 'Content-Type': 'application/json' },
//     method: 'post'
//   }).then(response => response.json());
// }

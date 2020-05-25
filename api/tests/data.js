const { gql } = require('apollo-server-express');

exports.queries = {};

exports.mutations = {
  addArea: `
    mutation($name: String!, $id: String!, $zone: String!) {
      addArea(input: { name: $name, id: $id, zone: $zone }) {
        name
      }
    }
  `,
};

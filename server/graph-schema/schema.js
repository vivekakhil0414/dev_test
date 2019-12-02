const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require("graphql");
const axios = require("axios");
const baseUrl = "http://localhost:5000/";

const VisitorType = new GraphQLObjectType({
  name: "visitors",
  fields: () => ({
    device: { type: GraphQLString },
    ipv4: { type: GraphQLString },
    dateTime: { type: GraphQLString },
    _id: { type: GraphQLString },
    created_on: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    visitors: {
      type: new GraphQLList(VisitorType),
      args: {
        filter: { type: GraphQLString },
        limit: { type: GraphQLString },
        skip: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(
            `${baseUrl}visitors?filter=${args.filter}&limit=${args.limit}&skip=${args.skip}`
          )
          .then(res => {
            if (res.data && res.data.result) {
              return res.data.result;
            } else {
              return [];
            }
          })
          .catch(e => console.log(e));
      }
    },
    visitor: {
      type: VisitorType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`${baseUrl}visitors/${args.id}`)
          .then(res => {
            if (res.data && res.data.result) {
              return res.data.result;
            } else {
              return {};
            }
          })
          .catch(e => console.log(e));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

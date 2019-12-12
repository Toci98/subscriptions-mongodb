import { MongoClient, ObjectID } from "mongodb";
import { GraphQLServer } from 'graphql-yoga'
import * as uuid from 'uuid'

import "babel-polyfill"

const usr = "usuario1";
const pwd = "12345qwerty";
const url = "cluster1-zxbet.mongodb.net/test?retryWrites=true&w=majority";


/**
 * Connects to MongoDB Server and returns connected client
 * @param {string} usr MongoDB Server user
 * @param {string} pwd MongoDB Server pwd
 * @param {string} url MongoDB Server url
 */

const connectToDb = async function (usr, pwd, url) {
    const uri = `mongodb+srv://${usr}:${pwd}@${url}`;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    await client.connect();
    return client;
};


const runGraphQLServer = function (context) {
    const typeDefs = `

    type Team {
        _id: ID!
        name: String!
    }

    type Query {
        test: String!
    }

    type Mutation {
        addTeam(name: String!): Team!
    }

`


    const resolvers = {

        Query: {
            test: async (parent, args, ctx, info) => {
                return "hola";
            }
        },

        Mutation: {
            addTeam: async (parent, args, ctx, info) => {
                const { name } = args;
                const { client } = ctx;

                const db = client.db("football");
                const collection = db.collection("teams");

                if(await collection.findOne({name})){
                    throw new Error(`Team ${name} has already been added.`)
                }

                const result = await collection.insertOne({name});

                return {
                    _id: result.ops[0]._id,
                    name
                }
            }
        }
        
    }

    const server = new GraphQLServer({ typeDefs, resolvers, context });
    const options = {
        port: 8000
    };

    try {
        server.start(options, ({ port }) =>
            console.log(
                `Server started, listening on port ${port} for incoming requests.`
            )
        );
    } catch (e) {
        console.info(e);
        server.close();
    }

};


const runApp = async function () {
    const client = await connectToDb(usr, pwd, url);
    console.log("Connect to Mongo DB");
    try {
        runGraphQLServer({ client });
    } catch (e) {
        console.info(e);
        client.close();
    }
};

runApp();
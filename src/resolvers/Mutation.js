import "babel-polyfill"
import { ObjectID } from "mongodb";
import { PubSub } from "graphql-yoga";
const Mutation = {
    tellyou: (parent, args, ctx, info) => {
        const {_id, value} = args;
        const {pubsub, a} = ctx;

        pubsub.publish(
            _id, 
        {
            tellme: value
        }
        )
        return value;
    },

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
    },

    addMatch: async (parent, args, ctx, info) => {
        const { hometeam, visitor, date, scoreboard, state} = args;
        const { client } = ctx;

        const db = client.db("football");
        const collection = db.collection("matches");
        const collection2 = db.collection("teams");

        if(! await collection2.findOne({name: hometeam})){
            throw new Error(`Local team doesn't exist.`)
        }

        if(! await collection2.findOne({name: visitor})){
            throw new Error(`Visitor team doesn't exist.`)
        }

        if(hometeam === visitor){
            throw new Error(`The teams can't be the same`)
        }

        const result = await collection.insertOne({hometeam, visitor, date, scoreboard, state});
        
        return {
            _id: result.ops[0]._id,
            hometeam,
            visitor,
            date,
            scoreboard,
            state
        }
    },

    updateScore: async (parent, args, ctx, info) => {
        const { _id, newScore } = args;
        const { client, pubsub } = ctx;


        const db = client.db("football");
        const collection = db.collection("matches");

        const result2 = await collection.findOne({_id: ObjectID(_id)})
        if(result2.state !== 1){
            throw new Error(`The match hasn't started or has already finished.`)
        }


        const result = await collection.findOneAndUpdate({ _id: ObjectID(_id)}, { $set: {scoreboard: newScore}}, {returnOriginal: false});

        pubsub.publish(
            _id, 
        {
            subScore: result.value,

        }
        )

        pubsub.publish(
            result.value.hometeam, 
        {
            subTeamScore: result.value,

        }
        )

        pubsub.publish(
            result.value.visitor, 
        {
            subTeamScore: result.value,

        }
        )

        
        

        return result.value;
    },

    updateState: async (parent, args, ctx, info) => {
        const { _id, newStatus } = args;
        const { client, pubsub } = ctx;

        const db = client.db("football");
        const collection = db.collection("matches");

        const look = await collection.findOne({ "_id": ObjectID(_id)});

        if(newStatus !== 1 ){
            if(newStatus !== 2){
            throw new Error(`Incorrect value`)
            }
        }

        if(look.state === 1 && newStatus === 1){
            throw new Error(`Match has already started.`)
        }

        if(look.state === 2 && newStatus === 2){
            throw new Error(`Match has already finished.`)
        }

        if(look.state === 2 && newStatus === 1){
            throw new Error(`Match has already finished.`)
        }

        if(look.state === 0 && newStatus === 2){
            throw new Error(`Match hasn't started yet.`)
        }

        const result = await collection.findOneAndUpdate({ "_id": ObjectID(_id)}, { $set: {"state": newStatus}}, {returnOriginal: false});

        pubsub.publish(
            _id, 
        {
            subState: result.value
        }
        )

        pubsub.publish(
            result.value.hometeam, 
        {
            subTeamState: result.value
        }
        )

        pubsub.publish(
            result.value.visitor, 
        {
            subTeamState: result.value
        }
        )

        return result.value;
    }
}

export {Mutation as default}
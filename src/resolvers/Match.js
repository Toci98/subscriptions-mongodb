import 'babel-polyfill'
const Match = {
    hometeam: async (parent, args, ctx, info) => {
        const hometeam = parent.hometeam;
        const { client } = ctx;

        const db = client.db("football");
        const collection = db.collection("teams");

        const result = await collection.findOne({name: hometeam});
        return result;
    },

    visitor: async (parent, args, ctx, info) => {
        const visitor = parent.visitor;
        const { client } = ctx;

        const db = client.db("football");
        const collection = db.collection("teams");

        const result = await collection.findOne({name: visitor});
        return result;
    }
}

export {Match as default}
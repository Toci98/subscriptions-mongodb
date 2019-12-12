import "babel-polyfill"
const Query = {
    test: async (parent, args, ctx, info) => {
        return "hola";
    }
}

export {Query as default}
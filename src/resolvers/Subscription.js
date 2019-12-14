const Subscription = {
    tellme: {
        subscribe(parent, args, ctx, info){
            const {_id} = args;
            const {pubsub} = ctx;
            return pubsub.asyncIterator(_id)
        }, 

    },

    subScore: {
        subscribe(parent, args, ctx, info){
            const {_id} = args;
            const {pubsub} = ctx;
            return pubsub.asyncIterator(_id)
        }, 

    },

    subState: {
        subscribe(parent, args, ctx, info){
            const {_id} = args;
            const {pubsub} = ctx;
            return pubsub.asyncIterator(_id)
        }, 

    },

    subTeamScore: {
        subscribe(parent, args, ctx, info){
            const {name} = args;
            const {pubsub} = ctx;
            return pubsub.asyncIterator(name)
        }, 

    },

    subTeamState: {
        subscribe(parent, args, ctx, info){
            const {name} = args;
            const {pubsub} = ctx;
            return pubsub.asyncIterator(name)
        }, 

    },

};

export {Subscription as default}
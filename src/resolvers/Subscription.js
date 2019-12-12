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

    subHometeamScore: {
        subscribe(parent, args, ctx, info){
            const {_id} = args;
            const {pubsub} = ctx;
            return pubsub.asyncIterator(_id)
        }, 

    },

    subVisitorScore: {
        subscribe(parent, args, ctx, info){
            const {_id} = args;
            const {pubsub} = ctx;
            return pubsub.asyncIterator(_id)
        }, 

    },

    subHometeamState: {
        subscribe(parent, args, ctx, info){
            const {_id} = args;
            const {pubsub} = ctx;
            return pubsub.asyncIterator(_id)
        }, 

    },

    subVisitorState: {
        subscribe(parent, args, ctx, info){
            const {_id} = args;
            const {pubsub} = ctx;
            return pubsub.asyncIterator(_id)
        }, 

    }
};

export {Subscription as default}
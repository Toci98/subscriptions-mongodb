# Subscriptions with MongoDB

## Install

```js
npm install
```

## Run

```js
npm start
```

## Requests

### Match

```
tpye Match {
       _id: ID!
       hometeam: Team!
       visitor: Team!
       scoreboard: String!
       date: String!
       state: Int!
}
```
+ _id: MongoDB auto-generated id.
+ hometeam: local team.
+ visitor: visitor team.
+ scoreboard: score in the format hometeam-visitor (1-0)
+ date: date in the format DD/MM/YYYY.
+ state: current state of the match: 0 (match has not started), 1 (match has started), 2 (match has finished)

### Team

```
type Team {
       _id: ID!
       name: String!
}
```

+ _id: MongoDB auto-generated id.
+ name: name of the team






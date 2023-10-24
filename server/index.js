const express = require('express')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const axios = require("axios")
const bodyParser = require('body-parser')
const cors = require('cors')



const startFunc = async () => {

    const app = express();
    const server = new ApolloServer({
        typeDefs: `
        type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
        }

        type Todo {
            id: ID!,
            title: String!,
            completed: Boolean
            user:User
        }
        
        type Query {
            getTodos: [Todo]
            getTodo(id: ID!): Todo
            getAllUsers: [User]
            getUser(id: ID!): User
        }
        `,
        resolvers: {
            Todo: {
                user: async (todo) => {
                    console.log('todo in user ',todo)
                    const { data: res_data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)
                    console.log('data user3', res_data)
                    return res_data
                }
            },
            Query:{
                getTodos: async () => {
                    const { data: res_data } = await axios.get('https://jsonplaceholder.typicode.com/todos/')
                    console.log('data ', res_data)
                    return res_data
                },
                getAllUsers: async () => {
                    const { data: res_data } = await axios.get('https://jsonplaceholder.typicode.com/users/')
                    console.log('data ', res_data)
                    return res_data
                },
                getUser: async (parent, {id}) => {
                    const { data: res_data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
                    console.log('data user ', res_data)
                    return res_data
                },
                getTodo: async (parent, {id}) => {
                    const { data: res_data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
                    console.log('data user2', res_data)
                    return res_data
                }

            }
        }
    })

    app.use(bodyParser.json());
    app.use(cors())

    await server.start()

    app.use('/graphql', expressMiddleware(server))

    app.listen(8000,() => console.log('Server started at port 8000'))

}

startFunc()
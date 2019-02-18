const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID, GraphQLBoolean,
    GraphQLInputObjectType, GraphQLNonNull, GraphQLEnumType } = require('graphql')

const appointmentType = new GraphQLObjectType({
    name: "appointment",
    fields: () => ({
        _id: { type: GraphQLID },
        patient: { type: GraphQLString },
        doctor: { type: GraphQLString },
        date: {
            type: GraphQLString,
            resolve(parent) {
                return parent.date.toLocaleDateString()
            }
        },
        accepted: { type: GraphQLBoolean }
    })
})

const doctorType = new GraphQLObjectType({
    name: 'doctor',
    fields: () => ({
        username: { type: GraphQLString },
        onHoldRequests: { type: new GraphQLList(appointmentType) },
        appointmentAvailable: { type: new GraphQLList(appointmentType) }
    })
})

const patientType = new GraphQLObjectType({
    name: "patient",
    fields: () => ({
        username: { type: GraphQLString },
        openRequests: { type: new GraphQLList(appointmentType) }
    })
})

const responseType = new GraphQLObjectType({
    name: "response",
    fields: () => ({
        done: { type: GraphQLBoolean },
        reason: { type: GraphQLString }
    })
})

const userInput = new GraphQLInputObjectType({
    name: "userCreate",
    fields: () => ({
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        role: {
            type: new GraphQLNonNull(new GraphQLEnumType({
                name: "role",
                values: {
                    patient: { value: "patient" },
                    doctor: { value: "doctor" }
                }
            }))
        }
    })
})

const loginInput = new GraphQLInputObjectType({
    name: "userLogin",
    fields: () => ({
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
    })
})

module.exports = { appointmentType, patientType, doctorType, responseType, userInput, loginInput }
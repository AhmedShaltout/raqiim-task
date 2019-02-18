const { authGraphCreateUser, authGraphLogin } = require('../graphql/auth-graphql')
const { appointmentGraphAvailableApointments, appointmentGraphCreateAppointment, appointmentGraphReserveAppointment,
    appointmentGraphAppointmentRequests,appointmentGraphCancelAppointment, appointmentGraphAcceptAppointment,
    appointmentGraphRejectAppointment } = require('../graphql/appointment-graph')
const { GraphQLObjectType, GraphQLSchema } = require('graphql')

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        login: authGraphLogin,
        availableAppointments: appointmentGraphAvailableApointments,
        myOpenAppointments: appointmentGraphAppointmentRequests,
    }
})

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signUp: authGraphCreateUser,
        createAppointment: appointmentGraphCreateAppointment,
        reserveAppointment: appointmentGraphReserveAppointment,
        cancelAppointment: appointmentGraphCancelAppointment,
        acceptAppointment: appointmentGraphAcceptAppointment,
        rejectAppointment: appointmentGraphRejectAppointment
    }
})

module.exports = new GraphQLSchema({ query, mutation })
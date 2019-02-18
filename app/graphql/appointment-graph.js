const { responseType, appointmentType } = require('./graphql-types')
const { userHandellerAvailableAppointments, userHandellerCreateAppointment, userHandellerReserveAppointment,
    userHandellerGetRequests, userHandellerCancelAppointment, userHandellerRejectAppointment,
    userHandellerAcceptAppointment } = require('../handellers/user-handeller')
const { GraphQLList, GraphQLString, GraphQLNonNull } = require('graphql')

const appointmentGraphAvailableApointments = {
    type: new GraphQLList(appointmentType),
    resolve() {
        return userHandellerAvailableAppointments()
    }
}

const appointmentGraphCreateAppointment = {
    type: responseType,
    args: { date: { type: GraphQLNonNull(GraphQLString), description: "yyyy/mm/dd" } },
    resolve(_, args, { req }) {
        return userHandellerCreateAppointment({ ...args, doctor: req.user })
    }
}

const appointmentGraphReserveAppointment = {
    type: responseType,
    args: { appointmentId: { type: new GraphQLNonNull(GraphQLString) } },
    resolve(_, args, { req }) {
        return userHandellerReserveAppointment(args.appointmentId, req.user)
    }
}

const appointmentGraphAppointmentRequests = {
    type: new GraphQLList(appointmentType),
    resolve(_, __, { req }) {
        return userHandellerGetRequests(req.user)
    }
}

const appointmentGraphCancelAppointment = {
    type: responseType,
    args: { appointmentId: { type: new GraphQLNonNull(GraphQLString) } },
    resolve(_, args, { req }) {
        return userHandellerCancelAppointment(args.appointmentId, req.user)
    }
}

const appointmentGraphAcceptAppointment = {
    type: responseType,
    args: { appointmentId: { type: new GraphQLNonNull(GraphQLString) } },
    resolve(_, args, { req }) {
        return userHandellerAcceptAppointment(args.appointmentId, req.user)
    }
}

const appointmentGraphRejectAppointment = {
    type: responseType,
    args: { appointmentId: { type: new GraphQLNonNull(GraphQLString) } },
    resolve(_, args, { req }) {
        return userHandellerRejectAppointment(args.appointmentId, req.user)
    }
}

module.exports = {
    appointmentGraphAvailableApointments, appointmentGraphCreateAppointment, appointmentGraphReserveAppointment,
    appointmentGraphAppointmentRequests, appointmentGraphCancelAppointment, appointmentGraphAcceptAppointment,
    appointmentGraphRejectAppointment
}
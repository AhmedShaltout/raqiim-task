module.exports = {
    GRAPHQL: "/",
    OPERATIONS: {
        GENERAL: ['login', 'signUp'],
        AUTHORIZED: {
            patient: ['availableAppointments', 'cancelReservation', 'myOpenAppointments',
                'reserveAppointment', 'cancelAppointment'],
            doctor: ['createAppointment', 'myOpenAppointments', 'acceptAppointment', 'rejectAppointment']
        }
    },
    STATUS: { BAD_REQUEST: 400, METHOD_NOT_ALLOWED: 405, UN_AUTHORIZED: 401 },
    MONGO_ERRORS: { DUPLICATED: 11000 }
}
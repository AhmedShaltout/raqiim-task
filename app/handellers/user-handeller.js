const { hashSync, genSaltSync, compareSync } = require('bcrypt')
const { userModelCreateUser, userModelGetUser, userModelUserExists } = require('../models/user-model')
const { appointmentModelCreateAppointment, appointmentModelAcceptRequest,
    appointmentModelRejectAppointment, appointmentModelAvailableAppointments, appointmentModelReserveAppointment,
    appointmentModelGetMyAppointments } = require('../models/appointment-model')
const { MSG_USER_CREATED, MSG_SERVER_ERROR, MSG_USER_EXISTS } = require('../utils/respond_messages')
const { MONGO_ERRORS } = require('../utils/constants')

const userHandellerLoginUser = async (username, loginPassword) =>
    compareSync(loginPassword, (await userModelGetUser(username)).password) ? username : null

const userHandellerCreateUser = async (user) => {
    let response = { done: false }
    try {
        user.password = hashSync(user.password, genSaltSync())
        let { username } = await userModelCreateUser(user)
        response.reason = MSG_USER_CREATED(username)
        response.done = true
    } catch (error) {
        if (error.code == MONGO_ERRORS.DUPLICATED) response.reason = MSG_USER_EXISTS
        else response.reason = MSG_SERVER_ERROR
    } finally { return response }
}

const userHandellerUserCount = userModelUserExists

const userHandellerCreateAppointment = async (appointment) => {
    let response = { done: false }
    try {
        let { _id } = await appointmentModelCreateAppointment(appointment)
        response.reason = "inserted"
    } catch (error) {
        if (error.code == MONGO_ERRORS.DUPLICATED) response.reason = "duplicated."
        else response.reason = "check the date format."
    }
    finally { return response }
}

const userHandellerAcceptAppointment = async (appointmentId, username) => {
    let { nModified } = await appointmentModelAcceptRequest(appointmentId, username)
    return nModified == 1 ?
        ({ done: true, reason: "appointment accepted." }) :
        ({ done: false, reason: "can't accept appointment." })
}

const userHandellerRejectAppointment = async (appointmentId, username) => {
    let(nModified) = await appointmentModelRejectAppointment(appointmentId, username)
    return nModified == 1 ?
        ({ done: true, reason: "appointment rejected." }) :
        ({ done: false, reason: "can't reject appointment." })
}

const userHandellerCancelAppointment = async (appointmentId, username) => {
    let {nModified} = await appointmentModelRejectAppointment(appointmentId, username)
    return nModified == 1 ?
        ({ done: true, reason: "appointment canceled." }) :
        ({ done: false, reason: "can't cancel appointment." })
}

const userHandellerAvailableAppointments = appointmentModelAvailableAppointments

const userHandellerReserveAppointment = async (appointmentId, username) => {
    let { nModified } = await appointmentModelReserveAppointment(appointmentId, username)
    return nModified == 1 ?
        ({ done: true, reason: "reserved successfully." }) :
        ({ done: false, reason: "appointment not available." })
}
const userHandellerGetRequests = appointmentModelGetMyAppointments

const userHandellerGetUserRole = userModelGetUser

module.exports = {
    userHandellerLoginUser, userHandellerUserCount, userHandellerCreateUser, userHandellerRejectAppointment,
    userHandellerCreateAppointment, userHandellerAcceptAppointment, userHandellerCancelAppointment,
    userHandellerAvailableAppointments, userHandellerReserveAppointment, userHandellerGetRequests,
    userHandellerGetUserRole
}
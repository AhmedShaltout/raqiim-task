const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    doctor: {
        type: String,
        index: true,
        required: true
    },
    patient: {
        type: String,
        index: true
    },
    date: {
        type: Date,
        unique: true,
    },
    accepted: {
        type: Boolean,
        default: false,
    }
})

const APPOINTMENT = mongoose.model('appointments', appointmentSchema)

const appointmentModelCreateAppointment = (appointment) =>
    new APPOINTMENT(appointment).save()

const appointmentModelAcceptRequest = (appointmentId, username) =>
    APPOINTMENT.updateOne({
        _id: appointmentId, doctor: username,
        patient: { $exists: true }, accepted: false
    }, { $set: { accepted: true } })

const appointmentModelRejectAppointment = (appointmentId, username) =>
    APPOINTMENT.updateOne({
        _id: appointmentId, accepted: false,
        $or: [{ patient: username }, { doctor: username }]
    }, { $unset: { patient: false } })

const appointmentModelAvailableAppointments = () =>
    APPOINTMENT.find({ patient: { $exists: false } })

const appointmentModelReserveAppointment = (appointmentId, username) =>
    APPOINTMENT.updateOne({ _id: appointmentId, patient: { $exists: false } }, { $set: { patient: username } })

const appointmentModelGetMyAppointments = (username) =>
    APPOINTMENT.find({
        $or: [{ patient: username },
        { doctor: username, patient: { $exists: false } }], accepted: false
    })

module.exports = {
    appointmentModelCreateAppointment, appointmentModelAcceptRequest, appointmentModelReserveAppointment,
    appointmentModelRejectAppointment, appointmentModelAvailableAppointments, appointmentModelGetMyAppointments
}
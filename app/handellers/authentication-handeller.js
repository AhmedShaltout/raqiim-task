const { STATUS, OPERATIONS } = require('../utils/constants')
const { userHandellerGetUserRole } = require('./user-handeller')

const checkAuthorization = async (user, operation) => {
    try {
        let { role } = await userHandellerGetUserRole(user)
        return OPERATIONS.AUTHORIZED[role].includes(operation) ? true : false
    } catch (error) {
        console.log(error.message)
        return false
    }
}

const checkAuthentication = async (req, res, next) => {
    let operation = req.body ? req.body.operationName : null
    if (!operation) next()
    else if (OPERATIONS.GENERAL.includes(operation)) next()
    else
        try {
            if (!req.isAuthenticated()) res.sendStatus(STATUS.UN_AUTHORIZED)
            else if (await checkAuthorization(req.user, operation)) next()
            else res.sendStatus(STATUS.METHOD_NOT_ALLOWED)
        } catch (error) {
            console.error(error.message)
        }
}

module.exports = { checkAuthentication }
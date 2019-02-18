const { responseType, userInput, loginInput } = require('../graphql/graphql-types')
const { userHandellerCreateUser } = require('../handellers/user-handeller')
const { MSG_WELCOME, MSG_USERNAME_PASSWORD } = require('../utils/respond_messages')
const passport = require('passport')

const authGraphCreateUser = {
    type: responseType,
    args: { user: { type: userInput } },
    resolve(_, args) {
        return userHandellerCreateUser(args.user)
    }
}
const authGraphLogin = {
    type: responseType,
    args: { user: { type: loginInput } },
    resolve(_, args, { req }) {
        return new Promise((resolve) => {
            try {
                req.body.username = args.user.username
                req.body.password = args.user.password
                passport.authenticate('local', (error, user) => {
                    if (error || !user) resolve({ done: false, reason: MSG_USERNAME_PASSWORD })
                    else req.login(user, () => resolve({ done: true, reason: MSG_WELCOME(user) }))
                })(req)
            } catch (error) {
                resolve({ done: false, reson: error.message })
            }
        })
    }
}

module.exports = { authGraphCreateUser, authGraphLogin }
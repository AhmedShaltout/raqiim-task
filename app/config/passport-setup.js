const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { userHandellerUserCount, userHandellerLoginUser } = require('../handellers/user-handeller')

passport.use('local', new LocalStrategy(
	async function (username, password, done) {
		try {
			let user = await userHandellerLoginUser(username, password)
			user ? done(null, user) : done(null, false)
		} catch (error) {
			done(error, false)
		}
	})
)

passport.serializeUser((user, done) => done(null, user))


passport.deserializeUser(async (username, done) => {
	try {
		let count = await userHandellerUserCount(username)
		if (count > 0) done(null, username)
		else done(null, null)
	} catch (error) { done(error, null) }
})
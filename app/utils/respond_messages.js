module.exports = {
    MSG_USER_EXISTS: "User with the same username already exists.",
    MSG_USER_CREATED: (name) => name.concat(" created successfully."),
    MSG_SERVER_ERROR: "INTERNAL SERVER ERROR.",
    MSG_USERNAME_PASSWORD: "username or password not correct.",
    MSG_WELCOME: (name) => "welcome ".concat(name).concat('.'),
}
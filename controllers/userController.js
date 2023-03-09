exports.userSignup = async (req, res, next) => {
    res.render('signup', {
        title: 'Sign Up',
    })
}

exports.userLogin = async (req, res,next) => {
    res.render('login', {
        title: 'Login',
    })
}
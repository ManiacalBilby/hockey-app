const express = require('express')
const router = express.Router({mergeParams: true})
const User = require('../db/models/User')

router.get('/', (request, response) => {
    const userId = request.params.userId

    User.findById(userId)
    .then((user) => {
        response.render('rinks/index', {
            userFullName: `${user.firstName} ${user.lastName}`,
            userId: user._id,
            rinks: user.rinks,
            pageTitle: 'Rinks'
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

module.exports = router
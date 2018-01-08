const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../db/models/User')

router.get('/:sticktimeId', (request, response) => {
    const userId = request.params.userId
    const rinkId = request.params.rinkId
    const sticktimeId = request.params.sticktimeId

User.findById(userId)
    .then((user) => {
        const rink = user.rinks.id(rinkId)
        const sticktime = rink.sticktimes.id(sticktimeId)

        response.render('sticktimes/show', {
            userId,
            rink,
            sticktime,
            pageTitle: 'Sticktime'
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

module.exports = router
const express = require('express')
const router = express.Router({ mergeParams: true })
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

router.get('/new', (request, response) => {
    const userId = request.params.userId

    response.render('rinks/new', {
        userId,
        pageTitle: 'New Rink'
    })
})

router.get('/:rinkId', (request, response) => {
    const userId = request.params.userId
    const rinkId = request.params.rinkId

    User.findById(userId)
        .then((user) => {
            const rink = user.rinks.id(rinkId)
            response.render('rinks/show', {
                userId,
                rink,
                pageTitle: 'Rink'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.post('/', (request, response) => {
    const userId = request.params.userId
    const newRink = request.body

    User.findById(userId)
    .then((user) => {
        user.rinks.push(newRink)
        return user.save()
    })
    .then(() => {
        response.redirect(`/users/${userId}/rinks`)
    })
    .catch((error) => {
        console.log(error)
    })
})

module.exports = router
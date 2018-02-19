const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../db/models/User')
const Rink = require('../db/models/Rink')

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

router.get('/:rinkId/edit', (request, response) => {
    const userId = request.params.userId
    const rinkId = request.params.rinkId

    User.findById(userId)
        .then((user) => {
            const rink = user.rinks.id(rinkId)
            response.render('rinks/edit', {
                userId,
                rink,
                pageTitle: 'Update Rink'
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

router.put('/:rinkId', (request, response) => {
    const userId = request.params.userId
    const rinkId = request.params.rinkId
    const updatedRinkInfo = request.body
    console.log(updatedRinkInfo)

    User.findById(userId)
    .then((user) => {
        let originalRinkInfo = user.rinks.id(rinkId)
        originalRinkInfo.name = updatedRinkInfo.name
        originalRinkInfo.photoUrl = updatedRinkInfo.photoUrl
        originalRinkInfo.phone = updatedRinkInfo.phone
        originalRinkInfo.location = updatedRinkInfo.location
        return user.save()
    })
        .then(() => {
            response.redirect(`/users/${userId}/rinks/${rinkId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})



module.exports = router
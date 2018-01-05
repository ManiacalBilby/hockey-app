require('dotenv').config()
const User = require('./models/User')
const Rink = require('./models/Rink')
const Sticktime = require('./models/Sticktime')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('open', () => {
    console.log('Mongoose has connected to MongoDB')
})

mongoose.connection.on('error', (error) => {
    console.error(`MongoDB connection error! ${error}`)
    process.exit(-1)
})



User.remove({}).then(() => {
    const davidHanson = new User ({
        firstName: 'David',
        lastName: 'Hanson',
        photoUrl: '../img/davidHanson.jpg'
    })

    const centerIce = new Rink({
        name: 'Center Ice Arena',
        photoUrl: '../img/centerIce.jpg',
        phone: '404-549-8425'
    })

    const mondaySticktime = new Sticktime({
        dayOfWeek: 'Monday',
        time: '12:00 PM',
        price: 10
    })
    centerIce.sticktimes.push(mondaySticktime)

    davidHanson.rinks.push(centerIce)

    return davidHanson.save()
})
.then(() => {
    mongoose.connection.close()
    console.log(`Finished seeding database...
    
    Disconnected from MongoDB
    `)
})
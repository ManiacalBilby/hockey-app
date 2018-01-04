require('dotenv').config()
const User = require('./models/User')
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
        lastName: 'Hanson'
    })
    return davidHanson.save()
})
.then(() => {
    mongoose.connection.close()
    console.log(`Finished seeding database...
    
    Disconnected from MongoDB
    `)
})
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
    const jackHanson = new User ({
        firstName: 'Jack',
        lastName: 'Hanson',
        photoUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTM0Y2FmYTktYWU5Mi00ZDBmLWIxZTMtZTUzNzAwOWMxOTQxXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_UY317_CR122,0,214,317_AL_.jpg'
    })

    const centerIce = new Rink({
        name: 'Center Ice Arena',
        photoUrl: '/images/centerIce.jpg',
        phone: '404-549-8425'
    })

    const mariettaIceCenter = new Rink({
        name: 'Marietta Ice Center',
        photoUrl: 'https://pbs.twimg.com/profile_images/729418036596314112/EGcshrqo_400x400.jpg',
        phone: '770-509-5067'
    })

    const mondaySticktime = new Sticktime({
        dayOfWeek: 'Monday',
        time: '12:00 PM',
        price: 10
    })
    centerIce.sticktimes.push(mondaySticktime)

    const wednesdaySticktime = new Sticktime({
        dayOfWeek: 'Wednesday',
        time: '2:00 PM',
        price: 15
    })
    mariettaIceCenter.sticktimes.push(wednesdaySticktime)

    jackHanson.rinks.push(centerIce, mariettaIceCenter)

    return jackHanson.save()
})
.then(() => {
    const steveHanson = new User ({
        firstName: 'Steve',
        lastName: 'Hanson',
        photoUrl: 'https://i.pinimg.com/236x/8c/1d/b6/8c1db64a2152209b04a611d623cc856b--slap-shot-buddy-holly-glasses.jpg'
    })

    const mariettaIceCenter = new Rink({
        name: 'Marietta Ice Center',
        photoUrl: 'https://pbs.twimg.com/profile_images/729418036596314112/EGcshrqo_400x400.jpg',
        phone: '770-509-5067'
    })

    const wednesdaySticktime = new Sticktime({
        dayOfWeek: 'Wednesday',
        time: '2:00 PM',
        price: 15
    })
    mariettaIceCenter.sticktimes.push(wednesdaySticktime)

    steveHanson.rinks.push(mariettaIceCenter)

    return steveHanson.save()
})
.then(() => {
    mongoose.connection.close()
    console.log(`Finished seeding database...
    
    Disconnected from MongoDB
    `)
})
const express = require('express')
const app = express()
const path = require('path');
const engine = require('ejs-mate')
const mongoose = require('mongoose');
const User = require('./model/user')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/user_demo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(data =>{
    console.log('database connected.....')
}).catch(e =>{
    console.log('Something went wrong......')
})



var arr = []

app.set('view engine', 'ejs')
app.engine('ejs', engine)
app.set('/views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))


app.get('/', async (req, res) =>{
    const user = await User.find({})
    res.render('index', {user: user});
})


app.get('/user/new', (req, res) =>{
    res.render('new')
});

app.post('/user', async (req, res) =>{
    const { name, email, contact, age } = req.body
    const user = await new User({name, email, contact, age})
    await user.save()
    res.redirect('/')
})

app.get('/user/:id', async (req, res) =>{
    const { id } = req.params
    const user = await User.findById({_id: id})
    res.render('show', {user: user})
})

app.get('/user/:id/edit', async (req,res) =>{
    const { id } = req.params;
    const user = await User.findById({_id: id})
    res.render('edit', {user: user})
})

app.put('/user/:id', async (req, res) =>{
    const { id } = req.params;
    const user = await User.findByIdAndUpdate( id, req.body, {runvalidators: true, new:true})
    arr.push(user)
    res.redirect('/')
})

app.get('/list', (req, res) =>{
    res.render('list', {arr: arr})
})

app.delete('/user/:id', async (req, res) =>{
    const { id  } = req.params;
    const user = await User.findByIdAndDelete({_id: id})
    res.redirect('/')
})

app.listen(3000, (req, res) =>{
    console.log('server is listening......')
})
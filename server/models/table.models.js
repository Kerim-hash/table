const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TableSchema = new Schema ({
    date: {type: Date,  require: true},
    name: {type: String,  require: true},
    distance: {type: Number,  require: true},
    quantity: {type: Number,  require: true},
})

module.exports = mongoose.model('Table', TableSchema)
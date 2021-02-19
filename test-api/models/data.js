const mongoose = require('mongoose')
const validate = require('mongoose-validator')
const Schema = mongoose.Schema

var titleValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 50],
    message: 'title ควรอยู่ระหว่าง 1 ถึง 50 อักขระ',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'ควรมีอักขระที่เป็นตัวอักษรและตัวเลขเท่านั้น',
  }),
]
var descriptionValidator = [
  validate({
    validator: 'isLength',
    arguments: [1, 500],
    message: 'description ควรอยู่ระหว่าง 1 ถึง 500 อักขระ',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'ควรมีอักขระที่เป็นตัวอักษรและตัวเลขเท่านั้น',
  }),
]


const dataSchema = new Schema({
  title: { type: String, required: true, validate: titleValidator },
  description: { type: String, required: true, validate: descriptionValidator },
  imageurl:{ type: String, required: true },
})
const dataModel = mongoose.model('post', dataSchema)
module.exports = dataModel
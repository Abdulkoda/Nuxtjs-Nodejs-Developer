const express = require('express')
const router = require("express").Router();
const Data = require('../models/data')

router.post('/post', async (req, res) => {
    const payload = req.body
    const data = new Data(payload)
    try {
        const result = await data.save();
        console.log(result);
        res.json({ status: 200,success: true, })
    } catch (err) {
        console.log(err.message)
        res.json(err.message)
    }
  })

  module.exports = router;
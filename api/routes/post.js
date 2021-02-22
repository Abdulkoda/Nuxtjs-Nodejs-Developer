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
  });
  // GET มาทั้งหมด
    router.get("/data", (req, res) => {
        Data.find().exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
        });
    });

    // GET 1
    router.get("/get/:_id", (req, res) => {
      Data.findById(req.params._id).exec((err, data) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(data);
      });
    });

    // PUT (update current data)
    router.put("/update/:_id", (req, res) => {
     Data.findByIdAndUpdate(req.params._id, req.body, (err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send("อัพเดทข้อมูลเรียบร้อย");
    });
  });
  // DELETE (delete 1 data)
    router.delete("/delete/:_id", (req, res) => {
    Data.findByIdAndDelete(req.params._id, (err, data) => {
      if (err) return res.status(400).send(err);
      res.status(200).send("ลบข้อมูลเรียบร้อย");
    });
  });

  module.exports = router;
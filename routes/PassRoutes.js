const express = require('express');
const router = express.Router();
const axios = require('axios')
const auth = require('../middleware/auth')

const Pass = require('../models/Pass')



// get all passes if teacher, or just yours if student
router.get('/', auth(), async(req, res) => {
    try {

        console.log("hit: get passes")

        const {requester} = res.locals
        var passes = []

        if (requester.role == "teacher") {
            passes = await Pass.find()
        } else if (requester.role == "student") {
            passes = await Pass.find({student_name: requester.name})
        }

        return res.json({passes})

    } catch (error) {
        console.log(error)
    }
})



// create a pass
router.post('/create', auth(), async(req, res) => {
    try {

        console.log("hit: create pass")

        const {requester} = res.locals
        const form = req.body
        var newPass = {}

        if (requester.role == "teacher") {
            newPass = new Pass(form)
        } else if (requester.role == "student") {
            newPass = new Pass({
                ...form,
                student_name: requester.name,
                status: -1,
            })
        }

        newPass.save()
        return res.json(newPass)

    } catch (error) {
        console.log(error)
    }
})


// edit a pass
router.put('/edit', auth(), async(req, res) => {
    try {

        console.log("hit: edit pass")

        const {requester} = res.locals
        const form = req.body

        if (requester.role == "teacher") {
            var editedPass = await Pass.findOne({_id: form._id})

            for (const [key, value] of Object.entries(form)) {
                editedPass[key] = value
            }
            
            editedPass.save()
            return res.json(editedPass)
        }
        
        return res.send({})

    } catch (error) {
        console.log(error)
    }
})



//delete pass
router.delete('/delete/:id', auth(), async(req, res) => {
    try {

        console.log("hit: delete pass")

        const {requester} = res.locals

        if (requester.role == "teacher") {
            var deletedPass = await Pass.findOneAndDelete({_id: req.params.id})
            return res.json(deletedPass)
        }

        return res.json({})

    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
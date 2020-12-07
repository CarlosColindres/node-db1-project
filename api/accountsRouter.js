const express = require('express')

const accountsDb = require('./accounts-model')

const router = express.Router()

const validateId = async (req, res, next) => {
    const {id} = req.params

    try {
        const data = await accountsDb.getById(id)
        if(!data) {
            res.status(404).json({message: 'id not fou nd'})
        }
        next()
    } catch(err) {
        res.status(404).json({message: err.message})
    }

}

const validatePost = (req, res, next) => {
    const {name, budget} = req.body

    if(!name || !budget) {
        res.status(400).json({message: ' name and budget required'})
    } else {
        next()
    }
}

router.get('/' , async (_, res) => {
    try {
        const data = await accountsDb.getAll()
        res.status(200).json(data)
    } catch(err) {
        res.status(404).json({message: err.message})
    }
})

router.get('/:id', validateId, async (req, res) => {
    const {id} = req.params 

    try {
        const data = await accountsDb.getById(id)
        res.status(200).json(data)
    } catch(err) {
        res.status(404).json({message: err.message})
    }

})

router.delete('/:id', validateId, async (req, res) => {
    const {id} = req.params 

    try {
        const data = await accountsDb.delete(id)
        res.status(200).json(data)
    } catch(err) {
        res.status(404).json({message: err.message})
    }

})

router.post('/', validatePost, async (req, res) => {

    try {
        const data = await accountsDb.create(req.body)
        res.status(200).json(data)
    } catch(err) {
        res.status(404).json({message: err.message})
    }

})

router.put('/:id',validateId, validatePost, async (req, res) => {
    const {id} = req.params
    try {
        const data = await accountsDb.update(id, req.body)
        res.status(200).json(data)
    } catch(err) {
        res.status(404).json({message: err.message})
    }

})


module.exports = router
const coolController = require('../controllers/CoolController')

let router = function(express){

    var coolRouter = express.Router()
    coolRouter.get('/', coolController.index)
    coolRouter.post('/', coolController.create)
    coolRouter.options('/', coolController.options)
    coolRouter.get('/:id', coolController.show)
    coolRouter.put('/:id', coolController.update)
    coolRouter.delete('/:id', coolController.delete)
    coolRouter.options('/:id', coolController.optionsDetail)

    return coolRouter
}

module.exports = router


const coolController = require('../controllers/CoolController')

let router = function(express){

    var coolRouter = express.Router()
    coolRouter.get('/', coolController.index)
    coolRouter.post('/', coolController.create)
    coolRouter.get('/:id', coolController.show)
    coolRouter.patch('/:id', coolController.update)
    coolRouter.put('/', coolController.put)
    coolRouter.delete('/:id', coolController.delete)
    coolRouter.options('/', coolController.options)

    return coolRouter
}

module.exports = router


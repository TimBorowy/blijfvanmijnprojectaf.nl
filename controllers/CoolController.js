// Database model for cool people
const coolpeopleModel = require('../models/coolpeople')
const paginationHelper = require('../PaginationHelper')

let controller = {

index: function(req, res){

    // count all documents
    coolpeopleModel.countDocuments({}, function(err, count){

        // if get limit is set, take that value. else get all documents
        let limit = (req.query.limit != null ? parseInt(req.query.limit) : count)

        // if get start is set, take that value. else start at 1
        let start = (req.query.start != null ? parseInt(req.query.start) : 1)

        let documentCount = count

        coolpeopleModel.find({})
            .limit(limit)
            .skip((start != 0 ? start * limit - limit : 0))
            .exec(function(err, project){

            if(err){
                res.status(500).send(err)
            
            } else{
                // return json compliled over at the pagination helper
                res.json(paginationHelper.formatResouceData(project, start, count, limit, req)) 
            }
        })
    })
},
show: function (req, res) {
    
    let id = req.params.id
    let resourceUrl = req.protocol + '://' + req.get('host')+'/resource/'

    coolpeopleModel.findById(id, function(err, coolPeople){
        if(err){
            return res.status(404).send(err).end()
        } else {  
            if(coolPeople == null){
                return res.status(404).send("not found").end()
            }
            coolPeople._links = {
                self: {
                href: resourceUrl+coolPeople._id
                },
                collection: {
                    href: resourceUrl
                }
            }
            res.json(coolPeople)
        }
    })
},
create: function(req, res){
    console.log(req.body)
    let form = req.body
    let newCool = coolpeopleModel({name: form.name, swagScore: form.swagScore, descr: form.descr})

    newCool.save(function(err){
        if (err) return res.status(400).send(err)
        console.log('saved!')
        return res.status(201).json({message: 'success'})
    })
},
update: function(req, res){
    let id = req.params.id
    let form = req.body
    
    coolpeopleModel.findById(id, function(err, coolPeople){
        if(err){
            return res.status(404).send(err).end()
        } else {  
            if(coolPeople == null){
                return res.status(404).send("not found").end()
            }
            
            coolPeople.name = form.name
            coolPeople.swagScore = form.swagScore
            coolPeople.descr = form.descr

            coolPeople.save(function(err){
                if (err) return res.status(400).send(err)
                console.log('saved!')
                return res.status(200).json(coolPeople)
            })

        }
    })
},
delete: function(req, res){

    let id = req.params.id
    coolpeopleModel.findByIdAndDelete(id, function(err){
        if(err) return res.status(404).send(err)
    })
    return res.status(204).json({message: 'success'})
    
},
options: function(req, res){
    res.header('Allow', 'GET, POST, OPTIONS')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.sendStatus(200).end()
},
optionsDetail: function(req, res){
    res.header('Allow', 'GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
    res.sendStatus(200).end()
},
}
module.exports = controller
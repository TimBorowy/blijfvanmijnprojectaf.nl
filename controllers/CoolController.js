// Database model for cool people
const coolpeopleModel = require('../models/coolpeople')

let controller = {

index: function(req, res){
    let limit = ''
    let start = ''

    limit = (req.query.limit != null ? parseInt(req.query.limit) : 10)
    start = (req.query.start != null ? parseInt(req.query.start) : 0)


    // count all documents
    coolpeopleModel.countDocuments({}, function(err, count){
        let documentCount = count
        let totalPages = Math.ceil(count / limit)
        let previousPage = (start == 1 ? 1 : start-1)
        let nextPage = (start == totalPages ? totalPages : start+1)
        let resourceUrl = req.protocol + '://' + req.get('host')+'/resource/'

        console.log(req.protocol + '://' + req.get('host') )


        coolpeopleModel.find({},)
            .limit(limit)
            .skip(start*limit - limit)
            .exec(function(err, project){

            if(err){
                res.status(500).send(err)
            
            } else{
                
                
                let fullProject = []
        
                for (let i = 0; i < project.length; i++) {
                    let element = project[i];
                    
                    element._links = {
                        self: {
                        href: resourceUrl+element._id
                        },
                        collection: {
                            href: resourceUrl
                        }
                    }
            
                    fullProject.push(element)
                }
            
                let response = {
                items: fullProject,
                _links: {
                    self: {
                    href: resourceUrl
                    }
                },
                pagination: {
                    currentPage: start,
                    currentItems: limit,
                    totalPages: totalPages,
                    totalItems: documentCount,
                    _links: {
                    first: {
                        page: 1,
                        href: resourceUrl+'?limit='+limit+'&start=1'
                    },
                    last: {
                        page: totalPages,
                        href: resourceUrl+'?limit='+limit+'&start='+totalPages
                    },
                    previous: {
                        page: previousPage,
                        href: resourceUrl+'?limit='+limit+'&start='+previousPage
                    },
                    next: {
                        page: nextPage,
                        href: resourceUrl+'?limit='+limit+'&start='+nextPage
                    },
                    }
                }
                }
                res.json(response) 
            }
        })
    })
},
show: function (req, res) {
    //bfeb22b2272f347dcbfda02
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
        if (err) return res.status(400).send(err);
        console.log('saved!')
        return res.status(201).json({message: 'success'})
    })
},
update: function(req, res){
    let id = req.params.id
    let form = req.body
    console.log(form)
    //return res.status(200).end()
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
                if (err) return res.status(400).send(err);
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
    res.header('Accept', 'GET, POST, OPTIONS')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.sendStatus(200).end();
},
optionsDetail: function(req, res){
    res.header('Accept', 'GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
    res.sendStatus(200).end();
},
};
module.exports = controller;
// Database model for cool people
const coolpeopleModel = require('../models/coolpeople')

let controller = {

index: function(req, res){
    coolpeopleModel.find({}, function(err, project){
        if(err){
            res.status(500).send(err)
        
        } else{
    
            let fullProject = []
    
            for (let i = 0; i < project.length; i++) {
            let element = project[i];
            
            element._links = {
                self: {
                href: "http://164.132.226.87:8080/resource/"+element._id
                },
                collection: {
                    href: "http://164.132.226.87:8080/resource"
                }
            }
    
            fullProject.push(element)
            }
    
            let response = {
            items: fullProject,
            _links: {
                self: {
                href: 'http://164.132.226.87:8080/resource'
                }
            },
            pagination: {
                currentPage: 1,
                currentItems: 10,
                totalPages: 1,
                _links: {
                first: {
                    page: 1,
                    href: 'http://164.132.226.87:8080/resource'
                },
                last: {
                    page: 1,
                    href: 'http://164.132.226.87:8080/resource'
                },
                previous: {
                    page: 1,
                    href: 'http://164.132.226.87:8080/resource'
                },
                next: {
                    page: 1,
                    href: 'http://164.132.226.87:8080/resource'
                },
                }
            }
            }
            res.json(response)
        }
        })
},
show: function (req, res) {
    res.send('get data worked')
},
create: function(req, res){
    console.log(req.body)
    let form = req.body
    let newCool = coolpeopleModel({name: form.name, swagScore: form.swagScore, descr: form.descr})

    newCool.save(function(err){
        if (err) return res.status(500).send(err);
        console.log('saved!')
        return res.json({message: 'success'})
    })
},
update: function(req, res){
    return res.send()
},
delete: function(req, res){
    return res.send()
},
put: function(req, res){
    return res.send()
},
options: function(req, res){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
},
};
module.exports = controller;
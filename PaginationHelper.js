let PaginationHelper = {

//helper functions for pagination
totalPages: function(count, limit){
    return Math.ceil(count / limit)
},

previousPage: function(start){
    return (start == 1 ? 1 : start-1)
},

nextPage: function(start, totalPages){
    return (start == totalPages ? totalPages : start+1)
},

currentItems: function(start, count, limit){
    let totalPages = this.totalPages(count, limit)

    if(limit == count){
        return limit
    }
    // check if is last page
    if(start == totalPages){
        // check if limit is a multiple of amount of pages
        if(totalPages % limit == 0){
            // set current items to user set limit
            return limit
        } else {
            // set current items to rest result
            return count % limit
        }
    } else {
        // current items equals limit because it's not the last page
        return limit
    }
},

formatResouceData: function(project, start, count, limit, req){
    
    let documentCount = count

    let resourceUrl = req.protocol + '://' + req.get('host')+'/resource/'
    let fullProject = []
        
    for (let i = 0; i < project.length; i++) {
        let element = project[i]
        
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

    return {
        items: fullProject,
        _links: {
            self: {
            href: resourceUrl
            }
        },
        pagination: {
            currentPage: start,
            currentItems: this.currentItems(start, count, limit),
            totalPages: this.totalPages(count, limit),
            totalItems: count,
            _links: {
                first: {
                    page: 1,
                    href: resourceUrl+'?limit='+limit+'&start=1'
                },
                last: {
                    page: this.totalPages(count, limit),
                    href: resourceUrl+'?limit='+limit+'&start='+this.totalPages(count, limit)
                },
                previous: {
                    page: this.previousPage(start),
                    href: resourceUrl+'?limit='+limit+'&start='+this.previousPage(start)
                },
                next: {
                    page: this.nextPage(start, this.totalPages(count, limit)),
                    href: resourceUrl+'?limit='+limit+'&start='+this.nextPage(start, this.totalPages(count, limit))
                },
            }
        }
    }

}

}

module.exports = PaginationHelper
const redis = require('redis');
const photo = require('../models/photo');
const  { doGet, doPost } = require('./restClient');
const redis_client = redis.createClient(port_redis); // TODO: Get From config
const { resPerPage, ALLOWED_QUERY_PARAMS } = require('../utils/constants');

async function getAllImages(req, requestId) {
    headers = {
        'Authorization' :  `Bearer ${res.locals.token}}`
    }
    try {
        const dataCache = checkInCache(requestId);
        // If there is not stored data in cache, go to external api
        // save data en mongo db and after that save in cache as key generated as uuid
        if(dataCache) {
            return dataCache
        } else {    
            const { data: imagesResponse } = doGet(' http://interview.agileengine.com', headers)
            if(imagesResponse.length > 0) {
                //Goto db and save
                for(i=0; i<imagesResponse.length; i++) {
                    await photo.save(imagesResponse[i])
                }
                // Save request in cache with rquestId as key for the future queries
                redis_client.setex(requestId, 3600, JSON.stringify(imagesResponse))

                return imagesResponse
            }    
        }
        return null
        
    } catch(e) {
        throw e
    }
}

async function getImagesByPage(req, requestId, pages) {
    
    try {
        const dataCache = checkInCache(requestId);
        if(dataCache) {
            return dataCache
        } else {    
            photo.find({}, function(err, result) {
                if (err) {
                  return res.send(err);
                } else {
                  redis_client.setex(requestId, 36000, JSON.stringify(result))
                  return res.send(result);
                }
              })
              .skip((resPerPage * pages) - resPerPage)
              .limit(resPerPage)
        }      
        return null
        
    } catch(e) {
        throw e
    }
}
async function getImagesById(req, requestId, imageId) {
    try {
        const dataCache = checkInCache(requestId);
        if(dataCache) {
            return dataCache
        } else {    
            const response = photo.findById({id: imageId});
            redis_client.setex(requestId, 36000, JSON.stringify(response))
            return response;
        }      
        
    } catch(e) {
        throw e
    }
}

// TODO: Refactor this logic
async function searchByParams(req, requestId, param) {
    try {
        const dataCache = checkInCache(requestId);
        if(dataCache) {
            return dataCache
        } else {    
            const { name } = param
            const query = buildQuery(name);
            const response = photo.find({param});
            redis_client.setex(requestId, 36000, JSON.stringify(response))
            return response;
        }      
        
    } catch(e) {
        throw e
    }
}

async function checkInCache(key) {
    redis_client.get(key, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        //if no match found
        if (data != null) {
          return res.send(data);
        }
        return null
      });
}

function buildQuery(name) {
    // Todo: refactor this logic in order to build a valid and perfomance query
    if(ALLOWED_QUERY_PARMS.includes(name)) {
        return { name: name};
    }
    return null
}

module.exports = {
    getAllImages,
    getImagesByPage,
    getImagesById,
    searchByParams
}

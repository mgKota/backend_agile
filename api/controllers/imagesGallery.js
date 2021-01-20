
const imagesService = require('../services/imagesGallery');
const uuidv5 = require('uuidv5');
const { ALLOWED_QUERY_PARAMS } = require('../utils/constants'); 

// Get All Images or Get Images by pages
async function getImages(req, res, next){
    const { pages } = req.params;
    // generate UUID as key to save data in cache
    const requestId = getUUid(req);
    try {
        if(pages) {
            // return images by page
            const imagesList = await imagesService.getImagesByPage(req, requestId, pages);
            return res.status(200).send({ result: imagesList });
        }
        //GO to store to find images (cache or external api)
        const imagesList = await imagesService.getAllImages(req, requestId);
        return res.status(200).send({ result: imagesList });

    } catch (err) {
        console.log(err);
        return res.status(400).send({'error': err.message});
    }
    
} 

// Get particular Image by Id
async function getImage(req, res, next){
    const { id } = req.params;
    const requestId = getUUid(req);
    try {
        if(!id) {
            throw new applicationError(400, 'invalid_param');
        }
        const image = await imagesService.getImagesById(req, requestId, id);
        return res.status(200).send({image});

    } catch (err) {
        console.log(err);
        return res.status(400).send({'error': err.message});
    }
    
}

async function searchImages(req, res, next){
    
    try {
        if(!validateAllowParam(req.params)) {
            throw applicationError(400, "invalid_param");
        }
        
        const requestId = getUUid(req);
        const image = await imagesService.searchByParams(req, requestId, req.params);
        
        
        return res.status(200).send({image});

    } catch (err) {
        console.log(err);
        return res.status(400).send();
    }
    
}

function getUUid(req) {
    //get uuid in order to save request in cache
    return uuidv5('reqId', `${req.url}-${req.query}-${req.params}`)
    
}

function validateAllowParam(params) {
    const { name } = params;
    // ToDo: Refactor this code in order to validate params from config file
    if(!ALLOWED_QUERY_PARMS.includes(name)) {
        return false;
    } 
    return true;
}

module.exports = {
    getImages,
    getImage,
    searchImages
};
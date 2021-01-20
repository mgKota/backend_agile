const axios = require('axios')

module.exports = {
    doGet,
    doPost
}

async function doGet(url, headers){
    try {
        const response = await axios.get(url, {headers})
        return response
    } catch(e) {
        throw e;
    }
}

async function doPost(url, headers, params){
    try {
        const response = await axios.post(url,{headers, data:params})
        return response
    } catch(e) {
        throw e;
    }
}
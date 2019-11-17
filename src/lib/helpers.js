const bcrypt = require('bcryptjs');


const helpers = {};

helpers.encryptPassword = async(password)=>{
    try {
     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(password, salt);

    return hash;
    } catch (error) {
        console.error(error)
    }
}

helpers.matchPassword = async(password, savedhash)=>{
    try {
     const result = await bcrypt.compare(password, savedhash);
    return result;
    } catch (error) {
        console.error(error);
    }//bcryp pide que maneges las excepciones si o si
}

module.exports = helpers;

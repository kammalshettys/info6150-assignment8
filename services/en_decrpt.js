var bcrypt = require('bcryptjs');

const encrypt = async (password)=>{
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(user.password,salt);
    return hash;
}



module.exports = encrypt;
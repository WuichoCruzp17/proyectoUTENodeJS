const bcryptjs =    require('bcryptjs');

const helpers ={};
helpers.encryptPassword= async (password)=>{
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

helpers.matchPassword =async(password,savedPassword)=>{
  try {
    return await bcryptjs.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

module.exports = helpers;
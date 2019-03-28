const configs={};

configs.crud = {
    INSERT:1,
    UPDATE:2,
    SELECT:3,
    DELETE:4
};

configs.functions ={
    COUNT:function(column){
        return  `COUNT(${column})`
    }
};
module.exports  = configs;
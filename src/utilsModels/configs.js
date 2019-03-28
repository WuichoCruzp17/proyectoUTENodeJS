const {util, utilString} = require('../lib/util');
const configs={};

configs.crud = {
    INSERT:1,
    UPDATE:2,
    SELECT:3,
    DELETE:4
};

configs.operadores ={
    SUM:1,
    DECR:2,
    MULT:3,
    DIV:4,
    MODU:5
};
configs.functions ={
    COUNT:function(column){
        return  `COUNT(${column})`
    },

    CONCAT:function(columns){
        var _string ="";
        if(Array.isArray(columns)){
            const c = columns.length -1;
            for(var i=0;i<columns.length;i++){
                _string += (i<c) ? `${columns[i]}, ` : columns[i];
            }
            return _string;
        }
        return "";
    },

    SUM:function(columns){
        var sum ="";
        if(Array.isArray(columns)){
            for(var i=0;i<columns.length;i++){

            }
        }else if(utilString.validateUnderScript(columns)){
            return `SUM(${columns})`;
        }else if(util.validateObjetc(columns)){
                const cols = columns.cols;
                sum ="SUM(";
                for(var key in cols){
                    sum += cols[key];
                }
        }
    }
};
module.exports  = configs;
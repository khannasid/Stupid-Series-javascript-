
const createDB = (name, table) =>{

    const db = new Dexie(name);
    db.version(1).stores(table);
    db.open();

    return db;
}
// insert function

const bulkcreate = (dbtable, data) =>{
    let flag = empty(data);
    if(flag){
        dbtable.bulkAdd([data]);
        console.log("data inserted successfully!!");
    }
    else{
        console.log("please provide data!!");
    }
    return flag;
}

const empty = object =>{
    let flag = false;

    for(const val in object){
        if(object[val]!= "" && object.hasOwnProperty(val)){
            flag = true;
        }
        else{
            flag = false;
        }
    }
    return flag;
}

const getData = (dbtable, fn) =>{
    let index = 0;
    let obj = {};

    dbtable.count((count) =>{
        if(count){
            dbtable.each(table =>{
                obj = sortObj(table);
                fn(obj,index++);
            })
        }
        else{
            fn(0);
        }
    })
}

const sortObj = sortobj =>{
    let obj = {};
    obj = {
        id : sortobj.id,
        item : sortobj.name,
        seller : sortobj.seller,
        rate : sortobj.rate
    }
    return obj;
}

const createEle = (tagname, appendTo,fn) =>{
    const element = document.createElement(tagname);
    if(appendTo)appendTo.appendChild(element);
    if(fn)fn(element);
}


export default createDB;
export{
    bulkcreate,
    getData, 
    createEle
}
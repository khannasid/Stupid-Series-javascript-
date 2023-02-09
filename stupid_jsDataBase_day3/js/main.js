import createDB from "./Module.js";
import { bulkcreate, getData, createEle } from "./Module.js";

let db = createDB("Productdb", {
    products: `++id,name,seller,rate`
});

const id = document.getElementById("id");
const seller = document.getElementById("seller");
const rate = document.getElementById("rate");
const item = document.getElementById("item");
const notfound = document.getElementById("notfound");

const btncreate = document.getElementById("btn-create");
const btnread = document.getElementById("btn-read");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

btncreate.onclick = (event) =>{
    let flag = bulkcreate(db.products,{
        name:item.value,
        seller:seller.value,
        rate:rate.value
    });
    seller.value = rate.value = item.value = "";
    getData(db.products,(data)=>{
        id.value = data.id + 1 || 1;
        console.log(data.id);
    });
}


btnread.onclick = table;
// btnupdate.onclick = table;
btndelete.onclick = () =>{
    db.delete();
    db = createDB("Productdb", {
        products: `++id,name,seller,rate`
    });
    db.open();
    table();
}

btnupdate.onclick = () =>{
    const idt = parseInt(id.value || 0);
    if(idt){
        db.products.update(idt,{
            item: item.value,
            seller: seller.value,
            rate: rate.value
        })
    }
    table();
}

// window onload event
window.onload = () =>{
    textID(id);
}
function textID(textboxid){
    getData(db.products, data =>{
        textboxid.value = data.id +1 || 1;
    })
}

function table(){
    // it is used to create dynamic html code via JS
    const tbody = document.getElementById("tbody");
    
    while(tbody.hasChildNodes()){
        tbody.removeChild(tbody.firstChild);
    }

    getData(db.products, (data)=>{
        if(data){
            createEle("tr",tbody,(tr) =>{
                
                for(const value in data){
                    
                    createEle("td", tr, (td) =>{
                        td.textContent = data.rate === data[value]? `$ ${data[value]}` : data[value];
                    })
                }
                createEle("td", tr,(td) =>{
                    createEle("i", td,(i) =>{
                        i.className = "fas fa-edit btnedit";
                        i.setAttribute(`data-id`,data.id);
                        i.onclick = editbtn;
                    })
                })
                createEle("td", tr,(td) =>{
                    createEle("i", td,(i) =>{
                        i.className = "fas fa-trash-alt btndelete";
                        i.setAttribute(`data-id`,data.id);
                        i.onclick = deletebtn;
                    })
                })
            })
        }
        else{
            createEle("h2",notfound, (h2) =>{
                h2.textContent = "Data Not Found";
            })
        }
    });
}

function editbtn(event){
    let idt = parseInt(event.target.dataset.id);
    db.products.get(idt,data =>{
        seller.value = data.seller || "";
        id.value = data.id || "";
        rate.value = data.rate || "";
        item.value = data.name || "";
    })
}


function deletebtn(event){
    let idt = parseInt(event.target.dataset.id);
    db.products.delete(idt);
    table();
}


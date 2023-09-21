let data = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const dataFromLocalStorage = JSON.parse(localStorage.getItem("data"));
const tabBtn = document.getElementById("tab-btn");

if(dataFromLocalStorage){
    data=dataFromLocalStorage;
    render(data)
}

tabBtn.addEventListener("click",function(){
    firefox.tabs.query({active:true,currentWindow:true},function(tabs){
        data.push(tabs[0].url)
        localStorage.setItem("data",JSON.stringify(data))
        render(data)
    })
})

function render(data){
    let listItems = ""
    for(let i=0;i<data.length;i++){
        listItems += `
        <li>
        <a target='_blank' href='${data[i]}'>
        ${data[i]}
        <hr/>
        </a>
        </li>
        `
    }
    ulEl.innerHTML=listItems;
}
   
deleteBtn.addEventListener("dblclick",function(){
localStorage.clear();
data=[];
render(data)
})

inputBtn.addEventListener("click",function(){
    data.push(inputEl.value)
    inputEl.value=" "
    localStorage.setItem("data",JSON.stringify(data))
    render(data)
})
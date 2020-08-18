const history = document.querySelector(".layout").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const page = document.querySelector(".page-num");

const maxitem = 5;
let index = 1;

    const pagination = Math.ceil(history.length/maxitem);
    console.log(pagination);

prev.addEventListener("click",function(){

    index--;
    check();
    showitems();
})

next.addEventListener("click",function(){

    index++;
    check();
    showitems();
})

function check(){
    if(index >= pagination)
    {
        next.classList.add("disable");
    }
    else{
        next.classList.remove("disable");
    }

    if(index <= 1)
    {
        prev.classList.add("disable");
    }
    else{
        prev.classList.remove("disable");
    }


}


function showitems(){
    for(let i=0;i< history.length;i++){
        history[i].classList.remove("show");
        history[i].classList.add("hide");

        if(i>=(index*maxitem)-maxitem && i<index*maxitem)
        {
            history[i].classList.remove("hide");
            history[i].classList.add("show");
        }
        page.innerHTML=index;

    }
}

window.onload = function(){
    showitems();
    check();
}
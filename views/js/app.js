let form = document.querySelector(".form");
let btn = document.querySelector(".btn");

btn.onclick = (e)=>{
    e.preventDefault();

    let formdata = new FormData(form);
    let obj = Object.fromEntries(formdata);

    postImage(obj)
}


async function postImage(obj){
    let data = fetch("/api/removeBg", {
        method: "post",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(obj)
    })

    let res = await data

    console.log(res)
}
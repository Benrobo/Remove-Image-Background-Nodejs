let form = document.querySelector(".form");
let btn = document.querySelector(".btn");
let imgcont = document.querySelector(".img-cont")
let imgbg = document.querySelector(".img-bg")
btn.onclick = (e)=>{
    e.preventDefault();
    
    let formdata = new FormData(form);
    let obj = Object.fromEntries(formdata);
    if(obj.imageurl == ""){
        alert("Image filed cannot be empty")
        return false;
    }
    else{
        imgcont.innerHTML = `
            <img src="${obj.imageurl}">
            <h3 class="p-3">Uploaded Image</h3>
        `
        postImage(obj)
    }
}


async function postImage(file){
    let data = await fetch("/upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(file)
    })

    let res = await data.json()
    console.log(res)
    if(res){
        let rfile = res.file;
        let dir = res.dir;
        if(file.length > 1){
            rfile.forEach((files)=>{

                imgbg.innerHTML = `
                    <img src="${dir/files}">
                    <h3 class="p-4">Bakground Removed</h3>
                `
            })
        }
        else{
            imgbg.innerHTML = `
                <img src="${dir}${rfile[0]}">
                <h3 class="p-4">Bakground Removed</h3>
            `
        }
    } 
}
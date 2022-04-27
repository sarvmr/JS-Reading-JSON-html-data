//ready(function () {

    console.log("Client script loaded.");

    // a function declaration inside of a callback ... which takes a callback function :O
    function ajaxGET(url, callback) {

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                //console.log('responseText:' + xhr.responseText);
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    function onNameClick (element) {
        const description = element.querySelectorAll('.description')[0]
        if (description.hidden) {
            description.hidden = false;
        } else {
            description.hidden = true;
        }    
    }
    const showHide = document.querySelector('#dessertJSON');
    console.log (showHide);
    const title1 = document.getElementById("subbar")
    
    showHide.addEventListener('click', () =>{
        if (title1.style.display==="block"){title1.style.display = "none"}
        else {title1.style.display = "block"}
    })
    

    document.querySelector("#dessertJSON").addEventListener("click", function (e) {

        ajaxGET("/dessert?format=json", function (data) {
            console.log("Before parsing", data);
            // this call is JSON so we have to parse it:
            let parsedData = JSON.parse(data);
            console.log("After parsing", parsedData);
            let str = "<ul>"
            for (let i = 0; i < parsedData.length; i++) {
                const descriptionHidden = parsedData[i].open ? "" : "hidden"
                str += `<li onclick="onNameClick (this)">`
                + `<div style='height:30px'>`  + "<b>" + parsedData[i].name + "</b>" +"</div>"
                + "<div class='description' "+ descriptionHidden +" style='max-height:fit-content'>" + parsedData[i].description + "</div>"
                + "</li>";
            }
            str += "</ul>";
            document.getElementById("subbar").innerHTML = str;
        });
    });


    document.querySelector("#appetizerHTML").addEventListener("click", function (e) {
        ajaxGET("/appetizer?format=html", function (data) {
            console.log(data);
            document.getElementById("subbar").innerHTML = data;
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(data, 'text/xml');
            htmlDoc.querySelectorAll('p').forEach(description => {
                description.setAttribute("hidden", true)
            })

            document.getElementById("subbar").innerHTML = new XMLSerializer().serializeToString(htmlDoc);
            document.getElementById("subbar").querySelectorAll('li').forEach(description => {
                description.addEventListener("click", function (e){
                    console.log(e, e.target.parentNode)
                    const description = e.target.parentNode.querySelectorAll('p')[0]
                    if (description.hidden) {
                        description.hidden = false;
                    } else {
                         description.hidden = true;
                    }  
                })
            })
        });

    });

    const showHide2 = document.querySelector('#appetizerHTML');
    const title2 = document.getElementById("subbar")
    
    showHide2.addEventListener('click', () =>{
        if (title2.style.display==="block"){title2.style.display = "none"}
        else {title2.style.display = "block"}
    })



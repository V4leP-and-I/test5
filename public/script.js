var data;
async function fetchData(callback) {
    try {
        let response = await fetch('/api/news');

        if (response.ok) {
            let json = await response.json();
            data = json['hydra:member'];
        }
        else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
    catch (error) {
        console.error('Произошла ошибка при запросе:', error);
    }
}

fetchData().then(() => {
    show_cards(data);
});

var mydata = JSON.parse(data);
var main_block = document.querySelector(".main_content");

function show_cards() {
    for (let i = 0; i < mydata.length; i++) {
        var block = document.createElement("div");
        block.className = "main_blocks";
        main_block.append(block);

        var image = document.createElement("img");
        image.src = mydata[i].pic;
        block.append(image);

        var text_block = document.createElement("div");
        text_block.className = "main_blocks_text";
        block.append(text_block);

        var title = document.createElement('p');
        title.innerHTML = mydata[i].title;
        title.className = "main_content_topic";
        text_block.append(title);

        var text = document.createElement('p');
        text.innerHTML = mydata[i].text;
        text.className = "main_content_text";
        text_block.append(text);

        var btn_block = document.createElement("div");
        btn_block.className = "main_content_btn";
        block.append(btn_block);

        var btn = document.createElement("a");
        btn.className = "main_content_btn_text";
        btn.innerHTML = "Подробнее";
        text_block.append(btn);

        if (i == 0) {
            btn.classList.add("first_btn");
            text_block.classList.add("first_block");
        }
        else if (i == 1) {
            btn.classList.add("second_btn");
            text_block.classList.add("second_block");
        }
        else {
            btn.classList.add("thrid_btn");
            text_block.classList.add("thrid_block");
        }

        var type = document.createElement('a');
        type.innerHTML = mydata[i].type;
        type.setAttribute("style", "display: none");
        text_block.append(type);
    }
}

// mydata2 = [];
// for (el in mydata){
//     mydata2.push(mydata[el]);
// }

console.log(data);

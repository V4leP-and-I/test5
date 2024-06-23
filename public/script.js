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


// var mydata = JSON.parse(data);

var month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

function show_cards(mydata) {
    var main_block = document.querySelector(".container");
    for (let i = 0; i < mydata.length; i++) {
        var block = document.createElement("div");
        block.className = "card";
        main_block.append(block);

        // var image = document.createElement("img");
        // image.src = mydata[i].pic;
        // block.append(image);

        var text_block = document.createElement("div");
        text_block.className = "head";

        var type = document.createElement('a');
        type.innerHTML = mydata[i].type;
        type.className = "type";
        // type.setAttribute("style", "display: none");
        text_block.append(type);

        // var date = document.createElement('p');
        // date.innerHTML = mydata[i].date;
        // date.className = "date";
        // text_block.append(date);
        var dateTimeString = mydata[i].date;
        var dateTime = new Date(dateTimeString);

        // var year = dateTime.getFullYear();
        var mnth = month[dateTime.getMonth()]; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
        var day = dateTime.getDate();
        var hours = dateTime.getHours();
        var minutes = dateTime.getMinutes();

        var date = document.createElement('a');
        date.innerHTML = day + ' ' + mnth + ' ' + hours + ':' + minutes;
        date.className = "date";
        text_block.append(date);

        block.append(text_block);

        var image = document.createElement("img");
        if (mydata[i].img && mydata[i].img.trim() !== ""){
            image.src = 'images\\' + mydata[i].img;
        }
        block.append(image);

        var title = document.createElement('div');
        title.innerHTML = mydata[i].title;
        title.className = "title";
        block.append(title);

        // var type = document.createElement('p');
        // type.innerHTML = mydata[i].type;
        // type.className = "main_content_type";
        // text_block.append(type);

        var descr = document.createElement('div');
        descr.innerHTML = mydata[i].description;
        descr.className = "descr";
        block.append(descr);

        var id_n = document.createElement('div');
        id.innerHTML = 'редактировать';
        // id.href = mydata[i].id + '\\edit';
        descr.className = "edit";
        block.append(id_n);

        // var btn_block = document.createElement("div");
        // btn_block.className = "main_content_btn";
        // block.append(btn_block);

        // var btn = document.createElement("a");
        // btn.className = "main_content_btn_text";
        // btn.innerHTML = "Подробнее";
        // text_block.append(btn);

        // if (i == 0) {
        //     btn.classList.add("first_btn");
        //     text_block.classList.add("first_block");
        // }
        // else if (i == 1) {
        //     btn.classList.add("second_btn");
        //     text_block.classList.add("second_block");
        // }
        // else {
        //     btn.classList.add("thrid_btn");
        //     text_block.classList.add("thrid_block");
        // }

        // btn.classList.add("thrid_btn");
        // text_block.classList.add("thrid_block");

        // var type = document.createElement('a');
        // type.innerHTML = mydata[i].type;
        // type.setAttribute("style", "display: none");
        // text_block.append(type);
    }
}

// mydata2 = [];
// for (el in mydata){
//     mydata2.push(mydata[el]);
// }

// console.log(data);

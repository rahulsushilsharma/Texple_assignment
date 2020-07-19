function dis(pageID) {
    let pages = document.querySelectorAll(".fun");
    pages.forEach(page => {
        page.style.display = "none";
    });
    document.querySelector(pageID).style.display = "block"

}
location.hash = "";
location.hash = "#Word-search";
window.addEventListener("hashchange", (hash) => {
    dis(location.hash);
});

// api javascript

function search(word) {

    const url = "https://owlbot.info/api/v4/dictionary/" + word;

    const options = {
        headers: {
            Authorization: "Token de6cee09a2f30c7223b7c616994c4fc20a7c2929"
        }
    }

    function addHtmlToWord(data) {
        let head = document.getElementById('word-heading');
        head.textContent = "Word : " + data.word;
        const def = data.definitions;

        function addLiTag(define) {
            var tag = document.createElement("li");
            var heading = document.createElement("h5");
            var pera = document.createElement("p");
            var pera1 = document.createElement("p");

            var type = document.createTextNode("Type : " + define.type);
            var text = document.createTextNode("Definition :  " + define.definition);
            var exapmle = document.createTextNode("Example :  " + define.example);

            pera.appendChild(text);
            heading.appendChild(type);
            pera1.appendChild(exapmle);
            tag.appendChild(heading);
            tag.appendChild(pera);
            tag.appendChild(pera1);

            tag.classList.add("define");
            var element = document.getElementById("search-result");
            element.appendChild(tag);
        }

        def.forEach(define => {
            addLiTag(define);
        });
    }

    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            addHtmlToWord(data)
        }).catch(e => {
            console.error(e);
        });
}
// todo javascript
getdata();

async function add(todo) {
    let data = {
        tododata: todo,
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const responce = await fetch('/api', options);
    const t = await responce.json();
    addLiTag(t.tododata,t._id);
}

function addLiTag(define,id) {
    var tag = document.createElement("li");
    var pera = document.createElement("input");
    var edit = document.createElement("button");
    var del = document.createElement("button");
    edit.textContent = 'edit';
    del.textContent = 'delete';
    edit.setAttribute('onclick', 'edit()')
    del.setAttribute('onclick', 'deleteTodo(this.parentNode.id)');
    edit.classList.add("todo-button");
    del.classList.add("todo-button");
    pera.placeholder = define;
    pera.disabled = true;
    tag.appendChild(pera);
    tag.appendChild(edit);
    tag.appendChild(del);
    tag.id = id;
    tag.classList.add("define");
    var element = document.getElementById("todo-result");
    element.appendChild(tag);
}

function load(data) {
    data.forEach(define => {
        addLiTag(define.tododata,define._id);
    });
}

async function getdata() {
    const responce = await fetch('/load');
    const data = await responce.json();
    load(data);
}

async function updateTodo() {
    let d = document.getElementById('todo-container');
    let o, n;

    d.addEventListener('click', (e) => {
        e.stopPropagation();
        o = e.target.parentElement.placeholder;
        n = e.target.parentElement.textContent;
        e.target.parentElement.remove();
    })
    let data = {
        old: o,
        new: n
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const responce = await fetch('/update');
    const t = await responce.json();
    console.log(t);
}


// delete a item
async function deleteTodo(id) {
    console.log(id);
    let data = {
        _id: id,
    };
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    };
    const responce = await fetch('/delete', options);
    const res = await responce.json();
    document.getElementById(id).remove();
    console.log(res);
}
let count = 0;

function addelement(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}



let parameterbox = document.getElementById('parameterbox');
parameterbox.style.display = 'none';
let jsonbutton = document.getElementById('jsonbutton');
let customparameter = document.getElementById('customparameter');

jsonbutton.addEventListener('click', () => {
    document.getElementById('parameterbox').style.display = 'none';
    document.getElementById('enterjson').style.display = 'block';
});

customparameter.addEventListener('click', () => {
    document.getElementById('parameterbox').style.display = 'block';
    document.getElementById('enterjson').style.display = 'none';
});


let addparams = document.getElementById('addparam');
addparams.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="form-group row">
                        <label for="parameterofjson" class="col-sm-2 col-form-label">Parameter ${count + 2}</label>
                        <div class="col col-md-4">
                            <input type="text" id="parameterkey${count + 2}" class="form-control" placeholder="Enter Parameter key">
                        </div>
                        <div class="col col-md-4">
                            <input type="text" id="parametervalue${count + 2}" class="form-control" placeholder="Enter Parameter value">
                        </div>
                        <button class="btn btn-primary deleteparam">-</button>
                    </div>`;
    let paramelem = addelement(string);
    params.appendChild(paramelem);

    let deleteparamss = document.getElementsByClassName('deleteparam');
    for (item of deleteparamss) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
    
    count++;
});

let removeall = document.getElementById('removeall');
removeall.addEventListener('click', () => {
    let ans = confirm('are you sure about delete all parameters');
    if (ans) {
        let params = document.getElementById('params');
        params.innerHTML = '';
    }
})

let submit = document.getElementById('submitbutton');
submit.addEventListener('click', () => {
    document.getElementById('responseprism').innerHTML = 'please wait... fatching response.........';

    let url = document.getElementById('url').value;
    let requesttype = document.querySelector('input[name="typeofrequest"]:checked').value;
    let contenttype = document.querySelector('input[name="typeofcontent"]:checked').value;

    if (contenttype == 'params') {
        data = {};
        for (i = 0; i < count + 1; i++) {
            if (document.getElementById('parameterkey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterkey' + (i + 1)).value;
                let value = document.getElementById('parametervalue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestjson').value;
    }

    // enter this --> https://randomuser.me/api/ -- in output url box. to perform get request.
    if(requesttype == 'GET'){
        fetch(url,{
            method : 'GET',
        }).then(response => response.text()).then((text)=>{
            document.getElementById('responseprism').innerHTML = text;
            Prism.highlightAll();
        });

       

    }

    else{
        fetch(url,{
            method : 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        }).then(response => response.text()).then((text)=>{
            document.getElementById('responseprism').innerHTML = text;
            Prism.highlightAll();
        });

        
    }

});



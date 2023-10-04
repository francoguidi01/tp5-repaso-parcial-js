function API(url, method, body) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();

        request.open(method, url);
        request.responseType = 'json';
        request.onload = function () {
            if (request.status == 200 || request.status == 201) {
                resolve(request.response);
            } else {
                reject(`ERROR: ${request.status}`);
            }
        }
        if (method == 'POST' || method == 'PUT' || method == 'PATCH') {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            if(body != null)
            request.send(body);
        } else {
            request.send();
        }
    });
}

//TRAE LOS USUARIOS DE LA API
// API('https://jsonplaceholder.typicode.com/users', 'GET', null)
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((reason) => {
//         console.log(Error(reason));
//     })

//AGREGA UN NUEVO USUARIO A LA API
// API('https://jsonplaceholder.typicode.com/users', 'POST', JSON.stringify({
//     "id": 1,
//     "name": "Usuario Uno",
//     "username": "usuario.uno",
//     "email": "usuario.uno@example.com",
//     "address": {
//         "street": "123 Calle Principal",
//         "suite": "Suite 101",
//         "city": "Ciudad Uno",
//         "zipcode": "12345-6789",
//         "geo": {
//             "lat": "12.3456",
//             "lng": "78.9012"
//         }
//     },
//     "phone": "987-654-3210",
//     "website": "usuario1.com",
//     "company": {
//         "name": "Compañía Uno",
//         "catchPhrase": "Frase de Usuario Uno",
//         "bs": "Modelos de Usuario Uno"
//     }
// }),)
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((reason) => {
//         console.log(Error(reason));
//     })

//MODIFICA UN USUARIO TOTALMENTE DE LA API (HAY QUE TOCAR LA URL PARA PONERLE EL ID DE USUARIO)
// API('https://jsonplaceholder.typicode.com/users/2', 'PUT', JSON.stringify({ title: 'M4A4', body: 'OSCURO', }),)
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((reason) => {
//         console.log(Error(reason));
//     })

// API('https://jsonplaceholder.typicode.com/users/2', 'PATCH', JSON.stringify({ title: 'AK47',username:'Vicsim',}),)
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((reason) => {
//         console.log(Error(reason));
//     })

//BORRA UN USUARIO TAMBIEN CON LA URL
/*API('https://jsonplaceholder.typicode.com/users/4', 'DELETE', null)
.then((response) => {
    console.log(response);
})
.catch((reason) => {
    console.log(Error(reason));
})*/

//Mostrar LO QUE QUIERAS DEL USUARIO PERO DEPENDE LO QUE PONGAS EN EL URL

API('https://jsonplaceholder.typicode.com/users/7/comments', 'GET', null)
    .then((response) => {
        console.log()
        console.log(response);
    })
    .catch((reason) => {
        console.log(Error(reason));
    })



function createUserTable(user) {
    const rowHTML = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.address.city}</td>
                <td>${user.phone}</td>
                <td>${user.company.name}</td>
            </tr>
        `;

    const row = document.createElement('tr');
    row.insertAdjacentHTML('beforeend', rowHTML);

    return row;
}





//TRAE LOS USUARIOS DE LA API Y LOS AGREGA A LA TABLA POR NOMBRE
API('https://jsonplaceholder.typicode.com/users', 'GET', null)
    .then((users) => {

        users.sort((a, b) => a.name.localeCompare(b.name));
        
        const userTable = document.getElementById('user_table');
        const tbody = userTable.querySelector('tbody');

        users.forEach((user) => {
            if (user.name.startsWith('C') || user.name.endsWith('t')) {
                const row = createUserTable(user);
                tbody.appendChild(row);
            }
        });
    })
    .catch((reason) => {
        console.log(Error(reason));
    });

/* function orderByNameForArray(EmployeeList) {
     EmployeeList.sort((a, b) => {
         usuarios.sort((a, b) => a.name.localeCompare(b.name));
             });

     let list = document.querySelector('ul');

     // Borra los elementos de lista actuales
     list.innerHTML = '';

     // Recorre la lista de empleados con compañías ordenada y crea elementos de lista (li) para cada uno
     EmployeeList.forEach(employee => {
         // Crea un nuevo elemento de lista (li)
         let listItem = document.createElement('li');

         // Establece el contenido del elemento de lista con el nombre del empleado y la compañía
         listItem.textContent = `${employee.EmployeeName} works in ${employee.CompanyName}`;

         // Agrega el elemento de lista a la lista (ul)
         list.appendChild(listItem);
     });
 }


 //cuenta los empleado y las companias
 function countEmployees(employees) {
     return employees.length;
 }
 
 */

// function change_user ()
// {
//     let id_user = document.getElementById('id_user').value;
//     let name_to_change = document.getElementById('name').value;

//     API('https://jsonplaceholder.typicode.com/users/${id_user}', 'PATCH', JSON.stringify({ title: 'AK47',username:'Vicsim', name: name_to_change}),)
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((reason) => {
//         console.log(Error(reason));
//     })

// }


function change_user() {
    let id_user = document.getElementById('id_user').value; // Obten el valor del campo de ID de usuario
    let name_to_change = document.getElementById('name').value; // Obten el valor del campo de nombre

    // Construye la URL con el ID de usuario
    let apiUrl = `https://jsonplaceholder.typicode.com/users/${id_user}`;

    // Construye el objeto JSON con los datos a actualizar
    let dataToUpdate = {
        name: name_to_change,
        username: 'Vicsim', // Puedes modificar este valor si es necesario
        // Agrega otros campos que desees actualizar
    };

    API(apiUrl, 'PATCH', JSON.stringify(dataToUpdate))
        .then((response) => {
            console.log(response);
        })
        .catch((reason) => {
            console.log(Error(reason));
        });
}
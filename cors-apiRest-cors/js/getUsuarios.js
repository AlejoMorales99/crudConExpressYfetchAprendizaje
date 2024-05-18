const cuerpoTabla = document.getElementById('cuerpoTabla');

fetch(`http://localhost:5001/getUsuarios`)
    .then((response) => response.json())
    .then((data) => {

        data.forEach(data => {
            cuerpoTabla.innerHTML +=
                `
                <tr>
                    <td>${data.id}</td>
                    <td>${data.nombre}</td>
                    <td>${data.apellido}</td>
                    <td>${data.ciudad}</td>
                    <td> <button id='eliminar' value=${data.id} > eliminar </button> </td>
                    <td> <button id='editar' value=${data.id} > editar </button> </td>
                </tr>
            `
        });

        console.log(data);

    })
    .catch((error) =>
        console.error("Error al obtener datos de la API:", error)
    );


cuerpoTabla.addEventListener('click', (e) => {

    if (e.target.id == "eliminar") {
        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este registro?");

        if (confirmacion == true) {

            fetch(`http://localhost:5001/eliminarUsuario/${e.target.value}`, {
                    method: "DELETE",
                })
                .then((response) => {
                    if (response.ok) {
                        e.target.closest("tr").remove();
                    }else{
                        throw new Error("Error al eliminar el usuario");
                    }
                })
                .catch((error) => console.error("Error al eliminar usuario:", error));
        }

    }else if(e.target.id == 'editar'){
        window.location.href = "../view/editar.html?id=" + e.target.value; // Agrega el parámetro a la URL
    }

    

})
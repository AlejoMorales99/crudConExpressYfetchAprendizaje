document.addEventListener("DOMContentLoaded", () => {

    const editarUsuario = document.getElementById('editarUsuario');

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");


    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const ciudad = document.getElementById('ciudades');


    fetch("http://localhost:5001/getOneusuarios/" + id)
        .then((response) => response.json())
        .then((data) => {

            nombre.value = data.nombre;
            apellido.value = data.apellido;

            for (let i = 0; i < ciudad.options.length; i++) {

                if (ciudad.options[i].value == data.ciudad) {
                    ciudad.value = data.ciudad;
                    return;
                }

            }


        })
        .catch((error) =>
            console.error("Error al obtener datos de la API:", error)
        );


    editarUsuario.addEventListener('click', () => {

        const data = {
            "nombre": nombre.value,
            "apellido": apellido.value,
            "ciudad": ciudad.value
        }

        fetch("http://localhost:5001/actualizarUsuario/"+id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            .then((response) => {

                if (response.ok) {
                    console.log("Datos actualizados con exito");
                    window.location.href = "../view/index.html"

                } else {
                    console.error("Error al enviar la solicitud:", response.status);
                }
            })
            .catch((error) => {
                console.error("Error al enviar la solicitud:", error);
            });

    })


})
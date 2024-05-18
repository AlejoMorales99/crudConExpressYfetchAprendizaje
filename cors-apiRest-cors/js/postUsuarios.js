const crearUsuario = document.getElementById('crearUsuario');

crearUsuario.addEventListener('click', () => {

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
     const ciudad = document.getElementById('ciudades').value; 

    const data = {
        nombre: nombre,
        apellido: apellido,
        ciudad: ciudad
    }

     fetch("http://localhost:5001/insertarUsuario", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            // Verificar si la respuesta es exitosa (código de estado 200)
            if (response.ok) {
                console.log("Datos enviados correctamente");

                window.location.href = "../view/index.html"

            } else {
                console.error("Error al enviar la solicitud:", response.status);
            }
        })
        .catch((error) => {
            console.error("Error al enviar la solicitud:", error);
        }); 
});




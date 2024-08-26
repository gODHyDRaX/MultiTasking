import { tareas } from "./Data_tareas.js";
import { usuarios } from "./Data_users.js";

export function mostrarTareas() {
    let div_tareas = document.querySelector(".div_tareas");

    if (!div_tareas) {
        console.error('No se encontró el elemento con la clase "div_tareas".');
        return;
    }

    function obtenerDetallesTarea(tareaId) {
        let tarea = tareas.find(t => t.idtarea === tareaId);
        if (tarea) {
            return tarea.usuario_id_asignados.map(userId => {
                let usuario = usuarios.find(u => u.id === userId);
                return {
                    idtarea: tarea.idtarea,
                    NombreTarea: tarea.NombreTarea,
                    imgPerfil: usuario ? usuario.imgPerfil : "default-image.png",
                    fechaEntrega: tarea.fechaEntrega,
                    estado: usuario ? usuario.listaTareas.find(t => t.idtarea === tareaId)?.estado : "Unknown"
                };
            });
        }
        return [];
    }

    // Limpia el contenedor antes de agregar nuevas tareas
    div_tareas.innerHTML = '';

    tareas.forEach(tarea => {
        let tareaHTML = `
            <div class="tarea">
                <div class="nm_tarea">${tarea.NombreTarea}</div>
                <div class="asignado">
        `;

        // Agrega múltiples imágenes de perfil para cada usuario asignado
        let detalles = obtenerDetallesTarea(tarea.idtarea);
        detalles.forEach(detalle => {
            tareaHTML += `<img src="${detalle.imgPerfil}" alt="Perfil" class="img_perfil" />`;
        });

        // Continúa el HTML con fecha y estado
        tareaHTML += `
                </div>
                <div class="fecha">${detalles[0].fechaEntrega}</div>
                <div class="estado"><div class="est ${getEstadoClass(detalles[0].estado)}">${detalles[0].estado}</div></div>
            </div>
        `;

        // Inserta el HTML generado en el contenedor div_tareas
        div_tareas.innerHTML += tareaHTML;
    });
}

// Función para obtener la clase de estado correspondiente para el color
function getEstadoClass(estado) {
    switch (estado) {
        case "Not started":
            return "estado-rojo";
        case "In progress":
            return "estado-azul";
        case "Done":
            return "estado-verde";
        default:
            return "";
    }
}

export function configurarBotonAddTarea() {
    let botonAddTarea = document.querySelector(".add_tarea");

    if (!botonAddTarea) {
        console.error('No se encontró el botón con la clase "add_tarea".');
        return;
    }

    botonAddTarea.addEventListener("click", () => {
        ventana_crear_Tarea();
    });
}

function ventana_crear_Tarea() {
    // Crear el contenedor del modal
    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Crear el contenido del modal
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Crear Tarea</h2>
            <form id="form_tarea">
                <label for="nombre_tarea">Nombre de la tarea:</label>
                <input type="text" id="nombre_tarea" name="nombre_tarea" required>
                <label for="fecha_entrega">Fecha de entrega:</label>
                <input type="date" id="fecha_entrega" name="fecha_entrega" required>
                <label for="usuarios">Asignar a:</label>
                <div id="usuarios">
                    ${usuarios.map(usuario => `
                        <div class="usuario">
                            <input type="checkbox" id="usuario_${usuario.id}" name="usuarios" value="${usuario.id}">
                            <label for="usuario_${usuario.id}">
                                <img src="${usuario.imgPerfil}" alt="${usuario.usuario}" class="img_perfil_modal"/>
                                ${usuario.usuario}
                            </label>
                        </div>
                    `).join('')}
                </div>
                <button type="submit">Agregar Tarea</button>
            </form>
            <button id="close_modal">Cerrar</button>
        </div>
    `;

    // Agregar el modal al contenedor raíz
    document.querySelector(".root").appendChild(modal);

    // Manejar el cierre del modal
    document.querySelector("#close_modal").addEventListener("click", () => {
        modal.remove();
    });

    // Manejar el envío del formulario
    document.querySelector("#form_tarea").addEventListener("submit", (event) => {
        event.preventDefault();

        let nombreTarea = document.querySelector("#nombre_tarea").value;
        let fechaEntrega = document.querySelector("#fecha_entrega").value;
        let usuariosSeleccionados = Array.from(document.querySelectorAll("input[name='usuarios']:checked")).map(checkbox => parseInt(checkbox.value));

        // Agregar la tarea
        tareas.push({
            idtarea: `t00${tareas.length + 1}`,
            NombreTarea: nombreTarea,
            fechaEntrega: fechaEntrega,
            usuario_id_asignados: usuariosSeleccionados
        });

        // Mostrar las tareas actualizadas
        mostrarTareas();

        // Cerrar el modal
        modal.remove();
    });
}

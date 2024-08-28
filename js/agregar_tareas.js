import { tareas } from "./Data_tareas.js";
import { usuarios } from "./Data_users.js";

export function mostrarTareas() {
    let div_tareas = document.querySelector(".div_tareas");

    function obtenerDetallesTarea(tareaId) {
        let tarea = tareas.find(t => t.idtarea === tareaId);
        if (tarea) {
            return tarea.usuario_id_asignados.map(userId => {
                let usuario = usuarios.find(u => u.id === userId);
                return {
                    idtarea: tarea.idtarea,
                    NombreTarea: tarea.NombreTarea,
                    imgPerfil: usuario ? usuario.imgPerfil : "default-image.png",
                    fechaEntrega: tarea.fechaEntrega ? tarea.fechaEntrega : "Fecha no definida",
                    estado: tarea.estado ? tarea.estado : "Unknown"
                };
            });
        }
        return [];
    }

    div_tareas.innerHTML = '';

    tareas.forEach(tarea => {
        let detalles = obtenerDetallesTarea(tarea.idtarea);

        if (detalles.length > 0) {
            let tareaHTML = `
                <div class="tarea">
                    <div class="nm_tarea">${tarea.NombreTarea}</div>
                    <div class="asignado">
            `;

            detalles.forEach(detalle => {
                tareaHTML += `<img src="${detalle.imgPerfil}" alt="Perfil" class="img_perfil" />`;
            });
            tareaHTML += `
                    </div>
                    <div class="fecha">${detalles[0].fechaEntrega}</div>
                    <div class="estado"><div class="est ${getEstadoClass(detalles[0].estado)}">${detalles[0].estado}</div></div>
                </div>
            `;

            div_tareas.innerHTML += tareaHTML;
        } else {
            console.warn(`No se encontraron detalles para la tarea con id ${tarea.idtarea}`);
        }
    });
}

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
    let modal = document.createElement("div");
    modal.classList.add("modal");

    const categorias = Array.from(new Set(tareas.map(t => t.categoria)));

    modal.innerHTML = `
        <div class="modal-content">
            <h2>Crear Tarea</h2>
            <div class="campo">
                <span>Nombre de la tarea:</span>
                <input type="text" id="nombre_tarea" required>
            </div>
            <div class="campo">
                <span>Fecha de entrega:</span>
                <input type="date" id="fecha_entrega" required>
            </div>
            <div class="campo">
                <span>Asignar a:</span>
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
            </div>
            <div class="campo">
                <span>Estado de la tarea:</span>
                <div id="estado_tarea">
                    <div class="estado_opcion estado-rojo" data-estado="Not started">Not started</div>
                    <div class="estado_opcion estado-azul" data-estado="In progress">In progress</div>
                    <div class="estado_opcion estado-verde" data-estado="Done">Done</div>
                </div>
            </div>
            <div class="campo">
                <span>Categoría:</span>
                <select id="categoria_tarea" required>
                    ${categorias.map(categoria => `<option value="${categoria}">${categoria}</option>`).join('')}
                </select>
            </div>
            <div class="boton" id="agregar_tarea_btn">Agregar Tarea</div>
            <div class="boton" id="close_modal">Cerrar</div>
        </div>
    `;

    document.querySelector(".root").appendChild(modal);

    document.querySelector("#close_modal").addEventListener("click", () => {
        modal.remove();
    });

    let estadoTarea = "";

    document.querySelectorAll(".estado_opcion").forEach(div => {
        div.addEventListener("click", () => {
            document.querySelectorAll(".estado_opcion").forEach(d => d.classList.remove("selected"));
            div.classList.add("selected");
            estadoTarea = div.getAttribute("data-estado");
        });
    });

    document.querySelector("#agregar_tarea_btn").addEventListener("click", () => {
        let nombreTarea = document.querySelector("#nombre_tarea").value;
        let fechaEntrega = document.querySelector("#fecha_entrega").value;
        let usuariosSeleccionados = Array.from(document.querySelectorAll("input[name='usuarios']:checked")).map(checkbox => parseInt(checkbox.value));
        let categoriaTarea = document.querySelector("#categoria_tarea").value;

        if (!nombreTarea || !fechaEntrega || usuariosSeleccionados.length === 0 || !estadoTarea || !categoriaTarea) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const nuevaTarea = {
            idtarea: `t00${tareas.length + 1}`,
            NombreTarea: nombreTarea,
            fechaEntrega: fechaEntrega,
            estado: estadoTarea,
            categoria: categoriaTarea,
            usuario_id_asignados: usuariosSeleccionados
        };

        tareas.push(nuevaTarea);
        guardarTareas(); 
        mostrarTareas();
        modal.remove();
    });
}

function guardarTareas() {
    localStorage.setItem("tareas_guardadas", JSON.stringify(tareas));
}

export function cargarTareas() {
    const tareasGuardadas = localStorage.getItem("tareas_guardadas");
    if (tareasGuardadas) {
        tareas.splice(0, tareas.length, ...JSON.parse(tareasGuardadas)); 
    } else {
        guardarTareas();
    }
}

cargarTareas();

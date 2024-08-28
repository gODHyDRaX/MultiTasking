import { tareas } from "./Data_tareas.js";
import { usuarios } from "./Data_users.js";

export function configurarBotonMenu() {
    let btn_menu = document.querySelector(".menu");
    if (!btn_menu) {
        console.error('No se encontró el botón con la clase "menu".');
        return;
    }

    btn_menu.addEventListener("click", () => {
        mostrarMenuModal();
    });
}

function mostrarMenuModal() {
    if (document.querySelector(".modal-menu")) return;

    let modal = document.createElement("div");
    modal.classList.add("modal-menu");
    modal.innerHTML = `
        <div class="modal-menu-content">
            <button class="close-modal">Cerrar</button>
            <h2>Categorías</h2>
            <ul class="categorias-list">
                <li data-categoria="todas">Ver todas las tareas</li>
                ${getCategorias().map(categoria => `<li data-categoria="${categoria}">${categoria}</li>`).join('')}
            </ul>
        </div>
    `;

    document.querySelector(".root").appendChild(modal);

    document.querySelector(".close-modal").addEventListener("click", () => {
        modal.remove();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    document.querySelectorAll(".categorias-list li").forEach(item => {
        item.addEventListener("click", (e) => {
            let categoriaSeleccionada = e.target.dataset.categoria;

            if (categoriaSeleccionada === "todas") {
                mostrarTodasLasTareas(); 
            } else {
                mostrarTareasPorCategoria(categoriaSeleccionada);
            }

            modal.remove();
        });
    });
}

function getCategorias() {
    let tareas = JSON.parse(localStorage.getItem("tareas_guardadas")) || [];
    return [...new Set(tareas.map(tarea => tarea.categoria))]; // Obtener categorías únicas
}

function mostrarTodasLasTareas() {
    let tareas = JSON.parse(localStorage.getItem("tareas_guardadas")) || [];

    let divTareas = document.querySelector(".div_tareas");
    if (!divTareas) {
        console.error('No se encontró el div con la clase "div_tareas".');
        return;
    }

    divTareas.innerHTML = `
        <h3>Todas las Tareas</h3>
        ${tareas.map(tarea => {
        let imagenesPerfil = tarea.usuario_id_asignados.map(userId => {
            let usuario = usuarios.find(u => u.id === userId);
            return usuario ? `<img src="${usuario.imgPerfil}" alt="Perfil" class="img_perfil" />` : '';
        }).join('');

        return `
                <div class="tarea">
                    <div class="nm_tarea">${tarea.NombreTarea}</div>
                    <div class="asignado">
                        ${imagenesPerfil}
                    </div>
                    <div class="fecha">${tarea.fechaEntrega}</div>
                    <div class="estado"><div class="est ${getEstadoClass(tarea.estado)}">${tarea.estado}</div></div>
                </div>
            `;
    }).join('')}
    `;
}

function mostrarTareasPorCategoria(categoria) {
    let tareas = JSON.parse(localStorage.getItem("tareas_guardadas")) || [];
    const tareasFiltradas = tareas.filter(tarea => tarea.categoria === categoria);

    let divTareas = document.querySelector(".div_tareas");
    if (!divTareas) {
        console.error('No se encontró el div con la clase "div_tareas".');
        return;
    }

    divTareas.innerHTML = `
        <h3>Tareas de ${categoria}</h3>
        ${tareasFiltradas.map(tarea => {
        let imagenesPerfil = tarea.usuario_id_asignados.map(userId => {
            let usuario = usuarios.find(u => u.id === userId);
            return usuario ? `<img src="${usuario.imgPerfil}" alt="Perfil" class="img_perfil" />` : '';
        }).join('');

        return `
                <div class="tarea">
                    <div class="nm_tarea">${tarea.NombreTarea}</div>
                    <div class="asignado">
                        ${imagenesPerfil}
                    </div>
                    <div class="fecha">${tarea.fechaEntrega}</div>
                    <div class="estado"><div class="est ${getEstadoClass(tarea.estado)}">${tarea.estado}</div></div>
                </div>
            `;
    }).join('')}
    `;
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

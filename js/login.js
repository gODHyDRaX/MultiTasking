import { usuarios } from "./Data_users.js";
import { mostrarTareas, configurarBotonAddTarea } from "./agregar_tareas.js";
import { configurarBotonMenu } from "./categorias.js";

let root = document.querySelector(".root");
let btn_login = document.querySelector(".btn_login");

function getEstadoClass(estado) {
    switch (estado.toLowerCase()) {
        case 'pendiente':
            return 'estado-pendiente';
        case 'en progreso':
            return 'estado-en-progreso';
        case 'completado':
            return 'estado-completado';
        default:
            return 'estado-desconocido';
    }
}

function mostrarTareasFiltradas(filtro = '') {
    let divTareas = document.querySelector(".div_tareas");
    if (!divTareas) return;

    let tareas = JSON.parse(localStorage.getItem("tareas_guardadas")) || [];
    let tareasFiltradas = tareas.filter(tarea => tarea.NombreTarea.toLowerCase().includes(filtro.toLowerCase()));

    divTareas.innerHTML = `
        <h3>Tareas${filtro ? ` filtradas por "${filtro}"` : ''}</h3>
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

function ventana_login() {
    if (document.querySelector(".vent_login")) return;

    let vent_login = document.createElement("div");
    let github = document.querySelector(".github");
    let vtn_login = document.querySelector(".vtn_login");
    vent_login.classList.add("vent_login");
    vent_login.innerHTML = `
        <header class="header_login">
            <span class="material-symbols-outlined menu">menu</span>
            <h2>MultiTasking</h2>
            <input type="text" class="buscar" placeholder="Buscar">
            <span class="material-symbols-outlined add_tarea">add_to_photos</span>
            <div class="img_user"></div>
            <span class="nom_tarea">Nombre de la tarea</span>
            <span class="asignado_spn">Asignado</span>
            <span class="fecha_spn">Fecha de entrega</span>
            <span class="estado_spn">Estado</span>
            <button class="volver_login">Volver al Login</button>
        </header>
        <div class="div_tareas"></div>
        <footer class="footer">
            <img src="../img/logo.png" alt="">
            <h1>Santa catalina Laboure</h1>
            <h2>jemayen@scl.edu.gt</h2>
        </footer>
    `;
    root.appendChild(vent_login);

    if (github) github.remove();
    if (vtn_login) vtn_login.remove();

    let inputBuscar = document.querySelector(".buscar");
    if (inputBuscar) {
        inputBuscar.addEventListener("input", (e) => {
            mostrarTareasFiltradas(e.target.value);
        });
    }

    let btnVolverLogin = document.querySelector(".volver_login");
    if (btnVolverLogin) {
        btnVolverLogin.addEventListener("click", volverAlLogin);
    }
}

function iniciarSesion(usuario) {
    ventana_login();

    let imgUser = document.querySelector(".img_user");
    imgUser.innerHTML = `<img src="${usuario.imgPerfil}" alt="" class="img_u">`;

    mostrarTareas();
    configurarBotonAddTarea();
    configurarBotonMenu();

    localStorage.setItem("sesionActiva", JSON.stringify(usuario));
}

window.addEventListener("load", () => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("sesionActiva"));
    if (usuarioGuardado) {
        iniciarSesion(usuarioGuardado);
    }
});

btn_login.addEventListener("click", () => {
    let txt_user = document.querySelector(".user").value;
    let txt_contra = document.querySelector(".contra").value;

    let lgn_exitoso = usuarios.find(user => user.usuario === txt_user && user.contra === txt_contra);

    if (lgn_exitoso) {
        iniciarSesion(lgn_exitoso);
    } else {
        let txt_error = document.createElement("div");
        txt_error.classList.add("txt_error");
        txt_error.textContent = "La contraseña o el usuario son incorrectos";
        let lgn_2 = document.querySelector(".lgn_2");
        lgn_2.appendChild(txt_error);

        document.querySelector(".user").value = "";
        document.querySelector(".contra").value = "";
    }
});

function ventana_crear_Cuenta() {
    let vent_cr_cuenta = document.createElement("div");
    vent_cr_cuenta.classList.add("vent_cc");
    root.appendChild(vent_cr_cuenta);
}

let txt_cr = document.querySelector(".txt_cr");
if (txt_cr) {
    txt_cr.addEventListener("click", ventana_crear_Cuenta);
}

function volverAlLogin() {
    let ventLogin = document.querySelector(".vent_login");
    if (ventLogin) {
        ventLogin.remove();
    }

    let vtnLogin = document.querySelector(".vtn_login");
    if (vtnLogin) {
        vtnLogin.style.display = 'block';
    }

    localStorage.removeItem("sesionActiva");
}

import { usuarios } from "./Data_users.js";
import { mostrarTareas, configurarBotonAddTarea } from "./agregar_tareas.js";

let root = document.querySelector(".root");
let btn_login = document.querySelector(".btn_login");

function ventana_login() {
    let vent_login = document.createElement("div");
    let github = document.querySelector(".github");
    let vtn_login = document.querySelector(".vtn_login");
    vent_login.classList.add("vent_login");
    vent_login.innerHTML = `
        <header class="header_login">
            <span class="material-symbols-outlined">menu</span>
            <h2>MultiTasking</h2>
            <input type="text" class="buscar" placeholder="Buscar">
            <span class="material-symbols-outlined add_tarea">add_to_photos</span>
            <div class="img_user"></div>
            <span class="nom_tarea">Nombre de la tarea</span>
            <span class="asignado_spn">Asignado</span>
            <span class="fecha_spn">Fecha de entrega</span>
            <span class="estado_spn">Estado</span>
        </header>
        <div class="div_tareas"></div>
    `;
    root.appendChild(vent_login);

    if (github) github.remove();
    if (vtn_login) vtn_login.remove();
}

btn_login.addEventListener("click", () => {
    let txt_user = document.querySelector(".user").value;
    let txt_contra = document.querySelector(".contra").value;

    let lgn_exitoso = usuarios.find(user => user.usuario === txt_user && user.contra === txt_contra);

    if (lgn_exitoso) {
        ventana_login();

        let imgUser = document.querySelector(".img_user");
        imgUser.innerHTML = `<img src="${lgn_exitoso.imgPerfil}" alt="" class="img_u">`;

        // Llama a mostrarTareas después de que la ventana de login esté cargada
        mostrarTareas();

        // Configura el botón para agregar tareas
        configurarBotonAddTarea();
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

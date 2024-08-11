import { usuarios } from "./Data_users.js"
let root = document.querySelector(".root")
let btn_login = document.querySelector(".btn_login")

function ventana_login() {
    let vent_login = document.createElement("div")
    let github = document.querySelector(".github")
    let vtn_login = document.querySelector(".vtn_login")
    vent_login.classList.add("vent_login")
    vent_login.innerHTML = `
    <header class="header_login">
        <span class="material-symbols-outlined">
    menu
    </span>
    <h2>MultiTasking</h2>
    <input type="text" class="buscar" placeholder="Buscar">
    <span class="material-symbols-outlined add_tarea">
        add_to_photos
    </span>
    <div class="img_user">Hola mundo</div>
    </header>
        <div class="nm_tarea"></div>
        <div class="user_asignado"></div>
        <div class="div_entrega"></div>
        <div class="div_estado"></div>
        
    `
    root.appendChild(vent_login)
    github.remove()
    vtn_login.remove()

}
btn_login.addEventListener("click", ()=>{
    let txt_user = document.querySelector(".user").value
    let txt_contra = document.querySelector(".contra").value

    let lgn_exitoso = usuarios.find(user => user.usuario === txt_user && user.contra === txt_contra)

    if (lgn_exitoso) {

        ventana_login()
    } else {
        let txt_error = document.createElement("div")
        txt_error.classList.add("txt_error")
        txt_error.textContent = "La contraseña o el usuario son incorrectos"
        let lgn_2 = document.querySelector(".lgn_2")
        lgn_2.appendChild(txt_error)
        let txt_user = document.querySelector(".user");
        let txt_contra = document.querySelector(".contra");
        txt_user.value = ""
        txt_contra.value = ""
    }
})

function ventana_crear_Cuenta() {
    let vent_cr_cuenta = document.createElement("div")
    vent_cr_cuenta.classList.add("vent_cc")
    root.appendChild(vent_cr_cuenta)
}
let txt_cr = document.querySelector(".txt_cr")
txt_cr.addEventListener("click", ventana_crear_Cuenta)


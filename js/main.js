let root = document.querySelector(".root")
let login_inicio = `
    <a href="https://github.com/gODHyDRaX/MultiTasking" class="github">Github</a>
    <div class="vtn_login"></div>
`
root.innerHTML = login_inicio
let vtn_login = document.querySelector(".vtn_login")
let login_vtn = ` 
    <div class="lgn_1">
        <img src="https://github.com/gODHyDRaX/img_Multitasking/blob/main/google-classroom.png?raw=true" alt="">
    </div>
    <div class="lgn_2">
        <h1>Bienvenido a MultiTasking</h1>
        <h2>Iniciar Secion</h2>
        <input type="text" class="user" placeholder="Usuario o correo">
        <input type="password" class="contra" placeholder="Contraseña">
        <div class="caja_btns">
        <div class="beta">Probar Beta</div>
        <div class="btn_login">Iniciar</div>
        </div>
        <span class="txt_cr">
        Crear cuenta
        </span>
    </div>
    <footer class="footer">
            <img src="../img/logo.png" alt="">
            <h1>Santa catalina Laboure</h1>
            <h2>jemayen@scl.edu.gt</h2>
        </footer>
`
vtn_login.innerHTML = login_vtn




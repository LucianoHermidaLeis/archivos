// inputs del modal ingreso
const loginInputEmail = document.getElementById('login-email')
const loginPassword = document.getElementById('login-password')
const buttonLogin = document.getElementById('button-login-modal')

// mensajes de error del modal ingreso
const loginEmailError = document.getElementById('login-email-error')
const loginPasswordError = document.getElementById('login-password-error')
const buttonLoginError = document.getElementById('login-button-form-error')

loginInputEmail.addEventListener('focusout',()=>{
    if(regexEmail.test(loginInputEmail.value)){
        loginEmailError.style.color = 'green'
        loginEmailError.textContent = 'Email válido'
    }
    else{
        loginEmailError.style.color = 'red'
        loginEmailError.textContent = 'Debe ser de la forma: ejemplo@fi.uba.ar'
    }
})

loginPassword.addEventListener('focusout',()=>{
    if(regexPassword.test(loginPassword.value)){
        loginPasswordError.style.color = 'green'
        loginPasswordError.textContent = 'Contraseña válida'
    }
    else{
        loginPasswordError.style.color = 'red'
        loginPasswordError.textContent = 'Debe tener entre 8 y 20 caracteres, puede contener números, letras y caracteres especiales (@$!%*?&#.)'
    }
})

async function login(){
    let userEmail = loginInputEmail.value
    let userPassword = loginPassword.value
    try{
        const response = await fetch(`${url}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            })
        })    
        if(response.ok){
            const data = await response.json(); // Aquí se recibe el token
            localStorage.setItem('token', data.token); // Guarda el token en el localStorage
    
            buttonLoginError.style.color = 'green'
            buttonLoginError.textContent = 'Ingreso realizado con éxito'
            
            setTimeout(() => {
                console.log('Inicio de sesión exitoso')
                location.reload() // Recarga la página
            }, 1000); // 1 segundo de espera
    
            // oculta los botones de login y muestra el avatar del usuario
            const buttonsLogin = document.querySelectorAll('.button-login-register')
            buttonsLogin.forEach(element => {
                element.style.display = 'none'
            });
    
            const userAvatar = document.getElementById('user-avatar-profile')
            userAvatar.classList.remove('is-inactive')
            userAvatar.addEventListener('click',()=>{
                window.location.href = `user/${userName}`
            })

        } else {
            buttonLoginError.style.color = 'red'
            buttonLoginError.textContent = 'Email o contraseña incorrectos'
        }
    }catch(error){
        console.error('Error:', error)
        buttonLoginError.style.color = 'red'
        buttonLoginError.textContent = 'Error en el servidor'
    }
    
}

// evento click del botón de login
buttonLogin.addEventListener('click',()=>{
    let userEmail = loginInputEmail.value
    let userPassword = loginPassword.value
    console.log(userEmail, userPassword)

    if(regexEmail.test(userEmail) && regexPassword.test(userPassword)){
        login()
    }
    else{
        buttonLoginError.style.color = 'red'
        buttonLoginError.textContent = 'Por favor complete todos los campos correctamente'
    }
})
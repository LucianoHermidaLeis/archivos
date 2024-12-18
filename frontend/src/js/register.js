// inputs del modal de registro
const inputName = document.getElementById('register-name')
const inputLastName = document.getElementById('register-lastname')
const inputEmail = document.getElementById('register-email')
const inputPassword = document.getElementById('register-password')
const inputConfirmPassword = document.getElementById('register-confirm-password')

// errores del modal de registro
const registerNameError = document.getElementById('register-name-error')
const registerLastNameError = document.getElementById('register-lastname-error')
const registerEmailError = document.getElementById('register-email-error')
const registerPasswordError = document.getElementById('register-password-error')
const registerConfirmPasswordError = document.getElementById('register-confirm-password-error')
const buttonRegisterError = document.getElementById('register-button-form-error')

// eventos de los inputs
inputName.addEventListener('focusout',()=>{
    if(regexName.test(inputName.value)){
        registerNameError.style.color = 'green'
        registerNameError.textContent = 'Nombre válido'
    }else
    {
        registerNameError.style.color = 'red'
        registerNameError.textContent = 'Solo se permiten letras y espacios'
    }   
})
inputLastName.addEventListener('focusout',()=>{
    if(regexName.test(inputLastName.value)){
        registerLastNameError.style.color = 'green'
        registerLastNameError.textContent = 'Apellido válido'
    }else
    {
        registerLastNameError.style.color = 'red'
        registerLastNameError.textContent = 'Solo se permiten letras y espacios'
    }   
})
inputEmail.addEventListener('focusout',()=>{
    if(regexEmail.test(inputEmail.value)){
        registerEmailError.style.color = 'green'
        registerEmailError.textContent = 'Correo válido'        
    }
    else{
        registerEmailError.style.color = 'red'
        registerEmailError.textContent = 'Debe ser de la forma: ejemplo@fi.uba.ar'
    }       
})
inputPassword.addEventListener('focusout',()=>{
    if(regexPassword.test(inputPassword.value)){
        registerPasswordError.style.color = 'green'
        registerPasswordError.textContent = 'Contraseña válida'
    }
    else{
        registerPasswordError.style.color = 'red'
        registerPasswordError.textContent = 'Debe tener entre 8 y 20 caracteres, puede contener números, letras y caracteres especiales (@$!%*?&#.)'
    }
})
inputConfirmPassword.addEventListener('focusout',()=>{
    if(inputPassword.value === inputConfirmPassword.value && inputPassword.value !== '' && regexPassword.test(inputPassword.value) ){
        registerConfirmPasswordError.style.color = 'green'
        registerConfirmPasswordError.textContent = 'Contraseña válida'
    }
    else{
        registerConfirmPasswordError.style.color = 'red'
        registerConfirmPasswordError.textContent = 'Las contraseñas no coinciden'
    }
})

// evento del botón del registro modal
const buttonRegister = document.getElementById('button-register-modal');

buttonRegister.addEventListener('click',()=>{
    
    let userName = inputName.value
    let userLastName = inputLastName.value
    let userEmail = inputEmail.value
    let userPassword = inputPassword.value
    let userConfirmPassword = inputConfirmPassword.value

    if(!regexName.test(userName) || !regexName.test(userLastName) || !regexEmail.test(userEmail) || !regexPassword.test(userPassword) || userPassword !== userConfirmPassword){
        buttonRegisterError.style.color = 'red'
        buttonRegisterError.textContent = 'Por favor complete todos los campos correctamente'

    }else{
        fetch(`http://localhost:5000/api/v1/usuarios`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Especifica el tipo de contenido
            },
            body: JSON.stringify(
                {   
                    nickname: "soyejemplo",
                    nombre: userName,
                    apellido: userLastName,
                    signo_zodiacal: "no",
                    carrera: "si",
                    profesor: "camejo",
                    email: userEmail,
                    contrasena: userPassword
                    
                }
            ), // Convierte el objeto a una cadena JSON
        })
        .then(response => {
            if(response.ok){
                buttonRegisterError.style.color = 'green'
                buttonRegisterError.textContent = 'Registro realizado con éxito'
            }
        })
        .then(data => {
            console.log(data)
         })
         // Captura los errores
         .catch(error => {
            console.error("Error: ", error.message)
            buttonRegisterError.style.color = 'red'
            buttonRegisterError.textContent = 'Ocurrió un error al registrar el usuario, por favor intente nuevamente'
        });
    }
})

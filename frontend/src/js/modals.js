//Evento para esperar que el HTML este cargado y evitar errores
document.addEventListener('DOMContentLoaded', () => {

    const modalRegister = document.getElementById('modal-register');
    const modalLogin = document.getElementById('modal-login');

    // Funciones para abrir y cerrar el modal
    function openModal(modal) {
      modal.classList.add('is-active');
    }
    function closeModal(modal) {
      modal.classList.remove('is-active');
    }

    const buttonRegister = document.getElementById('button-register-navbar'); 
    buttonRegister.addEventListener('click', () => {
        openModal(modalRegister);
    });

    const buttonCloseRegister = document.getElementById('button-close-modal-register');    
    buttonCloseRegister.addEventListener('click', () => {
        closeModal(modalRegister);    
    })

    const buttonLogin = document.getElementById('button-login-navbar');
    buttonLogin.addEventListener('click', () => {
        openModal(modalLogin);
    });

    const buttonCloseLogin = document.getElementById('button-close-modal-login');
    console.log(buttonCloseLogin)
    buttonCloseLogin.addEventListener('click',()=>{
        closeModal(modalLogin)
    })
});

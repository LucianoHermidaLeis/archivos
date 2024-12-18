const userNickname = document.getElementById('user-nickname')
const userFirstName = document.getElementById('user-firstname')
const userLastName = document.getElementById('user-lastname')
const userUniversityCareer = document.getElementById('user-university-career')
const userSignZodiac = document.getElementById('user-sign-zodiac')
const userEmail = document.getElementById('user-email')
const userPassword = document.getElementById('user-password')

let nickname = null

fetch(`${url_users}` + nickname,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(user => {
    userNickname.textContent = user.nickname
    userFirstName.textContent = user.nombre
    userLastName.textContent = user.apellido
    userUniversityCareer.textContent = user.carrera
    userSignZodiac.textContent = user.signo_zodiacal
    userEmail.textContent = user.email
})

// Funciones para abrir y cerrar el modal
function openModal(modal) {
    modal.classList.add('is-active');
}
function closeModal(modal) {
    modal.classList.remove('is-active');
}

const modalEditAll = document.getElementById('modal-edit-all')
const editButton = document.getElementById('edit-button')

editButton.addEventListener('click',()=>{
    openModal(modalEditAll)
    const buttonCloseModalEditAll = document.getElementById('button-close-modal-edit-all')
    buttonCloseModalEditAll.addEventListener('click',()=>{
        closeModal(modalEditAll)
    })
})

const modalEditText = document.getElementById('modal-edit-text')

const editUserIcons = document.querySelectorAll('.edit-user-icon')
const label = document.getElementById('label-edit-text')
const buttonConfirmEdit = document.getElementById('button-confirm-edit')

// evento click de los iconos de editar usuario
editUserIcons.forEach(icon => {
    icon.addEventListener('click',()=>{
        openModal(modalEditText)
        let parentIcon = icon.parentElement
        let parentChild = parentIcon.children[0]
        let textContent = parentChild.textContent
        label.textContent = 'Editar ' + textContent
        
        const buttonCloseModalEditText = document.getElementById('button-close-modal-edit-text')

        buttonCloseModalEditText.addEventListener('click',()=>{
            closeModal(modalEditText)
        })
        const inputEdit = document.getElementById('input-edit')

        buttonConfirmEdit.addEventListener('click',()=>{
            fetch(`${url_users}` + nickname,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    valor : inputEdit.value
                })
            })
        })
    })
})

const modalDelete = document.getElementById('modal-delete')
const deleteButton = document.getElementById('delete-button')
// evento click del botón de eliminar
deleteButton.addEventListener('click',()=>{
    openModal(modalDelete)

    const labelDelete = document.getElementById('label-delete')
    labelDelete.textContent = '¿Estás seguro de eliminar tu cuenta?'
    // evento click del botón de cerrar modal
    const buttonCloseModalDelete = document.getElementById('button-close-modal-delete')
    buttonCloseModalDelete.addEventListener('click',()=>{
        closeModal(modalDelete)
    })
})

// evento click del botón de confirmar eliminar
const buttonConfirmDelete = document.getElementById('button-confirm-delete')

buttonConfirmDelete.addEventListener('click',()=>{
    fetch(`${url_users}` + nickname,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    window.location.href = '../../index.html'
})
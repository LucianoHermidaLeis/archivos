//función para ver los posteos
function readPosts() {
    fetch('http://localhost:5000/api/v1/posteos')
    .then(response => response.json())
    .then(posts => {

        console.log(response)
        // para tener los ultimos 5 posteos
        const lastFivePosts = posts.slice(-5); 
        
        let postList = document.getElementById("posts-data");
       
        lastFivePosts.forEach(post => { 
            let div = document.createElement("div");  
            div.innerHTML = `
            <div class="post"> 
                <div class="post-head">
                    <div class="user-info">
                        <img class="user-avatar" src="assets/usuario.png" alt="Imagen de usuario"/>
                        ${post.autorNickname}
                    </div>
                    <div class="post-topic">
                        <span>${post.topico}</span>
                    </div>
                </div>
                <strong>${post.texto}</strong>
                <div class="like-comment-container">
                    <span class="heart" onclick="toggleLike(this, ${post.id})">❤</span>
                    <span id="like-count-${post.id}" class="like-count">${post.me_gustas}</span> 
                    <input type="text" class="comment-input" placeholder="Añadir un comentario..." />
                </div>
            </div>`; 

            postList.appendChild(div); 
            postList.appendChild(loginPrompt);
        });
    })
    .catch(error => {
        console.error('Error al cargar los posteos:', error);
    });
}

    let loginPrompt = document.createElement("div");
    loginPrompt.classList.add("login-prompt");
    loginPrompt.innerHTML = `
      <div>
        Para seguir viendo más posteos, por favor inicia sesión.
      </div>
    `;

readPosts();




function toggleLike(element, postId) {
    let likeCountElement = document.getElementById(`like-count-${postId}`);
    let currentLikes = parseInt(likeCountElement.textContent);
  
    if (element.classList.contains("liked")) {
      likeCountElement.textContent = currentLikes - 1;
    } else {
      likeCountElement.textContent = currentLikes + 1;
    }
  
    element.classList.toggle("liked");
}  



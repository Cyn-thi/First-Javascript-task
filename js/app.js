let postWrapper = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form');
let title = document.querySelector('#title');
let body = document.querySelector('#body');

let postContainer = []


function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json() )
    .then((data) => {
        //console.log(postContainer)

        postContainer = data

        let postHolder = '';
        postContainer.forEach(post => {
            postHolder += `
            <div class="col-md-6 col-lg-4 mb-3 h-100">
                <div class="card">
                  <div class="card-body">
                    <p>${post.id}</p>
                    <h6 class="post-title">${post.title}</h6>
                    <p class="post-body">${post.body}</p>
                    <div class="d-flex">
                      <button class="btn btn-primary" id="view-btn" onclick="openSingle(${post.id})">View</button>
                      <button class="btn btn-primary ms-3" onclick="updatePost(${post.id})">Update</button>
                      <button class="btn btn-danger ms-3" onclick="deletePost"(${post.id})">Delete</button>
                    </div>
                  </div>
                </div>
              </div>

            `
        });
        postWrapper.innerHTML = postHolder;
    })

    

}

getPosts();

postForm.addEventListener('submit', (e)=>{
   
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body:JSON.stringify({
            title: title.value,
            body: body.value,
            userID: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((data)=> {
        console.log(data)
        postContainer.unshift(data)
        console.log(postContainer)
        let postHolder = '';
        postContainer.forEach(post => {
            postHolder += `
            <div class="col-md-6 col-lg-4 mb-3 h-100">
                <div class="card">
                  <div class="card-body">
                    <p>${post.id}</p>
                    <h6 class="post-title">${post.title}</h6>
                    <p class="post-body">${post.body}</p>
                    <div class="d-flex">
                      <button class="btn btn-primary" id="view-btn" onclick="openSingle(${post.id})">View</button>
                      <button class="btn btn-primary ms-3" onclick="updatePost(${post.id})">Update</button>
                      <button class="btn btn-danger ms-3" onclick="deletePost"(${post.id})">Delete</button>
                    </div>
                  </div>
                </div>
              </div>

            `
        })
        
        postWrapper.innerHTML = postHolder;
    })
}
  


)

function updatePost(id) {
  console.log(id)
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      title: title.value,
      body: body.value,
      userId: 2,

    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((data) => {

      console.log(data)
      let postTitles = document.querySelectorAll('.post-title')
      let postBody = document.querySelectorAll('.post-body')
      console.log(postTitles)
      postTitles.forEach((postTitle, index) => {
        if(index + 1 === id) {
          postTitle.innerHTML = data.title
        }

      })

      postBody.forEach((postBody, index) => {
        if(index + 1 === id) {
          postBody.innerHTML = data.body
        }

      })

    });
}

function openSingle(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => response.json())
    .then((data) => {
       console.log(data)
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'view.html'
    })
       
  }
  


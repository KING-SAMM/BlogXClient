const btn = document.querySelector('#getAllPosts');
const homeBtn = document.querySelector('#home');
btn.addEventListener('click', fetchPosts);
homeBtn.addEventListener('click', homeContent);

function homeContent() {
    const homeContent = `
    <header class="bg-info">
        <h1 class="display-4 text-center text-white p-4">BlogX Client</h1>
    </header>
    <div class="adverts"></div>
    <div class="container">
        <div class="info">
            <p>Get posts from the BlogX API</p>
            <p>Create your own posts. Add beautiful images to the posts you create. Update posts you have created.</p>
        </div>
    </div>
    <footer class="bg-light mt-5">
        <h3 class="text-center pt-4 pb-5">BlogX Client</h3>
    </footer>
    `;

    document.querySelector('#output').innerHTML = homeContent;
}


async function fetchOnePost(id) {
    const res = await fetch("http://localhost/blogX/api/post/read_single.php?id=" + id);

    const data = await res.json();

    // Output data to browser
    let singlePost = "";
    
        singlePost += `
            <header class="bg-info">
                <h1 class="display-4 text-center text-white p-4">${data.title}</h1>
            </header>
            <div class="adverts"></div>
            <div class="container">
                <div class="p-4">    
                    <img src="${data.imageUrl}" alt="${data.title}" title="${data.title}"" />

                    <p style="font-size: 16px;">By: ${data.author} | ${data.category_name}</p>
                
                    <p style="font-size: 20px;">${data.body}</p>
                </div>
            </div>
        `;

        document.querySelector('#output').innerHTML = singlePost;
}

async function fetchPosts() {
    let res = await fetch("http://localhost/blogX/api/post/read.php");
    
    res = await res.json();

    // The posts are coming in as an array in a 'data' property
    // Assign this to a single data variable
    const data = res.data;

    console.log(data);

    // Output data to browser
    let posts = "";
    posts += `
        <header class="bg-info">
            <h1 class="display-4 text-center text-white p-4">Posts</h1>
        </header>
        <div class="adverts"></div>
        <div class="container"> 
    `;
    data.forEach((post, index) => {
        posts += `
            <div class="card" style="max-width: 600px; margin-left: 50px;"  onclick="fetchOnePost(${post.id})">
            
                <h4 class="card__clearfix pl-5">
                    ${post.id}.  ${post.title}
                </h4>
                <img src="${post.imageUrl}" alt="${post.title}" title="${post.title}" width="80" height="80"  margin-left: 10px;" />
                
                <button id="readMore" class="btn btn-info" width="40">Read More</button>
            </div>
        `;
    });

    posts +=  `</div>`; // End container
    posts += `
        <footer class="bg-light mt-5">
            <h3 class="text-center pt-4 pb-5">BlogX Client</h3>
        </footer>
    `;
    document.querySelector('#output').innerHTML = posts;
}
 
const btn = document.querySelector('#getAllPosts');
btn.addEventListener('click', fetchPosts);


async function fetchOnePost(id) {
    const res = await fetch("http://localhost/blogX/api/post/read_single.php?id=" + id);

    const data = await res.json();

    // Output data to browser
    let singlePost = "";
    
        singlePost += `
        <div class="card p-4">
            <h2>${data.id}.  ${data.title}</h2>
            
            <img src="${data.imageUrl}" alt="${data.title}" title="${data.title}"" />

            <h4>Details</h4>
            <p style="font-size: 14px;">By: ${data.author} | ${data.category_name}</p>
           
            <p style="font-size: 20px;">${data.body}</p>
        </div>
        `;

        document.querySelector('#output').innerHTML = singlePost;
        // document.body.style.listStyleType = "decimal";
    

    // Log data to console
    // console.log(data);
}

async function fetchPosts() {
    // let res = [];
    let res = await fetch("http://localhost/blogX/api/post/read.php");
    
    res = await res.json();

    // The posts are coming in as an array in a 'data' property
    // Assign this to a single data variable
    const data = res.data;

    console.log(data);

    // Output data to browser
    let output = "";
    data.forEach((post, index) => {
        output += `
        <div class="card" style="max-width: 600px;"  onclick="fetchOnePost(${post.id})">
        
            <h4 class="card__clearfix pl-5">
                ${post.id}.  ${post.title}
            </h4>
            <img src="${post.imageUrl}" alt="${post.title}" title="${post.title}" width="80" height="80"  margin-left: 10px;" />
            
            <button id="readMore" class="btn btn-info" width="40">Read More</button>
        </div>
        `;

        let id = `${post.id}`

        // console.log(response.length)   

        document.querySelector('#output').innerHTML = output;
        // document.body.style.listStyleType = "decimal";
        
    })
}
 
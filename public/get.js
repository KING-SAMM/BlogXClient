const btn = document.querySelector('#getAllPosts');
const homeBtn = document.querySelector('#home');
btn.addEventListener('click', fetchPosts);
homeBtn.addEventListener('click', homeContent);


// const editPostBtn = document.querySelector('#editPost');
// editPostBtn.addEventListener('click', fetchPostToEdit(`${data.id}`));


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

                    <button type="button" id="editPost" name="editPost"  class="btn btn-primary" onclick="fetchPostToEdit(${data.id})">Edit</button>
                    <button type="button" name="delete" class="btn btn-danger">Delete</button>
                </div>
            </div>
        `;

        console.log(`${data.id}`);




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
            <div class="card" style="max-width: 600px; margin-left: 50px;">
            
                <h4 class="card__clearfix pl-5">
                    ${post.id}.  ${post.title}
                </h4>
                <img src="${post.imageUrl}" alt="${post.title}" title="${post.title}" width="80" height="80"  margin-left: 10px;" />
                
                <button id="readMore" class="btn btn-info" width="40" onclick="fetchOnePost(${post.id})">Read More</button>
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
 





async function fetchPostToEdit(id) {
    const res = await fetch("http://localhost/blogX/api/post/read_single.php?id=" + id);

    const editData = await res.json();

    // Output editData to browser
    // let editPostContent = "";

    let editPostContent = `
    <header class="bg-info">
        <h1 class="display-4 text-center text-white p-4">Edit Post</h1>
    </header>
    <div class="adverts"></div>
    <div class="container">
        <div class="info">
            <span id="msg-success" class="text-info"></span>
            <span id="msg-error" class="text-danger"></span>
            <form action="" class="edit-form">
                <div class="form-group mt-2">
                    <label for="title">ID</label>
                    <input type="number" id="id" name="id" class="form-control" value="${editData.id}" readonly>
                </div>
                <div class="form-group mt-2">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" class="form-control" value="${editData.title}" required>
                </div>
                <div class="form-group mt-2">
                    <label for="body">Body</label>
                    <textarea type="text" id="body" rows="8" name="body" class="form-control" required>${editData.body}</textarea>
                </div>
                <div class="form-group mt-2">
                    <label for="author">Author</label>
                    <input type="text" id="author" name="author" class="form-control" value="${editData.author}" required>
                </div>
                <div class="form-group mt-2">
                    <label for="category_id">Category</label>
                    <select name="category_id" id="category_id" class="form-control">
                        <option value="1">Technology</option>
                        <option value="2">Gaming</option>
                        <option value="3">Auto</option>
                        <option value="4">Entertainment</option>
                        <option value="5">Books</option>
                    </select>
                </div>
                <div class="form-group mt-2">
                    <button type="submit" id="submit" name="submit" class="btn btn-primary form-control">Save</button>
                </div>
            </form>
            <!--<<div class="results">
                <h2 class="results__heading">Form Data</h2>
                <pre class="results__display-wrapper"><code class="results__display"></code></pre>
            </div>>-->
        </div>
    </div>
    <footer class="bg-light mt-5">
        <h3 class="text-center pt-4 pb-5">BlogX Client</h3>
    </footer>
    `;

    document.querySelector('#output').innerHTML = editPostContent;





    /**
     * Retrieves input data from a form and returns it as a JSON object.
     * @param  {HTMLFormControlsCollection} elements  the form elements
     * @return {Object}                               form data as an object literal
    */
     const formToJSON = (elements) => 
     [].reduce.call(
         elements,
         (data, element) => {
             // Make sure the element has the required properties.
             if (isValidElement(element)) {
                 data[element.name] = element.value;
             }
 
             return data;
         },
         {},         
     );
 
     /**
      * Checks that an element has a non-empty `name` and `value` property.
      * @param  {Element} element  the element to check
      * @return {Bool}             true if the element is an input, false if not
      */
     const isValidElement = (element) => {
         return element.name && element.value;
     };
 
 
 
 
     /**
      * A handler function to prevent default submission and run our custom script.
      * @param  {Event} event  the submit event triggered by the user
      * @return {void}
      */
     const handleEditFormSubmit = (event) => {
         // Stop the form from submitting since we’re handling that with AJAX.
         event.preventDefault();
     
         // Call our function to get the form data.
         const data = formToJSON(form.elements);
     
         // Demo only: print the form data onscreen as a formatted JSON object.
        //  const dataContainer = document.getElementsByClassName('results__display')[0];
     
         // Use `JSON.stringify()` to make the output valid, human-readable JSON.
        //  dataContainer.textContent = JSON.stringify(data, null, '  ');
         let json_data = JSON.stringify(data, null, '  ');
         
         console.log(json_data)
     
         // Send the form data off to the API (server)
         request = new XMLHttpRequest()
         request.onreadystatechange = respond;
         request.open("PUT", "http://localhost/blogX/api/post/update.php", true)
         request.setRequestHeader("Content-type", "application/json")
         request.send(json_data)
 
         // Response from server 
         function respond() {
             if (request.readyState == 4 && request.status == 200) {
                 const resp = JSON.parse(request.response);
                 // console.log(resp.message);
                 // console.log(resp.error);
 
                 if(!resp.error)
                 {
                     document.getElementById('msg-success').innerHTML = resp.message;
                 }
                 else 
                 {
                     document.getElementById('msg-error').innerHTML = resp.error;
                 }
 
             }
         }
     };
 
     const form = document.getElementsByClassName('edit-form')[0];
     form.addEventListener('submit', handleEditFormSubmit);
    
}


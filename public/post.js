const newPostBtn = document.querySelector('#newPost');
newPostBtn.addEventListener('click', newPost);


function newPost() {
    const newPostContent = `
    <header class="bg-info">
        <h1 class="display-4 text-center text-white p-4">Add New Post</h1>
    </header>
    <div class="adverts"></div>
    <div class="container">
        <div class="info">
            <span id="msg-success" class="text-dark"></span>
            <span id="msg-error" class="text-danger"></span>
            <form action="" method="post" class="contact-form w-75">
                <div class="form-group mt-2">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" class="form-control" required>
                </div>
                <div class="form-group mt-2">
                    <label for="body">Body</label>
                    <textarea type="text" id="body" name="body" class="form-control" rows="8"></textarea>
                </div>
                <div class="form-group mt-2">
                    <label for="author">Author</label>
                    <input type="text" id="author" name="author" class="form-control" required>
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
                <div class="form-group mt-4 w-25">
                    <button type="submit" id="submit" name="submit" class="btn btn-primary form-control">Create</button>
                </div>
            </form>
            <!--<div class="results">
                <h2 class="results__heading">Form Data</h2>
                <pre class="results__display-wrapper"><code class="results__display"></code></pre>
            </div>-->
        </div>
    </div>
    <footer class="bg-light mt-5">
        <h3 class="text-center pt-4 pb-5">BlogX Client</h3>
    </footer>
    `;

    document.querySelector('#output').innerHTML = newPostContent;



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
    const handleFormSubmit = (event) => {
        // Stop the form from submitting since we’re handling that with AJAX.
        event.preventDefault();
    
        // Call our function to get the form data.
        const data = formToJSON(form.elements);
    
        // Demo only: print the form data onscreen as a formatted JSON object.
        const dataContainer = document.getElementsByClassName('results__display')[0];
    
        // Use `JSON.stringify()` to make the output valid, human-readable JSON.
        // dataContainer.textContent = JSON.stringify(data, null, '  ');
        let json_data = JSON.stringify(data, null, '  ');

    
        // Send the form data off to the API (server)
        request = new XMLHttpRequest()
        request.onreadystatechange = respond;
        request.open("POST", "http://localhost/blogX/api/post/create.php", true)
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

    const form = document.getElementsByClassName('contact-form')[0];
    form.addEventListener('submit', handleFormSubmit);
}


function init() {
    var user_email = '';
    firebase.auth().onAuthStateChanged(function(user) {
        var menu = document.getElementById('dynamic-menu');
        // Check user login
        if (user) {
            user_email = user.email;
            menu.innerHTML = "<span class='dropdown-item'>" + user.email + "</span><span class='dropdown-item' id='logout-btn'>Logout</span>";
            // TODO 5: Complete logout button event
            //     Steps:
            //     1. Add a listener to logout button 
            //     2. Show alert when logout success or error (use "then & catch" syntax)
            var logoutBtn = document.getElementById('logout-btn');
            logoutBtn.addEventListener('click', function() {
                firebase.auth().signOut()
                    .then(function() {
                        create_alert('success', 'Logout successful!');
                    })
                    .catch(function(error) {
                        create_alert('error', error.message);
                    });
            });

        } else {
            // It won't show any post if not login
            menu.innerHTML = "<a class='dropdown-item' href='signin.html'>Login</a>";
            document.getElementById('post_list').innerHTML = "";
        }
    });

    var post_btn = document.getElementById('post_btn');
    var post_txt = document.getElementById('comment');
    

    post_btn.addEventListener('click', function() {
        if (post_txt.value != "") {
            // TODO 6: Push the post to database's "com_list" node
            //     Steps:
            //     1. Get the reference of "com_list"
            //     2. Push post_data to database's "com_list" node
            //     3. Clear text field
          
            // Get the reference to the database
            const db = firebase.getDatabase();
            // Construct the data object to be pushed
            const post_data = {
                data: post_txt.value,
                email: user_email
            };
            // Generate a unique key for the new post
            const newPostKey = push(child(ref(db), 'com_list')).key;
            // Construct the updates object with the path and the data
            const updates = {};
            updates['/com_list/' + newPostKey] = post_data;
            post_txt.value = '';
            // Use the update() function to write the new post's data to the database
            // db.ref().update(updates)
            //     .then(function() {
            //         // Clear text field after successful write
            //         post_txt.value = '';
            //     })
            //     .catch(function(error) {
            //         // Handle errors
            //         console.error("Error writing new post: ", error);
            //     });
        }
    });

    // List for store posts html
    var total_post = []; 
    // The html code for post
    var str_before_username = "<div class='my-3 p-3 bg-white rounded box-shadow'><h6 class='border-bottom border-gray pb-2 mb-0'>Recent updates</h6><div class='media text-muted pt-3'><img src='img/test.svg' alt='' class='mr-2 rounded' style='height:32px; width:32px;'><p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'><strong class='d-block text-gray-dark'>";
    var str_after_content = "</p></div></div>\n";

    // show_post()
    function show_post(post_data){
        total_post[total_post.length] = str_before_username + post_data.email + "</strong>" + post_data.data + str_after_content
        document.getElementById('post_list').innerHTML = total_post.join('');
    }

    // TODO 7: Show all posts on webpage including history posts and new posts.
    //     Steps:
    //     1. Get the reference of "com_list"
    //     2. Read user email and post data from database's "com_list" node
    //     3. Show the posts on webpage with show_post() function above
    //     Hint: Use on() with 'child_added' EventType. This event will be triggered once for each initial child at this location,
    //     and it will be triggered again every time a new child is added. So it can handle both past posts and new posts.
    //     https://firebase.google.com/docs/reference/node/firebase.database.Reference#on
    var postRef = firebase.database().ref('com_list');
    postRef.on('child_added', function(snapshot, prevChildKey) {
        var post_data = snapshot.val();
        show_post(post_data);
    });


}

window.onload = function() {
    init();
};
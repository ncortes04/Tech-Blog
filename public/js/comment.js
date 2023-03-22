
async function commentFormHandler(event) {
    event.preventDefault();
    const description = document.querySelector('#commentDescription').value.trim();
console.log(description)

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    if (description) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                description,
                post_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            console.log("success")
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById('submitBtn').addEventListener('click', commentFormHandler)
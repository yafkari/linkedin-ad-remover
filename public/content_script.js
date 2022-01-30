async function removePromotedPosts() {
    var key = 'linkedin-remove-promoted';
    const value = await chrome.storage.local.get(key);
    var isEmpty = Object.keys(value).length === 0;

    if (isEmpty || (!isEmpty && value[key] === true)) {
        var nodes = document.getElementsByClassName('t-12 t-normal t-black--light job-card-container__footer-item');

        Array.from(nodes).forEach(element => {
            element.parentNode.parentNode.remove();
        })
    }
}

removePromotedPosts();
document.addEventListener('DOMNodeInserted', removePromotedPosts);

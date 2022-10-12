async function removePromotedPosts() {
    var key = 'linkedin-remove-promoted';
    const value = await chrome.storage.local.get(key);
    var isEmpty = Object.keys(value).length === 0;

    if (isEmpty || (!isEmpty && value[key] === true)) {
        var nodes = document.getElementsByClassName('job-card-container__footer-item inline-flex align-items-center');

        Array.from(nodes).filter(node => !node.classList.contains('job-card-container__apply-method')).forEach(element => {
            element.parentNode.parentNode.parentNode.parentNode.remove();
        })
    }
}

removePromotedPosts();
document.addEventListener('DOMNodeInserted', removePromotedPosts);

const key = 'linkedin-remove-promoted';

async function removePromotedPosts() {
    const value = await chrome.storage.sync.get(key);
    if (!value[key]) return;

    var nodes = document.getElementsByClassName('t-12 t-normal t-black--light job-card-container__footer-item');

    Array.from(nodes).forEach(element => {
        element.parentNode.parentNode.remove();
    })
}

document.addEventListener('DOMNodeInserted', removePromotedPosts);

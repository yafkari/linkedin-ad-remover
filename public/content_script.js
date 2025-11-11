function hasNumber(str) { return /\d/.test(str) }

async function removePromotedPosts() {
    var key = 'linkedin-remove-promoted';
    const value = await chrome.storage.local.get(key);
    var isEmpty = Object.keys(value).length === 0;

    if (isEmpty || (!isEmpty && value[key] === true)) {
        // Find all footer items that contain "Promoted"
        var nodes = document.querySelectorAll('.job-card-container__footer-item');

        Array.from(nodes)
            .filter(node => {
                // Check if the node or its children contain "Promoted"
                const text = node.textContent || node.innerText || '';
                return text.includes('Promoted');
            })
            .forEach(footerItem => {
                // Find the job card container by traversing up the DOM tree
                let current = footerItem;
                let jobCardContainer = null;

                // Traverse up to find the job-card-container
                while (current && current !== document.body) {
                    if (current.classList && current.classList.contains('job-card-container')) {
                        jobCardContainer = current;
                        break;
                    }
                    current = current.parentElement;
                }

                // Remove the entire job card if found
                if (jobCardContainer) {
                    jobCardContainer.remove();
                }
            });
    }
}

// Use MutationObserver instead of deprecated DOMNodeInserted
const observer = new MutationObserver(() => {
    removePromotedPosts();
});

// Start observing when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        removePromotedPosts();
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
} else {
    removePromotedPosts();
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

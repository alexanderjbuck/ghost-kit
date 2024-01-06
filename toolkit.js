/**
 * An extended toolkit for ghost sites.  Use at your own risk.
 * Go to your ghost site, and paste this file in your javascript console.
 * Run the functions as needed on the appropriate page.
 * Repeated use may exceed the limits of the server and will result in a 429 error.
 * Alexander Buck
 */

/**
 * Bulk delete articles on current page.  Deletion is limited by quantity.
 * Run this when you have are viewing the list of posts you want to delete from.
 * bulkDeleteAll(10) will delete 10 articles
 */
function bulkDeleteAll(limit) {
	bulkDeleteByFilter(limit, p => true)
}

/**
 * Bulk delete articles on current page.  Deletion is limited by title and quantity.
 * Run this when you have are viewing the list of posts you want to delete from.
 * bulkDeleteByTitle("Title", 10) will delete 10 articles with the title "Title"
 */
function bulkDeleteByTitle(limit, title) {
	bulkDeleteByFilter(limit, p => postTitle(p) === title)
}

function bulkDeleteByFilter(limit, filter) {
	Array.from(document.getElementsByClassName("gh-post-list-plain-status"))
      .filter(filter)
      .filter((p,i) => i < limit)
      .forEach(p => {
        let attribs = p.attributes;
        let id = attribs["data-test-post-id"].value;
        let deleteUri = "https://navscout.ghost.io/ghost/api/admin/posts/?filter=id%3A%5B%27" + id + "%27%5D";
        fetch(deleteUri,{"method":"DELETE"})
      })
}

function postTitle(post) {
	return post.getElementsByClassName("gh-content-entry-title")[0].innerText;
}

/**
 * An extended toolkit for ghost sites.  Use at your own risk.
 * Go to your ghost site, and paste this file in your javascript console.
 * Run the functions as needed on the appropriate page.
 * Alexander Buck
 */

/**
 * Bulk delete articles on current page.  Deletion is limited by title and quantity.
 * Run this when you have are viewing the list of posts you want to delete from.
 * massDelete("Title", 10) will delete 10 articles with the title "Title"
 */
function bulkDeleteByTitle(title, limit) {
	Array.from(document.getElementsByClassName("gh-post-list-plain-status"))
      .filter(p => p.innerText.indexOf(title) != -1)
      .filter((p,i) => i < limit)
      .forEach(p => {
        let attribs = p.attributes;
        let id = attribs["data-test-post-id"].value;
        let deleteUri = "https://navscout.ghost.io/ghost/api/admin/posts/?filter=id%3A%5B%27" + id + "%27%5D";
        fetch(deleteUri,{"method":"DELETE"})
      })
}

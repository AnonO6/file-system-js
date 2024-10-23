/**
 * Recursive helper function to find the parent folder of an item.
 *
 * @param {Folder} currentFolder
 * @param {string} name
 * @returns {Folder|null}
 */
function findParentFolder(currentFolder, name) {
  if (currentFolder.getItem(name)) {
    return currentFolder;
  }

  for (let item of currentFolder.items) {
    if (item.isFolder) {
      const result = findParentFolder(item, name);
      if (result) {
        return result;
      }
    }
  }
  return null;
}
module.exports = findParentFolder;

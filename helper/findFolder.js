/**
 * Recursive helper function to find a folder.
 *
 * @param {Folder} currentFolder
 * @param {string} name
 * @returns {Folder|null}
 */
function findFolder(currentFolder, name) {
  if (currentFolder.name === name) {
    return currentFolder;
  }

  for (let item of currentFolder.items) {
    if (item.isFolder) {
      const result = findFolder(item, name);
      if (result) {
        return result;
      }
    }
  }
  return null;
}
module.exports = findFolder;

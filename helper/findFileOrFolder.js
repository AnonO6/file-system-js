/**
 * Recursive helper function to find a file or folder.
 *
 * @param {Folder} currentFolder
 * @param {string} name
 * @returns {FileSystemItem|null}
 */
function findFileOrFolder(currentFolder, name) {
  if (currentFolder.getItem(name)) {
    return currentFolder.getItem(name);
  }

  for (let item of currentFolder.items) {
    if (item.isFolder) {
      const result = findFileOrFolder(item, name);
      if (result) {
        return result;
      }
    }
  }
  return null;
}
module.exports = findFileOrFolder;

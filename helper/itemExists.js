/**
 * Check if an item with the same name exists in the folder.
 *
 * @param {Folder} folder
 * @param {string} itemName
 * @returns {boolean}
 */
function itemExists(folder, itemName) {
  return folder.items.some(
    (item) => item.name.toLowerCase() === itemName.toLowerCase()
  );
}
module.exports = itemExists;

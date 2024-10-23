"use strict";

const { File } = require("./models/file");
const { Folder } = require("./models/folder");
const findFileOrFolder = require("./helper/findFileOrFolder");
const findFolder = require("./helper/findFolder");
const itemExists = require("./helper/itemExists");
const findParentFolder = require("./helper/findParentFolder");

class FileSystemManager {
  /**
   *
   * @param {string} rootName
   */
  constructor(rootName) {
    this.root = new Folder(rootName);
  }

  /**
   *
   * @param {string} parentName
   * @param {string} itemName
   * @param {boolean} isFolder
   */
  addFileOrFolder(parentName, itemName, isFolder) {
    const parentFolder = findFolder(this.root, parentName);
    if (parentFolder) {
      // Check for duplicates before adding
      if (!itemExists(parentFolder, itemName)) {
        if (isFolder) {
          parentFolder.addItem(new Folder(itemName));
        } else {
          parentFolder.addItem(new File(itemName));
        }
      }
    }
  }

  /**
   *
   * @param {string} itemName
   * @param {string} destinationFolderName
   */
  moveFileOrFolder(itemName, destinationFolderName) {
    const item = findFileOrFolder(this.root, itemName);
    const destinationFolder = findFolder(this.root, destinationFolderName);
    if (item && destinationFolder) {
      const parentFolder = findParentFolder(this.root, itemName);
      if (parentFolder) {
        parentFolder.removeItem(item);
        destinationFolder.addItem(item);
      }
    }
  }

  /**
   *
   * @param {string} folderName
   * @returns {string[]}
   */
  listContents(folderName) {
    const folder = findFolder(this.root, folderName);
    return folder ? folder.listItems() : [];
  }

  /**
   *
   * @param {string} folderName
   * @returns {string}
   */
  listDirectoryStructure(folderName = this.root.name, indent = "") {
    const folder = findFolder(this.root, folderName);
    if (folder) {
      let structure = `${indent}+ ${folder.getName()}\n`;
      folder.items.forEach((item) => {
        if (item.isFolder) {
          structure += this.listDirectoryStructure(item.name, indent + "  ");
        } else {
          structure += `${indent}  - ${item.getName()}\n`;
        }
      });
      return structure;
    }
    return "";
  }

  /**
   *
   * @param {string} folderName
   * @param {string} fileName
   * @returns {string|null}
   */
  searchFileExactMatch(folderName, fileName) {
    const folder = findFolder(this.root, folderName);
    if (folder) {
      const item = folder.getItem(fileName);
      return item ? item.name : null;
    }
    return null;
  }

  /**
   *
   * @param {string} folderName
   * @param {string} pattern
   * @returns {string[]}
   */
  searchFileLikeMatch(folderName, pattern) {
    const folder = findFolder(this.root, folderName);
    const results = [];
    if (folder) {
      const lowerCasePattern = pattern.toLowerCase(); // Convert pattern to lowercase for case insensitivity

      // Helper function to search recursively
      const recursiveSearch = (currentFolder) => {
        currentFolder.items.forEach((item) => {
          if (item.isFolder) {
            recursiveSearch(item); // Search in subfolder
          } else if (item.name.toLowerCase().includes(lowerCasePattern)) {
            results.push(item.name); // Add matching file to results
          }
        });
      };

      recursiveSearch(folder); // Start recursive search from the specified folder
    }
    return results;
  }
}

module.exports = FileSystemManager;

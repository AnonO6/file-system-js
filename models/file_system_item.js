"use strict";

class FileSystemItem {
  /**
   *
   * @param {string} name
   * @param {boolean} isFolder
   */
  constructor(name, isFolder) {
    this.name = name;
    this.isFolder = isFolder;
  }

  getName() {
    return this.name;
  }
}

module.exports.FileSystemItem = FileSystemItem;

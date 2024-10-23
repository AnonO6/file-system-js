"use strict";

const { FileSystemItem } = require("./file_system_item");

class Folder extends FileSystemItem {
  /**
   *
   * @param {string} name
   */
  constructor(name) {
    super(name, true);
    this.items = [];
  }

  /**
   *
   * @param {FileSystemItem} fsItem
   */
  addItem(fsItem) {
    if (!fsItem.name) {
      return;
    }
    this.items.push(fsItem);
  }

  /**
   *
   * @param {FileSystemItem} fsItem
   */
  removeItem(fsItem) {
    this.items = this.items.filter((item) => item.name !== fsItem.name);
  }

  listItems() {
    return this.items.map((item) => item.name);
  }

  /**
   *
   * @param {string} name
   * @returns {FileSystemItem|null}
   */
  getItem(name) {
    for (let fsItem of this.items) {
      if (fsItem.name === name) {
        return fsItem;
      }
    }
    return null;
  }
}

module.exports.Folder = Folder;

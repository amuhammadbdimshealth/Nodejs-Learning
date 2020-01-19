// const fs = require("fs");
// const path = require("path");
const db = require("../util/database");
const Cart = require("./cart");

/** PRODUCT CLASS
 * constructor:  takes the title as argument.
 * save: writes the new product list to the Database
 */
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  /**
   * @param type - "insert" to insert new row, "update" to update existing row
   */
  save(type = "insert") {
    let sql, promise;
    if (type == "insert") {
      sql = `INSERT INTO products(title, imageUrl, description, price) 
      VALUES(?, ?, ?, ?)`;
      promise = db.execute(sql, [
        this.title,
        this.imageUrl,
        this.description,
        this.price
      ]);
    } else if (type == "update") {
      sql = `
        UPDATE products 
        SET title = ?, imageUrl = ?, description = ?, price = ?
        WHERE id = ?;
        `;
        promise = db.execute(sql, [
          this.title,
          this.imageUrl,
          this.description,
          this.price,
          this.id
        ]);
    }
    return promise;
  }
  static fetchAll() {
    const promise = db.execute("SELECT * FROM products");
    return promise;
  }
  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  static deleteById(id) {
    return db.execute("DELETE FROM products WHERE products.id = ?", [id]);
  }
};

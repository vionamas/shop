const db = require("../config/database")

module.exports = class HomeProducts {
    constructor(name, type, description, price, image){
        this.name = name,
        this.type = type,
        this.description = description,
        this.price = price,
        this.image = image
    }

    static getAll(){
        return db.execute("SELECT * FROM home")
    }
    
    static getById(id){ 
        return db.execute(`SELECT * FROM home WHERE home.id = ${id}`)
    }
    create(){
        // opción 1:
        // return db.execute("INSERT INTO home (name, price, description, room) VALUES (?,?,?,?)", [this.name, this.price, this.description, this.room])

        // opción 2:
        return db.execute(`INSERT INTO home (name, type, description, price, image) VALUES ('${this.name}','${this.type}','${this.description}','${this.price}','${this.image}')`) 

    }
    update(id){
        return db.execute(`UPDATE home SET home.name = '${this.name}', home.type = '${this.type}', home.description = '${this.description}', home.price = '${this.price}', home.image = '${this.image}' WHERE home.id = ${id}`)
    }

    static delete(id){
        return db.execute(`DELETE FROM home WHERE home.id = ${id}`)
    }

}

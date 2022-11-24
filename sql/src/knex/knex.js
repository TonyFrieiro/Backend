import knex from "knex"


const db = knex({
    client:"mysql",
    connection:{
        host:"127.0.0.1",
        user:"root",
        password:"",
        database:"baseknex"
    }
})

try{
    let exists = await db.schema.hasTable("products")
    if (!exists){
        await db.schema.createTable("products",table=>{
            table.primary("id");
            table.increments("id");
            // id INT AUTO_INCREMENT, PRIMARY KEY(id)
            table.string("tittle",20).nullable(false)
            table.string("description",100)
            table.string("price",25).nullable(false)
            table.integer("stock").defaultTo(0)
            table.string("code",10).unique(true)
            table.string("img",100).nullable(false)
        })
    }

}catch(error){
    console.log(error)
}


try{
    let exists = await db.schema.hasTable("mensajes")
    if (!exists){
        await db.schema.createTable("mensajes",table=>{
            table.primary("id");
            table.increments("id");
            // id INT AUTO_INCREMENT, PRIMARY KEY(id)
            table.string("socketId",30).nullable(false)
            table.string("message",100).nullable(false)
        })
    }

}catch(error){
    console.log(error)
}

export default db;
const { MongoClient } = require("mongodb");
const  ObjectId = require("mongodb").ObjectId;


async function connect() {
    if (global.db) return global.db;
    const conn = await MongoClient.connect("mongodb://localhost:27017/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    if (!conn) return new Error("Can't connect");
    global.db = await conn.db("node");
    return global.db;
}

// const mongoClient = require("mongodb").MongoClient;
// mongoClient.connect("mongodb://localhost")
//             .then(conn => global.conn = conn.db("node"))
//             .catch(err => console.log(err))

async function findUsuarios() {
    const db = await connect();
    return db.collection('usuarios').find({}).toArray();
}


async function insertUsuario(usuario){
    // console.log(usuario);
    const db = await connect();
    return db.collection('usuarios').insertOne(usuario);
}

async function updateUsuario(id, usuario){
    const filter = {_id: new ObjectId(id)};
    const db = await connect();
    return db.collection('usuarios').findOneAndUpdate(filter, {$set:usuario});
}

async function patchUsuario(id, updates){
    const filter = {_id: new ObjectId(id)};
    const db = await connect();
    return db.collection('usuarios').updateOne(filter, {$set:updates});
}

async function deleteUsuario(id){
    const db = await connect();
    const filter = {_id: new ObjectId(id)};

    return db.collection('usuarios').deleteOne(filter);
}

module.exports = { findUsuarios, insertUsuario, updateUsuario, patchUsuario, deleteUsuario }
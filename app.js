const db = require('./db');
const express = require('express');
const app = express();
const port = 3000; //porta padrão
const router = express.Router();

app.use(express.json());
router.get('/', (req, res) => res.json({ message: 'funcionando', nome: 'Mikeias' }));

router.get('/findAll', async (req, res) => {
    try {
        res.json(await db.findUsuarios());
    } catch (err) {
        console.log(err);
        res.status(500).json({ erro: `${err}` });
    }
})


router.post('/usuarios', async function (req, res, next) {
    try {
        const usuario = req.body;
        await db.insertUsuario(usuario);
        res.json({ message: "cadastrado com sucesso!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: `${error}` });
    }
});

router.put('/usuarios/:id', async function(req, res, next){
    try {
        const usuario = req.body;
        const id = req.params.id;
        await db.updateUsuario(id, usuario)
        res.json({message:"usuario atualizado com sucesso!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({erro:`${error}`});
    }
})

router.patch('/usuarios/:id', async function(req, res){
    try {
        await db.patchUsuario(req.params.id, req.body);
        res.json({message: "atualizado com socesso!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({erro: `${error}`});
    }
})

router.delete('/usuarios/:id', async function(req, res){
    try {
        await db.deleteUsuario(req.params.id)
        res.json({message: "Deletado com sucesso!"});
    } catch (error) {
        console.log(error);
        res.status(500).json({erro: `${error}`});
    }
})

app.use('/', router);

app.listen(port)
console.log('Api funcionando!');
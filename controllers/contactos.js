const Contacto = require("../models/Contacto")

const readContactos = async(_, res) => {
    try {
        const contactos = await  Contacto.find({});

        if (contactos.length === 0) {
            return res.render("index", {ok: false});
        } 

        return res.render("index", {ok: true, contactos: contactos});
    } catch (error) {
        console.log(error);
        return res.json({ok: false, msg: "Error en el servidor, contactose en el servidor" });
        
    }
    // res.render("index");
}

const createContacto = async (req, res) => {
    console.log(req.body)
    try {
        const contacto_nuevo = new Contacto(req.body);
        await contacto_nuevo.save();

        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.json({ok: false, msg: "Error al crear el contacto" });
    }
}

const deleteContacto = async (req, res) => {
    try {
        const id = req.params.id;
        await Contacto.findByIdAndDelete(id);

        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.json({ok: false, msg: "Error al borrar el contacto"});
    }
}

const updateContacto = async (req, res) => {
    console.log(req.body)
    try {
        const id = req.body.edit_id;
        await Contacto.findByIdAndUpdate(id, req.body);

        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.json({ok: false, msg: "Error al actualizar el contacto"});
    }
}

module.exports = {
    readContactos, 
    createContacto,
    deleteContacto,
    updateContacto
}
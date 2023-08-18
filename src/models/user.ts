import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "Nombre requerido"],
        minLength: [3, "El nombre tiene que ser más de 3 caracteres"],
        maxLength: [50, "El nombre tiene que ser menor a 50 caracteres"],
    },
    
    email: {
        type: String,
        unique: true,
        required: [true, "Email requerido"],
        match: [
            /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/,
            "Email no válido",
        ],
    },
    password: {
        type: String,
        required: [true, "Contraseña requerida"],
        select: false,
    },
}
);

const User = models.User || model("User", userSchema)
export default User;
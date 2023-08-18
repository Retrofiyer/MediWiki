import mongoose from "mongoose";

const {MONGODB_URI} = process.env;

//Definimos que exista la variable, sino existe salta mensaje de error
if (!MONGODB_URI) {
    throw new Error("MONGODB_URI tiene que ser definida");
}

//Hacemos la conexión con la variable de entorno
export const connectDB = async () => {
    //Hacemos un try catch para atrapar los errores al conectar con la BD
    try {
        const { connection } = await mongoose.connect(MONGODB_URI);
        if (connection.readyState === 1) {
            console.log("MongoDB connected");
            return Promise.resolve(true);
        }
    } catch (error) {
        console.log(error);
        return Promise.reject(false);
    }
}
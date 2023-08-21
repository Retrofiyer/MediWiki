import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/Libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    //Recibo los datos
    const { fullname, email, password } = await request.json()
    
    //Compruebo que la contraseña no esté vacia o sea menor a 6 caracteres
    if (!password || password.length < 6) return NextResponse.json({
        message: "Contraseña tiene que tener más de 6 caracteres"
    },
        {
            status: 400
        }
    );

    try {

        await connectDB()
        //Encuentra que el usuario por email
        const userFound = await User.findOne({ email })

        //Si encuentra el usuario salta mensaje de correo existente
        if (userFound)
            return NextResponse.json({
                message: "Email existente"
            },
                {
                    status: 409
                }
            );

        //Si no coincide empieza a encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 12);

        // Una vez encriptada la contraseña crea un usuario
        const user = new User({
            fullname,
            email,
            password: hashedPassword
        });

        //Se guarda en la base de datos
        const savedUser = await user.save();

        //Se retorna al cliente
        return NextResponse.json({
            _id: savedUser.id,
            email: savedUser.email,
            fullname: savedUser.fullname
        });

    } catch (error) {
        console.log(error)
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, {
                status: 400,
            }
            );
        }

    }
}
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            //to make sure we know which user is currently online
            console.log("==============> CHECKING SESSION")

            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = sessionUser._id.toString();
            console.log("==============> SESSION", session)
            return session
        },
        async signIn({ profile }) {
            try {

                console.log("==============> SIGN IN")
                await connectToDB();
                console.log("==============> CONNECTION ESTABLISHED")

                //check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });
                console.log("==============> USER EXIST??")

                //if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                    console.log("==============> USER NO EXIST??")
                }

                return true;
            } catch (error) {
                console.log(error)
                console.log("==============> STILL TRASH BESTIE")
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST } 
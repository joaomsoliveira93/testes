import type {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials:{
                username:{
                    label: "Username", 
                    type: "text",
                    placeholder:'Your Username'
                },
                password:{
                    label: "Password",
                    type: "password",
                    placeholder: "Your Password"
                }
            },
            async authorize(credentials){
                //use database in the future
                //Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = {id:"1",name:"johnny@teste.pt",password:"teste",email:"developer"}

                if(credentials?.username === user?.name && credentials?.password === user?.password){
                    return user
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        newUser:'/auth/signup'
    }
}
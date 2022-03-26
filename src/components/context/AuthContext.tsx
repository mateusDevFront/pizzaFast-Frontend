import {createContext, ReactNode, useState} from 'react'

import {api} from '../../services/apiCliente'

import {destroyCookie, setCookie, parseCookies} from 'nookies'
import Router from 'next/router'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean
    signIn: (credencials: SignInProps) => Promise<void>
    signOut: () => void;
}
type UserProps = {
    id: string;
    name: string;
    email: string;
}
type SignInProps = {
    email: string;
    password: string;
}
type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    //deslogar usuário
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch{
        console.log('erro ao deslogar')
    }
}

export function AuthProvider({ children}: AuthProviderProps){

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    async function signIn({email, password}: SignInProps){
        /* console.log('dados para logar', email)
        console.log('senha', password) */
        try{
            const response = await api.post('/session', {
                email,
                password
            })
            /* console.log(response.data) */
            const {id, name, token} = response.data
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 *24 * 30, //expira em 1 mes
                path: "/" //Caminhos que terão acesso ao cookies
            })
            setUser({
                id,
                name,
                email
            })
            //passar para as prox requisições o token
            api.defaults.headers['Authorization'] = `Bearer${token}`

            //Redircionar o usuário para a pagina Deashboard
            Router.push("/dashboard")
        }catch(err){
            console.log('erro ao acessar', err)
        }
    }
    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}
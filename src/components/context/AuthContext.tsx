import {createContext, ReactNode, useState} from 'react'

import {api} from '../../services/apiCliente'

import {destroyCookie, setCookie,  } from 'nookies'
import Router from 'next/router'

import {toast} from 'react-toastify'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean
    signIn: (credencials: SignInProps) => Promise<void>
    signOut: () => void;
    signUp: (credencials: SignUpProps) => Promise<void>
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
type SignUpProps = {
    name: string;
    email: string;
    password: string;
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

            toast.success('Seja Bem vindo - PizzaFast')

            //Redircionar o usuário para a pagina Deashboard
            Router.push("/dashboard")
        }catch(err){
            /* console.log('erro ao acessar', err) */
            toast.error('Ops! Ocorreu um erro ao efetuar o login :( ')
        }
    }
    async function signUp({name, email, password}: SignUpProps){
        try{
            const response = await api.post('/users',{
                name,email,password
            })
            toast.success('Sua conta foi criada com sucesso :D')
            /* console.log('CADASTRAODO COM SUCESSO') */
            Router.push('/')
        }catch(err){
            toast.error('Ops! Ocorreu um erro ao efetuar o login :( ')
            /* console.log('erro ao cadastrar usuário', err) */
        }
    }
    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}
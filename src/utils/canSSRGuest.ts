import{
GetServerSidePropsContext,
GetServerSideProps,
GetServerSidePropsResult
} from 'next'
import {parseCookies} from 'nookies'

//função para paginas que so vão ser acessada por visitantes

export function CanSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(ctx)
    
    //se tentar  acessar  com o login salvo, redireciona
    if(cookies['@nextauth.token']){
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }

    return await fn(ctx)
    }
}
import {useContext, FormEvent, useState} from 'react'
import Head from "next/head";
import styles from "../../styles/home.module.scss";
import Image from "next/image";

import logoImg from "../../public/logo.svg";

import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

import {AuthContext} from '../components/context/AuthContext'

import Link from "next/link";

export default function Home() {

  const {signIn} = useContext(AuthContext)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const [loading, setLoading] = useState()

  async function handleLogin(event:FormEvent){
    event.preventDefault()

    let data = {
      email: 'test@teste.com',
      password: '123456'
    }
    await signIn(data)
  }
  return (
    <>
      <Head>
        <title>Pizza Fast - Login</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image
          className={styles.logoPizza}
          src={logoImg}
          alt="logo Pizza Fasta"
        />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(text) => setEmail(text.target.value)}
            />

            <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(text) => setPassword(text.target.value)}
            />

            <Button
            type="submit"
            loading={false}>
              Acessar
            </Button>

            <Link href="/signup">
              <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
            </Link>

          </form>
        </div>
      </div>
    </>
  );
}

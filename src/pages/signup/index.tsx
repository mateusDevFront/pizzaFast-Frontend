import React, { useState, FormEvent, useContext} from 'react'
import Head from "next/head";
import styles from "../../../styles/home.module.scss";
import Image from "next/image";

import logoImg from "../../../public/logo.svg";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import {AuthContext} from '../../components/context/AuthContext'

import Link from 'next/link'
import {toast} from 'react-toastify'

export default function SignUp() {

  const {signUp} = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  async function handleSignUp(event:FormEvent){
    event.preventDefault()
    
    if(name === '' || email === '' || password === ''){
      toast.error('Preencha seus dados!')
      
      return;
    }
    setLoading(true);

    let data = {
      name,email,password
    }
    await signUp(data)
    
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Pizza Fast - Cadastro</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image
          className={styles.logoPizza}
          src={logoImg}
          alt="logo Pizza Fasta"
        />
        <div className={styles.login}>
          <h1>Cradastrando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
            placeholder="Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <Input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>

            <Link href="/">
              <a className={styles.text}>J?? possui uam conta? Entre agora</a>
            </Link>

          </form>
        </div>
      </div>
    </>
  );
}

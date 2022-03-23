import Head from "next/head";
import styles from "../../../styles/home.module.scss";
import Image from "next/image";

import logoImg from "../../../public/logo.svg";

import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import Link from 'next/link'

export default function SignUp() {
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
          <form>
            <Input placeholder="Nome" type="text" />
            <Input placeholder="Email" type="text" />
            <Input placeholder="Senha" type="password" />

            <Button type="submit" loading={false}>
              Cadastrar
            </Button>

            <Link href="/">
              <a className={styles.text}>Já possui uam conta? Entre agora</a>
            </Link>

          </form>
        </div>
      </div>
    </>
  );
}

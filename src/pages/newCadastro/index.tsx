import { FormEvent, useContext, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

import logo from '../../../public/logo.svg'
import styles from '../../../styles/home.module.scss'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'

export default function NewCadatro() {
  const { cadastrar } = useContext(AuthContext)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCadastrar(e: FormEvent) {
    e.preventDefault();

    if (nome === '' || email === '' || senha === '') {
      toast.warning('Por favor informe todos os campos')
      return;
    }

    let data = {
      nome,
      email,
      senha
    }

    setLoading(true);

    await cadastrar(data);

    setLoading(false)

  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt="" />
        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={handleCadastrar}>
            <Input
              placeholder='Digite seu nome'
              value={nome}
              onChange={(e) => setNome(e.target.value)} />
            <Input
              placeholder='Digite seu email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder='Digite a senha'
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Button
              type='submit'
              loading={loading}
            >
              Acessar
            </Button>
          </form>
        </div>
        <Link legacyBehavior href='/home'>
          <a className={styles.text}>Já possui uma conta? Faça seu login</a>
        </Link>
      </div>
    </>
  )
}

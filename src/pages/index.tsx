import { FormEvent, useContext, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

import logo from '../../public/logo.svg'
import styles from '../../styles/home.module.scss'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { canSSGuest } from '../utils/canSSGuest'
export default function Home() {
  const { signIn } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if (email === '' || senha === '') {
      toast.warning('Preencha todos os campos')
      return
    }

    setLoading(true);

    let data = {
      email,
      senha,
    }
    await signIn(data)

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Cartola Manage</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt="" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder='Digite seu email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input placeholder='Digite a senha' type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)} />
            <Button
              type='submit'
              loading={loading}
            >
              Acessar
            </Button>
          </form>
        </div>
        <Link legacyBehavior href='/newCadastro'>
          <a className={styles.text}>Não tem cadastro? Faça agora</a>
        </Link>
      </div>
    </>
  )
}

export const getServerSideProps = canSSGuest(async (ctx) => {
  return {
    props: {},
  };
});
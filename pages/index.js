import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/client'

export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const result = await res.json();
  
  return {
    props: { posts: result.slice(0, 10) }
  }
}

const Home = ({ posts }) => {
  const [ session, loading ] = useSession()
    if(session) {
      return <>
        Signed in as {session.user.email} <br/>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>

        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to <a href="/">Blogger.js!</a></h1>
          <p className={styles.description}>
            Get started by editing{' '}
            <code className={styles.code}>pages/index.js</code>
          </p>
          {session ? 
            <>
              Signed in as {session.user.email} <br/>
              <button className={styles.signIn} onClick={() => signOut()}>Sign Out</button>
            </> :
            <div>
              <button className={styles.signIn} onClick={() => signIn()}>Sign In</button>
              <button className={styles.signUp}>Sign Up</button>
            </div>
          }

          <div className={styles.grid}>
            {posts.map(post => (
              <a key={post.id} href="/" className={styles.card}>
                <h3>{post.title} &rarr;</h3>
                <p>{post.body}</p>
              </a>
            ))}
          </div>
        </main>

        <footer className={styles.footer}>
          <a href="/" target="_blank" rel="noopener noreferrer"> Powered by{' '} <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} /></a>
        </footer>
      </div>
    </>
  )
}

export default Home;

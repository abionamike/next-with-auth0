import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useAuth0 }  from '@auth0/auth0-react'

export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const result = await res.json();
  
  return {
    props: { posts: result.slice(0, 10) }
  }
}

const Home = ({ posts }) => {
  const { loginWithRedirect, isAuthenticated, user, logout, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
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
          {isAuthenticated ? 
            <>
              <p className={styles.description}>
                Hello, {user.name} 👋
              </p>
              <div>
                <button className={styles.signIn} onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
              </div> 
            </> :
            <div>
              <button className={styles.signUp} onClick={() => loginWithRedirect()}>Sign In</button>
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

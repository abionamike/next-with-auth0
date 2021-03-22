import Head from 'next/head'
import styles from '../styles/Home.module.css'

export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const result = await res.json();
  
  return {
    props: { posts: result.slice(0, 10) }
  }
}

const Home = ({ posts }) => {
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

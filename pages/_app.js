import '../styles/globals.css'
import Navbar from '../partials/Navbar';

export default function App({ Component, pageProps }) {
    return (
      <>
        <Navbar/>
        <Component {...pageProps} />
      </>
    )
  }
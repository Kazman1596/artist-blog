import Head from 'next/head'
import Menu from '../components/Menu'
import Feed from '../components/Feed'
import EntryModal from '../components/EntryModal'

export default function Home() {

  return (
    <div>
      <Head>
        <title>Kaz Music</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-black'>

        {/* SideBar Menu */}
        
        <Menu />

        {/* Main Content */}

        <div className='w-screen h-screen overflow-auto scroll-smooth'>

          {/* Feed */}

          <Feed />

          {/* Entry Modal */}

          <EntryModal />

        </div>
        

      </main>
    </div>
  )
}

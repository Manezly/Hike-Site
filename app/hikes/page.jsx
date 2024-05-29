import HikeCard from '@/components/HikeCard';
import '@/assets/styles/hikesPage.css';
import HikeSearchForm from '@/components/HikeSearchForm';
import Link from 'next/link';
import Hikes from '@/components/Hikes';

const HikesPage = async () => {

  return (<>
    <>
        
        <h2>All Hikes</h2>
        <section className="container section results">
        <Link
            className='btn'
            href={'/hikes'}>
            Back to hikes
        </Link>
        <HikeSearchForm />
        <Hikes />
            
        </section>
    </>
  </>);
}

export default HikesPage

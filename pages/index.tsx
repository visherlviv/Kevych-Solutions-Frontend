import StartingPageContent from '../components/starting-page/starting-page';
import { useRouter } from 'next/router';
function HomePage() {
  const router = useRouter();
  //router.push('/trains')
  return <StartingPageContent />;
}

export default HomePage;
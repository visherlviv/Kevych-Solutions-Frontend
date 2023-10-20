import { useEffect, useState } from 'react';
import Head from "next/head";
import Link from 'next/link'
import { getAllTrains } from '../../helpers';
import { getSession } from 'next-auth/react';

interface Project {
    id: string;
    name: string;
}

interface HomeProps {
    projects: Project[];
}

const Home: React.FC<HomeProps> = ({ projects }) => {
    const [fetchedSchedules, setProjects] = useState<Project[]>([]);
    useEffect(() => {
        setProjects(projects);
    }, [projects]);

    return (
        <div>
            <Head>
                <title>Trains Schedule</title>
                {/* Add your head content here */}
            </Head>
            <div className='App h-full py-6 px-6 bg-white'>
                <div className='bg-gray-50 shadow-lg border rounded-md'>
                    <div className='mx-auto block max-w-7xl py-12 px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8'>
                        <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                            <span className='block'>Work with trains</span>
                            <span className='block text-my-indigo'>
                                Chose train and update schedule
                                <div>
                                    {fetchedSchedules && fetchedSchedules.length && fetchedSchedules?.map((item) => (
                                        <Link key={item.id} href={`/trains/train/${item.id}`}>
                                            <li className="p-4 cursor-pointer bg-white text-deep-purple-500 bg-white text-base my-5 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                                {item.name}
                                            </li>
                                        </Link>
                                    ))}
                                </div>
                            </span>
                        </h2>
                        <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0 justify-around'>
                            <div className='inline-flex rounded-md shadow'>
                                <Link href="/trains/train/add" className='inline-flex items-center justify-center rounded-md border border-transparent bg-purple-700 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700'>
                                    Add train
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }
    const fetchedSchedules = await getAllTrains();
    return {
        props: { projects: fetchedSchedules },
    };
}

export default Home;

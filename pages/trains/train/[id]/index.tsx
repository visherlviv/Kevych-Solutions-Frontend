import { useEffect, useState } from 'react';
import ScheduleDetailsForm from '../../../../components/ScheduleDetailsForm';
import TaskList from '../../../../components/ScheduleList';
import ScheduleCommentsForm from '../../../../components/ScheduleCommentsForm';
import Link from 'next/link'
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getTrainById, updateTrainSchedule, deleteTrainSchedule } from '../../../../helpers';

interface Task {
    id: number;
    text: string;
}

interface Project {
    comment: string;
    schedules: string;
    name: string;
}

interface HomeProps {
    project: Project | null;
    params: any;
}

const Home: React.FC<HomeProps> = ({ project, params }) => {
    const [schedules, setTasks] = useState<Task[]>([]);
    const [projectName, setName] = useState<string>('');
    const [scheduleComments, setProjectComments] = useState<string[]>([]);
    const router = useRouter();
    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
    useEffect(() => {
        if (project) {
            console.log('pr', project)
            const { comment, schedules, name } = project;
            const commentsForUpdate = isJson(comment) ? JSON.parse(comment) : [];
            const tasksForUpdate = isJson(schedules) ? JSON.parse(schedules) : []
            setTasks(tasksForUpdate);
            setProjectComments(commentsForUpdate);
            setName(name);
        }
    }, [project]);

    const addTask = (text: string) => {
        setTasks([...schedules, { id: schedules.length + 1, text }]);
    };

    const deleteTask = (taskId: number) => {
        const updatedTasks = schedules.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const addProjectComment = (comment: string) => {
        setProjectComments([...scheduleComments, comment]);
    };

    return (
        <div className="container mx-auto p-4">
            <script src="https://cdn.tailwindcss.com"></script>
            <h1 className="text-2xl font-bold mb-4">{projectName}</h1>
            <ScheduleDetailsForm onAddTask={addTask} />
            <TaskList schedules={schedules} onDeleteSchedule={deleteTask} />
            <h2 className="text-xl font-semibold mb-2 mt-4">Comments for project:</h2>
            <ScheduleCommentsForm onAddComment={addProjectComment} />
            <ul>
                {scheduleComments?.map((comment, index) => (
                    <li key={index} className="mb-2">
                        {comment}
                    </li>
                ))}
            </ul>
            <button className="bg-purple-700 mr-10 w-52 text-white px-4 py-2 rounded-md mt-2"
                onClick={() => updateTrainSchedule({ scheduleComments, schedules, params, router })}>Save updates</button>
            <Link href='/trains'>
                <button className="bg-green-500 mr-10 w-52 text-white px-4 py-2 rounded-md mt-2">
                    Back
                </button>
            </Link>
            <Link href='/trains'>
                <button className="bg-red-500 w-52 text-white px-4 py-2 rounded-md mt-2"
                    onClick={() => deleteTrainSchedule(params)}>
                    Remove
                </button>
            </Link>
        </div>
    );
};

export async function getServerSideProps({ params, req }) {
    const session = await getSession({ req: req });
    if (!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            },
        };
    }
    const fetchedSchedule = await getTrainById(params)
    return { props: { project: fetchedSchedule, params } };
}

export default Home;

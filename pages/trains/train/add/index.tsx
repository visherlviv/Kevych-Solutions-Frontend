import { useState } from 'react';
import ScheduleDetailsForm from '../../../../components/ScheduleDetailsForm';
import TaskList from '../../../../components/ScheduleList';
import ScheduleCommentsForm from '../../../../components/ScheduleCommentsForm';
import { useRouter } from 'next/router';
import { createTrainSchedule } from '../../../../helpers/index';
import TrainNameForm from '../../../../components/NameForm';
import Link from 'next/link'
import { getSession } from 'next-auth/react';

interface Task {
    id: number;
    text: string;
}

const Home = () => {
    const [schedules, setTasks] = useState<Task[]>([]);
    const [projectName, setName] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);
    const [scheduleComments, setProjectComments] = useState<string[]>([]);
    const router = useRouter();
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
    const addProjectName = (name: string) => {
        setName(name)
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create a new schedule</h1>
            <input type='text' onChange={(e) => setName(e.target.value)}></input>
            <TrainNameForm onAddName={addProjectName} setErrors={setErrors} />
            <ScheduleDetailsForm onAddTask={addTask} />
            <TaskList schedules={schedules} onDeleteSchedule={deleteTask} />
            <h2 className="text-xl font-semibold mb-2 mt-4">Important updates of schedules:</h2>
            <ScheduleCommentsForm onAddComment={addProjectComment} />
            <ul>
                {scheduleComments.map((comment, index) => (
                    <li key={index} className="mb-2">
                        {comment}
                    </li>
                ))}
            </ul>
            <button className="bg-purple-700 mr-10 w-52 text-white px-4 py-2 rounded-md mt-2"
                onClick={() => createTrainSchedule({ scheduleComments, schedules, projectName, router, setErrors })}>Add train</button>
            <Link legacyBehavior href='/trains'>
                <button className="bg-green-500 w-52 text-white px-4 py-2 rounded-md mt-2">
                    Back
                </button>
            </Link>
            {errors?.map((item: any) => <li key={item}>{item.message}</li>)}
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
    return {
        props: {},
    }
}

export default Home;

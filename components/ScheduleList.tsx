interface Task {
    id: number;
    text: string;
}

interface TaskListProps {
    schedules: Task[];
    onDeleteSchedule: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ schedules, onDeleteSchedule }) => {
    return (
        <ul>
            {schedules.map((task) => (
                <li key={task.id} className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">{task.text}</h2>
                    <button
                        className="bg-red-500 w-52 text-white px-4 py-2 rounded-md"
                        onClick={() => onDeleteSchedule(task.id)}
                    >
                        Delete schedule
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;

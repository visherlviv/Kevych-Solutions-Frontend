import { useState, ChangeEvent } from 'react';

interface ScheduleDetailsFormProps {
    onAddTask: (text: string) => void;
}

const ScheduleDetailsForm: React.FC<ScheduleDetailsFormProps> = ({ onAddTask }) => {
    const [taskText, setScheduleText] = useState<string>('');

    const handleScheduleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setScheduleText(e.target.value);
    };

    const handleAddSchedule = () => {
        if (taskText.trim() !== '') {
            onAddTask(taskText);
            setScheduleText('');
        }
    };

    return (
        <div className="mt-4 flex items-baseline">
            <input
                type="text"
                placeholder="Add schedule..."
                className="w-full p-2 border rounded-md"
                value={taskText}
                onChange={handleScheduleTextChange}
            />
            <button
                className="bg-green-500 w-52 text-white px-4 py-2 rounded-md mt-2 ml-5"
                onClick={handleAddSchedule}
            >
                Add
            </button>
        </div>
    );
};

export default ScheduleDetailsForm;

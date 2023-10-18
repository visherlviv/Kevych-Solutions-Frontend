import { useState, ChangeEvent } from 'react';

interface TrainNameFormProps {
  onAddName: (name: string) => void;
  setErrors: (errors: any) => void;
}

const TrainNameForm: React.FC<TrainNameFormProps> = ({ onAddName, setErrors }) => {
  const [name, setName] = useState<string>('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors(null);
    setName(e.target.value);
    onAddName(e.target.value);
  };

  return (
    <div className="mt-4 flex items-baseline">
      <input
        type="text"
        placeholder="Add train name..."
        className="w-full p-2 border rounded-md"
        value={name}
        onChange={handleNameChange}
      />
    </div>
  );
};

export default TrainNameForm;

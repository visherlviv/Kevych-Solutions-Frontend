const BASE_URL = 'http://localhost:3002/shop/phones'
const getAllTrains = async (): Promise<object[]> => {
    const result = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
        },
    });
    const fetchedSchedules = await result.json();
    return fetchedSchedules;
};

const getTrainById = async (params: { id: string }): Promise<any> => {
    const result = await fetch(`${BASE_URL}/${params.id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
        },
    });
    const fetchedSchedule = await result.json();
    return fetchedSchedule;
};

const createTrainSchedule = async ({
    scheduleComments, schedules, projectName, router, setErrors
}: {
    scheduleComments: any[];
    schedules: any[];
    projectName: string;
    router: any;
    setErrors: (errors: any) => void;
}): Promise<void> => {
    console.log('projectName', projectName)
    if (!projectName) {
        setErrors([{ message: 'Please fill name field' }]);
        return;
    }
    const comments = JSON.stringify(scheduleComments);
    const updatedTasks = JSON.stringify(schedules);
    await fetch(BASE_URL, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
        },
        body: JSON.stringify({
            comment: comments,
            schedules: updatedTasks,
            name: projectName,
        }),
    });
    router.push(`/trains`);
};

const updateTrainSchedule = async ({
    scheduleComments,
    schedules,
    params,
    router,
}: {
    scheduleComments: string[] | null;
    schedules: { id: number, text: string }[];
    params: { id: string };
    router: any;
}): Promise<void> => {
    let comments = '[]';
    if (scheduleComments) {
        comments = JSON.stringify(scheduleComments);
    }
    const updatedTasks = JSON.stringify(schedules);
    await fetch(`${BASE_URL}/${params.id}`, {
        method: 'put',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
        },
        body: JSON.stringify({
            comment: comments,
            schedules: updatedTasks,
        }),
    });
    router.push('/trains');
};
const deleteTrainSchedule = async (params: { id: string }): Promise<any> => {
    const result = await fetch(`${BASE_URL}/${params.id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
        },
    });
    const fetchedSchedule = await result.json();
    return fetchedSchedule;
};
export { createTrainSchedule, getAllTrains, updateTrainSchedule, getTrainById, deleteTrainSchedule };

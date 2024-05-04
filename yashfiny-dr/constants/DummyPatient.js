import dayjs from "dayjs";

export const patient = {
    id: '123456',
    avatarUri: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
    age: {
        years: 14,
        months: 2,
        days: 12
    },
    gender: 'female',
    fname: 'Nadine',
    lname: 'Yasser',
    complaint: 'string kebir',
    symptoms: 'String akbar awyyyyyyyyyyyyyy',
    history: {
        chronicDis: ['disease1', 'disease2'],
        allergies: ['allergy1', 'allergy2']
    },
    visits: [
        {
            time: new Date(),
            status: 'upcoming', //upcoming or visited or cancelled
            diagnosis: [{ name: 'disease', type: 'final' }, { name: 'newDisease', type: 'preliminary' }],
            prescription: [{ name: 'drugX', dosage: '2mg' }, { name: 'drugY', dosage: '3mg' }]
        },
        {
            time: new Date('19-04-2024'),
            status: 'upcoming', //upcoming or visited or cancelled
            diagnosis: [{ name: 'disease', type: 'final' }, { name: 'newDisease', type: 'preliminary' }],
            prescription: [{ name: 'drugX', dosage: '2mg' }, { name: 'drugY', dosage: '3mg' }]
        },
        {
            time: new Date('17-05-2023'),
            status: 'upcoming', //upcoming or visited or cancelled
            diagnosis: [{ name: 'disease', type: 'final' }, { name: 'newDisease', type: 'preliminary' }],
            prescription: [{ name: 'drugX', dosage: '2mg' }, { name: 'drugY', dosage: '3mg' }]
        },

    ]
}
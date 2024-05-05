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
            date: new Date(),
            status: 'upcoming', //upcoming or visited or cancelled
            diagnosis: [{ name: 'disease', type: 'final' }, { name: 'newDisease', type: 'preliminary' }],
            prescription: [{ name: 'drugX', dosage: '2mg' }, { name: 'drugY', dosage: '3mg' }]
        },
        {
            date: new Date('19-04-2024'),
            status: 'cancelled', //upcoming or visited or cancelled
            diagnosis: [{ name: 'disease', type: 'final' }, { name: 'newDisease', type: 'preliminary' }],
            prescription: [{ name: 'drugX', dosage: '2mg' }, { name: 'drugY', dosage: '3mg' }]
        },
        {
            date: new Date('17-05-2023'),
            status: 'visited', //upcoming or visited or cancelled
            diagnosis: [{ name: 'disease', type: 'final' }, { name: 'newDisease', type: 'preliminary' }],
            prescription: [{ name: 'drugX', dosage: '2mg' }, { name: 'drugY', dosage: '3mg' }]
        },

    ],
    drugs: [
        {
            name: 'drugX',
            duration: '10 Days',
            instructions: 'string',
            time: 'Noon',
            dosage: '10mg'

        },
        {
            name: 'drugX',
            duration: '10 Days',
            instructions: 'string',
            time: 'Night',
            dosage: '10mg'

        },
        {
            name: 'drugX',
            duration: '10 Days',
            instructions: 'string',
            time: 'Evening',
            dosage: '10mg'

        },
        {
            name: 'drugX',
            duration: '10 Days',
            instructions: 'string',
            time: 'Morning',
            dosage: '10mg'

        },
        {
            name: 'drugX',
            duration: '10 Days',
            instructions: 'string',
            time: 'Morning',
            dosage: '10mg'

        }, {
            name: 'drugX',
            duration: '10 Days',
            instructions: 'string',
            time: 'Noon',
            dosage: '10mg'

        },
        {
            name: 'drugX',
            duration: '10 Days',
            instructions: 'string',
            time: 'Evening',
            dosage: '10mg'

        },


    ]
}
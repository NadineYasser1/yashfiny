import dayjs from "dayjs";

export const DummyPatients = [
    {
        id: 123456,
        fname: 'Ahmed',
        lname: 'Mohamed',
        avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
        phoneNum: '0123456789',
        gender: 'Female',
        age: 18,

        history: {
            chronicDis: ['disease1', 'disease2'],
        },
        appointments: [
            {
                aptId: 1,
                status: 'upcoming',
                type: {
                    name: 'Video',
                    id: 1
                },
                method: 'group',
                date: dayjs(new Date('2024-01-05')), //a dayjs object

            },
            {
                aptId: 2,
                status: 'cancelled',
                type: {
                    name: 'clinic',
                    id: 2
                },
                method: 'group',
                date: dayjs(new Date('2024-04-27')), //a dayjs object

            },
            {
                aptId: 1,
                status: 'visited',
                type: {
                    name: 'video',
                    id: 1
                },
                method: 'group',
                date: dayjs(new Date()), //a dayjs object

            }
        ],
    },
    {
        id: 245789,
        fname: 'Adel',
        lname: 'Mall',
        avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
        phoneNum: '0123456789',
        gender: 'Female',
        age: 18,

        history: {
            chronicDis: ['disease1', 'disease2'],

        },
        appointments: [
            {
                aptId: 1,
                status: 'upcoming',
                type: {
                    name: 'Clinic',
                    id: 1
                },
                method: 'individual',
                date: dayjs(new Date()), //a dayjs object

            },
            {
                aptId: 2,
                status: 'cancelled',
                type: {
                    name: 'clinic',
                    id: 2
                },
                method: 'individual',
                date: dayjs(new Date()), //a dayjs object

            },
            {
                aptId: 1,
                status: 'visited',
                type: {
                    name: 'video',
                    id: 1
                },
                method: 'individual',
                date: dayjs(new Date()), //a dayjs object

            }
        ],
    },
    {
        id: 127656,
        fname: 'Ingy',
        lname: 'Mohamed',
        avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
        phoneNum: '0123456789',
        gender: 'Female',
        age: 18,
        history: {
            chronicDis: ['disease1', 'disease2'],
        },
        appointments: [
            {
                aptId: 1,
                status: 'cancelled',
                type: {
                    name: 'video',
                    id: 1
                },
                method: 'individual',
                date: dayjs(new Date()), //a dayjs object

            },
            {
                aptId: 2,
                status: 'upcoming',
                type: {
                    name: 'clinic',
                    id: 2
                },
                method: 'group',
                date: dayjs(new Date()), //a dayjs object

            },
            {
                aptId: 1,
                status: 'visited',
                type: {
                    name: 'video',
                    id: 1
                },
                method: 'individual',
                date: dayjs(new Date()), //a dayjs object

            }
        ],
    },
    {
        id: 223456,
        fname: 'Ashraf',
        lname: 'Lo',
        avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
        phoneNum: '0123456789',
        gender: 'Female',
        age: 18,
        history: {
            chronicDis: ['disease1', 'disease2'],
        },
        appointments: [
            {
                aptId: 1,
                status: 'upcoming',
                type: {
                    name: 'video',
                    id: 1
                },
                method: 'individual',
                date: dayjs(new Date()), //a dayjs object

            },
            {
                aptId: 2,
                status: 'cancelled',
                type: {
                    name: 'clinic',
                    id: 2
                },
                method: 'individual',
                date: dayjs(new Date()), //a dayjs object

            },
            {
                aptId: 1,
                status: 'visited',
                type: {
                    name: 'video',
                    id: 1
                },
                method: 'individual',
                date: dayjs(new Date()), //a dayjs object

            }
        ],
    },
    {
        id: 123556,
        fname: 'Ahmed',
        lname: 'Aly',
        avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
        phoneNum: '0123456789',
        gender: 'Female',
        age: 18,

        history: {
            chronicDis: ['disease1', 'disease2'],

        },
        appointments: [
            {
                aptId: 1,
                status: 'cancelled',
                type: {
                    name: 'Clinic',
                    id: 1
                },
                method: 'individual',
                date: dayjs(new Date()), //a dayjs object

            },
            {
                aptId: 2,
                status: 'cancelled',
                type: {
                    name: 'clinic',
                    id: 2
                },
                method: 'individual',
                date: dayjs(new Date()), //a dayjs object

            },
            {
                aptId: 1,
                status: 'visited',
                type: {
                    name: 'video',
                    id: 1
                },
                method: 'individual',
                date: dayjs(new Date()), //a dayjs object

            }
        ],

    },




]
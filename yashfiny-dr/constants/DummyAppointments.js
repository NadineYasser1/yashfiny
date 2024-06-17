import dayjs from "dayjs";

export const DummyAppointments = {
    '2024-04-28': [
        {
            aptId: 1,
            method: 'group',
            type: 'video',
            time: dayjs(new Date()),
            status: 'upcoming',
            patientId: 123478,
            fname: 'Ahmed',
            lname: 'Yasser',
            avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            phoneNum: '0123456789',
            gender: 'Female',
            age: 18,
            history: {
                chronicDis: ['disease1', 'disease2'],
                surgeries: ['surg1', 'surg2'],
                familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', familyMember: 'Sibling' }]
            },
            cancellable: true
        },
        {
            aptId: 2,
            method: 'individual',
            type: 'clinic',
            time: dayjs(new Date()),
            status: 'cancelled',
            patientId: 22345,
            fname: 'Nadine',
            lname: 'Mohamed',
            avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            phoneNum: '0123456789',
            gender: 'Female',
            age: 18,
            history: {
                chronicDis: ['disease1', 'disease2'],
                surgeries: ['surg1', 'surg2'],
                familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', familyMember: 'Sibling' }]
            },
            cancellable: true
        },
        {
            aptId: 3,
            method: 'group',
            type: 'clinic',
            time: dayjs(new Date()),
            status: 'visited',
            patientId: 123477,
            fname: 'Ahmed',
            lname: 'Mohamed',
            avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            phoneNum: '0123456789',
            gender: 'Female',
            age: 18,
            history: {
                chronicDis: ['disease1', 'disease2'],
                surgeries: ['surg1', 'surg2'],
                familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', familyMember: 'Sibling' }]
            },
            cancellable: false

        },

    ],
    '2024-04-27': [
        {
            aptId: 1,
            method: 'group',
            type: 'video',
            time: dayjs(new Date()),
            status: 'visited',
            patientId: 128456,
            fname: 'Ahmed',
            lname: 'Mohamed',
            avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            phoneNum: '0123456789',
            gender: 'Female',
            age: 18,
            history: {
                chronicDis: ['disease1', 'disease2'],
                surgeries: ['surg1', 'surg2'],
                familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', familyMember: 'Sibling' }]
            },
            cancellable: true

        },
        {
            aptId: 2,
            method: 'individual',
            type: 'clinic',
            time: dayjs(new Date()),
            status: 'upcoming',
            patientId: 123496,
            fname: 'Ingy',
            lname: 'Mohamed',
            avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            phoneNum: '0123456789',
            gender: 'Female',
            age: 18,
            history: {
                chronicDis: ['disease1', 'disease2'],
                surgeries: ['surg1', 'surg2'],
                familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', familyMember: 'Sibling' }]

            },
            cancellable: true
        },
        {
            aptId: 3,
            method: 'group',
            type: 'clinic',
            time: dayjs(new Date()),
            status: 'cancelled',

            patientId: 123499,
            fname: 'Ashraf',
            lname: 'Mohamed',
            avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            phoneNum: '0123456789',
            gender: 'Female',
            age: 18,
            history: {
                chronicDis: ['disease1', 'disease2'],
                surgeries: ['surg1', 'surg2'],
                familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', familyMember: 'Sibling' }]
            },
            cancellable: false

        },
    ],
    '2024-05-01': [
        {
            aptId: 3,
            method: 'group',
            type: 'clinic',
            time: dayjs(new Date()),
            status: 'cancelled',

            patientId: 198456,
            fname: 'Nadine',
            lname: 'Yasser',
            avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            phoneNum: '0123456789',
            gender: 'Female',
            age: 18,
            history: {
                chronicDis: ['disease1', 'disease2'],
                surgeries: ['surg1', 'surg2'],
                familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', familyMember: 'Sibling' }]
            },
            cancellable: true

        },
        {
            aptId: 2,
            method: 'group',
            type: 'clinic',
            time: dayjs(new Date()),
            status: 'cancelled',

            patientId: 127856,
            fname: 'Ahmed',
            lname: 'Yasser',
            avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            phoneNum: '0123456789',
            gender: 'Female',
            age: 18,
            history: {
                chronicDis: ['disease1', 'disease2'],
                surgeries: ['surg1', 'surg2'],
                familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', familyMember: 'Sibling' }]
            },
            cancellable: true

        },
        {
            aptId: 1,
            method: 'group',
            type: 'clinic',
            time: dayjs(new Date()),
            status: 'cancelled',

            patientId: 123056,
            fname: 'Yasser',
            lname: 'Mohamed',
            avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
            phoneNum: '0123456789',
            gender: 'Female',
            age: 18,
            history: {
                chronicDis: ['disease1', 'disease2'],
                surgeries: ['surg1', 'surg2'],
                familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', familyMember: 'Sibling' }]
            },
            cancellable: false

        },
    ]
}
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
        co: {
            currComplaint: 'string',
            currSymptoms: [
                { symp: 'str1', level: 'Mild' },
                { symp: 'str2', level: 'Severe' },
                { symp: 'str3', level: 'Slight' },
                { symp: 'str4', level: 'Mild' },
            ]
        },
        history: {
            chronicDis: ['disease1', 'disease2'],
            surgeries: ['surg1', 'surg2'],
            familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', familyMember: 'Sibling' }]
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
                aptResults: {
                    ix: ['lab testX', 'lab textY'],
                    diagnosis: [
                        {
                            type: 'preliminary',
                            name: 'diagnosisName'
                        },
                        {
                            type: 'final',
                            name: 'diagnosisName'
                        },
                    ],
                    advices: 'sleep',
                    summary: 'visit summary',
                    prescriptionURl: 'pdfUrl',
                }

            }
        ],
        ix: [
            { testName: 'test1', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test2', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test3', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test4', time: dayjs(new Date()), pdf: 'pdfUrl' },

        ],
        rx: [
            {
                id: 1,
                freq: [{
                    val: 2,
                    time: 'noon'
                },//this means 2 times at noon
                {
                    val: 4,
                    time: 'morning'
                }],
                name: 'paracetamol',
                dosage: '2 mg',
                notes: '1 tablet everyday at noon for 10 days before food',
                periodInDays: 10,
                assignedDate: dayjs(new Date())

            },
            {
                id: 2,
                freq: [{
                    val: 2,
                    time: 'noon'
                },
                {
                    val: 4,
                    time: 'morning'
                }], //this means 2 times at noon
                name: 'paracetamol',
                dosage: '2 mg',
                notes: '1 tablet everyday at noon for 10 days before food',
                periodInDays: 10,
                assignedDate: dayjs(new Date())

            }
        ],
        readings: {
            pulse: {
                val: 99.0,
                time: dayjs(new Date())
            },
            pressure: {
                val: 125.0,
                time: dayjs(new Date())
            },
            weight: {
                val: 52,
                unit: 'kgs',
                time: dayjs(new Date())
            }
        }
    },
    {
        id: 245789,
        fname: 'Adel',
        lname: 'Mall',
        avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
        phoneNum: '0123456789',
        gender: 'Female',
        age: 18,
        co: {
            currComplaint: 'string',
            currSymptoms: [
                { symp: 'str1', level: 'Mild' },
                { symp: 'str2', level: 'Severe' },
                { symp: 'str3', level: 'Slight' },
                { symp: 'str4', level: 'Mild' },
            ]
        },
        history: {
            chronicDis: ['disease1', 'disease2'],
            surgeries: ['surg1', 'surg2'],
            familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', name: 'Sibling' }]
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
                aptResults: {
                    ix: ['lab testX', 'lab textY'],
                    diagnosis: [
                        {
                            type: 'preliminary',
                            name: 'diagnosisName'
                        },
                        {
                            type: 'final',
                            name: 'diagnosisName'
                        },
                    ],
                    advices: 'sleep',
                    summary: 'visit summary',
                    prescriptionURl: 'pdfUrl',
                }

            }
        ],
        ix: [
            { testName: 'test1', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test2', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test3', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test4', time: dayjs(new Date()), pdf: 'pdfUrl' },

        ],
        rx: [
            {
                id: 1,
                freq: [{
                    val: 2,
                    time: 'noon'
                },//this means 2 times at noon
                {
                    val: 4,
                    time: 'morning'
                }],
                name: 'paracetamol',
                dosage: '2 mg',
                notes: '1 tablet everyday at noon for 10 days before food',
                periodInDays: 10,
                assignedDate: dayjs(new Date())

            },
            {
                id: 2,
                freq: [{
                    val: 2,
                    time: 'noon'
                },
                {
                    val: 4,
                    time: 'morning'
                }], //this means 2 times at noon
                name: 'paracetamol',
                dosage: '2 mg',
                notes: '1 tablet everyday at noon for 10 days before food',
                periodInDays: 10,
                assignedDate: dayjs(new Date())

            }
        ],
        readings: {
            pulse: {
                val: 99.0,
                time: dayjs(new Date())
            },
            pressure: {
                val: 125.0,
                time: dayjs(new Date())
            },
            weight: {
                val: 52,
                unit: 'kgs',
                time: dayjs(new Date())
            }
        }
    },
    {
        id: 127656,
        fname: 'Ingy',
        lname: 'Mohamed',
        avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
        phoneNum: '0123456789',
        gender: 'Female',
        age: 18,
        co: {
            currComplaint: 'string',
            currSymptoms: [
                { symp: 'str1', level: 'Mild' },
                { symp: 'str2', level: 'Severe' },
                { symp: 'str3', level: 'Slight' },
                { symp: 'str4', level: 'Mild' },
            ]
        },
        history: {
            chronicDis: ['disease1', 'disease2'],
            surgeries: ['surg1', 'surg2'],
            familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', name: 'Sibling' }]
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
                aptResults: {
                    ix: ['lab testX', 'lab textY'],
                    diagnosis: [
                        {
                            type: 'preliminary',
                            name: 'diagnosisName'
                        },
                        {
                            type: 'final',
                            name: 'diagnosisName'
                        },
                    ],
                    advices: 'sleep',
                    summary: 'visit summary',
                    prescriptionURl: 'pdfUrl',
                }

            }
        ],
        ix: [
            { testName: 'test1', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test2', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test3', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test4', time: dayjs(new Date()), pdf: 'pdfUrl' },

        ],
        rx: [
            {
                id: 1,
                freq: [{
                    val: 2,
                    time: 'noon'
                },//this means 2 times at noon
                {
                    val: 4,
                    time: 'morning'
                }],
                name: 'paracetamol',
                dosage: '2 mg',
                notes: '1 tablet everyday at noon for 10 days before food',
                periodInDays: 10,
                assignedDate: dayjs(new Date())

            },
            {
                id: 2,
                freq: [{
                    val: 2,
                    time: 'noon'
                },
                {
                    val: 4,
                    time: 'morning'
                }], //this means 2 times at noon
                name: 'paracetamol',
                dosage: '2 mg',
                notes: '1 tablet everyday at noon for 10 days before food',
                periodInDays: 10,
                assignedDate: dayjs(new Date())

            }
        ],
        readings: {
            pulse: {
                val: 99.0,
                time: dayjs(new Date())
            },
            pressure: {
                val: 125.0,
                time: dayjs(new Date())
            },
            weight: {
                val: 52,
                unit: 'kgs',
                time: dayjs(new Date())
            }
        }
    },
    {
        id: 223456,
        fname: 'Ashraf',
        lname: 'Lo',
        avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
        phoneNum: '0123456789',
        gender: 'Female',
        age: 18,
        co: {
            currComplaint: 'string',
            currSymptoms: [
                { symp: 'str1', level: 'Mild' },
                { symp: 'str2', level: 'Severe' },
                { symp: 'str3', level: 'Slight' },
                { symp: 'str4', level: 'Mild' },
            ]
        },
        history: {
            chronicDis: ['disease1', 'disease2'],
            surgeries: ['surg1', 'surg2'],
            familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', name: 'Sibling' }]
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
                aptResults: {
                    ix: ['lab testX', 'lab textY'],
                    diagnosis: [
                        {
                            type: 'preliminary',
                            name: 'diagnosisName'
                        },
                        {
                            type: 'final',
                            name: 'diagnosisName'
                        },
                    ],
                    method: 'individual',
                    advices: 'sleep',
                    summary: 'visit summary',
                    prescriptionURl: 'pdfUrl',
                }

            }
        ],
        ix: [
            { testName: 'test1', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test2', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test3', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test4', time: dayjs(new Date()), pdf: 'pdfUrl' },

        ],
        rx: [
            {
                id: 1,
                freq: [{
                    val: 2,
                    time: 'noon'
                },//this means 2 times at noon
                {
                    val: 4,
                    time: 'morning'
                }],
                name: 'paracetamol',
                dosage: '2 mg',
                notes: '1 tablet everyday at noon for 10 days before food',
                periodInDays: 10,
                assignedDate: dayjs(new Date())

            },
            {
                id: 2,
                freq: [{
                    val: 2,
                    time: 'noon'
                },
                {
                    val: 4,
                    time: 'morning'
                }], //this means 2 times at noon
                name: 'paracetamol',
                dosage: '2 mg',
                notes: '1 tablet everyday at noon for 10 days before food',
                periodInDays: 10,
                assignedDate: dayjs(new Date())

            }
        ],
        readings: {
            pulse: {
                val: 99.0,
                time: dayjs(new Date())
            },
            pressure: {
                val: 125.0,
                time: dayjs(new Date())
            },
            weight: {
                val: 52,
                unit: 'kgs',
                time: dayjs(new Date())
            }
        }
    },
    {
        id: 123556,
        fname: 'Ahmed',
        lname: 'Aly',
        avatar: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
        phoneNum: '0123456789',
        gender: 'Female',
        age: 18,
        co: {
            currComplaint: 'string',
            currSymptoms: [
                { symp: 'str1', level: 'Mild' },
                { symp: 'str2', level: 'Severe' },
                { symp: 'str3', level: 'Slight' },
                { symp: 'str4', level: 'Mild' },
            ]
        },
        history: {
            chronicDis: ['disease1', 'disease2'],
            surgeries: ['surg1', 'surg2'],
            familyDis: [{ name: 'diseaseX', familyMember: 'Father' }, { name: 'diseaseY', name: 'Sibling' }]
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
                aptResults: {
                    ix: ['lab testX', 'lab textY'],
                    diagnosis: [
                        {
                            type: 'preliminary',
                            name: 'diagnosisName'
                        },
                        {
                            type: 'final',
                            name: 'diagnosisName'
                        },
                    ],
                    advices: 'sleep',
                    summary: 'visit summary',
                    prescriptionURl: 'pdfUrl',
                }

            }
        ],
        ix: [
            { testName: 'test1', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test2', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test3', time: dayjs(new Date()), pdf: 'pdfUrl' },
            { testName: 'test4', time: dayjs(new Date()), pdf: 'pdfUrl' },

        ],
        rx: [
            {
                id: 1,
                freq: [{
                    val: 2,
                    time: 'noon'
                },//this means 2 times at noon
                {
                    val: 4,
                    time: 'morning'
                }],
                name: 'paracetamol',
                dosage: '2 mg',
                notes: '1 tablet everyday at noon for 10 days before food',
                periodInDays: 10,
                assignedDate: dayjs(new Date())

            },
            {
                id: 2,
                freq: [{
                    val: 2,
                    time: 'noon'
                },
                {
                    val: 4,
                    time: 'morning'
                }], //this means 2 times at noon
                name: 'paracetamol',
                dosage: '2 mg',
                notes: '1 tablet everyday at noon for 10 days before food',
                periodInDays: 10,
                assignedDate: dayjs(new Date())

            }
        ],
        readings: {
            pulse: {
                val: 99.0,
                time: dayjs(new Date())
            },
            pressure: {
                val: 125.0,
                time: dayjs(new Date())
            },
            weight: {
                val: 52,
                unit: 'kgs',
                time: dayjs(new Date())
            }
        }
    },




]
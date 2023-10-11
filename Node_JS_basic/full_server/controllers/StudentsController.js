const { readDatabase } = require('../full_server/utils');

class StudentsController {
    static getAllStudents(request, response) {
        readDatabase('database.csv')
            .then(data => {
                const fields = Object.keys(data).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
                let output = 'This is the list of our students\n';

                fields.forEach(field => {
                    const studentsCount = data[field].length;
                    const studentsList = data[field].join(', ');
                    output += `Number of students in ${field}: ${studentsCount}. List: ${studentsList}\n`;
                });

                response.status(200).send(output);
            })
            .catch(error => {
                response.status(500).send(`Cannot load the database: ${error}`);
            });
    }

    static getAllStudentsByMajor(request, response) {
        const { major } = request.query;

        if (major && (major.toUpperCase() === 'CS' || major.toUpperCase() === 'SWE')) {
            readDatabase('database.csv')
                .then(data => {
                    const students = data[major.toUpperCase()];
                    const studentsList = students.join(', ');

                    response.status(200).send(`List: ${studentsList}`);
                })
                .catch(error => {
                    response.status(500).send(`Cannot load the database: ${error}`);
                });
        } else {
            response.status(500).send('Major parameter must be CS or SWE');
        }
    }
}

module.exports = StudentsController;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); 


const validDDDs = [
    '11', '12', '13', '14', '15', '16', '17', '18', '19', // SP
    '21', '22', '24', // RJ
    '27', '28', // ES
    '31', '32', '33', '34', '35', '37', '38', // MG
    '41', '42', '43', '44', '45', '46', // PR
    '47', '48', '49', // SC
    '51', '53', '54', '55', // RS
    '61', // DF
    '62', // GO
    '63', // TO
    '64', // MA
    '65', // MT
    '66', // MS
    '67', // MS
    '68', // AC
    '69', // RO
    '71', // BA
    '73', // BA
    '74', // BA
    '75', // BA
    '77', // BA
    '79', // SE
    '81', // PE
    '82', // AL
    '83', // PB
    '84', // RN
    '85', // CE
    '86', // PI
    '87', // PE
    '88', // CE
    '89', // PI
    '91', // PA
    '92', // AM
    '93', // AM
    '94', // PA
    '95', // RR
    '96', // AP
    '97', // MA
    '98', // MA
    '99'  // MA
];

app.post('/submit', (req, res) => {
    const { nomeAluno, dia, mes, ano, nomeResponsavel, ddd, tel, email, serie, turno, atividades } = req.body;

    
    let errors = [];

    
    if (!nomeAluno || !dia || !mes || !ano || !nomeResponsavel || !ddd || !tel || !email) {
        errors.push('Todos os campos são obrigatórios, exceto as atividades extracurriculares.');
    }

   
    const birthDate = new Date(`${ano}-${mes}-${dia}`);
    if (birthDate > new Date()) {
        errors.push('A data de nascimento deve ser válida e não pode ser futura.');
    }

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('O e-mail deve conter um "@" e um ".".');
    }

  
    if (!validDDDs.includes(ddd)) {
        errors.push('DDD inválido.');
    }

  
    if (atividades && atividades.length > 3) {
        errors.push('Você pode escolher no máximo 3 atividades extracurriculares.');
    }

    
    if (errors.length > 0) {
        res.send(`
            <html>
            <head>
                <title>Erro no Cadastro</title>
            </head>
            <body>
                <h1>Erro no Cadastro</h1>
                <ul>
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
                <a href="/">Voltar ao formulário</a>
            </body>
            </html>
        `);
    } else {
        res.send(`
            <html>
            <head>
                <title>Cadastro Sucesso</title>
            </head>
            <body>
                <h1>Cadastro realizado com sucesso!</h1>
                <p>Nome do Aluno: ${nomeAluno}</p>
                <p>Nome do Responsável: ${nomeResponsavel}</p>
                <p>Telefone: (${ddd}) ${tel}</p>
                <p>Email: ${email}</p>
                <p>Série: ${serie}</p>
                <p>Turno: ${turno}</p>
                <p>Atividades Extracurriculares: ${atividades ? atividades.join(', ') : 'Nenhuma'}</p>
                <a href="/">Voltar ao formulário</a>
            </body>
            </html>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

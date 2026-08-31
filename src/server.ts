import express, { Request, Response } from 'express';
import { User } from './models/user.js';

const app = express();


app.get('/', (req: Request, res: Response) => {
    res.send('Servidor ativo! Acesse /Users para ver os usuários.');
});

app.get('/users', (request: Request, response: Response) => {
    const user = new User('Ruan', 'ruan.jvn03@gmail.com', '123')

    console.log(user.verificarSenha('123'))
    console.log(user.getDadosPublicos())


    response.json({
        message: `Dados usuario ${user.getDadosPublicos()}`,
        timestamp: new Date().toISOString(),
        user: user,
        status: 'API FUNCIONANDO'
    })
});

app.listen(3000, () => {
    console.log('SUCESSO: Servidor rodando na porta 3000!');
    console.log('Acesse: http://localhost:3000/Users');

});

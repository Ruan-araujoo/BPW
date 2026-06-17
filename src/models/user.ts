export class User {
    constructor(
        public nome: string,
        public email: string,
        public senha: string,
    ) {}

    verificarSenha(senhaDigitada: string):
    boolean{
        return this.senha === senhaDigitada
    }
}

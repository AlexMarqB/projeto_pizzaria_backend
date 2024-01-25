// Sobrepomos a tipagem do express com está, adicionando uma propriedade
declare namespace Express {
    export interface Request {
        user_id: string;
    }
}
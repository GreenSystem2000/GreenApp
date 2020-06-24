interface IChronology {
    id: number;
    calendarType: string;
}

interface IValidade {
    year: number;
    month: string;
    monthValue: number;
    dayOfMonth: number;
    chronology: IChronology;
    dayOfWeek: number;
    leapYear: boolean;
    dayOfYear: number;
    era: string;
}

interface IProduto {
    id: number;
    descricao: string;
    quantidade: number;
    preco: number;
    localizacao: string;
    nome: string;
    categoria: string;
    estoqueMinimo: number;
    caminhoFoto: string;
    validade: IValidade;
}

interface IItens {
    id: number;
    produto: IProduto;
    comprar: number;
    quantidade: number;
    precototal: number;
}

export interface ICompras  {
    id: number;
    itens: IItens[];
    username: string;
    total: number;
}

export class Compras implements ICompras {
    id: number;
    itens: IItens[];
    username: string;
    total: number;
}

let compra: Compras;
compra.itens[0].comprar;
export interface User{
    id: number,
    password: string,
    first_name: string,
    last_name: string,
    email: string,
    showBank?: boolean
    userBanks?: Bank[]
}

export interface Bank{
    id: number,
    bank_name: string,
    routing_number: string,
    swift_bic: string,
    showUser?: boolean
    userBanks?: User[]
}

export interface AddUser {
    id?: number;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
}

export interface AddBank{
    id?: number,
    bank_name: string,
    routing_number: string,
    swift_bic: string,
}
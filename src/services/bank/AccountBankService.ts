

export class AccountBankService{

    async checkBalance(accountNumber: string): Promise<number>{
        return 1000;
    }

    async deposit(accountNumber: string, amount: number): Promise<void>{
        return;
    }

    async withdraw(accountNumber: string, amount: number): Promise<void>{
        return;
    }

    async transfer(fromAccountNumber: string, toAccountNumber: string, amount: number): Promise<void>{
        return;
    }
}
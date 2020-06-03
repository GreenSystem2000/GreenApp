export class About {
    name: string;
    phones: Phone[];
    workingTime: WorkingTime[];
    address: Address;

    constructor(data: any = null) {
        if (data) {
            this.name = data.name;

            // telefones
            this.phones = [];
            data.phones.forEach(phoneData => {
                const phone = new Phone(phoneData.number);
                this.phones.push(phone)
            });

            // horario de trabalho
            this.workingTime = [];
            data.workingTime.forEach(workingTimeData => {
                const workingTime = new WorkingTime(workingTimeData.day, workingTimeData.time, workingTimeData.open);
                this.workingTime.push(workingTime);
            });

            // endereços
            this.address = new Address(
                data.address.cep, 
                data.address.street,
                data.address.number,
                data.address.complement,
                data.address.neighborhood);
        }
    }
}

export class Phone {
    number: string;

    constructor(number: string) {
        this.number = number;
    }
}

export class WorkingTime {
    day: string;
    time: string;
    open: boolean;

    constructor(day: string, time: string, open: boolean) {
        this.day = day;
        this.time = time;
        this.open = open;
    }
}

export class Address {
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;

    constructor(cep: string, street: string, number: string, complement: string, neighborhood: string) {
        this.cep = cep;
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood;
    }

    toString() {
        let addressText = '';
        addressText += `${this.street}, ${this.number}`;

        if (this.complement) {
            addressText += ` - ${this.complement}`;
        }

        addressText += ` - ${this.neighborhood}, ${this.cep}`;

        return addressText;
    }
}
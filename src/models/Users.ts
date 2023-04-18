

export class User {
    constructor(
        private name : string
    ){
        this.name = name
    }

    public getName() : string{
        return this.name
    }
}

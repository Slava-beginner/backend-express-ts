import { User } from "./Users";

export class Article  {



    constructor(
        private title : string,
        private text : string,
        private author : User
        )
        {
            
        this.title = title;
        this.text = text;
        this.author = author
    }


    public  getTitle(): string  {
        return this.title
    }

 

    public  getText(): string {

        return this.text

    }

 

    public getAuthor(): User {

        return this.author;

    }
}
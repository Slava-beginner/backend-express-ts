import { ActiveRecordEntity } from "./ActiveRecordEnity";
import { User } from "./User";

export class Comment extends ActiveRecordEntity{
    private text : string;
    private authorId : number;
    private articleId : number;

    constructor(
        {
        id,
        text,
        authorId,
        articleId,
        createdAt
        } : {id: number, articleId: number,text:string,authorId:number,createdAt:Date}
        
    ){
        super();
        this.id = id;
        this.text = text;
        this.authorId = authorId;
        this.articleId = articleId
        this.createdAt = createdAt
    }
    public getText(){
        return this.text
    }
    public async getAuthor(){
        let author = await User.getById(this.authorId);
        return author
    }
   

  
}





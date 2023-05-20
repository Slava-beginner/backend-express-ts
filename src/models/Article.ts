import { ActiveRecordEntity } from "./ActiveRecordEnity";
import { Comment } from "./Comment";
import { User } from "./User";
export class Article extends ActiveRecordEntity{
    private name : string
    private text : string;
    private authorId : number;
  

    constructor(
        {
        id,
        name,
        text,
        authorId,
        createdAt
        } : {id: number, name: string,text:string,authorId:number,createdAt:Date}
        
    ){
        super();
        this.id = id;
        this.name = name;
        this.text = text;
        this.authorId = authorId;
        this.createdAt = createdAt
    }
    public getText(){
        return this.text
    }
    public getName(){
        return this.name
    }
    public async getAuthor(){
        let author = await User.getById(this.authorId);
        
        return author
    }
    public async getComments(){
        let comments = (await Comment.findAll()).filter(e => e.articleId == this.id);
        return comments
    }
  
}





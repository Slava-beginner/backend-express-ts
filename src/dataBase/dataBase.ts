import mongo from 'mongodb';
export interface UserInterface{
    id:number,
    nickname:string,
    email:string,
    isConfirmed:boolean,
    role:'admin'|'user',
    passwordHash:number,
    authToken:number,
    createdAt:Date
}
export interface ArticleInterface{
    id:number,
    authorId:number,
    name:string,
    text:string,
    createdAt:Date
}




class collectionWrapper {
    constructor(
        private collection: mongo.Collection
    ) {

    }
    async save(data: UserInterface | ArticleInterface) {

        return this.collection.updateOne({ id: data['id'] }, { $set: data }, { upsert: false });
    }
    async add(data: UserInterface | ArticleInterface) {
        return this.collection.insertOne(data);
    }
    async delete(id:number) {
        return this.collection.deleteOne({ id: id });
    }
    async clearAll() {
        return this.collection.deleteMany()
    }
    async getAll() {
        const collectionData = await this.collection.find();
        return collectionData.toArray()
    }
    async getById(id: number)    {
        id = Number(id);
        try {
            let data  = await this.collection.findOne({ id: id });
            return data
        } catch (error) {
            throw new Error(`Error with getting ${id}`)
        }
       
     
    }
    async has(id: number) {
        try {
            let hasData = await this.getById(id);
            return hasData ? true : false
        } catch (error) {
            throw new Error(`Error ${error}`)
        }
    }

}

 export class DataBase {
    private dbUsers: collectionWrapper;
    private dbArticles: collectionWrapper;
    constructor(
        
        private db?: mongo.Db,
    ) {
       
        //@ts-ignore
        if (typeof DataBase.instance === 'object') {
            //@ts-ignore
            return DataBase.instance
          }
          if(!db){
            return
        }
        this.db = db;
        this.dbUsers = new collectionWrapper(db.collection('users'));
        this.dbArticles = new collectionWrapper(db.collection('articles'));
        //@ts-ignore
        DataBase.instance = this;
        return this

    }
    // РАБОТА С БД
    DB(name:'users' | 'articles'): collectionWrapper {
        return name == 'users' ? this.dbUsers : this.dbArticles
    }
    
}


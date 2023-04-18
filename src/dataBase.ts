import mongo from 'mongodb';
export class DataBase {
    constructor(
        private db : mongo.Collection
        ) {
       this.db = db;

   }

   // РАБОТА С БД

   async saveUser(user:any) {
       
       return this.db.updateOne({ id: user['id'] }, {$set:user}, { upsert: false });

   }

   async addNewUser(user:any) {
       return this.db.insertOne(user);

   }

   async deleteUser(user:any) {
    return this.db.deleteOne({ id: user['id'] });

    }
    async clearBase() {
        return this.db.deleteMany()
    
    }

    async getDb(){
        const db = this.db.find();
        return await db.toArray()
    }


   async getUserById(id:number) {
       id = Number(id);
       if(isNaN(id)){
           return null
       }
       let user = await this.db.findOne({ id: id });
       if (user) {
           return user
       }
       else {
           return null;
       }
   }
  


   
   

   async hasUser(id:number) {
       try {
           let hasUser = await this.getUserById(id);
           
           return hasUser ? true : false
       } catch (error) {
           throw new Error(`Error ${error}`)
       }
   }

   

  
}


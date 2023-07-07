import mongoose from "mongoose";

let isConnected = false; 

export const connectToDB = async () => {
    mongoose.set('strictQuery', true); 

    if(isConnected) { 
        console.log("MongoDB is connected and ready to go."); 
        return; 
    } 

    try { 
        await mongoose.connect(process.env.MONGODB_URI, { 
            dbName: 'blog', 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        }); 

        isConnected = true; 
        console.log("MongoDB Connected"); 
    } catch (err) { 
        console.error(err);  
    }
}; 
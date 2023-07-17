import { connectToDB } from "../../../utils/database"; 
import Todo from '../../../models/todo'; 
import User from "../../../models/user"; 

export const POST = async (req, res) => {
    try {
      const { userid, title, description, list } = await req.json();
      console.log(list); 
      await connectToDB();
  
      let newTodo = new Todo({
        title,
        creator: userid,
        description,
        list,
      });
  
      await newTodo.save();
  
      // Push the newTodo._id into the activity.todos array of the user
      await User.findOneAndUpdate(
        { _id: userid },
        { $push: { "activity.todos": newTodo._id } }
      );
  
      return new Response(JSON.stringify(newTodo), { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response(`Cannot create the list due to this error: ${err}`, { status: 500 });
    }
  };
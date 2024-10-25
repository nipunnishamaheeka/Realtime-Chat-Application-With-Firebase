import {
  collection,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import "./addUser.css";
import { db } from "../../../../lib/firebase";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";
const AddUser = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      } else {
        setUser(null); // Clear user if no match found
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
    try {
      // Create a new chat document with an auto-generated ID
      const newChatRef = doc(chatRef); // Firestore will generate an ID for us
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

       await updateDoc(doc(userChatsRef, currentUser.id), {
         chats: arrayUnion({
           chatId: newChatRef.id,
           lastMessage: "",
           receiverId: user.id,
           updatedAt: Date.now(),
           
         }),
       });
      
      console.log("New chat created with ID:", newChatRef.id);

      // Continue with adding to userChats if necessary...
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="User avatar" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;

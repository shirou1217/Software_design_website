import React, { useContext, useState } from "react";
// import uploadpicture from "../img/add-image.jpg"
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";


const Type = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { loginUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: loginUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });

            //  // Get the current chat room data
            // const roomDataSnapshot = await getDoc(doc(db, "chatroom", data.chatId));
            // const roomData = roomDataSnapshot.data().room;
            // const roomIndex = roomData.findIndex(room => room.roomid === 0);
            // console.log(roomIndex);
            // if (roomIndex !== -1) {
            //     // Update the room object with the new message using arrayUnion
            //     roomData[roomIndex].message = arrayUnion({
            //       id: uuid(),
            //       text,
            //       senderId: loginUser.uid,
            //       date: Timestamp.now(),
            //       img: downloadURL,
            //     });

            //     // Update the Firestore document with the modified room data
            //     await updateDoc(doc(db, "chatroom", data.chatId), {
            //       room: roomData,
            //     });

            //     console.log('New message added to room successfully!');
            // }
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: loginUser.uid,
          date: Timestamp.now(),
        }),
      });
      // // Get the current chat room data
      // const roomDataSnapshot = await getDoc(doc(db, "chatroom", data.chatId));
      // const roomData = roomDataSnapshot.data().room;
      // const roomIndex = roomData.findIndex(room => room.roomid === 0);

      // if (roomIndex !== -1) {
      //   // Update the room object with the new message using arrayUnion
      //   roomData[roomIndex].message = arrayUnion({
      //     id: uuid(),
      //     text,
      //     senderId: loginUser.uid,
      //     date: Timestamp.now(),
      //   });

      //   // Update the Firestore document with the modified room data
      //   await updateDoc(doc(db, "chatroom", data.chatId), {
      //     room: roomData,
      //   });

      //   console.log('New message added to room successfully!');
      // }
    }

    await updateDoc(doc(db, "userChats", loginUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          {/* <img src={uploadpicture} alt="" /> */}
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Type;

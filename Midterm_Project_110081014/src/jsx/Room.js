import React, { useState,useContext } from 'react'
import { AuthContext } from "../context/AuthContext";
import {
    arrayUnion,
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
    updateDoc,
    serverTimestamp,
    getDoc,
  } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from '../firebase';
// import invite from '../img/add.png';
// import create from '../img/createchatroom.png';

const Room = () => {
    const { loginUser } = useContext(AuthContext);
    const [usedNumbers, setUsedNumbers] = useState([]);
    const [userCounts, setUserCounts] = useState({});
    const addperson = async () => {

    }
    const generateUniqueRandomNumber = () => {
        let randomNumber;
        do {
            // Generate a random number between 1 and 1000
            randomNumber = Math.floor(Math.random() * 1000) + 1;
        } 
        while (usedNumbers.includes(randomNumber)); // Repeat if the number is already used
        console.log({randomNumber});
        return randomNumber;
    };
    const createroom = async () => {
        try{ 
            console.log('Click!!!!');
            //create a chat in chats collection
            const roomId = generateUniqueRandomNumber();
            const combinedId =loginUser.uid ;
            const userCount = userCounts[combinedId] || 0;
            setUserCounts({ ...userCounts, [combinedId]: userCount + 1 });
            
            const res = await getDoc(doc(db, "chatroom", combinedId));
            if (!res.exists()) {
                    // setUsedNumbers([...usedNumbers, combinedId]);
                    // console.log({combinedId});
                    // await setDoc(doc(db, "chatroom", combinedId), { 
                    //     room: arrayUnion({
                    //         roomid: roomId,
                    //         user : [loginUser.uid],
                    //         message:[],
                    //     }),

                    // });
                    setUsedNumbers([...usedNumbers, combinedId]);
                    const getUserCounts = () => userCounts;
                    console.log({userCount});
                    await setDoc(doc(db, "chatroom", combinedId), { 
                        room: arrayUnion({
                            roomid: roomId,
                            user: [loginUser.uid],
                            message: [],
                            count: userCount, // Set count to the current user's count
                        }),
                    });
                    console.log('Chat room created successfully!');
            }
            else{ 
                await updateDoc(doc(db, "chatroom", combinedId), {
                    // room: arrayUnion({
                    //     roomid: roomId,
                    //     user : [loginUser.uid],
                    //     message:[],
                    // }),
                    room: arrayUnion({
                        roomid: roomId,
                        user: [loginUser.uid],
                        message: [],
                        count: userCount, // Set count to the current user's count
                    }),
                
                });
                console.log('Chat room updated successfully!');

            }
            
               
        } catch (err) {}

    };
    return (
        <div className="room">
            <div class="addperson">
                {/* <img src={invite } alt="" onClick={addperson} /> */}
            </div>
            <div class="createroom">
                {/* <img src={create} alt="" onClick={createroom} /> */}
            </div>
        </div>

    );
   
};

export default Room


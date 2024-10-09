import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "chats", "5dAR7KRcZHLmNHClkZxz"),
      (res) => {
        setChat(res.data());
      }
    );
    return () => {
      unSub();
    };
  }, []);
  console.log(chat)
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };
  console.log(text);
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Jane Done</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              rerum optio voluptas porro facilis repellendus ut nostrum laborum
              voluptatum. Eaque eius tempora iure inventore odit iste itaque est
              illo aspernatur.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="./favicon.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              rerum optio voluptas porro facilis repellendus ut nostrum laborum
              voluptatum. Eaque eius tempora iure inventore odit iste itaque est
              illo aspernatur.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              rerum optio voluptas porro facilis repellendus ut nostrum laborum
              voluptatum. Eaque eius tempora iure inventore odit iste itaque est
              illo aspernatur.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              rerum optio voluptas porro facilis repellendus ut nostrum laborum
              voluptatum. Eaque eius tempora iure inventore odit iste itaque est
              illo aspernatur.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              rerum optio voluptas porro facilis repellendus ut nostrum laborum
              voluptatum. Eaque eius tempora iure inventore odit iste itaque est
              illo aspernatur.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              rerum optio voluptas porro facilis repellendus ut nostrum laborum
              voluptatum. Eaque eius tempora iure inventore odit iste itaque est
              illo aspernatur.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
};

export default Chat;

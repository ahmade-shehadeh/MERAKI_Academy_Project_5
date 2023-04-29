import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Chat.css";
import axios from "axios";
const Chat = () => {
 const [content, setContent] = useState("");
  const [output, setOutput] = useState("");
  const ChatNow = async () => {
    const apiKey = "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";
    const requset = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    };
    axios
      .post(`https://api.openai.com/v1/chat/completions`, requset, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${apiKey}`,
        },
      })
      .then((result) => {
        console.log(result);
        setOutput(result.data.choices[0].message.content)
      })
      .catch((err) => {
        console.log(err.response.data.error.message);
      });
  };
  return (
    <div className="main-container">
      <p className="main-title">Good Day, Ask Me Please! </p>
      <div className="main-content">
        <input
          className="word-input"
          type="search"
          placeholder="Inquire about services & maintenance"
          onChange={(e)=>{
const value=e.target.value
setContent(value)
          }}
        ></input>
        <Button size="sm" className="submit-btn" onClick={ChatNow}>
          {" "}
          Submit
        </Button>
        <Button size="sm" className="submit-btn" onClick={()=>{
            setOutput('')
        }}>
          {" "}
          Clear
        </Button>
      </div>
      <div className="reply-content " style={{ overflow: "auto" }}>
        <div style={{ maxHeight: "100%"}}>{output}</div>
      </div>
    </div>
  );
};

export default Chat;

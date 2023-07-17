import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = {
  _id: 2,//the id of the user that wrote the message
  name: "React Native Chatbot",
  avatar: "https://loremflickr.com/140/140",
};//ChatBot user object 

export default function App() {
  var[index, setindex] = useState(0);
  var[x, setx] = useState(Math.floor(Math.random() * 100));
  var[y, sety] = useState(Math.floor(Math.random() * 100));
  var[z, setz] = useState(x+y);
  const [messages, setMessages] = useState([]);//we use state variable to have a message and change it 
  const level1 = [
    {
      question1: "Hello, welcomed to simple trivia! Say 'Yes' when you're ready to play!",
      correct: "Yes",
      fail: "Please try again",
      
    },
    {
      addition:"Addition",
      equation:
        x+"+"+y,
      correct: z,
      fail: "Please try again",
    },//0
    {
      subtraction:"Subtraction",
      equation:
        x+"-"+y,
      correct: "z",
      fail: "Please try again",
    },//1
  ]

  useEffect(() => {
    setMessages([//setMessage is from the usestate
      {
        _id: 1,
        text: "Hello, welcome to simple trivia! If you are ready to play write 'Addition' or 'Subtraction'",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  }, []);//useEffect lets you synchronize a component with an external system

  const addNewMessage = (newMessages) => {//newMessage
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);//GiftedChat adds messages to currentMessages by using concat
    });
  };//another keyword to declare a variable when you do not want to change the value of that variable for the whole program



  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };//text


  // const respondToUser = (userMessages) => {
  //   console.log("User message text:", userMessages[0].text);

  //   // Simple chatbot logic (aka Checkpoint 2 onwards) here!

  //   addBotMessage("I am da response!");
  // };

  const respondToUser = (userMessages, level1) => {

    console.log("User message text:", userMessages[0].text);
    console.log("index:", index);
      
    if(index < 4){//we'll do each round 4 times
      
      if(userMessages[0].text == level1[1].addition){
        setindex(1);
        setx(Math.floor(Math.random() * 100));//randomize x
        sety(Math.floor(Math.random() * 100));//randomize y
        setz(x+y);//setting z to addtion
        addBotMessage(level1[1].equation);
        console.log("index:", index);
        console.log(level1[index].equation);
      }

      
      if(userMessages[0].text == level1[2].subtraction){
        setindex(2);
        setx(Math.floor(Math.random() * 100));//randomize x
        sety(Math.floor(Math.random() * 100));//randomize y
        setz(x-y);//setting z to addtion
        addBotMessage(level1[2].equation);
        console.log("index:", index);
      }
      if(userMessages[0].text==level1[1].correct || userMessages[0].text==level1[2].correct){
          addBotMessage("Correct");
          addBotMessage("'Addition' or 'Subtraction'");
          setindex(0);
        }
      else if (index != 0){
        addBotMessage("Please Try Again!");
      }
    }
    else{
      addBotMessage(messages);
    }

  };//userMEssages

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages)
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages, level1), 1000);
      }}
      user={{
        _id: 1,
        name: "Jovanna",
      }}
      renderUsernameOnMessage={true}

    />
  );
}

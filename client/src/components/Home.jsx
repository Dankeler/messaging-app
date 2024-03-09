/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState, useRef } from "react";
import {Card, CardContent, CardHeader, CardMeta,  Menu, Grid, CommentGroup, CommentContent, Comment, CommentText, Input, Form, Button, CommentAuthor, CommentMetadata } from "semantic-ui-react"
import { UserContext } from "../App";
import axios from "axios"
import { Navigate, Link } from "react-router-dom";



const Home = () => {
  const [friends, setFriends] = useState(false)
  const [user, setUser] = useContext(UserContext)
  const [selectedUser, setSelectedUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messages, setMessages] = useState([])
  const [sendMessage, setSendMessage] = useState(false)

  const [users, setUsers] = useState([])

  const messagesContainer = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${user}`)

        if (response.status === 200) {
          setUsers(response.data)
          setSelectedUser(response.data[0])
        }
      } catch(err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {

    const fetchMessages = async () => {
      console.log("fetch")
      try {
        const response = await axios.get(`http://localhost:3000/messages/${user}/${selectedUser.username}`)

        if (response.status === 200) {
          setMessages(response.data)
        }
      } catch(err) {
        console.log(err)
      }
    }
    fetchMessages()
  }, [selectedUser, sendMessage])

  const handleLogOut = async () => {

    try {
      const response = await axios.post("http://localhost:3000/log-out")

      if (response.status === 200) {
        setUser(null)
      }
    } catch(err) {
      console.log(err)
    }
  }

  const handleMessage = async () => {
    try {
      const response = await axios.post("http://localhost:3000/message/send", {message, selectedUser: selectedUser.username, user})

      if (response.status === 200) {
        setMessage("")
      }
    } catch(err) {
      console.log(err)
    }
  }

  const refreshMessages = () => {
    console.log("refresh")
    setInterval(setSendMessage(!sendMessage), 5000)
  }

    return (
      <div style={{height: "100vh", width: "100vw"}}>
        {!user && 
          <Navigate to="/" />
        }
        
        <Menu style={{minHeight: "5%", maxHeight: "5%"}} inverted>
          <Menu.Menu position="left">
            <Menu.Item style={{minWidth: 200, justifyContent:"center", backgroundColor: !friends ? "#2185d0" : "rgb(27, 28, 29)", outline: "1px solid rgb(27, 28, 29)", zIndex: 1}} onClick={() => setFriends(false)}>Home</Menu.Item>
            <Menu.Item style={{minWidth: 200, justifyContent:"center", backgroundColor: friends ? "#2185d0" : "rgb(27, 28, 29)"}} onClick={() => setFriends(true)}>Friends</Menu.Item>
          </Menu.Menu>

          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/profile">Edit Profile</Menu.Item>
            <Menu.Item onClick={() => handleLogOut()}>Log Out</Menu.Item>
          </Menu.Menu>
        </Menu>
        {!friends && users.length > 0 && (
          <Grid style={{height: "95%"}}>
            <Grid.Column textAlign="left" style={{maxWidth: "11.05%", minWidth: "11.05%", padding: 0}}>
              <Menu vertical inverted style={{minWidth: "100%", flexDirection: "column", display: "flex"}}>
                {users.map((user, index) => (
                  <Menu.Item onClick={() => setSelectedUser(user)} inverted key={index} style={{paddingLeft: "2em", backgroundColor: (selectedUser.username === user.username) ? "#2185d0" : "rgb(27, 28, 29"}}>{user.username}</Menu.Item>
                ))}
              </Menu>
            </Grid.Column>
            <Grid.Column style={{display: "flex", flexDirection: "column", paddingLeft: "2rem", minWidth: "70%", maxHeight: "100%"}}>
              <Grid.Row style={{overflowY: "auto"}} ref={messagesContainer}>
                <CommentGroup>
                    {messages.length > 0 && (
                      <>
                      {messages.map((message, index) => (
                        <Comment key={index}>
                          <CommentContent style={{textAlign: "left"}}>
                            <CommentAuthor style={{color: "white"}} as="a">{message.from.username}</CommentAuthor>
                            <CommentMetadata style={{color: "white"}}>{message.date_formatted}</CommentMetadata>
                            <CommentText style={{ color: "white"}}>{message.content}</CommentText>
                          </CommentContent>
                        </Comment>
                      ))}
                      </>
                    )}
                </CommentGroup>
              </Grid.Row>
              <Grid.Row style={{marginBottom: "1em", maxHeight:"20%"}}>
                <Form style={{display: "flex"}} onSubmit={() => {handleMessage(), refreshMessages()}}>
                  <Input value={message} style={{minWidth: "90%", marginRight: "30px"}} fluid onChange={(e) => setMessage(e.target.value)}/>
                  <Button type="submit">Send</Button>
                </Form>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column style={{minWidth: "18.95%"}}>
              <Card>
                <CardContent>
                  <CardHeader>{selectedUser.username}</CardHeader>
                  <CardMeta>
                    <span>{selectedUser.about}</span>
                  </CardMeta>
                </CardContent>
              </Card>
            </Grid.Column>
          </Grid>
      )}
    </div>
  );
};

export default Home
import { Header, Form, Segment, FormField, Grid, Button } from "semantic-ui-react";
import {Link, Navigate} from "react-router-dom"
import { useState } from "react";
import axios from "axios"
import {UserContext} from "../App"
import { useContext } from "react"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [user, setUser] = useContext(UserContext)

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:3000/log-in", {username, password})

            if (response.status === 200) {
              setUser(response.data.user.username)
            }
        } catch(err) {
            console.log(err)
        }
    }

  return (
    <Grid verticalAlign="middle" centered style={{ height: "100vh" }}>
      {user && <Navigate to="/home"></Navigate>}
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" inverted textAlign="center">
          Log In
        </Header>
        <Form size="large" onSubmit={handleLogin}>
          <Segment stacked inverted>
              <FormField>
                <label>Username</label>
                <input onChange={(e) => setUsername(e.target.value)}/>
              </FormField>
              <FormField>
                <label>Password</label>
                <input type="password"  onChange={(e) => setPassword(e.target.value)}/>
              </FormField>
              <Button type="submit" fluid style={{backgroundColor: "#2185d0", color: "white"}}>Log In</Button>
          </Segment>
        </Form>
        <Grid verticalAlign="middle" centered style={{marginTop: 2}}>
            <Grid.Column>
                <Segment stacked inverted>
                    <Button style={{marginLeft: "155px"}} as={Link} to="/">Home</Button>
                </Segment>
            </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid>
  );
};

export default Login;

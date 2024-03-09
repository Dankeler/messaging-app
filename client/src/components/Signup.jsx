import { Header, Form, Segment, FormField, Grid, Button, FormCheckbox} from "semantic-ui-react";
import {UserContext} from "../App"
import {Link, Navigate} from "react-router-dom"
import axios from "axios"
import { useContext, useState } from "react";


const Signup = () => {
    const [user, setUser] = useContext(UserContext)
    const [username,  setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [about, setAbout] = useState("")
    const [error, setError] = useState(null)

    const handleSignup =  async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setError("Passwords do not match")
        }
        try {
            setError(null)
            const response = await axios.post("http://localhost:3000/sign-up", {username, password, about})

            if (response.status === 200) {
                setUser(response.data.username)
            } else {
                console.log("WRONG")
            }
        } catch(err) {
            setError(err.response.data.error)
        }
    }

    return (
        <Grid verticalAlign="middle" centered style={{ height: "100vh" }}>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h1" inverted textAlign="center">
              Sign Up
            </Header>
            <Form size="large" onSubmit={handleSignup}>
              <Segment stacked inverted>
                  <FormField required={true}>
                    <label>Username</label>
                    <input style={{color: "black"}} id="username" onChange={(e) => setUsername(e.target.value)}/>
                  </FormField>
                  <FormField required={true}>
                    <label>Password</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
                  </FormField>
                  <FormField required={true}>
                    <label>Confirm Password</label>
                    <input type="password" id="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                  </FormField>
                  <FormField>
                    <label>About Yourself</label>
                    <textarea cols="1" rows="3" maxLength={100} id="about" onChange={(e) => setAbout(e.target.value)}></textarea>
                  </FormField>
                  <FormField required={true}>
                    <FormCheckbox label="I agree to the Terms and Conditions" required></FormCheckbox>
                  </FormField>
                  <Button type="submit" fluid style={{backgroundColor: "#2185d0", color: "white"}}>Create Account</Button>
                  {error && <p style={{color: "red", marginTop: 10}}>{error}</p>}
              </Segment>
            </Form>
            <Grid verticalAlign="middle" centered style={{marginTop: 2}}>
                <Grid.Column>
                    <Segment stacked inverted>
                        <Button style={{marginLeft: "155px"}} as={Link} to="/">Home</Button>
                    </Segment>
                    {user && <Navigate to="/log-in"></Navigate>}
                </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      );
    };

export default Signup
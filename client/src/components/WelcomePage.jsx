import {Header, Button} from "semantic-ui-react"
import {Link} from "react-router-dom"
import {UserContext} from "../App"
import { useContext } from "react"


const WelcomePage = () => {
    const [user] = useContext(UserContext)

    return (
        <div style={{padding: "200px"}}>
            {user && <Header as="h1" inverted>You are logged in as: {user}</Header>}
            <Header as="h1" dividing inverted>Welcome to ?????? Message!</Header>
            {!user && (
                <>
                    <Header as="h3" inverted>Log in or Sign up to continue.</Header>
                    <Button primary as={Link} to="/log-in">Log In</Button>
                    <Button secondary as={Link} to="sign-up">Sign Up</Button>
                </>
            )}
            {user && (
                <>
                <Button primary as={Link} to="/home">Home</Button>
                </>
            )}
        </div>
    )
}

export default WelcomePage
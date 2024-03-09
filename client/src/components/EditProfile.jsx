/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import {Label, Input, Form, FormField, Card, Button} from "semantic-ui-react"
import { UserContext } from "../App"
import axios from "axios"
import {Navigate, Link} from "react-router-dom"

const EditProfile = () => {
    const [user, setUser] = useContext(UserContext)
    const [about, setAbout] = useState(null)

    const [newUser, setNewUser] = useState(null)
    const [newAbout, setNewAbout] = useState(null)

    useEffect(() => {
        const aboutMe = async () => {
            const response = await axios.get(`http://localhost:3000/profile/${user}/description`)

            if (response.status === 200) {
                setAbout(response.data.about)
            }
        }
        aboutMe()
    }, [])

    const handleSubmit = async () => {
        try {
            const response = await axios.patch("http://localhost:3000/profile/description/update", {newUser, newAbout, user})

            if (response.status === 200) {
                setUser(response.data.username)
                setAbout(response.data.about)
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Card style={{backgroundColor: "rgb(27, 28, 29)"}}>
                <Form onSubmit={handleSubmit}>
                    <FormField>
                        <Label>User</Label>
                        <Input defaultValue={user} onChange={(e) => setNewUser(e.target.value)}></Input>
                    </FormField>
                    <FormField>
                        <Label>About me</Label>
                        {!about && <Input onChange={(e) => setNewAbout(e.target.value)}></Input>}
                        {about && <Input defaultValue={about} onChange={(e) => setNewAbout(e.target.value)}></Input>}
                    </FormField>
                    <Button type="submit">Edit Profile</Button>
                    <Button as={Link} to="/home">Return</Button>
                </Form>
            </Card>
            {!user && <Navigate to="/"></Navigate>}
        </div>
    )
}

export default EditProfile
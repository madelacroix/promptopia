"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@components/Profile"

const MyProfile = () => {
    const handleEdit = () => { }
    const handleDelete = () => { }

    const [myPosts, setMyPosts] = useState([])
    const { data: session } = useSession()


    useEffect(() => {
        console.log("===========> USE EFFECT");
        const fetchPosts = async () => {
            console.log("===========> FETCH POST");
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            console.log("===========> RESPONSE", response);
            const data = await response.json();

            setMyPosts(data);
        };

        if (session?.user.id) fetchPosts();
    }, [session?.user.id])

    return (
        <Profile
            name="My"
            desc="Welcome to your profile page"
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile
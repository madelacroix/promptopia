"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@components/Form"

const UpdatePrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    console.log("===============> SEARCH PARAMS", searchParams)
    const promptId = searchParams.get("id");
    console.log("===============> PROMPT ID", promptId)

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    })

    useEffect(() => {
        console.log("===============> USE EFFECT")
        const getPromptDetails = async () => {
            console.log("===============> GET PROMPT")            
            const response = await fetch(`/api/prompt/${promptId}`)
            console.log("===============> USE RESPONSE", response)            
            const data = await response.json()
            
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if(promptId) {
            console.log("===============> IF STATEMENT")            
            getPromptDetails()
        }
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true)

        if(!promptId) return alert("Missing Prompt ID")

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default UpdatePrompt
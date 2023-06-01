"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => {
        return (
          <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
        )
      })}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [allPosts, setAllPosts] = useState([])

  const handleSearch = (e) => { }

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    console.log("===========> RESPONSE", response);
    const data = await response.json();
    console.log("===========> DATA", data)

    setAllPosts(data)
  }

  useEffect(() => {
    console.log("===========> USE EFFECT");
    console.log("============>POSTS", allPosts)
    fetchPosts();
  }, [])

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i")
    return allPosts.filter((item) => {
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    })
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearch}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={allPosts}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed
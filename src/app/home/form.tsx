"use client"

import { ChangeEvent, FormEvent, useState } from 'react'

const postData = async (data: Record<string,unknown>) => {
  const resp = await fetch('/', { 
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
  if (!resp.ok) throw Error(await resp.text())

  return resp.text()
}

export default function Form() {
  const [content,setContent] = useState<string>('')

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value)
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const compressed = await postData({content})
      alert(compressed)
    } catch (err: any) {
      console.error(err.message)
    }
    setContent('')
  }

  return (
    <form onSubmit={submit}>
      <div className="input">
        <label>Content
          <input id="name" name="name" value={content} type="text" onChange={handleFormChange} />
        </label>
      </div>

      {/* <div className="input">
        <label for="content-type">Content Type?</label>
        <select id="content-type" name="content-type">
          <option value="application/json;charset=utf-8">JSON</option>
          <option value="text/csv">CSV</option>
          <option value="text/plain">Plain Text</option>
        </select>
      </div> */}

      <button type="submit" disabled={!content}>Store</button>
    </form>
  )
}
"use client"
import { FormEvent } from 'react'
import { Outcome } from '@/app/app/outcome.type'


export type Payload = {
  contentType: string,
  content: string
}


type Props = {
  onSubmitOutcome: (outcome: Outcome) => void
}



const postData = async ({ content, contentType }: Payload) => {
  const resp = await fetch('/', { 
    method: 'POST',
    body: content,
    headers: {
      'Content-Type': contentType
    }
  })
  if (!resp.ok) throw Error(await resp.text())

  const location = resp.headers.get('Location') || await resp.text()

  if (!location) {
    throw new Error('Missing Location header')
  }

  return location
}


export default function ContentForm({ onSubmitOutcome }: Props) {

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries()) as Payload

    try {
      const url = await postData(payload)
      form.reset()
      onSubmitOutcome(url)
    } catch (err: any) {
      onSubmitOutcome(err as Error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} acceptCharset="UTF-8">
        <p>
          <label>
            Content Type
            <select name="contentType" defaultValue="text/plain">
              <option value="text/plain">Plain Text</option>
              <option value="text/csv">CSV</option>
              <option value="text/html">HTML</option>
              <option value="application/json">JSON</option>
            </select>
          </label>
        </p>
        <p>
          <label>
            Content
            <textarea
              name="content"
              rows={10}
              placeholder="Paste your content here"
              minLength={1}
              required
            />
          </label>
        </p>
        <button type="submit">Store</button>
      </form>
    </>
  )
}
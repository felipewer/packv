"use client"
import { FormEvent, useState } from 'react'


export type Payload = {
  contentType: string,
  content: string
}

type Props = {
  onFormSubmit: (payload: Payload) => Promise<string>
}

type FormStatus = {
  status: 'FRESH' | 'SUCCESS' | 'ERROR'
  message?: string
}

const errorSection = (formStatus: FormStatus) => (
  <section>
    <details>
      <summary>Content could not be stored</summary>
      <p>{formStatus.message}</p>
    </details>
  </section>
)

const successSection = (formStatus: FormStatus) => (
  <section>
    <details open>
      <summary>Content stored successfully</summary>
      <p>
        <a href={formStatus.message} target='_blank'>{formStatus.message}</a>
        <button>Copy</button>
      </p>
    </details>
  </section>
)

export default function ContentForm({onFormSubmit}: Props) {
  const [formStatus, setFormStatus] = useState<FormStatus>({status: 'FRESH'})

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries()) as Payload

    try {
      const result = await onFormSubmit(payload)
      form.reset()
      setFormStatus({
        status: 'SUCCESS',
        message: result
      })
    } catch (err: any) {
      setFormStatus({
        status: 'ERROR',
        message: err.message
      })
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
      {(formStatus.status === 'FRESH')
        ? <section><p></p></section>
        : (formStatus.status === 'SUCCESS')
        ? successSection(formStatus)
        : errorSection(formStatus)
      }
    </>
  )
}
'use client'
import { useEffect, useState } from 'react'
import ContentForm, { type Payload } from '@/app/app/content-form'
import HistoryList from '@/app/app/history-list'

const postData = async (payload: Payload) => {
  const resp = await fetch('/', { 
    method: 'POST',
    body: payload.content,
    headers: {
      'Content-Type': payload.contentType
    }
  })
  if (!resp.ok) throw Error(await resp.text())

  return resp.text()
}


type URLTuple = [timestamp: string, url: string]

export default function Home() {
  const [storedURLs, setStoredURLs] = useState<URLTuple[]>([])


  useEffect(() => {
    const sessionUrls = Object.entries(sessionStorage)
      .sort(([tmtA],[tmtB]) => parseInt(tmtB) - parseInt(tmtA))
    setStoredURLs(sessionUrls)
  },[])
  

  const handleFormSubmit = async (payload: Payload) => {
    const url = await postData(payload)
    const timestamp = `${(new Date()).getTime()}`
    setStoredURLs(prev => ([[timestamp, url], ...prev]))
    sessionStorage.setItem(timestamp,url)
    return url
  }


  return (
    <main>
      <hgroup>
        <h1>PACKV</h1>
        <p>
          A compressed key value store for <em title='max X KB'>small</em> textual content. Post content to have it compressed and encoded into a url. Access the url to retrieve the original value.
        </p>
      </hgroup>
      <section>
        <h2>Store content</h2>
        <ContentForm onFormSubmit={handleFormSubmit}/>
      </section>
      <section>
        <h2>Stored Content Urls</h2>
        <HistoryList storedURLs={storedURLs} />
      </section>
    </main>
  )
}

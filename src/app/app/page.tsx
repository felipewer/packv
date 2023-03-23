'use client'
import { useEffect, useState } from "react"

import ContentForm from '@/app/app/content-form'
import HistoryList, { type URLTuple } from '@/app/app/history-list'
import type { Outcome } from '@/app/app/outcome.type'
import OutcomeDetails from '@/app/app/outcome-details'

type PageState = {
  lastSubmission: Outcome | null;
  history: URLTuple[];
}

export default function Home() {
  const [state, setState] = useState<PageState>({
    lastSubmission: null, 
    history: []
  });

  useEffect(() => {
    const tuples = Object.entries(localStorage)
      .sort(([tmtA],[tmtB]) => parseInt(tmtB) - parseInt(tmtA))
    setState(prev => ({...prev, history: tuples}))
  },[])

  const onSubmitOutcome = (outcome: Outcome) => {
    if (outcome instanceof Error) {
      setState(prev => ({...prev, lastSubmission: outcome}))
    } else {
      const timestamp = `${(new Date()).getTime()}`
      setState(prev => ({
        history: [ [timestamp,outcome], ...prev.history ],
        lastSubmission: outcome
      }))
      localStorage.setItem(timestamp,outcome)
    }
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
        <ContentForm onSubmitOutcome={onSubmitOutcome}/>
        <section style={!state.lastSubmission ? {visibility: 'hidden'} : {}}>
          {state.lastSubmission && 
            <OutcomeDetails outcome={state.lastSubmission}/>
          }
        </section>
      </section>
      <section>
        <h2>Stored Content Urls</h2>
        <HistoryList list={state.history}/>
      </section>
    </main>
  )
}

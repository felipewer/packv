import { MouseEvent } from 'react'
import { Outcome } from '@/app/app/outcome.type'


type Props = {
  outcome: Outcome
}


const copyLocationToClipboard = (location: string) => 
  (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    navigator.clipboard.writeText(location)
  }


const errorDetails = (outcome: Error) => (
    <details>
      <summary>Content could not be stored</summary>
      <p>{outcome.message}</p>
    </details>
)


const successDetails = (outcome: string) => (
    <details open>
      <summary>Content stored successfully</summary>
      <p>
        <a href={outcome} target='_blank'>{outcome}</a>
        <button onClick={copyLocationToClipboard(outcome)}>Copy</button>
      </p>
    </details>
)



export default function OutcomeDetails({outcome}: Props) {
  const sucess = typeof outcome === 'string'

  return (
    <section>
      {sucess
        ? successDetails(outcome)
        : errorDetails(outcome)
      }
    </section>
  )
}

type Props = {
  storedURLs: [timestamp: string,url: string][]
}

export default function HistoryList({storedURLs}: Props){
  return (
    <dl>
      {storedURLs.map(([timestamp,url],key) => (
        <div key={key}>
          <dt>{(new Date(parseInt(timestamp))).toString()}</dt>
          <dd><a href={url} target='_blank'>{url}</a></dd>
        </div>
      ))}
    </dl>
  )
}

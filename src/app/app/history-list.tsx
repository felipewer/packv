export type URLTuple = [timestamp: string, url: string]

type Props = {
  list: URLTuple[]
}

export default function HistoryList({list}: Props){
  return (
    <dl>
      {list.map(([timestamp,url]) => (
        <div key={timestamp}>
          <dt>{(new Date(parseInt(timestamp))).toString()}</dt>
          <dd><a href={url} target='_blank'>{url}</a></dd>
        </div>
      ))}
    </dl>
  )
}

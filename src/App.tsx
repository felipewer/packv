import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'

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

const App: Component = () => {
  const [content,setContent] = createSignal('')

  const validContent = () => !!content()

  const handleFormChange = event => {
    setContent(event.currentTarget.value)
  }

  const submit = async event => {
    event.preventDefault()
    try {
      const compressed = await postData({content: 'test'})
      alert(compressed)
    } catch (err) {
      console.error(err.message)
    }
    setContent('')
  }

  return (
    <form onSubmit={submit}>
      <div class="input">
        <label for="name">Content</label>
        <input id="name" name="name" value={content()} type="text" onChange={handleFormChange} />
      </div>

      {/* <div class="input">
        <label for="content-type">Content Type?</label>
        <select id="content-type" name="content-type">
          <option value="application/json;charset=utf-8">JSON</option>
          <option value="text/csv">CSV</option>
          <option value="text/plain">Plain Text</option>
        </select>
      </div> */}

      <button type="submit" disabled={!validContent()}>Store</button>
    </form>
  );
};

export default App;

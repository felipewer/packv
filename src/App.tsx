import type { Component } from 'solid-js';

const App: Component = () => {
  return (
    <form method="post" action="/">
      <div class="input">
        <label for="name">Content</label>
        <input id="name" name="name" type="text" />
      </div>

      <div class="input">
        <label for="content-type">Content Type?</label>
        <select id="content-type" name="content-type">
          <option value="application/json;charset=utf-8">JSON</option>
          <option value="text/csv">CSV</option>
          <option value="text/plain">Plain Text</option>
        </select>
      </div>

      <button type="submit">Store</button>
    </form>
  );
};

export default App;

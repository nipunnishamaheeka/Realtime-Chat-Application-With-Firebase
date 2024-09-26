import List from "./components/list/list";
import Chat from "./components/chat/chat";
import Detail from "./components/details/Detail";

const App = () => {
  return (
    <div className="container">
      <List />
      <Chat />
      <Detail />
    </div>
  )
}

export default App;

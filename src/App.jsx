import List from "./components/list/list";
import Chat from "./components/chat/chat";
import Detail from "./components/details/Detail";
import Login from "./components/login/login";

const App = () => {
  const user = false;
  return (
    <div className="container">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;

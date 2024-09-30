import List from "./components/list/list";
import Chat from "./components/chat/chat";
import Detail from "./components/details/Detail";
import Login from "./components/login/login";
import Notification from "./components/notification/notification";

const App = () => {
  const user = true;
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
      <Notification />
    </div>
  );
};

export default App;

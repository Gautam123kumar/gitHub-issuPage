import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [username, setUsername] = useState("facebook");
  const [repo, setRepo] = useState("create-react-app");
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo}/issues`
    );
    console.log(response);
    const data = await response.json();
    setState(data);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, [repo]);

  const handleUserName = (event) => {
    setUsername(event.target.value);
  };
  console.log({ search });

  const searchrepo = () => {
    const fileterAppState = state.filter((state) =>
      state.title.toLowerCase().includes(search.toLowerCase())
    );
    setState(fileterAppState);
  };
  return (
    <div className="App">
      <div className="searchBar">
        <img src="http://pngimg.com/uploads/github/github_PNG83.png" alt="" />
        <input
          className="input1"
          onChange={handleUserName}
          placeholder="Enter username.."
        />
        <input
          className="input2"
          onChange={(e) => setSearch(e.target.value)}
          name="search"
          value={search}
          placeholder="Enter Reponame.."
        />
        <button onClick={searchrepo} name={"search"}>
          Search
        </button>
      </div>
      <table>
        <tr>
          <th>UserName</th>
          <th>Repo</th>
        </tr>
        {state.map((currData) => {
          return (
            <tr>
              <td>{currData.user.login}</td>
              <td>{currData.title}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

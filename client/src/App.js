import "./App.css";
import { useState, useEffect } from "react";

import axios from "axios";

const CLIENT_ID = "841897ca3c8f3c68e798";

function App() {
  const [reRender, setReRender] = useState(false);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    console.log(codeParam);

    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch(`http://127.0.0.1:4000/getAccessToken?code=${codeParam}`, {
          method: "GET",
        })
          .then((response) => {
            console.log(response.body);
            return response.json();
          })
          .then((data) => {
            console.log("This is data", data);

            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setReRender(!reRender);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      getAccessToken();
    }
  }, []);

  const getUserData = async () => {
    await fetch("http://localhost:4000/getUserData", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"), //Bearer AccessToken
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const loginWithGit = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
  };

  const [gitRepo, setRepo] = useState("");

  const [gitRepoName, setGitRepoName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(gitRepo);
    console.log(gitRepoName);

    axios
      .get("https://api.github.com/users/iCodeWalker/repos")
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("------ process completed --------");
      });
  };

  return (
    <div className="App">
      <button className="btn" onClick={loginWithGit}>
        Login with Github
      </button>
      <form className="form-container">
        <input
          value={gitRepo}
          onChange={(e) => setRepo(e.target.value)}
          placeholder="Repo"
        />

        <input
          value={gitRepoName}
          onChange={(e) => setGitRepoName(e.target.value)}
          placeholder="Repo Name"
        />
        <button onClick={handleSubmit} className="btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;

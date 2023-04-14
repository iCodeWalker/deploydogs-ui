import "./App.css";
import { useState, useEffect } from "react";

import axios from "axios";

const CLIENT_ID = "Iv1.9da7059168d6351d";

function App() {
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    console.log(codeParam);
  });
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
      .get("https://api.github.com/users/iCodeWalker/repos ")
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

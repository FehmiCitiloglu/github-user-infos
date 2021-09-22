const button = document.querySelector("header button");
const languageList = document.querySelector("#languages");
const repoInfo = document.querySelectorAll("#repo-info p  strong");
const nameHTML = document.querySelector("#name").innerHTML;
const userInfo = document.querySelector("#user-info");

// const languageName = languageDiv.appendChild(document.createElement("p"));

// const languagePercentage = languageDiv.appendChild(
//   document.createElement("strong")
// );

// function createLanguageNode(language, percentage) {
//   const languageList = document.querySelector("#languages");
//   const languageDiv = languageList.appendChild(document.createElement("div"));
//   const languageName = languageDiv.appendChild(document.createElement("p"));
//   const languagePercentage = languageDiv.appendChild(
//     document.createElement("strong")
//   );
//   const languageText = (languageName.text = language);
//   const langPercentage = (languagePercentage.text = percentage) + "%";

//   // console.log(languageList.children);
// }
// createLanguageNode("a", 2);
// console.log(repoInfo[0].innerHTML);
// console.log(repoInfo[1].innerHTML);

// const uname = input.value;
// FehmiCitiloglu

const getUserData = async (username) => {
  const url = "https://api.github.com/users/";
  const name = document.getElementById("name");
  const profilePhoto = document.getElementById("profile-photo");
  const uname = document.getElementById("username");

  await fetch(url + username)
    .then((response) => response.json())
    .then((user) => {
      // console.log(user);
      repoInfo[0].innerHTML = user.public_repos;
      profilePhoto.src = user.avatar_url;
      uname.innerHTML = "@" + user.login;
      name.innerHTML = user.name;
    });
  // .catch((error) => {

  //   errorHandler(error);
  // });
};

const getUserRepo = async (username) => {
  const repoRequest = "/repos?per_page=100";
  const url = "https://api.github.com/users/";
  const repoInfo = document.querySelectorAll("#repo-info p  strong");
  let languages = {};
  let totalSize = 0;

  await fetch(url + username + repoRequest)
    .then((data) => data.json())
    .then((repos) => {
      const languageList = document.querySelector("#languages");
      console.log(repos);

      console.log(repos.map((repo) => (totalSize = repo.size + totalSize)));

      console.log(repos.map((repo) => repo.language));

      const userLanguages = repos.map((repo) => repo.language);

      const totalItem = userLanguages.length;

      const uniqueLanguages = [...new Set(userLanguages)];

      uniqueLanguages.forEach((currLanguage) => {
        const numLanguage = userLanguages.filter(
          (language) => language === currLanguage
        );
        if (currLanguage !== null) {
          const languageDiv = languageList.appendChild(
            document.createElement("div")
          );
          const languageName = languageDiv.appendChild(
            document.createElement("p")
          );

          const languagePercentage = languageDiv.appendChild(
            document.createElement("strong")
          );
          const lanPercentage =
            ((numLanguage.length * 100) / totalItem).toFixed(2) + "%";
          // createLanguageNode(currLanguage, langPercentage);

          languageName.innerHTML = currLanguage;
          languagePercentage.innerHTML = lanPercentage;
        }

        console.log(
          `language ${currLanguage} represents ${(
            (numLanguage.length * 100) /
            totalItem
          ).toFixed(2)}%`
        );
      });
    })
    .catch((err) => {
      console.log(err.message);
      console.log("catch trigger");
      errorHandler("Not Found");
    });
  repoInfo[1].innerHTML = (totalSize / 1000).toFixed(2) + " MB";
};

// let user = getUserData("FehmiCitiloglu", "avatar_url");
// console.log(user.avatar_url);

function handleInput(event) {
  const input = document.querySelector("header input");

  let inputValue = input.value;

  input.value = event.target.value;

  // console.log(nameHTML);
  if (nameHTML !== undefined || nameHTML !== "") {
    removeInfos();
    userInfo.classList.remove("hidden-while-error");
  }

  // try {
  // const errorNode = document.querySelector("label");
  // if (!errorNode) {
  //   console.log("errorNode if block work");
  //   errorNode.remove;
  // }
  // } catch (e) {
  //   console.log("errorNode catch trigger");
  // }
  return getUserData(inputValue), getUserRepo(inputValue);
}

button.addEventListener("click", handleInput);

// fetch(url + uname)
//   .then((data) => data.json())
//   .then((user) => {
//     console.log("User loaded", user);
//     profilePhoto.src = user.avatar_url;
//     username.innerHTML = "@" + user.login;
//     name.innerHTML = user.name;
//   });

// const denemeurl =
//   "https://api.github.com/users/FehmiCitiloglu/repos?per_page=100";

// fetch(denemeurl)
//   .then((data) => data.json())
//   .then((repos) => {
//     console.log(repos);
//     console.log(repos.map((repo) => repo.size));
//     console.log(repos.map((repo) => repo.language));
//   })
//   .catch((err) => {
//     console.log(err);
//   });

function removeInfos() {
  // console.log(languageList.children);
  const childList = [...languageList.children];
  childList.forEach((child) => child.remove());
  // forEach((childNode) => {
  //   childNode.remove();
  // });
}

function errorHandler(errorMessage) {
  // const mainContent = document.querySelector("main");
  const languageChildList = [...languageList.children];

  languageChildList.forEach((child) => child.remove());

  const errorElement = document.createElement("label");

  languageList.appendChild(errorElement);
  errorElement.innerHTML = errorMessage;
  errorElement.classList = "error-handler";
  console.log(errorElement);
  userInfo.classList = "hidden-while-error";
}

const name = document.getElementById("name");
const username = document.getElementById("username");
const profilePhoto = document.getElementById("profile-photo");

const input = document.querySelector("header input");
const repoInfo = document.querySelectorAll("#repo-info p  strong");

console.log(repoInfo[0].innerHTML);
console.log(repoInfo[1].innerHTML);

const repoRequest = "/repos?per_page=100";
const url = "https://api.github.com/users/";
// const uname = input.value;
const uname = "FehmiCitiloglu";

const getUserData = async (username) => {
  const result = await fetch(url + username)
    .then((response) => response.json())
    .then((user) => console.log(user))
    .catch((error) => console.log(error));
  return result;

  //   fetch(url + username)
  //     .then((data) => data.json())
  //     .then((users) => {
  //       console.log("Users loaded", users);
  //     });
};

// let user = getUserData("FehmiCitiloglu", "avatar_url");
// console.log(user.avatar_url);

function handleInputChange(event) {
  uname = event.target.value;
}

fetch(url + uname)
  .then((data) => data.json())
  .then((user) => {
    console.log("User loaded", user);
    profilePhoto.src = user.avatar_url;
    username.innerHTML = user.login;
    name.innerHTML = user.name;
  });

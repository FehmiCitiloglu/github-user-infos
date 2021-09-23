// birden fazla kullanılacak elementlerin global olarak seçilmesi
const button = document.querySelector("header button");
const languageList = document.querySelector("#languages");
const repoInfo = document.querySelectorAll("#repo-info p  strong");
const nameHTML = document.querySelector("#name").innerHTML;
const userInfo = document.querySelector("#user-info");

// username, ad, soyad, bilgilerinin api'dan çekilmesi
const getUserData = async (username) => {
  const url = "https://api.github.com/users/";
  const name = document.getElementById("name");
  const profilePhoto = document.getElementById("profile-photo");
  const uname = document.getElementById("username");

  await fetch(url + username)
    .then((response) => response.json())
    .then((user) => {
      repoInfo[0].innerHTML = user.public_repos;
      profilePhoto.src = user.avatar_url;
      uname.innerHTML = "@" + user.login;
      name.innerHTML = user.name;
    })
    .catch((err) => {
      throw new Error(err);
    });
};
// repolarda kullanılan dillerin api'dan çekilip ne kadar kullandığını
// göstermek için yüzdelerin hesaplanması ve doma aktarma
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
        console.log(numLanguage);
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
// girilen inputun submiti ve
function handleInput(event) {
  const input = document.querySelector("header input");

  let inputValue = input.value;

  console.log(inputValue);
  // input kısmının boş olması durumunda fonksiyonu sonlandırmak için logic
  if (inputValue.trim().length === 0) {
    return;
  }
  input.value = event.target.value;

  if (nameHTML !== undefined || nameHTML !== "") {
    removeInfos();

    userInfo.classList.remove("hidden-while-error");
  }

  return getUserData(inputValue), getUserRepo(inputValue);
}
// inputHandlerın buttona click event olarak verilmesi

button.addEventListener("click", handleInput);

// ikinci bir arama yapılması durumunda domdaki önceki
// aramaya ait elementlerin silinmesi
function removeInfos() {
  const childList = [...languageList.children];

  childList.forEach((child) => child.remove());
}
// kullanıcı bulunamadığı takdirde dönecek hata

function errorHandler(errorMessage) {
  const languageChildList = [...languageList.children];

  languageChildList.forEach((child) => child.remove());

  const errorElement = document.createElement("label");

  languageList.appendChild(errorElement);

  errorElement.innerHTML = errorMessage;

  errorElement.classList = "error-handler";

  console.log(errorElement);

  userInfo.classList = "hidden-while-error";
}

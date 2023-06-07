const theme = document.querySelector("#theme"),
  result = document.querySelector(".result"),
  headerSearch = document.querySelector(".header-search"),
  inputSearch = document.querySelector("input[type='text']"),
  logo = document.querySelector(".logo"),
  paragraphs = document.querySelectorAll("p"),
  vcardDetails = document.querySelectorAll(".vcard-detail"),
  infos = document.querySelector(".infos"),
  infoItens = document.querySelectorAll(".info"),
  perfilName = document.querySelector(".perfil h1"),
  corpo = document.body;

let themeName = document.querySelector(".theme-name"),
  themeIcon = document.querySelector(".icon-theme"),
  themeChoose = localStorage.getItem("theme_choose");

//_________ VERIFY WHICH THEME HAS BEEN SAVED IN THE BROWSER
if (themeChoose == "Dark") {
  changeColorTheme();
}

//_________ CHANGE THE COLOR OF THE THEME
function changeColorTheme() {
  result.classList.toggle("dark-container");
  headerSearch.classList.toggle("dark-container");
  infos.classList.toggle("dark-body");
  corpo.classList.toggle("dark-body");
  logo.classList.toggle("logo-white");
  inputSearch.classList.toggle("white-color");
  perfilName.classList.toggle("white-color");

  paragraphs.forEach(item => {
    item.parentElement.classList.toggle("white-color-p");
  });

  infoItens.forEach(item => {
    item.parentElement.classList.toggle("white-color-p");
  });

  vcardDetails.forEach(item => {
    item.classList.toggle("vcard-detail-white");
  });

  let themeIconAlt = themeIcon.getAttribute("alt");

  if (themeIconAlt == "Dark") {
    themeName.textContent = "Light";
    themeIcon.setAttribute("alt", "Light");
    themeIcon.setAttribute("src", "assets/images/icon-sun.svg");
    localStorage.setItem("theme_choose", "Dark");
  } else {
    themeName.textContent = "Dark";
    themeIcon.setAttribute("alt", "Dark");
    themeIcon.setAttribute("src", "assets/images/icon-moon.svg");
    localStorage.setItem("theme_choose", "Light");
  }
}

//_________ CONSULT USER ON GITHUB
const btnSearch = document.querySelector("#btnSearch"),
  divHead = document.querySelector(".head"),
  divDescription = document.querySelector(".description"),
  divNumbers = document.querySelector(".numbers"),
  divVcard = document.querySelector(".vcard-details"),
  noResult = document.querySelector(".no-result");

let input = document.querySelector("#search"),
  avatar = document.querySelector(".image img"),
  joined = document.querySelector(".joined p"),
  linkPerfil = document.querySelector("#link-perfil"),
  description = document.querySelector(".text p"),
  repos = document.querySelector(".repos"),
  followers = document.querySelector(".followers"),
  following = document.querySelector(".following"),
  loc = document.querySelector(".location span"),
  website = document.querySelector(".website a"),
  twitter = document.querySelector(".twitter a"),
  company = document.querySelector(".company span"),
  user = "",
  consult = "";

function doResearch() {
  user = inputSearch.value.replaceAll(" ", "-");
  consult = fetch(`https://api.github.com/users/${user}`);

  consult.then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Página não encontrada');
    }
  })
    .then(item => {
      //VALIDATION NULLs
      for (let content in item) {
        if (item[content] === null) {
          item[content] = 'Not Available';
        }
      }

      //DEFINITION DATE
      let data = new Date(item.created_at).toString(),
        dia = data.substring(8, 10),
        mes = data.substring(4, 7),
        ano = data.substring(11, 15);

      //HEAD
      avatar.src = item.avatar_url;
      perfilName.textContent = item.name;
      joined.textContent = "Joined " + dia + " " + mes + " " + ano;
      description.textContent = item.bio;
      linkPerfil.textContent = "@" + item.login;
      linkPerfil.href = "https://github.com/" + item.login;

      //NUMBERS
      repos.textContent = item.public_repos;
      followers.textContent = item.followers;
      following.textContent = item.following;

      //VCARD DETAILS
      loc.textContent = item.location;
      website.textContent = item.blog;
      website.href = item.blog;
      twitter.textContent = item.twitter_username;
      twitter.href = "https://twitter.com/" + item.twitter_username;
      company.textContent = item.company;
    })
    .catch(error => {
      noResult.classList.toggle("no-result-active");
      noResult.innerHTML = "<span>No results</span>"
      divHead.classList.toggle("display-none");
      divDescription.classList.toggle("display-none");
      divNumbers.classList.toggle("display-none");
      divVcard.classList.toggle("display-none");
    });
}

theme.addEventListener("click", changeColorTheme);
btnSearch.addEventListener("click", doResearch);

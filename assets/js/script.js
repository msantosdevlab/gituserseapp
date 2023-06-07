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

//_________ CHANGE PLACEHOLDER INPUT
  if(window.matchMedia("(max-width: 350px)").matches){
    inputSearch.setAttribute("placeholder", "Search username…");
    console.dir(inputSearch.placeholder)
  };

//_________ VERIFY WHICH THEME HAS BEEN SAVED IN THE BROWSER
if (themeChoose == "Dark") {
  changeColorTheme();
};

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
    item.parentElement.classList.toggle("white-color");
  });

  infoItens.forEach(item => {
    item.parentElement.classList.toggle("white-color");
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
};

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
  website = document.querySelector(".website span"),
  twitter = document.querySelector(".twitter span"),
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

      if(item.blog == "Not Available"){
        website.textContent = item.blog;
       }else if(item.blog.substring(0,4) !== "http" ){
        website.innerHTML = '<a href="http://' + item.blog + '" target="_blank">' + item.blog +'</a>';
       }else{
        website.innerHTML = '<a href="' + item.blog + '" target="_blank">' + item.blog +'</a>';
      }

      if(item.twitter_username == "Not Available"){
        twitter.textContent = item.twitter_username;
       }else{
        twitter.innerHTML = '<a href="https://twitter.com/' + item.twitter_username + '" target="_blank">' + item.twitter_username +'</a>';
      }

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
};

theme.addEventListener("click", changeColorTheme);
btnSearch.addEventListener("click", doResearch);
inputSearch.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
      event.preventDefault();
      doResearch();
    }
});
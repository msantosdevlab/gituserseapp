const doc = fetch('TXT.txt');

doc
.then((result) =>
  // result.json();
  console.log(result))
.then((data) =>{
  // console.log(data.login);
  // console.log(data.avatar_url)
})

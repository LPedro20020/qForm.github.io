let token = '$2a$10$7/2aLKrRIEowSHj.VTZ6OukJVQAgDVm6sGGV43TvTfW638HUCeRjS'
let url = 'https://api.jsonbin.io/v3/b/672b7e24e41b4d34e44f8cfa'

var XMLHttpRequest = NodeRequire('xhr2');
let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};

req.open("PUT", url, true);
req.setRequestHeader("Content-Type", "application/json");
req.setRequestHeader("X-Master-Key", token);
req.send('{"sample": "Hello World"}');
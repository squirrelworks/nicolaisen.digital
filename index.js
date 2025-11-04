/* serviceworker registration */

if ("serviceWorker" in navigator) {
  
  navigator.serviceWorker.register("sw.js")
  
  .then(registration => {
    console.log("sw registered");
 

  }).catch(error => {
    console.log("sw reg fail");
    console.log(error);

  })

} else {

//browser does not support service worker
  alert("pwa not supported");
  /* do non pwa stuff here*/
}


// fetch the dog
let lastImage="empty";
getDog()

function getDog(){
  loadData('https://dog.ceo/api/breeds/image/random');
}




//Load Data function
function loadData(apiUrl){

    console.log("fetching  dog data");
   

    fetch(apiUrl)

    .then(   function(response) {
      // wait for fetch to complete
        return response.json();
      }
      )
      .then(    function(data) {
        // do something with 'data' 
        console.log("building  dog ");
        buildView(data.message,"random dog");
      
      })

      .catch(()=>{
        console.log("offline from fetch: "+lastImage);

        if(lastImage=="empty"){
          buildView("/img/dog-icon.svg");
        }else{
          buildView(lastImage,"same dog");
        }
       
        
      });
}





// dom setup
// get the Dom element to work within
let app=document.getElementById("doggo");


function buildView(myImgUrl,myMessage){
  app.innerHTML="";
  lastImage=myImgUrl;

  let myTitle=document.createElement("h2");

  myTitle.innerText=myMessage;
   
let dogImg=document.createElement("img");
dogImg.src=myImgUrl;

app.appendChild(myTitle);
app.appendChild(dogImg);

}



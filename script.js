//You can edit ALL of the code here
let allEpisodes;
function setup() {
  allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes, 'load');
}
// Title generator function that have a array parameter , episode for example name:"Winter is Coming"  and episod:1 season:1 so episod resual should be "Winter is Coming - S01E01"
function titleCodeGenerator(episode) {
  let seasonCode = episode.season < 10 ? "0" + episode.season : episode.season;
  let episodeCode = episode.number < 10 ? "0" + episode.number : episode.number;
  return `S${seasonCode}E${episodeCode}`;
}
// Summary in object mentioned <p> and </p> tags and these tags have to be removed
function pureSummary(episode) {
  // Remove all <p> tags in sammary
  let summaryStr = episode.summary.replace(/<p>/g, "");
  // Remove all </p> tags in sammary and return it
  return summaryStr.replace(/<\/p>/g, "");
}
// Function for make main body of project
function makePageForEpisodes(episodeList, searchType) {
  // Access to main Div element with 'root' id
  const rootElem = document.getElementById("root");
  let innerHTMLString = "";  
  if(episodeList.length == 0){
    innerHTMLString = `
    <h1>Sorry Nothing to show ! ! !<h1>`;
  }
  else{
    innerHTMLString = "";
  }
  episodeList.forEach((episode) => {
    // forEach loop to reed one by one objects in main array and show on document
    // I used innerHtml and parameters to create elements in body        
    innerHTMLString += `
    <div id="${titleCodeGenerator(episode)}" class="episodeDiv">
      <p class="episodeTitle">${(searchType == 'search') ? episode.name : episode.name + ' - ' + titleCodeGenerator(episode)}</p>
      <img class="episodeImg" src=${episode.image.medium}>
      <strong class="summaryLabel">Summary:</strong><br>
      <p class="summary">${pureSummary(episode)}</p>
    </div>`;
  });
  rootElem.innerHTML = innerHTMLString;
}

let searchTBEl = document.querySelector("#searchInput");
let searchTextResualt = document.querySelector("#searchResualt");
let myAllEpisodes = [];
let totalFoundObject = 0;
let FoundIndexArray = [];
let replacedObject = [];

function getIndexes(stringToSearch, mainString, objectIndex, key) {
  let findState = false;
  let startIndex = 0;
  let newIndex;
  let stringToSearchLen = stringToSearch.length;
  if (stringToSearchLen == 0) {
    return [];
  }
  mainString = mainString.toLowerCase();
  stringToSearch = stringToSearch.toLowerCase();
  while ((newIndex = mainString.indexOf(stringToSearch, startIndex)) > -1) {
    FoundIndexArray.push({
      objectIndexes: objectIndex,
      objectKey: key,
      foundStrIndex: newIndex,
      keywordLength: stringToSearch.length,
    });
    startIndex = newIndex + stringToSearchLen;
    findState = true;
  }
  return findState;
}

function highlight() {
  myAllEpisodes = getAllEpisodes();  
  FoundIndexArray = [];  
  myAllEpisodes.forEach((episode, index) => {
    episode.name = `${episode.name} - ${titleCodeGenerator(episode)}`;
    let nameState = getIndexes(searchTBEl.value, `${episode.name}`, index, "name");
    let summaryState = getIndexes(searchTBEl.value, `${pureSummary(episode)}`, index, "summary");        
    if (nameState || summaryState) {
      let objectContainer = episode;      
      totalFoundObject += 1;
      // ----------------------------------- name --------------------------------------------------------------------
      if (nameState) {        
        let nameDividedArray = [];
        let indexList = FoundIndexArray.filter((el) => el.objectIndexes == index && el.objectKey == "name").map((el) => el.foundStrIndex);
        indexList.forEach((strIndex, i) => {
          nameDividedArray.push(objectContainer.name.slice(i == 0 ? 0 : indexList[i - 1] + 1, strIndex + searchTBEl.value.length));
        });
        nameDividedArray.push(
          objectContainer.name.slice(indexList[indexList.length - 1] + searchTBEl.value.length)
        );
        nameDividedArray.forEach((element, i) => {
          (i < nameDividedArray.length - 1)? (nameDividedArray[i] = `${nameDividedArray[i].slice(0, nameDividedArray[i].length - searchTBEl.value.length)}<strong class="highlight">${nameDividedArray[i].slice(nameDividedArray[i].length - searchTBEl.value.length)}</strong>`) : {};
        });
        objectContainer.name = nameDividedArray.join("");                
      }
      // ----------------------------------- summary --------------------------------------------------------------------
      if (summaryState) {
        objectContainer.summary = `${pureSummary(objectContainer)}`;
        let summaryDividedArray = [];
        indexList = FoundIndexArray.filter((el) => el.objectIndexes == index && el.objectKey == "summary").map((el) => el.foundStrIndex);
        indexList.forEach((strIndex, i) => {
          summaryDividedArray.push(objectContainer.summary.slice(i == 0 ? 0 : indexList[i - 1] + 1, strIndex + searchTBEl.value.length));
        });
        summaryDividedArray.push(objectContainer.summary.slice(indexList[indexList.length - 1] + searchTBEl.value.length));
        summaryDividedArray.forEach((element, i) => {
          (i < summaryDividedArray.length - 1) ? (summaryDividedArray[i] = `${summaryDividedArray[i].slice(0, summaryDividedArray[i].length - searchTBEl.value.length)}<strong class="highlight">${summaryDividedArray[i].slice(summaryDividedArray[i].length - searchTBEl.value.length)}</strong>`): {};
        });
        objectContainer.summary = summaryDividedArray.join("");
      }
      replacedObject.push(objectContainer);      
    }
  });  
  searchTextResualt.textContent = `Result: ${totalFoundObject} | Total: ${allEpisodes.length}`;
}
searchTBEl.addEventListener("input", () => {
  if (searchTBEl.value != "") {
    console.clear();
    highlight();
    makePageForEpisodes(replacedObject, 'search');
    totalFoundObject = 0;    
    replacedObject = [];    
    myAllEpisodes = [];
  } else {    
    makePageForEpisodes(allEpisodes, 'load');
  }
});

window.onload = setup;

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
    <h4>Sorry Nothing to show ! ! !<h4>`;
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
    FoundIndexArray.push({objectIndexes: objectIndex, objectKey: key, foundStrIndex: newIndex, keywordLength: stringToSearch.length});
    startIndex = newIndex + stringToSearchLen;
    findState = true;
  }
  return findState;
}
function nameAndSummaryHighlight(objectContainer, nameOrSummary, nameOrSummaryKey, index, elementParameterToSearch){
  let nameOrSummaryDividedArray = [];
  let  indexList = [];
  indexList = FoundIndexArray.filter((el) => el.objectIndexes == index && el.objectKey == nameOrSummaryKey).map((el) => el.foundStrIndex);
  indexList.forEach((strIndex, i) => {
    nameOrSummaryDividedArray.push(nameOrSummary.slice(i == 0 ? 0 : indexList[i - 1] + 1, strIndex + elementParameterToSearch.value.length));
  });
  nameOrSummaryDividedArray.push(nameOrSummary.slice(indexList[indexList.length - 1] + elementParameterToSearch.value.length));
  nameOrSummaryDividedArray.forEach((element, i) => {
    (i < nameOrSummaryDividedArray.length - 1) ? (nameOrSummaryDividedArray[i] = `${nameOrSummaryDividedArray[i].slice(0, nameOrSummaryDividedArray[i].length - elementParameterToSearch.value.length)}<strong class="highlight">${nameOrSummaryDividedArray[i].slice(nameOrSummaryDividedArray[i].length - elementParameterToSearch.value.length)}</strong>`) : {};
  });
  (nameOrSummaryKey == 'name') ? objectContainer.name = nameOrSummaryDividedArray.join("") : objectContainer.summary = nameOrSummaryDividedArray.join("");       
}

function highlight(elementParameterToSearch) {
  let myAllEpisodes = [];
  let totalFoundObject = 0;
  myAllEpisodes = getAllEpisodes();     
  myAllEpisodes.forEach((episode, index) => {
    episode.name = `${episode.name} - ${titleCodeGenerator(episode)}`;
    episode.summary = `${pureSummary(episode)}`;
    let nameState = getIndexes(elementParameterToSearch.value, `${episode.name}`, index, "name");
    let summaryState = getIndexes(elementParameterToSearch.value, `${episode.summary}`, index, "summary");        
    if (nameState || summaryState) {
      let objectContainer = episode;      
      totalFoundObject += 1;
      // ------------------------------------------------------ Name Highlight ---------------------------------------------------------
      if (nameState) {        
        nameAndSummaryHighlight(objectContainer, objectContainer.name, 'name', index, elementParameterToSearch);            
      }
      // ------------------------------------------------------ Summary Highlight ------------------------------------------------------
      if (summaryState) {        
        nameAndSummaryHighlight(objectContainer, objectContainer.summary, 'summary', index, elementParameterToSearch);        
      }
      replacedObject.push(objectContainer);      
    }
  });  
  searchTextResualt.textContent = `Result: ${totalFoundObject} | Total: ${myAllEpisodes.length}`;
}

searchTBEl.addEventListener("input", () => {
  if (searchTBEl.value != "") {    
    highlight(searchTBEl);
    makePageForEpisodes(replacedObject, 'search');
    FoundIndexArray = []; 
    totalFoundObject = 0;    
    replacedObject = [];        
  } else {    
    makePageForEpisodes(allEpisodes, 'load');
  }
});

window.onload = setup;

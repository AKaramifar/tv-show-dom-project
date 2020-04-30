// Declare Html Elements
let body_El;
let searchDiv_El;
let showsDivSelect_El;
let showsListSelect_El;
let episodeDivSelect_El;
let episodeListSelect_El;
let searchDivInput_El;
let episodeInput_El;
let searchResualt_El;
let mainDiv_El;
let nothingToShow_El;

// Declare Objects and arrays
let allShowsList;
let allEpisodesList = [];
let objectContainer;
let FoundIndexArray = [];
let replacedObject = [];
let currentShowId = 1;

function getAllEpisodes(){  
  let showsIdList = allShowsList.map(el=> el.id);
  showsIdList = JSON.parse(JSON.stringify(showsIdList))
  let showsId = 0;

  function getEpisodes(){
    if(showsId < showsIdList.length){
      fetch(`https://api.tvmaze.com/shows/${showsIdList[showsId]}/episodes`)
      .then(Response => {
        return Response.json()
      })
      .then(episodeData => {      
        episodeData.forEach(el=>{
          el.showId = showsIdList[showsId];
          allEpisodesList.push(el);          
        })    
        showsId++;
        getEpisodes();       
      })
      .catch(error => {
        console.log(error);
        showsId++;
        getEpisodes(); 
      })
    }
    else{
      allEpisodesList = JSON.parse(JSON.stringify(allEpisodesList));      
      currentShowId = showsListSelect_El.value;
      makePageForEpisodes(allEpisodesList.filter(ep => ep.showId == currentShowId), 'load');
      makeComboBoxOfEpisodesName(allEpisodesList.filter(el => el.showId == currentShowId));      
    }  
  }
  getEpisodes();
  
  // //-------------------------------------------------------
  
}

// First function which will load in may page
function setup() {
  fetch('https://api.tvmaze.com/shows')
  .then(Response => {
    return Response.json()
  })
  .then(data => {
    // Get all Shows API from URL through fetch
    allShowsList = JSON.parse(JSON.stringify(data))
    myBody();    
    makeComboBoxOfShowsName(allShowsList.sort((a, b) => a.name.localeCompare(b.name)));    
    getAllEpisodes();
  })
  .catch(error => console.log(error))
}

// myBody function will make all elements in body
function myBody(){
  // Create all elements
  body_El = document.querySelector('body');  
  searchDiv_El = document.createElement('div');
  showsDivSelect_El = document.createElement('div');
  showsListSelect_El = document.createElement('select')
  episodeDivSelect_El = document.createElement('div');
  episodeListSelect_El = document.createElement('select');
  searchDivInput_El = document.createElement('div');
  episodeInput_El = document.createElement('input');
  searchResualt_El = document.createElement('p');
  mainDiv_El = document.createElement('div');
  nothingToShow_El = document.createElement('h4');

  // Declare all id and css method for elements
  body_El.id = 'body_JS';
  body_El.className = 'body_CSS'
  searchDiv_El.id = 'searchDiv_JS';
  searchDiv_El.className = 'searchDiv_CSS';
  showsDivSelect_El.id = 'showsDivSelect_JS';
  showsDivSelect_El.className = 'showsDivSelect_CSS';
  showsListSelect_El.id = 'showsListSelect_JS';
  showsListSelect_El.className = 'showsListSelect_CSS';
  episodeDivSelect_El.id = 'episodeDivSelect_JS';
  episodeDivSelect_El.className = 'episodeDivSelect_CSS';
  episodeListSelect_El.id = 'episodeListSelect_JS';
  episodeListSelect_El.className = 'episodeListSelect_CSS';
  searchDivInput_El.id = 'searchDivInput_JS';
  searchDivInput_El.className = 'searchDivInput_CSS';
  episodeInput_El.id = 'episodeInput_JS';
  episodeInput_El.className = 'episodeInput_CSS';
  episodeInput_El.type = 'text';
  episodeInput_El.placeholder = 'Search your keyword . . .';
  searchResualt_El.id = 'searchResualt_JS';
  searchResualt_El.className = 'searchResualt_CSS';
  searchResualt_El.textContent = 'Resualt';
  mainDiv_El.id = 'mainDiv_JS';
  mainDiv_El.className = 'mainDiv_CSS';
  nothingToShow_El.id = 'nothingToShow_JS';
  nothingToShow_El.className = 'nothingToShow_CSS';
  
  // Add all elements to body
  body_El.appendChild(searchDiv_El);
  body_El.appendChild(mainDiv_El);
  searchDiv_El.appendChild(showsDivSelect_El)
  searchDiv_El.appendChild(episodeDivSelect_El);
  searchDiv_El.appendChild(searchDivInput_El);
  showsDivSelect_El.appendChild(showsListSelect_El);
  episodeDivSelect_El.appendChild(episodeListSelect_El);
  searchDivInput_El.appendChild(episodeInput_El);
  searchDivInput_El.appendChild(searchResualt_El);

  // Select element on change event search in my object and find episod that his name is equal with value of select 
  showsListSelect_El.addEventListener('change', ()=>{  
    currentShowId = showsListSelect_El.value;
    makePageForEpisodes(allEpisodesList.filter(ep => ep.showId == currentShowId), 'load');
    episodeListSelect_El.innerHTML = '';
    makeComboBoxOfEpisodesName(allEpisodesList.filter(el => el.showId == currentShowId));
  });
  
  // Select element on change event search in my object and find episod that his name is equal with value of select 
  episodeListSelect_El.addEventListener('change', ()=>{  
    (episodeListSelect_El.value == "allEepisodes") ? makePageForEpisodes(allEpisodesList.filter(ep => ep.showId == currentShowId), 'load') : makePageForEpisodes(allEpisodesList.filter(Episodes=> episodeListSelect_El.value == `${Episodes.name + ' - ' + titleCodeGenerator(Episodes)}`),'load');
  });

  // Input element on input event serach in my object and find all keyword that I wrote in input 
  episodeInput_El.addEventListener("input", () => {        
    if (episodeInput_El.value != "") {    
      FoundIndexArray = [];     
      replacedObject = [];       
      objectContainer = []; 
      highlight(allEpisodesList.filter(el => el.showId == currentShowId), episodeInput_El);
      makePageForEpisodes(replacedObject, 'search');      
    } 
    else {    
      makePageForEpisodes(allEpisodesList.filter(ep => ep.showId == currentShowId), 'load')
      searchResualt_El.textContent = 'Result';
    }
  });
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

  let loading_El = document.querySelector('#ldsRoller_JS')
  loading_El.style.display = 'none';
  mainDiv_El.innerHTML = '';
  nothingToShow_El.id = 'nothingToShow_JS';

  if(episodeList.length == 0){
    nothingToShow_El.textContent = 'Sorry Nothing to show ! ! !';
    mainDiv_El.appendChild(nothingToShow_El);
  }
  
  // forEach loop to reed one by one objects in main array and show on document
  episodeList.forEach((episode, index) => {    
    // Create all element for show episodes in page
    let episodeDiv_El = document.createElement('div');
    let episodeTitle_El = document.createElement('p');
    let episodeImg_El = document.createElement('img');
    let episodeSummaryLabel_El = document.createElement('strong');
    let episodeSummaryDiv_El = document.createElement('div');
    let episodeSummary_El = document.createElement('p');

    episodeDiv_El.id = `episode_${index}_JS`;
    episodeDiv_El.className = 'episodeDiv_CSS';    
    episodeTitle_El.id = `episodeTitle_${index}_JS`;
    episodeTitle_El.className = 'episodeTitle_CSS';
    episodeImg_El.id = `episodeImg_${index}_JS`;
    episodeImg_El.className = 'episodeImg_CSS';
    episodeSummaryDiv_El.id = `episodeSummaryDiv_${index}_Js`;
    episodeSummaryDiv_El.className = `episodeSummaryDiv_CSS`;
    episodeSummaryLabel_El.id = `episodeSummaryLabel_${index}_Js`;
    episodeSummaryLabel_El.className = 'episodeSummaryLabel_CSS';
    episodeSummary_El.id = `episodeSummary_${index}_Js`;
    episodeSummary_El.className = 'episodeSummary_CSS';
    

    episodeTitle_El.innerHTML = `${(searchType == 'search') ? episode.name : episode.name + ' - ' + titleCodeGenerator(episode)}`;
    episodeImg_El.src = `${episode.image.medium}`;
    episodeSummaryLabel_El.textContent = `Summary`;
    episodeSummary_El.innerHTML = `${pureSummary(episode)}`;
    
    mainDiv_El.appendChild(episodeDiv_El);
    episodeDiv_El.appendChild(episodeTitle_El)
    episodeDiv_El.appendChild(episodeImg_El)
    episodeDiv_El.appendChild(episodeSummaryLabel_El)
    episodeDiv_El.appendChild(episodeSummaryDiv_El)
    episodeSummaryDiv_El.appendChild(episodeSummary_El)    
  });    
}
function makeComboBoxOfShowsName(allShowsList){  
  allShowsList.forEach((episode, index) => {
    options_JS = document.createElement('option');
    options_JS.id = `showOption_${index}_JS`;
    options_JS.className = `showOption_CSS`;
    options_JS.value = `${episode.id}`;
    options_JS.textContent = `${episode.name + ' - ' + titleCodeGenerator(episode)}`
    showsListSelect_El.appendChild(options_JS);
  });    
}

function makeComboBoxOfEpisodesName(episodeList){ 
  let options_JS = document.createElement('option'); 
  options_JS.id = `allEpisodes_JS`;
  options_JS.className = `episodeOption_CSS`;
  options_JS.value = `allEepisodes`;
  options_JS.textContent = `All Episodes`;
  episodeListSelect_JS.appendChild(options_JS);  
  episodeList.forEach((episode, index) => {
    options_JS = document.createElement('option');
    options_JS.id = `episodeOpthin_${index}_JS`;
    options_JS.className = `episodeOpthin_CSS`;
    options_JS.value = `${episode.name + ' - ' + titleCodeGenerator(episode)}`;
    options_JS.textContent = `${episode.name + ' - ' + titleCodeGenerator(episode)}`
    episodeListSelect_JS.appendChild(options_JS);
  });    
}

function getIndexes(stringToSearch, mainString, objectIndex, key) {
  let findState = false;
  let startIndex = 0;
  let newIndex;
  let stringToSearchLen = stringToSearch.length;
  mainString = mainString.toLowerCase();
  stringToSearch = stringToSearch.toLowerCase();
  while ((newIndex = mainString.indexOf(stringToSearch, startIndex)) > -1) {
    FoundIndexArray.push({objectIndexes: objectIndex, objectKey: key, foundStrIndex: newIndex});
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
    (i < nameOrSummaryDividedArray.length - 1) ? (nameOrSummaryDividedArray[i] = `${nameOrSummaryDividedArray[i].slice(0, nameOrSummaryDividedArray[i].length - elementParameterToSearch.value.length)}<strong class="highlight_CSS">${nameOrSummaryDividedArray[i].slice(nameOrSummaryDividedArray[i].length - elementParameterToSearch.value.length)}</strong>`) : {};
  });
  (nameOrSummaryKey == 'name') ? objectContainer.name = nameOrSummaryDividedArray.join("") : objectContainer.summary = nameOrSummaryDividedArray.join("");   

}

function highlight(episodeList, elementParameterToSearch) {
  let totalFoundObject = 0;      
  episodeList.forEach((episode, index) => {
    let nameContainer = `${episode.name} - ${titleCodeGenerator(episode)}`;    
    let summaryContainer = `${pureSummary(episode)}`;    
    let nameState = getIndexes(elementParameterToSearch.value, `${nameContainer}`, index, "name");
    let summaryState = getIndexes(elementParameterToSearch.value, `${summaryContainer}`, index, "summary");        
    if (nameState || summaryState) {   
      objectContainer = [];   
      objectContainer = JSON.parse(JSON.stringify(episode))      
      totalFoundObject += 1;
      // ------------------------------------------------------ Name Highlight ---------------------------------------------------------
      if (nameState) {        
        nameAndSummaryHighlight(objectContainer, nameContainer, 'name', index, elementParameterToSearch);            
      }
      // ------------------------------------------------------ Summary Highlight ------------------------------------------------------
      if (summaryState) {        
        nameAndSummaryHighlight(objectContainer, summaryContainer, 'summary', index, elementParameterToSearch);        
      }
      replacedObject.push(objectContainer);      
    }
  });  
  searchResualt_El.textContent = `${totalFoundObject} | ${episodeList.length}`;
}

window.onload = setup;

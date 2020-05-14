// Declare Html Elements
let body_El;
let header_El;
let titlePartOne_El;
let titlePartTwo_El;
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
let topButton_El;

// Declare Objects and arrays
let allShowsList;
let allEpisodesList = [];
let objectContainer;
let FoundIndexArray = [];
let replacedObject = [];
let currentShowId = 1;
let currentEpisodeLength = 0;

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
      let loading_El = document.querySelector('#ldsRoller_JS')
      loading_El.style.display = 'none'; 
      mainDiv_El.innerHTML = ''; 
      allEpisodesList.filter(ep => ep.showId == currentShowId).forEach((episode, index)=>{
        makePageForEpisodes(episode, index, 'load');
        currentEpisodeLength++;
      })      
      makeComboBoxOfEpisodesName(allEpisodesList.filter(el => el.showId == currentShowId));      
      searchResualt_El.textContent = `Total : ${currentEpisodeLength}`;
    }  
  }
  getEpisodes();
  
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
  header_El = document.createElement('div');
  titlePartOne_El = document.createElement('p');
  titlePartTwo_El = document.createElement('p');
  container_El = document.createElement('div');
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
  topButton_El = document.createElement('p');  


  // Declare all id and css method for elements
  body_El.id = 'body_JS';
  body_El.classList = 'body_CSS';
  header_El.id = 'header_JS';
  header_El.classList = 'header_CSS col-12 sm-col-12 md-col-12 lg-col-12';
  titlePartOne_El.id = 'titlePartOne_JS';
  titlePartOne_El.classList = 'titlePartOne_CSS';
  titlePartOne_El.textContent = 'TV'
  titlePartTwo_El.id = 'titlePartTwo_JS';
  titlePartTwo_El.classList = 'titlePartTwo_CSS';
  titlePartTwo_El.textContent = 'SHOW PROJECT';
  container_El.id = 'container_JS'
  container_El.classList = 'container_CSS'
  searchDiv_El.id = 'searchDiv_JS';
  searchDiv_El.classList = 'searchDiv_CSS lg-col-12';
  showsDivSelect_El.id = 'showsDivSelect_JS';
  showsDivSelect_El.classList = 'showsDivSelect_CSS col-3 sm-col-12 md-col-6 lg-col-3';
  showsListSelect_El.id = 'showsListSelect_JS';
  showsListSelect_El.classList = 'showsListSelect_CSS col-11 ';
  episodeDivSelect_El.id = 'episodeDivSelect_JS';
  episodeDivSelect_El.classList = 'episodeDivSelect_CSS col-3 sm-col-12 md-col-6 lg-col-3';
  episodeListSelect_El.id = 'episodeListSelect_JS';
  episodeListSelect_El.classList = 'episodeListSelect_CSS col-11 ';
  searchDivInput_El.id = 'searchDivInput_JS';
  searchDivInput_El.classList = 'searchDivInput_CSS col-5 sm-col-12 md-col-9 lg-col-5';
  episodeInput_El.id = 'episodeInput_JS';
  episodeInput_El.classList = 'episodeInput_CSS col-7 ';
  episodeInput_El.type = 'text';
  episodeInput_El.placeholder = 'Search your keyword . . .';
  searchResualt_El.id = 'searchResualt_JS';
  searchResualt_El.classList = 'searchResualt_CSS col-4 ';
  searchResualt_El.textContent = 'Resualt';
  mainDiv_El.id = 'mainDiv_JS';
  mainDiv_El.classList = 'mainDiv_CSS col-12';
  nothingToShow_El.id = 'nothingToShow_JS';
  nothingToShow_El.className = 'nothingToShow_CSS';
  topButton_El.id = 'topButton_JS';
  topButton_El.classList = 'topButton_CSS';
  topButton_El.innerHTML = `Top`;
  
  // Add all elements to body
  body_El.appendChild(topButton_El);
  body_El.appendChild(container_El);
  container_El.appendChild(header_El);
  header_El.appendChild(titlePartOne_El);
  header_El.appendChild(titlePartTwo_El);
  container_El.appendChild(searchDiv_El);
  container_El.appendChild(mainDiv_El);
  searchDiv_El.appendChild(showsDivSelect_El)
  searchDiv_El.appendChild(episodeDivSelect_El);
  searchDiv_El.appendChild(searchDivInput_El);
  showsDivSelect_El.appendChild(showsListSelect_El);
  episodeDivSelect_El.appendChild(episodeListSelect_El);
  searchDivInput_El.appendChild(episodeInput_El);
  searchDivInput_El.appendChild(searchResualt_El);

  // Select element on change event search in my object and find episod that his name is equal with value of select 
  showsListSelect_El.addEventListener('change', ()=>{  
    episodeInput_El.value = '';
    currentShowId = showsListSelect_El.value;
    mainDiv_El.innerHTML = ''; 
    currentEpisodeLength = 0;
    allEpisodesList.filter(ep => ep.showId == currentShowId).forEach((episode, index)=>{
      makePageForEpisodes(episode, index, 'load');
      currentEpisodeLength++;
    })    
    searchResualt_El.textContent = `Total : ${currentEpisodeLength}`;
    episodeListSelect_El.innerHTML = '';
    makeComboBoxOfEpisodesName(allEpisodesList.filter(el => el.showId == currentShowId));
  });

  window.onscroll = ()=>{
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      topButton_El.style.display = "block";
    } else {
      topButton_El.style.display = "none";
    }
  }
  topButton_El.addEventListener('click',()=>{
    var scrollStep = -window.scrollY / (1000 / 15),
        scrollInterval = setInterval(function(){
        if ( window.scrollY != 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval); 
    },15);
  })

  titlePartOne_El.addEventListener('click',()=>{
    currentShowId = showsListSelect_El[0].value;
    mainDiv_El.innerHTML = ''; 
    currentEpisodeLength = 0;
    allEpisodesList.filter(ep => ep.showId == currentShowId).forEach((episode, index)=>{
      makePageForEpisodes(episode, index, 'load');
      currentEpisodeLength++;
    })   
    searchResualt_El.textContent = `Total : ${currentEpisodeLength}`;
    episodeListSelect_El.innerHTML = '';
    makeComboBoxOfEpisodesName(allEpisodesList.filter(el => el.showId == currentShowId));
    showsListSelect_El.selectedIndex = 0;
    episodeInput_El.value = '';
  })
  // Select element on change event search in my object and find episod that his name is equal with value of select 
  episodeListSelect_El.addEventListener('change', ()=>{  
    episodeInput_El.value = '';    
    if(episodeListSelect_El.value == "allEepisodes"){
      mainDiv_El.innerHTML = ''; 
      searchResualt_El.textContent = `Total :  ${allEpisodesList.filter(ep => ep.showId == currentShowId).length}`;
      allEpisodesList.filter(ep => ep.showId == currentShowId).forEach((episode, index)=>{
        makePageForEpisodes(episode, index, 'load');
      })   
    }
    else{
      mainDiv_El.innerHTML = ''; 
      searchResualt_El.textContent = `${1} | ${allEpisodesList.filter(ep => ep.showId == currentShowId).length}`;
      allEpisodesList.filter(Episodes=> episodeListSelect_El.value == `${Episodes.name+ ' - ' + titleCodeGenerator(Episodes)}`).forEach((episode, index)=>{
        makePageForEpisodes(episode, index, 'load');
      })   
      
    }
  });

  // Input element on input event serach in my object and find all keyword that I wrote in input 
  episodeInput_El.addEventListener("input", () => {    
    episodeListSelect_El.selectedIndex = 0;    
    if (episodeInput_El.value != "") {    
      episodeSearch(allEpisodesList.filter(el => el.showId == currentShowId), episodeInput_El)          
    } 
    else {   
      mainDiv_El.innerHTML = '';
      allEpisodesList.filter(ep => ep.showId == currentShowId).forEach((episode, index)=>{
        makePageForEpisodes(episode, index, 'load');
      })
      searchResualt_El.textContent = `Total : ${currentEpisodeLength}`;
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
function makePageForEpisodes(episodeList, index, activitytype) {
  
  // forEach loop to reed one by one objects in main array and show on document
  // episodeList.forEach((episode, index) => {    
  // Create all element for show episodes in page
  let episodeDiv_El = document.createElement('div');
  let episodeTitle_El = document.createElement('p');
  let episodeImgDiv_El = document.createElement('div')
  let episodeImg_El = document.createElement('img');
  let episodeImgP_El = document.createElement('p');
  let episodeSummaryLabel_El = document.createElement('strong');
  let episodeSummaryDiv_El = document.createElement('div');
  let episodeSummary_El = document.createElement('p');

  episodeDiv_El.id = `episode_${index}_JS`;
  episodeDiv_El.classList = 'episodeDiv_CSS';    
  episodeTitle_El.id = `episodeTitle_${index}_JS`;
  episodeTitle_El.className = 'episodeTitle_CSS';
  episodeImgDiv_El.id = 'episodeImgDiv_JS';
  episodeImgDiv_El.className = 'episodeImgDiv_CSS';
  episodeImgP_El.id = 'episodeImgP_JS';
  episodeImgP_El.className = 'episodeImgP_CSS';
  episodeImg_El.id = `episodeImg_${index}_JS`;
  episodeImg_El.className = 'episodeImg_CSS';
  episodeSummaryDiv_El.id = `episodeSummaryDiv_${index}_Js`;
  episodeSummaryDiv_El.className = `episodeSummaryDiv_CSS`;
  episodeSummaryLabel_El.id = `episodeSummaryLabel_${index}_Js`;
  episodeSummaryLabel_El.className = 'episodeSummaryLabel_CSS';
  episodeSummary_El.id = `episodeSummary_${index}_Js`;
  episodeSummary_El.className = 'episodeSummary_CSS';    

  episodeTitle_El.innerHTML = (activitytype == 'load') ? `${episodeList.name} - ${titleCodeGenerator(episodeList)}` : `${episodeList.name}`;
  episodeSummaryLabel_El.textContent = `Summary`;
  if(episodeList.summary != null){
    if (episodeList.summary != ''){
      episodeSummary_El.innerHTML = (activitytype == 'load') ? pureSummary(episodeList) : episodeList.summary;
    }
    else{
      episodeSummary_El.textContent = 'Nothing to show !!!';
    }      
  }
  else{
    episodeSummary_El.textContent = 'Nothing to show !!!';
  }    
  
  mainDiv_El.appendChild(episodeDiv_El);
  episodeDiv_El.appendChild(episodeTitle_El)
  episodeDiv_El.appendChild(episodeImgDiv_El)
  if(episodeList.image != null){
    episodeImg_El.src = `${episodeList.image.medium.replace(new RegExp('http', "gi"), 'https')}` 
    episodeImgDiv_El.appendChild(episodeImg_El)
  }
  else{
    episodeImgDiv_El.appendChild(episodeImgP_El)
    episodeImgP_El.innerHTML = '   Image <br> Not Found!!!';    
  }    
  episodeDiv_El.appendChild(episodeSummaryLabel_El)
  episodeDiv_El.appendChild(episodeSummaryDiv_El)
  episodeSummaryDiv_El.appendChild(episodeSummary_El)        
}
function makeComboBoxOfShowsName(allShowsList){  
  allShowsList.forEach((episode, index) => {
    options_JS = document.createElement('option');
    options_JS.id = `showOption_${index}_JS`;
    options_JS.className = `showOption_CSS`;
    options_JS.value = `${episode.id}`;
    options_JS.textContent = `${episode.name}`
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

function episodeSearch(allEpisodes, elementParameterToSearch){  
  mainDiv_El.innerHTML = ''; 
  let searchResualt = 0;
  allEpisodes.forEach((episode, index)=> {  
    let episodeResualt = 0;
    let episodeContainer = JSON.parse(JSON.stringify(episode))      
    episodeContainer.name = `${episode.name} - ${titleCodeGenerator(episode)}`;    
  
    if (episodeContainer.name.toLowerCase().indexOf(elementParameterToSearch.value.toLowerCase()) > -1){
      episodeContainer.name = episodeContainer.name.replace(new RegExp(elementParameterToSearch.value, "gi"), (match) => `<strong class="highlight_CSS">${match}</strong>`);
      episodeResualt++;
    }
    if(episode.summary != null){
      if (episode.summary != ''){
        episodeContainer.summary = `${pureSummary(episode)}`;
        if (episodeContainer.summary.toLowerCase().indexOf(elementParameterToSearch.value.toLowerCase()) > -1){
          episodeContainer.summary = episodeContainer.summary.replace(new RegExp(elementParameterToSearch.value, "gi"), (match) => `<strong class="highlight_CSS">${match}</strong>`);      
          episodeResualt++;
        }    
      }       
    }        
    if(episodeResualt > 0) {
      searchResualt++;
      makePageForEpisodes(episodeContainer, index, 'search');
    }
  })
  if (searchResualt == 0) {    
    nothingToShow_El.id = 'nothingToShow_JS';
    nothingToShow_El.textContent = 'Sorry Nothing to show ! ! !';
    mainDiv_El.appendChild(nothingToShow_El);     
    searchResualt_El.textContent = `0 | ${allEpisodes.length}`;
  }
  else{
    searchResualt_El.textContent = `${searchResualt} | ${allEpisodes.length}`;
  }
}
window.onload = setup;

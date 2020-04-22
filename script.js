//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
// Title generator function that have a array parameter , episode for example name:"Winter is Coming"  and episod:1 season:1 so episod resual should be "Winter is Coming - S01E01"
function titleCodeGenerator(episode){
  let seasonCode = (episode.season < 10) ? '0' + episode.season : episode.season;
  let episodeCode = (episode.number < 10) ? '0' + episode.number : episode.number;
  return `S${seasonCode}E${episodeCode}`;
}
// Summary in object mentioned <p> and </p> tags and these tags have to be removed 
function pureSummary(episode){
  // Remove all <p> tags in sammary
  let summaryStr = (episode.summary).replace(/<p>/g,'');
  // Remove all </p> tags in sammary and return it
  return (summaryStr).replace(/<\/p>/g,'');
}
// Function for make main body of project 
function makePageForEpisodes(episodeList) {
  // Access to main Div element with 'root' id
  const rootElem = document.getElementById("root");
  episodeList.forEach((episode)=>{ // forEach loop to reed one by one objects in main array and show on document
    // I used innerHtml and parameters to create elements in body
    rootElem.innerHTML += `
    <div id="${titleCodeGenerator(episode)}" class="episodeDiv">
      <p class="episodeTitle">${episode.name} - ${titleCodeGenerator(episode)}</p>
      <img class="episodeImg" src=${episode.image.medium}>
      <p class="summary"><strong>Summary:</strong><br>${pureSummary(episode)}</p>
    </div>`    
  });  
}

window.onload = setup;

//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function titleCodeGenerator(episode){
  let seasonCode = (episode.season < 10) ? '0' + episode.season : episode.season;
  let episodeCode = (episode.number < 10) ? '0' + episode.number : episode.number;
  return `S${seasonCode}E${episodeCode}`;
}

function pureSummary(episode){
  let summaryStr = (episode.summary).replace(/<p>/g,'');
  return (summaryStr).replace(/<\/p>/g,'');
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  episodeList.forEach((episode, index)=>{
    rootElem.innerHTML += `
    <div id="${titleCodeGenerator(episode)}" class="episodeDiv">
      <p class="episodeTitle">${episode.name} - ${titleCodeGenerator(episode)}</p>
      <img class="episodeImg" src=${episode.image.medium}>
      <p class="summary"><strong>Summary:</strong><br>${pureSummary(episode)}</p>
    </div>`    
  });  
}

window.onload = setup;

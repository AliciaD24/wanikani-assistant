var apiToken;

function pullApi (){
  
  apiToken = document.getElementById('apiToken').value;
  
  if (!apiToken) {
    alert('Please enter your API Token before continuing.');
    return;
  } else {
  
    var apiEndpointPath = 'user';
    var requestHeaders =
      new Headers({
        'Wanikani-Revision': '20170710',
        Authorization: 'Bearer ' + apiToken,
      });
    var apiEndpoint =
      new Request('https://api.wanikani.com/v2/' + apiEndpointPath, {
        method: 'GET',
        headers: requestHeaders
      });
    
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        getUserInfo(data.data)
      });
  }
}

function getUserInfo(data) {
  
  const userInfoDiv = document.getElementById('user-info');
  
  userInfoDiv.innerHTML = '';
  
  const username = data.username;
  const level = data.level;
  const sub = data.subscription.active;
  
  userInfoDiv.innerHTML = `
    <p>Username: ${username}</p>
    <p>Level: ${level}</p>
    <p>Committed to the Crabigator? ${sub}</p>
  `;
  
}

var apiToken;

function pullApi (){
  
  apiToken = document.getElementById('apiToken').value;
  
  if (!apiToken) {
    document.getElementById('user-info').innerHTML = `
        <p>Please enter your API Token before continuing.</p>
        `;
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
        getUserInfo(data.data);
      })
      .catch(error => {
      console.error('Error fetching API token data:', error);
      document.getElementById('user-info').innerHTML = `
        <p>The token you entered is invalid, please try again.</p>
        `;
      });
  }
}

function getUserInfo(data) {
  
  const userInfoDiv = document.getElementById('user-info');
  const login = document.getElementById('login');
  const logout = document.getElementById('logout');

  userInfoDiv.innerHTML = '';

  const username = data.username;
  const level = data.level;
  var subed = data.subscription.active;
  
  if (subed) {
    subed = 'Of course'
  } else {
    subed = 'Not yet'
  }
  
  userInfoDiv.innerHTML = `
    <p>Username: ${username}</p>
    <p>Level: ${level}</p>
    <p>Committed to the Crabigator? ${subed}</p>
  `;
  
  login.style.display = 'none';
  logout.style.display = 'block';
  
}

function logout() {
  
  apiToken = '';
  
  const userInfoDiv = document.getElementById('user-info');
  const logout = document.getElementById('logout');
  
  userInfoDiv.innerHTML = '';
  
  userInfoDiv.innerHTML = `
    <p>Enter your WaniKani API Token below to log in:</p>
  `;
  
  login.style.display = 'block';
  logout.style.display = 'none';
  
}
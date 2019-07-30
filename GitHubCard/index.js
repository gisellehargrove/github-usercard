/* Step 1: using axios, send a GET request to the following URL
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

// make a get request to recieve my github profile information
axios.get('https://api.github.com/users/gisellehargrove').then((response) => {
  // pass my data into the creator function
  const userCard = cardCreator(response.data);
  // select the cards container
  const cardsContainer = document.querySelector('.cards');
  // append my usercard to the cardsContainer
  cardsContainer.appendChild(userCard);
  // add github calendar to my user card
  new GitHubCalendar('.calendar', 'gisellehargrove');
}).catch((err) => {
  console.log(err)
});


/* Step 2: Inspect and study the data coming back, this is YOUR
   github info! You will need to understand the structure of this
   data in order to use it to build your component function

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function,
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either
          follow this link in your browser https://api.github.com/users/<Your github name>/followers
          , manually find some other users' github handles, or use the list found
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.

          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell',
  'maseh87'
];


followersArray.forEach((user) => {
  const url = 'https://api.github.com/users/' + user;
  const cardsContainer = document.querySelector('.cards');
  axios.get(url).then((response) => {
    const userCard = cardCreator(response.data);
    cardsContainer.appendChild(userCard);
  }).then(() => {
    axios.get(url + '/followers').then((response) => {
      response.data.forEach((userObj) => {
        const userCard = cardCreator(userObj);
        const cardsContainer = document.querySelector('.cards');
        cardsContainer.appendChild(userCard);
      });
    })
  }).catch((err) => {
    console.log(err);
  });
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const cardCreator = (userObj) => {
  // create card element
  const card = document.createElement('div');
  // add card class to div
  card.classList.add('card');

  // create img element
  const imgElement = document.createElement('img');
  // add src attribute
  imgElement.src = userObj.avatar_url;
  // append to parent
  card.appendChild(imgElement);

  // create card info container
  const infoContainer = document.createElement('div');
  // add class card-info to container
  infoContainer.classList.add('card-info');

  // create h3 for name
  const name = document.createElement('h3');
  // set text content
  name.textContent = userObj.name;
  // append to card-info parent
  infoContainer.appendChild(name);

  // create username element
  const username = document.createElement('p');
  // add username class
  username.classList.add('username');
  // set text content
  username.textContent = userObj.login;
  // append to card-info parent
  infoContainer.appendChild(username);


  // create location element
  const location = document.createElement('p');
  // set text content
  location.textContent = 'Location: ' + userObj.location;
  // append to card-info parent
  infoContainer.appendChild(location);

  // create profile container
  const profileContainer = document.createElement('p');
  // set text content
  profileContainer.textContent = 'Profile: ';

  // create anchor for github address
  const address = document.createElement('a');
  // set href to github address
  address.href = userObj.html_url;
  // set text content
  address.textContent = userObj.url;
  // append address to profile container
  profileContainer.appendChild(address);

  // append profileContainer to card-info parent
  infoContainer.appendChild(profileContainer);

  // create followers element
  const followers = document.createElement('p');
  // set text content
  followers.textContent = 'Followers: ' + userObj.followers
  // append to card-info parent
  infoContainer.appendChild(followers);

  // create following element
  const following = document.createElement('p');
  // set text content
  following.textContent = 'Following: ' + userObj.following;
  // append to card-info parent
  infoContainer.appendChild(following);

  // create bio element
  const bio = document.createElement('p');
  // set text content
  bio.textContent = 'Bio: ' + userObj.bio;
  // append to card-info parent
  infoContainer.appendChild(bio);

  // create calendar element
  const calendar = document.createElement('div');
  // add calendar class
  calendar.classList.add('calendar');
  // add info to calendar
  // new GitHubCalendar('.calendar', userObj.login);
  // append to infoContainer
  card.appendChild(calendar);

  // append card info container to card container
  card.appendChild(infoContainer);


  // return component
  return card;

};

/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

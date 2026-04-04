window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
    
        /* Task 1.3. Add your code from exercise 1 here 
           and include a non-functional 'Edit' button
           to pass this test */
     
          fetch('/movies')
          .then(response1 => response1.json())
          .then(movies => {
              const container = document.getElementById('movies-container');
              movies.forEach(movie => {
              const movieDiv = document.createElement('div');
              movieDiv.className = 'movie';
              movieDiv.id = movie.imdbID;

              const poster = document.createElement('img');
              poster.src = movie.Poster;
              poster.alt = movie.Title;
              movieDiv.appendChild(poster);

              //Ratings
              let imdbClass = 'good';
              if (movie.imdbRating <= 7) {
                  imdbClass = 'medium';
              } else if (movie.imdbRating <= 5) {
                  imdbClass = 'bad';
              }

              let metaClass = 'good';
              if (movie.Metascore <= 70) {
                  metaClass = 'medium';
              } else if (movie.Metascore <= 50) {
                  metaClass = 'bad';
              }

              const imdbHTML = `<span class="rating ${imdbClass}">IMDB Rating: ${movie.imdbRating}</span>`;
              const metaHTML = `<span class="rating ${metaClass}">Metascore: ${movie.Metascore}</span>`;

              const infoDiv = document.createElement('div');
              infoDiv.innerHTML = `
                  <h2>${movie.Title} (${movie.Released})</h2>
                  <p>Runtime: ${movie.Runtime} min</p>
                  <p>Genres: ${movie.Genres.join(', ')}</p>
                  <p>Directors: ${movie.Directors.join(', ')}</p>
                  <p>Writers: ${movie.Writers.join(', ')}</p>
                  <p>Actors: ${movie.Actors.join(', ')}</p>
                  <p> ${imdbHTML}</p>
                  <p>${metaHTML}</p>
                  <p>Plot: ${movie.Plot}</p>

              `;

              const editBtn = document.createElement('button');
              editBtn.textContent = 'Edit';
              editBtn.className = 'edit-btn';
              editBtn.onclick = function() {
                location.href = 'edit.html?imdbID=' + movie.imdbID;
              };
              infoDiv.appendChild(editBtn);


              movieDiv.appendChild(infoDiv);

              
              container.appendChild(movieDiv);

              

        });
    })
            



          


    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};

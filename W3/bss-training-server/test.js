fetch("http://localhost:8000/dashboard")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });

import "./styles.css";


fetch("https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff")
  .then(response => response.json())
  .then(data => {
    const towns = data.dataset.dimension.Alue.category.label;
    const values = data.dataset.value;
    const table = document.getElementById("table");
    const oTowns = Object.values(towns);
      
    for (let i = 0; i < oTowns.length; i++) {
      const row = table.insertRow(-1);
      
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);

      cell1.innerHTML = oTowns[i];
      cell2.innerHTML = values[i];
      
    }
    //had problems that the second data wasn't always loading
    //https://stackoverflow.com/questions/40981040/using-a-fetch-inside-another-fetch-in-javascript
    return fetch("https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065");
  })
  .then(response2 => response2.json())
  .then(data => {

    const employments = data.dataset.value;

    const table = document.getElementById("table");
    const row = table.rows;

    for (let i = 1; i-1 < employments.length; i++) {

      const cell1 = row[i].insertCell(2);
      const cell2 = row[i].insertCell(-1);

      cell1.innerHTML = employments[i-1];

      const person = row[i].cells[1].innerText;

      const pr = (Number(employments[i-1])/Number(person)*100).toFixed(2);

      cell2.innerHTML = pr + "%";
      
      if (pr > 45) {
        row[i].style.backgroundColor = "#abffbd";
      }
      else if (pr < 25) {
        row[i].style.backgroundColor = "#ff9e9e"
      }

    }
  })
  .catch((errorMsg) => {
    console.log(errorMsg);
  });

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

    }
  );
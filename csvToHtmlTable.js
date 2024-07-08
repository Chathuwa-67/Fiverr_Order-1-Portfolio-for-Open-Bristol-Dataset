document.addEventListener("DOMContentLoaded", function () {
  fetch("resource/Cycle_shops_and_repairs.csv")
    .then((response) => response.text())
    .then((csvText) => {
      Papa.parse(csvText, {
        header: true,
        complete: function (results) {
          const data = results.data;
          const tableBody = document.querySelector("#csvTable tbody");
          tableBody.innerHTML = "";

          function populateTable(filteredData) {
            tableBody.innerHTML = "";
            filteredData.forEach((row) => {
              const tr = document.createElement("tr");
              const cols = [
                row["OBJECTID"],
                row["NAME"],
                row["ADDRESS"],
                row["DESCRIPTION"],
                row["WEBSITE"],
                row["PHONE"],
                row["SERVICES_PROVIDED"],
                row["REGION"],
              ];

              cols.forEach((col) => {
                const td = document.createElement("td");
                td.textContent = col ? col.trim() : "";
                tr.appendChild(td);
              });

              tableBody.appendChild(tr);
            });
          }

          // Initial population of the table
          populateTable(data);

          // Filter functionality
          document
            .getElementById("filterInput")
            .addEventListener("input", function () {
              const filterValue = this.value.toLowerCase();
              const filteredData = data.filter((row) => {
                return Object.values(row).some(
                  (col) => col && col.toLowerCase().includes(filterValue)
                );
              });
              populateTable(filteredData);
            });
        },
        error: function (error) {
          console.error("Error parsing the CSV file:", error);
        },
      });
    })
    .catch((error) => console.error("Error fetching the CSV file:", error));
});

document.addEventListener('DOMContentLoaded', function() {
    const filterInput = document.getElementById('filterInput');
    const tableBody = document.getElementById('tableBody');

    let data = JSON.parse(localStorage.getItem('tableData')) || [
        {name: 'John Doe', age: '28', city: 'New York', occupation: 'Developer'},
        {name: 'Jane Smith', age: '34', city: 'Los Angeles', occupation: 'Designer'},
        {name: 'Mike Johnson', age: '42', city: 'Chicago', occupation: 'Manager'},
        {name: 'Sarah Wilson', age: '29', city: 'Houston', occupation: 'Analyst'},
        {name: 'David Brown', age: '35', city: 'Phoenix', occupation: 'Engineer'}
    ];
    
    function renderTable(dataToRender = data) {
        tableBody.innerHTML = '';
        dataToRender.forEach(item => {
            const row = tableBody.insertRow();
            row.innerHTML = `<td>${item.name}</td><td>${item.age}</td><td>${item.city}</td><td>${item.occupation}</td>`;
        });
    }
    
    filterInput.addEventListener('keyup', function() {
        const filter = filterInput.value.toLowerCase();
        const filtered = data.filter(item => 
            Object.values(item).some(value => 
                value.toLowerCase().includes(filter)
            )
        );
        renderTable(filtered);
    });
    
    renderTable();
});
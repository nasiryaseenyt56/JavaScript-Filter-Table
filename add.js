document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newEntry = {
            name: document.getElementById('nameInput').value,
            age: document.getElementById('ageInput').value,
            city: document.getElementById('cityInput').value,
            occupation: document.getElementById('occupationInput').value
        };
        
        let data = JSON.parse(localStorage.getItem('tableData')) || [];
        data.push(newEntry);
        localStorage.setItem('tableData', JSON.stringify(data));
        
        form.reset();
        alert('Entry added successfully!');
    });
});
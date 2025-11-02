document.addEventListener('DOMContentLoaded', function() {
    const filterInput = document.getElementById('filterInput');
    const table = document.getElementById('dataTable');
    const addBtn = document.getElementById('addBtn');
    const tbody = table.getElementsByTagName('tbody')[0];
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const personDetails = document.getElementById('personDetails');
    const editModal = document.getElementById('editModal');
    const closeEditBtn = document.querySelector('.close-edit');
    const editForm = document.getElementById('editForm');
    const showAddFormBtn = document.getElementById('showAddForm');
    const addSection = document.getElementById('addSection');
    const cancelBtn = document.getElementById('cancelBtn');
    let currentEditRow = null;

    function updateStats() {
        const rows = tbody.getElementsByTagName('tr');
        const cities = new Set();
        const roles = new Set();
        
        for (let row of rows) {
            if (row.style.display !== 'none') {
                const cells = row.getElementsByTagName('td');
                cities.add(cells[2].textContent);
                roles.add(cells[3].textContent);
            }
        }
        
        document.getElementById('totalEmployees').textContent = rows.length;
        document.getElementById('totalCities').textContent = cities.size;
        document.getElementById('totalRoles').textContent = roles.size;
        document.getElementById('visibleCount').textContent = Array.from(rows).filter(row => row.style.display !== 'none').length;
    }

    showAddFormBtn.addEventListener('click', function() {
        if (addSection.style.display === 'none' || !addSection.style.display) {
            addSection.style.display = 'block';
            addSection.style.opacity = '0';
            addSection.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                addSection.style.transition = 'all 0.3s ease';
                addSection.style.opacity = '1';
                addSection.style.transform = 'translateY(0)';
            }, 10);
        } else {
            addSection.style.transition = 'all 0.3s ease';
            addSection.style.opacity = '0';
            addSection.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                addSection.style.display = 'none';
            }, 300);
        }
    });

    cancelBtn.addEventListener('click', function() {
        addSection.style.display = 'none';
        clearAddForm();
    });

    function clearAddForm() {
        document.getElementById('nameInput').value = '';
        document.getElementById('ageInput').value = '';
        document.getElementById('cityInput').value = '';
        document.getElementById('occupationInput').value = '';
    }

    filterInput.addEventListener('keyup', function() {
        const filter = filterInput.value.toLowerCase();
        const rows = tbody.getElementsByTagName('tr');
        let visibleCount = 0;
        
        for (let row of rows) {
            const cells = row.getElementsByTagName('td');
            let found = false;
            
            for (let j = 0; j < cells.length - 1; j++) {
                if (cells[j].textContent.toLowerCase().includes(filter)) {
                    found = true;
                    break;
                }
            }
            
            row.style.display = found ? '' : 'none';
            if (found) visibleCount++;
        }
        
        document.getElementById('visibleCount').textContent = visibleCount;
    });

    addBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const name = document.getElementById('nameInput').value.trim();
        const age = document.getElementById('ageInput').value.trim();
        const city = document.getElementById('cityInput').value.trim();
        const occupation = document.getElementById('occupationInput').value.trim();
        
        if (name && age && city && occupation) {
            addBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
            addBtn.disabled = true;
            
            setTimeout(() => {
                const newRow = tbody.insertRow();
                newRow.innerHTML = `
                    <td>${name}</td>
                    <td>${age}</td>
                    <td>${city}</td>
                    <td>${occupation}</td>
                    <td>
                        <div class="action-buttons-cell">
                            <button class="btn-icon edit-btn" title="Edit Employee">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon view-btn" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </td>
                `;
                
                newRow.style.opacity = '0';
                newRow.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    newRow.style.transition = 'all 0.3s ease';
                    newRow.style.opacity = '1';
                    newRow.style.transform = 'translateY(0)';
                }, 10);
                
                clearAddForm();
                addSection.style.opacity = '0';
                addSection.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    addSection.style.display = 'none';
                }, 300);
                
                updateStats();
                
                addBtn.innerHTML = '<i class="fas fa-save"></i> Save Employee';
                addBtn.disabled = false;
                
                showNotification('Employee added successfully!', 'success');
            }, 500);
        } else {
            addBtn.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                addBtn.style.animation = '';
            }, 500);
            showNotification('Please fill in all fields', 'error');
        }
    });

    tbody.addEventListener('click', function(e) {
        if (e.target.classList.contains('edit-btn') || e.target.closest('.edit-btn')) {
            const btn = e.target.classList.contains('edit-btn') ? e.target : e.target.closest('.edit-btn');
            const row = btn.closest('tr');
            const cells = row.getElementsByTagName('td');
            
            document.getElementById('editName').value = cells[0].textContent;
            document.getElementById('editAge').value = cells[1].textContent;
            document.getElementById('editCity').value = cells[2].textContent;
            document.getElementById('editOccupation').value = cells[3].textContent;
            
            currentEditRow = row;
            editModal.style.display = 'block';
        } else if (e.target.classList.contains('view-btn') || e.target.closest('.view-btn')) {
            const row = e.target.closest('tr');
            const cells = row.getElementsByTagName('td');
            const name = cells[0].textContent;
            const age = cells[1].textContent;
            const city = cells[2].textContent;
            const occupation = cells[3].textContent;
            
            personDetails.innerHTML = `
                <div class="detail-item">
                    <i class="fas fa-user detail-icon"></i>
                    <div><strong>Name:</strong> ${name}</div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-birthday-cake detail-icon"></i>
                    <div><strong>Age:</strong> ${age} years old</div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt detail-icon"></i>
                    <div><strong>City:</strong> ${city}</div>
                </div>
                <div class="detail-item">
                    <i class="fas fa-briefcase detail-icon"></i>
                    <div><strong>Occupation:</strong> ${occupation}</div>
                </div>
            `;
            
            modal.style.display = 'block';
        }
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (currentEditRow) {
            const name = document.getElementById('editName').value.trim();
            const age = document.getElementById('editAge').value.trim();
            const city = document.getElementById('editCity').value.trim();
            const occupation = document.getElementById('editOccupation').value.trim();
            
            if (name && age && city && occupation) {
                const cells = currentEditRow.getElementsByTagName('td');
                cells[0].textContent = name;
                cells[1].textContent = age;
                cells[2].textContent = city;
                cells[3].textContent = occupation;
                
                editModal.style.display = 'none';
                currentEditRow = null;
                updateStats();
                showNotification('Employee updated successfully!', 'success');
            } else {
                showNotification('Please fill in all fields', 'error');
            }
        }
    });

    closeEditBtn.addEventListener('click', function() {
        editModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .detail-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem;
            margin: 0.5rem 0;
            background: rgba(102, 126, 234, 0.05);
            border-radius: 10px;
            border-left: 4px solid #667eea;
            transition: all 0.3s ease;
        }
        
        .detail-item:hover {
            background: rgba(102, 126, 234, 0.1);
            transform: translateX(5px);
        }
        
        .detail-icon {
            color: #667eea;
            font-size: 1.2rem;
            width: 20px;
            text-align: center;
        }
        
        .stats-section {
            animation: fadeInUp 0.6s ease 0.2s both;
        }
        
        .table-container {
            animation: fadeInUp 0.6s ease 0.4s both;
        }
    `;
    document.head.appendChild(style);
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            
            this.classList.add('active');
            
            const target = this.getAttribute('href').substring(1);
            
            if (target === 'employees') {
                document.querySelector('.page-title-content h1').textContent = 'Employee Directory';
                document.querySelector('.page-title-content .subtitle').textContent = 'View and manage all employees in your organization';
                document.querySelector('.page-icon i').className = 'fas fa-users';
            } else if (target === 'dashboard') {
                document.querySelector('.page-title-content h1').textContent = 'Employee Management Dashboard';
                document.querySelector('.page-title-content .subtitle').textContent = 'Manage your team efficiently with our professional tools';
                document.querySelector('.page-icon i').className = 'fas fa-database';
            } else if (target === 'reports') {
                document.querySelector('.page-title-content h1').textContent = 'Reports & Analytics';
                document.querySelector('.page-title-content .subtitle').textContent = 'Generate insights and reports from your employee data';
                document.querySelector('.page-icon i').className = 'fas fa-chart-bar';
            }
        });
    });
    
    setTimeout(() => {
        updateStats();
    }, 100);
});
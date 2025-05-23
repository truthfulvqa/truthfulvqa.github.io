document.addEventListener('DOMContentLoaded', function() {
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 添加表格排序功能
    const table = document.querySelector('.leaderboard-table');
    if (table) {
        const headers = table.querySelectorAll('th');
        headers.forEach((header, index) => {
            header.addEventListener('click', () => {
                sortTable(index);
            });
            header.style.cursor = 'pointer';
        });
    }

    // 表格排序函数
    function sortTable(column) {
        const table = document.querySelector('.leaderboard-table');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        // 获取当前排序方向
        const currentDirection = table.getAttribute('data-sort-direction') === 'asc' ? 'desc' : 'asc';
        table.setAttribute('data-sort-direction', currentDirection);

        // 排序行
        rows.sort((a, b) => {
            const aValue = a.cells[column].textContent.trim();
            const bValue = b.cells[column].textContent.trim();
            
            // 检查是否为数字
            const aNum = parseFloat(aValue);
            const bNum = parseFloat(bValue);
            
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return currentDirection === 'asc' ? aNum - bNum : bNum - aNum;
            }
            
            return currentDirection === 'asc' 
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        });

        // 重新插入排序后的行
        rows.forEach(row => tbody.appendChild(row));
    }

    // 添加响应式导航栏
    const createNavbar = () => {
        const navbar = document.createElement('nav');
        navbar.className = 'navbar';
        navbar.innerHTML = `
            <div class="nav-container">
                <a href="#" class="nav-logo">TruthfulVQA</a>
                <div class="nav-links">
                    <a href="#overview">Overview</a>
                    <a href="#dataset">Dataset</a>
                    <a href="#leaderboard">Leaderboard</a>
                    <a href="https://github.com/truthfulvqa" target="_blank">GitHub</a>
                </div>
            </div>
        `;
        document.body.insertBefore(navbar, document.body.firstChild);
    };

    createNavbar();

    // 添加返回顶部按钮
    const createBackToTop = () => {
        const button = document.createElement('button');
        button.className = 'back-to-top';
        button.innerHTML = '↑';
        button.style.display = 'none';
        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    createBackToTop();
}); 
document.addEventListener('DOMContentLoaded', function() {
    const newAccountNameInput = document.getElementById('newAccountName');
    const addAccountButton = document.getElementById('addAccountBtn');
    const accountListElement = document.getElementById('accountList');

    function createAccountItem(accountName) {
        const listItem = document.createElement('li');
        listItem.textContent = accountName;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', function() {
            this.parentNode.remove();
        });

        listItem.appendChild(deleteButton);
        accountListElement.appendChild(listItem);
    }

    addAccountButton.addEventListener('click', function() {
        const accountName = newAccountNameInput.value.trim();

        if (accountName !== "") {
            createAccountItem(accountName);
            newAccountNameInput.value = "";
        } else {
            alert("Account name cannot be empty!");
        }
    });

    const staticAccounts = accountListElement.querySelectorAll('li');

    staticAccounts.forEach(function(item) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', function() {
            this.parentNode.remove();
        });

        item.appendChild(deleteButton);
    });
});
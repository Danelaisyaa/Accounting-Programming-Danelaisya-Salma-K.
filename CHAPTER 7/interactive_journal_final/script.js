document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('journalDate');
    const refNoInput = document.getElementById('refNo');
    const descriptionInput = document.getElementById('description');
    const accountInput = document.getElementById('account');
    const debitInput = document.getElementById('debit');
    const creditInput = document.getElementById('credit');

    const addTransactionBtn = document.getElementById('addTransactionBtn');
    const saveJournalBtn = document.getElementById('saveJournalBtn');

    const journalForm = document.getElementById('journalForm');
    const tableBody = document.getElementById('transactionTableBody');

    function formatRupiah(value) {
        return new Intl.NumberFormat('id-ID').format(value);
    }

    function clearForm() {
        journalForm.reset();
    }

    function addTransaction() {
        const date = dateInput.value;
        const refNo = refNoInput.value.trim();
        const description = descriptionInput.value.trim();
        const account = accountInput.value;
        const debit = debitInput.value;
        const credit = creditInput.value;

        if (
            date === "" ||
            refNo === "" ||
            description === "" ||
            account === ""
        ) {
            alert("Please complete all journal information!");
            return;
        }

        if (debit === "" && credit === "") {
            alert("Please enter either Debit or Credit!");
            return;
        }

        if (debit !== "" && credit !== "") {
            alert("Debit and Credit cannot both be filled!");
            return;
        }

        if (
            (debit !== "" && Number(debit) < 0) ||
            (credit !== "" && Number(credit) < 0)
        ) {
            alert("Debit and Credit cannot be negative!");
            return;
        }

        const newRow = document.createElement('tr');

        const values = [
            date,
            refNo,
            description,
            account,
            debit === "" ? "" : formatRupiah(Number(debit)),
            credit === "" ? "" : formatRupiah(Number(credit))
        ];

        values.forEach(function(value) {
            const cell = document.createElement('td');
            cell.textContent = value;
            newRow.appendChild(cell);
        });

        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');

        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener('click', function() {
            this.parentNode.parentNode.remove();
        });

        actionCell.appendChild(deleteButton);
        newRow.appendChild(actionCell);

        tableBody.appendChild(newRow);

        clearForm();
    }

    debitInput.addEventListener('input', function() {
        if (this.value !== "") {
            creditInput.value = "";
        }
    });

    creditInput.addEventListener('input', function() {
        if (this.value !== "") {
            debitInput.value = "";
        }
    });

    addTransactionBtn.addEventListener('click', addTransaction);

    saveJournalBtn.addEventListener('click', function() {
        alert("Journal successfully saved! (Data is not persistent)");
        tableBody.innerHTML = "";
        clearForm();
    });
});
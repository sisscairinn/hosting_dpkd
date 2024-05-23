document.addEventListener('DOMContentLoaded', function () {
    const topUpForm = document.getElementById('topUpForm');

    // Set default balance to Rp 500,000 if no balance is stored in local storage
    let balance = parseFloat(localStorage.getItem('balance')) || 500000;

    topUpForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount to top up.');
            return;
        }

        // Add the top-up amount to the current balance
        balance += amount;
        localStorage.setItem('balance', balance);

        // Fire the storage event to notify other tabs/windows about the balance change
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'balance',
            newValue: balance.toString()
        }));

        // Redirect to profile page after successful top-up (you can adjust this as needed)
        window.location.href = "profile.html";
    });
});

const API = "http://localhost:3000/api";

const user = JSON.parse(localStorage.getItem("user"));

document.getElementById("username").innerHTML = user.fullName;

document.getElementById("balance").innerHTML =
"R" + user.balance.toFixed(2);

document.getElementById("accountNumber").innerHTML =
user.accountNumber;

loadTransactions();

async function depositMoney() {

    const amount =
    Number(document.getElementById("depositAmount").value);

    const response = await fetch(API + "/transactions/deposit", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            userId: user._id,

            amount

        })

    });

    const data = await response.json();

    if (data.success) {

        user.balance = data.balance;

        localStorage.setItem("user", JSON.stringify(user));

        location.reload();

    } else {

        alert(data.message);

    }

}

async function withdrawMoney() {

    const amount =
    Number(document.getElementById("withdrawAmount").value);

    const response = await fetch(API + "/transactions/withdraw", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            userId: user._id,

            amount

        })

    });

    const data = await response.json();

    if (data.success) {

        user.balance = data.balance;

        localStorage.setItem("user", JSON.stringify(user));

        location.reload();

    } else {

        alert(data.message);

    }

}

async function loadTransactions() {

    const response = await fetch(

        API + "/transactions/history/" + user._id

    );

    const transactions = await response.json();

    let html = "";

    transactions.forEach(transaction => {

        html += `
        <tr>

        <td>${new Date(transaction.createdAt).toLocaleDateString()}</td>

        <td>${transaction.type}</td>

        <td>R${transaction.amount}</td>

        </tr>
        `;

    });

    document.getElementById("transactionTable").innerHTML = html;

}


async function transferMoney(){

    const recipientAccount =
    document.getElementById("recipientAccount").value;

    const amount =
    Number(document.getElementById("transferAmount").value);

    const response = await fetch(

        API + "/transactions/transfer",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                senderId:user._id,

                recipientAccount,

                amount

            })

        }

    );

    const data = await response.json();

    if(data.success){

        user.balance = data.balance;

        localStorage.setItem(

            "user",

            JSON.stringify(user)

        );

        alert("Transfer Successful");

        location.reload();

    }else{

        alert(data.message);

    }

}
// ==========================
// CONFIGURATION
// ==========================

// Replace these with your Production Webhook URLs
const ADD_EXPENSE_API = "https://krrish2006.app.n8n.cloud/webhook-test/0351975d-ca91-4cf2-982e-ab9213816439";
const WEEKLY_SUMMARY_API = "https://aladitya2006.app.n8n.cloud/webhook-test/weekly-summary";

// Temporary User ID
// Later we'll replace this with login/localStorage
const USER_ID = "1785953422807";


// ==========================
// ELEMENTS
// ==========================

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");

const categoryText = document.getElementById("category");
const savingTipText = document.getElementById("savingTip");

const summaryDiv = document.getElementById("summary");

const totalSpent = document.getElementById("totalSpent");
const totalExpenses = document.getElementById("totalExpenses");
const topCategory = document.getElementById("topCategory");


// ==========================
// ADD EXPENSE
// ==========================

document
.getElementById("addExpenseBtn")
.addEventListener("click", addExpense);


async function addExpense(){

    const description = descriptionInput.value.trim();
    const amount = amountInput.value;

    if(description==="" || amount===""){

        alert("Please enter Description and Amount");

        return;
    }

    try{

        const response = await fetch(ADD_EXPENSE_API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                userId:USER_ID,

                description:description,

                amount:Number(amount)

            })

        });

        const data = await response.json();

        console.log(data);

        categoryText.innerText =
        data.Category || data.category || "-";

        savingTipText.innerText =
        data.SavingTip ||
        data.savingTip ||
        "-";

        alert("Expense Added Successfully!");

        descriptionInput.value="";
        amountInput.value="";

    }

    catch(error){

        console.error(error);

        alert("Unable to connect to server.");

    }

}



// ==========================
// WEEKLY SUMMARY
// ==========================

document
.getElementById("summaryBtn")
.addEventListener("click", getWeeklySummary);


async function getWeeklySummary(){

    summaryDiv.innerHTML="Generating AI Summary...";

    try{

        const response = await fetch(WEEKLY_SUMMARY_API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                userId:USER_ID

            })

        });

        const data = await response.json();

        summaryDiv.innerText =
        data.weeklySummary ||
        data.text ||
        "No Summary Available";

    }

    catch(error){

        console.log(error);

        summaryDiv.innerHTML="Unable to generate summary.";

    }

}

// DATE
var today = new Date();
  var date =today.getDate() +'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  document.getElementById("current_date").innerHTML = date;
// LOGIN
const inputLoginUsername = document.querySelector('.userInput');
const inputLoginPin = document.querySelector('.userPin');
const loginBtn = document.querySelector('.login_btn');

// TRANSFER
const inputTransferTo = document.querySelector('.transfer_id');
const inputTransferAmount = document.querySelector('.transfer_amount');

// LOAN REQUEST
const inputLoanAmount = document.querySelector('.loan_req');
const loanBtn = document.querySelector('.loan_reqBtn');

// CLOSE ACC
const inputCloseUsername = document.querySelector('.close_userr');
const inputClosePin = document.querySelector('.close_pin');

// TRANSATION HISTROY
const labelBalance = document.querySelector('.balance_field');
const labelDate = document.querySelector('.date');

// MOVEMENTS
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const account1={
  userName: "subash",
  movement: [200,-250,300,-350,500],
  pin: 123,
  currentBalance: 3570,
};
const account2={
  userName: "chandr",
  movement: [2000,2500,3000,-3500,5000],
  pin: 123,
  currentBalance: 4290,
};
const account3={
  userName: "bose",
  movement: [200,250,30,-350,5000],
  pin: 123,
  currentBalance: 5500,
};
const account4={
  userName: "admin",
  movement: [20,2050,300,-35,500],
  pin: 123,
  currentBalance: 7150,
};

let accounts = [account1, account2, account3, account4];

function login() {
  var userName = document.getElementById("name").value;
  var pin = document.getElementById("pin").value;
  var element = document.querySelector(".userRecords");
  console.log(userName);
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].userName === userName && accounts[i].pin == pin ) {
        // Update balance field
        let currentBalance = accounts[i].currentBalance.toFixed(2);
        document.querySelector('.balance_field').textContent = currentBalance;
        // alert("Login successfully");
        element.style.opacity = 1;
        return; 
    }
  }
  alert("Invalid User or Password");
}
// LOAN REQUEST
function loan() {
  var loanAmount = parseFloat(labelBalance.textContent);
  let currentBalance = parseFloat(inputLoanAmount.value);
  let data = [loanAmount, currentBalance];
  let sum = data.reduce((a, b) => a + b);
  let d1 = document.querySelector('.balance_field').innerHTML=sum
  console.log(sum);
}

function transfer() {
  let senderUsername = document.getElementById('name').value;
  let recipientUsername = document.getElementById('user_transfer').value;
  let transferAmount = parseFloat(document.getElementById('outSend').value);
  let senderAccount = accounts.find(account => account.userName === senderUsername);
  let recipientAccount = accounts.find(account => account.userName === recipientUsername);
  if (!senderAccount || !recipientAccount) {
    alert('Please enter valid usernames.');
    return;
  }
  if (transferAmount <= 0 || isNaN(transferAmount) || senderAccount.currentBalance < transferAmount) {
    alert('Invalid transfer amount.');
    return;
  }
  console.log("Before Transfer", senderAccount.currentBalance);
  senderAccount.movement.push(-transferAmount);
  recipientAccount.movement.push(transferAmount);
  senderAccount.currentBalance -= transferAmount;
  recipientAccount.currentBalance += transferAmount;
  console.log("After Transfer", senderAccount.currentBalance);
  document.querySelector('.balance_field').textContent = senderAccount.currentBalance.toFixed(2);
  alert(`Transaction successful! ${transferAmount} transferred from ${senderUsername} to ${recipientUsername}.`);

  // OTHER FUNCTIONS
  outSendVal(); 
  transferMov();
}

//  IN OUT
var totalRequested = 0; 
var totalSent = 0; 

function calculateLoan() {
  var amountRequested = parseFloat(document.getElementById("userReq").value) || 0;
  var inAmountField = document.querySelector(".inAmount");
  totalRequested += amountRequested;
  inAmountField.textContent = totalRequested.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
// OUT
function outSendVal() {
  let accountName = document.getElementById('user_transfer').value;
  let transferAmount = parseFloat(document.getElementById('outSend').value) || 0;
  let senderAccount = accounts.find(account => account.userName === accountName);
  if (!senderAccount) {
      console.log('Please enter a valid username.');
      return;
  }
  let outAmountField = document.querySelector(".outAmount");
  totalSent += transferAmount;
  outAmountField.textContent = totalSent.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
// DYNAMIC ROW CREATE
  function loan() {
    let loanAmount = parseFloat(inputLoanAmount.value);
    let currentBalance = parseFloat(labelBalance.textContent);
    let newBalance = currentBalance + loanAmount;
    labelBalance.textContent = newBalance.toFixed(2); 
    const depositHtml = `
      <div class="movementsChild">
        <div class="movementsValues mb-3 ">
          <div class="Deposit">
            <p class="trans">Deposit</p>
            <p class="datefor">${formatDate(new Date())}</p>
          </div>
          <div>
            <p class="currentValue">${loanAmount.toFixed(2)}$</p>
          </div>
        </div>
      </div>`;
    document.querySelector('.movementsRecord').insertAdjacentHTML('beforeend', depositHtml);
  }
  // DYNAMIC ROW CREATE
  function transferMov() {
    let recipientUsername = document.getElementById('user_transfer').value;
    let transferAmount = parseFloat(document.getElementById('outSend').value);
    let currentBalance = parseFloat(labelBalance.textContent); 
    let recipientAccount = accounts.find(account => account.userName === recipientUsername);

    if (!recipientAccount) {
        console.log('Recipient username is invalid.');
        return;
    }

    if (transferAmount <= 0 || isNaN(transferAmount) || transferAmount > currentBalance) {
        console.log('Invalid transfer amount.');
        return;
    }
    const withdrawalHtml = `
      <div class="movementsChild">
        <div class="movementsValues mb-3">
          <div class="reduce">
            <p class="withdraw">Withdraw</p>
            <p class="datefor">${formatDate(new Date())}</p>
          </div>
          <div>
            <p class="currentValue">-${transferAmount.toFixed(2)}$</p>
          </div>
        </div>
      </div>`;
    document.querySelector('.movementsRecord').insertAdjacentHTML('beforeend', withdrawalHtml);
    let newBalance = currentBalance - transferAmount;
    labelBalance.textContent = newBalance.toFixed(2); 
    recipientAccount.movement.push(transferAmount);
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

  function logout() {
    alert("Your going to logout")
    window.location.href = "index.html"; 
}
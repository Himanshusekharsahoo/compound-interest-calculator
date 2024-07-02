function calculateInterest() {
  const principal = parseFloat(document.getElementById("principal").value);
  const contribution = parseFloat(
    document.getElementById("contribution").value
  );
  const rate = parseFloat(document.getElementById("rate").value) / 100;
  const years = parseInt(document.getElementById("years").value);

  if (isNaN(principal) || isNaN(contribution) || isNaN(rate) || isNaN(years)) {
    alert("Please enter valid numbers in all fields.");
    return;
  }

  const months = years * 12;
  const monthlyRate = rate / 12;
  let futureValue = principal * Math.pow(1 + monthlyRate, months);

  let totalInvested = principal;
  for (let i = 1; i <= months; i++) {
    futureValue += contribution * Math.pow(1 + monthlyRate, months - i);
    totalInvested += contribution;
  }

  const interest = futureValue - totalInvested;

  const resultHTML = `
  <div class="result-item"><span>Total Amount:</span> ₹${futureValue.toFixed(2)}</div>
  <div class="result-item"><span>Total Invested:</span> ₹${totalInvested.toFixed(2)}</div>
  <div class="result-item"><span>Compound Interest Earned:</span> ₹${interest.toFixed(2)}</div>
  <button id="copy-button" onclick="copyResult()"><i class="fas fa-copy"></i></button>
`;

  document.getElementById("result").innerHTML = resultHTML;
}

function copyResult() {
  const resultElement = document.getElementById("result");
  const resultText = Array.from(resultElement.querySelectorAll('.result-item'))
    .map(item => item.textContent.trim())
    .join('\n');
  
  navigator.clipboard.writeText(resultText).then(() => {
    alert("Result copied to clipboard!");
  }).catch(err => {
    console.error('Failed to copy: ', err);
    alert("Failed to copy result. Please try again.");
  });
}

function reset() {
  document.getElementById("interest-form").reset();
  document.getElementById("result").innerHTML = "";
}
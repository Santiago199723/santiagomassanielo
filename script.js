document.getElementById("calculator-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const capital_invested = parseFloat(document.getElementById("capital").value);
  const num_operations = parseInt(document.getElementById("operations").value);
  const num_wins = parseInt(document.getElementById("wins").value);
  const payout = parseFloat(document.getElementById("payout").value);
  const initial_entry_amount = capital_invested / num_operations;

  function calculateEntryAmount(previous_losses, initial_entry_amount) {
    return previous_losses === 0 ? initial_entry_amount : (initial_entry_amount + (previous_losses * initial_entry_amount));
  }

  function calculateExpectedProfit(initial_entry_amount, payout, num_wins) {
    let total_profit = 0;
    for (let i = 0; i < num_wins; i++) {
      const profit = initial_entry_amount * payout - (i * initial_entry_amount);
      total_profit += profit;
    }
    return total_profit;
  }

  const total_expected_profit = calculateExpectedProfit(initial_entry_amount, payout, num_wins);
  const percentage_expected_profit = ((total_expected_profit - capital_invested) / capital_invested) * 100;

  const entryAmountsList = document.getElementById("entry-amounts");
  entryAmountsList.innerHTML = "";
  let currentAmount = initial_entry_amount;
  let losses = 0;
  for (let i = 0; i < num_operations; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = `Entry ${i + 1}: R$ ${currentAmount.toFixed(2)}`;
    entryAmountsList.appendChild(listItem);

    if (i >= num_wins) {
      losses++;
      currentAmount = calculateEntryAmount(losses, initial_entry_amount);
    }
  }

  document.getElementById("expected-profit").textContent = `R$ ${total_expected_profit.toFixed(2)}`;
  document.getElementById("percentage-profit").textContent = percentage_expected_profit.toFixed(2) + "%";

  document.getElementById("result").classList.remove("hidden");
});

const energyUnits = {
    "J": { "name": "Joule", "conversion_to_J": 1 },
    "AM": { "name": "Arbitrary Unit", "conversion_to_J": 125 },
    "EU": { "name": "Energy Unit", "conversion_to_J": 10 },
    "MJ": { "name": "MegaJoule", "conversion_to_J": 16 },
    "RF": { "name": "Redstone Flux (RF)", "conversion_to_J": 2.5 },
    "FE": { "name": "Flux Energy (FE)", "conversion_to_J": 2.5 },
    "gJ": { "name": "gigaJoule", "conversion_to_J": 1.525 },
    "AE": { "name": "Applied Energy", "conversion_to_J": 1 }
};

const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const amountInput = document.getElementById('amount');
const resultDisplay = document.getElementById('result');

for (const unit in energyUnits) {
    const optionFrom = document.createElement('option');
    optionFrom.value = unit;
    optionFrom.textContent = `${energyUnits[unit].name} (${unit})`;
    fromUnitSelect.appendChild(optionFrom);

    const optionTo = document.createElement('option');
    optionTo.value = unit;
    optionTo.textContent = `${energyUnits[unit].name} (${unit})`;
    toUnitSelect.appendChild(optionTo);
}

// Function to perform the conversion
function convert() {
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const amount = parseFloat(amountInput.value);

    if (!isNaN(amount)) {
        const amountInJ = amount * energyUnits[fromUnit].conversion_to_J;
        const result = amountInJ / energyUnits[toUnit].conversion_to_J;
        resultDisplay.textContent = `${amount} ${energyUnits[fromUnit].name} = ${result.toFixed(2)} ${energyUnits[toUnit].name}`;
    } else {
        resultDisplay.textContent = '';
    }
}

fromUnitSelect.addEventListener('change', convert);
toUnitSelect.addEventListener('change', convert);
amountInput.addEventListener('input', convert);

convert();

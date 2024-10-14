const conversionData = {
    "AM": { factor: 0.05, fullName: "Amber" },
    "RF": { factor: 1, fullName: "Redstone Flux" },
    "FE": { factor: 1, fullName: "Forge Energy" },
    "J": { factor: 1, fullName: "Joule" },
    "EU": { factor: 0.25, fullName: "Energy Unit" },
    "gJ": { factor: 1.6, fullName: "GigaJoule" },
    "MJ": { factor: 1 / 1_000_000, fullName: "MegaJoule" },
    "AE": { factor: 0.5, fullName: "Applied Energistics" },
    "W": { factor: 5628, fullName: "Watt" },
    "uI": { factor: 1, fullName: "MicroInfinity" }
};


const conversionFactorsMap = new Map(Object.entries(conversionData).map(([key, { factor }]) => [key, factor]));

document.addEventListener("DOMContentLoaded", () => {
    populateUnitSelectors();
    addEventListeners();
});

function populateUnitSelectors() {
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");

    for (let unit of conversionFactorsMap.keys()) {
        const optionFrom = document.createElement("option");
        optionFrom.value = unit;
        optionFrom.textContent = `${unit} - ${conversionData[unit].fullName}`; 
        fromUnitSelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = unit;
        optionTo.textContent = `${unit} - ${conversionData[unit].fullName}`; 
        toUnitSelect.appendChild(optionTo);
    }
}

function addEventListeners() {
    const amountInput = document.getElementById("amount");
    const fromUnitSelect = document.getElementById("fromUnit");
    const toUnitSelect = document.getElementById("toUnit");

    amountInput.addEventListener("input", updateResult);
    fromUnitSelect.addEventListener("change", updateResult);
    toUnitSelect.addEventListener("change", updateResult);
}

function updateResult() {
    const inputValue = parseFloat(document.getElementById("amount").value);
    const inputUnit = document.getElementById("fromUnit").value;
    const outputUnit = document.getElementById("toUnit").value;

    if (isNaN(inputValue)) {
        document.getElementById("result").textContent = "Invalid input";
        return;
    }

    const rfValue = convertToRF(inputValue, inputUnit);
    const outputValue = convertFromRF(rfValue, outputUnit);
    
    // Format the output value based on whether it's a whole number or not
    document.getElementById("result").textContent = 
        Number.isInteger(outputValue) ? outputValue.toString() : outputValue.toFixed(2);
}

function convertToRF(value, unit) {
    const factor = conversionFactorsMap.get(unit);
    if (!factor) {
        return "Invalid unit"; 
    }
    return value / factor;
}

function convertFromRF(value, unit) {
    const factor = conversionFactorsMap.get(unit);
    if (!factor) {
        return "Invalid unit"; 
    }
    return value * factor;
}

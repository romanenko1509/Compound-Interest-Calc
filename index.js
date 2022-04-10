window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const resultEl = document.getElementById("result");
    const localResult = window.localStorage.getItem("result");

    if (localResult) {
        resultEl.innerHTML = localResult;
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const initialAmount = document.getElementById("initialAmount").value;
            const leverage = document.getElementById("leverage").value;
            const steps = document.getElementById("steps").value;
            const profitPerStep = document.getElementById("profitPerStep").value;

            if (initialAmount && leverage && steps && profitPerStep) {
                calcCompoundInterest(initialAmount, leverage, steps, profitPerStep);
            }
        })
    }

    const calcCompoundInterest = (initialAmount, leverage, steps, profitPerStep) => {
        resultEl.innerHTML = "";
        let result = initialAmount * leverage;
    
        for (let i = 1; i <= steps; i++) {
            const resultPerStep = result / 100 * profitPerStep;
            result += +resultPerStep;
    
            resultEl.innerHTML += `<div><div>Step: <span>${i}</span></div><div>Profit Per Step: <span>${resultPerStep.toFixed(2)} $</span></div><div>Total: <span>${result.toFixed(2)} $</span></div></div>`;

            window.localStorage.clear("result");
            window.localStorage.setItem("result", resultEl.innerHTML);
        }
    
        return result;
    }
})
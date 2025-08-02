const XLSX = require("xlsx");

function shouldNotify(row1, row2) {
    const frFlipped = parseFloat(row1['Funding Rate']) > 0 && parseFloat(row2['Funding Rate']) < 0;
    const oiUp = parseFloat(row2['Openinterest']) > parseFloat(row1['Openinterest']);
    const vdeltaUp = parseFloat(row2['Vdelta']) > parseFloat(row1['Vdelta']);
    const vdelta50 = parseFloat(row2['Vdelta']) >= 0.5 * parseFloat(row2['Marketcap']);

    // reason 1: if funding rate flips from + to -, and open interest & vdelta are up. 
    const reason1 = frFlipped && oiUp && vdeltaUp;

    // reason 2: vdelta is up >= 50 % from mcap.
    const reason2 = vdelta50;

    return reason1 || reason2;
}

function readExcelAndCheck() {
    const workbook = XLSX.readFile("./data/data.xlsx");
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const alerts = [];

    for (let i = 0; i < data.length; i += 2) {
        const prev = data[i];
        const curr = data[i + 1];

        if (!curr || !prev) continue;

        const symbol = curr.Symbol;

        if (shouldNotify(prev, curr)) {
            alerts.push({ symbol });
        }
    }

    return alerts;
}

module.exports = { shouldNotify, readExcelAndCheck };
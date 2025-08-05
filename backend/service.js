const XLSX = require("xlsx");

function isLongSign(row1, row2) {
    const frFlipped = parseFloat(row1['Funding Rate']) > 0 && parseFloat(row2['Funding Rate']) < 0;
    const oiUp = parseFloat(row2['Openinterest']) > parseFloat(row1['Openinterest']);
    const vdeltaUp = parseFloat(row2['Vdelta']) > parseFloat(row1['Vdelta']);

    const vdeltaDiff = parseFloat(row2['Vdelta']) - parseFloat(row1['Vdelta']);
    const vdelta50 = vdeltaDiff >= 0.5 * parseFloat(row1['Marketcap']);

    const reason1 = frFlipped && oiUp && vdeltaUp;
    const reason2 = vdelta50;

    return reason1 || reason2;
}

function isShortSign(row1, row2) {
    const frFlipped = parseFloat(row1['Funding Rate']) < 0 && parseFloat(row2['Funding Rate']) > 0;
    const frHigh = parseFloat(row2['Funding Rate']) > 0.1;

    const oiNow = parseFloat(row2['Openinterest']);
    const oiPast = parseFloat(row1['Openinterest']);
    const oiIncreased = oiNow >= oiPast * 1.1;

    const vdeltaNow = parseFloat(row2['Vdelta']);
    const vdeltaPast = parseFloat(row1['Vdelta']);
    const vdeltaDropped = vdeltaNow < vdeltaPast;
    const vdeltaNegative = vdeltaNow < 0;

    return frFlipped && frHigh && oiIncreased && vdeltaDropped && vdeltaNegative;
}

function shouldNotify(row1, row2) {
    if (isLongSign(row1, row2)) {
        return { sign: "Long" };
    }
    if (isShortSign(row1, row2)) {
        return { sign: "Short" };
    }
    return null;
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
        const result = shouldNotify(prev, curr);

        if (result) {
            alerts.push({ symbol, sign: result.sign });
        }
    }

    return alerts;
}

module.exports = {
    readExcelAndCheck
};


import * as XLSX from 'xlsx';

onmessage = async function (event) {
    var data = event.data.d;
    let headers = [], rows = [];
    var nstp = '', awardYear = '';
    var tempStr = '';
    var maleNum = 0, femaleNum = 0;
    var checker = true;

    /* reader.readAsArrayBuffer(file) -> data will be an ArrayBuffer */
    var workbook = XLSX.read(data, { type: 'array' });
    const ws = workbook.Sheets[workbook.SheetNames[0]];
    var rowObj = XLSX.utils.sheet_to_json(ws, { header: "A", blankrows: false });
    this.excelData = JSON.stringify(rowObj);
    // console.log(rowObj);
    /*console.log(rowObj);
    for(var i=0; i < rowObj.length; i++) {
        //console.log(rowObj[8].length);
        if(i == 8 && rowObj[8].length == 21 )
            headers = rowObj[8];
        else if(rowObj[i].length == 21 )
            rows.push(rowObj[i]);
    }*/
    for (var i = 0; i < rowObj.length; i++) {
        if (!checker) break;   //break out of the loop if there's inconsistency in awardYear and nstp

        if (i == 7 && Object.keys(rowObj[7]).length == 1) {     //get acadYear
            tempStr = rowObj[7].A;
        }
        else if (i == 8 && Object.keys(rowObj[8]).length == 21) {
            headers = rowObj[8];
        }
        else if (Object.keys(rowObj[i]).length == 21) {
            rows.push(rowObj[i]);
            awardYear = rowObj[i].B;
            nstp = rowObj[i].C;
            if (rowObj[9].B != rowObj[i].B || rowObj[9].C != rowObj[i].C) {     //awardYear & nstpProgram
                checker = false;
            }
        }
        else if (i == (rowObj.length - 6)) {    //row in excel file
            maleNum = rowObj[i].C;
        }
        else if (i == (rowObj.length - 5)) {
            femaleNum = rowObj[i].C;
        }
    }
    var acadYear = tempStr.replace(/[^0-9-]+/g, '');    //removes other characters except numbers and -
    if (acadYear == '') acadYear = awardYear;
    // console.log(acadYear);
    postMessage({
        headers: headers,
        rows: rows,
        male: maleNum,
        female: femaleNum,
        acadYear: acadYear,
        awardYear: awardYear,
        nstp: nstp,
        complete: checker,
    });
}

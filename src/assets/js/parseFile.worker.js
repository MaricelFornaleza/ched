

import * as XLSX from 'xlsx';


onmessage =  async function(event) {
    var data = event.data.d;


    let headers = [];
    let rows = [];
    var male = 0, female = 0;
    
   
    /* reader.readAsArrayBuffer(file) -> data will be an ArrayBuffer */
    var workbook = XLSX.read(data, {type : 'array'});
    const ws = workbook.Sheets[workbook.SheetNames[0]];
    var rowObj =  XLSX.utils.sheet_to_json(ws, {header:"A", blankrows: false});
    this.excelData = JSON.stringify(rowObj);
    /*console.log(rowObj);
    for(var i=0; i < rowObj.length; i++) {
        //console.log(rowObj[8].length);
        if(i == 8 && rowObj[8].length == 21 )
            headers = rowObj[8];
        else if(rowObj[i].length == 21 )
            rows.push(rowObj[i]);
    }*/
    for(var i=0; i<rowObj.length; i++){
        if(i == 8 && Object.keys(rowObj[8]).length == 21) {
            headers = rowObj[8];
        } 
        else if (Object.keys(rowObj[i]).length == 21) {
            rows.push(rowObj[i]);
        }
        else if(i == (rowObj.length-6)) {
            male = rowObj[i].C;
            // console.log(_this.male);
        }
        else if(i == (rowObj.length-5)) {
            female = rowObj[i].C;
            // console.log(_this.female);
        }
    }

    

    postMessage({
        headers: headers,
        rows: rows,
        male: male,
        female: female,
        complete: true,
       

    });
    // _this.table_headers = headers;
    // _this.students = rows;
    
    // _this.visible = false;
    // _this.$emit("complete", step);
    // _this.completed = !_this.completed;
}
    
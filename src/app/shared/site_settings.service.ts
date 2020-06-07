
export class SiteSettingsService{

    constructor() {}

    convertDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }

    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
    
    



    convertToArray(number) {
        return new Array(number);
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key)){
              if(!obj[key]) {
                  return false;
              } else {
                  return true;
              }
                
            }
        }
    }

    jsonToStr(jsonData) {
        return JSON.stringify(jsonData);
    }

    strToJosn(jsonString) {
        return JSON.parse(jsonString);
    }

    getDateInYears(num: number) {
        const date = new Date();
        date.setFullYear(date.getFullYear() - num);
        return date;
      }
 
    saveDataInLocalStorage(data) {
        //NOTE: data has $key & value

    }

    getSession() {
        let body = new URLSearchParams();
        const total_price = localStorage.getItem('total_price');
        const targetURL = 'https://test-gateway.mastercard.com/api/nvp/version/33';
        
    
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    
        var urlencoded = new URLSearchParams();
        urlencoded.append("apiOperation", "CREATE_CHECKOUT_SESSION");
        urlencoded.append("apiPassword", "9c6a123857f1ea50830fa023ad8c8d1b");
        urlencoded.append("apiUsername", "merchant.TESTQNBAATEST001");
        urlencoded.append("merchant", "TESTQNBAATEST001");
        urlencoded.append("order.id", this.makeid(6));
        urlencoded.append("order.amount", total_price);
        urlencoded.append("order.currency", "EGP");
    

        fetch("https://test-gateway.mastercard.com/api/nvp/version/43", {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
          })
          .then(response => response.text())
          .then(result => {
            let searchIndex = result.indexOf('SESSION');
            let searchSubStr = result.substr(searchIndex, 31);
            localStorage.setItem('__arop_session_id', searchSubStr);
            console.log('session string', searchSubStr);
          })
          .catch(error => console.log('error', error));
    
    
    
      }
}
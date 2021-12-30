setTimeout(runLoop, 0);  //Ads loop should start immediately 
setInterval(runLoop, 18000)  // Loop through all ads every 18 seconds

function runLoop() {
    // An array of ad content 
    const adArr = [
        `<div class="ads" style="height: 300px; width: 300px; background: #aaa; padding:15px 10px; text-align:center;">
            <h4>First Ad</h4>
        </div>
        `,
        `<div class="ads" style="height: 450px; width: 300px; background: #aaa; padding:15px 10px; text-align:center;">
            <h1>Second Ad</h1>
        </div>
        `,
        `<div class="ads" style="height: 400px; width: 300px; background: #aaa; padding:15px 10px; text-align:center;">
            <h3 style="color: #00f;">Third Ad</h3>
        </div>
        `,
        `<div class="ads" style="height: 400px; width: 300px; background: #aaa; padding:15px 10px; text-align:center;">
            <h4><b>Fourth Ad</b></h4>
        </div>
        `,
        `<div class="ads" style="height: 300px; width: 300px; background: #aaa; padding:15px 10px; text-align:center;">
            <h3><b>Fifth Ad</b></h3>
        </div>
        `
    ];

    // Time before each ad is displayed on the page 
    setTimeout(() => {
        document.querySelector('.adverts').innerHTML = adArr[0];
    }, 3000);

    setTimeout(() => {
        document.querySelector('.adverts').innerHTML = adArr[1];
    }, 6000);

    setTimeout(() => {
        document.querySelector('.adverts').innerHTML = adArr[2];
    }, 9000);

    setTimeout(() => {
        document.querySelector('.adverts').innerHTML = adArr[3];
    }, 12000);

    setTimeout(() => {
        document.querySelector('.adverts').innerHTML = adArr[4];
    }, 15000);
    
}


import React, { useState } from 'react';

function Week()
{
    
    // Sunday and Saturday (S) 
    const weekBtnS = {
        border: 'none',
        color: 'white',
        backgroundImage: 'url(/S_btn.png)',
        backgroundSize: '20px 90px',
        height: '90px',
        width: '20px'
    };
    const weekBtSActive = {
        border: 'none',
        color: 'white',
        backgroundImage: 'url(/S_btnActive.png)',
        backgroundSize: '20px 90px',
        height: '90px',
        width: '20px'
    };

    // Monday (M)
    const weekBtnM = {
        border: 'none',
        color: 'white',
        backgroundImage: 'url(/M_btn.png)',
        backgroundSize: '20px 90px',
        height: '90px',
        width: '20px'
    };
    const weekBtMActive = {
        border: 'none',
        color: 'white',
        backgroundImage: 'url(/M_btnActive.png)',
        backgroundSize: '20px 90px',
        height: '90px',
        width: '20px'
    };

      // Tuesday (T)
      const weekBtnT = {
        border: 'none',
        color: 'white',
        backgroundImage: 'url(/T_btn.png)',
        backgroundSize: '20px 90px',
        height: '90px',
        width: '20px'
    };
    const weekBtTActive = {
        border: 'none',
        color: 'white',
        backgroundImage: 'url(/T_btnActive.png)',
        backgroundSize: '20px 90px',
        height: '90px',
        width: '20px'
    };

     // Wednesday (W)
     const weekBtnW = {
        border: 'none',
        color: 'white',
        backgroundImage: 'url(/W_btn.png)',
        backgroundSize: '20px 90px',
        height: '90px',
        width: '20px'
    };
    const weekBtWActive = {
        border: 'none',
        color: 'white',
        backgroundImage: 'url(/W_btnActive.png)',
        backgroundSize: '20px 90px',
        height: '90px',
        width: '20px'
    };

    // Friday (F)
    const weekBtnF = {
        border: 'none',
        color: 'white',
        backgroundImage: 'url(/F_btn.png)',
        backgroundSize: '20px 90px',
        height: '90px',
        width: '20px'
    };
    const weekBtFActive = {
        border: 'none',
        color: 'white',
        backgroundImage: 'url(/F_btnActive.png)',
        backgroundSize: '20px 90px',
        height: '90px',
        width: '20px'
    };
   
    // Sunday and Saturday (S) 
    const[weekBtnSInactive, weekBtnSActive] = useState(weekBtnS);

    function changebtnS(){
        weekBtnSActive(weekBtSActive);
    }
    // Monday (M)
    const[weekBtnMInactive, weekBtnMActive] = useState(weekBtnM);

    function changebtnM(){
        weekBtnMActive(weekBtSActive);
    }
    // Tuesday and Thurday (T)
    const[weekBtnTInactive, weekBtnTActive] = useState(weekBtnT);

    function changebtnT(){
        weekBtnTActive(weekBtTActive);
    }
    // Wednesday (W)
    const[weekBtnWInactive, weekBtnWActive] = useState(weekBtnW);

    function changebtnW(){
        weekBtnWActive(weekBtWActive);
    }
    // Friday (F)
    const[weekBtnFInactive, weekBtnFActive] = useState(weekBtnF);

    function changebtnF(){
        weekBtnFActive(weekBtFActive);
    }
 
  
    
    return(

        <div>
            <table class = 'week'>
                <tr>
                    <td>
                        <button style = {weekBtnSInactive} onClick={changebtnS}></button>
                        <button style = {weekBtnMInactive} onClick={changebtnM}></button>
                        <button style = {weekBtnTInactive} onClick={changebtnT}></button>
                        <button style = {weekBtnWInactive} onClick={changebtnW}></button>
                        <button style = {weekBtnTInactive} onClick={changebtnT}></button>
                        <button style = {weekBtnFInactive} onClick={changebtnF}></button>
                        <button style = {weekBtnSInactive} onClick={changebtnS}></button>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default Week;
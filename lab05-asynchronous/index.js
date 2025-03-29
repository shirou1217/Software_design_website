function get_info() {
    return new Promise((resolve, reject) => {
        let success_rate = Math.random();
        let timer = Math.floor(Math.random() * 1000 + 500);
        if (success_rate > 0) {
            let tmp_id = Math.floor(Math.random() * 14000 + 6000);
            setTimeout(() => {
                resolve(tmp_id);
            }, timer);
        } else {
            setTimeout(() => {
                reject('Failed');
            }, timer);
        }
    });
}

function get_firstname() {
    // first_name_list = ['Adam', 'Eric', 'Peter'];
    // TODO : generate a success rate

    // TODO : generate a timer

    // TODO : random select a item from list
    let success_rate = Math.random();
    if (success_rate > 0.1) {
        let first_name_list = ['Adam', 'Eric', 'Peter'];
        return first_name_list[Math.floor(Math.random() * first_name_list.length)];
    } else {
        throw 'Failed';
    }
}

function get_lastname() {
    // last_name_list = ['Jones', 'Smith', 'Johnson'];
    // TODO : generate a success rate

    // TODO : generate a timer

    // TODO : random select a item from list
    let success_rate = Math.random();
    if (success_rate > 0.5) {
        let last_name_list = ['Jones', 'Smith', 'Johnson'];
        return last_name_list[Math.floor(Math.random() * last_name_list.length)];
    } else {
        throw 'Failed';
    }
}

function get_username() {
    // username_list = ['Zeus', 'Faker', 'Keria'];
    // TODO : generate a success rate

    // TODO : generate a timer

    // TODO : random select a item from list
    let success_rate = Math.random();
    if (success_rate > 0.1) {
        let username_list = ['Zeus', 'Faker', 'Keria'];
        return username_list[Math.floor(Math.random() * username_list.length)];
    } else {
        throw 'Failed';
    }
}

function get_email() {
    // email_list = ['asdf@google.com', 'qwer@microsoft.com', 'zxcv@cs.nthu.edu.tw'];
    // TODO : generate a success rate

    // TODO : generate a timer

    // TODO : random select a item from list
    let success_rate = Math.random();
    if (success_rate > 0.5) {
        let email_list = ['asdf@google.com', 'qwer@microsoft.com', 'zxcv@cs.nthu.edu.tw'];
        return email_list[Math.floor(Math.random() * email_list.length)];
    } else {
        throw 'Failed';
    }
}

function get_address() {
    // address_list = ['1027 Alpha Avenue', '3132 Kidd Avenue', '876 Jefferson Street'];

    // TODO : generate a success rate

    // TODO : generate a timer

    // TODO : random select a item from list
    let success_rate = Math.random();
    if (success_rate > 0.5) {
        let address_list = ['1027 Alpha Avenue', '3132 Kidd Avenue', '876 Jefferson Street'];
        return address_list[Math.floor(Math.random() * address_list.length)];
    } else {
        throw 'Failed';
    }
}

const initApp = () => {
    const reSamplebtn = document.getElementById('resamplebtn');
    const reSampleCheckbox = document.getElementById('re-sample'); 
    reSamplebtn.addEventListener('click', retrieve_data);
    reSampleCheckbox.addEventListener('change', () => {
        if (reSampleCheckbox.checked) {
            retrieve_data(); // Trigger retrieval when checkbox is checked
        }
    });
}

async function retrieve_data() {
    const txtInfoName = document.getElementById('user-info-name');
    const txtFirstName = document.getElementById('firstName');
    const txtLastName = document.getElementById('lastName');
    const txtUserName = document.getElementById('username');
    const txtEmail = document.getElementById('email');
    const txtAddress = document.getElementById('address');
    const boxReSample = document.getElementById('re-sample');
    txtInfoName.innerText = '-';
    txtFirstName.value = '-';
    txtLastName.value = '-';
    txtUserName.value = '-';
    txtEmail.value = '-';
    txtAddress.value = '-';
    let resample = true;
    
        try {
            // TODO : get_info first
            // TODO : call other function to get other data
            while (resample) {
                const info = await get_info();
                txtInfoName.innerText = `${info}'s Information:`;
                await new Promise(resolve => setTimeout(resolve, 2000));
                if(info){
                const promises = [
                    get_firstname(),
                    get_lastname(),
                    get_username(),
                    get_email(),
                    get_address()
                ];
    
                const [firstName, lastName, username, email, address] = await Promise.all(promises);

                
                txtFirstName.value = firstName;
                txtLastName.value = lastName;
                txtUserName.value = username;
                txtEmail.value = email;
                txtAddress.value = address;
                // // If any of the data retrieval fails, display "Failed"
                // if ([firstName, lastName, username, email, address].includes('Failed')) {
                //     txtInfoName.innerText = 'Failed';
                 
                // }
                // If automatic resample is not checked or all data retrieved successfully, exit loop
                
                if(!boxReSample.checked && (txtInfoName.innerText == 'Failed' || firstName == 'Failed' || lastName == 'Failed' || username == 'Failed' || email == 'Failed' || address == 'Failed')){
                    resample = false;
                    txtInfoName.innerText = `Failed`;
                    
                }
                else if (!boxReSample.checked || (txtInfoName.innerText !== 'Failed' && firstName !== 'Failed' && lastName!== 'Failed' && username!== 'Failed' && email!== 'Failed' && address!== 'Failed')){
                    resample = false;
                }
                else if(!boxReSample.checked && (txtInfoName.innerText !== 'Failed' && firstName !== 'Failed' && lastName!== 'Failed' && username!== 'Failed' && email!== 'Failed' && address!== 'Failed')) {
                    resample = false;
                    txtInfoName.innerText = `${info}'s Information:`;
                }
            }
        }
            
        } catch (e) {
            txtInfoName.innerText = 'Failed';
            resample = false;
            
        }
        
    
    
}

window.onload = function() {
    initApp();
}
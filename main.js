const getSParam = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sParam = urlParams.get('s');
    return sParam;
}

const prepareCommandUrl = (urlTemplate, urlParams) => {
    console.log(`Preparing URL from template: ${urlTemplate} with params: ${urlParams}`);
    let preparedUrl = urlTemplate;
    const paramsArray = urlParams.split(' ');
    paramsArray.forEach((param, index) => {
        preparedUrl = preparedUrl.replace(`{${index}}`, param);
    });
    preparedUrl = preparedUrl.replace('%s', urlParams);
    return preparedUrl;
}

const showAllCommands = () => {
    const table = document.createElement('table');
    const head = table.createTHead();
    const row = head.insertRow();
    const cellKey = row.insertCell(0);
    const cellName = row.insertCell(1);
    cellKey.innerHTML = '<b>Command</b>';
    cellName.innerHTML = '<b>Name</b>';
    
    Object.keys(commands).forEach(key => {
        const row = table.insertRow();
        const cellKey = row.insertCell(0);
        const cellName = row.insertCell(1);
        cellKey.innerHTML = key;
        cellName.innerHTML = commands[key].name;
        console.log(`${key}: ${commands[key].name}`);
    });
    document.body.appendChild(table);
};

const processRedirect = () =>{
    const sParam = getSParam();
    if (sParam) {
        const commandKey = sParam.split(' ')[0];
        const command = commands[commandKey];
        if (command) {
            const urlParams = sParam.substring(commandKey.length).trim();
            const finalUrl = urlParams 
                ? prepareCommandUrl(command.searchUrl || command.url, urlParams) 
                : command.url;
            console.log(`Redirecting to ${finalUrl}`);
            window.location.href = finalUrl;
        } else {
            console.log(`Command not found for key: ${commandKey}`);
            showAllCommands();
        }
    } else {
        console.log('No S Param provided');
        showAllCommands();
    }
}

(function () {
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }
    ready(() => {
        processRedirect();
    });

})();

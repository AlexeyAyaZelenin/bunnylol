const getSParam = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sParam = urlParams.get('s');
    return sParam;
}

const prepareCommandUrl = (urlTemplate, urlParams) => {
    let preparedUrl = urlTemplate;
    const paramsArray = urlParams.split(' ');
    paramsArray.forEach((param, index) => {
        preparedUrl = preparedUrl.replace(`{${index}}`, param);
    });
    preparedUrl = preparedUrl.replace('%s', urlParams);
    return preparedUrl;
}

const addRow = (table, value1, value2) => {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = value1;
    cell2.innerHTML = value2;
}

const showAllCommands = () => {
    const table = document.createElement('table');
    const head = table.createTHead();
    addRow(head, 'Command', 'Name');
    
    Object.keys(commands).forEach(key => {
        addRow(table, key, commands[key].name);
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

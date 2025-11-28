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

const escapeHtml = (unsafe) => unsafe
         .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

const addRow = (table, value1, value2, value3 = '') => {
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    
    cell1.innerHTML = escapeHtml(value1);
    cell2.innerHTML = escapeHtml(value2);
    cell3.innerHTML = escapeHtml(value3);
}

const showAllCommands = () => {
    const table = document.createElement('table');
    const head = table.createTHead();
    addRow(head, 'Command', 'Name', 'Description');
    
    const body = table.createTBody();
    Object.keys(commands).forEach(key => {
        addRow(body, key, commands[key].name, commands[key].description || '');
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

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

const findCommandByKey = (input) => {
    const commandKey = input.split(' ')[0];
    const command = commands[commandKey];
    if (command) {
        return { commandKey: commandKey, command };
    }
    return null;
}

const findCommandByPrefix = (input) => {
    const trimmedInput = input.trim().toLowerCase();
    for (const key in commands) {
        const command = commands[key];
        if (command.prefix && trimmedInput.startsWith(command.prefix)) {
            return { commandKey: command.prefix, command };
        }
    }
    return null;
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
        const { commandKey, command } = findCommandByKey(sParam) || findCommandByPrefix(sParam) || {};
        if (command) {
            const urlParams = sParam.substring(commandKey.length).trim();
            const finalUrl = urlParams 
                ? prepareCommandUrl(command.searchUrl || command.url, urlParams) 
                : command.url;
            console.log(`Redirecting to ${finalUrl}`);
            window.location.href = finalUrl;
        } else {
            // Check by prefix
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
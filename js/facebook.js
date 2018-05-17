function statusChangeCallback(response) {
    if (response.status === 'connected') {
        createMenu();
    } else {
        createNamePrompt();
    }
}
"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if(response.success) {
            location.reload();
        }
        else {
            alert('Запрос на выход из пользователя не выполнился')
        }
    })
};


"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        } else {
            alert('Запрос на выход из пользователя не выполнился')
        }
    })
};

//Получение информации о пользователе
function currentUser () {
    ApiConnector.current = ((response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data)
        }
    });
}

currentUser ();

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function valute() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data)
        }
    })
}

valute();
setInterval(valute, 6000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (addMoney) => {
    ApiConnector.addMoney(addMoney, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            console.log(addMoney);
            moneyManager.setMessage(false, `Вы пополнили свой счёт на ${addMoney.amount} ${addMoney.currency}`)
        } else {
            moneyManager.setMessage(true, response.data)
        }
    })
};


//Реализуйте конвертирование валюты
moneyManager.conversionMoneyCallback = (convertMoney = {
    fromCurrency: null,
    targetCurrency: null,
    fromAmount: null
}) => {
    ApiConnector.convertMoney(convertMoney, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, `Конвентирование валюты прошло успешно итого: ${convertMoney.fromAmount}`)
        } else {
            moneyManager.setMessage(true, response.data)
        }
    })
};

moneyManager.sendMoneyCallback = (transferMoney) => {
    ApiConnector.transferMoney(transferMoney, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, `Вы перевели  ${transferMoney.to} сумму ${transferMoney.amount}`);

        } else {
            moneyManager.setMessage(true, response.data);
        }
    })
};

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = (addUserToFavorites) => {
    ApiConnector.addUserToFavorites(addUserToFavorites, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, `Пользователь ${addUserToFavorites.name} добавлен в ваше избранное`);
        } else {
            favoritesWidget.setMessage(true, response.data)
        }
    })
};

favoritesWidget.removeUserCallback = (removeUserFromFavorites) => {
    ApiConnector.addUserToFavorites(removeUserFromFavorites, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(false, `Пользователь удален`);
        } else {
            favoritesWidget.setMessage(true, response.data)
        }
    })
};

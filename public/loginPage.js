"use strict";

const userForm = new UserForm();  //Создание объекта класса
userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if(response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage('Логин и пароль неправильные')
        }
    })
};

userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if(response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage('Не удалось зарегистрироваться')
        }
    })
};


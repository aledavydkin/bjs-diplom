"use strict";

const userForm = new UserForm();  //Создание объекта класса
userForm.loginFormCallback = (data = {password: null, login: null}) => {
    ApiConnector.login(data, (response) => {
        if(response.success) {
            location.reload();
        } else {
            console.error('Логин или пароль неверны');
        }
    })
};

userForm.registerFormCallback = (data = {password: null, login: null}) => {
    ApiConnector.register(data, (response) => {
        if(response.success) {
            location.reload();
        } else {
            console.error('Не удалось зарегистрироваться');
        }
    })
};


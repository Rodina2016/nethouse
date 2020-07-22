'use strict'

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const errors = document.querySelector('.form__errors');
    const state = {
        isError: 0
    }
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if(state.isError) {
            errors.classList.add('show');
            return;
        }
        errors.classList.remove('show');

        const data = new FormData(form);
        let obgData = {};
        data.forEach((item, i) => {
            obgData[i] = item;
        })

        async function sendData(url, data) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify(data)
                });
                return await response.json();
            } catch (err) {
                console.error(err);
            }
        }

        sendData('http://jsonplaceholder.typicode.com/posts', obgData)
            .then((data) => {
                console.log(data);
            });

    });

    form.addEventListener('change', (e) => {
        const item = e.target;
        if(item.name === 'name') {
            let regExp = /([А-ЯA-Z]|[А-ЯA-Z][\x27а-яa-z]{1,})\040[А-ЯA-Z][\x27а-яa-z]{1,}(\040[А-ЯA-Z][\x27а-яa-z]{1,})?/g;
            matchRegExp(regExp, item);
        }

        if(item.name === 'email') {
            let regExp = /([A-Za-z0-9_\-\.])+\@gmail\.com/;
            matchRegExp(regExp, item);
        }

        if(item.name === 'phone') {
            let regExp = /((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}/;
            matchRegExp(regExp, item);
        }
    });

    const matchRegExp = (regExp, item) => {
        let match = item.value.match(regExp);
        if(match === null) {
            item.classList.add('error');
            state.isError++;
        } else {
            item.classList.remove('error');
            item.value = match[0];
            state.isError--;
        }

        if(item.value === '') {
            item.classList.remove('error');
        }
    }

});
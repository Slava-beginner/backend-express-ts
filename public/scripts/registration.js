const form = document.querySelector('.registration');

const nick = document.querySelector('.nick');

const email = document.querySelector('.email');

const password = document.querySelector('.password');

const inps = document.querySelectorAll('.register-input')
form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    let d = new FormData(form)
    // проверка на пустоту
    let isEmpty = false;
    inps.forEach(elem =>{
        if(!elem.value){
            isEmpty = true;
            elem.classList.add('error');
        }
        else if(elem.value && elem.classList.contains("error")){
            elem.classList.remove('error');
        }
    });
    if(!isEmpty){
        if(!/^[a-zA-Z0-9]+$/.test(nick.value)){
            return alert('Nickname может состоять только из символов латинского алфавита и цифр')
        }
        if(!/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(email.value)){
            return alert('Введите валидную почту!')
        }
        if(password.value.length < 8){
            return alert('Длина пароля не менее 8 символов!')
        }
        let resp = await fetch('./register',{
            method:'POST',
            headers:{
                "Content-Type": 'application/x-www-form-urlencoded',
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7'
            },
            body:d,
        });
        console.log(resp)
        let js = await resp.json();
        console.log(js)
    }
   
})



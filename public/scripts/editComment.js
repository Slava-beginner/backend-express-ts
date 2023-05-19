const inp = document.querySelector("label > *");
const submit = document.querySelector('.form__submit');
const form = document.querySelector('#form');
const btnDelete = document.querySelector('.form__delete');
form.addEventListener('submit',async (e) =>{
    e.preventDefault();
    try {
        let resp = await fetch('./save',{
            method:"PUT",
             headers: {
                    'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify({
                text:inp.value
            })
        });
       return alert('Запись обновлена')
    } catch (error) {
        alert('Ошибка клиента');
        throw new Error('Fetch error')
    }
});
btnDelete.onclick = async (e) =>{
    try {
        let resp = await fetch('./delete',{
            method:"DELETE",
        });
        alert('Запись удалена')
        window.location.href = '/'
    } catch (error) {
        alert('Ошибка клиента');
        throw new Error('Fetch error')
    }
}


const inps = document.querySelectorAll("label > *");
const submit = document.querySelector('.form__submit');
const form = document.querySelector('#form');
const btnDelete = document.querySelector('.form__delete')
inps.forEach(elem =>{
    elem.addEventListener("input", event =>{
        if(submit.hasAttribute('disabled')){
            submit.removeAttribute('disabled')
        }
        
    })
})
form.addEventListener('submit',async (e) =>{
    e.preventDefault();
    try {
        let resp = await fetch('./save',{
            method:"PUT",
             headers: {
                    'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify({
                name:inps[0].value,
                text:inps[1].value
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
        return alert('Запись удалена')
    } catch (error) {
        alert('Ошибка клиента');
        throw new Error('Fetch error')
    }
}


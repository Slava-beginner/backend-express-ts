const inps = document.querySelectorAll("label > *");
const submit = document.querySelector('.form__submit');
const form = document.querySelector('#form');
const btnDelete = document.querySelector('.form__delete');

const options = document.querySelectorAll('option');


form.addEventListener('submit',async (e) =>{
    e.preventDefault();
    let authorId = null;
    options.forEach(elem =>{
        if(elem.selected){
            authorId = elem.dataset.id;
        }
    });
    try {
        let resp = await fetch('./save',{
            method:"PUT",
             headers: {
                    'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify({
                name:inps[0].value,
                text:inps[1].value,
                authorId:authorId
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
        return
    } catch (error) {
        alert('Ошибка клиента');
        throw new Error('Fetch error')
    }
}


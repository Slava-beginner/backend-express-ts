const addComment = document.querySelector('.addComment');

addComment.onclick = async (e) =>{
    let answer = prompt("Введите комментарий ");
    let id = document.querySelector('.articleId').textContent
    if(!answer){
        return alert('Нельзя оставлять поле пустым!')
    }
    try{
        let res = await fetch(`./${id}/comments`,{
        method:"POST",
        headers: {
                    'Content-Type': 'application/json;charset=utf-8'
            },
        body:JSON.stringify({
            text:answer,
            articleId:id
        })
    });
    let {id:commentId} = await res.json()
    alert('Комментарий добавлен');
    
     window.location.href = `./${id}#${commentId}`;
     window.location.reload();
     return

    }
    catch(err){
        alert('Упс.. произошла ошибка')
        throw new Error(err)
    }
    

}
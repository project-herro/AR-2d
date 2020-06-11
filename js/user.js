//事情により「超高速実装」です。攻撃はご遠慮ください
login_btn.addEventListener('click',()=>{
    Login(login_user.value,login_pass.value)
})

resister_btn.addEventListener('click',()=>{
    Check_user_doubling(resi_user.value,resi_pass.value)
})
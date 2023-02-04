$(function(){
// 点击“去注册账号的连接” 
$('#link_reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
})

// 点击去登录
$('#link_login').on('click',function(){
    $('.reg-box').hide()
    $('.login-box').show()

})

// 从layui中获取form对象
var form = layui.form
var layer =layui.layer
// 通过form.verify()函数自定义校验规则
form.verify({
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位且不能存在空格'],

    //  校验量词密码是否一致的规则
    reqwb:function(value){
        // 通过形参拿到的是确认面框中的内容
        // 还需要拿到密码框中的内容
        // 然后惊醒一次等于的判断
        // 如果判断失败,则return一个提示消息即可
       var pwd= $('.reg-box [name=password]').val()
       if(pwd !==value){
        return'两次密码不一致！'
       }
    }
   
})

    var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val() }
   // 监听注册表单的提交事件
   $('#form_reg').on('submit',function(e){
    e.preventDefault()
    $.post('/api/reguser',data,function(res){

          if(res.status !== 0){
            return layer.msg(res.message)
            
          }
          
          layer.msg('注册成功，请登录！')
          $('#link_login').click()
    })
   })

   
    //监听登录表单的提交事件
    $('#form_login').submit(function(e){
        // 阻止默认提交行为
         e.preventDefault()
         $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登陆失败！')
                }
                layer.msg('登录成功！')
                // 将登陆成功的到的token字符串，保存到localtorage中
                localStorage.setItem('token',res.token)
                console.log(res.token)
                // 跳转到后台主页面
                location.href ='/index.html'
            }
         })
    })
})
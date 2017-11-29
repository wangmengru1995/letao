$(function () {
    //表单验证
    var $form = $("form");

    $form.bootstrapValidator({

        //指定校验时的图标显示，必须三个一起写
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //配置参数，相对于name属性
            username: {
                validators: {
                    //用户名不能为空
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    callback: {
                        message: "用户名不存在"
                    }
                }
            },

            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    //用户名长度
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度在6-12位之间"
                    },
                    callback: {
                        message: "密码错误！"
                    }
                }
            }
        }
    })

    //给表单注册成功事件 success.form.bv
    $("form").on("success.form.bv", function (e) {
        //阻止浏览器默认行为
        e.preventDefault();

        //发送ajax请求
        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data: $form.serialize(),
            success: function (data) {
                //登录成功
                if (data.success) {
                    location.href = "index.html";
                }
                //登录失败
                    //手动调用方法，updateStatus让username校验失败即可
                    //第一个参数：改变哪个字段
                    //第二个参数：改成什么状态  VALID:通过  INVALID:不通过
                    //第三个参数：选择提示的信息
                if (data.error === 1000) {
                    //用户名不存在
                    $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
                }
                if (data.error === 1001) {
                    //密码错误
                    $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
                }
            }
        })
    })

    //重置功能
    $("button[type='reset']").on("click",function(){
        //需要重置表单样式，需要获取插件对象，而且需要在表单初始化之后
        $form.data("bootstrapValidator").resetForm();
    })


})
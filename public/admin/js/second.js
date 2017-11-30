$(function () {

  var currentPage = 1;
  var pageSize = 5;
  var render = function () {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        // console.log(data);
        //渲染页面
        $("tbody").html(template("secondTpl", data));

        //分页
        $("#firstPaginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(data.total / data.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  render();



  //点击显示模态框
  $(".btn-add").click(function () {
    $("#secondModal").modal("show");

    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (data) {
        $(".dropdown-menu").html(template("addTpl", data));
      }
    })
  })

  //点击下拉框中内容选中,给下拉框的a注册事件
  $(".dropdown-menu").on("click", "a", function () {
    $(".btn-txt").text($(this).text());
    $("[name='categoryId']").val($(this).data("id"));
    //需要手动改变校验状态,需要获取校验对象
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
  })

  //上传图片
  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      // console.log(data.result.picAddr);//data.result.picAddr 图片地址
      $(".imgWrap img").attr("src", data.result.picAddr);
      $("[name='brandLogo']").val(data.result.picAddr);

      //需要手动改变校验状态,需要获取校验对象
      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
  })

  //表单校验
  $("#form").bootstrapValidator({
    excluded: [],//该插件有指定不校验的类型，需要给他去掉
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          },
        }
      },
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          },
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }

  })

  //点击添加按钮，模态框隐藏，发送ajax
  $(".btn-submit").click(function(e){
    e.preventDefault();

    $("#secondModal").modal("hide");

    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("#form").serialize(),
      success: function(data){
        if(data.success){
          currentPage = 1;
          render();

          //重置表单
          $("#form").data("bootstrapValidator").resetForm();
          $(".imgWrap img").attr("src", "./images/none.png");
          $(".btn-txt").text("请选择一级分类");
          $("[type='hidden']").val('');
          $("[name='brandName']").val('');
        }
      }
    })
  })

})
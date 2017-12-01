$(function () {

  var currentPage = 1;
  var pageSize = 5;
  var render = function () {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        $("tbody").html(template("firstTpl", data));

        //分页
        $("#paginator").bootstrapPaginator({
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

  //添加一级分类
  $(".btn_add").click(function () {
    $("#firstModal").modal("show");
  })

  //表单校验
  var $form = $("form");
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "请输入一级分类名称"
          }
        }
      }
    }
  })

  $form.on("success.form.bv",function(e){
    
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data:$form.serialize(),
      success: function(data){
        if(data.success){
          $("#firstModal").modal("hide");
          render();
        }
      }
    })
  })


})
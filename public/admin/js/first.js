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
        // console.log(data);
        $("tbody").html(template("firstTpl", data));

        //分页
        $("#firstPaginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(data.total / data.size),
          onPageClicked: function (a, b, c, page) {
            currentPage = page,
              render();
          }
        })
      }
    })
  }

  render();

  //点击btn-add添加分类，显示模态框
  $(".btn-add").click(function () {
    $("#firstModal").modal("show");
  })

  //表单校验
  var $form = $("#form");
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
            message: "请输入一级分类的名称"
          },
        }
      }
    }

  })

  //点击 btn-confirm添加按钮，发送ajax
  $form.on("success.form.bv", function (e) {
    //阻止浏览器默认行为
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $form.serialize(),
      success: function (data) {
        console.log(data);
        if (data.success) {
          //模态框隐藏
          $("#firstModal").modal("hide");

          //重新渲染页面
          currentPage = 1;
          render();

          //重置表单
          $form.data("bootstrapValidator").resetForm();
          $("[name='categoryName']").val('');
        }
      }
    })
  })



})
$(function () {

  var $form = $("form");

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
        $("tbody").html(template("secondTpl", data));

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

  //添加分类
  $(".btn_add").click(function () {
    $("#secondModal").modal("show");

    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (data) {
        console.log(data);
        $(".dropdown-menu").html(template("firstTpl", data));
      }
    })
  })

  //一级分类的选则
  $(".dropdown-menu").on("click", "a", function () {
    // console.log($(this).data("id"));
    // console.log($(this).text());

    $("[name='categoryId']").val($(this).data("id"));
    $("#dLabel").text($(this).text());

    $form.data("bootstrapValidator").updateStatus($("[name='categoryId']"), "VALID");
  })

  //上传图片
  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      $(".form-group img").attr("src", data.result.picAddr);
      $("[name='brandLogo']").val(data.result.picAddr)
      $form.data("bootstrapValidator").updateStatus($("[name='brandLogo']"), "VALID");
    }
  })

  //表单校验

  $form.bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择上传图片"
          }
        }
      }
    }
  })

  $form.on("success.form.bv", function (e) {
    
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $form.serialize(),
      success: function (data) {
        if (data.success) {
          $("#secondModal").modal("hide");
          render();

          //重置表单
          $form.data("bootstrapValidator").resetForm();
          $form[0].reset();
          $("[type='hidden']").val('');
          $("[name='hot']").val('1');
        }
      }
    })
  })  



})
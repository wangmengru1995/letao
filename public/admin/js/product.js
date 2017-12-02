$(function () {

  var $form = $("form");
  var imgs = [];

  var currentPage = 1;
  var pageSize = 5;
  var render = function () {

    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        // console.log(data);
        $("tbody").html(template("productTpl", data));

        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(data.total / data.size),
          itemTexts: function (type, page, current) {
            // console.log(type, page, current);
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              default:
                return page;
            }
          },
          useBootstrapTooltip: true,//是否使用bootstrap的提示工具
          //提示的title
          tooltipTitles: function (type, page, current) {
            // console.log(type, page, current);
            switch (type) {
              case "first":
                return "跳转到首页";
              case "prev":
                return "跳转到上一页";
              case "next":
                return "跳转到下一页";
              case "last":
                return "跳转到尾页";
              default:
                return "跳转到" + page + "页";
            }

          },
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }

    })
  }

  render();


  //商品操作(没有给接口)
  // $("tbody").on("click", ".btn", function () {
  //   $("#operateModal").modal("show");

  //   $(".btn-confirm").off().on("click", function () {
  //     if ($(this).hasClass("btn-danger")) {

  //     }
  //   })
  // })

  //点击添加商品，添加下拉框二级分类的内容
  $(".btn-add").click(function () {
    $("#productModal").modal("show");
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (data) {
        $(".dropdown-menu").html(template("secondTpl", data));
      }
    })
  })

  //点击二级分类，改变button的值
  $(".dropdown-menu").on("click", "a", function () {
    $(".btn-txt").text($(this).text());
    $("[name='brandId']").val($(this).data("id"));
    $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
  })

  //校验表单 
  $form.bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品的描述"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品的原价"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入一个1及以上的数字"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品的价格"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入一个1及以上的数字"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品的尺码"
          },
          regexp: {
            regexp: /^[1-9]\d-[1-9]\d$/,
            message: "请输入正确的尺码，例如: 32-48"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品的库存数"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入一个1及以上的数字"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品的名称"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  })

  //上传文件
  $("#fileupload").fileupload({
    dataType: "json",
    done: function (e, data) {
      // console.log(data);
      if (imgs.length >= 3) {
        return false;
      }
      $(".imgWrap").append("<img src='" + data.result.picAddr + "' width='100' width='100'>");
      imgs.push(data.result);

      if (imgs.length === 3) {
        $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      } else {
        $form.data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
      }
      // console.log(imgs);
    }
  })

  $form.on("success.form.bv", function (e) {
    e.preventDefault();

    var param = $form.serialize();
    param += "&picName1=" + imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
    param += "&picName2=" + imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
    param += "&picName3=" + imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;

    // console.log(param);

    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: param,
      success: function (data) {
        if (data.success) {
          //隐藏模态框
          $("#productModal").modal("hide");

          currentPage = 1;
          render();

          //重置表单
          $form.data("bootstrapValidator").resetForm();
          $form[0].reset();
          $("[name='brandId']").val('');
          $(".btn-txt").text("请选择二级分类");
          $(".imgWrap img").remove();
          imgs = [];

        }
      }

    })
  })





})
$(function () {
  //准备模板数据
  var currentPage = 1;
  var pageSize = 5;

  render();

  //用户操作功能
  $("tbody").on("click", ".btn", function () {
    //显示模态框
    $("#userModal").modal("show");

    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-danger") ? "0" : "1";
    // console.log(isDelete);

    $(".btn-confirm").off().on("click", function () {
      //模态框隐藏
      $("#userModal").modal("hide");
      //发送ajax
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function (data) {
          if (data.success) {
            render();
          }
        }
      })
    })
  })


  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        // console.log(data);
        $("tbody").html(template("userTpl", data));

        //分页功能
        $("#userPaginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          numberOfPages: pageSize,
          // currentPage: currentPage,
          totalPages: Math.ceil(data.total / data.size),
          //onPageClicked 有四个参数，要按顺序写参数
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }
})
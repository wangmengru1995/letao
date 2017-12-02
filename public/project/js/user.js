$(function () {

  var currentPage = 1;
  var pageSize = 5;
  var render = function () {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize,
      },
      success: function (data) {
        // console.log(data);
        $("tbody").html(template("userTpl", data));

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

  //用户管理
  $("tbody").on("click", ".btn", function () {
    // console.log($(this).hasClass(".btn-danger"));
    $("#userModal").modal("show");
    var id = $(this).parent().data("id");
    var isDelete = $(this).hasClass("btn-danger") ? "0" : "1";

    $(".btn_confirm").off().on("click", function () {
      $.ajax({
        type: "post",
        url: "/user/updateUser",
        data: {
          id: id,
          isDelete: isDelete
        },
        success: function (data) {
          if (data.success) {
            $("#userModal").modal("hide");
            render();
          }
        }
      })
    })
  })

})
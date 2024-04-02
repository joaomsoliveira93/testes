$('#sidebarCollapse').on('click', function() {
    $('#sidebar').toggleClass('active');
    if ($(window).width() >= 992) {
        if ($('#sidebar').hasClass('active')) {
            $('#content').css('margin-left', '0px');
        } else {
            $('#content').css('margin-left', '300px');
        }
    } else {
        $('#content').css('margin-left', '0px');
    }
});
$("#addPost").on("click", function () {

    $("#postsTable").append('<tr class="footable-even"><td class="footable-visible">  <input type="text" name="link[]" class="form-control" required></td>   <td class="footable-visible">       <select name="socialNetwork[]" id="socialNetwork" class="form-control">            <option value="Facebook" selected>Facebook</option>            <option value="Linkedin" >Linkedin</option>       </select>  </td>   <td class="footable-visible">        <a class="btn btn-xs btn-outline btn-danger Eliminar"><span class="fa fa-times"></span></a>    </td></tr>');
});

$("body").on('click', function () {
    $(".Eliminar").on("click", function () {
        $(this).closest('tr').remove();
    });
});

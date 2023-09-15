$(function () {


    var $sections = $('.form-section');
    var titulo = document.getElementById('titleregisto');
    function navigateTo(index) {
        $sections.removeClass('current').eq(index).addClass('current');
        $('.form-navigation .previous').toggle(index > 0);
        $('.form-navigation .home').toggle(index == 0);
        var atTheEnd = index >= $sections.length - 1;
        $('.form-navigation .next').toggle(!atTheEnd);
        $('.form-navigation [type=submit]').toggle(atTheEnd);

    }
    function curIndex() {
        return $sections.index($sections.filter('.current'));

    }
    $('.form-navigation .previous').click(function () {
        changetitle(curIndex() - 1)
        navigateTo(curIndex() - 1);

    });
    $('.form-navigation .next').click(function () {
        $('.contact-form').parsley().whenValidate({
            group: 'block-' + curIndex()
        }).done(function () {
            changetitle(curIndex() + 1)
            navigateTo(curIndex() + 1)

        });
    });
    $sections.each(function (index, section) {
        $(section).find(':input').attr('data-parsley-group', 'block-' + index);
    })
    navigateTo(0);

    function changetitle(index) {
        switch (index) {
            case 1:
                titulo.innerHTML = "Adicionar membros"
                break;
            default:
                titulo.innerHTML = "Projeto"
                break;
        }


    }

    $("#Adicionar").on("click", function () {

        $("#tabela").append('<tr class="footable-even"><td class="footable-visible"><input type="text" name="mec[]" class="form-control" required></td><td class="footable-visible"><input type="text" name="name[]" class="form-control" required></td><td class="footable-visible"><input type="email" name="email[]" class="form-control" required></td><td class="text-right footable-visible footable-last-column"><a class="btn btn-xs btn-outline btn-danger Eliminar">Eliminar</a></td></tr>');
    });

    $("body").on('click', function () {
        $(".Eliminar").on("click", function () {
            $(this).closest('tr').remove();
        });
    });


});



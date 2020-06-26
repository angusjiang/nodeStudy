/**
 * Created by angus on 2017-1-25.
 */
$(function() {
    let $registerBox = $('.register');
    let $login = $('.login');
    //注册操作
    $('.submitR').on('click', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: $registerBox.find('[name="username"]').val(),
                password: $registerBox.find('[name="pwd"]').val(),
                repassword: $registerBox.find('[name="pwd2"]').val(),
            },
            dataType: 'json',
            success: function(result) {
                $registerBox.find('.colWarning').html(result.message);
                if (!result.code) {
                    alert(result.message + '前往登录');
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            }
        });
    });

    //登录操作
    $('.submitL').on('click', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $login.find('[name="username"]').val(),
                password: $login.find('[name="pwd"]').val(),
            },
            dataType: 'json',
            success: function(result) {
                $login.find('.colWarning').html(result.message);
                if (!result.code) {
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            }
        });
    });

    //登录与注册之间的切换操作
    $('.register-link').on('click', function(e) {
        e.preventDefault();
        $('.login').hide();
        $('.register').show();
    });
    $('.router-link').on('click', function() {
        $('.login').show();
        $('.register').hide();
    });
});
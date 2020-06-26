/**
 * Created by angus on 2017-2-13.
 */
$(function() {
   var init = function() {
      $('.secondary').on('click', '.it', function(e) {
          e.preventDefault();
          window.location = $(this).attr('href');
          $(this).siblings('.item').removeClass('active');
          $(this).addClass('active');
      });
      $('#logout').on('click', function(e) {
          e.preventDefault();
          $.ajax({
              type: 'post',
              url: '/api/user/logout',
              data: {
              },
              dataType: 'json',
              success: function(result) {
                  if (!result.code) {
                      window.location = '/';
                  } else {
                      alert(result.message);
                  }

              }
          });
      });
   };
   $(init);
    (function(){
        //这里只是简单的实现插件功能
        var startDate = new Pikaday({
            field: document.getElementById('startTime'),
            firstDay: 1,//设置一个星期是从周一开始的
            minDate:new Date('2015-01-01'),
            maxDate:new Date('2025-01-01'),
            yearRange: [2015,2025],
            onSelect:function(){
                console.log(this);
            }
        });
        var endDate = new Pikaday({
            field: document.getElementById('endTime'),
            firstDay: 0,//设置一个星期是从周日开始的，默认值
            onOpen:function(){
                //console.log('你打开了');
            },
            onClose:function(){
                //console.log('你关闭了');
            },
            // onDraw:function(){
            //     console.log('你拖动了')
            // },
            onSelect:function(){
                //console.log('你选择了');
            }
        });
        var date = new Date();
        var str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        $('#startTime').val(str);
        $('#endTime').val(str);
    })();
});
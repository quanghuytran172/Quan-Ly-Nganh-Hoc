let storageKey = 'topicData';
function getData(storageKey){
    let data = JSON.parse(localStorage.getItem(storageKey));
    return data;
}
$(document).ready(function(){
    "use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});
	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
      });

    // Thêm ngành học
    $('.add-form button[type="button"]').on('click',function(){
        let topicId = $('#topicId').val();
        let majorId = $('#majorId').val();
        let topicName = $('#topicName').val();
        let description = $('#description').val();
        let doTime = $('#doTime').val();
        let maxNumberOfStudents = $('#maxNumberOfStudents').val();
        let keyWord = $('#keyWord').val();
        if(topicId === '' || majorId === '' || topicName === '' || description === '' || doTime ==='' || maxNumberOfStudents === '' || keyWord === '' ){
            alert('Các trường không được bỏ trống...')
        }
        else{
            let topic ={};
            topic['topicId'] = topicId;
            topic['majorId'] = majorId;
            topic['topicName'] = topicName;
            topic['description'] = description;
            topic['doTime'] = doTime;
            topic['maxNumberOfStudents'] = maxNumberOfStudents;
            topic['keyWord'] = keyWord;
            let data = getData(storageKey);
            let topics = [];
            if (data){
                topics = data;
            }
            topics.push(topic);
            localStorage.setItem(storageKey,JSON.stringify(topics));
            window.location.href= 'danhsachdetai.html';
        }
    })
        
})
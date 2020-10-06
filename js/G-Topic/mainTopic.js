let storageKey = 'topicData';
let data = JSON.parse(localStorage.getItem(storageKey));
let topics = [];
if(data){
    topics = data;
}

function render(topics){
    let table = document.getElementById('table-body');
    if(topics){
        let contentTable = topics.map(function(topic,index){
            return `<tr data-id="${index}">
                <td>${topic.topicId}</td>
                <td>${topic.majorId}</td>
                <td>${topic.topicName}</td>
                <td>${topic.description}</td>
                <td>${topic.doTime}</td>
                <td>${topic.maxNumberOfStudents}</td>
                <td>${topic.keyWord}</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary btn-xs editTopic" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="far fa-edit"></span>
                </span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Delete"><button class="btn btn-danger btn-xs deleteTopic" ><i class="far fa-trash-alt"></i></button></p></td>
            </tr>`;
        })
        table.innerHTML = contentTable.join('');
    }
}
function removeDuplicates(array) {
    let a = []
    array.map(x => {
        if(!a.includes(x)){
            a.push(x);
        }
    })
    return a;
}

render(topics);

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
    

    // xóa đề tài
	$('.deleteTopic').on('click',function(e){
        let tr = $(this).closest('tr');
        let selectID = tr[0].children[1].textContent;
        let iArr = topics.findIndex(function(item,index){
            return item.majorId === selectID;
        })
        topics.splice(iArr,1);
        localStorage.setItem(storageKey,JSON.stringify(topics));
        tr.remove();
    })
    
    // Chỉnh sửa đề tài
    $('.editTopic').on('click',function(e){
        
        let id = $(this).closest('tr').data('id');
        let oldTopic = topics[id].topicId;
        let oldMajor = topics[id].majorId;
        let oldTopicName = topics[id].topicName;
        let oldDescription = topics[id].description;
        let oldDoTime = topics[id].doTime;
        let oldMaxNumberOfStudents = topics[id].maxNumberOfStudents;
        let oldKeyWord = topics[id].keyWord;
        $('#topicId').attr('value',oldTopic);
        $('#majorId').attr('value',oldMajor);
        $('#topicName').attr('value',oldTopicName);
        $('#description').attr('value',oldDescription);
        $('#doTime').attr('value',oldDoTime);
        $('#maxNumberOfStudents').attr('value',oldMaxNumberOfStudents);
        $('#keyWord').attr('value',oldKeyWord);

        $('#updateForm').on('click',function(e){
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

                topics[id]['topicId'] = topicId;
                topics[id]['majorId'] = majorId;
                topics[id]['topicName'] = topicName;
                topics[id]['description'] = description;
                topics[id]['doTime'] = doTime;
                topics[id]['maxNumberOfStudents'] = maxNumberOfStudents;
                topics[id]['keyWord'] = keyWord;
                localStorage.setItem(storageKey,JSON.stringify(topics));
                window.location.href= 'danhsachdetai.html';
            }
        })  
    })
    // Lọc theo chuyên ngành
    $('.filter-button').on('click',function(){
        let getIdMajor = topics.map(function(item){
            return item.majorId;
        })
        getIdMajor = removeDuplicates(getIdMajor);
        let toList = getIdMajor.map(function(item){
            return `<a class="dropdown-item" id="filterItem">${item}</a>`;
        })
        $('.dropdown-menu').html(toList.join(''));

        $('.dropdown-item').on('click',function(){
            let getText = $(this).text();
            let topicsFilter = topics.filter(function(item){
                return item.majorId === getText;
            })
            render(topicsFilter);
        }) 
    })
})

	

